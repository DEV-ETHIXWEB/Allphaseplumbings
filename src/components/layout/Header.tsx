import { useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { TopBar } from "./TopBar";
import { useSiteOptions } from "@/hooks/use-site-options";
import logo from "@/assets/app-logo.svg";
import { StarBorder } from "@/components/ui/StarBorder";

/* ── Navigation config ─────────────────────────────────────────────────────── */
type DropItem = { to: string; label: string };
type NavItem = {
  to: string;
  label: string;
  exact?: boolean;
  dropdown?: DropItem[];
  dropCols?: 1 | 2 | 3;
};

const NAV: NavItem[] = [
  { to: "/", label: "Home", exact: true },
  { to: "/about", label: "About Us" },

  {
    to: "/services/plumbing",
    label: "Plumbing",
    dropCols: 3,
    dropdown: [
      { to: "/services/plumbing", label: "Drain Cleaning" },
      { to: "/services/plumbing", label: "Emergency Plumber" },
      { to: "/services/plumbing", label: "Garbage Disposals" },
      { to: "/services/plumbing", label: "Hydro Jetting" },
      { to: "/services/plumbing", label: "Repiping" },
      { to: "/services/plumbing", label: "Sump Pumps" },
      { to: "/services/plumbing", label: "Toilets" },
      { to: "/services/water-heaters", label: "Tankless Water Heaters" },
      { to: "/services/water-heaters", label: "Water Heaters" },
      { to: "/services/plumbing", label: "Water Lines" },
      { to: "/services/plumbing", label: "Water Softeners" },
      { to: "/services/plumbing", label: "Leak Detection" },
      { to: "/services/plumbing", label: "Pipe Repair" },
      { to: "/services/plumbing", label: "Burst Pipe Repair" },
      { to: "/services/plumbing", label: "Faucet Installation" },
      { to: "/services/sewer-services", label: "Sewer Line Repair" },
      { to: "/services/plumbing", label: "Shower Installation" },
      { to: "/services/plumbing", label: "Toilet Installation" },
      { to: "/services/plumbing", label: "Hot Water System Repair" },
      { to: "/services/drain-cleaning", label: "Clogged Drain Repair" },
      { to: "/services/plumbing", label: "Backflow Testing" },
      { to: "/services/plumbing", label: "Gas Line Repair" },
      { to: "/services/sewer-services", label: "Sewer Camera Inspection" },
      { to: "/services/plumbing", label: "Bathtub Installation" },
      { to: "/services/plumbing", label: "Septic Tank Service" },
      { to: "/services/plumbing", label: "Fixture Replacement" },
      { to: "/services/plumbing", label: "Outdoor Faucet Repair" },
      { to: "/services/plumbing", label: "Pipe Replacement" },
      { to: "/services/plumbing", label: "Water Filtration System Installation" },
      { to: "/services/plumbing", label: "Slab Leak Repair" },
    ],
  },

  {
    to: "/services/sewer-services",
    label: "Sewer",
    dropCols: 1,
    dropdown: [
      { to: "/services/sewer-services", label: "Sewer Repair" },
      { to: "/services/sewer-services", label: "Sewer Replacement" },
    ],
  },

  {
    to: "/services",
    label: "Commercial",
    dropCols: 1,
    dropdown: [{ to: "/services", label: "Commercial Drain Cleaning" }],
  },

  { to: "/blog", label: "Blog" },
  { to: "/coupons", label: "Coupons" },

  {
    to: "/service-area",
    label: "Service Area",
    dropCols: 3,
    dropdown: [
      { to: "/service-area", label: "Auburn" },
      { to: "/service-area", label: "Bellevue" },
      { to: "/service-area", label: "Bonney Lake" },
      { to: "/service-area", label: "Des Moines" },
      { to: "/service-area", label: "Federal Way" },
      { to: "/service-area", label: "Fife" },
      { to: "/service-area", label: "Kent" },
      { to: "/service-area", label: "Lakewood" },
      { to: "/service-area", label: "Mercer Island" },
      { to: "/service-area", label: "Puyallup" },
      { to: "/service-area", label: "Renton" },
      { to: "/service-area", label: "Seattle" },
      { to: "/service-area", label: "South Hill" },
      { to: "/service-area", label: "Spanaway" },
      { to: "/service-area", label: "Summit" },
      { to: "/service-area", label: "Summit View" },
      { to: "/service-area", label: "Tacoma" },
      { to: "/service-area", label: "Tukwila" },
      { to: "/service-area", label: "Kirkland" },
      { to: "/service-area", label: "Redmond" },
      { to: "/service-area", label: "Bothell" },
    ],
  },

  { to: "/contact", label: "Contact Us" },
];

function gridClass(cols: 1 | 2 | 3) {
  if (cols === 3) return "grid-cols-3";
  if (cols === 2) return "grid-cols-2";
  return "grid-cols-1";
}

/* ── Main Header ────────────────────────────────────────────────────────────── */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openNav, setOpenNav] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const opts = useSiteOptions();

  function openMenu(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenNav(label);
  }
  function closeMenu() {
    closeTimer.current = setTimeout(() => setOpenNav(null), 80);
  }

  const activeItem = NAV.find((n) => n.label === openNav && n.dropdown);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_6px_14px_-2px_rgba(0,0,0,0.22)]">
      {/* Top bar */}
      <TopBar />

      {/* Logo · badge · phone */}
      <div className="bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-6 py-2">
            <Link to="/" className="shrink-0">
              <img
                src={logo}
                alt="All Phase Plumbing"
                className="h-14 sm:h-[132px] w-auto object-contain"
              />
            </Link>

            <div className="hidden lg:flex flex-col items-center leading-tight ml-auto">
              <span className="text-[#1E3A6E] font-bold text-[24px] tracking-wide">
                Licensed &amp; Insured
              </span>
              <span className="text-[#6B9FE4] font-bold text-[21px] mt-0.5 self-end mr-0">
                Available 24/7
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <StarBorder
                  as="a"
                  href={opts.phone_href}
                  className="phone-cta-btn active:scale-[0.98] hover:scale-[1.04] hover:-translate-y-0.5 transition-all duration-300"
                  innerClassName="phone-cta-inner flex items-center justify-center font-extrabold text-white whitespace-nowrap"
                  innerStyle={{
                    background: "linear-gradient(135deg,#1E3A6E 0%,#6B9FE4 100%)",
                    border: "4px solid #1E3A6E",
                    padding: "8px 19px",
                    fontSize: "29px",
                    boxShadow: "0 6px 16px -4px rgba(30,58,110,0.45)",
                    transition: "background 300ms ease, box-shadow 300ms ease, filter 300ms ease",
                  }}
                >
                  {opts.phone}
                </StarBorder>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Toggle menu"
                className="lg:hidden inline-flex items-center justify-center p-2.5 rounded-lg
                           text-[#1E3A6E] hover:bg-[#1E3A6E]/10 transition-colors duration-200"
              >
                {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop nav bar ── */}
      <div className="hidden lg:block border-t-[4px] border-[#1E3A6E] bg-white relative">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <nav className="flex items-center justify-between gap-2 pt-1.5 pb-0">
            {NAV.map((item) => (
              <div
                key={item.to + item.label}
                onMouseEnter={() => (item.dropdown ? openMenu(item.label) : setOpenNav(null))}
                onMouseLeave={closeMenu}
              >
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.exact ?? false }}
                  className="flex items-center gap-1 px-3.5 py-3 text-[21px] font-bold text-[#1E3A6E]
                             rounded-md transition-all duration-200 hover:bg-[#1E3A6E] hover:text-white"
                  activeProps={{ className: "!bg-[#1E3A6E] !text-white" }}
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown
                      className={`size-3.5 opacity-70 transition-transform duration-200 ${
                        openNav === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>
              </div>
            ))}
          </nav>
        </div>

        {/* ── Full-width mega-menu panel ── */}
        {activeItem && (
          <div
            className="absolute top-full left-0 w-full bg-white border-t-2 border-[#1E3A6E]/10
                       shadow-[0_12px_40px_rgba(0,0,0,0.13)] z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            onMouseEnter={() => openMenu(activeItem.label)}
            onMouseLeave={closeMenu}
          >
            <div className="container mx-auto px-8 py-6">
              <div className={`grid ${gridClass(activeItem.dropCols ?? 1)} gap-x-10`}>
                {activeItem.dropdown!.map((sub) => (
                  <Link
                    key={sub.to + sub.label}
                    to={sub.to}
                    onClick={() => setOpenNav(null)}
                    className="flex items-center min-h-[44px] px-2 text-[22px] font-bold text-[#1E3A6E]
                               border-b border-gray-100 hover:text-[#4A7BC4] hover:pl-4
                               transition-all duration-150"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-0.5">
            {NAV.map((item) => (
              <Link
                key={item.to + item.label}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                activeOptions={{ exact: item.exact ?? false }}
                className="px-4 py-3 rounded-lg text-base font-bold text-[#1E3A6E]
                           hover:bg-[#1E3A6E] hover:text-white transition-all duration-200"
                activeProps={{ className: "!bg-[#1E3A6E] !text-white" }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={opts.phone_href}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl px-4 py-3.5
                         text-base font-bold text-white shadow-md"
              style={{ background: "linear-gradient(135deg,#1E3A6E 0%,#2d5fa8 100%)" }}
            >
              <Phone className="size-4" />
              {opts.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
