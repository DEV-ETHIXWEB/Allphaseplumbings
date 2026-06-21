import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import wwd1 from "@/assets/wwd-1.svg";
import wwd2 from "@/assets/wwd-2.svg";
import wwd3 from "@/assets/wwd-3.svg";
import wwd4 from "@/assets/wwd-4.svg";
import wwd1Dark from "@/assets/wwd-1-dark.svg";
import wwd2Dark from "@/assets/wwd-2-dark.svg";
import wwd3Dark from "@/assets/wwd-3-dark.svg";
import wwd4Dark from "@/assets/wwd-4-dark.svg";

const SERVICES = [
  {
    title: "Plumbing Repair",
    description:
      "From leaky faucets to burst pipes, we fix it right the first time with upfront pricing and no hidden fees.",
    href: "/services/plumbing" as const,
    icon: wwd1,
    iconDark: wwd1Dark,
  },
  {
    title: "Drain Cleaning",
    description:
      "Slow or fully blocked drains cleared fast. We tackle kitchen, bathroom, and main sewer line clogs.",
    href: "/services/drain-cleaning" as const,
    icon: wwd4,
    iconDark: wwd4Dark,
  },
  {
    title: "Water Heaters",
    description:
      "Tank and tankless installation, repair, and replacement. Hot water when you need it, guaranteed.",
    href: "/services/water-heaters" as const,
    icon: wwd2,
    iconDark: wwd2Dark,
  },
  {
    title: "Sewer Service",
    description:
      "Camera inspections, hydro-jetting, and sewer line repair to keep everything flowing smoothly.",
    href: "/services/sewer-services" as const,
    icon: wwd3,
    iconDark: wwd3Dark,
    iconScale: 0.95,
  },
] as const;

function ServiceCard({ svc }: { svc: (typeof SERVICES)[number] }) {
  return (
    <Link
      to={svc.href}
      className="group flex flex-col bg-white border-2 border-[#1E3A6E]
                 shadow-md hover:shadow-[0_12px_40px_rgba(30,58,110,0.22)]
                 hover:-translate-y-2 transition-all duration-300 overflow-hidden"
    >
      <div
        className="flex items-center justify-center bg-[#f0f5ff] px-4 pt-6 pb-4 sm:px-8 sm:pt-10 sm:pb-6
                      group-hover:bg-[#e8effc] transition-colors duration-300"
      >
        <div className="relative w-[82px] h-[82px] sm:w-[150px] sm:h-[150px] drop-shadow-lg flex items-center justify-center">
          {/* Dark (default) */}
          <img
            src={svc.iconDark}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain
                       opacity-100 group-hover:opacity-0 transition-opacity duration-150 ease-out"
            style={"iconScale" in svc ? { transform: `scale(${svc.iconScale})` } : undefined}
          />
          {/* Light (hover) */}
          <img
            src={svc.icon}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain
                       opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out"
            style={"iconScale" in svc ? { transform: `scale(${svc.iconScale})` } : undefined}
          />
        </div>
      </div>

      <div className="h-[3px] bg-[#1E3A6E]" />

      <div className="p-3 sm:p-6 flex flex-col flex-1 items-center sm:items-start text-center sm:text-left">
        <h3 className="text-base sm:text-[22px] font-extrabold text-[#1E3A6E] leading-snug">
          {svc.title}
        </h3>
        {/* Description + Learn More, hidden on phones, visible from sm and up */}
        <p className="hidden sm:block text-gray-500 mt-1 sm:mt-2 text-sm sm:text-[16px] leading-relaxed flex-1">
          {svc.description}
        </p>
        <span
          className="hidden sm:inline-flex items-center gap-1.5 text-[#1E3A6E] font-bold text-sm sm:text-[16px]
                         group-hover:gap-3 group-hover:text-[#4A7BC4] transition-all duration-200 mt-3 sm:mt-5"
        >
          Learn More <ArrowRight className="size-3.5 sm:size-4" />
        </span>
      </div>
    </Link>
  );
}

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
