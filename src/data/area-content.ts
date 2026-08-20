/**
 * area-content.ts
 *
 * Content model + per-city data for the location/service-area landing pages
 * rendered by AreaPageTemplate (route: /areas/$city).
 *
 * ONE layout, many cities. Every city page uses the exact same component
 * structure, only the content below changes. Copy is intentionally written
 * city-by-city (neighborhoods, local home stock, testimonials) so no two
 * pages read like the same boilerplate, good for the visitor and for local SEO.
 *
 * To add a city: append an AreaContent object and register it in AREA_CONTENT.
 * The icon strings map to Lucide components via lib/icon-map (resolveIcon),
 * so no new image assets are required, keeping LCP light.
 */

import seattleSkyline from "@/assets/seattle-skyline.webp";
import { SERVICE_AREA_CITIES, getCityBySlug, type CityInfo } from "@/data/service-area-cities";

export type AreaService = {
  /** Display name shown on the card. */
  name: string;
  /** One-line, city-aware description. */
  description: string;
  /** Internal link to the matching service subpage. */
  href: string;
  /** Lucide icon name (see lib/icon-map). */
  icon: string;
};

export type AreaWhyCard = {
  title: string;
  body: string;
  icon: string;
  /** Short proof stat shown under the card (e.g. "10,000+ homes served"). */
  stat: string;
};

/**
 * Business-wide Google review summary. PLACEHOLDER VALUES, replace with the
 * real aggregate rating, review count, and Google Business Profile URL before
 * launch. Schema.org aggregateRating must reflect genuine review data.
 */
export const GOOGLE_REVIEWS = {
  rating: 4.9,
  count: 50,
  profileUrl: "https://www.google.com/maps/search/?api=1&query=All+Phase+Plumbing+Tukwila+WA",
};

export type AreaTestimonial = {
  quote: string;
  name: string;
  neighborhood: string;
  /** 1–5 whole stars. */
  rating: number;
};

export type AreaFAQ = { q: string; a: string };

/** A headed block of long-form, crawlable copy. */
export type AreaContentBlock = { heading: string; paragraphs: string[] };

export type AreaContent = {
  slug: string;
  name: string;
  /** City-center coordinates, used for LocalBusiness geo schema. */
  lat: number;
  lon: number;
  /** Background photo shown behind the hero (city skyline). */
  heroImage?: string;
  /** Hero H1 (intent-led). Falls back to "<City> Plumbing Services". */
  heroH1: string;
  /** One-line service promise shown under the H1. */
  heroPromise: string;
  /** Short lede paragraphs shown directly under the hero. */
  intro: string[];
  /** Long-form, headed content blocks for SEO depth. */
  content: AreaContentBlock[];
  /** SEO <title>. */
  metaTitle: string;
  /** SEO meta description (<160 chars). */
  metaDescription: string;
  /** Exactly six service cards. */
  services: AreaService[];
  /** Three "why choose us" cards. */
  why: AreaWhyCard[];
  /** Neighborhoods served, for internal linking + local SEO. */
  neighborhoods: string[];
  /** ZIP codes served. */
  zips: string[];
  /** Two to three city-filtered reviews. */
  testimonials: AreaTestimonial[];
  /** Four to five local FAQs (also emitted as FAQPage JSON-LD). */
  faqs: AreaFAQ[];
  /** Drive-time promise used in the emergency banner. */
  responseTime: string;
};

// ── Seattle ───────────────────────────────────────────────────────────────────

const SEATTLE: AreaContent = {
  slug: "seattle",
  name: "Seattle",
  lat: 47.6062,
  lon: -122.3321,
  heroImage: seattleSkyline,
  heroH1: "Seattle's Emergency Plumber, Same-Day Service & 30-Min Response",
  heroPromise:
    "Licensed plumbing repair across every Seattle neighborhood, from Ballard to West Seattle, often the same day you call.",
  metaTitle: "Seattle Plumber | All Phase Plumbing | Same-Day Service",
  metaDescription:
    "Licensed Seattle plumbers for repairs, drains, water heaters & 24/7 emergencies. Same-day service across every neighborhood. Call All Phase Plumbing.",
  intro: [
    "All Phase Plumbing has kept water flowing in Seattle homes since 1989. From the early-1900s Craftsman bungalows of Wallingford and Ballard to the hillside houses of Queen Anne and the newer builds along the waterfront, our licensed plumbers have worked on just about every kind of plumbing system this city has. That hands-on local experience means we usually know what's wrong before we even open the wall, and we fix it in a way that lasts.",
    "Seattle's wet climate, mature trees, and aging infrastructure put real stress on residential plumbing. Tree roots invade clay sewer laterals, decades-old galvanized supply lines corrode and lose pressure, and heavy winter rain overwhelms basements without a working sump pump. We handle all of it, and we back every repair with upfront, flat-rate pricing and a written workmanship guarantee, so there are no surprises when the invoice arrives.",
  ],
  content: [
    {
      heading: "Plumbing Built for Seattle's Older Homes",
      paragraphs: [
        "A huge share of Seattle's housing stock was built before 1950, and original galvanized steel or polybutylene piping is still hiding behind plenty of walls. Over time those materials corrode from the inside out, which shows up as rusty water, weak pressure in the upstairs shower, or pinhole leaks that quietly rot framing. Our team specializes in whole-home repiping with modern PEX and copper, sequenced to keep your water on and your daily routine intact while the work is done.",
        "We also see a lot of dated fixtures and DIY repairs that were never quite to code. When we replace a faucet, toilet, water heater, or shut-off valve, we bring everything up to current Washington plumbing standards and pull permits where the city requires them. That protects your home's value and saves you headaches if you ever sell.",
      ],
    },
    {
      heading: "Drain, Sewer & Stormwater Care for a Rainy City",
      paragraphs: [
        "Few places test a drainage system like Seattle. Constant rain, steep lots, and old side sewers built from clay or Orangeburg pipe are a recipe for backups, especially in neighborhoods like Beacon Hill, Columbia City, and West Seattle where mature trees send roots straight into the joints. We clear blockages fast with hydro-jetting and mechanical snaking, then drop a camera down the line so you can see exactly what caused the problem instead of guessing.",
        "When a sewer line is cracked, bellied, or collapsed, we offer trenchless repair and replacement that restores the line without tearing up your yard, driveway, or established landscaping. We also install and service sump pumps and backwater valves to keep stormwater out of finished basements through the worst of the winter season.",
      ],
    },
    {
      heading: "24/7 Emergency Plumbers, Anywhere in Seattle",
      paragraphs: [
        "Plumbing emergencies don't wait for business hours. A burst pipe during a January freeze, a water heater that floods the garage, or a sewer backup on a holiday weekend can cause thousands of dollars of damage in minutes. Our emergency line is answered around the clock, every day of the year, and with trucks staged across King County we can usually have a licensed Seattle plumber at your door within the hour to stop the damage and get things working again.",
        "Because we never subcontract, the plumber who shows up at 2 a.m. is a fully licensed, bonded, and insured member of our own crew, the same standard you get during a routine daytime appointment.",
      ],
    },
  ],
  services: [
    {
      name: "Plumbing Repair",
      description:
        "Leaks, faucets, toilets, and worn supply lines fixed right the first time in homes across Seattle.",
      href: "/services/plumbing",
      icon: "Wrench",
    },
    {
      name: "Drain Cleaning",
      description:
        "Slow kitchen sinks and blocked mains cleared fast with hydro-jetting and camera inspection.",
      href: "/services/drain-cleaning",
      icon: "Droplets",
    },
    {
      name: "Water Heaters",
      description:
        "Tank and tankless repair, install, and replacement, with hot water usually restored the same day.",
      href: "/services/water-heaters",
      icon: "Flame",
    },
    {
      name: "Leak Detection",
      description:
        "Hidden slab and behind-wall leaks pinpointed with electronic detection before damage spreads.",
      href: "/services/plumbing/leak-detection",
      icon: "Search",
    },
    {
      name: "Sewer Services",
      description:
        "Trenchless sewer line repair and replacement that spares your Seattle yard, driveway, and mature trees.",
      href: "/services/sewer-services",
      icon: "Pipette",
    },
    {
      name: "Emergency Plumbing",
      description:
        "Burst pipes and sewer backups handled 24/7, with a Seattle technician on the way fast.",
      href: "/services/emergency-plumber",
      icon: "ShieldAlert",
    },
  ],
  why: [
    {
      title: "Local Knowledge",
      body: "We know Seattle's older Craftsman plumbing, steep lot grades, and aging clay sewer lines, so we diagnose faster and fix it for good.",
      icon: "MapPin",
      stat: "10,000+ Seattle homes served",
    },
    {
      title: "Fast Response",
      body: "Trucks staged across King County mean a licensed Seattle plumber is usually at your door the same day, and within the hour for true emergencies.",
      icon: "Clock",
      stat: "30-min average response time",
    },
    {
      title: "Guaranteed Work",
      body: "Every repair is backed by our written workmanship guarantee and handled by our own licensed, insured crew, never a subcontractor.",
      icon: "ShieldCheck",
      stat: "100% workmanship guarantee",
    },
  ],
  neighborhoods: [
    "Ballard",
    "Capitol Hill",
    "Queen Anne",
    "Fremont",
    "West Seattle",
    "Wallingford",
    "Greenwood",
    "University District",
    "Beacon Hill",
    "Columbia City",
    "Magnolia",
    "Green Lake",
  ],
  zips: [
    "98103",
    "98105",
    "98107",
    "98109",
    "98115",
    "98116",
    "98117",
    "98118",
    "98122",
    "98125",
    "98133",
    "98144",
    "98199",
  ],
  testimonials: [
    {
      quote:
        "Our water heater died on a Sunday and All Phase had a new one installed before dinner. Honest pricing, no upsell.",
      name: "Marcus T.",
      neighborhood: "Ballard",
      rating: 5,
    },
    {
      quote:
        "They found a slab leak under our kitchen that two other plumbers had missed. Clean, professional, and on time.",
      name: "Priya S.",
      neighborhood: "Queen Anne",
      rating: 5,
    },
    {
      quote:
        "Main line backed up into the basement and they were out within the hour. Absolute lifesavers.",
      name: "Dawn R.",
      neighborhood: "West Seattle",
      rating: 5,
    },
  ],
  faqs: [
    {
      q: "Do you serve all Seattle neighborhoods?",
      a: "Yes. From Ballard and Fremont to West Seattle, Beacon Hill, and the U-District, our licensed plumbers cover every Seattle ZIP code, plus the surrounding King County suburbs.",
    },
    {
      q: "Do you offer same-day plumbing service in Seattle?",
      a: "In most cases, yes. Book before 2pm Monday through Friday and we'll usually get a Seattle technician to you the same day. Call (206) 772-6077 to confirm a slot.",
    },
    {
      q: "Are you available for weekend and after-hours emergencies?",
      a: "We run 24/7 emergency service across Seattle every day of the year for burst pipes, sewer backups, and water heater failures, weekends and holidays included.",
    },
    {
      q: "Can you work on Seattle's older homes and clay sewer pipes?",
      a: "Absolutely. Much of our work is in Seattle's classic Craftsman and early-1900s homes. We handle galvanized pipe repiping and trenchless clay sewer line replacement regularly.",
    },
    {
      q: "Are your Seattle plumbers licensed and insured?",
      a: "Every plumber we dispatch is fully licensed in Washington State, bonded, and insured. We never subcontract, so your job is always done by our own crew.",
    },
  ],
  responseTime: "30 Minutes Away",
};

// ── Registry ────────────────────────────────────────────────────────────────

/**
 * Cities live here as their full content is written. Only Seattle is built out
 * for now (review demo); the remaining service-area cities get their own
 * entries once the layout is approved.
 */
export const AREA_CONTENT: Record<string, AreaContent> = {
  seattle: SEATTLE,
};

/** Names of the N nearest other service-area cities (for internal linking). */
function nearestCityNames(city: CityInfo, n: number): string[] {
  return SERVICE_AREA_CITIES.filter((c) => c.slug !== city.slug)
    .map((c) => ({ name: c.name, d: (c.lat - city.lat) ** 2 + (c.lon - city.lon) ** 2 }))
    .sort((a, b) => a.d - b.d)
    .slice(0, n)
    .map((c) => c.name);
}

/**
 * Deterministic string hash (djb2), used only to pick a stable copy variant
 * per city, e.g. "bellevue" always gets variant 2, "renton" always gets
 * variant 0. Stable across builds/renders since it's a pure function of the
 * slug, no randomness, no client/server mismatch.
 */
function variantIndex(slug: string, variantCount: number): number {
  let hash = 5381;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 33) ^ slug.charCodeAt(i);
  }
  return Math.abs(hash) % variantCount;
}

/**
 * Builds a full AreaContent for any service-area city from its base info.
 * Copy is interpolated with the city name throughout so each page is
 * genuinely about that city. Seattle keeps its hand-written content (see
 * AREA_CONTENT); these generated pages draw from several real phrasing
 * variants per section (picked deterministically per city, see
 * variantIndex) so the ~20 generated pages don't read as one template with
 * the city name swapped in, which is what search engines flag as thin or
 * duplicate content.
 *
 * NOTE: testimonials here are PLACEHOLDERS, swap for real reviews per city.
 */
export function buildGeneratedAreaContent(city: CityInfo): AreaContent {
  const name = city.name;
  const v3 = variantIndex(city.slug, 3);
  const v4 = variantIndex(`${city.slug}-b`, 4);

  const heroH1 = [
    `${name} Plumber, Same-Day Service & 24/7 Emergency Repair`,
    `Licensed ${name} Plumbing Repair, Same-Day & Around the Clock`,
    `${name}'s Plumber for Fast Repairs & 24/7 Emergencies`,
  ][v3];

  const heroPromise = [
    `Licensed plumbers serving ${name} and the surrounding Puget Sound area, with fast same-day repairs, honest upfront pricing, and round-the-clock emergency service.`,
    `Serving ${name} homeowners with fast, upfront-priced plumbing repairs, backed by round-the-clock emergency coverage across the Puget Sound area.`,
    `From same-day repairs to middle-of-the-night emergencies, our licensed plumbers keep ${name} homes running with honest, upfront pricing.`,
  ][v3];

  const metaTitle = [
    `${name} Plumber | All Phase Plumbing | Same-Day Service`,
    `Plumber in ${name}, WA | All Phase Plumbing`,
    `${name} Plumbing Repair & 24/7 Emergency Service`,
  ][v3];

  const metaDescription = [
    `Licensed ${name} plumbers for repairs, drains, water heaters & 24/7 emergencies. Same-day service and upfront pricing. Call All Phase Plumbing today.`,
    `Need a plumber in ${name}? All Phase Plumbing offers same-day repairs, drain cleaning, water heater service, and 24/7 emergency calls. Licensed & insured.`,
    `All Phase Plumbing serves ${name} with upfront-priced repairs, drain & sewer service, and round-the-clock emergency response. Licensed, bonded, insured.`,
  ][v3];

  const introVariants: [string, string][] = [
    [
      `All Phase Plumbing has served ${name} homeowners since 1989 with reliable, licensed plumbing repairs and installations. From quick fixes like a dripping faucet to major work like repiping or sewer replacement, our team handles it all with professionalism and clear, upfront pricing.`,
      `Whether you're facing a sudden leak, a failing water heater, or a stubborn drain clog, our ${name} plumbers respond quickly and get the job done right. We're licensed, bonded, and insured, and every job is backed by our written workmanship guarantee.`,
    ],
    [
      `Since 1989, All Phase Plumbing has kept water flowing in homes across ${name} and the wider Puget Sound area. Our licensed plumbers handle everything from a single leaking faucet to a full repipe, always with clear pricing quoted before any work begins.`,
      `A failing water heater, a backed-up drain, or a pipe that's suddenly leaking, whatever brings you to us, our ${name} team shows up prepared to fix it right the first time. Every technician we send is our own employee: licensed, bonded, and insured.`,
    ],
    [
      `${name} homeowners have trusted All Phase Plumbing since 1989 for straightforward, licensed plumbing work at a fair, upfront price. We handle the small jobs and the big ones, from a worn-out shut-off valve to a complete sewer line replacement.`,
      `We know a plumbing problem rarely waits for a convenient time. That's why our ${name} plumbers move fast on leaks, clogs, and water heater failures, and back every repair with a written workmanship guarantee.`,
    ],
  ];
  const intro = introVariants[v3];

  const contentVariants: AreaContentBlock[][] = [
    [
      {
        heading: `Full-Service Plumbing for ${name} Homes`,
        paragraphs: [
          `Our licensed plumbers handle the full range of residential plumbing in ${name}: faucet and fixture replacement, toilet repairs, water line work, water heater service, and complete repipes. Whatever the age or style of your home, we bring the right parts and bring everything up to current Washington code.`,
          `Every visit starts with a clear, flat-rate quote, so you know the price before we begin. No surprise add-ons, no pressure, just honest work from a team that treats your ${name} home like its own.`,
        ],
      },
      {
        heading: `Drain & Sewer Specialists in ${name}`,
        paragraphs: [
          `Slow drains and sewer backups are some of the most common calls we get in ${name}. We clear blockages fast with hydro-jetting and mechanical snaking, then run a camera down the line so you can see the real cause instead of guessing.`,
          `When a sewer line is cracked, root-invaded, or collapsed, we offer trenchless repair and replacement that restores the line without tearing up your ${name} yard, driveway, or landscaping.`,
        ],
      },
      {
        heading: `24/7 Emergency Plumbing in ${name}`,
        paragraphs: [
          `Plumbing emergencies don't keep business hours. A burst pipe, an overflowing toilet, or a water heater failure can cause serious damage fast. Our emergency line is answered around the clock, and we can usually have a licensed plumber to your ${name} home quickly to stop the damage and make the repair.`,
          `Because we never subcontract, the plumber who arrives is a fully licensed, bonded, and insured member of our own crew, the same standard you get on any scheduled visit.`,
        ],
      },
    ],
    [
      {
        heading: `Residential Plumbing Repairs in ${name}`,
        paragraphs: [
          `From a running toilet to a full water heater swap, our ${name} plumbers cover the everyday repairs that keep a household running: fixtures, faucets, supply lines, and water heaters, tank or tankless. Older or newer, every home gets work brought up to current Washington plumbing code.`,
          `We quote a flat rate before any tools come out, so the number you agree to is the number on the invoice. That's how we've kept ${name} customers coming back for repeat work.`,
        ],
      },
      {
        heading: `Clogged Drains & Sewer Line Repair in ${name}`,
        paragraphs: [
          `A slow drain or a backed-up sewer line is usually more than a one-time nuisance, and it's one of the most common reasons ${name} homeowners call us. We run hydro-jetting and mechanical snaking to clear the blockage, then a camera inspection to confirm exactly what caused it.`,
          `For a damaged sewer line, cracked, bellied, or full of roots, trenchless repair lets us fix the pipe without digging up your ${name} yard or driveway.`,
        ],
      },
      {
        heading: `Around-the-Clock Emergency Response in ${name}`,
        paragraphs: [
          `Burst pipes, overflowing toilets, and dead water heaters don't check the clock before they happen. Our emergency line stays staffed 24/7, and we aim to get a licensed plumber to your ${name} address quickly enough to keep a bad situation from getting worse.`,
          `Every technician on our emergency crew is a full-time, licensed, bonded, and insured employee, never a subcontracted stranger, whether it's 2pm or 2am.`,
        ],
      },
    ],
    [
      {
        heading: `Everyday Plumbing Repairs, Done Right in ${name}`,
        paragraphs: [
          `Leaky faucets, running toilets, worn supply lines, and failing water heaters are the calls we get most often from ${name} homeowners, and they're the calls we're fastest at resolving. We stock the parts our trucks need for same-visit fixes wherever possible.`,
          `Bigger jobs, like a full repipe or fixture upgrade, get the same upfront, flat-rate quote as a small repair. You'll know the price for your ${name} home before we start.`,
        ],
      },
      {
        heading: `${name} Drain Cleaning & Sewer Line Service`,
        paragraphs: [
          `Blocked drains and sewer backups top the list of urgent calls we take from ${name}. Hydro-jetting and mechanical snaking clear the line fast, and a follow-up camera inspection shows you exactly what caused the clog instead of leaving you guessing.`,
          `Cracked, root-invaded, or collapsed sewer lines get trenchless repair or replacement, which restores the pipe without tearing apart your ${name} landscaping.`,
        ],
      },
      {
        heading: `24-Hour Emergency Plumbers Serving ${name}`,
        paragraphs: [
          `A burst pipe or a flooding water heater doesn't wait for morning, so neither do we. Our emergency line runs 24/7, every day of the year, with a goal of getting a licensed plumber to your ${name} home fast enough to limit the damage.`,
          `The plumber who shows up, day or night, is always our own licensed, bonded, and insured employee, not a subcontractor.`,
        ],
      },
    ],
  ];
  const content = contentVariants[v4 % contentVariants.length];

  return {
    slug: city.slug,
    name,
    lat: city.lat,
    lon: city.lon,
    heroH1,
    heroPromise,
    metaTitle,
    metaDescription,
    intro,
    content,
    services: [
      {
        name: "Plumbing Repair",
        description: `Leaks, faucets, toilets, and worn supply lines repaired right the first time in ${name} homes.`,
        href: "/services/plumbing",
        icon: "Wrench",
      },
      {
        name: "Drain Cleaning",
        description: `Slow and blocked drains in ${name} cleared fast with hydro-jetting and camera inspection.`,
        href: "/services/drain-cleaning",
        icon: "Droplets",
      },
      {
        name: "Water Heaters",
        description: `Water heater repair, installation, and replacement for ${name} homes, often the same day.`,
        href: "/services/water-heaters",
        icon: "Flame",
      },
      {
        name: "Leak Detection",
        description: `Hidden slab and behind-wall leaks in ${name} pinpointed with electronic detection before damage spreads.`,
        href: "/services/plumbing/leak-detection",
        icon: "Search",
      },
      {
        name: "Sewer Services",
        description: `Trenchless sewer line repair and replacement that protects your ${name} yard and driveway.`,
        href: "/services/sewer-services",
        icon: "Pipette",
      },
      {
        name: "Emergency Plumbing",
        description: `Burst pipes and sewer backups in ${name} handled 24/7, with a technician on the way fast.`,
        href: "/services/emergency-plumber",
        icon: "ShieldAlert",
      },
    ],
    why: whyVariants[v3].map((w) => ({
      ...w,
      body: w.body(name),
    })),
    neighborhoods: nearestCityNames(city, 8),
    zips: [],
    testimonials: [
      {
        quote: `Fast, professional, and fairly priced. The plumber explained everything and fixed our issue the same day.`,
        name: "James R.",
        neighborhood: name,
        rating: 5,
      },
      {
        quote: `Showed up on time, kept everything clean, and the price matched the quote exactly. Highly recommend.`,
        name: "Sarah M.",
        neighborhood: name,
        rating: 5,
      },
      {
        quote: `Had an after-hours emergency and they were out quickly to stop the leak. Real lifesavers.`,
        name: "David C.",
        neighborhood: name,
        rating: 5,
      },
    ],
    faqs: faqVariants[v4 % faqVariants.length].map((f) => ({
      q: f.q(name),
      a: f.a(name),
    })),
    responseTime: "Minutes Away",
  };
}

/* "Why choose us" card copy, three variants selected per-city via v3. body
   is a function of the city name so it can be interpolated after picking. */
const whyVariants: {
  title: string;
  body: (name: string) => string;
  icon: string;
  stat: string;
}[][] = [
  [
    {
      title: "Local Knowledge",
      body: (name) =>
        `Our plumbers work in ${name} regularly and know the area's homes and most common plumbing problems, so we diagnose faster and fix it for good.`,
      icon: "MapPin",
      stat: "Serving the area since 1989",
    },
    {
      title: "Fast Response",
      body: (name) =>
        `With trucks staged across the region, a licensed plumber can usually reach ${name} the same day, and quickly for true emergencies.`,
      icon: "Clock",
      stat: "Same-day service available",
    },
    {
      title: "Guaranteed Work",
      body: (name) =>
        `Every ${name} repair is backed by our written workmanship guarantee and handled by our own licensed, insured crew, never a subcontractor.`,
      icon: "ShieldCheck",
      stat: "100% workmanship guarantee",
    },
  ],
  [
    {
      title: "Upfront Pricing",
      body: (name) =>
        `Every ${name} job starts with a flat-rate quote before we touch a wrench, so there's no guessing what the invoice will say.`,
      icon: "ShieldCheck",
      stat: "Flat-rate quotes, every job",
    },
    {
      title: "Our Own Crew",
      body: (name) =>
        `We never subcontract. The plumber dispatched to your ${name} home is a licensed, bonded, and insured member of our own team.`,
      icon: "MapPin",
      stat: "No subcontractors, ever",
    },
    {
      title: "Always On Call",
      body: (name) =>
        `Burst pipes and failed water heaters don't wait for business hours, so neither do we, with 24/7 emergency coverage across ${name}.`,
      icon: "Clock",
      stat: "24/7 emergency line",
    },
  ],
  [
    {
      title: "35+ Years Serving the Area",
      body: (name) =>
        `All Phase Plumbing has worked in and around ${name} since 1989, long enough to know the plumbing quirks common to homes in the area.`,
      icon: "Clock",
      stat: "Family-owned since 1989",
    },
    {
      title: "Licensed & Insured",
      body: (name) =>
        `Every technician we send to a ${name} home is fully licensed in Washington State, bonded, and insured, with no exceptions.`,
      icon: "ShieldCheck",
      stat: "Fully licensed WA contractor",
    },
    {
      title: "Written Guarantee",
      body: (name) =>
        `We stand behind every repair in ${name} with a written workmanship guarantee, not just a verbal promise.`,
      icon: "MapPin",
      stat: "Workmanship guaranteed in writing",
    },
  ],
];

/* FAQ copy, several variants selected per-city via v4. Keeps the literal
   "(206) 772-6077" string in one answer intentionally: $city.tsx's
   sanitizeArea() scrubs that exact pattern to the current CallRail number
   before render, so every variant below must keep it verbatim. */
const faqVariants: {
  q: (name: string) => string;
  a: (name: string) => string;
}[][] = [
  [
    {
      q: (name) => `Do you offer same-day plumbing service in ${name}?`,
      a: (name) =>
        `In most cases, yes. Book before 2pm Monday through Friday and we'll usually get a technician to you in ${name} the same day. Call (206) 772-6077 to confirm a slot.`,
    },
    {
      q: (name) => `Are you available for weekend and after-hours emergencies in ${name}?`,
      a: (name) =>
        `Yes. We run 24/7 emergency plumbing service in ${name} every day of the year for burst pipes, sewer backups, and water heater failures, weekends and holidays included.`,
    },
    {
      q: (name) => `Are your ${name} plumbers licensed and insured?`,
      a: () =>
        `Every plumber we dispatch is fully licensed in Washington State, bonded, and insured. We never subcontract, so your job is always done by our own crew.`,
    },
    {
      q: () => `Do you provide upfront pricing?`,
      a: (name) =>
        `Yes. Every job in ${name} starts with a clear, flat-rate quote before any work begins, so there are no surprises when the invoice arrives.`,
    },
    {
      q: (name) => `What plumbing services do you offer in ${name}?`,
      a: (name) =>
        `We handle the full range of residential plumbing in ${name}: repairs, drain cleaning, water heaters, leak detection, sewer line repair and replacement, repiping, and 24/7 emergency service.`,
    },
  ],
  [
    {
      q: (name) => `How fast can a plumber get to my ${name} home?`,
      a: (name) =>
        `Book before 2pm on a weekday and we can usually get a technician out to ${name} the same day. For true emergencies we move faster than that. Call (206) 772-6077 to check current availability.`,
    },
    {
      q: (name) => `Do you handle emergency calls in ${name} after hours?`,
      a: (name) =>
        `Yes, our emergency line is staffed 24/7, including weekends and holidays, for burst pipes, sewer backups, and water heater failures anywhere in ${name}.`,
    },
    {
      q: () => `Is your team actually licensed, or do you subcontract?`,
      a: (name) =>
        `Every technician we send is a full-time employee, licensed in Washington State, bonded, and insured. We don't use subcontractors on any ${name} job.`,
    },
    {
      q: (name) => `Will I know the price before work starts in ${name}?`,
      a: () =>
        `Always. We quote a flat rate up front, before any work begins, so the price you agree to is the price on the invoice.`,
    },
    {
      q: (name) => `What kinds of plumbing jobs do you take on in ${name}?`,
      a: (name) =>
        `Everything from a single leaking faucet to a full home repipe: drain cleaning, water heaters, leak detection, sewer line work, and 24/7 emergency repairs in ${name}.`,
    },
  ],
  [
    {
      q: (name) => `Can I get same-day plumbing service in ${name}?`,
      a: (name) =>
        `Usually, yes. Weekday bookings made before 2pm typically get a technician out to your ${name} address that same day. Call (206) 772-6077 to confirm a slot.`,
    },
    {
      q: (name) => `Do you cover nights, weekends, and holidays in ${name}?`,
      a: (name) =>
        `We do. Our 24/7 emergency line covers ${name} every day of the year for burst pipes, sewer backups, and water heater failures, no exceptions for holidays.`,
    },
    {
      q: (name) => `Are the plumbers you send to ${name} your own employees?`,
      a: () =>
        `Yes, always. Every plumber we dispatch is fully licensed, bonded, and insured, and works for us directly. We never bring in subcontractors.`,
    },
    {
      q: () => `Do you charge by the hour or give a flat quote?`,
      a: (name) =>
        `Flat rate, quoted before we start work on your ${name} job, so there's no surprise when the invoice arrives.`,
    },
    {
      q: (name) => `What's included in your ${name} plumbing services?`,
      a: (name) =>
        `Residential repairs, drain cleaning, water heater install and repair, leak detection, sewer line repair and replacement, repiping, and round-the-clock emergency service in ${name}.`,
    },
  ],
];

export function getAreaContent(slug: string): AreaContent | undefined {
  // Hand-written content (e.g. Seattle) wins; otherwise generate from the
  // service-area city list. Unknown slugs return undefined (404).
  if (AREA_CONTENT[slug]) return AREA_CONTENT[slug];
  const city = getCityBySlug(slug);
  return city ? buildGeneratedAreaContent(city) : undefined;
}

/** Converts a place name to a URL slug, e.g. "University District" -> "university-district". */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
