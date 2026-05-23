import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   Full-colour SVG icons — navy #1E3A6E body, gold #F5C842 accents, white highlights.
   Displayed large inside each service card (no photos).
───────────────────────────────────────────────────────────────────────────── */

/** Pipe + wrench + water drop  →  Plumbing Repair */
function PlumbingRepairIcon() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Horizontal pipe */}
      <rect x="8" y="36" width="62" height="24" rx="12" fill="#1E3A6E" />
      {/* Pipe shine */}
      <rect x="12" y="40" width="54" height="6" rx="3" fill="#4A7BC4" fillOpacity="0.5" />
      {/* Elbow vertical pipe going down */}
      <rect x="52" y="36" width="24" height="54" rx="12" fill="#1E3A6E" />
      <rect x="56" y="40" width="8" height="46" rx="4" fill="#4A7BC4" fillOpacity="0.5" />
      {/* Yellow end cap on pipe left */}
      <rect x="4" y="41" width="12" height="14" rx="6" fill="#F5C842" />
      <rect x="5" y="44" width="4" height="8" rx="2" fill="#d4a820" fillOpacity="0.6" />
      {/* Water drop */}
      <path
        d="M26 68 C26 68 12 82 12 93 C12 102 18 110 26 110 C34 110 40 102 40 93 C40 82 26 68 26 68Z"
        fill="#F5C842"
      />
      <ellipse
        cx="21"
        cy="92"
        rx="4"
        ry="7"
        fill="white"
        fillOpacity="0.35"
        transform="rotate(-20 21 92)"
      />
      {/* Wrench handle diagonal */}
      <rect
        x="70"
        y="14"
        width="14"
        height="60"
        rx="7"
        fill="#F5C842"
        transform="rotate(-42 77 44)"
      />
      {/* Wrench top jaw */}
      <path d="M90 16 C90 16 108 14 112 26 C114 32 110 40 104 40 L96 38 L100 28 Z" fill="#F5C842" />
      <path
        d="M96 26 C96 26 108 24 110 30"
        stroke="#d4a820"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Wrench bottom jaw */}
      <path d="M36 76 C36 76 18 78 14 66 C12 60 16 52 22 52 L30 54 L26 64 Z" fill="#F5C842" />
      <path
        d="M30 66 C30 66 18 68 16 62"
        stroke="#d4a820"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Square drain grate  →  Drain Cleaning */
function DrainCleaningIcon() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Outer square body */}
      <rect x="6" y="6" width="108" height="108" rx="20" fill="#1E3A6E" />
      {/* Outer body shine */}
      <rect x="10" y="10" width="100" height="30" rx="14" fill="#4A7BC4" fillOpacity="0.3" />
      {/* Corner bolt circles */}
      <circle cx="22" cy="22" r="9" fill="#F5C842" />
      <circle cx="22" cy="22" r="5" fill="#d4a820" />
      <circle cx="98" cy="22" r="9" fill="#F5C842" />
      <circle cx="98" cy="22" r="5" fill="#d4a820" />
      <circle cx="22" cy="98" r="9" fill="#F5C842" />
      <circle cx="22" cy="98" r="5" fill="#d4a820" />
      <circle cx="98" cy="98" r="9" fill="#F5C842" />
      <circle cx="98" cy="98" r="5" fill="#d4a820" />
      {/* Outer grate ring */}
      <circle cx="60" cy="60" r="36" fill="#1a3362" stroke="#F5C842" strokeWidth="5" />
      {/* Inner white grate circle */}
      <circle cx="60" cy="60" r="28" fill="white" />
      {/* Vertical slats */}
      <rect x="46" y="34" width="6" height="52" rx="3" fill="#1E3A6E" />
      <rect x="57" y="34" width="6" height="52" rx="3" fill="#1E3A6E" />
      <rect x="68" y="34" width="6" height="52" rx="3" fill="#1E3A6E" />
      {/* Clip slats to inner circle (visual overlap) */}
      <circle cx="60" cy="60" r="28" fill="none" stroke="white" strokeWidth="2" />
    </svg>
  );
}

/** Tank with top pipes  →  Water Heaters */
function WaterHeaterIcon() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Left pipe cap */}
      <rect x="28" y="4" width="18" height="22" rx="9" fill="#1E3A6E" />
      <rect x="31" y="7" width="6" height="12" rx="3" fill="#4A7BC4" fillOpacity="0.6" />
      {/* Right pipe cap */}
      <rect x="74" y="4" width="18" height="22" rx="9" fill="#1E3A6E" />
      <rect x="77" y="7" width="6" height="12" rx="3" fill="#4A7BC4" fillOpacity="0.6" />
      {/* Main tank body */}
      <rect x="14" y="18" width="92" height="90" rx="18" fill="#1E3A6E" />
      {/* Tank body shine */}
      <rect x="18" y="22" width="84" height="24" rx="12" fill="#4A7BC4" fillOpacity="0.35" />
      {/* Yellow band */}
      <rect x="14" y="38" width="92" height="18" rx="0" fill="#F5C842" />
      <rect x="14" y="38" width="92" height="6" rx="0" fill="#d4a820" fillOpacity="0.4" />
      {/* White label area */}
      <rect x="26" y="64" width="68" height="30" rx="8" fill="white" />
      <rect x="34" y="71" width="52" height="4" rx="2" fill="#e2e8f0" />
      <rect x="34" y="80" width="38" height="4" rx="2" fill="#e2e8f0" />
      {/* Gauge circle bottom */}
      <circle cx="60" cy="104" r="10" fill="white" stroke="#1E3A6E" strokeWidth="3" />
      <circle cx="60" cy="104" r="4" fill="#1E3A6E" />
    </svg>
  );
}

/** P-trap drain pipe + auger  →  Sewer Service */
function SewerServiceIcon() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Vertical inlet pipe (top center) */}
      <rect x="48" y="4" width="24" height="32" rx="12" fill="#1E3A6E" />
      <rect x="52" y="8" width="8" height="20" rx="4" fill="#4A7BC4" fillOpacity="0.5" />
      {/* Auger/snake dashes going into pipe */}
      <line
        x1="60"
        y1="8"
        x2="60"
        y2="28"
        stroke="#F5C842"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="5 4"
      />
      {/* Yellow coupling ring at top of U-bend */}
      <rect x="40" y="32" width="40" height="14" rx="7" fill="#F5C842" />
      <rect x="44" y="35" width="32" height="4" rx="2" fill="#d4a820" fillOpacity="0.5" />
      {/* U-bend / P-trap main curve */}
      <path
        d="M48 44 Q14 44 14 72 Q14 96 36 96 L84 96 Q106 96 106 72 Q106 44 72 44"
        stroke="#1E3A6E"
        strokeWidth="22"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Pipe shine on U-bend */}
      <path
        d="M48 44 Q18 44 18 72 Q18 90 36 92"
        stroke="#4A7BC4"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />
      {/* Yellow coupling ring at bottom-left of bend */}
      <rect
        x="20"
        y="76"
        width="20"
        height="12"
        rx="6"
        fill="#F5C842"
        transform="rotate(-20 30 82)"
      />
      {/* Yellow coupling ring at bottom-right */}
      <rect
        x="80"
        y="76"
        width="20"
        height="12"
        rx="6"
        fill="#F5C842"
        transform="rotate(20 90 82)"
      />
      {/* Right outlet T-fitting */}
      <rect x="96" y="60" width="22" height="24" rx="11" fill="#1E3A6E" />
      <rect x="100" y="64" width="8" height="12" rx="4" fill="#4A7BC4" fillOpacity="0.5" />
      {/* White dots along the U bottom */}
      <circle cx="32" cy="92" r="4" fill="white" fillOpacity="0.7" />
      <circle cx="46" cy="99" r="4" fill="white" fillOpacity="0.7" />
      <circle cx="60" cy="102" r="4" fill="white" fillOpacity="0.7" />
      <circle cx="74" cy="99" r="4" fill="white" fillOpacity="0.7" />
      <circle cx="88" cy="92" r="4" fill="white" fillOpacity="0.7" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Service data
───────────────────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    title: "Plumbing Repair",
    description:
      "From leaky faucets to burst pipes — we fix it right the first time with upfront pricing and no hidden fees.",
    href: "/services/plumbing" as const,
    Icon: PlumbingRepairIcon,
  },
  {
    title: "Drain Cleaning",
    description:
      "Slow or fully blocked drains cleared fast. We tackle kitchen, bathroom, and main sewer line clogs.",
    href: "/services/drain-cleaning" as const,
    Icon: DrainCleaningIcon,
  },
  {
    title: "Water Heaters",
    description:
      "Tank and tankless installation, repair, and replacement. Hot water when you need it, guaranteed.",
    href: "/services/water-heaters" as const,
    Icon: WaterHeaterIcon,
  },
  {
    title: "Sewer Service",
    description:
      "Camera inspections, hydro-jetting, and sewer line repair to keep everything flowing smoothly.",
    href: "/services/sewer-services" as const,
    Icon: SewerServiceIcon,
  },
] as const;

/* ─────────────────────────────────────────────────────────────────────────────
   Card — icon-only (no photo), navy border
───────────────────────────────────────────────────────────────────────────── */
function ServiceCard({ svc }: { svc: (typeof SERVICES)[number] }) {
  return (
    <Link
      to={svc.href}
      className="group flex flex-col bg-white rounded-2xl border-2 border-[#1E3A6E]
                 shadow-md hover:shadow-[0_12px_40px_rgba(30,58,110,0.22)]
                 hover:-translate-y-2 transition-all duration-300 overflow-hidden"
    >
      {/* Icon area */}
      <div
        className="flex items-center justify-center bg-[#f0f5ff] px-4 pt-6 pb-4 sm:px-8 sm:pt-10 sm:pb-6
                      group-hover:bg-[#e8effc] transition-colors duration-300"
      >
        <div className="w-20 h-20 sm:w-36 sm:h-36 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
          <svc.Icon />
        </div>
      </div>

      {/* Divider */}
      <div className="h-[3px] bg-[#1E3A6E]" />

      {/* Content */}
      <div className="p-3 sm:p-6 flex flex-col flex-1">
        <h3 className="text-base sm:text-[22px] font-extrabold text-[#1E3A6E] leading-snug">{svc.title}</h3>
        <p className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-[16px] leading-relaxed flex-1">{svc.description}</p>
        <span
          className="inline-flex items-center gap-1.5 text-[#1E3A6E] font-bold text-xs sm:text-[16px]
                         group-hover:gap-3 group-hover:text-[#4A7BC4] transition-all duration-200 mt-3 sm:mt-5"
        >
          Learn More <ArrowRight className="size-3 sm:size-4" />
        </span>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Section
───────────────────────────────────────────────────────────────────────────── */
export function Services() {
  return (
    <section className="py-20 bg-[#f7f9fc]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block text-[24px] font-bold uppercase tracking-widest text-[#F5C842] mb-3">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E3A6E] leading-tight">
            Comprehensive plumbing solutions{" "}
            <span className="font-display-italic text-[#4A7BC4]">for Seattle homes.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-7">
          {SERVICES.map((svc) => (
            <ServiceCard key={svc.href} svc={svc} />
          ))}
        </div>
      </div>
    </section>
  );
}
