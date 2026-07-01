import { Link } from "@tanstack/react-router";
import { Phone, ArrowUpRight } from "lucide-react";
import { useSiteOptions } from "@/hooks/use-site-options";

type Tile = { label: string; href: string };

/**
 * Master list of plumbing service tiles as shown on the reference site.
 * Each one links to the dedicated sub-page if it exists, or back to the
 * Plumbing overview page until that sub-page is built out.
 */
const SERVICES: Tile[] = [
  { label: "Drain Cleaning & Hydro Jetting", href: "/services/drain-cleaning" },
  { label: "Emergency Plumber", href: "/services/plumbing/emergency-plumber" },
  { label: "Garbage Disposals", href: "/services/plumbing/garbage-disposals" },
  { label: "Repiping", href: "/services/plumbing/repiping" },
  { label: "Sump Pumps", href: "/services/plumbing/sump-pumps" },
  { label: "Toilets", href: "/services/plumbing/toilets" },
  { label: "Tankless Water Heaters", href: "/services/plumbing/tankless-water-heaters" },
  { label: "Water Heaters", href: "/services/water-heaters" },
  { label: "Water Lines", href: "/services/plumbing/water-lines" },
  { label: "Water Softeners", href: "/services/plumbing/water-softeners" },
  { label: "Leak Detection", href: "/services/plumbing/leak-detection" },
  { label: "Pipe Repair", href: "/services/plumbing/pipe-repair" },
  { label: "Burst Pipe Repair", href: "/services/plumbing/burst-pipe-repair" },
  { label: "Faucet Installation", href: "/services/plumbing/faucet-installation" },
  { label: "Sewer Line Repair", href: "/services/plumbing/sewer-line-repair" },
  { label: "Shower Installation", href: "/services/plumbing/shower-installation" },
  { label: "Toilet Installation", href: "/services/plumbing/toilet-installation" },
  { label: "Hot Water System Repair", href: "/services/plumbing/hot-water-system-repair" },
  { label: "Clogged Drain Repair", href: "/services/plumbing/clogged-drain-repair" },
  { label: "Backflow Testing", href: "/services/plumbing/backflow-testing" },
  { label: "Gas Line Repair", href: "/services/plumbing/gas-line-repair" },
  { label: "Sewer Camera Inspection", href: "/services/sewer-services" },
  { label: "Bathtub Installation", href: "/services/plumbing/bathtub-installation" },
  { label: "Septic Tank Service", href: "/services/plumbing/septic-tank-service" },
  { label: "Fixture Replacement", href: "/services/plumbing/fixture-replacement" },
  { label: "Outdoor Faucet Repair", href: "/services/plumbing/outdoor-faucet-repair" },
  { label: "Pipe Replacement", href: "/services/plumbing/pipe-replacement" },
  { label: "Water Filtration System Installation", href: "/services/plumbing/water-filtration" },
  { label: "Slab Leak Repair", href: "/services/plumbing/slab-leak-repair" },
];

export function PlumbingServicesGrid() {
  const opts = useSiteOptions();
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4 max-w-[1305px]">
        <div className="mb-8">
          <span className="inline-block text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.22em] text-[#6B9FE4] mb-2.5">
            Full Service List
          </span>
          <h2
            className="text-[26px] sm:text-[34px] font-black text-[#1E3A6E] leading-tight"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            All Plumbing Services
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-0">
          {SERVICES.map((s) => (
            <Link
              key={s.label}
              to={s.href}
              className="group flex items-center justify-between gap-3 py-3.5
                         border-b border-[#1E3A6E]/10 hover:border-[#4A7BC4]/40 transition-colors"
            >
              <span
                className="flex items-center gap-3 text-[15px] font-semibold text-[#1E3A6E]/85
                           transition-all duration-200 ease-out
                           group-hover:text-[#4A7BC4] group-hover:translate-x-1"
              >
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-[#1E3A6E]/25 shrink-0
                             transition-colors duration-200 group-hover:bg-[#F5C842]"
                />
                {s.label}
              </span>
              <ArrowUpRight
                className="size-4 text-[#4A7BC4] shrink-0 opacity-0 -translate-x-1
                           transition-all duration-200 ease-out
                           group-hover:opacity-100 group-hover:translate-x-0"
              />
            </Link>
          ))}
        </div>

        {/* Available 24/7 emergency banner */}
        <a
          href={opts.phone_href}
          className="mt-8 flex items-center justify-center gap-2 w-full bg-[#1E3A6E] hover:bg-[#162e58] text-white font-bold text-[15px] sm:text-[17px] py-4 transition-colors"
        >
          <Phone className="size-5" />
          <span>Available 24/7 - Call Us for Emergency Plumbing</span>
        </a>
      </div>
    </section>
  );
}
