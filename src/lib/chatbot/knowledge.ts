/**
 * knowledge.ts
 *
 * Everything the All Phase assistant "knows": small talk, company facts,
 * plumbing troubleshooting, and which service each problem maps to. Each
 * intent lists the phrases that trigger it (matched after normalization,
 * typo correction and stemming — so "toliet leakin" still hits "toilet leak")
 * and a reply builder with several phrasings so the bot doesn't sound canned.
 *
 * Facts here mirror the site copy (wp-defaults, FAQs, coupons). If a fact
 * changes on the site, change it here too. When the site doesn't state
 * something (financing terms, exact prices), the bot says the team will
 * confirm rather than inventing an answer.
 */

import { COUPONS } from "@/data/coupons";
import { HEADLINE_CITIES } from "./service-area";
import type { BotMessage, IntentReply, ReplyContext } from "./types";

export type IntentKind = "social" | "info" | "problem" | "action" | "safety";

export interface Intent {
  id: string;
  kind: IntentKind;
  /** "|"-separated phrases. Single words score 1, multi-word phrases 2. */
  phrases?: string;
  /** "|"-separated phrases that are decisive on their own (score 4). */
  strong?: string;
  /** Regexes over the normalized text (score 4). */
  patterns?: RegExp[];
  /** Tie-break: higher wins. Safety > emergency > problems > info > social. */
  priority?: number;
  /** Service value prefilled into a booking started from this intent. */
  service?: string;
  reply: (ctx: ReplyContext) => IntentReply;
}

/* ── Shared copy ──────────────────────────────────────────────────────── */

export const MAIN_MENU = [
  "📅 Book a plumber",
  "🚨 Emergency help",
  "💲 Get a quote",
  "🕒 Hours & areas",
];
export const MORE_MENU = ["🏷️ Coupons & deals", "🔧 Services we offer", "👤 Talk to a person"];
const OFFER_REPLIES = ["Yes, book it", "How much does it cost?", "Not right now"];

const call = (label = "Call now") => ({ type: "call" as const, label });
const link = (label: string, href: string) => ({ type: "link" as const, label, href });

function msg(text: string, extra: Partial<BotMessage> = {}): BotMessage {
  return { text, ...extra };
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const hi = (ctx: ReplyContext) => (ctx.name ? `, ${ctx.name.split(" ")[0]}` : "");

/**
 * Standard shape for a plumbing problem: empathy, a genuinely useful tip,
 * then an offer to send someone (which "yes" / "sure" / "ok" accepts).
 */
function problem(
  ctx: ReplyContext,
  opts: {
    empathy: string[];
    tip: string;
    service: string;
    topic: string;
    page?: [string, string];
    urgent?: boolean;
  },
): IntentReply {
  // "Do you do drain cleaning?" deserves "Yes, we do!", not "Ugh, a clog is the worst".
  const asking =
    /^(do|can|does|will|would) (you|u|you guys|you all|y all|all phase)\b/.test(ctx.norm) ||
    /\b(do|can) (you|u) (guys )?(do|offer|handle|fix|repair|install|service|work on|take care of)\b/.test(
      ctx.norm,
    );
  const opener = asking
    ? ctx.pick([
        `Yes, we do! ${cap(opts.topic)} is part of our everyday work.`,
        `Absolutely, we handle ${opts.topic} all the time.`,
      ])
    : ctx.pick(opts.empathy);
  const offer = opts.urgent
    ? "This one shouldn't wait. Want me to get a plumber headed your way?"
    : ctx.pick([
        "Want me to get a licensed plumber out to take a look?",
        "Would you like me to book a visit so a tech can fix it properly?",
        "Want me to set up a visit? It only takes a minute.",
      ]);
  return {
    messages: [
      msg(`${opener}\n\n${opts.tip}`, {
        actions: opts.page ? [link(opts.page[0], opts.page[1])] : undefined,
      }),
      msg(offer),
    ],
    quickReplies: opts.urgent
      ? ["Yes, send someone", "📞 I'll call now", "Not right now"]
      : OFFER_REPLIES,
    offer: { kind: "book", service: opts.service, flow: opts.urgent ? "emergency" : "booking" },
    topic: opts.topic,
  };
}

const JOKES = [
  "Why did the plumber break up with the sink? It was a draining relationship. 🥁",
  "What's a plumber's favorite shoe? Clogs. 👞",
  "I told a plumber joke once… it went right down the drain.",
  "Why don't plumbers ever get lost? They always know where the pipes lead.",
  "What did the toilet say to the plumber? “You've got a lot of nerve showing up here, but I'm flushed you came.”",
];

/* ── Intents ──────────────────────────────────────────────────────────── */

export const INTENTS: Intent[] = [
  /* ─── Safety & urgency ─── */
  {
    id: "gas_smell",
    kind: "safety",
    priority: 100,
    strong:
      "smell gas|smells like gas|gas smell|gas leak|leaking gas|gas odor|rotten egg|rotten eggs|sulfur smell|hissing gas",
    patterns: [/\bgas\b.*\b(smell|leak|odor|hiss)/, /\b(smell|leak|odor|hiss)\w*\b.*\bgas\b/],
    service: "Gas Line Repair",
    reply: (ctx) => ({
      messages: [
        msg(
          "⚠️ **If you smell gas, please leave the building right now.**\n\n• Don't flip light switches, use appliances, or light anything\n• Leave the door open on your way out\n• Once you're outside, call **911** and your gas utility\n\nAfter the utility has made it safe, our licensed techs can find and repair the gas line.",
          {
            tone: "alert",
            actions: [link("Gas line repair", "/services/plumbing/gas-line-repair")],
          },
        ),
        msg("When you're safe, want me to have our team call you about the repair?"),
      ],
      quickReplies: ["Yes, call me back", "📞 Call All Phase", "I'm safe, just a question"],
      offer: { kind: "callback", topic: "Gas line repair (customer reported gas smell)" },
      topic: "gas line repair",
    }),
  },
  {
    id: "emergency",
    kind: "safety",
    priority: 90,
    strong:
      "emergency|urgent|asap|burst pipe|pipe burst|pipes burst|burst|flooding|flooded|flood|water everywhere|gushing|spraying water|water spraying|pouring water|water pouring|sewage backing up|sewage everywhere|sewer backup|overflowing|can not stop the water|can not shut off|wont stop running|ceiling is leaking|ceiling leaking|water through ceiling|no water at all|help now|right now|immediately",
    patterns: [
      /\b(need|want|get)\b.*\b(plumber|someone|somebody|help)\b.*\b(now|today|tonight|immediately|fast|quick)\b/,
    ],
    service: "Emergency Plumber",
    reply: (ctx) => ({
      messages: [
        msg(
          `${ctx.pick(["I'm on it", "Okay, let's move fast", "Got it, we'll treat this as urgent"])}${hi(ctx)}. We run **24/7 emergency service**, nights, weekends and holidays included.\n\n**While you wait:** if water is leaking, shut off your main water valve (usually where the line enters the house: basement, crawlspace, garage or near the water heater), and keep clear of any wet outlets or electrics.`,
          { tone: "alert", actions: [call(`Call ${ctx.biz.phone}`)] },
        ),
        msg(
          "The fastest way is to call. Or give me your name and number and I'll flag it to dispatch as an emergency right now.",
        ),
      ],
      quickReplies: ["Send someone now", "📞 I'll call now", "It's not an emergency"],
      offer: { kind: "emergency" },
      topic: "emergency plumbing",
    }),
  },

  /* ─── Actions ─── */
  {
    id: "book",
    kind: "action",
    priority: 60,
    strong:
      "book|booking|book a plumber|book a service|schedule|make an appointment|set up an appointment|appointment|send a plumber|send someone|send a technician|need a plumber|get a plumber|hire|can you come out|someone come out|come out today|come by|come take a look|come fix|service call|set up a visit|come to my house|come to my home|come over|come out to|house call|send someone out|someone to come|someone come look|get someone out",
    phrases: "plumber|available slot|can someone come|can you come",
    reply: () => ({ messages: [], startFlow: { kind: "booking" } }),
  },
  {
    id: "quote",
    kind: "action",
    priority: 55,
    strong: "get a quote|quote|estimate|free estimate|free quote|bid",
    reply: (ctx) =>
      /\b(free|charge|cost|fee|pay)\b/.test(ctx.norm) &&
      /\?|^(do|is|are|does|how)\b/.test(ctx.raw.trim().toLowerCase())
        ? {
            messages: [
              msg(
                `Every job starts with a **clear, flat-rate quote before any work begins**, so you know the exact price and can decide before we touch anything. Whether there's a service-call fee depends on the job; the office will confirm that upfront when you book (**${ctx.biz.phone}**).`,
              ),
              msg("Want me to set up a visit so you can get an exact quote?"),
            ],
            quickReplies: ["Yes, book it", "🏷️ Coupons & deals", "Not right now"],
            offer: { kind: "book", flow: "quote" },
          }
        : {
            messages: [
              msg(
                ctx.pick([
                  "Happy to get you a quote! We price every job as a **flat rate, upfront, before any work begins**, so there are no surprises on the invoice.",
                  "Sure thing. All our work is quoted as a **flat rate before we start**. The price you agree to is the price you pay.",
                ]),
              ),
            ],
            startFlow: { kind: "quote" },
          },
  },
  {
    id: "human",
    kind: "action",
    priority: 58,
    strong:
      "talk to a person|talk to someone|talk to a human|speak to a person|speak to someone|speak with someone|real person|real human|get a human|need a human|human please|live agent|representative|operator|customer service|speak to manager|talk to manager|call me back|call me|callback|have someone call|someone call me|phone call",
    patterns: [
      /\b(talk|speak|chat)\b.*\b(person|human|someone|somebody|agent|representative|people|manager)\b/,
    ],
    reply: (ctx) => ({
      messages: [
        msg(
          `Of course! You can reach our team directly at **${ctx.biz.phone}**. Phones are answered 24/7.`,
          { actions: [call(`Call ${ctx.biz.phone}`)] },
        ),
        msg("Or if it's easier, leave your name and number and someone will call you back."),
      ],
      quickReplies: ["Yes, call me back", "📞 I'll call now", "No thanks"],
      offer: { kind: "callback" },
    }),
  },

  /* ─── Plumbing problems ─── */
  {
    id: "drain_clog",
    kind: "problem",
    priority: 40,
    service: "Drain Cleaning",
    strong:
      "clogged drain|drain clogged|drain is clogged|slow drain|drain slow|draining slow|not draining|wont drain|will not drain|does not drain|backed up sink|sink backed up|sink clogged|clogged sink|shower clogged|clogged shower|tub clogged|clogged tub|bathtub clogged|standing water|drain backing up|drain backed up|kitchen sink backed|kitchen sink clogged|drain cleaning|clean my drain|unclog",
    phrases: "clog|drain|gurgl|hair|grease|slow|backed up|backing up|sink|tub|shower",
    reply: (ctx) =>
      problem(ctx, {
        empathy: [
          "Ugh, a clogged drain is the worst.",
          "Slow or clogged drains are one of our most common calls, so you're in good hands.",
          "Sorry you're dealing with a clog!",
        ],
        tip: "**Quick tip:** skip the chemical drain cleaners. They can eat away at pipes. A plunger or a drain snake often clears a single fixture. If **several drains** are slow or gurgling at once, that usually points to the main sewer line and needs a pro.\n\n🏷️ We also have **$100 off drain cleaning**, which includes a free camera inspection of your main sewer line.",
        service: "Drain Cleaning",
        topic: "drain cleaning",
        page: ["Drain cleaning", "/services/drain-cleaning"],
      }),
  },
  {
    id: "toilet",
    kind: "problem",
    priority: 42,
    service: "Toilets & Faucets",
    strong:
      "toilet clogged|clogged toilet|toilet overflowing|toilet overflow|toilet running|running toilet|toilet keeps running|toilet wont flush|toilet will not flush|toilet not flushing|weak flush|toilet leaking|leaking toilet|toilet leak|toilet rocking|wobbly toilet|new toilet|replace toilet|toilet install|install a toilet|toilet repair|fix my toilet|toilet broken|broken toilet",
    phrases: "toilet|flush|commode|loo",
    reply: (ctx) => {
      const n = ctx.norm;
      const overflowing = /overflow/.test(n);
      const running =
        /(keeps|is|still|constantly|always|will not stop|wont stop) running|running toilet|toilet running|runs (constantly|all the time|nonstop)/.test(
          n,
        );
      const leaking = /leak|puddle|water on the floor|base|seep/.test(n);
      const gurgling = /gurgl|bubbl/.test(n);
      const install =
        /\b(new|install|installed|installing|installation|replace|replacing|upgrade)\b/.test(n);
      const tip = gurgling
        ? "**Good to know:** a toilet that gurgles or bubbles when another fixture drains (like the washer or shower) usually points to a partial clog in the main line or a blocked vent. It's worth catching early before it turns into a backup."
        : install && !overflowing && !leaking
          ? "We install all makes of toilets, including comfort-height, dual-flush and water-saving models. Removal and haul-away of the old one is part of the job, and every install comes with our written warranty."
          : leaking && !overflowing
            ? "**Good to know:** water around the base usually means a worn wax ring; drips from the tank point to the tank bolts or supply line. Turn the valve behind the toilet clockwise to stop the water, and avoid flushing until it's fixed so the subfloor doesn't get damaged."
            : overflowing
              ? "**Right now:** turn the shut-off valve behind the toilet clockwise to stop the water, and don't flush again. Lifting the tank lid and pushing the flapper down also stops the flow."
              : running
                ? "**Good to know:** a toilet that keeps running is usually a worn flapper or fill valve. It's a small fix, but it can waste hundreds of gallons a day. You can turn the valve behind the toilet clockwise to stop it until it's repaired."
                : "**Quick tip:** for a clog, a flange-style plunger works best. Avoid flushing repeatedly since that's how overflows happen. If it clogs often, there may be a blockage further down the line.";
      return problem(ctx, {
        empathy:
          install && !overflowing && !leaking && !gurgling
            ? ["Nice upgrade! A new toilet is a quick job for our techs."]
            : [
                "Toilet trouble is never fun, but it's very fixable.",
                "Oh no, sorry about the toilet!",
                "We fix toilets every single day, so this is right in our wheelhouse.",
              ],
        tip,
        service: gurgling
          ? "Drain Cleaning"
          : install
            ? "Toilet Installation"
            : "Toilets & Faucets",
        topic: gurgling ? "drain cleaning" : install ? "toilet installation" : "toilet repair",
        page: ["Toilet repair", "/services/plumbing/toilets"],
        urgent: overflowing,
      });
    },
  },
  {
    id: "faucet",
    kind: "problem",
    priority: 38,
    service: "Toilets & Faucets",
    strong:
      "leaky faucet|leaking faucet|faucet leaking|faucet leak|dripping faucet|faucet dripping|faucet drips|dripping tap|new faucet|replace faucet|replace my faucet|install faucet|faucet install|faucet installation|faucet broken|kitchen faucet|bathroom faucet|outdoor faucet|hose bib|spigot|outside faucet|shower head|showerhead|shower valve|shower leaking|drip|dripping|drips|sink dripping|sink drips|faucet handle|handle broke",
    phrases: "faucet|tap|spout|fixture",
    reply: (ctx) =>
      /outdoor|outside|spigot|hose bib|hose|garden/.test(ctx.norm)
        ? problem(ctx, {
            empathy: [
              "Outdoor faucets take a beating in Seattle winters.",
              "Let's get that spigot sorted.",
            ],
            tip: "**In the meantime:** most outdoor faucets have an indoor shut-off on the same line (basement, crawlspace or garage). If you can't find it, use the main valve. We repair and replace hose bibs, including frost-free models, and always disconnect garden hoses before a freeze.",
            service: "Outdoor Faucet Repair",
            topic: "outdoor faucet repair",
            page: ["Outdoor faucet repair", "/services/plumbing/outdoor-faucet-repair"],
          })
        : problem(ctx, {
            empathy: [
              "A dripping faucet adds up fast. One drip a second is over 3,000 gallons a year!",
              "Faucets are a quick fix for our techs.",
              "Good call getting that looked at.",
            ],
            tip: "**In the meantime:** the shut-off valves under the sink (turn clockwise) will stop the water to that faucet. Drips usually come from a worn cartridge or washer. We repair or replace faucets and fixtures of every major brand.",
            service: "Toilets & Faucets",
            topic: "faucet repair",
            page: ["Faucets & fixtures", "/services/plumbing/faucet-installation"],
          }),
  },
  {
    id: "water_heater",
    kind: "problem",
    priority: 44,
    service: "Water Heaters",
    strong:
      "water heater|hot water heater|hot water tank|no hot water|not getting hot water|hot water not working|hot water ran out|runs out of hot water|lukewarm water|water not hot|water heater leaking|pilot light|tankless|tank less|water too hot|heater rumbling|heater making noise|new water heater|replace water heater|water heater install|water heater repair|hot water system|hot water smells|hot water smell|hot water stinks|water heater smells",
    phrases: "heater|hot water|boiler|rheem|navien|rinnai|bradford white|ao smith",
    reply: (ctx) => {
      const n = ctx.norm;
      if (/tankless|tank less/.test(n) && !/(leak|broke|not work|no hot)/.test(n))
        return problem(ctx, {
          empathy: ["Tankless is a great upgrade.", "Good choice to look at tankless!"],
          tip: "Tankless units give you **endless hot water** and lower energy bills, and they last around 20 years. We handle sizing, installation, and any gas, venting or electrical upgrades. A typical install takes **4–8 hours**.\n\n🏷️ There's **$250 off any residential water heater** right now.",
          service: "Water Heaters",
          topic: "tankless water heater",
          page: ["Tankless water heaters", "/services/plumbing/tankless-water-heaters"],
        });
      if (/rotten egg|sulfur|smell|stink/.test(n))
        return problem(ctx, {
          empathy: [
            "That rotten-egg smell in hot water is almost always the water heater, not a gas leak.",
          ],
          tip: "When the smell is **only in the hot water**, bacteria in the tank are reacting with the heater's anode rod. Flushing the tank and swapping the anode rod usually fixes it for good. (If you smell it in the air near appliances, treat it as a possible gas leak: leave and call 911.)",
          service: "Water Heaters",
          topic: "water heater",
          page: ["Water heaters", "/services/water-heaters"],
        });
      if (/how long (does|will|would) it take|how many hours|take to (install|replace)/.test(n))
        return problem(ctx, {
          empathy: ["Good question!"],
          tip: "Most standard tank replacements are done **the same day, in a few hours**. Tankless conversions take longer, typically **4–8 hours**, depending on gas, venting and electrical upgrades. We'll give you an accurate timeline before we start.",
          service: "Water Heaters",
          topic: "water heater",
          page: ["Water heaters", "/services/water-heaters"],
        });
      if (
        /how old|lifespan|how long (do|does|should|will)|last|when (should|to) replace|before replac|repair or replace|worth (fixing|repairing)/.test(
          n,
        )
      )
        return problem(ctx, {
          empathy: ["Good question, and knowing this can save you money."],
          tip: "Tank water heaters usually last **8–12 years**; tankless units around **20**. If yours is under 8–10 years and the repair is minor, fixing it usually makes sense. Older tanks that leak or keep failing are often cheaper to replace. We'll give you an honest recommendation, not a sales pitch.\n\n🏷️ There's **$250 off any residential water heater** right now.",
          service: "Water Heaters",
          topic: "water heater",
          page: ["Water heaters", "/services/water-heaters"],
        });
      const leaking = /leak|puddle|dripping|water under|flood/.test(n);
      return problem(ctx, {
        empathy: leaking
          ? ["A leaking water heater needs attention quickly."]
          : [
              "No hot water is miserable, so let's fix that.",
              "Cold showers are nobody's idea of fun!",
              "Water heater issues are one of our specialties.",
            ],
        tip: leaking
          ? "**Right now:** close the cold-water valve on top of the tank, and turn the gas knob to OFF/pilot (or switch off the breaker for an electric unit). Keep kids and pets clear because the water can be scalding."
          : "**Quick checks:** on a gas heater, see if the pilot light is out. On electric, check the breaker. If the tank is **over 8–10 years old** or keeps failing, replacing it is often cheaper than repairing. We'll give you an honest recommendation either way.\n\n🏷️ There's **$250 off any residential water heater** right now, and most standard replacements are done **the same day**.",
        service: "Water Heaters",
        topic: "water heater",
        page: ["Water heaters", "/services/water-heaters"],
        urgent: leaking,
      });
    },
  },
  {
    id: "leak",
    kind: "problem",
    priority: 36,
    service: "Leak Detection",
    strong:
      "leak detection|hidden leak|water leak|leaking pipe|pipe leaking|pipe leak|leak under sink|under the sink leaking|water stain|stain on ceiling|wet spot|wet wall|damp wall|water damage|mold under sink|high water bill|water bill high|water bill went up|hear water running|sound of running water|ceiling dripping|dripping from ceiling|dripping from the ceiling|water dripping from ceiling|slab leak|warm spot|warm spot on floor|warm spot on the floor|warm floor|hot spot on floor|meter spinning|leak",
    phrases: "leaking|leaky|drip|damp|wet|moisture|puddle|mold|stain",
    reply: (ctx) => {
      const slab = /slab|warm spot|warm floor|foundation/.test(ctx.norm);
      return problem(ctx, {
        empathy: [
          "Leaks are sneaky, and the sooner they're found, the less damage they do.",
          "Good catch, catching a leak early saves a lot of money.",
          "Sorry you've got a leak on your hands.",
        ],
        tip: slab
          ? "Warm spots on the floor, the sound of running water, or a jump in your water bill are classic **slab leak** signs. We use non-invasive leak detection to pinpoint it before opening anything up."
          : "**Handy check:** turn off every fixture and look at your water meter. If it's still moving, there's a leak somewhere. We use non-invasive leak detection to find hidden leaks without tearing up walls. If water is actively spreading, shut off your main valve.",
        service: slab ? "Slab Leak Repair" : "Leak Detection",
        topic: slab ? "slab leak repair" : "leak detection",
        page: slab
          ? ["Slab leak repair", "/services/plumbing/slab-leak-repair"]
          : ["Leak detection", "/services/plumbing/leak-detection"],
      });
    },
  },
  {
    id: "frozen_pipe",
    kind: "problem",
    priority: 46,
    service: "Emergency Plumber",
    strong:
      "frozen pipe|frozen pipes|pipe frozen|pipes frozen|pipes froze|pipe froze|freezing pipes|no water freezing|pipes are frozen",
    phrases: "frozen|freeze|froze",
    reply: (ctx) =>
      problem(ctx, {
        empathy: ["Frozen pipes need care, since a frozen pipe can burst as it thaws."],
        tip: "**Do this now:** open the faucet on that line so melting water can escape, and warm the pipe gently with a hair dryer or space heater. **Never use an open flame.** If you see a crack or it starts spraying, shut off the main water valve right away.",
        service: "Emergency Plumber",
        topic: "frozen pipes",
        page: ["Burst & frozen pipes", "/services/plumbing/burst-pipe-repair"],
        urgent: true,
      }),
  },
  {
    id: "sewer",
    kind: "problem",
    priority: 41,
    service: "Sewer Repair",
    strong:
      "sewer line|sewer pipe|main line|mainline|main sewer|sewer smell|smells like sewage|sewage smell|smells like sewer|sewer odor|tree roots|roots in pipe|roots in sewer|sewer repair|sewer replacement|trenchless|camera inspection|sewer camera|sewer scope|side sewer|multiple drains|all drains|every drain|basement drain backing up|floor drain backing up|sewer backing up|sewer backed up|backing up into|backed up into|coming up through|water coming up|floor drain|up through the drain|sewage in",
    phrases: "sewer|sewage|septic smell|root|odor|stink|smell",
    reply: (ctx) => {
      const smell = /smell|odor|stink/.test(ctx.norm);
      if (/trenchless/.test(ctx.norm))
        return problem(ctx, {
          empathy: ["Trenchless is a great option when it fits."],
          tip: "Instead of digging a trench across your yard, **trenchless repair** relines or replaces the sewer pipe through one or two small access points. It's less mess, usually faster, and your landscaping, driveway and trees stay put. A camera inspection first tells us if your line is a good candidate.",
          service: "Sewer Repair",
          topic: "trenchless sewer repair",
          page: ["Sewer services", "/services/sewer-services"],
        });
      const backup = /back(ing|ed)? ?up|coming up|overflow|sewage in/.test(ctx.norm);
      return problem(ctx, {
        empathy: smell
          ? ["A sewer smell definitely isn't something to live with."]
          : backup
            ? ["Sewage backing up is urgent. Stop running water and flushing until it's cleared."]
            : ["Sewer line problems are a big deal, but we handle them every week."],
        tip: smell
          ? "**Try this first:** run water in any rarely used drains (guest shower, basement floor drain). A dried-out P-trap lets sewer gas in. If the smell sticks around, it may be a cracked line or a vent problem, and a camera inspection will tell us exactly what's going on."
          : "When **multiple drains** back up or gurgle, it's usually the main line: roots, a collapsed clay pipe (very common in older Seattle homes), or buildup. We run a **camera inspection** to find the exact cause, and offer trenchless repair where possible so your yard stays intact.",
        service: "Sewer Repair",
        topic: "sewer line repair",
        page: ["Sewer services", "/services/sewer-services"],
        urgent: backup && !smell,
      });
    },
  },
  {
    id: "hydro_jetting",
    kind: "problem",
    priority: 43,
    service: "Hydro Jetting",
    strong: "hydro jetting|hydrojetting|hydro jet|hydrojet|jetting|jet the line|water jetting",
    reply: (ctx) =>
      problem(ctx, {
        empathy: ["Hydro jetting is our go-to for stubborn and recurring clogs."],
        tip: "It uses high-pressure water to scour years of grease, scale and roots from the inside of your pipes, leaving them close to new. Much more thorough than a snake, which just punches a hole through the clog.",
        service: "Hydro Jetting",
        topic: "hydro jetting",
        page: ["Hydro jetting", "/services/hydro-jetting"],
      }),
  },
  {
    id: "disposal",
    kind: "problem",
    priority: 42,
    service: "Garbage Disposals",
    strong:
      "garbage disposal|disposal|insinkerator|garburator|disposal jammed|disposal humming|disposal not working|disposal leaking",
    reply: (ctx) =>
      /smell|stink|odor/.test(ctx.norm)
        ? problem(ctx, {
            empathy: ["A smelly disposal is common and usually easy to fix."],
            tip: "**Try this:** with the water running, grind a handful of ice cubes and a few citrus peels, then flush with baking soda and hot water. Skip bleach. If the smell keeps coming back, food may be trapped in the drain line or the unit may be failing, and we can clean or replace it.",
            service: "Garbage Disposals",
            topic: "garbage disposal",
            page: ["Garbage disposals", "/services/plumbing/garbage-disposals"],
          })
        : problem(ctx, {
            empathy: ["Garbage disposals love to jam at the worst time."],
            tip: "**Safe fix to try:** switch it off (and unplug it or flip the breaker). **Never put your hand inside.** Press the red reset button underneath, and use an Allen key in the hex slot on the bottom to work it back and forth. If it just hums, leaks, or trips the breaker, it's time for a repair or replacement.",
            service: "Garbage Disposals",
            topic: "garbage disposal",
            page: ["Garbage disposals", "/services/plumbing/garbage-disposals"],
          }),
  },
  {
    id: "sump_pump",
    kind: "problem",
    priority: 42,
    service: "Sump Pumps",
    strong:
      "sump pump|sump|basement flooding|water in basement|basement water|wet basement|crawlspace water|crawl space water|ejector pump",
    reply: (ctx) =>
      problem(ctx, {
        empathy: [
          "A working sump pump is your basement's best friend, especially in Seattle rain.",
        ],
        tip: "**Quick checks:** make sure it's plugged in and the GFCI outlet hasn't tripped, and that the float isn't stuck. Pour a bucket of water in the pit to test it. If it's running nonstop or not kicking on, we can repair or replace it.",
        service: "Sump Pumps",
        topic: "sump pump",
        page: ["Sump pumps", "/services/plumbing/sump-pumps"],
        urgent: /flood|water in basement/.test(ctx.norm),
      }),
  },
  {
    id: "repipe",
    kind: "problem",
    priority: 37,
    service: "Repiping",
    strong:
      "repipe|repiping|re pipe|whole house repipe|galvanized|polybutylene|old pipes|corroded pipes|rusty pipes|pipe replacement|replace pipes|replace my pipes|copper pipes|pex|pipe repair|fix a pipe|broken pipe|cracked pipe",
    phrases: "pipe|pipes|piping|corroded|corrosion",
    reply: (ctx) => {
      const repair =
        /repair|fix|broken|crack/.test(ctx.norm) &&
        !/repip|galvan|polybut|whole house/.test(ctx.norm);
      return problem(ctx, {
        empathy: repair
          ? ["Sorry about the pipe! We repair pipes of every type."]
          : ["Older pipes are one of the most common issues in Greater Seattle homes."],
        tip: repair
          ? "If it's actively leaking, shut the main valve until we get there. We repair or replace the damaged section (copper, PEX, galvanized or PVC) and check for any other weak spots nearby."
          : "Galvanized steel and polybutylene pipes corrode from the inside, causing low pressure, rusty water and leaks. A repipe with modern PEX or copper fixes all of it at once. We'll inspect and give you a flat-rate price first.",
        service: repair ? "Pipe Repair" : "Repiping",
        topic: repair ? "pipe repair" : "repiping",
        page: repair
          ? ["Pipe repair", "/services/plumbing/pipe-repair"]
          : ["Repiping", "/services/plumbing/repiping"],
      });
    },
  },
  {
    id: "water_pressure",
    kind: "problem",
    priority: 39,
    service: "Other: Low water pressure",
    strong:
      "low water pressure|water pressure|low pressure|weak water pressure|no pressure|pressure is low|pressure dropped|high water pressure|pressure regulator|prv",
    reply: (ctx) =>
      problem(ctx, {
        empathy: ["Low pressure makes everything harder, from showers to dishes."],
        tip: "**Check this first:** if it's one faucet, unscrew and clean the aerator. If it's the **whole house**, likely causes are a failing pressure regulator, corroded galvanized pipes, or a hidden leak, all of which we can diagnose quickly.",
        service: "Other: Low water pressure",
        topic: "water pressure",
      }),
  },
  {
    id: "noisy_pipes",
    kind: "problem",
    priority: 35,
    service: "Other: Noisy pipes",
    strong:
      "noisy pipes|pipes banging|banging pipes|water hammer|pipes knocking|knocking pipes|pipes rattling|pipes making noise|whistling pipes|pipes squealing",
    reply: (ctx) =>
      problem(ctx, {
        empathy: ["Banging pipes are more than annoying. That shock can stress joints over time."],
        tip: "That's usually **water hammer** (high pressure or missing arrestors) or loose pipe straps. Both are straightforward fixes once we find the source.",
        service: "Other: Noisy pipes",
        topic: "noisy pipes",
      }),
  },
  {
    id: "water_quality",
    kind: "problem",
    priority: 36,
    service: "Water Softeners",
    strong:
      "hard water|water softener|softener|water filter|water filtration|filtration system|whole house filter|reverse osmosis|brown water|rusty water|discolored water|yellow water|cloudy water|water brown|water rusty|water yellow|water cloudy|water discolored|water smells funny|water tastes|water smells|chlorine taste|scale buildup|limescale|mineral buildup|white spots",
    reply: (ctx) => {
      const discolored = /brown|rust|discolor|yellow/.test(ctx.norm);
      return problem(ctx, {
        empathy: discolored
          ? ["Discolored water is worth checking out."]
          : ["Better water is a great upgrade."],
        tip: discolored
          ? "**Try this:** run the cold tap for a few minutes. If it clears, it may have been a city main disturbance. If it's **only the hot water**, the water heater likely has sediment. If it keeps coming back, corroding pipes could be the cause."
          : "We install and service **water softeners and whole-house filtration**. Softeners stop scale from building up in your pipes, fixtures and water heater, and filtration takes care of taste, odor and chlorine.",
        service: discolored ? "Other: Discolored water" : "Water Softeners",
        topic: "water softeners and filtration",
        page: ["Water softeners", "/services/plumbing/water-softeners"],
      });
    },
  },
  {
    id: "gas_line",
    kind: "problem",
    priority: 40,
    service: "Gas Line Repair",
    strong:
      "gas line|gas pipe|gas piping|gas stove hookup|gas hookup|gas appliance|gas dryer hookup|gas range|install gas line|run a gas line|gas fireplace",
    reply: (ctx) =>
      problem(ctx, {
        empathy: ["Gas work needs a licensed pro, so good call reaching out."],
        tip: "Our licensed plumbers install, repair and pressure-test gas lines for ranges, dryers, fireplaces, water heaters and BBQs, all code-compliant and permitted. (If you ever **smell gas**, leave the building and call 911 from outside first.)",
        service: "Gas Line Repair",
        topic: "gas line work",
        page: ["Gas line repair", "/services/plumbing/gas-line-repair"],
      }),
  },
  {
    id: "backflow",
    kind: "problem",
    priority: 40,
    service: "Backflow Testing",
    strong:
      "backflow|backflow testing|backflow test|backflow preventer|backflow device|rpz|double check valve|cross connection",
    reply: (ctx) =>
      problem(ctx, {
        empathy: ["Yes, we do backflow testing!"],
        tip: "Most Washington water purveyors require backflow assemblies to be **tested every year**. We test, repair and install backflow preventers for homes and businesses, and send the results to your water district.",
        service: "Backflow Testing",
        topic: "backflow testing",
        page: ["Backflow testing", "/services/plumbing/backflow-testing"],
      }),
  },
  {
    id: "septic",
    kind: "problem",
    priority: 40,
    service: "Septic Tank Service",
    strong: "septic|septic tank|septic system|drain field|drainfield|septic pumping",
    reply: (ctx) =>
      problem(ctx, {
        empathy: ["We service septic systems too."],
        tip: "As a rule of thumb, septic tanks need pumping every **3–5 years**. Slow drains, gurgling, soggy spots over the drain field or bad smells outside are signs it's due.",
        service: "Septic Tank Service",
        topic: "septic service",
        page: ["Septic service", "/services/plumbing/septic-tank-service"],
      }),
  },
  {
    id: "fixture_install",
    kind: "problem",
    priority: 34,
    service: "Fixture Installation",
    strong:
      "install a shower|shower install|shower installation|new shower|bathtub install|bathtub installation|new bathtub|new tub|install a tub|bathroom remodel|kitchen remodel|install a sink|new sink|replace sink|sink install|dishwasher install|install dishwasher|dishwasher hookup|ice maker line|fridge water line|washing machine hookup|laundry hookup|utility sink",
    reply: (ctx) =>
      problem(ctx, {
        empathy: ["Nice project! We'd be glad to help."],
        tip: "We install and replace sinks, tubs, showers, toilets, faucets, dishwashers and appliance water lines, and can work alongside your remodeler or contractor. Every install is code-compliant and backed by our written warranty.",
        service: "Fixture Installation",
        topic: "fixture installation",
        page: ["Fixture replacement", "/services/plumbing/fixture-replacement"],
      }),
  },
  {
    id: "water_line",
    kind: "problem",
    priority: 38,
    service: "Water Line Repair",
    strong:
      "main water line|water main|water service line|water line|supply line|yard is wet|wet yard|soggy yard|puddle in yard",
    reply: (ctx) =>
      problem(ctx, {
        empathy: ["Water line trouble can sneak up on you."],
        tip: "A soggy patch in the yard, a sudden pressure drop, or a spike in your water bill can all point to a leaking service line. We repair and replace main water lines and shut-off valves, often trenchless.",
        service: "Water Line Repair",
        topic: "water line repair",
        page: ["Water lines", "/services/plumbing/water-lines"],
      }),
  },

  {
    id: "shutoff",
    kind: "info",
    priority: 47,
    strong:
      "shut off my water|shut off the water|shut my water off|shut the water off|turn off my water|turn off the water|turn my water off|turn the water off|main shut off|main shutoff|main water valve|main valve|shut off valve|shutoff valve|water shut off|water shutoff|how do i stop the water|where is my shut off|stop the water",
    reply: (ctx) => ({
      messages: [
        msg(
          "Here's how to shut off your water:\n• **Main valve:** usually where the water line enters the house: a basement or crawlspace wall facing the street, the garage, or near the water heater\n• **Wheel handle:** turn clockwise until it stops. **Lever handle:** a quarter-turn so it's crossways to the pipe\n• **Can't find it?** There's a valve at the meter box by the street, but it may need a meter key\n• **Just one fixture?** Use its own valves under the sink or behind the toilet\n\nThen open a low faucet to drain the pressure.",
        ),
        msg(
          `If water is actively leaking, call us at **${ctx.biz.phone}**. We're available 24/7. Or I can get a plumber headed your way.`,
          { actions: [call()] },
        ),
      ],
      quickReplies: ["🚨 Emergency help", "📅 Book a plumber", "Anything else?"],
      offer: { kind: "book" },
    }),
  },
  {
    id: "renter",
    kind: "info",
    priority: 62,
    strong:
      "i rent|i am renting|renting|renter|renters|i am a tenant|as a tenant|can renters|do you work for renters",
    phrases: "landlord|tenant",
    reply: () => ({
      messages: [
        msg(
          "Absolutely, renters can book with us! For bigger repairs your landlord or property manager may need to approve the work (they often cover it), so it's worth giving them a heads-up. We're happy to talk with them directly too.",
        ),
        msg("Want me to set up a visit?"),
      ],
      quickReplies: ["Yes, book it", "💲 Get a quote", "Not right now"],
      offer: { kind: "book" },
    }),
  },

  /* ─── Company info ─── */
  {
    id: "pricing",
    kind: "info",
    priority: 30,
    strong:
      "how much|price|prices|pricing|cost|costs|rate|rates|charge|fee|fees|expensive|cheap|affordable|afford|trip charge|service fee|diagnostic fee|call out fee|hourly",
    reply: (ctx) => {
      const topic = ctx.topic;
      return {
        messages: [
          msg(
            `${/trip|service fee|service call fee|call out|diagnostic|dispatch fee|come out fee/.test(ctx.norm) ? `Any service-call or diagnostic fee depends on the job, and the office will always tell you upfront before a tech is dispatched (**${ctx.biz.phone}**). ` : ""}${topic ? `Great question. For **${topic}**, the price depends on what the tech finds (size, access, parts), so` : "Every job is a little different, so"} we give you a **flat-rate quote upfront, before any work begins**. No hourly surprises, and the price you approve is the price on the invoice.`,
          ),
          msg(
            `🏷️ Current deals:\n${COUPONS.map((c) => `• **${c.headline} off**: ${c.description.replace(/ — /g, ", ")}`).join("\n")}\n\nWant me to set up a visit for an exact quote?`,
            { actions: [link("See all coupons", "/coupons")] },
          ),
        ],
        quickReplies: OFFER_REPLIES.filter((q) => !/how much/i.test(q)).concat(
          "👤 Talk to a person",
        ),
        offer: { kind: "book", flow: "quote" },
      };
    },
  },
  {
    id: "coupons",
    kind: "info",
    priority: 32,
    strong:
      "coupon|coupons|discount|discounts|deal|deals|special|specials|promo|promotion|promo code|special offer|any offers|current offers|savings|save money|senior discount|military discount|veteran discount|first time customer",
    reply: (ctx) => ({
      messages: [
        msg(
          `${/senior|military|veteran|first responder|teacher|nurse/.test(ctx.norm) ? "We don't list a separate senior or military discount online, so ask the office when you book; they'll tell you what applies. " : ""}Here's what we're offering right now:\n${COUPONS.map((c) => `• **${c.headline} off**: ${c.description.replace(/ — /g, ", ")}`).join("\n")}\n\nThese are for residential homeowners and new customers. Just mention the coupon when you book.`,
          { actions: [link("View coupons", "/coupons")] },
        ),
      ],
      quickReplies: ["📅 Book a plumber", "💲 Get a quote", "Anything else?"],
      offer: { kind: "book" },
      topic: "our coupons",
    }),
  },
  {
    id: "hours",
    kind: "info",
    priority: 31,
    strong:
      "hours|business hours|opening hours|open now|are you open|you open|when do you open|when do you close|what time do you|closing time|open today|open on|open weekends|weekend|weekends|saturday|sunday|holiday|holidays|after hours|late night|at night|middle of the night|overnight|24 7|24 hours|availability|available now|are you available",
    reply: (ctx) => {
      const { hour, weekday, label } = ctx.pacific;
      const sameDayWindow = weekday >= 1 && weekday <= 5 && hour < 14;
      return {
        messages: [
          msg(
            `We're **open 24/7**. Our phones are answered around the clock, every day of the year, and emergency plumbers are always on call.\n\n**Same-day service** is available when you book before **2pm, Monday–Friday**. ${
              sameDayWindow
                ? `It's ${label} in Seattle right now, so there's still time to get someone out **today**. 👍`
                : `It's ${label} in Seattle right now. Book now and we'll get you on the schedule for the next opening, or call for anything urgent.`
            }`,
            { actions: [call()] },
          ),
        ],
        quickReplies: ["📅 Book a plumber", "🚨 Emergency help", "📍 Do you serve my area?"],
        offer: { kind: "book" },
      };
    },
  },
  {
    id: "response_time",
    kind: "info",
    priority: 31,
    strong:
      "how fast|how quickly|how soon|same day|same day service|how long will it take|how long to get|how long until|when can you come|when can someone come|when can a plumber|eta|arrival time|how long does it take to arrive|today possible|can you come today",
    reply: (ctx) => ({
      messages: [
        msg(
          `Usually **the same day**. Book before **2pm Monday–Friday** and we can typically get a technician to you that day. For true emergencies (burst pipes, sewer backups, no water) we dispatch **24/7** and move faster than that.`,
          { actions: [call()] },
        ),
        msg("Want me to get you on the schedule now?"),
      ],
      quickReplies: ["Yes, book it", "🚨 It's an emergency", "Not right now"],
      offer: { kind: "book" },
    }),
  },
  {
    id: "area",
    kind: "info",
    priority: 31,
    strong:
      "hours and areas|what areas|which areas|your areas|service area|service areas|areas you serve|area do you serve|areas do you|do you serve|do you service|do you cover|do you come to|do you go to|come to my area|near me|my area|my city|my zip|zip code|which cities|what cities|what areas|where do you serve|how far|travel to|coverage",
    phrases: "area|areas|serve|cover|location|nearby",
    reply: (ctx) => ({
      messages: [
        msg(
          `We cover **Greater Seattle across King and south Pierce counties**, including ${HEADLINE_CITIES.join(", ")}, and many more.\n\nTell me your **ZIP code or city** and I'll check it for you.`,
          { actions: [link("Service area map", "/service-area")] },
        ),
      ],
      quickReplies: [],
      topic: "service area",
    }),
  },
  {
    id: "location",
    kind: "info",
    priority: 30,
    strong:
      "where are you located|where are you based|where is your office|your address|office address|what is your address|headquarters|where are you|where you located|located|physical address|visit your office|shop location",
    reply: (ctx) => ({
      messages: [
        msg(
          `We're a local, family-owned shop based in **Tukwila**:\n📍 ${ctx.biz.address}\n\nOur plumbers come to you. We serve homes and businesses across Greater Seattle.`,
          { actions: [link("About us", "/about")] },
        ),
      ],
      quickReplies: ["📅 Book a plumber", "📍 Do you serve my area?", "Anything else?"],
    }),
  },
  {
    id: "contact",
    kind: "info",
    priority: 29,
    strong:
      "phone number|your number|contact number|what is your number|email address|your email|contact you|contact info|contact information|how do i contact|how can i reach|reach you|text you|can i text",
    reply: (ctx) => ({
      messages: [
        msg(
          `Here's how to reach us:\n📞 **${ctx.biz.phone}** (answered 24/7)\n✉️ **${ctx.biz.email}**\n📍 ${ctx.biz.address}\n\nOr just book right here in the chat. I'll pass everything to the team.`,
          { actions: [call(), link("Contact page", "/contact")] },
        ),
      ],
      quickReplies: ["📅 Book a plumber", "Yes, call me back", "Anything else?"],
    }),
  },
  {
    id: "licensed",
    kind: "info",
    priority: 30,
    strong:
      "licensed|license|licence|insured|insurance|bonded|certified|qualified|background checked|background check|subcontract|subcontractors|subcontractor|legit|legitimate|trustworthy|can i trust",
    reply: () => ({
      messages: [
        msg(
          "Yes! Every plumber we send is **fully licensed in Washington State, bonded, insured and background-checked**. They're our own full-time employees. **We never subcontract**, so you always get our crew.",
        ),
      ],
      quickReplies: ["📅 Book a plumber", "Do you guarantee your work?", "Anything else?"],
      offer: { kind: "book" },
    }),
  },
  {
    id: "warranty",
    kind: "info",
    priority: 30,
    strong:
      "warranty|warranties|guarantee|guaranteed|guarantees|satisfaction|what if it breaks again|if it breaks again|come back if|stand behind",
    reply: () => ({
      messages: [
        msg(
          "Absolutely. **Every repair is backed by our written guarantee**, and installs come with a **written warranty**. If something we fixed isn't right, we come back and make it right.",
        ),
      ],
      quickReplies: ["📅 Book a plumber", "Are you licensed?", "Anything else?"],
      offer: { kind: "book" },
    }),
  },
  {
    id: "about",
    kind: "info",
    priority: 28,
    strong:
      "about you|about your company|about the company|who are you guys|tell me about your company|tell me about you|tell me about all phase|tell me more about you|how long have you been|how long in business|years in business|experience|in business|how many years|years have you been|been around|how long have you|established|founded|when did you start|family owned|locally owned|local business|who owns|who is the owner|history|since when|how old is your company|how big",
    reply: () => ({
      messages: [
        msg(
          "All Phase Plumbing is a **family-owned company based in Tukwila, serving Greater Seattle since 1989**, so that's 35+ years and over 10,000 homes served.\n\n• Licensed, bonded & insured, no subcontractors\n• Upfront flat-rate pricing\n• 24/7 emergency service\n• Written guarantee on every repair",
          { actions: [link("About us", "/about")] },
        ),
      ],
      quickReplies: ["📅 Book a plumber", "🔧 Services we offer", "Anything else?"],
    }),
  },
  {
    id: "services",
    kind: "info",
    priority: 27,
    strong:
      "services|what services|what do you do|what do you offer|what can you fix|what do you fix|what kind of work|what type of work|do you do|do you fix|do you install|do you repair|do you handle|services we offer|full list",
    reply: () => ({
      messages: [
        msg(
          "We handle just about everything plumbing:\n• **Drain cleaning** & hydro jetting\n• **Water heaters**: tank & tankless\n• **Leak detection** & slab leaks\n• **Sewer line** repair & replacement\n• Toilets, faucets & fixtures\n• Repiping & pipe repair\n• Garbage disposals & sump pumps\n• Gas lines & backflow testing\n• Water softeners & filtration\n• **24/7 emergency** service\n\nPlus commercial plumbing for businesses. What do you need help with?",
          { actions: [link("All services", "/services")] },
        ),
      ],
      quickReplies: ["📅 Book a plumber", "💲 Get a quote", "🚨 Emergency help"],
    }),
  },
  {
    id: "commercial",
    kind: "info",
    priority: 33,
    service: "Commercial Plumbing Repair",
    strong:
      "commercial|my business|our business|for business|commercial property|commercial building|business owner|small business|restaurant|office building|property manager|property management|landlord|apartment building|multi family|multifamily|hoa|retail|warehouse|facility|facilities|contractor|general contractor|grease trap",
    reply: () => ({
      messages: [
        msg(
          "Yes, we have a dedicated **commercial team** for businesses, restaurants, property managers and contractors: plumbing repair, drain cleaning & jetting, sewer services, backflow testing and gas line work, with 24/7 emergency response so your doors stay open.",
          { actions: [link("Commercial plumbing", "/commercial")] },
        ),
        msg("Want me to set up a commercial service request?"),
      ],
      quickReplies: ["Yes, book it", "💲 Get a quote", "Not right now"],
      offer: { kind: "book", service: "Commercial Plumbing Repair" },
      topic: "commercial plumbing",
    }),
  },
  {
    id: "payment",
    kind: "info",
    priority: 29,
    strong:
      "financing|finance|payment plan|payment plans|monthly payments|pay monthly|pay over time|credit card|credit cards|debit|cash|pay by check|pay with check|accept checks|venmo|zelle|apple pay|how do i pay|how can i pay|payment methods|payment options|accept card|accept cards|insurance claim|home warranty",
    reply: (ctx) => ({
      messages: [
        msg(
          `Good question. Payment options and financing can vary by job, so our office will go over them with you when you get your quote. You'll always see the full flat-rate price **before** any work begins.\n\nFor specifics, call **${ctx.biz.phone}** or I can have someone reach out.`,
          { actions: [call()] },
        ),
      ],
      quickReplies: ["Yes, call me back", "📅 Book a plumber", "Anything else?"],
      offer: { kind: "callback", topic: "Payment / financing question" },
    }),
  },
  {
    id: "reviews",
    kind: "info",
    priority: 28,
    strong:
      "reviews|review|ratings|rating|reputation|are you good|any good|recommend you|testimonials|google reviews|yelp|bbb|angi|angies list|what do customers say",
    reply: () => ({
      messages: [
        msg(
          "Our neighbors keep calling us back, and that's the best review we can get after 35+ years. 😊 You'll find our reviews on **Google**, and we're listed with the **BBB** and **Angi**. Customers mention our honest upfront pricing, on-time techs, and clean work the most.",
        ),
      ],
      quickReplies: ["📅 Book a plumber", "Are you licensed?", "Anything else?"],
    }),
  },
  {
    id: "brands",
    kind: "info",
    priority: 26,
    strong: "what brands|which brands|brand|brands|kohler|moen|delta|american standard|grohe|toto",
    reply: () => ({
      messages: [
        msg(
          "We service and install **all major brands**: Kohler, Moen, Delta, American Standard, Rheem, A.O. Smith, Bradford White, Navien, Rinnai and more. You can supply your own fixture, or we can recommend one that fits your budget.",
        ),
      ],
      quickReplies: ["📅 Book a plumber", "💲 Get a quote", "Anything else?"],
      offer: { kind: "book" },
    }),
  },
  {
    id: "permits",
    kind: "info",
    priority: 26,
    strong:
      "permit|permits|building code|plumbing code|up to code|code compliant|inspection required|city inspection",
    reply: () => ({
      messages: [
        msg(
          "Yes, our work is **code-compliant and permitted** where required. We pull the permits and coordinate inspections, so you don't have to.",
        ),
      ],
      quickReplies: ["📅 Book a plumber", "Anything else?"],
    }),
  },
  {
    id: "careers",
    kind: "info",
    priority: 30,
    strong:
      "hiring|are you hiring|job|jobs|career|careers|apply|employment|work for you|join your team|apprentice|apprenticeship|job opening|openings|resume",
    reply: (ctx) => ({
      messages: [
        msg(
          `We're always glad to hear from good plumbers! Please send your resume to **${ctx.biz.email}** or call **${ctx.biz.phone}** and ask about current openings.`,
        ),
      ],
      quickReplies: ["Anything else?"],
    }),
  },
  {
    id: "existing_appointment",
    kind: "action",
    priority: 61,
    strong:
      "my appointment|existing appointment|reschedule|cancel my appointment|cancel appointment|change my appointment|move my appointment|where is my plumber|where is the plumber|technician is late|plumber is late|running late|status of my|my technician|my invoice|my bill|my receipt|follow up on",
    reply: (ctx) => ({
      messages: [
        msg(
          `I can't pull up appointment details from here, but the office can sort that out quickly. Call **${ctx.biz.phone}**, or leave your name and number and I'll have someone call you right back.`,
          { actions: [call()] },
        ),
      ],
      quickReplies: ["Yes, call me back", "📞 I'll call now", "Never mind"],
      offer: { kind: "callback", topic: "Existing appointment: reschedule / status" },
    }),
  },
  {
    id: "complaint",
    kind: "action",
    priority: 56,
    strong:
      "complaint|complain|bad service|poor service|terrible service|not happy|unhappy|disappointed|refund|money back|bad experience|terrible experience|horrible experience|damaged my|ruined|botched|did a bad job|still broken|still leaking after|you guys broke|overcharged|rip off|ripoff|scam",
    reply: (ctx) => ({
      messages: [
        msg(
          `I'm really sorry to hear that${hi(ctx)}. That's not the experience we want anyone to have, and we stand behind our work with a written guarantee.\n\nLet me get this to our office manager so they can make it right. Can I take your name and number?`,
        ),
      ],
      quickReplies: ["Yes, call me back", `📞 I'll call now`, "Not now"],
      offer: { kind: "callback", topic: "Customer concern: please follow up" },
    }),
  },
  {
    id: "diy",
    kind: "info",
    priority: 20,
    strong:
      "diy|do it myself|fix it myself|fix myself|how do i fix|how can i fix|how to fix|how do i unclog|how to unclog|can i fix|should i try",
    reply: (ctx) => ({
      messages: [
        msg(
          "Happy to share tips! Tell me what's going on (for example “toilet keeps running” or “no hot water”) and I'll suggest safe things to try first. If it's beyond a DIY fix, I can get a pro out.",
        ),
      ],
      quickReplies: ["Clogged drain", "No hot water", "Running toilet", "Leaky faucet"],
    }),
  },

  /* ─── Social ─── */
  {
    id: "presence",
    kind: "social",
    priority: 13,
    strong:
      "anyone there|anybody there|is anyone there|is anybody there|someone there|somebody there|are you there|you there|still there|are you still there|hello anyone|anyone available|is anyone available|anybody available|are you online|you online|are you awake|anyone home|is this working|does this work",
    reply: (ctx) => ({
      messages: [
        msg(
          ctx.pick([
            "Yes, I'm here! 👋 How can I help with your plumbing today?",
            "I'm right here and happy to help. What's going on?",
          ]),
        ),
      ],
      quickReplies: MAIN_MENU,
    }),
  },
  {
    id: "how_are_you",
    kind: "social",
    priority: 12,
    strong:
      "how are you|how are you doing|how is it going|how you doing|how are things|how is your day|how have you been|what is new|how about you|you good|you ok|are you well|what are you doing",
    reply: (ctx) => ({
      messages: [
        msg(
          ctx.pick([
            `I'm doing great, thanks for asking${hi(ctx)}! 😊 Ready to help with anything plumbing. What's going on at your place?`,
            "All pipes flowing smoothly on my end, thanks! 😄 How can I help you today?",
            "Doing well, thank you! How about you? Anything plumbing-related I can help with?",
          ]),
        ),
      ],
      quickReplies: MAIN_MENU,
    }),
  },
  {
    id: "bot_identity",
    kind: "info",
    priority: 59,
    strong:
      "are you a human|are you a real|real human|are you a bot|are you a robot|are you real|are you human|are you a person|is this a bot|is this a real person|is this a person|am i talking to a bot|am i talking to a person|who am i talking to|who is this|who are you|what are you|are you ai|are you an ai|artificial intelligence|chatgpt|chat gpt|what is your name|your name|do you have a name",
    reply: (ctx) => ({
      messages: [
        msg(
          `I'm the **All Phase virtual assistant**, a friendly bot, not a person. I can answer questions, help troubleshoot, check your area and book a plumber in about a minute. Whenever you'd like a real human, our team is at **${ctx.biz.phone}**, 24/7.`,
          { actions: [call("Talk to a person")] },
        ),
      ],
      quickReplies: MAIN_MENU,
    }),
  },
  {
    id: "capabilities",
    kind: "social",
    priority: 13,
    strong:
      "what can you do|what can you help with|how can you help|what do you know|help me|i need help|can you help|can you help me|help|menu|options|main menu|show options|how does this work|what should i ask",
    reply: (ctx) => ({
      messages: [
        msg(
          `Here's what I can do for you${hi(ctx)}:\n• **Book a plumber** right here in the chat\n• Help with **emergencies**: what to do right now\n• Troubleshoot clogs, leaks, water heaters, toilets & more\n• Check if we **serve your area**\n• Share **pricing, coupons**, hours and company info\n\nJust type your question in your own words.`,
        ),
      ],
      quickReplies: [...MAIN_MENU, ...MORE_MENU],
    }),
  },
  {
    id: "thanks",
    kind: "social",
    priority: 10,
    strong:
      "thanks|thank you|thank you so much|thank you very much|thanks a lot|many thanks|appreciate it|appreciate you|appreciated|much appreciated|cheers|you are the best|you rock|that helps|that helped|very helpful|so helpful",
    reply: (ctx) => ({
      messages: [
        msg(
          ctx.pick([
            `You're very welcome${hi(ctx)}! 😊 Anything else I can help with?`,
            "Happy to help! Is there anything else you need?",
            `Anytime${hi(ctx)}! Let me know if there's anything else.`,
          ]),
        ),
      ],
      quickReplies: ["That's all, thanks", "📅 Book a plumber", "Another question"],
      offer: { kind: "anything-else" },
    }),
  },
  {
    id: "goodbye",
    kind: "social",
    priority: 11,
    strong:
      "bye|goodbye|good bye|bye bye|see you|see you later|see ya|talk to you later|take care|have a good day|have a nice day|have a good one|good night|gotta go|got to go|that is all|that is it|thats all|nothing else|i am good|im good|i am all set|all set|we are done|i am done|no thanks|no thank you|that is all thanks",
    reply: (ctx) => ({
      messages: [
        msg(
          ctx.pick([
            `Thanks for chatting${hi(ctx)}! Have a great day, and remember we're here 24/7 if anything springs a leak. 💧`,
            `Take care${hi(ctx)}! If anything comes up, we're just a message or a call away: **${ctx.biz.phone}**.`,
            "Glad I could help. Have a wonderful day! 👋",
          ]),
        ),
      ],
      quickReplies: [],
    }),
  },
  {
    id: "compliment",
    kind: "social",
    priority: 8,
    strong:
      "good bot|nice bot|smart bot|you are smart|you are great|you are awesome|you are amazing|you are cool|you are helpful|love you|love this|awesome bot|great bot|best bot|you are funny",
    reply: (ctx) => ({
      messages: [
        msg(
          ctx.pick([
            "Aw, thank you! 😊 That made my day. Anything else I can help with?",
            "You're too kind! I'm here whenever you need a hand. 🔧",
          ]),
        ),
      ],
      quickReplies: MAIN_MENU,
      offer: { kind: "anything-else" },
    }),
  },
  {
    id: "frustrated",
    kind: "social",
    priority: 15,
    strong:
      "useless|stupid|dumb|idiot|bad bot|terrible bot|worst bot|you suck|this sucks|sucks|not helpful|unhelpful|annoying|waste of time|you are not listening|not listening|you do not understand|you are not understanding|makes no sense|what the heck|frustrated|frustrating|so frustrating|shut up|hate this|hate you|pointless|ridiculous|seriously|fuck|fucking|fuck you|shit|bullshit|damn|crap",
    reply: (ctx) => ({
      messages: [
        msg(
          `I'm sorry, I'm clearly not getting it right. 😔 Let me connect you with a real person who can help straight away: **${ctx.biz.phone}**, answered 24/7.`,
          { actions: [call("Call a real person")] },
        ),
        msg(
          "Or leave your name and number and someone will call you back. No bots involved, I promise.",
        ),
      ],
      quickReplies: ["Yes, call me back", "📅 Book a plumber", "Let me try again"],
      offer: { kind: "callback" },
    }),
  },
  {
    id: "laugh",
    kind: "social",
    priority: 5,
    strong: "lol|funny|lmao|haha|hilarious|rofl",
    reply: (ctx) => ({
      messages: [
        msg(
          ctx.pick([
            "😄 Glad I could bring a smile! Anything plumbing-related I can help with?",
            "Ha! 😄 What else can I do for you?",
          ]),
        ),
      ],
      quickReplies: MAIN_MENU,
    }),
  },
  {
    id: "joke",
    kind: "social",
    priority: 11,
    strong:
      "tell me a joke|joke|jokes|say something funny|make me laugh|plumbing joke|another joke|one more joke",
    reply: (ctx) => ({
      messages: [
        msg(`${ctx.pick(JOKES)}\n\nOkay, I'll stick to plumbing. 😄 Anything I can help with?`),
      ],
      quickReplies: ["Another joke", ...MAIN_MENU.slice(0, 2)],
    }),
  },
  {
    id: "time_date",
    kind: "social",
    priority: 11,
    strong:
      "what time is it|current time|time is it|what day is it|what is the date|what is today|today date|date today|what day is today",
    reply: (ctx) => ({
      messages: [
        msg(
          `It's **${ctx.pacific.label}** on ${ctx.pacific.dateLabel} here in Seattle. And yes, we're available right now: phones are answered 24/7. 🕒`,
        ),
      ],
      quickReplies: MAIN_MENU,
    }),
  },
  {
    id: "weather",
    kind: "social",
    priority: 8,
    strong: "weather|raining|rain|snow|snowing|cold outside|temperature|forecast",
    reply: () => ({
      messages: [
        msg(
          "I can't check the forecast, but I can tell you what the weather does to plumbing! 🌧️ Heavy Seattle rain is hard on **sump pumps** and older sewer lines, and a cold snap can **freeze exposed pipes**. Disconnect garden hoses and insulate outdoor spigots before a freeze.",
        ),
      ],
      quickReplies: ["Frozen pipes", "Sump pump help", ...MAIN_MENU.slice(0, 1)],
    }),
  },
  {
    id: "language",
    kind: "social",
    priority: 12,
    strong:
      "hola|habla espanol|hablas espanol|espanol|spanish|bonjour|namaste|salaam|salam|ni hao|konnichiwa|ciao|do you speak",
    reply: () => ({
      messages: [
        msg(
          "Hello! 👋 ¡Hola! I work best in English, but I'll do my best to help. What plumbing issue can I help you with today? If you'd prefer to talk to someone, give us a call.",
        ),
      ],
      quickReplies: MAIN_MENU,
    }),
  },
  {
    id: "off_topic",
    kind: "social",
    priority: 6,
    strong:
      "sports|football|basketball|baseball|seahawks|mariners|politics|election|president|recipe|cook|movie|movies|music|song|crypto|bitcoin|stock|stocks|homework|write code|coding|poem|essay|girlfriend|boyfriend|dating|meaning of life|capital of|who won",
    reply: (ctx) => ({
      messages: [
        msg(
          ctx.pick([
            "Ha, that's a little outside my pipes! 😄 I'm All Phase's plumbing assistant, so I'm best at leaks, clogs, water heaters, booking and pricing. What can I help you with?",
            "I wish I could help with that, but I only know plumbing. 🔧 Got a leak, clog or water heater question? That's my specialty!",
          ]),
        ),
      ],
      quickReplies: MAIN_MENU,
    }),
  },
];

/* ── Greetings (handled separately so "hi, my toilet is clogged" works) ── */

export const GREETING_WORDS = [
  "hi",
  "hello",
  "hey",
  "yo",
  "hiya",
  "howdy",
  "greetings",
  "heyy",
  "hey there",
  "hi there",
  "hello there",
  "hey hey",
  "what is up",
  "good morning",
  "good afternoon",
  "good evening",
  "good day",
  "morning",
  "afternoon",
  "evening",
  "hola",
  "namaste",
  "aloha",
  "salaam",
  "bonjour",
  "sup",
  "oi",
  "ello",
  "hi hi",
  "yo yo",
  "hey all phase",
  "hi all phase",
  "hello all phase",
];

export function greetingReply(ctx: ReplyContext): string {
  const h = ctx.pacific.hour;
  const tod = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  const n = ctx.norm;
  const lead = /good (morning|afternoon|evening)/.test(n)
    ? `${tod}${hi(ctx)}!`
    : /what is up|^yo\b|^sup\b/.test(n)
      ? `Hey${hi(ctx)}! Not much, just keeping the pipes flowing. 😄`
      : /howdy/.test(n)
        ? `Howdy${hi(ctx)}! 🤠`
        : ctx.pick([
            `Hi${hi(ctx)}! 👋`,
            `Hello${hi(ctx)}! 👋`,
            `Hey there${hi(ctx)}! 👋`,
            `${tod}${hi(ctx)}! 👋`,
          ]);
  return lead;
}

/** Every single word the intents use, for typo correction. */
export function vocabularyWords(): string[] {
  const words = new Set<string>();
  const add = (s?: string) =>
    s
      ?.split(/[|\s]+/)
      .filter(Boolean)
      .forEach((w) => words.add(w));
  for (const i of INTENTS) {
    add(i.phrases);
    add(i.strong);
  }
  GREETING_WORDS.forEach((g) => add(g));
  [
    "yes",
    "no",
    "plumber",
    "plumbing",
    "water",
    "toilet",
    "faucet",
    "heater",
    "leaking",
    "clogged",
    "tomorrow",
    "today",
    "morning",
    "afternoon",
    "evening",
    "flexible",
    "cancel",
    "skip",
    "emergency",
    "basement",
    "kitchen",
    "bathroom",
    "shower",
    "garage",
    "ceiling",
    "broken",
    "replace",
    "install",
    "repair",
  ].forEach((w) => words.add(w));
  return [...words];
}
