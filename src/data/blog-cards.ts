/**
 * blog-cards.ts
 *
 * Lightweight card data for the static blog articles: no article bodies, so
 * the homepage and service pages can link to posts without pulling every
 * article's JSX into their bundles. Full content lives in articles.tsx; keep
 * slugs and titles in sync with it.
 */

export type BlogCard = {
  slug: string;
  title: string;
  excerpt: string;
  /** Display date, e.g. "October 27, 2026". */
  date: string;
  comments: string;
  img: string;
  imgAlt: string;
  /** Text-free crop for overlay cards and small thumbnails, when `img` has baked-in text. */
  thumb?: string;
  /** Service-page paths that link to this post as a helpful guide. */
  services?: string[];
};

export const BLOG_CARDS: BlogCard[] = [
  {
    slug: "winterize-plumbing-seattle",
    title: "Winterize Plumbing in Seattle: Why a Short Cold Snap Bursts Pipes",
    excerpt:
      "The forecast says two cold nights, maybe three. It doesn't sound like much to worry about. Then the temperature drops into the twenties…",
    date: "October 27, 2026",
    comments: "No Comments",
    img: "/images/blog/winterize-plumbing-seattle/short-cold-snap-burst-pipes-hero.webp",
    thumb: "/images/blog/winterize-plumbing-seattle/short-cold-snap-burst-pipes-thumb.webp",
    imgAlt: "Illustration of a frozen pipe cracking above the Seattle skyline",
    services: [
      "/services/plumbing/burst-pipe-repair",
      "/services/plumbing/pipe-repair",
      "/services/plumbing/pipe-replacement",
      "/services/plumbing/outdoor-faucet-repair",
      "/services/plumbing/emergency-plumber",
      "/services/burst-pipe-repair",
      "/services/emergency-plumber",
    ],
  },
  {
    slug: "puget-sound-winter-plumbing-survival-guide",
    title:
      "The 2026 Puget Sound Winter Plumbing Survival Guide: Performance, Prevention, and Technology",
    excerpt:
      "January in the Pacific Northwest is often deceptive. While our neighbors in the Midwest are…",
    date: "January 6, 2026",
    comments: "No Comments",
    img: "https://images.unsplash.com/photo-1704915171712-41bd8b5652a0?w=800&q=80",
    imgAlt: "Close-up of an icy stream of water",
    services: [
      "/services/plumbing/burst-pipe-repair",
      "/services/plumbing/outdoor-faucet-repair",
      "/services/plumbing/hot-water-system-repair",
      "/services/plumbing/repiping",
      "/services/burst-pipe-repair",
    ],
  },
  {
    slug: "handyman-vs-professional-plumber-seattle",
    title: "The Difference Between a Handyman and a Professional Plumber in Seattle",
    excerpt:
      "As a homeowner in Seattle, you've probably faced a leaky faucet, a running toilet, or…",
    date: "November 10, 2025",
    comments: "No Comments",
    img: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&q=80",
    imgAlt: "Professional plumber working under a kitchen sink",
    services: [
      "/services/plumbing/fixture-replacement",
      "/services/plumbing/faucet-installation",
      "/services/plumbing/toilet-installation",
      "/services/plumbing/gas-line-repair",
      "/services/fixture-replacement",
      "/services/toilet-installation",
      "/services/gas-line-repair",
    ],
  },
  {
    slug: "tankless-water-heaters-seattle-worth-upgrade",
    title: "Tankless Water Heaters in Seattle: Is It Worth the Upgrade?",
    excerpt: "As a homeowner in Seattle, you're always looking for ways to make your home more…",
    date: "November 10, 2025",
    comments: "No Comments",
    img: "https://images.unsplash.com/photo-1575299737366-39c143459bc5?w=800&q=80",
    imgAlt: "Tankless water heater mounted on wall above sink",
    services: [
      "/services/plumbing/tankless-water-heaters",
      "/services/plumbing/hot-water-system-repair",
    ],
  },
  {
    slug: "preventing-tree-root-damage-sewer-lines",
    title: "Preventing Tree Root Damage in Seattle Sewer Lines",
    excerpt:
      "If you live in the Seattle Metro Area, you're surrounded by beautiful, mature trees. From…",
    date: "November 10, 2025",
    comments: "1 Comment",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    imgAlt: "Tangled tree roots spreading across the ground",
    services: [
      "/services/plumbing/sewer-line-repair",
      "/services/plumbing/clogged-drain-repair",
      "/services/sewer-services/sewer-repair",
      "/services/sewer-services/sewer-replacement",
    ],
  },
  {
    slug: "backflow-testing-seattle-annual-guide",
    title: "Annual Backflow Testing in Seattle: 2026 Homeowner's Guide",
    excerpt:
      "If a postcard from your water district just reminded you that your annual backflow test is due, you're not alone. Every July…",
    date: "July 18, 2026",
    comments: "No Comments",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    imgAlt: "Lawn irrigation sprinkler running on a green Seattle lawn",
    services: [
      "/services/plumbing/backflow-testing",
      "/services/plumbing/water-lines",
      "/services/water-lines",
      "/services/plumbing/outdoor-faucet-repair",
    ],
  },
];

/** Newest first. */
export function latestBlogCards(count: number): BlogCard[] {
  return [...BLOG_CARDS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

/** Guides to show on a given service page. */
export function blogCardsForService(path: string): BlogCard[] {
  return BLOG_CARDS.filter((c) => c.services?.includes(path));
}
