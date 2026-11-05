/**
 * google-reviews.ts
 *
 * Real customer reviews shown in the GoogleReviewsMarquee on the homepage,
 * the service-category pages and the Ads landing pages.
 *
 * THIS LIST IS EMPTY ON PURPOSE. It previously held eight invented reviews,
 * complete with made-up names, made-up relative dates ("2 weeks ago"), five
 * stars each, Google-coloured avatars and a "Straight from Google" label, none
 * of which came from Google or from a real customer. Presenting fabricated
 * testimonials as genuine reviews is a deceptive-advertising problem under the
 * FTC's rules on endorsements and testimonials, and doing it while borrowing
 * Google's branding compounds it. While the list is empty the marquee renders
 * an honest panel linking to the real Google Business Profile instead.
 *
 * TO POPULATE IT WITH REAL REVIEWS:
 *   1. Open the Google Business Profile reviews list.
 *   2. Copy reviews verbatim, with the reviewer name exactly as Google shows it
 *      (first name + last initial is how Google displays most of them).
 *   3. Use a real date for `date` ("March 2026" is fine; do not write a
 *      relative date that will silently go stale).
 *   4. Set `rating` to the stars that reviewer actually gave, including any
 *      review below five. A wall of nothing but 5s reads as fake to visitors
 *      even when it is genuine.
 *   5. Do not edit the wording beyond trimming length, and never invent a
 *      reviewer to round the list out.
 *
 * Related: GOOGLE_REVIEWS in data/area-content.ts gates the aggregate star
 * rating and review count in the same way, and for the same reasons.
 */

export type GoogleReviewCard = {
  /** Reviewer name exactly as it appears on the Google review. */
  name: string;
  /** Single-letter avatar, normally the first letter of `name`. */
  initial: string;
  /** Avatar background. Google's own palette is used for visual consistency. */
  color: string;
  /** An absolute date, e.g. "March 2026". Not a relative one. */
  date: string;
  /** The review text, verbatim. */
  text: string;
  /** Stars this reviewer actually gave, 1-5. */
  rating: number;
};

/** Google's avatar palette, for assigning `color` when adding real reviews. */
export const GOOGLE_AVATAR_COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"] as const;

export const GOOGLE_REVIEW_CARDS: GoogleReviewCard[] = [];
