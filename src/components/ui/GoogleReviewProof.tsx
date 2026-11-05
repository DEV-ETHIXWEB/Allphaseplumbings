/**
 * GoogleReviewProof
 *
 * The "★★★★★ 4.9 rating · 50+ Google reviews" proof line that sits under the
 * hero CTAs on the city and service-category pages.
 *
 * It renders a star rating ONLY when GOOGLE_REVIEWS.verified is true, i.e. when
 * the rating and count have been copied from the live Google Business Profile.
 * Until then it falls back to a plain link to the profile, which is honest and
 * still sends visitors to the real reviews.
 *
 * Why the gate exists: the rating and count shipped as placeholder values
 * (4.9 / 50) that were never replaced, while being published as schema.org
 * aggregateRating sitewide. Google requires structured-data ratings to match
 * reviews the business actually received, and a star rating shown on the page
 * is read as a factual claim. See GOOGLE_REVIEWS in data/area-content.ts for
 * how to switch it back on.
 */

import { Star } from "lucide-react";
import { GOOGLE_REVIEWS } from "@/data/area-content";

export function GoogleReviewProof({ className = "" }: { className?: string }) {
  const base =
    "mt-5 inline-flex items-center gap-2.5 text-white/90 hover:text-white transition-colors";

  if (!GOOGLE_REVIEWS.verified || GOOGLE_REVIEWS.count <= 0) {
    return (
      <a
        href={GOOGLE_REVIEWS.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${className}`}
      >
        <Star className="size-[18px] fill-[#FBBC05] text-[#FBBC05]" />
        <span className="text-[14px] sm:text-[15px] font-semibold underline underline-offset-4">
          Read our reviews on Google
        </span>
      </a>
    );
  }

  return (
    <a
      href={GOOGLE_REVIEWS.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${className}`}
    >
      <span className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-[18px] fill-[#FBBC05] text-[#FBBC05]" />
        ))}
      </span>
      <span className="text-[14px] sm:text-[15px] font-semibold">
        {GOOGLE_REVIEWS.rating} rating &middot; {GOOGLE_REVIEWS.count}+ Google reviews
      </span>
    </a>
  );
}
