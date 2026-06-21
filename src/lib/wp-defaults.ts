/**
 * wp-defaults.ts
 *
 * Hard-coded fallback values for every WP-driven field.
 * Used when WordPress is not configured or a field is missing.
 * Keep these in sync with the live site's actual content.
 */

import type { WPSiteOptions, ServiceCard } from "@/types/wordpress";

// ── Global site options fallback ──────────────────────────────────────────────

export const WP_DEFAULTS: Required<WPSiteOptions> = {
  // Contact
  phone: "(206) 772-6077",
  phone_href: "tel:+12067726077",
  email: "info@allphaseplumbing.com",
  address_line1: "14101 Interurban Ave S, Unit 78-A",
  address_city: "Tukwila",
  address_state: "WA",
  address_zip: "98168",

  // Hero
  hero_eyebrow: "Seattle's Trusted Plumber",
  hero_title: "Your Home's Plumbing,",
  hero_italic: "Done Right.",
  hero_subtitle: "Serving Tukwila & the Greater Seattle Area with expert care since 1989.",
  hero_stats: [
    { number: "35+", label: "Years Experience" },
    { number: "10k+", label: "Homes Served" },
    { number: "24/7", label: "Emergency Available" },
  ],

  // Why Us
  why_us_eyebrow: "Why Homeowners Across Greater Seattle Trust All Phase Plumbing",
  why_us_heading: "Six reasons your neighbors",
  why_us_italic: "keep calling.",
  why_us_reasons: [
    {
      icon: "Award",
      title: "Licensed Technicians",
      desc: "Every tech is licensed, bonded, and background-checked.",
    },
    {
      icon: "Clock",
      title: "24/7 Emergency Service",
      desc: "Burst pipe at midnight? We answer when you call.",
    },
    {
      icon: "DollarSign",
      title: "Upfront Honest Pricing",
      desc: "Flat-rate quotes before any work begins. No surprises.",
    },
    {
      icon: "ShieldCheck",
      title: "Guaranteed Workmanship",
      desc: "Every repair backed by our written guarantee.",
    },
    {
      icon: "Home",
      title: "Locally Owned",
      desc: "Family-owned in Tukwila, serving neighbors since 1989.",
    },
    {
      icon: "Layers",
      title: "All Under One Roof",
      desc: "Plumbing, drains, sewer, water heaters, one call does it.",
    },
  ],

  // Team section
  team_eyebrow: "Behind the Scenes",
  team_heading: "See the All Phase team",
  team_italic: "in action.",
  team_body:
    "We're a family-owned crew of real plumbers, licensed, background-checked, and proud to have served Seattle homes for more than three decades. When you call, you talk to a neighbour.",
  team_points: [
    "Real plumbers, not subcontractors",
    "Licensed, bonded, and background-checked",
    "Serving Seattle homes for 30+ years",
  ],

  // Service area
  service_area_cities: [
    "Seattle",
    "Tacoma",
    "Auburn",
    "Bellevue",
    "Kirkland",
    "Redmond",
    "Renton",
    "Kent",
    "Mercer Island",
    "Federal Way",
    "Des Moines",
    "Bonney Lake",
    "Puyallup",
    "South Hill",
    "Spanaway",
    "Summit",
    "Fife",
    "Lakewood",
    "Summit View",
    "Bothell",
  ],

  // CTA banner
  cta_heading: "Contact Us Today",
  cta_subheading: "Same Day Service",
  cta_body: "Plumbing and Drain Cleaning, When booked before 2pm, Mon–Fri",
  dispatch_message: "⚡ Dispatching certified local technicians near Tukwila WA...",

  // Social media
  social_facebook: "https://www.facebook.com/allphaseplumbing",
  social_instagram: "https://www.instagram.com/allphaseplumbing",
  social_tiktok: "https://www.tiktok.com/@allphaseplumbing",
};

// ── Default services (used when WP CPT returns nothing) ───────────────────────

export const DEFAULT_SERVICES: ServiceCard[] = [
  {
    number: "01",
    iconName: "Wrench",
    title: "Plumbing Repair",
    description: "Leaks, fixtures, pipes, water pressure, diagnosed and repaired by licensed pros.",
    href: "/services/plumbing",
  },
  {
    number: "02",
    iconName: "Droplets",
    title: "Drain Cleaning",
    description: "Clogs cleared fast with hydro-jetting and camera inspection for lasting results.",
    href: "/services/drain-cleaning",
  },
  {
    number: "03",
    iconName: "Flame",
    title: "Water Heaters",
    description: "Tank and tankless install, repair, and replacement, same-day in most cases.",
    href: "/services/water-heaters",
  },
  {
    number: "04",
    iconName: "Pipette",
    title: "Sewer Services",
    description: "Sewer line repair, replacement, and trenchless solutions across Greater Seattle.",
    href: "/services/sewer-services",
  },
];
