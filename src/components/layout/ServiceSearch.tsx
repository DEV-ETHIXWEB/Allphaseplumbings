import { useState, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Home, Building2, ArrowRight } from "lucide-react";

/**
 * Compact site search that lets visitors type "commercial", "residential", or a
 * service name and jump straight to the matching landing page. Residential and
 * Commercial are surfaced first since those are the two primary paths people
 * search for. Lives in the desktop top bar; the mobile services sheet has its
 * own search.
 */
type SearchItem = {
  label: string;
  to: string;
  keywords: string;
  primary?: boolean;
};

const INDEX: SearchItem[] = [
  {
    label: "Residential Plumbing",
    to: "/residential",
    keywords: "residential home house homeowner houses apartment condo townhome",
    primary: true,
  },
  {
    label: "Commercial Plumbing",
    to: "/commercial",
    keywords: "commercial business office restaurant building industrial property",
    primary: true,
  },
  {
    label: "Drain Cleaning & Hydro Jetting",
    to: "/services/drain-cleaning",
    keywords: "drain cleaning hydro jetting clog clogged snake rooter",
  },
  {
    label: "Emergency Plumber",
    to: "/services/plumbing/emergency-plumber",
    keywords: "emergency 24/7 burst pipe flooding backup urgent",
  },
  {
    label: "Water Heaters",
    to: "/services/water-heaters",
    keywords: "water heater tankless hot water tank",
  },
  {
    label: "Sewer Services",
    to: "/services/sewer-services",
    keywords: "sewer camera inspection line repair replacement trenchless",
  },
  {
    label: "Leak Detection",
    to: "/services/plumbing/leak-detection",
    keywords: "leak detection slab hidden water",
  },
  {
    label: "Repiping",
    to: "/services/repiping",
    keywords: "repipe repiping pipe replacement copper pex",
  },
  {
    label: "Gas Line Services",
    to: "/services/gas-line-repair",
    keywords: "gas line repair installation leak",
  },
];

export function ServiceSearch({ className = "" }: { className?: string }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return INDEX.filter((i) => i.primary);
    return INDEX.filter(
      (i) => i.label.toLowerCase().includes(q) || i.keywords.includes(q),
    );
  }, [query]);

  // Keep the highlighted row in range as results change.
  useEffect(() => {
    setActive(0);
  }, [query]);

  // Close on outside click.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const go = (to: string) => {
    setOpen(false);
    setQuery("");
    navigate({ to });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      const r = results[active];
      if (r) go(r.to);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapRef} className={`relative w-full max-w-[260px] ${className}`}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/70" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search: residential or commercial…"
          aria-label="Search residential or commercial services"
          className="w-full rounded-md border border-white/25 bg-white/10 py-2 pl-9 pr-3 text-[14px]
                     font-medium text-white placeholder:text-white/60 backdrop-blur-sm
                     transition-colors focus:border-white/60 focus:bg-white/15 focus:outline-none"
        />
      </div>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-1 w-[300px] max-w-[calc(100vw-32px)]
                     overflow-hidden rounded-b-xl border-2 border-[#1E3A7B] bg-white
                     shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
        >
          {!query.trim() && (
            <p className="px-4 pt-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-[#1E3A6E]/50">
              Choose your service type
            </p>
          )}
          {results.length === 0 ? (
            <p className="px-4 py-4 text-[14px] text-[#1E3A6E]/60">
              No services match “{query}”.
            </p>
          ) : (
            <ul className="py-1">
              {results.map((r, i) => {
                const Icon =
                  r.to === "/residential" ? Home : r.to === "/commercial" ? Building2 : ArrowRight;
                return (
                  <li key={r.to}>
                    <Link
                      to={r.to}
                      onClick={() => go(r.to)}
                      onMouseEnter={() => setActive(i)}
                      className={`flex items-center gap-3 px-4 py-2.5 text-[15px] font-bold text-[#1E3A6E] transition-colors ${
                        i === active ? "bg-[#1E3A6E]/8" : "hover:bg-[#1E3A6E]/8"
                      }`}
                    >
                      <Icon className="size-4 shrink-0 text-[#4A7BC4]" />
                      <span>{r.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
