import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Home, Info, MapPin, Wrench, CalendarCheck, X, Search } from "lucide-react";

/* ── Plumbing services list (used by the bottom-sheet) ──────────────────── */
const PLUMBING_SERVICES: { to: string; label: string }[] = [
  { to: "/residential", label: "Residential Plumbing" },
  { to: "/commercial", label: "Commercial Plumbing" },
  { to: "/services/drain-cleaning", label: "Drain Cleaning & Hydro Jetting" },
  { to: "/services/plumbing/emergency-plumber", label: "Emergency Plumber" },
  { to: "/services/plumbing/garbage-disposals", label: "Garbage Disposals" },
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
  { to: "/services/plumbing/bathtub-installation", label: "Bathtub Installation" },
  { to: "/services/plumbing/septic-tank-service", label: "Septic Tank Service" },
  { to: "/services/plumbing/fixture-replacement", label: "Fixture Replacement" },
  { to: "/services/plumbing/outdoor-faucet-repair", label: "Outdoor Faucet Repair" },
  { to: "/services/plumbing/pipe-replacement", label: "Pipe Replacement" },
  { to: "/services/plumbing/water-filtration", label: "Water Filtration Installation" },
  { to: "/services/plumbing/slab-leak-repair", label: "Slab Leak Repair" },
];

export function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault();
    const scrollToForm = () => {
      const el = document.getElementById("book-now");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (location.pathname === "/") {
      scrollToForm();
    } else {
      navigate({ to: "/" });
      setTimeout(scrollToForm, 350);
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PLUMBING_SERVICES;
    return PLUMBING_SERVICES.filter((s) => s.label.toLowerCase().includes(q));
  }, [search]);

  /* Lock body scroll while the sheet is open, and focus the search field */
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (servicesOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => searchRef.current?.focus(), 260);
      return () => {
        document.body.style.overflow = prev;
        clearTimeout(t);
      };
    }
  }, [servicesOpen]);

  /* Close the sheet on route change */
  useEffect(() => {
    setServicesOpen(false);
    setSearch("");
  }, [location.pathname]);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <>
      {/* ── Services bottom-sheet ─────────────────────────────────────────── */}
      <div
        className={`lg:hidden fixed inset-0 z-[70] transition-opacity duration-300 ${
          servicesOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!servicesOpen}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label="Close services menu"
          onClick={() => setServicesOpen(false)}
          className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        />

        {/* Sheet */}
        <div
          className={`app-mbn-sheet absolute bottom-0 left-0 right-0 max-h-[78vh] flex flex-col
                      bg-white shadow-[0_-12px_40px_rgba(0,0,0,0.4)]
                      transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                      ${servicesOpen ? "translate-y-0" : "translate-y-full"}`}
        >
          {/* Drag handle */}
          <div className="flex items-center justify-center pt-3 pb-1">
            <span className="app-mbn-handle h-1.5 w-12 bg-[#1E3A6E]/25" />
          </div>

          {/* Sticky header + search */}
          <div className="app-mbn-sheet sticky top-0 bg-white px-5 pt-2 pb-4 border-b border-[#1E3A6E]/10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[19px] font-extrabold text-[#1E3A6E]">Plumbing Services</h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setServicesOpen(false)}
                className="app-mbn-close inline-flex items-center justify-center size-9 bg-[#1E3A6E]/8 hover:bg-[#1E3A6E]/15 text-[#1E3A6E] active:scale-95 transition-all"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#1E3A6E]/55" />
              <input
                ref={searchRef}
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services…"
                className="app-mbn-search w-full pl-9 pr-3 py-2.5 border-2 border-[#1E3A6E]/20 bg-[#f7f9fc]
                           text-[15px] font-medium text-[#1E3A6E] placeholder:text-[#1E3A6E]/45
                           focus:outline-none focus:border-[#1E3A6E] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-2 pb-6">
            {filtered.length === 0 ? (
              <p className="text-center text-[14px] text-[#1E3A6E]/55 py-10">
                No services match "{search}"
              </p>
            ) : (
              <ul className="divide-y divide-[#1E3A6E]/8">
                {filtered.map((s) => (
                  <li key={s.to}>
                    <Link
                      to={s.to}
                      onClick={() => setServicesOpen(false)}
                      className="flex items-center gap-3 px-3 py-3.5 rounded-lg
                                 active:bg-[#1E3A6E]/8 transition-colors"
                    >
                      <span className="size-2 rounded-full bg-[#F5C842] shrink-0" />
                      <span className="text-[15px] font-bold text-[#1E3A6E] leading-tight">
                        {s.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom nav bar (edge-to-edge, pointy corners) ────────────────── */}
      <nav
        aria-label="Primary mobile navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-[65]
                   px-2 pt-2 pb-2
                   bg-[#0f2246]/95 backdrop-blur-xl
                   shadow-[0_-6px_24px_-4px_rgba(0,0,0,0.5)]
                   border-t border-white/10"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.5rem)" }}
      >
        <div className="grid grid-cols-5 items-end relative">
          <NavBtn to="/" label="Home" active={location.pathname === "/"} Icon={Home} />
          <NavBtn
            to="/service-area"
            label="Areas"
            active={isActive("/service-area")}
            Icon={MapPin}
          />

          {/* Center: Book Now CTA — scrolls to hero form */}
          <button
            type="button"
            onClick={handleBookNow}
            aria-label="Book now"
            className="app-mbn-call relative -mt-7 mx-auto flex flex-col items-center justify-center
                       size-[64px] text-white
                       active:scale-95 transition-transform duration-200
                       shadow-[0_8px_22px_-4px_rgba(74,123,196,0.65)]
                       ring-4 ring-[#0f2246]"
            style={{
              background: "linear-gradient(135deg,#1E3A6E 0%,#3a6cb8 45%,#6B9FE4 100%)",
            }}
          >
            <CalendarCheck className="size-6" strokeWidth={2.4} />
            <span className="sr-only">Book now</span>
            {/* pulse ring */}
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                animation: "appPulse 2.4s ease-out infinite",
                boxShadow: "0 0 0 0 rgba(107,159,228,0.5)",
              }}
            />
          </button>

          <NavBtn to="/about" label="About" active={isActive("/about")} Icon={Info} />
          <NavBtn
            as="button"
            label="Services"
            active={servicesOpen || isActive("/services/plumbing")}
            Icon={Wrench}
            onClick={() => setServicesOpen((s) => !s)}
            ariaExpanded={servicesOpen}
          />
        </div>
      </nav>
    </>
  );
}

/* ── Tiny inner button ──────────────────────────────────────────────────── */
type IconCmp = React.ComponentType<{ className?: string; strokeWidth?: number }>;

function NavBtn(props: {
  to?: string;
  as?: "button";
  label: string;
  active: boolean;
  Icon: IconCmp;
  onClick?: (e: React.MouseEvent) => void;
  ariaExpanded?: boolean;
}) {
  const { to, as, label, active, Icon, onClick, ariaExpanded } = props;

  const inner = (
    <span className="flex flex-col items-center justify-center gap-1 py-1.5 px-1">
      <Icon
        className={`size-[22px] transition-all duration-200 ${
          active
            ? "text-white scale-110"
            : "text-white/60 group-active:scale-95 group-hover:text-white/85"
        }`}
        strokeWidth={active ? 2.4 : 2}
      />
      <span
        className={`text-[11px] leading-none tracking-wide transition-colors ${
          active ? "font-bold text-white" : "font-semibold text-white/55"
        }`}
      >
        {label}
      </span>
      {/* Active indicator: gold underline pill */}
      <span
        className={`app-mbn-pill absolute -bottom-[5px] h-[3px] w-7 bg-[#F5C842]
                    transition-all duration-300 ${
                      active ? "opacity-100 scale-100" : "opacity-0 scale-50"
                    }`}
      />
    </span>
  );

  if (as === "button") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-expanded={ariaExpanded}
        aria-label={label}
        className="group relative flex items-center justify-center active:scale-95 transition-transform"
      >
        {inner}
      </button>
    );
  }

  return (
    <Link
      to={to!}
      aria-label={label}
      className="group relative flex items-center justify-center active:scale-95 transition-transform"
    >
      {inner}
    </Link>
  );
}
