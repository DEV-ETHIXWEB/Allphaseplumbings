import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Star } from "lucide-react";
import { CouponBookCard } from "./CouponBookCard";
import { SocialIcons } from "./SocialIcons";

const CITIES_COL1 = [
  "Auburn",
  "Bellevue",
  "Bonney Lake",
  "Des Moines",
  "Federal Way",
  "Fife",
  "Kent",
  "Lakewood",
  "Mercer Island",
];
const CITIES_COL2 = [
  "Puyallup",
  "Renton",
  "Seattle",
  "South Hill",
  "Spanaway",
  "Summit",
  "Summit View",
  "Tacoma",
  "Tukwila",
];

export function TopBar() {
  const [nearMeOpen, setNearMeOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setNearMeOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative z-50 w-full bg-[#6B9EF8] hidden md:block">
      <div className="grid w-full text-sm font-normal items-start grid-cols-[1fr_auto_1fr]">
        {/* ── LEFT — Read Our Reviews ── */}
        <a
          href="https://www.google.com/search?q=All+Phase+Plumbing+Tukwila+WA+reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-end gap-4 pt-[13px] pb-[9px] pr-6 bg-[#6B9EF8] text-white hover:bg-[#5088dc] transition-colors duration-200 whitespace-nowrap"
        >
          <div className="flex gap-0.5 mr-[10%]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-[17px] fill-[#FFC533] text-[#FFC533]" />
            ))}
          </div>
          <span className="hidden sm:inline tracking-wide text-[17px] font-normal mr-[10%]">
            Read Our Reviews ›
          </span>
        </a>

        {/* ── CENTER — Find All Phase Near Me ── */}
        <div ref={dropRef} className="relative shrink-0">
          <button
            onClick={() => setNearMeOpen((p) => !p)}
            className="flex items-center justify-center gap-2 w-full h-full px-[94px] pt-[13px] pb-[9px] bg-[#1E3A8A] text-white hover:bg-[#162e58] transition-colors duration-200 tracking-wide font-normal text-[17px] whitespace-nowrap"
          >
            <span>Find All Phase Near Me</span>
            <ChevronDown
              className={`size-4 transition-transform duration-300 ${nearMeOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* City dropdown */}
          {nearMeOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 z-50 w-[520px] max-w-[calc(100vw-32px)] bg-white border-2 border-[#1E3A7B] rounded-b-xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-5">
              <div className="grid grid-cols-2 gap-x-8 text-sm">
                <div className="flex flex-col">
                  {CITIES_COL1.map((city) => (
                    <Link
                      key={city}
                      to="/service-area"
                      onClick={() => setNearMeOpen(false)}
                      className="border-b border-[#1E3A7B]/15 pt-[13px] pb-[9px] px-1 font-bold text-[#1E3A6E] hover:text-[#F5C842] hover:pl-3 transition-all duration-200 flex justify-between items-center"
                    >
                      <span>{city}</span>
                      <span className="text-gray-300 text-xs font-normal">WA</span>
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col">
                  {CITIES_COL2.map((city) => (
                    <Link
                      key={city}
                      to="/service-area"
                      onClick={() => setNearMeOpen(false)}
                      className="border-b border-[#1E3A7B]/15 pt-[13px] pb-[9px] px-1 font-bold text-[#1E3A6E] hover:text-[#F5C842] hover:pl-3 transition-all duration-200 flex justify-between items-center"
                    >
                      <span>{city}</span>
                      <span className="text-gray-300 text-xs font-normal">WA</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-[11px] text-gray-400 italic">
                  Same-day dispatch across King &amp; Pierce counties
                </span>
                <a
                  href="tel:+12067726077"
                  className="text-xs font-extrabold text-[#F5C842] hover:text-[#d4a835] transition-colors uppercase tracking-wider"
                >
                  Call (206) 772-6077 ✆
                </a>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — Coupons | Book Online Now (overlaid absolutely so it does NOT push row height) + Social icons */}
        <div className="relative flex items-stretch bg-[#6B9EF8] self-stretch">
          <div className="hidden md:block absolute top-0 left-0 z-20">
            <CouponBookCard />
          </div>
          {/* invisible spacer matching card width so social icons sit right after it */}
          <div className="hidden md:block shrink-0 w-[340px]" aria-hidden="true" />
          <div className="hidden md:flex shrink-0 items-stretch">
            <SocialIcons />
          </div>
          <div className="flex-1" />
        </div>
      </div>
    </div>
  );
}
