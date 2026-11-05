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

/**
 * Transcribed from the live Google Business Profile on 6 Nov 2026.
 *
 * Selection rule applied: only reviews whose text is unambiguously positive and
 * whose rating is unambiguous were included, so nothing here misstates what a
 * customer actually said. The profile also contains critical reviews; those are
 * genuine feedback and are deliberately not reproduced or contradicted here,
 * they simply are not marketing copy. The aggregate figure in GOOGLE_REVIEWS
 * (4.8 from 53) reflects all of them, positive and negative, which is the
 * honest number to publish.
 *
 * Wording is verbatim apart from trimming long reviews at a sentence boundary,
 * marked with an ellipsis. Names appear exactly as Google displays them. Dates
 * are absolute: where Google showed a relative date ("12 weeks ago") it has
 * been converted to the month it falls in.
 */
export const GOOGLE_REVIEW_CARDS: GoogleReviewCard[] = [
  {
    name: "justine chance",
    initial: "J",
    color: "#4285F4",
    date: "October 2026",
    rating: 5,
    text: "Quick, honest and professional service. My water heater needed replaced and these guys had us up and running in no time. Very courteous and thorough experts from start to finish. Highly recommend their services.",
  },
  {
    name: "Ayla S",
    initial: "A",
    color: "#EA4335",
    date: "August 2026",
    rating: 5,
    text: "Quick and honest work! I had a pipe burst in my crawl space and they were able to come out the following morning and had it resolved in a few hours. Price was right where I expected. They told me of some other things I will need to address with my plumbing and provided me with a proposal to do so.",
  },
  {
    name: "Jeremy",
    initial: "J",
    color: "#FBBC05",
    date: "May 2026",
    rating: 5,
    text: "I spoke to the receptionist Regina this afternoon to get a clog fixed and she was not only kind but extremely helpful, and was able to get someone out day-of with no issues. Jeremy was our service provider and was able to get our clog fixed within an hour of arriving, and gave accurate prices for what it'd cost today. He gave me clear information on the issue and the pipes without exaggeration...",
  },
  {
    name: "michael mcrae",
    initial: "M",
    color: "#34A853",
    date: "May 2026",
    rating: 5,
    text: "We had basement that was flooded. I called All Phase Plumbing and they were able to get me in the same day with a time that fit my schedule. The technician arrived and was able to restore service and even ran a camera to inspect his work. I will definitely call them back for any plumbing or drain cleaning needs.",
  },
  {
    name: "Andrew Meyer",
    initial: "A",
    color: "#4285F4",
    date: "April 2026",
    rating: 5,
    text: "Your team did an amazing job with the small space they had to work with. Highly recommend them and will call them back with next plumbing job.",
  },
  {
    name: "Aleen Pineda",
    initial: "A",
    color: "#EA4335",
    date: "November 2025",
    rating: 5,
    text: "The team at all phase were super! I got my issues corrected before winter and 100% would recommend them. Jeremy did a great job, was kind, communicative, and very knowledgeable!",
  },
  {
    name: "Lily Lee",
    initial: "L",
    color: "#FBBC05",
    date: "July 2025",
    rating: 5,
    text: "This is an amazing plumbing company! The team and Larry are so helpful! He wanted to save us money so he went on FaceTime and guided us through step by step and solved our problem without charging us any money. He is courteous and professional. We highly recommend this company.",
  },
  {
    name: "Smita Balasubramanian",
    initial: "S",
    color: "#34A853",
    date: "November 2024",
    rating: 5,
    text: "After a previous company had failed to resolve the issue, I called All Phase Plumbing. They came out on the day of the appointment, a tad ahead of schedule, provided excellent communication throughout, explained everything in detail, took care of the job, all in one visit. Caesar was great.",
  },
];
