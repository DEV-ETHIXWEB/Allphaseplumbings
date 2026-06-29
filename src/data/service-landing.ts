/**
 * Content for the home-style service *landing* pages (route: /lp/$slug).
 *
 * These pages are intentionally NOT linked anywhere in the site navigation —
 * they exist so a visitor who searches for a specific service lands on a
 * home-page-style page tailored to that service. The header logo still points
 * to the real home page ("/").
 *
 * Each entry customises only the hero (taglines + subtitle) and a single
 * "about this service" intro block; every other section is the shared
 * home-page component, reused verbatim.
 */

export type ServiceLandingContent = {
  slug: string;
  /** Plain service name, e.g. "Drain Cleaning". */
  name: string;
  /** SEO <title>. */
  metaTitle: string;
  metaDescription: string;

  /* ── Hero overrides ── */
  /** Two-line cycling taglines for lg+ screens. */
  heroTaglinesPc: readonly (readonly string[])[];
  /** Cycling taglines for mobile/tablet (can wrap to more lines). */
  heroTaglinesMobile: readonly (readonly string[])[];
  /** Sub-headline under the cycling tagline. */
  heroSubtitle: string;

  /* ── One "about this service" intro section ── */
  introEyebrow: string;
  introHeading: string;
  introParagraphs: string[];
  /** Short bulleted highlights shown beside the copy. */
  introHighlights: string[];
  /** Image shown in the framed panel on the right. */
  introImage: string;
};

export const SERVICE_LANDINGS: Record<string, ServiceLandingContent> = {
  "drain-cleaning": {
    slug: "drain-cleaning",
    name: "Drain Cleaning",
    metaTitle: "Drain Cleaning Seattle | All Phase Plumbing",
    metaDescription:
      "Professional drain cleaning in Seattle. Licensed plumbers clear any clog with hydro jetting, snaking & camera inspection. Same-day service — call (206) 772-6077.",

    // Single static headline; "Any Tough Clog." rendered in brand gold.
    heroTaglinesPc: [
      ["Hydro Jetting & Snaking for", '<span style="color:#F5C842">Any Tough Clog.</span>'],
    ],
    heroTaglinesMobile: [
      ["Hydro Jetting", "& Snaking for", '<span style="color:#F5C842">Any Tough Clog.</span>'],
    ],
    heroSubtitle:
      "Licensed Seattle drain cleaning experts clearing clogs the right way since 1989.",

    introEyebrow: "About Our Drain Cleaning",
    introHeading: "Professional Drain Cleaning That Lasts",
    introParagraphs: [
      "When your drains slow down or back up, trust All Phase Plumbing — Seattle's local drain cleaning experts — to restore smooth, consistent flow. We remove clogs, eliminate buildup, and help prevent future blockages.",
      "From kitchen sinks and bathroom drains to floor drains and main sewer lines, our licensed plumbers use professional-grade augers, hydro-jetting equipment, and camera inspection to diagnose and clean your system. No matter the clog or cause, we'll get your drains running clear again.",
    ],
    introHighlights: [
      "Hydro jetting & professional snaking",
      "Camera inspection to find the real cause",
      "Safe for older pipes — no harsh chemicals",
      "Same-day & 24/7 emergency service",
    ],
    introImage: "https://images.unsplash.com/photo-1654440122140-f1fc995ddb34?w=900&q=72&fm=webp",
  },
};

export function getServiceLanding(slug: string): ServiceLandingContent | undefined {
  return SERVICE_LANDINGS[slug];
}
