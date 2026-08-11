/**
 * Load-performance probe for the production build.
 *
 * Runs the built site in headless Chromium under Lighthouse-like conditions and
 * reports the numbers that actually move the Performance score: FCP, LCP, CLS,
 * an approximated TBT (sum of long-task time over 50ms), transfer weight split
 * by first/third party, and the reveal-animation state of the hero <h1>.
 *
 * Usage:
 *   node scripts/perf-check.mjs [url] [--mobile] [--no-3p]
 *
 * --mobile  emulates the Moto G Power profile PageSpeed uses (4x CPU, Slow 4G).
 * --no-3p   blocks GTM / gtag / Meta so third-party cost can be isolated.
 */
import { chromium } from "playwright";

const url = process.argv.find((a) => a.startsWith("http")) ?? "http://localhost:4173/";
const mobile = process.argv.includes("--mobile");
const block3p = process.argv.includes("--no-3p");

const THIRD_PARTY = ["googletagmanager.com", "connect.facebook.net", "doubleclick.net", "google.com/ads", "google-analytics.com"];

const browser = await chromium.launch();
const context = await browser.newContext(
  mobile
    ? {
        viewport: { width: 412, height: 823 },
        deviceScaleFactor: 1.75,
        isMobile: true,
        hasTouch: true,
        userAgent:
          "Mozilla/5.0 (Linux; Android 11; moto g power) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
      }
    : { viewport: { width: 1350, height: 940 } },
);
const page = await context.newPage();

if (block3p) {
  await page.route("**/*", (route) => {
    const u = route.request().url();
    return THIRD_PARTY.some((h) => u.includes(h)) ? route.abort() : route.continue();
  });
}

/* Collect long tasks from the very first script the page runs. */
await page.addInitScript(() => {
  window.__lt = [];
  window.__ls = 0;
  window.__lcp = null;
  new PerformanceObserver((l) => {
    const e = l.getEntries().pop();
    window.__lcp = {
      t: Math.round(e.startTime),
      el: e.element ? e.element.tagName + "." + String(e.element.className || "").slice(0, 45) : "?",
      url: e.url || null,
      size: e.size,
    };
  }).observe({ type: "largest-contentful-paint", buffered: true });
  new PerformanceObserver((l) =>
    l.getEntries().forEach((e) => window.__lt.push({ start: e.startTime, dur: e.duration })),
  ).observe({ type: "longtask", buffered: true });
  new PerformanceObserver((l) =>
    l.getEntries().forEach((e) => {
      if (!e.hadRecentInput) window.__ls += e.value;
    }),
  ).observe({ type: "layout-shift", buffered: true });
});

const cdp = await context.newCDPSession(page);
if (mobile) {
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
  });
}

const transfers = [];
page.on("response", async (r) => {
  const h = r.headers();
  transfers.push({ url: r.url(), size: Number(h["content-length"] ?? 0), type: r.request().resourceType() });
});

await page.goto(url, { waitUntil: "load", timeout: 90000 });
await page.waitForTimeout(6000); // let LH's post-load quiet window play out

const metrics = await page.evaluate(() => {
  const paint = performance.getEntriesByName("first-contentful-paint")[0];
  const h1 = document.querySelector("h1");
  return {
    fcp: paint ? Math.round(paint.startTime) : null,
    lcp: window.__lcp?.t ?? null,
    lcpEl: window.__lcp ? `${window.__lcp.el}${window.__lcp.url ? " ← " + window.__lcp.url.slice(-40) : ""}` : null,
    cls: Number(window.__ls.toFixed(4)),
    tbt: Math.round(window.__lt.reduce((s, t) => s + Math.max(0, t.dur - 50), 0)),
    longest: window.__lt
      .slice()
      .sort((a, b) => b.dur - a.dur)
      .slice(0, 5)
      .map((t) => `${Math.round(t.dur)}ms @${Math.round(t.start)}ms`),
    h1: h1
      ? {
          opacity: getComputedStyle(h1).opacity,
          preAnimate: h1.classList.contains("heading-pre-animate"),
        }
      : null,
    hiddenHeadings: [...document.querySelectorAll("h1,h2,h3")].filter(
      (e) => getComputedStyle(e).opacity === "0" && e.getBoundingClientRect().top < innerHeight,
    ).length,
  };
});

const first = transfers.filter((t) => t.url.includes(new URL(url).host));
const third = transfers.filter((t) => !t.url.includes(new URL(url).host));
const kb = (list) => Math.round(list.reduce((s, t) => s + t.size, 0) / 1024);

console.log(`\n── ${mobile ? "MOBILE (4x CPU, Slow 4G)" : "DESKTOP"}${block3p ? " · third-party BLOCKED" : ""} ──`);
console.log(`FCP          ${metrics.fcp} ms`);
console.log(`LCP          ${metrics.lcp} ms  (${metrics.lcpEl})`);
console.log(`CLS          ${metrics.cls}`);
console.log(`TBT (approx) ${metrics.tbt} ms`);
console.log(`longest      ${metrics.longest.join(", ")}`);
console.log(`transfer     first-party ${kb(first)} KB · third-party ${kb(third)} KB`);
console.log(`hero h1      opacity=${metrics.h1?.opacity} preAnimate=${metrics.h1?.preAnimate}`);
console.log(`above-fold headings stuck at opacity 0: ${metrics.hiddenHeadings}`);

await browser.close();
