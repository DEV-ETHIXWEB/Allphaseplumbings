import { Star } from "lucide-react";
import Particles from "@/components/ui/Particles";
import { GOOGLE_REVIEWS } from "@/data/area-content";
import { GOOGLE_REVIEW_CARDS, type GoogleReviewCard } from "@/data/google-reviews";

function ReviewCard({ r }: { r: GoogleReviewCard }) {
  return (
    <div className="shrink-0 w-[360px] bg-white rounded-2xl p-6 shadow-[0_12px_32px_rgba(0,0,0,0.18)] mx-3 flex flex-col">
      <div className="flex items-center gap-3">
        <div
          className="size-11 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
          style={{ background: r.color }}
        >
          {r.initial}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[#1E3A6E] text-[15px] leading-tight truncate">{r.name}</p>
          <p className="text-[12px] text-gray-500">{r.date}</p>
        </div>
      </div>
      {/* The reviewer's actual star count, not a hardcoded five. */}
      <div className="flex gap-0.5 mt-3" aria-label={`${r.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={
              i < r.rating ? "size-4 fill-[#FBBC05] text-[#FBBC05]" : "size-4 text-gray-300"
            }
          />
        ))}
      </div>
      <p className="mt-3 text-[14px] leading-relaxed text-gray-700 line-clamp-5">{r.text}</p>
    </div>
  );
}

export function GoogleReviewsMarquee() {
  /* Duplicated for seamless looping. Empty while no verified reviews exist, in
     which case the marquee strip is replaced by an honest call to action (see
     below) rather than invented review cards. */
  const hasReviews = GOOGLE_REVIEW_CARDS.length > 0;
  const loop = hasReviews ? [...GOOGLE_REVIEW_CARDS, ...GOOGLE_REVIEW_CARDS] : [];

  return (
    <section
      className="relative overflow-hidden border-b border-white py-16"
      style={{
        background: "linear-gradient(160deg, #0f2246 0%, #1E3A6E 40%, #2d5fa8 75%, #4A7BC4 100%)",
      }}
    >
      {/* ── Particle background ── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Particles
          particleCount={200}
          particleSpread={20}
          speed={0.4}
          particleBaseSize={80}
          sizeRandomness={1.1}
          alphaParticles={true}
          cameraDistance={20}
          disableRotation={true}
          moveParticlesOnHover={false}
          particleColors={["#ffffff", "#aac8f0", "#7ab3e0"]}
          className="w-full h-full"
        />
      </div>

      {/* Heading */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-[28px] font-normal leading-none"
            style={{
              fontFamily: "'Product Sans','Google Sans','Inter','Poppins',sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
            <span className="text-white"> Reviews</span>
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-white leading-tight">
          What Our Customers Are Saying
        </h2>
        {/* A five-star row here is a factual claim about the business's rating,
            so it only renders once the figures are verified against the live
            Google Business Profile. See GOOGLE_REVIEWS in data/area-content.ts. */}
        {GOOGLE_REVIEWS.verified && GOOGLE_REVIEWS.count > 0 && (
          <div className="flex items-center gap-2 mt-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-[#FBBC05] text-[#FBBC05]" />
              ))}
            </div>
            <span className="text-white/90 text-sm font-semibold">
              {GOOGLE_REVIEWS.rating} average from {GOOGLE_REVIEWS.count}+ Google reviews
            </span>
          </div>
        )}
      </div>

      {/* Marquee, or an honest pointer to the real profile when the verified
          review list is empty. Never invented review cards. */}
      {hasReviews ? (
        <div className="relative z-20 w-full overflow-hidden google-reviews-marquee-mask">
          <div className="flex w-max google-reviews-marquee-track">
            {loop.map((r, i) => (
              <ReviewCard key={i} r={r} />
            ))}
          </div>
        </div>
      ) : (
        <div className="relative z-20 flex justify-center px-4">
          <a
            href={GOOGLE_REVIEWS.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-2xl bg-white/95 px-7 py-5 text-[#1E3A6E] shadow-[0_12px_32px_rgba(0,0,0,0.18)] transition-transform hover:scale-[1.02]"
          >
            <Star className="size-6 shrink-0 fill-[#FBBC05] text-[#FBBC05]" />
            <span className="text-left">
              <span className="block text-[17px] font-bold leading-tight">
                Read our reviews on Google
              </span>
              <span className="block text-[13px] text-gray-600">
                Every review, in our customers' own words
              </span>
            </span>
          </a>
        </div>
      )}

      <style>{`
        .google-reviews-marquee-mask {
          mask-image: linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%);
        }
        .google-reviews-marquee-track {
          animation: google-reviews-scroll 60s linear infinite;
        }
        @keyframes google-reviews-scroll {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .google-reviews-marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
