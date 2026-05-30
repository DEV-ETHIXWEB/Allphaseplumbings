import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { useSiteOptions } from "@/hooks/use-site-options";

type Tile = { label: string; href: string };

/**
 * Master list of plumbing service tiles as shown on the reference site.
 * Each one links to the dedicated sub-page if it exists, or back to the
 * Plumbing overview page until that sub-page is built out.
 */
const SERVICES: Tile[] = [
  { label: "Drain Cleaning", href: "/services/drain-cleaning" },
  { label: "Emergency Plumber", href: "/services/plumbing/emergency-plumber" },
  { label: "Garbage Disposals", href: "/services/plumbing/garbage-disposals" },
  { label: "Hydro Jetting", href: "/services/plumbing/hydro-jetting" },
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
        <h2
          className="text-[26px] sm:text-[32px] font-black text-[#1E3A6E] leading-tight mb-6"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          All Plumbing Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-1">
          {SERVICES.map((s) => (
            <Link
              key={s.label}
              to={s.href}
              className="group flex items-center gap-2 py-3 border-b border-[#1E3A6E]/10 text-[#1E3A6E] hover:text-[#4A7BC4] transition-colors"
            >
              <span className="text-[#1E3A6E]/40 group-hover:text-[#F5C842] font-black text-[14px] leading-none">
                ::
              </span>
              <span className="text-[16px] font-bold leading-snug">{s.label}</span>
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
