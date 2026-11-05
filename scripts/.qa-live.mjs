import { chromium } from "playwright";
const browser = await chromium.launch(); const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://www.allphaseplumbing.com/", { waitUntil: "networkidle" });
const h = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h; y += 600) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(80); }
await page.waitForTimeout(1500);
const t = await page.evaluate(() => document.body.innerText);
console.log("live homepage: new=", (t.match(/12\/31\/2026/g)||[]).length, "old=", (t.match(/10\/31\/2026/g)||[]).length);
await browser.close();
