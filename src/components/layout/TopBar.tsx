import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/social-links";

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

/* TikTok glyph */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.59a8.16 8.16 0 0 0 4.77 1.52V6.69h-1.84z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.71 3.71 0 0 1-1.38-.9 3.71 3.71 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.2 8.8 2.2 12 2.2zM12 0C8.74 0 8.33 0 7.05.07 5.78.13 4.9.33 4.14.63a5.93 5.93 0 0 0-2.14 1.39A5.93 5.93 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s0 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.73 1.46 1.39 2.12a5.93 5.93 0 0 0 2.12 1.39c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67 0 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.93 5.93 0 0 0 2.12-1.39 5.93 5.93 0 0 0 1.39-2.12c.3-.76.5-1.64.56-2.91.07-1.28.07-1.69.07-4.95s0-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.93 5.93 0 0 0-1.39-2.12A5.93 5.93 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.96h-1.52c-1.49 0-1.96.93-1.96 1.88V12h3.33l-.53 3.47h-2.8v8.38A12 12 0 0 0 24 12z" />
    </svg>
  );
}

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

  const socials = [
    { label: "TikTok", href: SOCIAL_LINKS.tiktok, Icon: TikTokIcon },
    { label: "Instagram", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
    { label: "Facebook", href: SOCIAL_LINKS.facebook, Icon: FacebookIcon },
  ];

  return (
    <div className="relative z-50 w-full bg-[#1E3A8A] hidden lg:block">
      <div className="grid w-full items-center grid-cols-[1fr_auto_1fr] px-4">
        {/* Left spacer */}
        <div />

        {/* ── Center: Find All Phase Near Me ── */}
        <div ref={dropRef} className="relative shrink-0 justify-self-center">
          <button
            onClick={() => setNearMeOpen((p) => !p)}
            className="flex items-center justify-center gap-2 px-[94px] pt-[13px] pb-[13px] text-white hover:bg-[#162e58] transition-colors duration-200 tracking-wide font-normal text-[17px] whitespace-nowrap"
          >
            <span>Find All Phase Near Me</span>
            <ChevronDown
              className={`size-4 transition-transform duration-300 ${nearMeOpen ? "rotate-180" : ""}`}
            />
          </button>

          {nearMeOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 z-50 w-[520px] max-w-[calc(100vw-32px)] bg-white border-2 border-[#1E3A7B] rounded-b-xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-5">
              <div className="grid grid-cols-2 gap-x-8 text-sm">
                <div className="flex flex-col">
                  {CITIES_COL1.map((city) => (
                    <Link
                      key={city}
                      to="/service-area"
                      onClick={() => setNearMeOpen(false)}
                      className="border-b border-[#1E3A7B]/15 pt-[13px] pb-[13px] px-1 font-bold text-[#1E3A6E] hover:text-[#F5C842] hover:pl-3 transition-all duration-200 flex justify-between items-center"
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
                      className="border-b border-[#1E3A7B]/15 pt-[13px] pb-[13px] px-1 font-bold text-[#1E3A6E] hover:text-[#F5C842] hover:pl-3 transition-all duration-200 flex justify-between items-center"
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

        {/* ── Right: social handles in a box ── */}
        <div className="justify-self-end">
          <div className="inline-flex items-center gap-3 rounded-md border border-white/25 bg-white/10 px-3 py-2 backdrop-blur-sm">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center size-11 rounded text-white hover:bg-white/15 hover:text-[#F5C842] transition-colors"
              >
                <Icon className="size-[28px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
