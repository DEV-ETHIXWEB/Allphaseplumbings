/**
 * One-shot image optimizer. Resizes/recompresses the heavyweight raster
 * assets to their rendered sizes (2x DPR) and converts photo PNGs to WebP.
 *
 * sharp comes in transitively via @cloudflare/vite-plugin -> miniflare, so
 * there is no direct dependency to add. Run with: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { statSync, renameSync, unlinkSync, existsSync } from "node:fs";

// sharp keeps input files open in its cache, which blocks in-place overwrite on Windows.
sharp.cache(false);

const kb = (p) => Math.round(statSync(p).size / 1024);

/** { in, out, width?, height?, format, quality } — out === in allowed (via temp file). */
const jobs = [
  // ── src/assets: format conversions (imports updated in code) ──
  { in: "src/assets/team.jpg", out: "src/assets/team.webp", width: 1200, quality: 70 },
  // "png" that is actually a 1024x1024 JPEG
  {
    in: "src/assets/plumbing_service_hero.png",
    out: "src/assets/plumbing-service-hero.webp",
    quality: 72,
  },
  { in: "src/assets/seattle-skyline.jpg", out: "src/assets/seattle-skyline.webp", quality: 65 },
  { in: "src/assets/van.png", out: "src/assets/van.webp", quality: 82 },
  {
    in: "src/assets/App updated logo.png",
    out: "src/assets/app-text-logo.webp",
    width: 480,
    quality: 85,
  },
  // Google rating card: a 1612x576 PNG (1MB) rendered at ≤340 CSS px in the
  // hero, i.e. above the fold on every page that uses <Hero>. 2x DPR = 700px.
  {
    in: "src/assets/Group 55.png",
    out: "src/assets/google-rating-card.webp",
    width: 700,
    quality: 82,
  },
  // ── src/assets: recompress in place ──
  {
    in: "src/assets/better-mascot.webp",
    out: "src/assets/better-mascot.webp",
    height: 960,
    quality: 75,
  },
  { in: "src/assets/team-1.webp", out: "src/assets/team-1.webp", width: 880, quality: 68 },
  { in: "src/assets/team-2.webp", out: "src/assets/team-2.webp", width: 880, quality: 68 },
  { in: "src/assets/team-3.webp", out: "src/assets/team-3.webp", width: 880, quality: 68 },
  { in: "src/assets/team-4.webp", out: "src/assets/team-4.webp", width: 880, quality: 68 },
  { in: "src/assets/badge-phcc.webp", out: "src/assets/badge-phcc.webp", width: 400, quality: 80 },
  // Phone-sized hero still. 800px covers a 412px viewport at ~2x DPR without
  // upscaling, at less than half the bytes of the 1280px desktop file.
  {
    in: "public/videos/seattle-bg-poster.webp",
    out: "public/videos/seattle-bg-poster-800.webp",
    width: 800,
    quality: 55,
  },
  // ── public/videos: hero poster (LCP image) ──
  {
    in: "public/videos/seattle-bg-poster.jpg",
    out: "public/videos/seattle-bg-poster.webp",
    quality: 68,
  },
  // ── public/projects: masonry photos render ~400px wide ──
  ...Array.from({ length: 12 }, (_, i) => ({
    in: `public/projects/project-${i + 1}.webp`,
    out: `public/projects/project-${i + 1}.webp`,
    width: 800,
    quality: 68,
  })),
  // PHCC badge: 1239x453 rendered at ≤144 CSS px tall → 300px at 2x DPR.
  {
    in: "public/images/afd74bdf0d77437784a458bcf7b606df.webp",
    out: "public/images/afd74bdf0d77437784a458bcf7b606df.webp",
    height: 300,
    quality: 78,
  },
  // ── public/images: JPEG bytes inside .png names; keep names (may be hot-linked),
  //    re-encode as smaller JPEG so behavior (content sniffing) is unchanged ──
  {
    in: "public/images/emergency_plumbing_burst_pipe_1782730627075.png",
    out: "public/images/emergency_plumbing_burst_pipe_1782730627075.png",
    format: "jpeg",
    quality: 72,
  },
  {
    in: "public/images/emergency_plumbing_flooded_basement_1782730642957.png",
    out: "public/images/emergency_plumbing_flooded_basement_1782730642957.png",
    format: "jpeg",
    quality: 72,
  },
  {
    in: "public/images/emergency_plumbing_plumber_working_1782730655865.png",
    out: "public/images/emergency_plumbing_plumber_working_1782730655865.png",
    format: "jpeg",
    quality: 72,
  },
];

for (const j of jobs) {
  if (!existsSync(j.in)) {
    console.log(`SKIP (missing): ${j.in}`);
    continue;
  }
  const before = kb(j.in);
  const tmp = j.out + ".tmp";
  let img = sharp(j.in);
  const meta = await img.metadata();
  if (j.width && meta.width > j.width) img = img.resize({ width: j.width });
  else if (j.height && meta.height > j.height) img = img.resize({ height: j.height });
  const format = j.format ?? "webp";
  if (format === "jpeg") img = img.jpeg({ quality: j.quality, mozjpeg: true });
  else img = img.webp({ quality: j.quality });
  await img.toFile(tmp);
  // Only keep the result when it is actually smaller.
  if (statSync(tmp).size < statSync(j.in).size || j.out !== j.in) {
    if (j.out === j.in) unlinkSync(j.in);
    if (existsSync(j.out)) unlinkSync(j.out);
    renameSync(tmp, j.out);
    console.log(`${j.in} ${before}KB -> ${j.out} ${kb(j.out)}KB`);
  } else {
    unlinkSync(tmp);
    console.log(`KEPT (no win): ${j.in} ${before}KB`);
  }
}
