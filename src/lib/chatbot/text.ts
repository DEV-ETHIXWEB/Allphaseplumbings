/**
 * text.ts
 *
 * Language-understanding primitives for the rule-based chatbot: text
 * normalization (case, punctuation, contractions, texting slang, stretched
 * letters), light stemming, typo correction against the bot's own vocabulary,
 * and entity extraction (phone, email, ZIP, name, timing).
 *
 * Pure functions only — no React, no DOM — so the whole engine can be
 * exercised from Node in the chatbot scenario tests.
 */

/* ── Normalization ─────────────────────────────────────────────────────── */

const CONTRACTIONS: [RegExp, string][] = [
  [/\bwon'?t\b/g, "will not"],
  [/\bcan'?t\b/g, "can not"],
  [/\bcannot\b/g, "can not"],
  [/\bain'?t\b/g, "is not"],
  [/\b(\w+)n't\b/g, "$1 not"],
  [/\bi'?m\b/g, "i am"],
  [/\b(\w+)'re\b/g, "$1 are"],
  [/\b(\w+)'ll\b/g, "$1 will"],
  [/\b(\w+)'ve\b/g, "$1 have"],
  [/\b(\w+)'d\b/g, "$1 would"],
  [/\b(it|that|what|there|here|who|where|how|he|she|name|let)'s\b/g, "$1 is"],
  [/\b(\w+)'s\b/g, "$1"],
];

/** Texting shorthand → plain English, applied token by token. */
const SLANG: Record<string, string> = {
  u: "you",
  ur: "your",
  r: "are",
  yall: "you all",
  pls: "please",
  plz: "please",
  plss: "please",
  plox: "please",
  thx: "thanks",
  thnx: "thanks",
  thanx: "thanks",
  tnx: "thanks",
  ty: "thank you",
  tysm: "thank you so much",
  tyvm: "thank you very much",
  wat: "what",
  wut: "what",
  wht: "what",
  whats: "what is",
  wats: "what is",
  wanna: "want to",
  gonna: "going to",
  gotta: "got to",
  cuz: "because",
  coz: "because",
  bc: "because",
  rn: "right now",
  tmrw: "tomorrow",
  tmr: "tomorrow",
  tmrow: "tomorrow",
  tomm: "tomorrow",
  tommorow: "tomorrow",
  tomorow: "tomorrow",
  tommorrow: "tomorrow",
  idk: "i do not know",
  dunno: "do not know",
  nvm: "never mind",
  nevermind: "never mind",
  k: "ok",
  kk: "ok",
  okk: "ok",
  okay: "ok",
  okey: "ok",
  okie: "ok",
  oki: "ok",
  yea: "yes",
  yeah: "yes",
  yeh: "yes",
  yep: "yes",
  yup: "yes",
  yess: "yes",
  ye: "yes",
  yas: "yes",
  nah: "no",
  naw: "no",
  nope: "no",
  noo: "no",
  nop: "no",
  hru: "how are you",
  hbu: "how about you",
  wyd: "what are you doing",
  wassup: "what is up",
  wazzup: "what is up",
  whatsup: "what is up",
  sup: "what is up",
  wsup: "what is up",
  wsg: "what is up",
  hows: "how is",
  im: "i am",
  ive: "i have",
  dont: "do not",
  doesnt: "does not",
  didnt: "did not",
  cant: "can not",
  wont: "will not",
  isnt: "is not",
  aint: "is not",
  wasnt: "was not",
  youre: "you are",
  theres: "there is",
  lemme: "let me",
  gimme: "give me",
  b4: "before",
  "2day": "today",
  "2morrow": "tomorrow",
  "2nite": "tonight",
  tonite: "tonight",
  pic: "picture",
  bday: "birthday",
  info: "information",
  appt: "appointment",
  appts: "appointments",
  apt: "appointment",
  tech: "technician",
  techs: "technicians",
  plumbr: "plumber",
  plummer: "plumber",
  plumer: "plumber",
  toliet: "toilet",
  toilette: "toilet",
  toilt: "toilet",
  tiolet: "toilet",
  clogd: "clogged",
  cloged: "clogged",
  clogg: "clog",
  leek: "leak",
  leeking: "leaking",
  leakin: "leaking",
  watr: "water",
  wtr: "water",
  htr: "heater",
  hw: "hot water",
  esti: "estimate",
  pricey: "expensive",
  "24/7": "24 7",
  gm: "good morning",
  gn: "good night",
  ge: "good evening",
  gud: "good",
  gr8: "great",
  thankyou: "thank you",
  thanku: "thank you",
  helo: "hello",
  hellow: "hello",
  hallo: "hello",
  hullo: "hello",
  heya: "hey",
  hiya: "hi",
  hai: "hi",
  hy: "hi",
  hlo: "hello",
  hii: "hi",
  hiii: "hi",
  heyy: "hey",
  heyo: "hey",
  yoo: "yo",
  byee: "bye",
  cya: "see you",
  ttyl: "talk to you later",
  lmao: "lol",
  lmfao: "lol",
  rofl: "lol",
  haha: "lol",
  hahaha: "lol",
  hehe: "lol",
  ppl: "people",
  msg: "message",
  num: "number",
  ph: "phone",
  mob: "mobile",
  cell: "phone",
  addy: "address",
  wknd: "weekend",
  mins: "minutes",
  min: "minutes",
  hr: "hour",
  hrs: "hours",
  omw: "on my way",
  brb: "be right back",
  smh: "frustrated",
  ugh: "frustrated",
  argh: "frustrated",
  wtf: "what the heck",
  wth: "what the heck",
};

/** Lowercase, expand contractions + slang, strip punctuation, squash "heyyyy". */
export function normalize(raw: string): string {
  let s = raw
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[“”]/g, '"')
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");

  for (const [re, rep] of CONTRACTIONS) s = s.replace(re, rep);

  s = s
    .replace(/24\s*\/\s*7/g, " 24 7 ")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9@.\s]/g, " ")
    .replace(/\.(?!\w)/g, " ")
    // Stretched letters: "heyyyyy" → "heyy", "sooooo" → "soo".
    .replace(/([a-z])\1{2,}/g, "$1$1")
    .replace(/\s+/g, " ")
    .trim();

  return s
    .split(" ")
    .map((t) => SLANG[t] ?? t)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

/* ── Stemming ─────────────────────────────────────────────────────────── */

/** Tiny suffix stripper: leaks/leaking/leaked → leak, clogged → clog. */
export function stem(w: string): string {
  if (w.length <= 3 || /\d/.test(w)) return w;
  let s = w;
  if (s.endsWith("ies") && s.length > 4) s = s.slice(0, -3) + "y";
  else if (s.endsWith("ing") && s.length > 5) s = s.slice(0, -3);
  else if (s.endsWith("ed") && s.length > 4) s = s.slice(0, -2);
  else if (/(sh|ch|x|ss|z)es$/.test(s) && s.length > 4) s = s.slice(0, -2);
  else if (s.endsWith("s") && !s.endsWith("ss") && !s.endsWith("us") && s.length > 3)
    s = s.slice(0, -1);
  // "clogg" → "clog", "dripp" → "drip" (but keep "fill", "pass", "buzz").
  if (/([b-df-hj-kmnp-rtv-z])\1$/.test(s) && !/(ll|ss|zz)$/.test(s)) s = s.slice(0, -1);
  if (s.length > 4 && s.endsWith("e")) s = s.slice(0, -1);
  return s;
}

export function stemPhrase(phrase: string): string {
  return phrase.split(" ").filter(Boolean).map(stem).join(" ");
}

/* ── Typo correction ──────────────────────────────────────────────────── */

/** Optimal-string-alignment distance (Levenshtein + adjacent transposition). */
export function editDistance(a: string, b: string, max = 3): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const d: number[][] = [];
  for (let i = 0; i <= a.length; i++) d[i] = [i];
  for (let j = 0; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    let rowMin = Infinity;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1])
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      rowMin = Math.min(rowMin, d[i][j]);
    }
    if (rowMin > max) return max + 1;
  }
  return d[a.length][b.length];
}

/**
 * Everyday words that must never be "corrected" into a vocabulary word
 * ("sick" is one edit from "sink", "tonight" is not a typo of anything).
 */
const COMMON_WORDS = new Set(
  (
    "the and for you your are was were with this that have has had not but what when where which who why how " +
    "can could would should will just like from they them their there then than into about more some any all " +
    "been being also very much many most make made need needs want wants know think time today tonight " +
    "tomorrow yesterday morning evening night week weekend month year back over only still even well here " +
    "come came going gone good great nice okay sure yes please thanks thank sorry hello right left said says " +
    "say tell told give gave take took look looks looking find found help really thing things stuff something " +
    "anything nothing everything someone anyone people person home house place area work works worked working " +
    "call called calling phone number email name live lives near next last first second other another same " +
    "again always never sometimes maybe because since while after before until down under keep kept feel " +
    "sick seem seems seen show shows long short high low hard soft fast slow late early open close closed " +
    "ready done doing does did let lets letting might must shall these those each every both either neither " +
    "hour hours day days minute minutes office money cost costs price pay paid free cash card check pick " +
    "fine cool love hate life wife kids kid dog cat car job jobs team store shop city town state road street " +
    "avenue apartment condo unit floor wall walls room rooms kitchen bathroom basement garage yard outside inside " +
    "running runs sink drain toilet leak leaks pipe pipes water heater gas sewer"
  ).split(" "),
);

let vocabulary: string[] = [];
let vocabularySet = new Set<string>();

/** Registered once by the knowledge base: every single word the intents use. */
export function setVocabulary(words: Iterable<string>) {
  vocabularySet = new Set([...words].filter((w) => w.length >= 4 && !/\d/.test(w)));
  vocabulary = [...vocabularySet];
}

export function correctToken(tok: string): string {
  if (tok.length < 4 || /\d|@/.test(tok)) return tok;
  if (vocabularySet.has(tok) || COMMON_WORDS.has(tok)) return tok;
  const max = tok.length >= 8 ? 2 : 1;
  let best = tok;
  let bestD = max + 1;
  for (const v of vocabulary) {
    if (Math.abs(v.length - tok.length) > max) continue;
    if (tok.length < 6 && v[0] !== tok[0]) continue;
    const d = editDistance(tok, v, max);
    if (d < bestD) {
      bestD = d;
      best = v;
      if (d === 1 && max === 1) break;
    }
  }
  return bestD <= max ? best : tok;
}

export function correctText(norm: string): string {
  return norm.split(" ").map(correctToken).join(" ");
}

/* ── Entities ─────────────────────────────────────────────────────────── */

const PHONE_RE = /(?<![\d])(?:\+?1[\s.-]*)?\(?([2-9]\d{2})\)?[\s.-]*(\d{3})[\s.-]*(\d{4})(?![\d])/;

/** Returns "(206) 555-1234" or null. */
export function extractPhone(raw: string): string | null {
  const m = raw.match(PHONE_RE);
  if (!m) return null;
  return `(${m[1]}) ${m[2]}-${m[3]}`;
}

/** Count of digits — lets the bot say "that's 9 digits" instead of a generic error. */
export function digitCount(raw: string): number {
  return (raw.match(/\d/g) || []).length;
}

const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,}/i;

const DOMAIN_FIXES: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gnail.com": "gmail.com",
  "gmal.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.con": "gmail.com",
  "gmail.cm": "gmail.com",
  "gmail.om": "gmail.com",
  "gmail.comm": "gmail.com",
  "gmsil.com": "gmail.com",
  "hotmial.com": "hotmail.com",
  "hotmal.com": "hotmail.com",
  "hotmai.com": "hotmail.com",
  "hotmail.co": "hotmail.com",
  "hotmail.con": "hotmail.com",
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "yahoo.co": "yahoo.com",
  "yahoo.con": "yahoo.com",
  "yhoo.com": "yahoo.com",
  "outlok.com": "outlook.com",
  "outloo.com": "outlook.com",
  "outlook.co": "outlook.com",
  "outlook.con": "outlook.com",
  "iclod.com": "icloud.com",
  "icloud.co": "icloud.com",
  "icloud.con": "icloud.com",
  "icoud.com": "icloud.com",
  "comcast.ner": "comcast.net",
  "comcast.com": "comcast.net",
};

/** Returns { email, fixedFrom? } — common domain typos are auto-corrected. */
export function extractEmail(raw: string): { email: string; fixedFrom?: string } | null {
  const m = raw.match(EMAIL_RE);
  if (!m) return null;
  const email = m[0].toLowerCase().replace(/\.+$/, "");
  const [local, domain] = email.split("@");
  const fixed = DOMAIN_FIXES[domain];
  if (fixed) return { email: `${local}@${fixed}`, fixedFrom: email };
  return { email };
}

/** Looks like an attempt at an email that isn't valid ("john@gmail", "john.com"). */
export function looksLikeBrokenEmail(raw: string): boolean {
  return /\S+@\S*/.test(raw) || /\b\S+\.(com|net|org)\b/i.test(raw);
}

/** 5-digit ZIP not embedded in a phone number. */
export function extractZip(raw: string): string | null {
  const withoutPhone = raw.replace(new RegExp(PHONE_RE.source, "g"), " ");
  const m = withoutPhone.match(/(?<![\d-])(\d{5})(?:-\d{4})?(?![\d])/);
  if (!m || m[1] === "00000") return null;
  return m[1];
}

/* ── Names ────────────────────────────────────────────────────────────── */

const NOT_A_NAME = new Set(
  (
    "hi hello hey yo sup ok okay yes no nope yeah sure thanks thank help plumber plumbing emergency " +
    "leak toilet drain water heater pipe sink book booking quote price cost what why how when where who " +
    "test testing asdf none nothing skip idk unknown anonymous no name nah na the and please sorry " +
    "hmm umm um uh lol bot human robot"
  ).split(" "),
);

function titleCase(s: string): string {
  // Respect deliberate casing ("McDonald", "DeShawn"); fix all-lower / ALL-CAPS.
  if (s !== s.toLowerCase() && s !== s.toUpperCase()) return s;
  return s.toLowerCase().replace(/(^|[\s'-])(\p{L})/gu, (_, p, c) => p + c.toUpperCase());
}

function cleanName(candidate: string): string | null {
  const c = candidate
    .replace(/[.,!?;:]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (c.length < 2 || c.length > 40) return null;
  if (!/^[\p{L}][\p{L}'’.\- ]*$/u.test(c)) return null;
  const words = c.split(" ");
  if (words.length > 4) return null;
  if (words.every((w) => NOT_A_NAME.has(w.toLowerCase()))) return null;
  if (NOT_A_NAME.has(words[0].toLowerCase()) && words.length === 1) return null;
  return titleCase(c);
}

const NAME_TOKEN = "[\\p{L}'’.-]+";
const NAME_CAPTURE = `(${NAME_TOKEN}(?:\\s+${NAME_TOKEN}){0,2})`;
const NAME_CAPTURE_CAP = "(\\p{Lu}[\\p{L}'’.-]*(?:\\s+\\p{Lu}[\\p{L}'’.-]*){0,2})";

/** Words that can follow "call me" / "I'm" / "this is" but are never a name. */
const NAME_STOP = new Set(
  (
    "back now asap at on in please today tomorrow later soon having looking trying going getting calling " +
    "not a an the so very just here there urgent sure fine good great ok okay done ready interested " +
    "new sorry confused frustrated worried calling wondering from with"
  ).split(" "),
);

function nameFrom(capture: string | undefined): string | null {
  if (!capture) return null;
  // Stop at connector words: "this is Priya from Kent" → "Priya".
  const cut = capture.split(
    /\s+(?:from|in|and|at|my|here|with|of|by|on|the|i|we|our|calling|looking)\b/i,
  )[0];
  const name = cleanName(cut);
  if (!name) return null;
  if (NAME_STOP.has(name.split(" ")[0].toLowerCase())) return null;
  return name;
}

/**
 * A name stated explicitly anywhere in a message: "my name is Sam",
 * "This is Priya from Kent", "call me Joe". Outside the name question a bare
 * "I'm ___" / "this is ___" only counts when capitalized, since "I'm having
 * a leak" and "this is urgent" are not names. `inNameSlot` relaxes that when
 * the bot has just asked for a name ("it's john", "im sam").
 */
export function extractExplicitName(raw: string, inNameSlot = false): string | null {
  const text = raw.trim();
  const patterns: RegExp[] = [
    new RegExp(`\\bmy name(?:'s| is)?\\s*[:\\-]?\\s+${NAME_CAPTURE}`, "iu"),
    new RegExp(`\\bname(?:'s| is)\\s*[:\\-]?\\s+${NAME_CAPTURE}`, "iu"),
    new RegExp(`\\b(?:you can )?call me\\s+${NAME_CAPTURE}`, "iu"),
    new RegExp(`\\b(?:[Tt]his is|[Ii]'?m|[Ii] am)\\s+${NAME_CAPTURE_CAP}`, "u"),
  ];
  if (inNameSlot)
    patterns.push(new RegExp(`\\b(?:it'?s|its|i'?m|im|i am|this is)\\s+${NAME_CAPTURE}`, "iu"));
  for (const re of patterns) {
    const name = nameFrom(text.match(re)?.[1]);
    if (name) return name;
  }
  return null;
}

/**
 * Interpret a reply to "What's your name?". Accepts explicit phrasing or a
 * bare 1–4 word name; rejects questions, sentences and junk.
 */
export function parseNameAnswer(raw: string): string | null {
  const explicit = extractExplicitName(raw, true);
  if (explicit) return explicit;
  const t = raw
    .replace(/[\d()+\-.]{7,}/g, " ") // strip a phone typed alongside
    .replace(/\S+@\S+/g, " ")
    .replace(/\b\d{5}\b/g, " ")
    .replace(/[,;]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!t || /\?/.test(raw)) return null;
  // "Priya from Kent" → "Priya"
  const cut = t.split(/\s+(?:from|in|at|here|and|with|of|on)\b/i)[0].trim();
  if (
    /^(what|why|how|when|where|who|which|can|could|do|does|is|are|will|would|should|i|we|my|it|this|that|there|please)\b/i.test(
      t,
    )
  )
    return null;
  return cleanName(cut);
}

/* ── Timing ───────────────────────────────────────────────────────────── */

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

/** Maps free-text timing to a tidy label for the email, or null if none found. */
export function extractTiming(norm: string): string | null {
  const t = ` ${norm} `;
  const part = / morning |\d\s?am /.test(t)
    ? " (morning)"
    : / afternoon | noon | lunch /.test(t)
      ? " (afternoon)"
      : / evening | after work | tonight |\d\s?pm /.test(t)
        ? " (evening)"
        : "";
  if (
    / (asap|right now|immediately|urgent|emergency|as soon as possible|now|right away|quick|soonest|earliest) /.test(
      t,
    )
  )
    return "ASAP";
  if (/ (today|tonight|this afternoon|this evening|this morning) /.test(t)) return `Today${part}`;
  if (/ tomorrow /.test(t)) return `Tomorrow${part}`;
  for (const d of DAYS)
    if (t.includes(` ${d} `)) return `${d[0].toUpperCase()}${d.slice(1)}${part}`;
  if (/ this weekend | weekend | saturday | sunday /.test(t)) return `This weekend${part}`;
  if (/ next week /.test(t)) return `Next week${part}`;
  if (/ this week | in a few days | few days | later this week /.test(t)) return `This week${part}`;
  if (
    / (flexible|anytime|any time|whenever|no rush|not urgent|any day|does not matter|do not care|either|whatever works|any time works|anytime works) /.test(
      t,
    )
  )
    return `Flexible${part}`;
  if (part) return `Flexible${part}`;
  return null;
}

/* ── Misc helpers ─────────────────────────────────────────────────────── */

/** True if any of the phrases appear as whole words in normalized text. */
export function hasPhrase(norm: string, phrases: string[]): boolean {
  const t = ` ${norm} `;
  return phrases.some((p) => t.includes(` ${p} `));
}

/** "not an emergency", "no leak", "isn't urgent" — negated mention of a word. */
export function isNegated(norm: string, word: string): boolean {
  const re = new RegExp(`\\b(not|no|never|isnt|without|nothing)\\b(\\s+\\w+){0,2}\\s+${word}`);
  return re.test(norm);
}
