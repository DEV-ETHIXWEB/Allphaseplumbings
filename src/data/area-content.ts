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

import seattleSkyline from "@/assets/seattle-skyline.jpg";
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
 * Builds a full AreaContent for any service-area city from its base info.
 * Copy is interpolated with the city name throughout so each page is
 * genuinely about that city. Seattle keeps its hand-written content (see
 * AREA_CONTENT); these generated pages are a solid baseline to enrich over
 * time with real neighborhoods, ZIPs, and reviews.
 *
 * NOTE: testimonials here are PLACEHOLDERS, swap for real reviews per city.
 */
export function buildGeneratedAreaContent(city: CityInfo): AreaContent {
  const name = city.name;
  return {
    slug: city.slug,
    name,
    lat: city.lat,
    lon: city.lon,
    heroH1: `${name} Plumber, Same-Day Service & 24/7 Emergency Repair`,
    heroPromise: `Licensed plumbers serving ${name} and the surrounding Puget Sound area, with fast same-day repairs, honest upfront pricing, and round-the-clock emergency service.`,
    metaTitle: `${name} Plumber | All Phase Plumbing | Same-Day Service`,
    metaDescription: `Licensed ${name} plumbers for repairs, drains, water heaters & 24/7 emergencies. Same-day service and upfront pricing. Call All Phase Plumbing today.`,
    intro: [
      `All Phase Plumbing has served ${name} homeowners since 1989 with reliable, licensed plumbing repairs and installations. From quick fixes like a dripping faucet to major work like repiping or sewer replacement, our team handles it all with professionalism and clear, upfront pricing.`,
      `Whether you're facing a sudden leak, a failing water heater, or a stubborn drain clog, our ${name} plumbers respond quickly and get the job done right. We're licensed, bonded, and insured, and every job is backed by our written workmanship guarantee.`,
    ],
    content: [
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
    why: [
      {
        title: "Local Knowledge",
        body: `Our plumbers work in ${name} regularly and know the area's homes and most common plumbing problems, so we diagnose faster and fix it for good.`,
        icon: "MapPin",
        stat: "Serving the area since 1989",
      },
      {
        title: "Fast Response",
        body: `With trucks staged across the region, a licensed plumber can usually reach ${name} the same day, and quickly for true emergencies.`,
        icon: "Clock",
        stat: "Same-day service available",
      },
      {
        title: "Guaranteed Work",
        body: `Every ${name} repair is backed by our written workmanship guarantee and handled by our own licensed, insured crew, never a subcontractor.`,
        icon: "ShieldCheck",
        stat: "100% workmanship guarantee",
      },
    ],
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
    faqs: [
      {
        q: `Do you offer same-day plumbing service in ${name}?`,
        a: `In most cases, yes. Book before 2pm Monday through Friday and we'll usually get a technician to you in ${name} the same day. Call (206) 772-6077 to confirm a slot.`,
      },
      {
        q: `Are you available for weekend and after-hours emergencies in ${name}?`,
        a: `Yes. We run 24/7 emergency plumbing service in ${name} every day of the year for burst pipes, sewer backups, and water heater failures, weekends and holidays included.`,
      },
      {
        q: `Are your ${name} plumbers licensed and insured?`,
        a: `Every plumber we dispatch is fully licensed in Washington State, bonded, and insured. We never subcontract, so your job is always done by our own crew.`,
      },
      {
        q: `Do you provide upfront pricing?`,
        a: `Yes. Every job in ${name} starts with a clear, flat-rate quote before any work begins, so there are no surprises when the invoice arrives.`,
      },
      {
        q: `What plumbing services do you offer in ${name}?`,
        a: `We handle the full range of residential plumbing in ${name}: repairs, drain cleaning, water heaters, leak detection, sewer line repair and replacement, repiping, and 24/7 emergency service.`,
      },
    ],
    responseTime: "Minutes Away",
  };
}

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
