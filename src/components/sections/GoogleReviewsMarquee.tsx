import { Star } from "lucide-react";
import Particles from "@/components/ui/Particles";

const REVIEWS = [
  {
    name: "Sarah M.",
    initial: "S",
    color: "#4285F4",
    date: "2 weeks ago",
    text: "All Phase Plumbing was incredible! Showed up on time, diagnosed the issue quickly, and had my water heater replaced the same day. Professional, fair pricing, and the work was top-notch.",
  },
  {
    name: "James R.",
    initial: "J",
    color: "#EA4335",
    date: "1 month ago",
    text: "Best plumbing experience I've ever had. The technician was knowledgeable, explained everything clearly, and respected my home. Highly recommend All Phase to anyone in the Seattle area.",
  },
  {
    name: "Linda K.",
    initial: "L",
    color: "#34A853",
    date: "3 weeks ago",
    text: "Had a major drain emergency on a Sunday, All Phase answered the call and came out within an hour. They saved us from a flooded basement. Honest, fast, and trustworthy.",
  },
  {
    name: "Michael T.",
    initial: "M",
    color: "#FBBC05",
    date: "2 months ago",
    text: "Used All Phase for a full repiping job. The crew was professional, kept the worksite clean, and finished ahead of schedule. The pricing was very competitive too. Will use them again.",
  },
  {
    name: "Amanda P.",
    initial: "A",
    color: "#4285F4",
    date: "1 week ago",
    text: "From scheduling to completion, the entire process was seamless. The plumber was friendly, fixed our leaking pipe perfectly, and even gave us tips to avoid future issues. 5 stars!",
  },
  {
    name: "David C.",
    initial: "D",
    color: "#EA4335",
    date: "1 month ago",
    text: "All Phase Plumbing has been our go-to for years. They are reliable, fairly priced, and always do quality work. The team treats our home like their own. Cannot recommend enough.",
  },
  {
    name: "Emily H.",
    initial: "E",
    color: "#34A853",
    date: "3 days ago",
    text: "Quick response on a clogged sewer line. The hydro-jetting service worked great and they sent a follow-up camera inspection at no extra cost. True professionals.",
  },
  {
    name: "Robert N.",
    initial: "R",
    color: "#FBBC05",
    date: "2 weeks ago",
    text: "Installed a tankless water heater for us. Workmanship was perfect, they cleaned up after themselves, and the unit has worked flawlessly. Highly recommend All Phase Plumbing.",
  },
] as const;

function ReviewCard({ r }: { r: (typeof REVIEWS)[number] }) {
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
      <div className="flex gap-0.5 mt-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-4 fill-[#FBBC05] text-[#FBBC05]" />
        ))}
      </div>
      <p className="mt-3 text-[14px] leading-relaxed text-gray-700 line-clamp-5">{r.text}</p>
    </div>
  );
}

export function GoogleReviewsMarquee() {
  // duplicate the list for seamless looping
  const loop = [...REVIEWS, ...REVIEWS];

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
          particleCount={500}
          particleSpread={20}
          speed={1}
          particleBaseSize={150}
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
        <div className="flex items-center gap-2 mt-3">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-5 fill-[#FBBC05] text-[#FBBC05]" />
            ))}
          </div>
          <span className="text-white/90 text-sm font-semibold">Straight from Google</span>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative z-20 w-full overflow-hidden google-reviews-marquee-mask">
        <div className="flex w-max google-reviews-marquee-track">
          {loop.map((r, i) => (
            <ReviewCard key={i} r={r} />
          ))}
        </div>
      </div>

      <style>{`
        .google-reviews-marquee-mask {
          mask-image: linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%);
        }
        .google-reviews-marquee-track {
          animation: google-reviews-scroll 60s linear infinite;
        }
        @keyframes google-reviews-scroll {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .google-reviews-marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
