/**
 * Chatbot scenario suite — every test is a real conversation run through the
 * engine exactly as the widget drives it, plus unit checks on the language
 * helpers and the lead email the office receives.
 *
 * Run with: npm run test:chatbot
 */
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { ChatEngine, classify } from "@/lib/chatbot/engine";
import {
  normalize,
  extractPhone,
  extractEmail,
  extractZip,
  parseNameAnswer,
  extractExplicitName,
  extractTiming,
  correctText,
} from "@/lib/chatbot/text";
import { classifyZip, findCity } from "@/lib/chatbot/service-area";
import { buildLeadEmail } from "@/lib/lead-email-template";
import type { LeadRequest, Turn } from "@/lib/chatbot/types";

const BIZ = {
  phone: "(206) 309-1088",
  email: "info@allphaseplumbing.com",
  address: "14101 Interurban Ave S, Unit 78-A, Tukwila, WA 98168",
};
// Friday 18 Sep 2026, 10:00 AM Pacific — inside the same-day window.
const FRIDAY_10AM = new Date("2026-09-18T17:00:00Z");
const SUNDAY_9PM = new Date("2026-09-21T04:00:00Z");

function seeded(seed = 7) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

interface Run {
  engine: ChatEngine;
  turns: Turn[];
  last: Turn;
  /** All bot text from the last turn. */
  lastText: string;
  /** All bot text from every turn. */
  allText: string;
  leads: LeadRequest[];
}

/** Plays a conversation. Leads are "delivered" (success unless `fail` says otherwise). */
function chat(
  msgs: (string | { pick: string[] })[],
  opts: { now?: Date; fail?: number[] } = {},
): Run {
  const engine = new ChatEngine({ biz: BIZ, now: () => opts.now ?? FRIDAY_10AM, random: seeded() });
  const turns: Turn[] = [];
  const leads: LeadRequest[] = [];
  let attempt = 0;
  const handle = (t: Turn) => {
    turns.push(t);
    let cur = t;
    while (cur.lead) {
      leads.push(cur.lead);
      const ok = !(opts.fail ?? []).includes(attempt++);
      cur = engine.leadDelivered(ok);
      turns.push(cur);
    }
  };
  for (const m of msgs)
    handle(typeof m === "string" ? engine.send(m) : engine.pickServices(m.pick));
  const last = turns[turns.length - 1];
  const text = (t: Turn) => t.messages.map((m) => m.text).join("\n");
  return {
    engine,
    turns,
    last,
    lastText: text(last),
    allText: turns.map(text).join("\n"),
    leads,
  };
}

const FALLBACK = /didn't quite catch|not sure I understood|still not quite following/i;
const has = (s: string, re: RegExp) => assert.match(s, re);
const hasnt = (s: string, re: RegExp) => assert.doesNotMatch(s, re);

/* ── 1. Greetings ─────────────────────────────────────────────────────── */

describe("greetings", () => {
  const greetings = [
    "hi",
    "Hello",
    "hey",
    "yo",
    "sup",
    "wassup",
    "what's up",
    "heyyyyy",
    "hiiiii",
    "Good morning",
    "good evening!",
    "howdy",
    "hi there",
    "hello hello",
    "gm",
    "Hey!!",
    "hiya",
    "helo",
  ];
  for (const g of greetings) {
    test(`greets back: "${g}"`, () => {
      const r = chat([g]);
      hasnt(r.lastText, FALLBACK);
      has(r.lastText, /help|what's going on|what can i do/i);
      assert.ok(r.last.quickReplies.length > 0, "offers quick replies");
    });
  }

  test("greeting + problem answers the problem, with a greeting", () => {
    const r = chat(["hey there, my kitchen sink is clogged"]);
    has(r.lastText, /^(hi|hello|hey|good)/i);
    has(r.lastText, /clog|drain/i);
    assert.equal(r.engine.state.offer?.kind, "book");
  });

  test("greeting + how are you", () => {
    const r = chat(["hi how are you?"]);
    has(r.lastText, /doing (great|well)|flowing smoothly/i);
  });

  test("opening message introduces the bot with the main menu", () => {
    const e = new ChatEngine({ biz: BIZ, now: () => FRIDAY_10AM, random: seeded() });
    const t = e.start();
    has(t.messages[0].text, /All Phase assistant/);
    assert.ok(t.quickReplies.some((q) => /Book/.test(q)));
  });
});

/* ── 2. Small talk ────────────────────────────────────────────────────── */

describe("small talk", () => {
  test("how are you", () => has(chat(["how r u"]).lastText, /doing|flowing/i));
  test("are you a bot → honest answer + human option", () => {
    const r = chat(["are you a real person?"]);
    has(r.lastText, /bot, not a person/i);
    assert.ok(r.last.messages[0].actions?.some((a) => a.type === "call"));
  });
  test("what's your name", () =>
    has(chat(["what is your name"]).lastText, /All Phase virtual assistant/));
  test("what can you do", () => has(chat(["what can you do?"]).lastText, /Book a plumber/));
  test("thanks", () =>
    has(chat(["thank you so much!"]).lastText, /welcome|happy to help|anytime/i));
  test("bye", () => has(chat(["ok bye"]).lastText, /great day|take care|wonderful day/i));
  test("joke", () => has(chat(["tell me a joke"]).lastText, /plumb|drain|clog|flush|pipe/i));
  test("another joke is different", () => {
    const r = chat(["tell me a joke", "Another joke"]);
    const t = r.turns.map((x) => x.messages[0]?.text ?? "");
    assert.notEqual(t[0], t[1]);
  });
  test("lol", () => hasnt(chat(["lol"]).lastText, FALLBACK));
  test("compliment", () => has(chat(["you are awesome"]).lastText, /thank|kind/i));
  test("frustration → apology + real person", () => {
    const r = chat(["this is stupid, you're useless"]);
    has(r.lastText, /sorry/i);
    has(r.lastText, /real person/i);
    assert.equal(r.engine.state.offer?.kind, "callback");
  });
  test("profanity alone is handled politely", () => has(chat(["wtf"]).lastText, /sorry/i));
  test("what time is it (Pacific)", () => has(chat(["what time is it"]).lastText, /10:00 AM/));
  test("weather small talk ties back to plumbing", () =>
    has(chat(["is it raining?"]).lastText, /sump|freeze|pipes/i));
  test("math", () => has(chat(["what is 12 * 7?"]).lastText, /\*\*84\*\*/));
  test("math divide by zero", () => has(chat(["5 / 0"]).lastText, /undefined/));
  test("off-topic is redirected", () =>
    has(chat(["who won the seahawks game"]).lastText, /plumbing/i));
  test("capital of france is off-topic, not company info", () =>
    hasnt(chat(["tell me about the capital of france"]).lastText, /since 1989/));
  test("spanish speaker gets a friendly reply", () =>
    has(chat(["hablas español?"]).lastText, /Hola/));
  test("gibberish gets a helpful fallback", () => has(chat(["asdfghjkl"]).lastText, FALLBACK));
  test("two misunderstandings in a row → offers a human", () => {
    const r = chat(["asdfgh", "qwerty zxcv"]);
    has(r.lastText, /call you|call/i);
    assert.equal(r.engine.state.offer?.kind, "callback");
  });
  test("thumbs-up emoji counts as ok", () => hasnt(chat(["👍"]).lastText, FALLBACK));
});

/* ── 3. Plumbing problems ─────────────────────────────────────────────── */

describe("plumbing problems", () => {
  const cases: [string, RegExp, string][] = [
    ["my kitchen sink is clogged", /chemical drain cleaners/i, "Drain Cleaning"],
    ["shower drains really slow", /drain/i, "Drain Cleaning"],
    ["toilet keeps running", /flapper/i, "Toilets & Faucets"],
    ["toliet leakin bad", /wax ring/i, "Toilets & Faucets"],
    ["leaky faucet in the bathroom", /cartridge|washer/i, "Toilets & Faucets"],
    ["no hot watr since yesterday", /pilot light|breaker/i, "Water Heaters"],
    ["thinking about a tankless water heater", /endless hot water/i, "Water Heaters"],
    ["garbage disposal is humming and won't turn", /reset button/i, "Garbage Disposals"],
    ["sump pump not turning on", /float/i, "Sump Pumps"],
    ["it smells like sewage in my basement", /P-trap/i, "Sewer Repair"],
    ["tree roots in my sewer line", /camera inspection/i, "Sewer Repair"],
    ["what is hydro jetting?", /high-pressure water/i, "Hydro Jetting"],
    ["we have old galvanized pipes", /PEX|copper/i, "Repiping"],
    ["water pressure is really low", /aerator/i, "Other: Low water pressure"],
    ["pipes banging when I shut the tap", /water hammer/i, "Other: Noisy pipes"],
    ["we have really hard water", /softener/i, "Water Softeners"],
    ["my water bill went up a lot, maybe a hidden leak", /water meter/i, "Leak Detection"],
    ["warm spot on the floor", /slab leak/i, "Slab Leak Repair"],
    ["need backflow testing", /tested every year/i, "Backflow Testing"],
    ["need a gas line for my new stove", /gas lines/i, "Gas Line Repair"],
    ["septic tank needs pumping", /3–5 years/i, "Septic Tank Service"],
    ["want to install a new shower", /install/i, "Fixture Installation"],
  ];
  for (const [msg, tip, service] of cases) {
    test(`"${msg}" → useful tip + offer for ${service}`, () => {
      const r = chat([msg]);
      has(r.lastText, tip);
      const offer = r.engine.state.offer;
      assert.equal(offer?.kind, "book");
      assert.equal(offer?.kind === "book" && offer.service, service);
    });
  }

  test("water heater leaking is treated as urgent", () => {
    const r = chat(["water heater is leaking all over the garage"]);
    has(r.lastText, /cold-water valve/i);
    has(r.lastText, /shouldn't wait/i);
  });

  test("toilet overflowing: stop-the-water tip", () =>
    has(chat(["toilet is overflowing"]).lastText, /shut-off valve/i));

  test("frozen pipes: never open flame", () =>
    has(chat(["my pipes are frozen"]).lastText, /Never use an open flame/i));

  test("unrecognized plumbing description still gets a helpful offer", () => {
    const r = chat(["there is a weird whistling from the water meter area"]);
    hasnt(r.lastText, FALLBACK);
    assert.equal(r.engine.state.offer?.kind, "book");
  });

  test("problem → yes → booking starts with service + details prefilled", () => {
    const r = chat(["hi, my toilet is clogged", "yes"]);
    has(r.lastText, /noted \*\*Toilets & Faucets\*\*/);
    has(r.lastText, /name/i);
    assert.equal(r.engine.state.slots.details, "My toilet is clogged");
  });

  test("problem → no → graceful", () => {
    const r = chat(["leaky faucet", "not right now"]);
    has(r.lastText, /No problem|Totally fine/);
  });

  test("problem → 'how much?' follow-up uses the topic", () => {
    const r = chat(["no hot water", "How much does it cost?"]);
    has(r.lastText, /For \*\*water heater\*\*/);
    has(r.lastText, /\$250 off/);
  });
});

/* ── 4. Safety ────────────────────────────────────────────────────────── */

describe("safety & emergencies", () => {
  test("gas smell → leave + 911 first", () => {
    const r = chat(["I smell gas in the kitchen"]);
    has(r.lastText, /leave the building/i);
    has(r.lastText, /911/);
    assert.equal(r.last.messages[0].tone, "alert");
  });
  test("'I don't smell gas' is not a gas emergency", () => {
    const r = chat(["I don't smell gas, I just need a gas line for my dryer"]);
    hasnt(r.lastText, /please leave the building right now/i);
    has(r.lastText, /gas lines/);
  });
  test("burst pipe → emergency with shut-off tip and call button", () => {
    const r = chat(["a pipe burst and water is everywhere!"]);
    has(r.lastText, /24\/7 emergency/);
    has(r.lastText, /main water valve/);
    assert.ok(r.last.messages[0].actions?.some((a) => a.type === "call"));
  });
  test("'not an emergency' does not trigger emergency", () =>
    hasnt(chat(["it's not an emergency but my faucet drips"]).lastText, /24\/7 emergency service/));
  test("emergency offer → 'it's not an emergency' → regular booking", () => {
    const r = chat(["emergency", "It's not an emergency"]);
    has(r.lastText, /regular visit/);
    assert.equal(r.engine.state.flow?.kind, "booking");
  });
  test("full emergency flow emails an EMERGENCY lead without a confirm step", () => {
    const r = chat([
      "my basement is flooding",
      "Send someone now",
      "Ana Lopez",
      "206 555 9876",
      "Kent",
      "pipe burst in the basement",
    ]);
    assert.equal(r.leads.length, 1);
    const l = r.leads[0];
    assert.equal(l.source, "Chatbot EMERGENCY");
    assert.equal(l.urgency, "EMERGENCY: call back immediately");
    assert.equal(l.phone, "(206) 555-9876");
    assert.equal(l.city, "Kent");
    assert.ok(l.service?.includes("Emergency Plumber"));
    has(r.lastText, /anything else/i);
    has(r.allText, /dispatch/i);
  });
  test("gas smell → callback flow captures a lead", () => {
    const r = chat(["smells like rotten eggs", "Yes, call me back", "Sam", "2065550142"]);
    assert.equal(r.leads.length, 1);
    assert.equal(r.leads[0].source, "Chatbot Callback Request");
    has(r.leads[0].message ?? "", /gas/i);
  });
});

/* ── 5. Company info ──────────────────────────────────────────────────── */

describe("company info", () => {
  test("hours → 24/7 + same-day window is open on Friday 10am", () => {
    const r = chat(["what are your hours?"]);
    has(r.lastText, /open 24\/7/);
    has(r.lastText, /still time to get someone out \*\*today\*\*/);
  });
  test("hours on Sunday night → no same-day promise", () => {
    const r = chat(["are you open now"], { now: SUNDAY_9PM });
    hasnt(r.lastText, /still time/);
    has(r.lastText, /next opening/);
  });
  test("open on weekends?", () => has(chat(["are you open on weekends"]).lastText, /24\/7/));
  test("same day service?", () => has(chat(["can you come today?"]).lastText, /same day/i));
  test("pricing is honest: flat rate, no invented numbers", () => {
    const r = chat(["how much do you charge?"]);
    has(r.lastText, /flat-rate quote upfront/);
    hasnt(r.lastText, /\$\d+ (per|an) hour/);
  });
  test("coupons list all three current offers", () => {
    const r = chat(["any coupons or discounts?"]);
    has(r.lastText, /\$100 off/);
    has(r.lastText, /10% off/);
    has(r.lastText, /\$250 off/);
  });
  test("licensed & insured", () =>
    has(chat(["are you licensed and insured?"]).lastText, /never subcontract/i));
  test("warranty", () => has(chat(["do you guarantee your work"]).lastText, /written guarantee/));
  test("about the company", () =>
    has(chat(["how long have you been in business"]).lastText, /since 1989/));
  test("services list", () => has(chat(["what services do you offer"]).lastText, /Drain cleaning/));
  test("commercial", () => has(chat(["do you work on restaurants?"]).lastText, /commercial team/));
  test("financing: no invented terms, offers the office", () => {
    const r = chat(["do you offer financing?"]);
    has(r.lastText, /office will go over/);
    assert.equal(r.engine.state.offer?.kind, "callback");
  });
  test("reviews", () => has(chat(["do you have good reviews"]).lastText, /Google/));
  test("address", () => has(chat(["where are you located?"]).lastText, /Interurban Ave/));
  test("contact info", () => has(chat(["what's your phone number"]).lastText, /\(206\) 309-1088/));
  test("careers", () => has(chat(["are you hiring?"]).lastText, /resume/));
  test("permits", () => has(chat(["do you pull permits?"]).lastText, /permitted/));
  test("brands", () => has(chat(["do you install Kohler fixtures"]).lastText, /all major brands/));
  test("two questions in one message are both answered", () => {
    const r = chat(["what are your hours and do you serve kent?"]);
    has(r.lastText, /open 24\/7/);
    has(r.lastText, /we serve \*\*Kent\*\*/);
  });
  test("talk to a human", () => {
    const r = chat(["can I talk to a real person"]);
    has(r.lastText, /\(206\) 309-1088/);
    assert.equal(r.engine.state.offer?.kind, "callback");
  });
  test("existing appointment → callback lead with context", () => {
    const r = chat(["I need to reschedule my appointment", "yes", "Maria", "253-555-0100"]);
    assert.equal(r.leads.length, 1);
    has(r.leads[0].message ?? "", /reschedule/i);
  });
  test("complaint → apology + callback", () => {
    const r = chat(["I want to make a complaint, the leak came back"]);
    has(r.lastText, /sorry/i);
    assert.equal(r.engine.state.offer?.kind, "callback");
  });
});

/* ── 6. Service area ──────────────────────────────────────────────────── */

describe("service area", () => {
  test("Seattle ZIP is in area", () => has(chat(["98103"]).lastText, /we serve \*\*98103\*\*/));
  test("Tacoma ZIP is in area", () => has(chat(["do you serve 98402?"]).lastText, /we serve/));
  test("Snoqualmie ZIP is edge", () => has(chat(["98065"]).lastText, /edge of our service area/));
  test("Spokane ZIP is out", () => has(chat(["99201"]).lastText, /outside our service area/));
  test("city name in area", () =>
    has(chat(["do you come to Bellevue?"]).lastText, /we serve \*\*Bellevue\*\*/));
  test("Seattle neighborhood", () =>
    has(chat(["I'm in Ballard"]).lastText, /we serve \*\*Ballard\*\*/));
  test("out-of-area city", () => has(chat(["do you serve Olympia"]).lastText, /outside/));
  test("'service area' question asks for ZIP", () =>
    has(chat(["what areas do you cover?"]).lastText, /ZIP code or city/));
  test("coverage answer → yes → booking skips the location question", () => {
    const r = chat(["98101", "yes", { pick: ["Drain Cleaning"] }, "skip", "Lee", "2065550111"]);
    hasnt(r.lastText, /ZIP code \(or city\)/);
    has(r.lastText, /email/i);
  });
  test("'need a plumber in Renton' starts booking with location filled", () => {
    const r = chat(["I need a plumber in Renton"]);
    assert.equal(r.engine.state.flow?.kind, "booking");
    assert.equal(r.engine.state.slots.city, "Renton");
  });
});

/* ── 7. Booking flows ─────────────────────────────────────────────────── */

describe("booking flows", () => {
  const FULL = [
    "Book a plumber",
    { pick: ["Water Heaters"] },
    "no hot water since this morning",
    "Jane Doe",
    "(206) 555-1234",
    "98118",
    "jane@example.com",
    "Tomorrow",
    "✅ Yes, send it",
  ];

  test("full booking produces a complete, clean lead", () => {
    const r = chat(FULL);
    assert.equal(r.leads.length, 1);
    const l = r.leads[0];
    assert.equal(l.source, "Chatbot Booking");
    assert.equal(l.name, "Jane Doe");
    assert.equal(l.phone, "(206) 555-1234");
    assert.equal(l.email, "jane@example.com");
    assert.equal(l.zip, "98118");
    assert.deepEqual(l.service, ["Water Heaters"]);
    assert.equal(l.message, "no hot water since this morning");
    assert.equal(l.preferredTime, "Tomorrow");
    assert.equal(l.serviceType, "Residential");
    assert.equal(l.outOfArea, false);
    has(l.transcript ?? "", /Customer: Jane Doe/);
    has(r.lastText, /anything else/i);
    has(r.allText, /You're all set, Jane!/);
  });

  test("confirmation summary lists every field before sending", () => {
    const r = chat(FULL.slice(0, -1));
    for (const f of ["Service", "Problem", "Name", "Phone", "Email", "Location", "Timing"])
      has(r.lastText, new RegExp(`\\*\\*${f}:\\*\\*`));
    assert.equal(r.leads.length, 0, "nothing is sent before confirmation");
  });

  test("quote flow uses the quote source", () => {
    const r = chat([
      "can I get a quote",
      "water softener install",
      "Tom",
      "4255550123",
      "Bellevue",
      "skip",
      "I'm flexible",
      "yes",
    ]);
    assert.equal(r.leads[0].source, "Chatbot Quote Request");
    assert.equal(r.leads[0].preferredTime, "Flexible");
  });

  test("one message can fill several fields", () => {
    const r = chat([
      "book",
      { pick: ["Drain Cleaning"] },
      "skip",
      "Priya from Kent, 425-555-0199, priya@gmail.com",
    ]);
    const s = r.engine.state.slots;
    assert.equal(s.name, "Priya");
    assert.equal(s.phone, "(425) 555-0199");
    assert.equal(s.city, "Kent");
    assert.equal(s.email, "priya@gmail.com");
    has(r.lastText, /when would you like/i);
  });

  test("typed service instead of picker", () => {
    const r = chat(["schedule a visit", "my toilet won't flush"]);
    assert.deepEqual(r.engine.state.slots.services, ["Toilets & Faucets"]);
  });

  test("unknown service text is kept as 'Other'", () => {
    const r = chat(["book", "install a pet washing station"]);
    has(r.engine.state.slots.services[0], /^Other: install a pet washing station/);
  });

  test("'not sure' service → diagnosis", () => {
    const r = chat(["book", "not sure"]);
    assert.deepEqual(r.engine.state.slots.services, ["Diagnosis needed"]);
  });

  test("invalid phone gets a specific hint", () => {
    const r = chat(["book", { pick: ["Repiping"] }, "skip", "Kim", "555-1234"]);
    has(r.lastText, /7 digits/);
  });

  test("phone with +1 and dots is normalized", () => {
    const r = chat(["book", { pick: ["Repiping"] }, "skip", "Kim", "+1.206.555.0199"]);
    assert.equal(r.engine.state.slots.phone, "(206) 555-0199");
  });

  test("invalid email gets a hint; typo domain is fixed", () => {
    const r = chat([
      "book",
      { pick: ["Repiping"] },
      "skip",
      "Kim",
      "2065550199",
      "98101",
      "kim@gmail",
    ]);
    has(r.lastText, /incomplete/);
    const r2 = chat([
      "book",
      { pick: ["Repiping"] },
      "skip",
      "Kim",
      "2065550199",
      "98101",
      "kim@gmial.com",
    ]);
    assert.equal(r2.engine.state.slots.email, "kim@gmail.com");
    has(r2.lastText, /fixed a small typo/);
  });

  test("email is optional", () => {
    const r = chat([
      "book",
      { pick: ["Repiping"] },
      "skip",
      "Kim",
      "2065550199",
      "98101",
      "I don't have an email",
    ]);
    has(r.lastText, /when would you like/i);
  });

  test("declining phone → email becomes required", () => {
    const r = chat([
      "book",
      { pick: ["Repiping"] },
      "skip",
      "Kim",
      "I'd rather not give my number",
      "98101",
      "skip",
    ]);
    assert.equal(r.engine.state.slots.phoneDeclined, true);
    has(r.lastText, /email/i);
    assert.equal(r.engine.state.flow?.step, "email");
  });

  test("'why do you need my number' is answered, then asked again", () => {
    const r = chat([
      "book",
      { pick: ["Repiping"] },
      "skip",
      "Kim",
      "why do you need my phone number?",
    ]);
    has(r.lastText, /never sell or share/);
    assert.equal(r.engine.state.flow?.step, "phone");
  });

  test("name refused twice → skipped", () => {
    const r = chat(["book", { pick: ["Repiping"] }, "skip", "no", "skip"]);
    assert.equal(r.engine.state.slots.nameSkipped, true);
    has(r.lastText, /phone number/);
  });

  test("side question mid-booking is answered, then the flow resumes", () => {
    const r = chat([
      "book",
      { pick: ["Drain Cleaning"] },
      "skip",
      "Joe",
      "wait, are you licensed?",
    ]);
    has(r.lastText, /licensed in Washington/);
    has(r.lastText, /Back to your request/);
    assert.equal(r.engine.state.flow?.step, "phone");
  });

  test("new problem mid-booking is added to the services", () => {
    const r = chat([
      "book",
      { pick: ["Drain Cleaning"] },
      "skip",
      "Joe",
      "oh and the water heater is making noise too",
    ]);
    assert.ok(r.engine.state.slots.services.includes("Water Heaters"));
  });

  test("'asap' mid-booking marks timing, not a full emergency", () => {
    const r = chat(["book", { pick: ["Drain Cleaning"] }, "skip", "Joe", "asap please"]);
    assert.equal(r.engine.state.flow?.kind, "booking");
    assert.equal(r.engine.state.slots.timing, "ASAP");
  });

  test("real emergency mid-booking upgrades the request", () => {
    const r = chat([
      "book",
      { pick: ["Drain Cleaning"] },
      "skip",
      "Joe",
      "oh no now the pipe burst and it's flooding",
    ]);
    assert.equal(r.engine.state.flow?.kind, "emergency");
  });

  test("cancel mid-booking sends nothing", () => {
    const r = chat(["book", { pick: ["Drain Cleaning"] }, "skip", "Joe", "cancel"]);
    has(r.lastText, /cancelled/);
    assert.equal(r.leads.length, 0);
    assert.equal(r.engine.state.flow, undefined);
  });

  test("correction at confirm: 'change my phone to …'", () => {
    const r = chat([...FULL.slice(0, -1), "actually change my phone to 253-555-0000", "yes"]);
    assert.equal(r.leads[0].phone, "(253) 555-0000");
  });

  test("edit via menu: Make a change → Timing → new value", () => {
    const r = chat([...FULL.slice(0, -1), "✏️ Make a change", "Timing", "friday afternoon", "yes"]);
    assert.equal(r.leads[0].preferredTime, "Friday (afternoon)");
  });

  test("'no' at confirm opens the edit menu instead of sending", () => {
    const r = chat([...FULL.slice(0, -1), "no"]);
    assert.equal(r.leads.length, 0);
    has(r.lastText, /what would you like to change/i);
  });

  test("out-of-area booking is still emailed, flagged, and not a conversion", () => {
    const r = chat([
      "book",
      { pick: ["Water Heaters"] },
      "skip",
      "Dee",
      "5095550100",
      "99201",
      "skip",
      "flexible",
      "yes",
    ]);
    const l = r.leads[0];
    assert.equal(l.outOfArea, true);
    assert.equal(l.source, "Chatbot Booking (Out of Area)");
    has(l.areaNote ?? "", /Outside service area/);
    has(r.lastText + r.allText, /outside our usual service area/);
  });

  test("edge-of-area booking is flagged for the office", () => {
    const r = chat([
      "book",
      { pick: ["Water Heaters"] },
      "skip",
      "Dee",
      "4255550100",
      "98045",
      "skip",
      "flexible",
      "yes",
    ]);
    has(r.leads[0].areaNote ?? "", /Edge of service area/);
    assert.equal(r.leads[0].outOfArea, false);
  });

  test("commercial booking is marked Commercial", () => {
    const r = chat([
      "we need a plumber for our restaurant",
      "Chef Ray",
      "2065550155",
      "98104",
      "skip",
      "today",
      "yes",
    ]);
    assert.equal(r.leads[0].serviceType, "Commercial");
    assert.deepEqual(r.leads[0].service, ["Commercial Plumbing Repair"]);
  });

  test("failed delivery tells the truth and retries", () => {
    const r = chat([...FULL, "Try again"], { fail: [0] });
    has(r.allText, /couldn't send that through/);
    assert.equal(r.leads.length, 2, "retried once");
    has(r.lastText, /anything else/i);
  });

  test("the same request isn't emailed twice", () => {
    const r = chat([
      ...FULL,
      "book",
      { pick: ["Water Heaters"] },
      "no hot water since this morning",
      "Tomorrow",
      "yes",
    ]);
    assert.equal(r.leads.length, 1);
    has(r.lastText, /already sent that exact request/);
  });

  test("second booking reuses contact details", () => {
    const r = chat([
      ...FULL,
      "Another question",
      "I also need a drain cleaned",
      "yes",
      "kitchen sink",
      "Today",
      "yes",
    ]);
    assert.equal(r.leads.length, 2);
    assert.equal(r.leads[1].phone, "(206) 555-1234");
    has(r.allText, /use the contact details you already gave me/);
  });

  test("phone number out of the blue starts a callback", () => {
    const r = chat(["206-555-0177"]);
    assert.equal(r.engine.state.flow?.kind, "callback");
    assert.equal(r.engine.state.slots.phone, "(206) 555-0177");
    has(r.lastText, /name|ask for/i);
  });

  test("volunteered name is remembered and used", () => {
    const r = chat(["Hi, I'm Dana", "thanks"]);
    has(r.turns[0].messages[0].text, /Dana/);
    assert.equal(r.engine.state.slots.name, "Dana");
  });

  test("'call me back' offer → callback lead", () => {
    const r = chat([
      "can someone call me back?",
      "yes",
      "Omar",
      "2535550122",
      "about a water heater quote",
    ]);
    assert.equal(r.leads[0].source, "Chatbot Callback Request");
    has(r.leads[0].message ?? "", /water heater/);
  });

  test("goodbye after booking", () => {
    const r = chat([...FULL, "No, that's all"]);
    has(r.lastText, /great day|take care/i);
  });

  test("state survives a JSON round-trip (page reload)", () => {
    const r = chat(FULL.slice(0, 5));
    const restored = new ChatEngine({
      biz: BIZ,
      now: () => FRIDAY_10AM,
      random: seeded(),
      state: JSON.parse(JSON.stringify(r.engine.state)),
    });
    const t = restored.send("98118");
    has(t.messages[0].text, /email/i);
  });
});

/* ── 7b. Real-world phrasing (regressions from an unseen-message stress run) ── */

describe("real-world phrasing", () => {
  const cases: [string, RegExp, RegExp?][] = [
    ["anyone there?", /I'm here|right here/],
    ["is anyone available", /I'm here|right here/],
    ["the bathroom sink wont stop dripping", /dripping faucet|cartridge/],
    ["outdoor spigot is broken", /hose bibs/],
    ["how old should a water heater be before replacing", /8–12 years/],
    ["how long does it take to replace a water heater", /few hours/],
    ["do you do drain cleaning", /^Yes, we do!|^Absolutely/],
    ["whats the cost for drain cleaning", /For \*\*drain cleaning\*\*/],
    ["do you charge for estimates", /flat-rate quote before any work begins/],
    ["is there a trip fee", /service-call or diagnostic fee/],
    ["Do you service 98052", /we serve \*\*98052\*\*/, /Drain cleaning\*\* & hydro/],
    ["how many years have you been around", /since 1989/],
    ["I rent, can I still book", /renters can book/],
    ["my landlord won't fix the leak", /water meter/],
    ["do you have any specials for seniors", /don't list a separate senior/],
    ["sewer backing up into bathtub", /Sewage backing up is urgent/],
    ["toilet gurgles when I run the washer", /main line or a blocked vent/, /flapper/],
    ["hot water smells like rotten eggs", /anode rod/, /please leave the building right now/],
    ["Water is brown", /run the cold tap/],
    ["need new toilet installed", /Nice upgrade/, /never fun/],
    ["garbage disposal smells", /citrus peels/],
    ["RPZ test due for my business", /tested every year/],
    ["what is trenchless sewer repair", /small access points/],
    ["later", /great day|take care|wonderful day/i],
    ["how do I shut off my water", /Main valve/],
    ["where is my main water shut off valve", /Main valve/],
    ["I'm a property manager with 3 buildings", /commercial team/, /reach our team directly/],
    ["visit your office?", /Tukwila/, /Let's get you booked/],
  ];
  for (const [msg, want, notWant] of cases) {
    test(`"${msg}"`, () => {
      const r = chat([msg]);
      has(r.lastText, want);
      if (notWant) hasnt(r.lastText, notWant);
      hasnt(r.lastText, FALLBACK);
    });
  }

  test("'can you come tomorrow morning' starts booking with timing captured", () => {
    const r = chat(["can you come tomorrow morning"]);
    assert.equal(r.engine.state.flow?.kind, "booking");
    assert.equal(r.engine.state.slots.timing, "Tomorrow (morning)");
  });

  test("'leak under the sink ASAP' is urgent but not a flood alarm", () => {
    const r = chat(["Need someone to look at a leak under the kitchen sink ASAP"]);
    hasnt(r.lastText, /24\/7 emergency service/);
    assert.equal(r.engine.state.slots.timing, "ASAP");
  });

  test("'can you guys come to my house' starts a booking", () => {
    assert.equal(chat(["can you guys come to my house"]).engine.state.flow?.kind, "booking");
  });
});

/* ── 8. Lead email the office receives ────────────────────────────────── */

describe("lead email", () => {
  const chatLead = () => {
    const r = chat([
      "my basement is flooding",
      "Send someone now",
      "Ana Lopez",
      "206 555 9876",
      "98032",
      "pipe burst & <b>water</b> everywhere",
    ]);
    const { outOfArea, ...payload } = r.leads[0];
    void outOfArea;
    return buildLeadEmail(payload);
  };

  test("emergency lead has an EMERGENCY subject and red header", () => {
    const e = chatLead();
    has(e.subject, /^🚨 EMERGENCY: New lead:/);
    has(e.html, /EMERGENCY service request/);
  });

  test("chatbot fields and transcript are rendered", () => {
    const e = chatLead();
    for (const label of [
      "Urgency",
      "Preferred time",
      "Problem details",
      "Chat transcript",
      "Service(s) needed",
    ])
      has(e.html, new RegExp(label.replace(/[()]/g, "\\$&")));
    has(e.text, /Phone: \(206\) 555-9876/);
    has(e.text, /Customer: pipe burst & <b>water<\/b> everywhere/);
    has(e.html, /pipe burst &amp; &lt;b&gt;water&lt;\/b&gt; everywhere/);
  });

  test("customer text is HTML-escaped", () => {
    const e = buildLeadEmail({
      name: "<script>x</script>",
      message: "a < b & c",
      transcript: "Customer: <img>",
    });
    hasnt(e.html, /<script>|<img>/);
    has(e.html, /&lt;script&gt;/);
  });

  test("a regular site form email is unchanged by the new fields", () => {
    const e = buildLeadEmail({
      source: "Contact Page",
      name: "Pat",
      phone: "(206) 555-0000",
      zip: "98101",
      service: ["Drain Cleaning"],
    });
    assert.equal(e.subject, "New lead: Pat — Drain Cleaning");
    assert.equal(
      e.text,
      "Name: Pat\nService(s) needed: Drain Cleaning\nPhone: (206) 555-0000\nZIP code: 98101\nSubmitted from: Contact Page",
    );
    hasnt(e.html, /Chat transcript|Urgency/);
  });

  test("oversized payloads are clipped", () => {
    const e = buildLeadEmail({
      name: "X",
      message: "m".repeat(5000),
      transcript: "t".repeat(20000),
    });
    assert.ok(e.html.length < 15000);
  });

  test("booking lead email reads cleanly", () => {
    const r = chat([
      "Book a plumber",
      { pick: ["Water Heaters", "Other: new thermostat"] },
      "no hot water",
      "jane doe",
      "2065551234",
      "Bellevue",
      "skip",
      "tomorrow morning",
      "yes",
    ]);
    const { outOfArea, ...payload } = r.leads[0];
    void outOfArea;
    const e = buildLeadEmail(payload);
    assert.equal(e.subject, "New lead: Jane Doe — Water Heaters, Other: new thermostat");
    has(e.text, /City: Bellevue/);
    has(e.text, /Preferred time: Tomorrow \(morning\)/);
  });
});

/* ── 9. Language helpers ──────────────────────────────────────────────── */

describe("language helpers", () => {
  test("normalize: slang, contractions, stretched letters", () => {
    assert.equal(
      normalize("Heyyyy u there?? I can't find ur #"),
      "hey you there i can not find your",
    );
    assert.equal(normalize("thx, it's gr8"), "thanks it is great");
  });
  test("typo correction", () => {
    assert.equal(correctText("emergancy plumming"), "emergency plumbing");
    assert.equal(correctText("i am sick of this"), "i am sick of this");
  });
  test("phone formats", () => {
    for (const p of [
      "2065551234",
      "206-555-1234",
      "(206) 555-1234",
      "206.555.1234",
      "+1 206 555 1234",
      "1-206-555-1234",
    ])
      assert.equal(extractPhone(p), "(206) 555-1234", p);
    assert.equal(extractPhone("555-1234"), null);
    assert.equal(extractPhone("98101"), null);
  });
  test("email extraction", () => {
    assert.deepEqual(extractEmail("mail me at Jo.Doe+x@Example.org please"), {
      email: "jo.doe+x@example.org",
    });
    assert.equal(extractEmail("jo@gmail")?.email, undefined);
  });
  test("ZIP extraction ignores phone digits", () => {
    assert.equal(extractZip("98101"), "98101");
    assert.equal(extractZip("call 2065551234"), null);
    assert.equal(extractZip("98101-1234"), "98101");
  });
  test("name parsing", () => {
    assert.equal(parseNameAnswer("john smith"), "John Smith");
    assert.equal(parseNameAnswer("it's Sam"), "Sam");
    assert.equal(parseNameAnswer("McDonald"), "McDonald");
    assert.equal(parseNameAnswer("José García"), "José García");
    assert.equal(parseNameAnswer("what?"), null);
    assert.equal(parseNameAnswer("my toilet is broken"), null);
    assert.equal(extractExplicitName("I'm having a leak"), null);
    assert.equal(extractExplicitName("call me back"), null);
    assert.equal(extractExplicitName("my name is priya"), "Priya");
  });
  test("timing", () => {
    assert.equal(extractTiming(normalize("asap")), "ASAP");
    assert.equal(extractTiming(normalize("tomorrow afternoon")), "Tomorrow (afternoon)");
    assert.equal(extractTiming(normalize("I am free Monday")), "Monday");
    assert.equal(extractTiming(normalize("whenever works")), "Flexible");
  });
  test("coverage", () => {
    assert.equal(classifyZip("98101"), "in");
    assert.equal(classifyZip("98032"), "in");
    assert.equal(classifyZip("98402"), "in");
    assert.equal(classifyZip("98045"), "edge");
    assert.equal(classifyZip("99201"), "out");
    assert.equal(classifyZip("10001"), "out");
    assert.equal(findCity("i live in west seattle")?.name, "West Seattle");
  });
  test("small talk never overrides a real problem", () => {
    assert.equal(classify(normalize("I need help with my toilet"))[0].intent.id, "toilet");
  });
});
