#!/usr/bin/env node
/**
 * seo-qa.mjs — post-deploy SEO/indexing QA against a live site.
 *
 *   node scripts/seo-qa.mjs                                   # production
 *   node scripts/seo-qa.mjs --base http://localhost:4173      # a local preview build
 *   node scripts/seo-qa.mjs --json                            # machine-readable output
 *
 * Exits 0 only when every check passes, so it can gate a deploy in CI.
 *
 * WHY THIS EXISTS: the problems this repo just fixed were all invisible from
 * the browser. Two pages can look perfect and still split a keyword between
 * them; a placeholder rating in JSON-LD renders as nothing at all; a sitemap
 * can quietly list URLs that redirect. Every assertion below corresponds to a
 * defect that was actually found live on this site, so a regression in any of
 * them is a regression we have already paid for once.
 *
 * The checks are deliberately black-box: they assert what Google will see when
 * it fetches the deployed site, not what the source code intends.
 */

const args = process.argv.slice(2);
const BASE = (
  args.includes("--base") ? args[args.indexOf("--base") + 1] : "https://www.allphaseplumbing.com"
).replace(/\/$/, "");
const JSON_OUT = args.includes("--json");
const CONCURRENCY = 6;

/* The 14 services that had two competing pages each. The bare URL must 301 to
   the /services/plumbing/* version, which must stay 200. */
const CONSOLIDATED = [
  "burst-pipe-repair",
  "emergency-plumber",
  "fixture-replacement",
  "gas-line-repair",
  "hot-water-system-repair",
  "pipe-repair",
  "pipe-replacement",
  "repiping",
  "septic-tank-service",
  "slab-leak-repair",
  "toilet-installation",
  "toilets",
  "water-lines",
  "water-softeners",
];

/* Legacy redirects that predate the consolidation but must keep working. */
const LEGACY_REDIRECTS = [
  ["/draincleaning", "/drain-cleaning"],
  ["/hydro-jetting", "/drain-cleaning"],
  ["/services/hydro-jetting", "/services/drain-cleaning"],
  ["/service-area/renton", "/areas/renton"],
];

/* Google Ads landing pages: live and converting, but must stay out of the
   organic index so they stop competing with the service pages. */
const MUST_NOINDEX = ["/drain-cleaning", "/emergency-plumber"];

const CITIES = [
  "auburn",
  "bellevue",
  "bonney-lake",
  "bothell",
  "des-moines",
  "federal-way",
  "fife",
  "kent",
  "kirkland",
  "lakewood",
  "mercer-island",
  "puyallup",
  "redmond",
  "renton",
  "seattle",
  "south-hill",
  "spanaway",
  "summit",
  "summit-view",
  "tacoma",
  "tukwila",
];

/* Placeholder review content that must never appear on the live site again. */
const FABRICATED_NAMES = ["Marcus T.", "Priya S.", "Dawn R.", "James R.", "Sarah M.", "David C."];
const RETIRED_PHONE = /\(?206\)?[\s.-]*772[\s.-]*6077/;

// ── tiny test harness ────────────────────────────────────────────────────────
const results = [];
let currentGroup = "general";
const group = (name) => {
  currentGroup = name;
};
function check(name, ok, detail = "") {
  results.push({ group: currentGroup, name, ok: !!ok, detail });
  if (!JSON_OUT) {
    const mark = ok ? "\x1b[32m  PASS\x1b[0m" : "\x1b[31m  FAIL\x1b[0m";
    console.log(`${mark}  ${name}${ok || !detail ? "" : `\n          ↳ ${detail}`}`);
  }
}

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++;
        out[idx] = await fn(items[idx], idx);
      }
    }),
  );
  return out;
}

const cache = new Map();
/** Fetch without following redirects, so a 301 is observable. */
async function head(path) {
  if (cache.has(path)) return cache.get(path);
  const url = path.startsWith("http") ? path : BASE + path;
  let res;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      res = await fetch(url, { redirect: "manual", headers: { "user-agent": "seo-qa/1.0" } });
      break;
    } catch (err) {
      if (attempt === 3) {
        const fail = { status: 0, location: null, body: "", error: String(err) };
        cache.set(path, fail);
        return fail;
      }
      await new Promise((r) => setTimeout(r, 400 * attempt));
    }
  }
  const status = res.status;
  const location = res.headers.get("location");
  const body = status >= 200 && status < 300 ? await res.text() : "";
  const out = { status, location, body };
  cache.set(path, out);
  return out;
}

// ── helpers that read the rendered HTML the way a crawler would ─────────────
const tag = (html, re) => {
  const m = html.match(re);
  return m ? m[1] : null;
};
const title = (h) => tag(h, /<title>([\s\S]*?)<\/title>/i);
const metaDesc = (h) =>
  tag(h, /<meta\s+name="description"\s+content="([\s\S]*?)"/i) ??
  tag(h, /<meta\s+content="([\s\S]*?)"\s+name="description"/i);
const canonical = (h) => tag(h, /<link\s+rel="canonical"\s+href="([\s\S]*?)"/i);
/**
 * Canonical tags are absolute and hardcoded to the production origin, which is
 * correct: a canonical must name the one URL Google should index, and that is
 * never a localhost or preview host. So compare the PATH, and assert the origin
 * separately, otherwise every canonical check fails when run against a local
 * preview build and the suite is useless exactly when it is cheapest to run.
 */
const CANONICAL_ORIGIN = "https://www.allphaseplumbing.com";
function canonicalMatches(html, expectedPath) {
  const raw = canonical(html);
  if (!raw) return { ok: false, detail: "no canonical tag" };
  let u;
  try {
    u = new URL(raw);
  } catch {
    return { ok: false, detail: `canonical is not an absolute URL: ${raw}` };
  }
  if (u.origin !== CANONICAL_ORIGIN)
    return { ok: false, detail: `canonical origin ${u.origin}, expected ${CANONICAL_ORIGIN}` };
  const got = u.pathname.replace(/\/$/, "") || "/";
  const want = expectedPath.replace(/\/$/, "") || "/";
  return got === want
    ? { ok: true, detail: "" }
    : { ok: false, detail: `canonical path ${got}, expected ${want}` };
}
const robots = (h) => tag(h, /<meta\s+name="robots"\s+content="([\s\S]*?)"/i);
const h1s = (h) => [...h.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => strip(m[1]));
const jsonLdBlocks = (h) =>
  [...h.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(
    (m) => m[1],
  );
const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&middot;/g, "·")
    .replace(/&nbsp;/g, " ");
/** Visible text only: scripts, styles and tags removed. */
function strip(html) {
  return decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}
/** Internal hrefs, normalised to a path. */
function internalLinks(html) {
  const found = new Set();
  for (const m of html.matchAll(/href="([^"#?]+)/g)) {
    let href = decode(m[1]);
    if (href.startsWith(BASE)) href = href.slice(BASE.length) || "/";
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    if (/\.(png|jpe?g|webp|svg|css|js|xml|txt|ico|mp4|woff2?|pdf)$/i.test(href)) continue;
    found.add(href.replace(/\/$/, "") || "/");
  }
  return [...found];
}
/** Jaccard similarity over word shingles, for near-duplicate detection. */
function similarity(a, b) {
  const sh = (t) => {
    const w = t.toLowerCase().split(/\W+/).filter(Boolean);
    const s = new Set();
    for (let i = 0; i + 4 < w.length; i++) s.add(w.slice(i, i + 5).join(" "));
    return s;
  };
  const A = sh(a);
  const B = sh(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  return inter / (A.size + B.size - inter);
}

// ── the suite ───────────────────────────────────────────────────────────────
async function run() {
  if (!JSON_OUT) console.log(`\n\x1b[1mSEO QA — ${BASE}\x1b[0m\n`);

  // 1. Reachability -----------------------------------------------------------
  group("reachability");
  if (!JSON_OUT) console.log("\x1b[1m1. Site reachable\x1b[0m");
  const home = await head("/");
  check("homepage returns 200", home.status === 200, `got ${home.status}${home.error ?? ""}`);
  if (home.status !== 200) {
    report();
    return;
  }
  const robotsTxt = await head("/robots.txt");
  check("robots.txt returns 200", robotsTxt.status === 200, `got ${robotsTxt.status}`);
  check(
    "robots.txt does not blanket-disallow",
    !/^\s*Disallow:\s*\/\s*$/im.test(robotsTxt.body),
    "a bare 'Disallow: /' would deindex the whole site",
  );
  check(
    "robots.txt advertises the sitemap",
    /Sitemap:\s*https?:\/\//i.test(robotsTxt.body),
    robotsTxt.body.trim().slice(0, 120),
  );
  const apex = await head("https://allphaseplumbing.com/");
  check(
    "bare apex redirects to www (one canonical host)",
    apex.status === 301 && /^https:\/\/www\./.test(apex.location ?? ""),
    `got ${apex.status} -> ${apex.location}`,
  );

  // 2. Duplicate-page consolidation ------------------------------------------
  group("consolidation");
  if (!JSON_OUT) console.log("\n\x1b[1m2. Duplicate service pages consolidated\x1b[0m");
  await mapLimit(CONSOLIDATED, CONCURRENCY, async (s) => {
    const bare = await head(`/services/${s}`);
    const want = `/services/plumbing/${s}`;
    const to = (bare.location ?? "").replace(BASE, "");
    check(
      `/services/${s} → 301 ${want}`,
      bare.status === 301 && to === want,
      `got ${bare.status} -> ${bare.location ?? "(no Location)"}`,
    );
  });
  await mapLimit(CONSOLIDATED, CONCURRENCY, async (s) => {
    const p = `/services/plumbing/${s}`;
    const r = await head(p);
    const canon = canonicalMatches(r.body, p);
    check(
      `${p} is 200 and self-canonical`,
      r.status === 200 && canon.ok,
      `status ${r.status}; ${canon.detail}`,
    );
  });
  for (const [from, to] of LEGACY_REDIRECTS) {
    const r = await head(from);
    const got = (r.location ?? "").replace(BASE, "");
    check(
      `legacy ${from} → 301 ${to}`,
      r.status === 301 && got === to,
      `got ${r.status} -> ${r.location ?? "(none)"}`,
    );
  }

  // 3. Indexability ----------------------------------------------------------
  group("indexability");
  if (!JSON_OUT) console.log("\n\x1b[1m3. Indexability (noindex only where intended)\x1b[0m");
  for (const p of MUST_NOINDEX) {
    const r = await head(p);
    check(
      `${p} is live (200) for Ads traffic`,
      r.status === 200,
      `got ${r.status} — a broken Ads landing page wastes spend`,
    );
    check(
      `${p} carries noindex (stops cannibalizing organic)`,
      /noindex/i.test(robots(r.body) ?? ""),
      `robots meta: ${robots(r.body) ?? "(absent)"}`,
    );
    check(
      `${p} keeps 'follow' so its links still pass equity`,
      /follow/i.test(robots(r.body) ?? "") && !/nofollow/i.test(robots(r.body) ?? ""),
      `robots meta: ${robots(r.body) ?? "(absent)"}`,
    );
  }

  // 4. Sitemap integrity ------------------------------------------------------
  group("sitemap");
  if (!JSON_OUT) console.log("\n\x1b[1m4. Sitemap integrity\x1b[0m");
  const sm = await head("/sitemap.xml");
  check("sitemap.xml returns 200", sm.status === 200, `got ${sm.status}`);
  const locs = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  check("sitemap is non-empty", locs.length > 0, `${locs.length} URLs`);
  check(
    "sitemap has no duplicate URLs",
    new Set(locs).size === locs.length,
    `${locs.length - new Set(locs).size} duplicate(s)`,
  );
  check(
    "every sitemap URL uses the canonical www host",
    locs.every((l) => l.startsWith("https://www.allphaseplumbing.com")),
    locs.filter((l) => !l.startsWith("https://www.allphaseplumbing.com")).join(", "),
  );
  const noindexSet = new Set(MUST_NOINDEX);
  check(
    "no noindex page is listed in the sitemap",
    !locs.some((l) => noindexSet.has(l.replace(BASE, ""))),
    "submitting a noindex URL sends mixed signals to Google",
  );
  const smStatuses = await mapLimit(locs, CONCURRENCY, async (l) => {
    const r = await head(l.replace(BASE, ""));
    return { l, status: r.status, location: r.location };
  });
  const bad = smStatuses.filter((x) => x.status !== 200);
  check(
    `all ${locs.length} sitemap URLs return 200`,
    bad.length === 0,
    bad
      .map((b) => `${b.l} → ${b.status}${b.location ? ` (${b.location})` : ""}`)
      .join("\n          "),
  );

  // 5. No fabricated trust signals -------------------------------------------
  group("review-integrity");
  if (!JSON_OUT) console.log("\n\x1b[1m5. No fabricated review data\x1b[0m");
  const sample = [
    "/",
    "/about",
    "/contact",
    "/services",
    "/services/plumbing",
    "/services/drain-cleaning",
    "/services/water-heaters",
    "/services/sewer-services",
    "/residential",
    "/commercial",
    "/coupons",
    ...CITIES.map((c) => `/areas/${c}`),
  ];
  const pages = await mapLimit(sample, CONCURRENCY, async (p) => ({ p, ...(await head(p)) }));
  const withRating = pages.filter((x) => /AggregateRating/i.test(x.body)).map((x) => x.p);
  check(
    "no page emits aggregateRating (unverified rating would risk a manual action)",
    withRating.length === 0,
    withRating.join(", "),
  );
  const withFake = pages
    .filter((x) => FABRICATED_NAMES.some((n) => x.body.includes(n)))
    .map((x) => x.p);
  check("no placeholder testimonial names on any page", withFake.length === 0, withFake.join(", "));
  const withOldPhone = pages.filter((x) => RETIRED_PHONE.test(strip(x.body))).map((x) => x.p);
  check(
    "retired phone number never reaches visible copy",
    withOldPhone.length === 0,
    withOldPhone.join(", "),
  );

  // 6. Structured data --------------------------------------------------------
  group("structured-data");
  if (!JSON_OUT) console.log("\n\x1b[1m6. Structured data parses\x1b[0m");
  const badLd = [];
  let ldCount = 0;
  for (const pg of pages) {
    for (const block of jsonLdBlocks(pg.body)) {
      ldCount++;
      try {
        JSON.parse(block);
      } catch (e) {
        badLd.push(`${pg.p}: ${e.message}`);
      }
    }
  }
  check(
    `all ${ldCount} JSON-LD blocks are valid JSON`,
    badLd.length === 0,
    badLd.join("\n          "),
  );
  check(
    "homepage declares the business as a Plumber entity",
    /"@type":\s*"Plumber"/.test(home.body),
    "LocalBusiness subtype drives local rich results",
  );

  // 7. Per-page SEO basics ----------------------------------------------------
  group("meta");
  if (!JSON_OUT) console.log("\n\x1b[1m7. Titles, descriptions, H1s\x1b[0m");
  const indexable = pages.filter((x) => x.status === 200 && !/noindex/i.test(robots(x.body) ?? ""));
  const missingTitle = indexable.filter((x) => !title(x.body)).map((x) => x.p);
  check("every indexable page has a <title>", missingTitle.length === 0, missingTitle.join(", "));
  const missingDesc = indexable.filter((x) => !metaDesc(x.body)).map((x) => x.p);
  check(
    "every indexable page has a meta description",
    missingDesc.length === 0,
    missingDesc.join(", "),
  );
  const missingCanon = indexable.filter((x) => !canonical(x.body)).map((x) => x.p);
  check("every indexable page has a canonical", missingCanon.length === 0, missingCanon.join(", "));
  const badH1 = indexable
    .filter((x) => h1s(x.body).length !== 1)
    .map((x) => `${x.p} (${h1s(x.body).length})`);
  check("every indexable page has exactly one H1", badH1.length === 0, badH1.join(", "));

  const titleMap = new Map();
  for (const x of indexable) {
    const t = decode(title(x.body) ?? "");
    if (!titleMap.has(t)) titleMap.set(t, []);
    titleMap.get(t).push(x.p);
  }
  const dupTitles = [...titleMap].filter(([, ps]) => ps.length > 1);
  check(
    "no two indexable pages share a title",
    dupTitles.length === 0,
    dupTitles.map(([t, ps]) => `"${t}" → ${ps.join(", ")}`).join("\n          "),
  );
  const descMap = new Map();
  for (const x of indexable) {
    const d = decode(metaDesc(x.body) ?? "");
    if (!descMap.has(d)) descMap.set(d, []);
    descMap.get(d).push(x.p);
  }
  const dupDescs = [...descMap].filter(([, ps]) => ps.length > 1);
  check(
    "no two indexable pages share a meta description",
    dupDescs.length === 0,
    dupDescs.map(([d, ps]) => `"${d.slice(0, 60)}…" → ${ps.join(", ")}`).join("\n          "),
  );
  const longTitles = indexable
    .map((x) => [x.p, decode(title(x.body) ?? "")])
    .filter(([, t]) => t.length > 65);
  check(
    "titles stay under ~65 chars (avoid SERP truncation)",
    longTitles.length === 0,
    longTitles.map(([p, t]) => `${p} (${t.length})`).join(", "),
  );
  const longDescs = indexable
    .map((x) => [x.p, decode(metaDesc(x.body) ?? "")])
    .filter(([, d]) => d.length > 165);
  check(
    "meta descriptions stay under ~165 chars",
    longDescs.length === 0,
    longDescs.map(([p, d]) => `${p} (${d.length})`).join(", "),
  );

  // 8. City pages: live, distinct, locally specific --------------------------
  group("city-pages");
  if (!JSON_OUT) console.log("\n\x1b[1m8. City pages live and genuinely distinct\x1b[0m");
  const cityPages = CITIES.map((c) => pages.find((p) => p.p === `/areas/${c}`));
  const cityDown = cityPages.filter((x) => x.status !== 200).map((x) => `${x.p} → ${x.status}`);
  check(`all ${CITIES.length} city pages return 200`, cityDown.length === 0, cityDown.join(", "));
  const titleMissingCity = cityPages
    .filter((x) => {
      const name = x.p.split("/").pop().replace(/-/g, " ");
      return !decode(title(x.body) ?? "")
        .toLowerCase()
        .includes(name.split(" ")[0]);
    })
    .map((x) => x.p);
  check(
    "every city page names its city in the title",
    titleMissingCity.length === 0,
    titleMissingCity.join(", "),
  );
  const thin = cityPages
    .map((x) => [x.p, strip(x.body).split(/\s+/).length])
    .filter(([, w]) => w < 700);
  check(
    "no city page is thin (<700 words of visible copy)",
    thin.length === 0,
    thin.map(([p, w]) => `${p} (${w}w)`).join(", "),
  );
  const texts = cityPages.map((x) => ({ p: x.p, t: strip(x.body) }));
  let worst = { pair: "", sim: 0 };
  for (let i = 0; i < texts.length; i++) {
    for (let j = i + 1; j < texts.length; j++) {
      const s = similarity(texts[i].t, texts[j].t);
      if (s > worst.sim) worst = { pair: `${texts[i].p} vs ${texts[j].p}`, sim: s };
    }
  }
  check(
    `no two city pages are near-duplicates (worst pair ${(worst.sim * 100).toFixed(0)}% similar)`,
    worst.sim < 0.9,
    `${worst.pair} — above 90% shingle overlap reads as one template with the name swapped`,
  );
  const WRITTEN = ["tukwila", "renton", "kent", "auburn", "federal-way", "tacoma"];
  for (const c of WRITTEN) {
    const pg = pages.find((x) => x.p === `/areas/${c}`);
    const words = strip(pg.body).split(/\s+/).length;
    check(
      `/areas/${c} carries hand-written depth (${words} words)`,
      words >= 1200,
      "core-market city should be substantially deeper than a generated page",
    );
  }

  // 9. Internal links never point at a redirect or a 404 ---------------------
  group("internal-links");
  if (!JSON_OUT) console.log("\n\x1b[1m9. Internal links resolve directly\x1b[0m");
  const linkSet = new Set();
  for (const pg of pages) for (const l of internalLinks(pg.body)) linkSet.add(l);
  const linkTargets = [...linkSet].filter((l) => !noindexSet.has(l));
  const linkStatuses = await mapLimit(linkTargets, CONCURRENCY, async (l) => ({
    l,
    ...(await head(l)),
  }));
  const broken = linkStatuses.filter((x) => x.status >= 400 || x.status === 0);
  check(
    `no broken internal links (${linkTargets.length} checked)`,
    broken.length === 0,
    broken.map((b) => `${b.l} → ${b.status}`).join(", "),
  );
  const viaRedirect = linkStatuses.filter((x) => x.status >= 300 && x.status < 400);
  check(
    "no internal link points through a redirect",
    viaRedirect.length === 0,
    viaRedirect
      .map((b) => `${b.l} → ${b.status} ${(b.location ?? "").replace(BASE, "")}`)
      .join("\n          "),
  );

  // 10. Conversion paths intact ----------------------------------------------
  group("conversion");
  if (!JSON_OUT) console.log("\n\x1b[1m10. Conversion paths intact\x1b[0m");
  const TRACKED_TEL = "tel:2063091088";
  for (const p of ["/", "/contact", "/areas/renton", "/services/plumbing/emergency-plumber"]) {
    const pg = pages.find((x) => x.p === p) ?? (await head(p));
    const body = pg.body ?? "";
    check(
      `${p} exposes the tracked phone number`,
      body.includes(TRACKED_TEL),
      "no tel: link found",
    );
  }
  const contact = pages.find((x) => x.p === "/contact");
  check(
    "/contact renders a lead form",
    /<form\b/i.test(contact.body),
    "no <form> element in the server-rendered HTML",
  );
  check("homepage renders a lead form", /<form\b/i.test(home.body), "no <form> in homepage HTML");

  report();
}

function report() {
  const failed = results.filter((r) => !r.ok);
  if (JSON_OUT) {
    console.log(
      JSON.stringify(
        { base: BASE, total: results.length, failed: failed.length, results },
        null,
        2,
      ),
    );
  } else {
    const line = "─".repeat(64);
    console.log(`\n${line}`);
    if (failed.length === 0) {
      console.log(`\x1b[32m\x1b[1m  ALL ${results.length} CHECKS PASSED\x1b[0m  (${BASE})`);
    } else {
      console.log(
        `\x1b[31m\x1b[1m  ${failed.length} of ${results.length} CHECKS FAILED\x1b[0m  (${BASE})\n`,
      );
      for (const f of failed) console.log(`  \x1b[31m✗\x1b[0m [${f.group}] ${f.name}`);
    }
    console.log(line + "\n");
  }
  process.exit(failed.length === 0 ? 0 : 1);
}

run().catch((err) => {
  console.error("seo-qa crashed:", err);
  process.exit(1);
});
