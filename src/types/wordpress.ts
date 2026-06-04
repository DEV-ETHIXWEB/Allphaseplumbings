// ── Primitives ────────────────────────────────────────────────────────────────

export interface WPRenderedField {
  rendered: string;
}

export interface WPMedia {
  source_url: string;
  alt_text?: string;
}

export interface WPCategory {
  name: string;
  slug: string;
}

// ── Blog Posts ────────────────────────────────────────────────────────────────

export interface WPPost {
  id: number;
  slug: string;
  date: string;
  link: string;
  title: WPRenderedField;
  excerpt: WPRenderedField;
  content: WPRenderedField;
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: WPCategory[][];
  };
}

// ── Services CPT (allphase_service) ──────────────────────────────────────────

export interface WPService {
  id: number;
  slug: string;
  menu_order: number;
  title: WPRenderedField;
  excerpt: WPRenderedField;
  content: WPRenderedField;
  meta: {
    service_number?: string; // "01", "02", "03" …
    service_icon?: string; // lucide icon name e.g. "Wrench"
    service_page_slug?: string; // "/services/plumbing"
  };
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
  };
}

// ── Normalised service card (what each section component actually renders) ────

export interface ServiceCard {
  number: string;
  iconName: string;
  title: string;
  description: string;
  href: string;
}

// ── Team Members CPT (allphase_team) ─────────────────────────────────────────

export interface WPTeamMember {
  id: number;
  slug: string;
  title: WPRenderedField; // member name
  content: WPRenderedField; // bio
  meta: {
    team_role?: string; // "Master Plumber"
    team_years?: string; // "Since 1989"
  };
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
  };
}

// ── Sub-shapes used inside WPSiteOptions ──────────────────────────────────────

export interface WPHeroStat {
  number: string; // "35+"
  label: string; // "Years Experience"
}

export interface WPWhyUsReason {
  icon: string; // lucide icon name
  title: string;
  desc: string;
}

// ── Global site options (/wp-json/allphase/v1/options) ───────────────────────
// All fields are optional so a partial WP response can be merged over defaults.

export interface WPSiteOptions {
  // Contact
  phone?: string; // "(206) 772-6077"
  phone_href?: string; // "tel:+12067726077"
  email?: string;
  address_line1?: string;
  address_city?: string;
  address_state?: string;
  address_zip?: string;

  // Hero
  hero_eyebrow?: string;
  hero_title?: string;
  hero_italic?: string;
  hero_subtitle?: string;
  hero_stats?: WPHeroStat[];

  // Why Us
  why_us_eyebrow?: string;
  why_us_heading?: string;
  why_us_italic?: string;
  why_us_reasons?: WPWhyUsReason[];

  // Team section text
  team_eyebrow?: string;
  team_heading?: string;
  team_italic?: string;
  team_body?: string;
  team_points?: string[];

  // Service area
  service_area_cities?: string[];

  // CTA banner
  cta_heading?: string;
  cta_subheading?: string;
  cta_body?: string;
  dispatch_message?: string; // "Dispatching certified local technicians …"

  // Social media
  social_facebook?: string; // full URL e.g. "https://facebook.com/allphaseplumbing"
  social_instagram?: string;
  social_tiktok?: string;
}
