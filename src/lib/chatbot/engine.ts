/**
 * engine.ts
 *
 * The All Phase assistant's brain: a rule-based dialog manager that aims to
 * feel conversational without an LLM. Per message it:
 *
 *   1. normalizes the text (slang, typos, emoji) and scores every intent in
 *      the knowledge base, with greetings and multi-part questions handled
 *   2. pulls out entities wherever they appear (phone, email, ZIP/city, name,
 *      timing, the service needed), so "I'm Sam, 206-555-1234, toilet's
 *      clogged" fills three fields at once
 *   3. resolves short replies ("yes", "sure", "nah") against whatever the bot
 *      last offered, the way a person would
 *   4. runs slot-filling flows (booking, quote, emergency, callback) that
 *      tolerate interruptions ("wait, how much is it?"), corrections
 *      ("actually my number is…"), skips and cancellations
 *
 * The engine is pure and synchronous: it returns a Turn describing what to
 * show, and — when a request is complete — a LeadRequest the widget delivers
 * before calling leadDelivered() with the result. All state is plain JSON so
 * a conversation survives a page reload.
 */

import {
  INTENTS,
  GREETING_WORDS,
  MAIN_MENU,
  MORE_MENU,
  greetingReply,
  vocabularyWords,
  type Intent,
} from "./knowledge";
import {
  correctText,
  digitCount,
  extractEmail,
  extractExplicitName,
  extractPhone,
  extractTiming,
  extractZip,
  looksLikeBrokenEmail,
  normalize,
  parseNameAnswer,
  setVocabulary,
  stemPhrase,
} from "./text";
import { classifyZip, findCity, type Coverage } from "./service-area";
import type {
  BotMessage,
  BusinessInfo,
  FlowKind,
  IntentReply,
  LeadRequest,
  Offer,
  ReplyContext,
  Turn,
} from "./types";

setVocabulary(vocabularyWords());

/* ── Intent scoring ───────────────────────────────────────────────────── */

type Compiled = { intent: Intent; strong: string[]; phrases: string[] };

const split = (s?: string) =>
  (s ?? "")
    .split("|")
    .map((p) => p.trim())
    .filter(Boolean);

/**
 * Filler words dropped before phrase matching, so "toilet is overflowing"
 * matches "toilet overflowing" and "the drain is slow" matches "drain slow".
 * Negations, pronouns and question words are kept on purpose.
 */
const FILLER = new Set([
  "the",
  "a",
  "an",
  "is",
  "are",
  "was",
  "were",
  "am",
  "be",
  "been",
  "very",
  "really",
  "so",
  "just",
  "totally",
  "completely",
  "kinda",
  "super",
]);

function matchForm(text: string): string {
  return stemPhrase(
    text
      .split(" ")
      .filter((w) => w && !FILLER.has(w))
      .join(" "),
  );
}

const COMPILED: Compiled[] = INTENTS.map((intent) => {
  const strong = [...new Set(split(intent.strong).map((p) => matchForm(normalize(p))))].filter(
    Boolean,
  );
  // A phrase that stems to a strong one ("leaking" vs "leak") must not score twice.
  const phrases = [...new Set(split(intent.phrases).map((p) => matchForm(normalize(p))))].filter(
    (p) => p && !strong.includes(p),
  );
  return { intent, strong, phrases };
});

export interface Scored {
  intent: Intent;
  score: number;
}

const NEGATION = /\b(not|no|never|without|nothing|isnt|dont|zero)\b(\s+\w+){0,2}\s*$/;

/** Scores every intent against a normalized message; best first. */
export function classify(norm: string): Scored[] {
  const corrected = correctText(norm);
  const stemmed = ` ${matchForm(corrected)} `;
  const out: Scored[] = [];

  for (const c of COMPILED) {
    let score = 0;
    const negatable = c.intent.kind === "safety";
    const hit = (p: string) => {
      const idx = stemmed.indexOf(` ${p} `);
      if (idx < 0) return false;
      // "not an emergency", "no rush", "I don't smell gas" don't count.
      if (negatable && NEGATION.test(stemmed.slice(0, idx))) return false;
      return true;
    };
    for (const p of c.strong) if (hit(p)) score += 4;
    for (const p of c.phrases) if (hit(p)) score += p.includes(" ") ? 2 : 1;
    for (const re of c.intent.patterns ?? []) {
      const m = corrected.match(re);
      if (m && !(negatable && NEGATION.test(corrected.slice(0, m.index)))) score += 4;
    }
    if (score > 0) out.push({ intent: c.intent, score });
  }

  // Small talk only wins when nothing substantive was said:
  // "I need help with my toilet" is about the toilet, not "help".
  const substantive = out.some((s) => s.intent.kind !== "social");
  const filtered = substantive ? out.filter((s) => s.intent.kind !== "social") : out;

  return filtered.sort(
    (a, b) => b.score - a.score || (b.intent.priority ?? 0) - (a.intent.priority ?? 0),
  );
}

const GREETING_STEMS = [...GREETING_WORDS].sort((a, b) => b.length - a.length);

/** Splits a leading greeting off: "hey there, my sink is clogged" → rest "my sink is clogged". */
function splitGreeting(norm: string): { greeted: boolean; rest: string } {
  for (const g of GREETING_STEMS) {
    if (norm === g) return { greeted: true, rest: "" };
    if (norm.startsWith(`${g} `)) return { greeted: true, rest: norm.slice(g.length + 1).trim() };
  }
  // Pure stretched / repeated greetings: "hii", "heyyy", "hello hello".
  if (/^(h+i+|he+y+|hel+o+|yo+)( (h+i+|he+y+|hel+o+|yo+|there))*$/.test(norm))
    return { greeted: true, rest: "" };
  return { greeted: false, rest: norm };
}

/* ── Yes / no / cancel understanding ──────────────────────────────────── */

const YES_RE =
  /^(yes|sure|ok|okay|yes please|please|absolutely|definitely|of course|go ahead|do it|let us do it|lets do it|let us go|sounds good|that works|alright|all right|book it|please do|send someone|send someone now|call me back|y|correct|yep|why not|fine|perfect|great|cool|good|go for it|i would like that|i want that|that would be great|that would be good|yes book it|book me|schedule it|love to|i guess|probably|affirmative)\b/;
const NO_RE =
  /^(no|not right now|not now|no thanks|no thank you|maybe later|later|not yet|not really|i will pass|pass|no need|never mind|i am ok|i am fine|all good|i am good|nothing|not interested|negative|that is all|that is it|nothing else|i am all set|all set|nah)\b/;
const CANCEL_RE =
  /^(cancel|stop|quit|exit|never mind|forget it|forget about it|start over|restart|reset|abort|i changed my mind|changed my mind|i do not want to (book|continue|do this)|not interested)\b|\b(cancel (this|that|it|the booking|booking|request))\b/;
const SKIP_RE =
  /^(skip|no|none|n a|na|nope|nothing|no thanks|no thank you|i do not have one|do not have one|i do not have (an )?email|no email|do not have (an )?email|rather not|i would rather not|prefer not|i prefer not|pass|not now|later|no need|no details|not sure|i do not know|do not know|no comment|nothing else|that is it|that is all|nah|dont have one)\b/;

function isQuestion(raw: string, norm: string): boolean {
  return (
    /\?\s*$/.test(raw) ||
    /^(what|why|how|when|where|who|which|can|could|do|does|is|are|will|would|should)\b/.test(norm)
  );
}

/* ── Pacific clock ────────────────────────────────────────────────────── */

function pacificNow(now: Date): ReplyContext["pacific"] {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "numeric",
    hour12: false,
    weekday: "short",
  }).formatToParts(now);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 12) % 24;
  const wd = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(wd);
  const label = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "numeric",
    minute: "2-digit",
  }).format(now);
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(now);
  return { hour, weekday, label, dateLabel };
}

/* ── State ────────────────────────────────────────────────────────────── */

type Step =
  | "service"
  | "details"
  | "name"
  | "phone"
  | "location"
  | "email"
  | "timing"
  | "confirm"
  | "editPick"
  | "failed";

interface Slots {
  services: string[];
  details?: string;
  name?: string;
  phone?: string;
  email?: string;
  zip?: string;
  city?: string;
  coverage?: Coverage;
  timing?: string;
  nameSkipped?: boolean;
  phoneDeclined?: boolean;
  emailSkipped?: boolean;
  locationSkipped?: boolean;
  timingSkipped?: boolean;
  detailsSkipped?: boolean;
}

interface Flow {
  kind: FlowKind;
  step: Step;
  attempts: number;
  /** Set while changing one field from the confirmation screen. */
  editing?: boolean;
  topic?: string;
  pendingLead?: LeadRequest;
}

export interface EngineState {
  slots: Slots;
  flow?: Flow;
  offer?: Offer;
  topic?: string;
  fallbacks: number;
  transcript: { from: "bot" | "user"; text: string }[];
  deliveredKeys: string[];
  lastPicks: Record<string, number>;
}

const FLOW_STEPS: Record<FlowKind, Step[]> = {
  booking: ["service", "details", "name", "phone", "location", "email", "timing", "confirm"],
  quote: ["service", "details", "name", "phone", "location", "email", "timing", "confirm"],
  emergency: ["name", "phone", "location", "details"],
  callback: ["name", "phone", "details"],
};

const FIELD_LABELS: [Step, string][] = [
  ["service", "Service"],
  ["details", "Problem details"],
  ["name", "Name"],
  ["phone", "Phone"],
  ["location", "Location"],
  ["email", "Email"],
  ["timing", "Timing"],
];

const EMOJI_WORDS: [RegExp, string][] = [
  [/(👍|👌|✅|🙌|💯)/gu, " ok "],
  [/👎/gu, " no "],
  [/(😂|🤣|😆|😹)/gu, " lol "],
  [/🙏/gu, " thanks "],
  [/(😡|🤬|😤)/gu, " frustrated "],
];

export interface EngineOptions {
  biz: BusinessInfo;
  now?: () => Date;
  random?: () => number;
  state?: EngineState;
}

export class ChatEngine {
  state: EngineState;
  private biz: BusinessInfo;
  private now: () => Date;
  private random: () => number;

  constructor(opts: EngineOptions) {
    this.biz = opts.biz;
    this.now = opts.now ?? (() => new Date());
    this.random = opts.random ?? Math.random;
    this.state = opts.state ?? {
      slots: { services: [] },
      fallbacks: 0,
      transcript: [],
      deliveredKeys: [],
      lastPicks: {},
    };
  }

  /* ── Public API ─────────────────────────────────────────────────────── */

  /** Opening message when the chat is first opened. */
  start(): Turn {
    const ctx = this.ctx("", "");
    const h = ctx.pacific.hour;
    const tod =
      h < 5 ? "Hi there" : h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
    return this.logged(
      this.turn(
        [
          {
            text: `${tod}! 👋 I'm the All Phase assistant. I can book a plumber, help with an emergency, answer questions, or troubleshoot a problem with you.\n\nWhat's going on with your plumbing today?`,
          },
        ],
        MAIN_MENU,
      ),
    );
  }

  /** Handle a typed message or a tapped quick reply. */
  send(raw: string): Turn {
    const text = raw.trim().slice(0, 1000);
    if (!text) return this.turn([], this.defaultQuick());
    this.log("user", text);
    let prepared = text;
    for (const [re, word] of EMOJI_WORDS) prepared = prepared.replace(re, word);
    const norm = normalize(prepared);
    return this.logged(this.state.flow ? this.handleFlow(text, norm) : this.handleIdle(text, norm));
  }

  /** Services chosen with the icon picker during the service step. */
  pickServices(services: string[]): Turn {
    const flow = this.state.flow;
    const clean = services.map((s) => s.trim()).filter(Boolean);
    if (!flow || flow.step !== "service" || !clean.length) return this.send(clean.join(", "));
    this.log("user", clean.join(", "));
    this.state.slots.services = clean;
    return this.logged(this.advance([`Got it: **${clean.join(", ")}**.`]));
  }

  /** The widget reports whether the lead email actually went out. */
  leadDelivered(ok: boolean): Turn {
    return this.logged(this.deliveredTurn(ok));
  }

  private deliveredTurn(ok: boolean): Turn {
    const flow = this.state.flow;
    const lead = flow?.pendingLead;
    if (!flow || !lead) return this.turn([], this.defaultQuick());
    const s = this.state.slots;
    const first = s.name ? `, ${s.name.split(" ")[0]}` : "";

    if (!ok) {
      flow.step = "failed";
      return this.turn(
        [
          {
            text: `Hmm, I couldn't send that through just now${first}. 😕 So you're not left waiting, please call us at **${this.biz.phone}**. We answer 24/7. Or tap “Try again”.`,
            tone: "alert",
            actions: [{ type: "call", label: `Call ${this.biz.phone}` }],
          },
        ],
        ["Try again", "📞 I'll call now"],
      );
    }

    this.state.deliveredKeys.push(leadKey(lead));
    const kind = flow.kind;
    const contact = s.phone
      ? `**${s.phone}**`
      : s.email
        ? `**${s.email}**`
        : "the details you gave";
    let text: string;
    if (kind === "emergency") {
      text = `✅ **Done${first}! Your emergency request is with our dispatch team.** Expect a call at ${contact} very shortly.\n\nIf water is still flowing, keep the main valve off. For the absolute fastest response you can also call **${this.biz.phone}** right now.`;
    } else if (kind === "callback") {
      text = `✅ **All set${first}!** Someone from our team will call you at ${contact} shortly.`;
    } else {
      const outOfArea = s.coverage === "out";
      text = outOfArea
        ? `✅ **Thanks${first}, your request is in.** Since that location is outside our usual service area, our team will review it and reach out at ${contact} to let you know how we can help.`
        : `✅ **You're all set${first}!** Your ${kind === "quote" ? "quote request" : "request"} is with our team, and we'll reach out at ${contact} to confirm ${kind === "quote" ? "the details" : "your appointment time"}.\n\nWeekday requests before 2pm are usually seen the same day.`;
    }

    // Keep contact details for any follow-up request; clear the job specifics.
    this.state.slots = {
      services: [],
      name: s.name,
      phone: s.phone,
      email: s.email,
      zip: s.zip,
      city: s.city,
      coverage: s.coverage,
    };
    this.state.flow = undefined;
    this.state.offer = { kind: "anything-else" };
    return this.turn(
      [
        {
          text,
          tone: "success",
          actions:
            kind === "emergency" ? [{ type: "call", label: `Call ${this.biz.phone}` }] : undefined,
        },
        { text: "Is there anything else I can help you with?" },
      ],
      ["No, that's all", "Another question", "🏷️ Coupons & deals"],
    );
  }

  /* ── Idle conversation ──────────────────────────────────────────────── */

  private handleIdle(raw: string, norm: string): Turn {
    const s = this.state;

    // Remember a name volunteered in passing ("hi, I'm Dana").
    const volunteered = extractExplicitName(raw);
    let intentText = norm;
    if (volunteered) {
      s.slots.name = volunteered;
      intentText = normalize(
        raw.replace(
          new RegExp(
            `\\b(my name(?:'s| is)?|name(?:'s| is)|call me|you can call me|this is|i'?m|i am)\\s*[:-]?\\s*${escapeRe(volunteered)}`,
            "i",
          ),
          " ",
        ),
      );
    }

    // Quick-reply shortcuts that aren't really intents.
    if (
      /^(i will call|i ll call|call now|call all phase|i will call now|i will call you)/.test(
        norm,
      ) ||
      /^📞/.test(raw)
    ) {
      s.offer = undefined;
      return this.turn(
        [
          {
            text: `Perfect, tap below to call **${this.biz.phone}**. We pick up 24/7. 📞`,
            actions: [{ type: "call", label: `Call ${this.biz.phone}` }],
          },
        ],
        ["Another question"],
      );
    }
    if (
      /^(another question|anything else|let me try again|i am safe just a question|i have a question|question)$/.test(
        norm,
      )
    ) {
      s.offer = undefined;
      return this.turn(
        [
          {
            text: this.pick([
              "Sure! What would you like to know?",
              "Of course, ask away! 😊",
              "Go ahead, I'm listening. What's up?",
            ]),
          },
        ],
        [...MAIN_MENU, ...MORE_MENU],
      );
    }
    if (/^another joke$/.test(norm)) {
      return this.replyWith(INTENTS.find((i) => i.id === "joke")!, raw, norm, false);
    }

    if (CANCEL_RE.test(norm) && !/appointment|booking|visit/.test(norm)) {
      s.offer = undefined;
      return this.turn(
        [
          {
            text: "No problem! There's nothing in progress right now, so nothing was sent. Is there anything else I can help with?",
          },
        ],
        [...MAIN_MENU.slice(0, 3), "No, that's all"],
      );
    }

    // "It's not an emergency" after the emergency offer → regular booking.
    if (
      s.offer?.kind === "emergency" &&
      /\bnot (an |a )?(emergency|urgent)\b|no rush|not urgent/.test(norm)
    ) {
      s.offer = undefined;
      return this.startFlow("booking", undefined, undefined, [
        "Good to hear it's not an emergency! Let's book a regular visit instead.",
      ]);
    }

    const { greeted, rest } = splitGreeting(intentText);
    const scored = rest ? classify(rest) : [];
    // One loose word ("area", "plumber") isn't enough to pick a topic, except
    // for plumbing problems, where even a single word is a useful signal.
    let top = scored.find((x) => x.score >= 2 || x.intent.kind === "problem");
    // "What's the cost for drain cleaning?" is a price question about drains.
    const pricing = scored.find((x) => x.intent.id === "pricing" && x.score >= 4);
    if (
      pricing &&
      top?.intent.kind === "problem" &&
      /\b(how much|cost|price|charge|fee|expensive|cheap)/.test(rest)
    )
      top = pricing;
    // "Leak under the sink ASAP" is urgent, not a flood: answer the problem, keep the urgency.
    if (top?.intent.id === "emergency" && !TRUE_EMERGENCY.test(rest)) {
      const problemHit = scored.find((x) => x.intent.kind === "problem");
      if (problemHit) {
        top = problemHit;
        s.slots.timing = "ASAP";
      }
    }

    // Short yes / no answers resolve whatever the bot last offered.
    if (s.offer) {
      // Intents that *are* a yes to the pending offer ("Yes, call me back").
      const sameAsOffer: Record<Offer["kind"], string[]> = {
        book: ["book", "quote"],
        callback: ["human", "book"],
        emergency: ["emergency", "book"],
        "anything-else": [],
      };
      const agrees = sameAsOffer[s.offer.kind];
      if (top && agrees.includes(top.intent.id) && YES_RE.test(norm))
        return this.acceptOffer(greeted);
      const strongOther =
        top &&
        top.score >= 4 &&
        !["book", "thanks", "compliment", "goodbye", "laugh", ...agrees].includes(top.intent.id);
      if (YES_RE.test(norm) && !strongOther) return this.acceptOffer(greeted);
      if (NO_RE.test(norm) && !strongOther) return this.declineOffer();
    }

    const math = raw
      .toLowerCase()
      .match(
        /^\s*(?:what(?:'s| is)\s+|calculate\s+)?(-?\d+(?:\.\d+)?)\s*(\+|-|\*|x|×|\/|÷|plus|minus|times|divided by)\s*(-?\d+(?:\.\d+)?)\s*[?=!.]*\s*$/,
      );
    if (math) return this.mathAnswer(Number(math[1]), math[2], Number(math[3]));

    // A ZIP or city on its own is a coverage question.
    const zip = extractZip(raw);
    const cityHit = !zip ? findCity(stripName(norm, s.slots.name)) : null;
    const areaish =
      !top ||
      ["area", "location", "book", "hours", "response_time"].includes(top.intent.id) ||
      top.score < 4;
    if ((zip || cityHit) && !extractPhone(raw) && top?.intent.kind === "info" && !areaish) {
      // "What are your hours and do you serve Kent?" — answer both.
      const info = this.replyWith(top.intent, raw, rest, greeted);
      const cov = this.coverageAnswer(zip, cityHit?.name ?? null, cityHit?.coverage ?? null, false);
      return { ...cov, messages: [...info.messages, ...cov.messages] };
    }
    if ((zip || cityHit) && areaish && !extractPhone(raw)) {
      const wantsBooking = top?.intent.id === "book";
      const cov = this.coverageAnswer(
        zip,
        cityHit?.name ?? null,
        cityHit?.coverage ?? null,
        wantsBooking,
      );
      const other = scored.find(
        (x) =>
          x.intent.kind === "info" &&
          !["area", "location", "services", "about"].includes(x.intent.id) &&
          x.score >= 4,
      );
      if (other && !wantsBooking) {
        const info = other.intent.reply(this.ctx(raw, rest));
        return { ...cov, messages: [...info.messages, ...cov.messages] };
      }
      return cov;
    }
    if (zip || cityHit) {
      // Mentioned in passing ("toilet's clogged, I'm in Kent"): remember it for booking.
      if (zip) s.slots.zip = zip;
      if (cityHit) s.slots.city = cityHit.name;
      s.slots.coverage = zip ? classifyZip(zip) : cityHit!.coverage;
    }

    // Contact details out of the blue: they want to be contacted.
    const phone = extractPhone(raw);
    const email = extractEmail(raw);
    if (
      (phone || email) &&
      (!top ||
        top.intent.kind === "social" ||
        top.intent.id === "human" ||
        top.intent.id === "book")
    ) {
      if (phone) s.slots.phone = phone;
      if (email) s.slots.email = email.email;
      const kind: FlowKind = top?.intent.id === "book" ? "booking" : "callback";
      return this.startFlow(kind, undefined, undefined, [
        `Thanks! I've noted ${phone ? `**${phone}**` : `**${email!.email}**`}.`,
      ]);
    }

    if (top) {
      s.fallbacks = 0;
      return this.replyWith(top.intent, raw, rest, greeted, scored[1]);
    }

    if (greeted || volunteered) {
      s.fallbacks = 0;
      const ctx = this.ctx(raw, norm);
      const greet = greeted
        ? greetingReply(ctx)
        : `Nice to meet you, ${volunteered!.split(" ")[0]}! 😊`;
      const follow =
        greeted && volunteered ? ` Nice to meet you, ${volunteered.split(" ")[0]}!` : "";
      return this.turn(
        [
          {
            text: `${greet}${follow} ${this.pick([
              "How can I help with your plumbing today?",
              "What can I do for you today?",
              "What's going on at your place? Leak, clog, no hot water, or something else?",
              "How can I help you today?",
            ])}`,
          },
        ],
        MAIN_MENU,
      );
    }

    // Affirmations / reactions with nothing pending.
    if (/^(later|laters|see you|peace|peace out|ciao|adios)$/.test(norm)) {
      return this.replyWith(INTENTS.find((i) => i.id === "goodbye")!, raw, norm, false);
    }
    if (
      /^(ok|cool|nice|great|awesome|alright|got it|i see|makes sense|sounds good|perfect|good|fine|hmm+|interesting|oh|ah|wow|yes|no|sure|nope|yep|nah|maybe|ok cool|ok then|alright then)$/.test(
        norm,
      )
    ) {
      return this.turn(
        [
          {
            text: this.pick([
              "👍 Anything else I can help with?",
              "Great! What else can I do for you?",
              "Got it. Anything else on your mind?",
            ]),
          },
        ],
        MAIN_MENU,
      );
    }

    return this.fallback(raw, norm);
  }

  private replyWith(
    intent: Intent,
    raw: string,
    norm: string,
    greeted: boolean,
    second?: Scored,
  ): Turn {
    const s = this.state;
    const ctx = this.ctx(raw, norm);
    // "How much is a water heater?" → the pricing answer should know the topic.
    if (intent.kind === "info") {
      const problemHit = classify(norm).find((x) => x.intent.kind === "problem");
      const t = problemHit?.intent.reply({ ...ctx, pick: (o) => o[0] }).topic;
      if (t) ctx.topic = t;
    }
    const reply = intent.reply(ctx);
    let messages = [...reply.messages];

    if (greeted && messages.length) {
      messages[0] = { ...messages[0], text: `${greetingReply(ctx)} ${messages[0].text}` };
    }
    // Two info questions in one message: "what are your hours and do you serve Kent?"
    if (
      second &&
      second.intent.kind === "info" &&
      intent.kind === "info" &&
      second.score >= 4 &&
      second.intent.id !== intent.id
    ) {
      const extra = second.intent.reply(ctx).messages;
      // The area answer ends by asking for a ZIP, so it goes last.
      messages = intent.id === "area" ? extra.concat(messages) : messages.concat(extra);
    }

    if (reply.topic) s.topic = reply.topic;
    if (reply.startFlow && !reply.startFlow.service) {
      // "Need a plumber for our restaurant" / "book someone for a clogged sink"
      const services = servicesFromText(norm, raw, ctx);
      if (services.length) {
        reply.startFlow.service = services[0];
        reply.startFlow.details = stripGreeting(raw);
        for (const extra of services.slice(1))
          if (!s.slots.services.includes(extra)) s.slots.services.push(extra);
      }
    }
    if (reply.startFlow) {
      const pre = greeted ? [`${greetingReply(ctx)}`] : [];
      const intro = messages.map((m) => m.text);
      return this.startFlow(
        reply.startFlow.kind,
        reply.startFlow.service,
        reply.startFlow.details,
        [...pre, ...intro],
      );
    }
    s.offer = reply.offer;
    if (reply.offer?.kind === "book" && reply.offer.service) {
      // Keep the visitor's own words so the tech sees the problem as described.
      s.offer = {
        ...reply.offer,
        details: intent.kind === "problem" ? stripGreeting(raw) : undefined,
      };
    }
    return this.turn(messages, reply.quickReplies ?? this.defaultQuick());
  }

  private acceptOffer(greeted: boolean): Turn {
    const offer = this.state.offer!;
    this.state.offer = undefined;
    switch (offer.kind) {
      case "book":
        return this.startFlow(offer.flow ?? "booking", offer.service, offer.details);
      case "callback":
        return this.startFlow("callback", undefined, offer.topic);
      case "emergency":
        return this.startFlow("emergency");
      case "anything-else":
        return this.turn(
          [
            {
              text: this.pick([
                "Sure! What else can I help with?",
                "Of course, what do you need?",
                "Happy to help. What's next?",
              ]),
            },
          ],
          [...MAIN_MENU, ...MORE_MENU],
        );
    }
    void greeted;
    return this.turn([], this.defaultQuick());
  }

  private declineOffer(): Turn {
    const offer = this.state.offer!;
    this.state.offer = offer.kind === "anything-else" ? undefined : { kind: "anything-else" };
    const first = this.firstName();
    if (offer.kind === "anything-else") {
      return this.turn(
        [
          {
            text: this.pick([
              `Thanks for chatting${first}! Have a great day, and we're here 24/7 if anything comes up. 💧`,
              `Sounds good${first}! Take care, and don't hesitate to reach out anytime. 👋`,
            ]),
          },
        ],
        [],
      );
    }
    return this.turn(
      [
        {
          text: this.pick([
            "No problem at all! If you change your mind, I'm right here. Anything else I can help with?",
            "Totally fine. Is there anything else I can answer for you?",
          ]),
        },
      ],
      [...MAIN_MENU.slice(0, 3), "No, that's all"],
    );
  }

  private coverageAnswer(
    zip: string | null,
    city: string | null,
    cov: Coverage | null,
    wantsBooking: boolean,
  ): Turn {
    const s = this.state;
    const coverage = zip ? classifyZip(zip) : cov!;
    const place = zip ?? city!;
    s.slots.zip = zip ?? s.slots.zip;
    s.slots.city = city ?? s.slots.city;
    s.slots.coverage = coverage;
    if (wantsBooking) return this.startFlow("booking");

    s.offer = { kind: "book" };
    if (coverage === "in")
      return this.turn(
        [
          {
            text: `Yes, we serve **${place}**! 🎉 Our licensed plumbers are in your area every day, with same-day service when you book before 2pm on weekdays and 24/7 emergency help.\n\nWant me to book a visit?`,
          },
        ],
        ["Yes, book it", "💲 Get a quote", "Not right now"],
      );
    if (coverage === "edge")
      return this.turn(
        [
          {
            text: `**${place}** is right around the edge of our service area. We often do head out that way, but the team will need to confirm the schedule. Want me to put in a request so they can check for you?`,
          },
        ],
        ["Yes, book it", "👤 Talk to a person", "Not right now"],
      );
    return this.turn(
      [
        {
          text: `Hmm, it looks like **${place}** is outside our service area. We cover Greater Seattle across King and south Pierce counties. I'm sorry about that! If you'd like, I can still pass your details to the team and they'll let you know if they can help.`,
          actions: [{ type: "link", label: "Service area map", href: "/service-area" }],
        },
      ],
      ["Yes, pass it along", "Not right now"],
    );
  }

  private mathAnswer(a: number, op: string, b: number): Turn {
    const v = /plus|\+/.test(op)
      ? a + b
      : /minus|-/.test(op)
        ? a - b
        : /times|x|×|\*/.test(op)
          ? a * b
          : b === 0
            ? NaN
            : a / b;
    const answer = Number.isFinite(v)
      ? `${Math.round(v * 1000) / 1000}`
      : "undefined (even plumbers can't divide by zero 😄)";
    return this.turn(
      [
        {
          text: `That's **${answer}**. Math is fun, but plumbing is my real specialty! 🔧 Anything I can help with?`,
        },
      ],
      MAIN_MENU,
    );
  }

  private fallback(raw: string, norm: string): Turn {
    const s = this.state;
    s.fallbacks += 1;
    const plumbingy =
      /\b(water|pipe|drain|leak|toilet|sink|faucet|heater|sewer|plumb|clog|shower|tub|valve|pressure|drip|flush|smell|basement|washer|dishwasher|spigot|hose|tank|meter|bathroom|kitchen)/.test(
        norm,
      );

    if (plumbingy && norm.split(" ").length >= 3) {
      s.fallbacks = 0;
      s.offer = { kind: "book", details: stripGreeting(raw) };
      return this.turn(
        [
          {
            text:
              this.pick([
                "Thanks for explaining. That sounds like something our techs should look at in person so they can diagnose it properly.",
                "Got it. That's the kind of thing a licensed plumber can pin down quickly on site.",
              ]) + " Want me to book a visit? I'll include your description so they come prepared.",
          },
        ],
        ["Yes, book it", "How much does it cost?", "👤 Talk to a person"],
      );
    }

    if (s.fallbacks >= 2) {
      s.offer = { kind: "callback", topic: raw };
      return this.turn(
        [
          {
            text: `Sorry, I'm still not quite following. 🙏 I don't want to waste your time, so would you like one of our team to call you? You can also reach us directly at **${this.biz.phone}**.`,
            actions: [{ type: "call", label: `Call ${this.biz.phone}` }],
          },
        ],
        ["Yes, call me back", "📅 Book a plumber", "🔧 Services we offer"],
      );
    }

    if (isQuestion(raw, norm)) {
      s.offer = { kind: "callback", topic: raw };
      return this.turn(
        [
          {
            text: `Good question! I don't have a reliable answer for that one, and I'd rather not guess. Our team can answer it directly at **${this.biz.phone}**, or I can have someone call you back.`,
            actions: [{ type: "call", label: "Ask our team" }],
          },
        ],
        ["Yes, call me back", "📅 Book a plumber", "Another question"],
      );
    }

    return this.turn(
      [
        {
          text: this.pick([
            "Sorry, I didn't quite catch that. 🤔 Could you tell me a bit more? For example, “my kitchen sink is clogged” or “do you serve Kent?”",
            "Hmm, I'm not sure I understood. 🤔 I can book a plumber, help with an emergency, share prices & coupons, or check your area. What do you need?",
          ]),
        },
      ],
      MAIN_MENU,
    );
  }

  /* ── Flows ──────────────────────────────────────────────────────────── */

  private startFlow(
    kind: FlowKind,
    service?: string,
    details?: string,
    intro: string[] = [],
  ): Turn {
    const s = this.state;
    s.offer = undefined;
    s.fallbacks = 0;
    s.flow = { kind, step: "service", attempts: 0 };
    if (kind === "callback") s.flow.topic = details;
    if (service && !s.slots.services.includes(service))
      s.slots.services = [service, ...s.slots.services];
    if (kind === "emergency" && !s.slots.services.includes("Emergency Plumber"))
      s.slots.services.unshift("Emergency Plumber");
    if (details && kind !== "callback") s.slots.details = details;
    const whenText = normalize(
      this.state.transcript.filter((l) => l.from === "user").slice(-1)[0]?.text ?? "",
    );
    const when =
      /\b(today|tonight|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|weekend|next week|this week|morning|afternoon|evening|asap)\b/.test(
        whenText,
      )
        ? extractTiming(whenText)
        : null;
    if (when && !s.slots.timing && kind !== "emergency") s.slots.timing = when;

    const lines = [...intro];
    const reused = s.slots.name && s.slots.phone;
    if (kind === "booking")
      lines.push(
        this.pick([
          "Let's get you booked! 🔧 It only takes a minute.",
          "Great, let's get a plumber on the schedule! 🔧",
          "Happy to set that up! 🔧",
        ]),
      );
    if (kind === "emergency")
      lines.push(
        "🚨 **Let's get help on the way.** I'll flag this for our dispatch team as an emergency. (If water is spreading, shut off the main valve now.)",
      );
    if (kind === "callback") lines.push("Sure, I'll have someone from our team call you back.");
    if (service && kind !== "emergency") lines.push(`I've noted **${service}**.`);
    if (reused) lines.push(`I'll use the contact details you already gave me${this.firstName()}.`);
    return this.advance(lines);
  }

  /** Move to the next unfilled step and ask for it. */
  private advance(prefix: string[] = []): Turn {
    const flow = this.state.flow!;
    if (flow.editing) {
      flow.editing = false;
      flow.step = "confirm";
      return this.ask(prefix);
    }
    const next = FLOW_STEPS[flow.kind].find((st) => !this.filled(st));
    if (!next) return this.finish(prefix);
    if (next !== flow.step) flow.attempts = 0;
    flow.step = next;
    return this.ask(prefix);
  }

  private filled(step: Step): boolean {
    const s = this.state.slots;
    const flow = this.state.flow!;
    switch (step) {
      case "service":
        return s.services.length > 0;
      case "details":
        return !!s.details || !!s.detailsSkipped || (flow.kind === "callback" && !!flow.topic);
      case "name":
        return !!s.name || !!s.nameSkipped;
      case "phone":
        return !!s.phone || !!s.phoneDeclined;
      case "location":
        return !!s.zip || !!s.city || !!s.locationSkipped;
      case "email":
        return !!s.email || (!!s.emailSkipped && !s.phoneDeclined);
      case "timing":
        return !!s.timing || !!s.timingSkipped || flow.kind === "emergency";
      case "confirm":
        return false;
      default:
        return true;
    }
  }

  private finish(prefix: string[]): Turn {
    const flow = this.state.flow!;
    // Emergency + callback requests go straight out; bookings are confirmed first.
    if (flow.kind === "booking" || flow.kind === "quote") {
      flow.step = "confirm";
      return this.ask(prefix);
    }
    return this.emitLead(prefix);
  }

  /** The question for the current step, with any acknowledgement in front. */
  private ask(prefix: string[] = []): Turn {
    const flow = this.state.flow!;
    const s = this.state.slots;
    const first = this.firstName();
    const lead = prefix.filter(Boolean).join(" ");
    const say = (
      q: string,
      quick: string[] = [],
      input: Turn["input"] = TEXT_INPUT,
      extra: Partial<Turn> = {},
    ): Turn => {
      const t = this.turn([{ text: lead ? `${lead}\n\n${q}` : q }], quick, input);
      return { ...t, ...extra };
    };

    switch (flow.step) {
      case "service":
        return say(
          "What do you need help with? Pick one or more below, or just describe it in your own words.",
          [],
          { placeholder: "e.g. clogged kitchen sink…", mode: "text" },
          { showServicePicker: true },
        );
      case "details":
        return say(
          flow.kind === "emergency"
            ? "Quickly, what's happening? (e.g. “pipe burst under the kitchen sink”)"
            : flow.kind === "callback"
              ? "What would you like to talk about? (Or tap Skip.)"
              : "Can you tell me a little about what's going on? For example, “kitchen sink draining slowly since yesterday”. It helps the tech come prepared.",
          ["Skip"],
          { placeholder: "Describe the problem…", mode: "text" },
        );
      case "name":
        return say(
          flow.kind === "emergency"
            ? "What's your name?"
            : flow.kind === "callback"
              ? this.pick(["What's your name?", "Who should we ask for when we call?"])
              : this.pick([
                  "What's your name?",
                  "First, who should our technician ask for?",
                  "Can I get your name?",
                ]),
          [],
          { placeholder: "Your name", mode: "text" },
        );
      case "phone":
        return say(
          `${s.name && !lead ? `Thanks${first}! ` : ""}What's the best phone number to reach you?`,
          flow.attempts > 0 ? ["Why do you need it?", "Use email instead"] : [],
          { placeholder: "(206) 555-0123", mode: "tel" },
        );
      case "location":
        return say(
          flow.kind === "emergency"
            ? "What's the ZIP code (or city) of the address?"
            : "What's the ZIP code (or city) where you need service?",
          flow.attempts > 1 ? ["Skip"] : [],
          { placeholder: "ZIP code or city", mode: "text" },
        );
      case "email":
        return s.phoneDeclined
          ? say(
              "No problem. Since we won't have a phone number, what's the best email to reach you?",
              [],
              {
                placeholder: "you@example.com",
                mode: "email",
              },
            )
          : say(
              "And your email address, in case the team wants to send details or a quote? (Optional: tap Skip if you'd rather not.)",
              ["Skip"],
              {
                placeholder: "you@example.com",
                mode: "email",
              },
            );
      case "timing":
        return say(
          "Last one: when would you like us to come out?",
          ["ASAP", "Today", "Tomorrow", "This week", "I'm flexible"],
          { placeholder: "e.g. tomorrow morning", mode: "text" },
        );
      case "confirm":
        return say(
          `Here's what I've got:\n${this.summaryLines().join("\n")}\n\nShall I send this to our team?`,
          ["✅ Yes, send it", "✏️ Make a change", "Cancel"],
        );
      case "editPick":
        return say(
          "Sure, what would you like to change?",
          FIELD_LABELS.filter(([st]) => FLOW_STEPS[flow.kind].includes(st)).map(([, l]) => l),
        );
      case "failed":
        return say("Want me to try sending it again?", ["Try again", "📞 I'll call now"]);
    }
  }

  private summaryLines(): string[] {
    const s = this.state.slots;
    const loc = [s.zip, s.city].filter(Boolean).join(", ");
    const covNote =
      s.coverage === "out"
        ? " (outside our usual area)"
        : s.coverage === "edge"
          ? " (team will confirm coverage)"
          : "";
    return [
      `• **Service:** ${s.services.join(", ") || "Not specified"}`,
      s.details ? `• **Problem:** ${truncate(s.details, 140)}` : "",
      `• **Name:** ${s.name ?? "Not provided"}`,
      `• **Phone:** ${s.phone ?? "Not provided"}`,
      `• **Email:** ${s.email ?? "Not provided"}`,
      `• **Location:** ${loc ? loc + covNote : "Not provided"}`,
      `• **Timing:** ${s.timing ?? "Flexible"}`,
    ].filter(Boolean);
  }

  private handleFlow(raw: string, norm: string): Turn {
    const flow = this.state.flow!;
    const s = this.state.slots;

    if (CANCEL_RE.test(norm) && !(flow.step === "details" && norm.split(" ").length > 4)) {
      this.state.flow = undefined;
      this.state.slots = {
        services: [],
        name: s.name,
        phone: s.phone,
        email: s.email,
        zip: s.zip,
        city: s.city,
        coverage: s.coverage,
      };
      this.state.offer = { kind: "anything-else" };
      return this.turn(
        [
          {
            text: "No problem, I've cancelled that request. Nothing was sent. Is there anything else I can help with?",
          },
        ],
        [...MAIN_MENU.slice(0, 3), "No, that's all"],
      );
    }

    if (flow.step === "failed") {
      if (
        /^(try again|retry|again|yes|ok|sure|resend|send again|please)/.test(norm) &&
        flow.pendingLead
      ) {
        return { ...this.turn([], []), lead: flow.pendingLead };
      }
      if (/call/.test(norm))
        return this.turn(
          [
            {
              text: `Tap below to call **${this.biz.phone}**. We pick up 24/7.`,
              actions: [{ type: "call" }],
            },
          ],
          ["Try again"],
        );
    }

    if (flow.step === "confirm") {
      const updated = this.absorbEntities(raw, norm, "confirm");
      if (updated.length) return this.ask([`Updated your ${updated.join(" and ")}. 👍`]);
      if (
        /^(yes|y|yep|yes send it|send|send it|confirm|confirmed|correct|looks good|looks great|all good|that is right|that is correct|perfect|submit|go ahead|ok|sure|do it|great|good)\b/.test(
          norm,
        ) &&
        !/\b(but|change|wrong|except)\b/.test(norm)
      )
        return this.emitLead([]);
      if (/\b(edit|change|fix|wrong|incorrect|update|mistake|not right|typo)\b|^no\b/.test(norm)) {
        const field = this.fieldFromText(norm);
        if (field) return this.editField(field);
        flow.step = "editPick";
        return this.ask();
      }
    }

    if (flow.step === "editPick") {
      const field = this.fieldFromText(norm);
      if (field) return this.editField(field);
      const updated = this.absorbEntities(raw, norm, "confirm");
      if (updated.length) {
        flow.step = "confirm";
        return this.ask([`Updated your ${updated.join(" and ")}. 👍`]);
      }
      if (/^(nothing|none|no|never mind|it is fine|all good|looks good)/.test(norm)) {
        flow.step = "confirm";
        return this.ask();
      }
      return this.ask(["Sorry, which part should I change?"]);
    }

    const step = flow.step;
    const before = this.snapshotFilled();
    const ack = this.stepAnswer(raw, norm, step);
    if (ack !== null) return this.advance([ack, ...this.extraAcks(before, step)]);
    const extras = this.extraAcks(before, step);
    if (extras.length)
      return this.ask(extras.map((x) => x.replace("I've also saved", "Thanks, I've saved")));

    if (WHY_RE.test(norm) && ["name", "phone", "email", "location"].includes(step)) {
      flow.attempts += 1;
      return this.stepError(raw, norm, step);
    }

    // Not an answer to the question: maybe a side question or a new situation.
    const scored = classify(norm);
    const top = scored[0];
    if (top && top.score >= 4 && top.intent.id !== "book" && top.intent.id !== "quote") {
      return this.interrupt(top.intent, raw, norm);
    }
    if (isQuestion(raw, norm) && top && top.score >= 1 && top.intent.kind !== "problem") {
      return this.interrupt(top.intent, raw, norm);
    }
    if (top?.intent.id === "book" || top?.intent.id === "quote") {
      return this.ask(["We're already working on that together! 😊"]);
    }

    flow.attempts += 1;
    return this.stepError(raw, norm, step);
  }

  /**
   * Tries to read the answer to `step` out of the message (plus any other
   * details it happens to contain). Returns an acknowledgement string when the
   * step got filled, or null when the message didn't answer it.
   */
  private stepAnswer(raw: string, norm: string, step: Step): string | null {
    const s = this.state.slots;
    const flow = this.state.flow!;
    const first = () => this.firstName();

    // Explanations the visitor asked for — answered, then the same question again.
    if (WHY_RE.test(norm) && ["name", "phone", "email", "location"].includes(step)) {
      return null;
    }

    switch (step) {
      case "service": {
        this.absorbEntities(raw, norm, step);
        const services = servicesFromText(norm, raw, this.ctx(raw, norm));
        if (services.length) {
          s.services = services;
          if (!s.details && norm.split(" ").length >= 3) s.details = stripGreeting(raw);
          return `Got it: **${services.join(", ")}**.`;
        }
        if (/\b(not sure|do not know|no idea|unsure|no clue)\b/.test(norm)) {
          s.services = ["Diagnosis needed"];
          return "No problem, the technician will diagnose it on site.";
        }
        if (isQuestion(raw, norm) || SKIP_RE.test(norm)) return null;
        if (norm.length >= 3 && !/^(ok|yes|no|hi|hello|hey)$/.test(norm)) {
          s.services = [`Other: ${truncate(raw, 80)}`];
          if (!s.details) s.details = raw;
          return "Thanks, I've noted that.";
        }
        return null;
      }
      case "details": {
        if (SKIP_RE.test(norm) && norm.split(" ").length <= 5) {
          s.detailsSkipped = true;
          return "No problem.";
        }
        const scored = classify(norm);
        const top = scored[0];
        if (isQuestion(raw, norm) && top && top.intent.kind !== "problem" && top.score >= 4)
          return null;
        if (norm.length < 2) return null;
        this.absorbEntities(raw, norm, step);
        s.details = truncate(raw, 500);
        if (flow.kind === "emergency" && top?.intent.kind === "problem") {
          const svc = servicesFromText(norm, raw, this.ctx(raw, norm));
          for (const x of svc) if (!s.services.includes(x)) s.services.push(x);
        }
        return this.pick([
          "Thanks, that's helpful.",
          "Got it, thanks for the details.",
          "Thanks! That'll help the tech come prepared.",
        ]);
      }
      case "name": {
        if (
          /\b(do not want|rather not|prefer not|no name|anonymous|skip)\b/.test(norm) ||
          SKIP_RE.test(norm)
        ) {
          if (flow.attempts >= 1) {
            s.nameSkipped = true;
            return "No worries, we'll skip the name.";
          }
          return null;
        }
        const name = parseNameAnswer(raw);
        this.absorbEntities(raw, norm, step);
        if (name) {
          s.name = name;
          return this.pick([
            `Nice to meet you, ${name.split(" ")[0]}!`,
            `Thanks, ${name.split(" ")[0]}!`,
            `Great to meet you, ${name.split(" ")[0]}.`,
          ]);
        }
        return null;
      }
      case "phone": {
        if (
          /use (my )?email|email instead|email me|contact me by email|by email/.test(norm) &&
          flow.kind !== "emergency" &&
          flow.kind !== "callback"
        ) {
          s.phoneDeclined = true;
          const e = extractEmail(raw);
          if (e) s.email = e.email;
          return "No problem, we'll use email.";
        }
        const phone = extractPhone(raw);
        this.absorbEntities(raw, norm, step);
        if (phone) {
          s.phone = phone;
          return `Got it: **${phone}**.`;
        }
        if (
          /\b(do not want|rather not|prefer not|no phone|do not have a phone|not comfortable)\b/.test(
            norm,
          ) ||
          (SKIP_RE.test(norm) && flow.attempts >= 1)
        ) {
          if (flow.kind === "emergency" || flow.kind === "callback") return null;
          s.phoneDeclined = true;
          return "That's okay, we can reach you by email instead.";
        }
        return null;
      }
      case "location": {
        const zip = extractZip(raw);
        const city = findCity(stripName(norm, s.name));
        this.absorbEntities(raw, norm, step);
        if (zip || city) return this.coverageAck(zip, city?.name ?? null, city?.coverage ?? null);
        if (SKIP_RE.test(norm) && flow.attempts >= 1) {
          s.locationSkipped = true;
          return "No problem, the team will confirm the address when they call.";
        }
        // Unknown town after a couple of tries: take it as typed and let the office check.
        if (
          flow.attempts >= 1 &&
          /^[a-z .'-]{3,40}$/.test(norm) &&
          !/^(yes|yeah|ok|sure|no|nope|maybe|idk|what|huh|hello|hi|hey|thanks|thank you|test)$/.test(
            norm,
          ) &&
          !isQuestion(raw, norm) &&
          !SKIP_RE.test(norm) &&
          !YES_RE.test(norm) &&
          !classify(norm)[0]
        ) {
          s.city = titleWords(raw.trim());
          s.coverage = "edge";
          return `Thanks, I've noted **${s.city}**. The team will confirm it's in our area.`;
        }
        return null;
      }
      case "email": {
        const e = extractEmail(raw);
        this.absorbEntities(raw, norm, step);
        if (e) {
          s.email = e.email;
          return e.fixedFrom
            ? `Got it: **${e.email}** (I fixed a small typo in the domain; let me know if that's wrong).`
            : `Got it: **${e.email}**.`;
        }
        if (
          !s.phoneDeclined &&
          (SKIP_RE.test(norm) || /\b(no email|do not have (an )?email|without email)\b/.test(norm))
        ) {
          s.emailSkipped = true;
          return "No problem, we'll reach you by phone.";
        }
        return null;
      }
      case "timing": {
        this.absorbEntities(raw, norm, step);
        const t = extractTiming(norm);
        if (t) {
          s.timing = t;
          if (t === "ASAP") return "ASAP, got it. We'll get you the earliest available slot.";
          return `${t}, noted.`;
        }
        if (SKIP_RE.test(norm) || /\b(not sure|no idea|do not know|unsure)\b/.test(norm)) {
          s.timingSkipped = true;
          return "No problem, the team will work out a time with you.";
        }
        if (
          !isQuestion(raw, norm) &&
          raw.trim().length <= 80 &&
          /\d|am|pm|week|day|morning|night|after|before|next|month/.test(norm) &&
          !classify(norm)[0]
        ) {
          s.timing = truncate(raw.trim(), 80);
          return "Noted.";
        }
        return null;
      }
      default:
        return null;
    }
  }

  /** Picks up any contact details present regardless of the current question. */
  private absorbEntities(raw: string, norm: string, step: Step): string[] {
    const s = this.state.slots;
    const updated: string[] = [];
    const phone = extractPhone(raw);
    if (phone && phone !== s.phone) {
      s.phone = phone;
      s.phoneDeclined = false;
      updated.push("phone");
    }
    const email = extractEmail(raw);
    if (email && email.email !== s.email) {
      s.email = email.email;
      s.emailSkipped = false;
      updated.push("email");
    }
    const zip = extractZip(raw);
    if (zip && zip !== s.zip) {
      s.zip = zip;
      s.coverage = classifyZip(zip);
      updated.push("ZIP code");
    }
    if (!zip && step !== "location" && !s.zip && !s.city) {
      const city = findCity(stripName(norm, s.name ?? parseNameAnswer(raw) ?? undefined));
      if (
        city &&
        new RegExp(
          `\\b(from|in|at|near|live|located|address is)\\s+(the )?${escapeRe(city.name.toLowerCase())}\\b`,
        ).test(norm)
      ) {
        s.city = city.name;
        s.coverage = city.coverage;
        updated.push("location");
      }
    }
    if (step !== "name") {
      const name = extractExplicitName(raw);
      if (name && name !== s.name) {
        s.name = name;
        updated.push("name");
      }
    }
    if (step === "confirm") {
      const t = /\b(time|timing|come|schedule|day|when)\b/.test(norm) ? extractTiming(norm) : null;
      if (t && t !== s.timing) {
        s.timing = t;
        updated.push("timing");
      }
      if (!zip) {
        const city = /\b(city|location|address|live in|located in|in)\b/.test(norm)
          ? findCity(stripName(norm, s.name))
          : null;
        if (city && city.name !== s.city) {
          s.city = city.name;
          s.coverage = city.coverage;
          updated.push("location");
        }
      }
    }
    return updated;
  }

  private snapshotFilled(): Record<string, string | undefined> {
    const s = this.state.slots;
    return { phone: s.phone, email: s.email, zip: s.zip ?? s.city, name: s.name };
  }

  /**
   * "I've also saved your number" when a message filled more than was asked,
   * "Updated your phone" when it corrected something given earlier.
   */
  private extraAcks(before: Record<string, string | undefined>, step: Step): string[] {
    const s = this.state.slots;
    const after: Record<string, string | undefined> = {
      phone: s.phone,
      email: s.email,
      zip: s.zip ?? s.city,
      name: s.name,
    };
    const own: Record<string, Step> = {
      phone: "phone",
      email: "email",
      zip: "location",
      name: "name",
    };
    const label: Record<string, string> = {
      phone: "phone number",
      email: "email",
      zip: "location",
      name: "name",
    };
    const saved: string[] = [];
    const updated: string[] = [];
    for (const k of Object.keys(after)) {
      if (own[k] === step || !after[k] || after[k] === before[k]) continue;
      (before[k] ? updated : saved).push(label[k]);
    }
    const out: string[] = [];
    if (saved.length) out.push(`I've also saved your ${saved.join(" and ")}.`);
    if (updated.length) out.push(`I've updated your ${updated.join(" and ")}. 👍`);
    return out;
  }

  private coverageAck(zip: string | null, city: string | null, cov: Coverage | null): string {
    const s = this.state.slots;
    if (zip) s.zip = zip;
    if (city) s.city = city;
    const coverage = zip ? classifyZip(zip) : cov!;
    s.coverage = coverage;
    const place = zip ?? city!;
    if (coverage === "in")
      return this.pick([
        `Great news, we serve **${place}**! 🎉`,
        `Perfect, **${place}** is right in our service area. 👍`,
      ]);
    if (coverage === "edge")
      return `**${place}** is near the edge of our area. I'll flag it so the team can confirm the schedule.`;
    return `Hmm, **${place}** looks like it's outside our usual service area (Greater Seattle, King & south Pierce counties). I'll still pass your request along and the team will let you know if they can help.`;
  }

  /** A side question in the middle of a flow: answer it, then pick up where we left off. */
  private interrupt(intent: Intent, raw: string, norm: string): Turn {
    const flow = this.state.flow!;
    const ctx = this.ctx(raw, norm);

    if (intent.id === "emergency" && flow.kind !== "emergency" && !TRUE_EMERGENCY.test(norm)) {
      this.state.slots.timing = "ASAP";
      return this.ask([
        "Got it, I'll mark this as **ASAP** so the team gets you the earliest slot.",
      ]);
    }
    if (intent.id === "emergency" && flow.kind !== "emergency") {
      flow.kind = "emergency";
      if (!this.state.slots.services.includes("Emergency Plumber"))
        this.state.slots.services.unshift("Emergency Plumber");
      this.state.slots.timing = "ASAP";
      return this.advance([
        `🚨 Understood, I'm marking this as an **emergency** so dispatch prioritizes it. For the fastest help you can also call **${this.biz.phone}** right now.`,
      ]);
    }
    if (intent.id === "human") {
      return this.ask([
        `You can reach a person anytime at **${this.biz.phone}**, or let's finish this and they'll call you.`,
      ]);
    }
    if (intent.kind === "problem" && flow.step !== "service") {
      const svc = servicesFromText(norm, raw, ctx);
      const added = svc.filter((x) => !this.state.slots.services.includes(x));
      this.state.slots.services.push(...added);
      if (!this.state.slots.details) this.state.slots.details = raw;
      return this.ask([
        added.length
          ? `I've added **${added.join(", ")}** to your request.`
          : "Noted, I'll pass that along to the tech.",
      ]);
    }
    if (intent.id === "goodbye" || intent.id === "thanks") {
      return this.ask([
        intent.id === "thanks" ? "You're welcome! 😊" : "Before you go, we're almost done!",
      ]);
    }

    const reply: IntentReply = intent.reply(ctx);
    if (reply.topic) this.state.topic = reply.topic;
    const answers = reply.messages.map((m) => ({ ...m }));
    const resume = this.ask(["↩️ Back to your request:"]);
    return this.turn(
      [...answers, ...resume.messages],
      resume.quickReplies,
      resume.input,
      resume.showServicePicker,
    );
  }

  private stepError(raw: string, norm: string, step: Step): Turn {
    const flow = this.state.flow!;
    const why = WHY_RE.test(norm);
    const tries = flow.attempts;
    const callHint = tries >= 3 ? ` If it's easier, you can call us at **${this.biz.phone}**.` : "";

    switch (step) {
      case "service":
        return this.ask(["Sorry, I didn't catch which service you need."]);
      case "details":
        return this.ask(["Could you describe the problem in a few words?"]);
      case "name":
        if (why)
          return this.ask([
            "It's just so our technician knows who to ask for when they arrive. A first name is fine!",
          ]);
        if (SKIP_RE.test(norm) || /\b(do not want|rather not|prefer not)\b/.test(norm))
          return this.ask([
            "No worries, a first name is totally fine. It just helps the tech know who to ask for. (Or say “skip” again to leave it blank.)",
          ]);
        return this.ask([`Hmm, that doesn't look like a name.${callHint}`]);
      case "phone": {
        if (why)
          return this.turn(
            [
              {
                text: "We only use it to confirm your appointment and so the technician can call when they're on the way. We never sell or share your number.\n\nWhat's the best number to reach you?",
              },
            ],
            flow.kind === "emergency" || flow.kind === "callback" ? [] : ["Use email instead"],
            { placeholder: "(206) 555-0123", mode: "tel" },
          );
        const d = digitCount(raw);
        if (
          (flow.kind === "emergency" || flow.kind === "callback") &&
          (SKIP_RE.test(norm) || /\b(rather not|prefer not)\b/.test(norm))
        )
          return this.ask([
            `For a callback we do need a phone number. Or you can call us directly at **${this.biz.phone}**.`,
          ]);
        if (d > 0 && d !== 10 && !(d === 11 && /^\D*1/.test(raw)))
          return this.ask([
            `Hmm, that looks like ${d} digit${d === 1 ? "" : "s"}. A US phone number has 10 (for example 206-555-0123).${callHint}`,
          ]);
        if (d === 10 || d === 11)
          return this.ask([
            `That number doesn't look quite right. Could you double-check it? (US numbers don't start with 0 or 1.)${callHint}`,
          ]);
        return this.ask([
          `I'll need a phone number with the area code, like 206-555-0123.${callHint}`,
        ]);
      }
      case "location":
        if (why)
          return this.ask([
            "It lets us check you're in our service area and send the nearest technician.",
          ]);
        if (/\b\d{1,4}\b/.test(raw) && !/\d{5}/.test(raw))
          return this.ask([
            "A ZIP code should be 5 digits (e.g. 98101). You can also just type your city.",
          ]);
        return this.ask([
          `I didn't recognize that location. Could you share the 5-digit ZIP code? (Or type “skip”.)${callHint}`,
        ]);
      case "email":
        if (why)
          return this.ask([
            "It's only so our team can follow up about your request. No newsletters or spam, promise.",
          ]);
        if (looksLikeBrokenEmail(raw))
          return this.ask(["That email looks incomplete. It should look like name@example.com."]);
        return this.ask([s_phoneDeclinedHint(this.state.slots.phoneDeclined)]);
      case "timing":
        return this.ask([
          "No problem if you're not sure. Tap an option below or type something like “tomorrow afternoon”.",
        ]);
      default:
        return this.ask();
    }
  }

  private fieldFromText(norm: string): Step | null {
    if (/\bname\b/.test(norm)) return "name";
    if (/\b(phone|number|cell|mobile)\b/.test(norm)) return "phone";
    if (/\b(email|e mail|mail)\b/.test(norm)) return "email";
    if (/\b(zip|location|address|city|area)\b/.test(norm)) return "location";
    if (/\b(service|services)\b/.test(norm)) return "service";
    if (/\b(time|timing|day|date|when|schedule)\b/.test(norm)) return "timing";
    if (/\b(problem|details|description|issue)\b/.test(norm)) return "details";
    return null;
  }

  private editField(field: Step): Turn {
    const flow = this.state.flow!;
    const s = this.state.slots;
    switch (field) {
      case "name":
        s.name = undefined;
        s.nameSkipped = false;
        break;
      case "phone":
        s.phone = undefined;
        s.phoneDeclined = false;
        break;
      case "email":
        s.email = undefined;
        s.emailSkipped = false;
        break;
      case "location":
        s.zip = undefined;
        s.city = undefined;
        s.coverage = undefined;
        s.locationSkipped = false;
        break;
      case "service":
        s.services = [];
        break;
      case "timing":
        s.timing = undefined;
        s.timingSkipped = false;
        break;
      case "details":
        s.details = undefined;
        s.detailsSkipped = false;
        break;
    }
    flow.step = field;
    flow.attempts = 0;
    flow.editing = true;
    return this.ask(["Sure!"]);
  }

  /* ── Lead ───────────────────────────────────────────────────────────── */

  private emitLead(prefix: string[]): Turn {
    const flow = this.state.flow!;
    const s = this.state.slots;
    const outOfArea = s.coverage === "out";
    const commercial =
      s.services.some((x) => /commercial|backflow/i.test(x)) ||
      /commercial|business|restaurant|property manag/i.test(s.details ?? "");
    const kindLabel = {
      booking: "Booking",
      quote: "Quote Request",
      emergency: "EMERGENCY",
      callback: "Callback Request",
    }[flow.kind];
    const areaNote =
      s.coverage === "out"
        ? "Outside service area: please review"
        : s.coverage === "edge"
          ? "Edge of service area: please confirm"
          : s.locationSkipped
            ? "Not provided"
            : undefined;

    const lead: LeadRequest = {
      source: `Chatbot ${kindLabel}${outOfArea ? " (Out of Area)" : ""}`,
      name: s.name,
      phone: s.phone,
      email: s.email,
      zip: s.zip,
      city: s.city,
      service: s.services.length
        ? [...s.services]
        : flow.kind === "callback"
          ? ["Callback request"]
          : undefined,
      serviceType: commercial ? "Commercial" : "Residential",
      message: [flow.topic, s.details].filter(Boolean).join(" · ") || undefined,
      urgency:
        flow.kind === "emergency"
          ? "EMERGENCY: call back immediately"
          : s.timing === "ASAP"
            ? "ASAP"
            : undefined,
      preferredTime:
        flow.kind === "emergency"
          ? "ASAP"
          : (s.timing ?? (s.timingSkipped ? "Flexible" : undefined)),
      areaNote,
      transcript: this.transcriptText(),
      outOfArea,
    };

    if (this.state.deliveredKeys.includes(leadKey(lead))) {
      this.state.flow = undefined;
      this.state.offer = { kind: "anything-else" };
      return this.turn(
        [
          {
            text: "Good news: I already sent that exact request to our team, so you're all set. 👍 Anything else I can help with?",
          },
        ],
        [...MAIN_MENU.slice(0, 3), "No, that's all"],
      );
    }

    flow.pendingLead = lead;
    const t = this.turn(prefix.length ? [{ text: prefix.join(" ") }] : [], []);
    return { ...t, lead };
  }

  private transcriptText(): string {
    const lines = this.state.transcript
      .slice(-40)
      .map(
        (l) =>
          `${l.from === "user" ? "Customer" : "Bot"}: ${l.text.replace(/\*\*/g, "").replace(/\n+/g, " ")}`,
      );
    let out = lines.join("\n");
    if (out.length > 6000) out = "…" + out.slice(-6000);
    return out;
  }

  /* ── Helpers ────────────────────────────────────────────────────────── */

  private ctx(raw: string, norm: string): ReplyContext {
    return {
      biz: this.biz,
      name: this.state.slots.name,
      topic: this.state.topic,
      pacific: pacificNow(this.now()),
      pick: <T>(o: T[]) => this.pick(o),
      raw,
      norm,
    };
  }

  /** Random variant that never repeats the previous choice for the same prompt set. */
  private pick<T>(options: T[]): T {
    if (options.length <= 1) return options[0];
    const key = String(options[0]).slice(0, 40);
    const last = this.state.lastPicks[key];
    let i = Math.floor(this.random() * options.length) % options.length;
    if (i === last) i = (i + 1) % options.length;
    this.state.lastPicks[key] = i;
    return options[i];
  }

  private firstName(): string {
    const n = this.state.slots.name;
    return n ? `, ${n.split(" ")[0]}` : "";
  }

  private defaultQuick(): string[] {
    return MAIN_MENU;
  }

  private log(from: "bot" | "user", text: string) {
    this.state.transcript.push({ from, text });
    if (this.state.transcript.length > 80)
      this.state.transcript.splice(0, this.state.transcript.length - 80);
  }

  private turn(
    messages: BotMessage[],
    quickReplies: string[],
    input: Turn["input"] = TEXT_INPUT,
    showServicePicker = false,
  ): Turn {
    return { messages, quickReplies, showServicePicker, input };
  }

  /** Records what the bot said, so the emailed transcript reads like the chat. */
  private logged(t: Turn): Turn {
    for (const m of t.messages) this.log("bot", m.text);
    return t;
  }
}

/* ── Module helpers ───────────────────────────────────────────────────── */

/** "Why do you need my number?" and friends. */
const WHY_RE =
  /why do you need|why do you want|why is it needed|what is it for|what for|is it safe|do you sell|privacy|spam/;

/** Real emergencies, as opposed to someone who's just in a hurry ("asap"). */
const TRUE_EMERGENCY =
  /\b(emergency|burst|flood|flooding|flooded|gushing|spraying|pouring|sewage|overflowing|everywhere|can not stop|can not shut|no water)\b/;

const TEXT_INPUT: Turn["input"] = { placeholder: "Type a message…", mode: "text" };

function s_phoneDeclinedHint(phoneDeclined?: boolean): string {
  return phoneDeclined
    ? "Since we won't have a phone number, we'll need an email to reach you, like name@example.com."
    : "That doesn't look like an email address. It should look like name@example.com, or tap Skip.";
}

/** "Hi there, my sink is clogged" → "my sink is clogged" for the emailed problem details. */
function stripGreeting(raw: string): string {
  const t = raw
    .replace(
      /^\s*((hi|hello|hey|yo|hiya|howdy|heya|greetings|good (morning|afternoon|evening|day))( there)?[\s,!.:;-]*)+/i,
      "",
    )
    .trim();
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : raw.trim();
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripName(norm: string, name?: string): string {
  if (!name) return norm;
  return ` ${norm} `.replace(` ${name.toLowerCase()} `, " ").trim();
}

function truncate(s: string, n: number): string {
  const t = s.trim();
  return t.length > n ? t.slice(0, n - 1) + "…" : t;
}

function titleWords(s: string): string {
  return s.toLowerCase().replace(/(^|\s)(\p{L})/gu, (_, p, c) => p + c.toUpperCase());
}

function leadKey(l: LeadRequest): string {
  return JSON.stringify([
    l.name,
    l.phone,
    l.email,
    l.zip,
    l.city,
    l.service,
    l.message,
    l.preferredTime,
  ]);
}

/** Services implied by free text ("toilet overflowing and no hot water" → two). */
export function servicesFromText(norm: string, raw: string, ctx: ReplyContext): string[] {
  const scored = classify(norm).filter(
    (x) =>
      x.intent.kind === "problem" || x.intent.id === "commercial" || x.intent.id === "emergency",
  );
  if (!scored.length) return [];
  const best = scored[0].score;
  const out: string[] = [];
  for (const x of scored) {
    if (x.score < Math.max(2, best * 0.5) && x !== scored[0]) continue;
    const r = x.intent.reply({ ...ctx, raw, norm });
    const svc = (r.offer && r.offer.kind === "book" && r.offer.service) || x.intent.service;
    if (svc && !out.includes(svc)) out.push(svc);
  }
  return out.slice(0, 3);
}
