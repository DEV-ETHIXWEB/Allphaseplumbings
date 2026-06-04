import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { TopBar } from "./TopBar";
import { useSiteOptions } from "@/hooks/use-site-options";
import logo from "@/assets/app-logo.svg";
import { StarBorder } from "@/components/ui/StarBorder";
import { PillNavItem } from "./PillNavItem";
import { Instagram, Facebook } from "lucide-react";

/* TikTok glyph, lucide doesn't ship one. */
function TikTokGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.59a8.16 8.16 0 0 0 4.77 1.52V6.69h-1.84z" />
    </svg>
  );
}

/* Facebook, solid filled glyph (navy via currentColor) */
function FacebookFilled({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.96h-1.52c-1.49 0-1.96.93-1.96 1.88V12h3.33l-.53 3.47h-2.8v8.38A12 12 0 0 0 24 12z" />
    </svg>
  );
}

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
      { to: "/services/drain-cleaning", label: "Drain Cleaning" },
      { to: "/services/plumbing/emergency-plumber", label: "Emergency Plumber" },
      { to: "/services/plumbing/garbage-disposals", label: "Garbage Disposals" },
      { to: "/services/plumbing/hydro-jetting", label: "Hydro Jetting" },
      { to: "/services/plumbing/repiping", label: "Repiping" },
      { to: "/services/plumbing/sump-pumps", label: "Sump Pumps" },
      { to: "/services/plumbing/toilets", label: "Toilets" },
      { to: "/services/plumbing/tankless-water-heaters", label: "Tankless Water Heaters" },
      { to: "/services/water-heaters", label: "Water Heaters" },
      { to: "/services/plumbing/water-lines", label: "Water Lines" },
      { to: "/services/plumbing/water-softeners", label: "Water Softeners" },
      { to: "/services/plumbing/leak-detection", label: "Leak Detection" },
      { to: "/services/plumbing/pipe-repair", label: "Pipe Repair" },
      { to: "/services/plumbing/burst-pipe-repair", label: "Burst Pipe Repair" },
      { to: "/services/plumbing/faucet-installation", label: "Faucet Installation" },
      { to: "/services/plumbing/sewer-line-repair", label: "Sewer Line Repair" },
      { to: "/services/plumbing/shower-installation", label: "Shower Installation" },
      { to: "/services/plumbing/toilet-installation", label: "Toilet Installation" },
      { to: "/services/plumbing/hot-water-system-repair", label: "Hot Water System Repair" },
      { to: "/services/plumbing/clogged-drain-repair", label: "Clogged Drain Repair" },
      { to: "/services/plumbing/backflow-testing", label: "Backflow Testing" },
      { to: "/services/plumbing/gas-line-repair", label: "Gas Line Repair" },
      { to: "/services/sewer-services", label: "Sewer Camera Inspection" },
      { to: "/services/plumbing/bathtub-installation", label: "Bathtub Installation" },
      { to: "/services/plumbing/septic-tank-service", label: "Septic Tank Service" },
      { to: "/services/plumbing/fixture-replacement", label: "Fixture Replacement" },
      { to: "/services/plumbing/outdoor-faucet-repair", label: "Outdoor Faucet Repair" },
      { to: "/services/plumbing/pipe-replacement", label: "Pipe Replacement" },
      { to: "/services/plumbing/water-filtration", label: "Water Filtration System Installation" },
      { to: "/services/plumbing/slab-leak-repair", label: "Slab Leak Repair" },
    ],
  },

  {
    to: "/services/sewer-services",
    label: "Sewer",
    dropCols: 1,
    dropdown: [
      { to: "/services/sewer-services/sewer-repair", label: "Sewer Repair" },
      { to: "/services/sewer-services/sewer-replacement", label: "Sewer Replacement" },
    ],
  },

  {
    to: "/commercial",
    label: "Commercial",
    exact: true,
    dropCols: 1,
    dropdown: [{ to: "/commercial/drain-cleaning", label: "Commercial Drain Cleaning" }],
  },

  { to: "/blog", label: "Blog" },

  {
    to: "/service-area",
    label: "Service Area",
    dropCols: 3,
    dropdown: [
      { to: "/service-area/auburn", label: "Auburn" },
      { to: "/service-area/bellevue", label: "Bellevue" },
      { to: "/service-area/bonney-lake", label: "Bonney Lake" },
      { to: "/service-area/des-moines", label: "Des Moines" },
      { to: "/service-area/federal-way", label: "Federal Way" },
      { to: "/service-area/fife", label: "Fife" },
      { to: "/service-area/kent", label: "Kent" },
      { to: "/service-area/lakewood", label: "Lakewood" },
      { to: "/service-area/mercer-island", label: "Mercer Island" },
      { to: "/service-area/puyallup", label: "Puyallup" },
      { to: "/service-area/renton", label: "Renton" },
      { to: "/service-area/seattle", label: "Seattle" },
      { to: "/service-area/south-hill", label: "South Hill" },
      { to: "/service-area/spanaway", label: "Spanaway" },
      { to: "/service-area/summit", label: "Summit" },
      { to: "/service-area/summit-view", label: "Summit View" },
      { to: "/service-area/tacoma", label: "Tacoma" },
      { to: "/service-area/tukwila", label: "Tukwila" },
      { to: "/service-area/kirkland", label: "Kirkland" },
      { to: "/service-area/redmond", label: "Redmond" },
      { to: "/service-area/bothell", label: "Bothell" },
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
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const opts = useSiteOptions();

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Home page minimizes the top utility bar only AFTER the hero is mostly out of view;
    // other pages use a smaller threshold since their heros are shorter.
    const downThreshold = isHomePage ? 750 : 400;
    const upThreshold = isHomePage ? 120 : 80;

    let rafId: number | null = null;
    let lastState: boolean | null = null;

    function update() {
      rafId = null;
      const y = window.scrollY;
      let next = lastState ?? false;
      if (!next && y > downThreshold) next = true;
      else if (next && y < upThreshold) next = false;
      if (next !== lastState) {
        lastState = next;
        setIsScrolled(next);
      }
    }

    function handleScroll() {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [isHomePage]);

  // TopBar collapses on every page (home included) once past the threshold.
  // The logo/badge/phone row only collapses on non-home pages, home keeps it visible.
  const shouldShrinkTopBar = isScrolled;
  const shouldShrinkLogoRow = !isHomePage && isScrolled;

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
      <div className={`transition-all duration-300 ease-in-out ${
        shouldShrinkTopBar ? "lg:max-h-0 lg:opacity-0 lg:overflow-hidden" : "lg:max-h-12"
      }`}>
        <TopBar />
      </div>

      {/* ── Phone-only header: logo (left) · socials (right) ── */}
      <div className="lg:hidden bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-3 py-2.5 gap-2">
          <Link to="/" className="shrink-0">
            <img
              src={logo}
              alt="All Phase Plumbing"
              className="h-[53px] w-auto object-contain"
            />
          </Link>

          <div className="flex items-center gap-0">
            <a
              href={opts.social_instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center size-9 text-[#1E3A6E] hover:text-[#F5C842] transition-colors"
            >
              <Instagram className="size-[22px]" />
            </a>
            <a
              href={opts.social_facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center size-9 text-[#1E3A6E] hover:text-[#F5C842] transition-colors"
            >
              <Facebook className="size-[22px]" />
            </a>
            <a
              href={opts.social_tiktok}
              aria-label="TikTok"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center size-9 text-[#1E3A6E] hover:text-[#F5C842] transition-colors"
            >
              <TikTokGlyph className="size-[22px]" />
            </a>
          </div>
        </div>
      </div>

      {/* Phone CTA, hangs OUTSIDE the white header, attached to its bottom-right edge */}
      <div className="lg:hidden absolute top-full right-0 z-40 -mt-px">
        <a
          href={opts.phone_href}
          aria-label={`Call ${opts.phone}`}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-white font-bold text-[14px] tracking-wide active:scale-[0.97] transition-transform"
          style={{
            background: "linear-gradient(135deg, #0f2246 0%, #1E3A6E 50%, #4A7BC4 100%)",
            border: "1.5px solid #1E3A6E",
            borderTop: "none",
            boxShadow: "0 4px 10px -2px rgba(30,58,110,0.45)",
          }}
        >
          <Phone className="size-3.5" />
          {opts.phone}
        </a>
      </div>

      {/* Logo · badge · phone (lg and up only, phone/tablet uses the bar above) */}
      <div className={`hidden lg:block bg-white transition-all duration-300 ease-in-out ${
        shouldShrinkLogoRow ? "lg:max-h-0 lg:py-0 lg:opacity-0 lg:pointer-events-none lg:overflow-hidden" : "lg:max-h-48"
      }`}>
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-6 pt-2 pb-2.5 min-h-[150px]">
            <Link to="/" className="shrink-0 translate-y-1.5">
              <img
                src={logo}
                alt="All Phase Plumbing"
                className="h-[42px] sm:h-[100px] w-auto object-contain"
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
          <nav className="flex items-center justify-between gap-1 pt-2 pb-2">
            {NAV.map((item) => (
              <div
                key={item.to + item.label}
                onMouseEnter={() => (item.dropdown ? openMenu(item.label) : setOpenNav(null))}
                onMouseLeave={closeMenu}
                className="relative"
              >
                <PillNavItem to={item.to} exact={item.exact}>
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown
                      className={`size-3.5 opacity-70 transition-transform duration-200 ${
                        openNav === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </PillNavItem>
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
                    className="flex items-center min-h-[44px] px-2 text-[20px] font-bold text-[#1E3A6E]
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

      {/* ── Mobile drawer, overlays the page, doesn't push content ── */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 z-50 border-t border-gray-100
                   bg-white shadow-2xl overflow-y-auto
                   transition-[max-height,opacity,transform] ease-[cubic-bezier(0.22,1,0.36,1)]
                   ${
                     mobileOpen
                       ? "max-h-[85vh] opacity-100 translate-y-0 duration-[450ms]"
                       : "max-h-0 opacity-0 -translate-y-1 duration-[280ms] pointer-events-none"
                   }`}
        style={{ transformOrigin: "top center" }}
      >
        <nav className="container mx-auto px-4 py-3 flex flex-col gap-0.5">
          {NAV.flatMap((item, idx) => {
            const hasDropdown = item.dropdown && item.dropdown.length > 0;
            const isExpanded = expandedMobileItem === item.label;
            const nodes = [
              <div
                key={item.to + item.label}
                className={`flex flex-col border-b border-gray-50 last:border-b-0
                            transition-[opacity,transform] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                            ${
                              mobileOpen
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 -translate-y-2"
                            }`}
                style={{ transitionDelay: mobileOpen ? `${80 + idx * 35}ms` : "0ms" }}
              >
                <div className="flex items-center justify-between">
                  <Link
                    to={item.to}
                    onClick={() => {
                      setMobileOpen(false);
                      setExpandedMobileItem(null);
                    }}
                    activeOptions={{ exact: item.exact ?? false }}
                    className="flex-1 px-4 py-3 text-[17px] font-bold text-[#1E3A6E] rounded-lg
                               hover:bg-[#1E3A6E]/5 transition-all duration-200"
                    activeProps={{ className: "!bg-[#1E3A6E]/10 !text-[#4A7BC4]" }}
                  >
                    {item.label}
                  </Link>
                  {hasDropdown && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedMobileItem(isExpanded ? null : item.label);
                      }}
                      className="p-3 text-[#1E3A6E] hover:bg-[#1E3A6E]/5 rounded-lg transition-colors flex items-center justify-center"
                      aria-label={`Toggle ${item.label} submenu`}
                    >
                      <ChevronDown
                        className={`size-5 opacity-70 transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
                {/* Sub-menu, smooth grow */}
                {hasDropdown && (
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-[350ms]
                                ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                  isExpanded
                                    ? "grid-rows-[1fr] opacity-100"
                                    : "grid-rows-[0fr] opacity-0"
                                }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pl-6 pr-4 pb-2.5 flex flex-col gap-1.5 bg-[#eef4fb]/40">
                        {item.dropdown!.map((sub) => (
                          <Link
                            key={sub.to + sub.label}
                            to={sub.to}
                            onClick={() => {
                              setMobileOpen(false);
                              setExpandedMobileItem(null);
                            }}
                            className="px-3 py-2 text-[15px] font-semibold text-[#1E3A6E] border-l-2 border-[#1E3A6E]/20 hover:border-[#1E3A6E] hover:text-[#4A7BC4] transition-all"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>,
            ];
            if (item.label === "Blog") {
              nodes.push(
                <div
                  key="mobile-coupons"
                  className={`flex flex-col border-b border-gray-50 last:border-b-0
                              transition-[opacity,transform] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                              ${
                                mobileOpen
                                  ? "opacity-100 translate-y-0"
                                  : "opacity-0 -translate-y-2"
                              }`}
                  style={{ transitionDelay: mobileOpen ? `${80 + (idx + 0.5) * 35}ms` : "0ms" }}
                >
                  <Link
                    to="/coupons"
                    onClick={() => {
                      setMobileOpen(false);
                      setExpandedMobileItem(null);
                    }}
                    className="flex-1 px-4 py-3 text-[17px] font-bold text-[#1E3A6E] rounded-lg
                               hover:bg-[#1E3A6E]/5 transition-all duration-200"
                    activeProps={{ className: "!bg-[#1E3A6E]/10 !text-[#4A7BC4]" }}
                  >
                    Coupons
                  </Link>
                </div>,
              );
            }
            return nodes;
          })}
          <a
            href={opts.phone_href}
            className={`mt-2 flex items-center justify-center gap-2 rounded-xl px-4 py-3.5
                       text-base font-bold text-white shadow-md
                       transition-[opacity,transform] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                       ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
            style={{
              background: "linear-gradient(135deg,#1E3A6E 0%,#2d5fa8 100%)",
              transitionDelay: mobileOpen ? `${80 + NAV.length * 35}ms` : "0ms",
            }}
          >
            <Phone className="size-4" />
            {opts.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
