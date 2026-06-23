import { useState, useEffect } from "react";
import bbb from "@/assets/badge-bbb.svg";
import angi from "@/assets/badge-angi.svg";
import phcc from "@/assets/badge-phcc.svg";
import peekingMascot from "@/assets/peeking mascot watermark.svg";
import BorderGlow from "@/components/ui/BorderGlow";

const BADGES = [
  { src: bbb, alt: "BBB Accredited Business", imgClass: "h-20 sm:h-24", mobileImgClass: "h-32" },
  { src: angi, alt: "Angi Super Service Award", imgClass: "h-28 sm:h-[154px]", mobileImgClass: "h-44" },
  { src: phcc, alt: "PHCC Member", imgClass: "h-24 sm:h-[121px]", mobileImgClass: "h-36" },
] as const;

type Badge = (typeof BADGES)[number];

function BadgeCard({ b }: { b: Badge }) {
  return (
    <BorderGlow
      className="drop-shadow-[0_8px_16px_rgba(30,58,110,0.25)]"
      glowColor="219 65 45"
      colors={["#1E3A6E", "#2d5fa8", "#4A7BC4"]}
      backgroundColor="#ffffff"
      borderRadius={16}
      glowRadius={26}
      glowIntensity={1.8}
      edgeSensitivity={14}
    >
      <div className="flex h-full items-center justify-center px-4 py-5 sm:px-8 sm:py-6">
        <img src={b.src} alt={b.alt} className={`w-auto object-contain ${b.imgClass}`} />
      </div>
    </BorderGlow>
  );
}

export function Badges() {
  const [index, setIndex] = useState(0);
  const count = BADGES.length;

  // Auto-advance the mobile carousel one card at a time.
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 2800);
    return () => clearInterval(t);
  }, [count]);

  return (
    <section className="relative py-16 bg-white border-y border-gray-100 overflow-hidden">
      {/* Peeking Mascot Watermark */}
      <img
        src={peekingMascot}
        alt=""
        className="absolute top-1/2 -translate-y-1/2 w-40 sm:w-60 lg:w-80 opacity-90 pointer-events-none object-contain object-left"
        style={{ left: "-60px", marginTop: "60px" }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <h2
          className="text-center text-4xl font-black text-[#1E3A6E] mb-12"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Badges
        </h2>

        {/* Tablet / desktop: all three in a row */}
        <div className="hidden sm:flex flex-row items-stretch justify-center gap-12 max-w-5xl mx-auto px-2">
          {BADGES.map((b) => (
            <BadgeCard key={b.alt} b={b} />
          ))}
        </div>

        {/* Mobile: one badge at a time, big, auto-sliding — no card, no shadow. */}
        <div className="sm:hidden mx-auto max-w-[300px] overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {BADGES.map((b, i) => (
              <div
                key={b.alt}
                className={`flex w-full shrink-0 items-center justify-center px-2 py-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  i === index ? "scale-100 opacity-100" : "scale-90 opacity-40"
                }`}
              >
                <img
                  src={b.src}
                  alt={b.alt}
                  className={`w-auto object-contain ${b.mobileImgClass}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
