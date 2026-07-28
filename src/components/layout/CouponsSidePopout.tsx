import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Tag, X } from "lucide-react";
import { CouponCard } from "@/components/sections/CouponCard";
import { COUPONS } from "@/data/coupons";
import { isCommercialPath } from "@/lib/page-type";

const PANEL_WIDTH = 334;

/**
 * Right-edge drawer. Tab is tightly sized around the "COUPONS" label and
 * tag icon. The whole assembly slides offscreen to the right when closed,
 * leaving only the tab hugging the right edge.
 *
 * The drawer also hides itself entirely when the on-page Homeowner Coupons
 * section enters the viewport (no need to advertise a shortcut when the
 * user is already looking at the offers), it reappears once that section
 * leaves the viewport.
 *
 * Hidden entirely when navigating to /coupons, and on commercial-facing pages
 * (these are new-residential-customer offers — see isCommercialPath).
 */
export function CouponsSidePopout() {
  const [open, setOpen] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The section element only exists on pages that render the Coupons
    // component (home + /coupons). When absent we just stay visible.
    const target = document.getElementById("homeowner-coupons");
    if (!target) {
      setSectionVisible(false);
      return;
    }
    const obs = new IntersectionObserver(([entry]) => setSectionVisible(entry.isIntersecting), {
      threshold: 0,
    });
    obs.observe(target);
    return () => obs.disconnect();
  }, [location.pathname]);

  // Hover to reveal only works with a mouse. On touch/no-hover devices the tab
  // becomes a tap toggle instead (see the tab's onClick and the gated hover
  // handlers below), so we detect the input type once on mount.
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none), (pointer: coarse)").matches);
  }, []);

  // While open, dismiss on an outside tap/click or Escape. Touch devices fire a
  // synthetic event that OPENS the drawer but never a reliable one that closes
  // it, so without this the drawer gets stuck open with no way to dismiss it.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: Event) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (location.pathname.startsWith("/coupons")) return null;
  if (isCommercialPath(location.pathname)) return null;

  // The container is as tall as the coupons panel while the tab is only
  // self-center height, so it must stay inert: otherwise the empty strip above
  // and below the tab would open the drawer (and block clicks underneath).
  // Only the tab and the panel opt back in. The hover handlers can stay on the
  // container because React derives mouseenter/leave from the real target's
  // ancestor chain, so moving tab -> panel never fires a leave.
  const childPointerEvents = sectionVisible ? "none" : "auto";

  return (
    <div
      ref={containerRef}
      className="fixed right-0 top-1/2 z-[75] flex items-stretch"
      style={{
        transform: `translate(${open ? 0 : PANEL_WIDTH}px, -50%)`,
        transition: "transform 300ms ease-out, opacity 250ms ease-out",
        opacity: sectionVisible ? 0 : 1,
        pointerEvents: "none",
      }}
      onMouseEnter={isTouch ? undefined : () => setOpen(true)}
      onMouseLeave={isTouch ? undefined : () => setOpen(false)}
      onFocus={isTouch ? undefined : () => setOpen(true)}
      onBlur={
        isTouch
          ? undefined
          : (e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
            }
      }
    >
      {/* Tab, vertical pill, attached to the left side of the panel.
          Icon at the top, "Coupons" label running top-to-bottom below. */}
      <div className="self-center" style={{ pointerEvents: childPointerEvents }}>
        <Link
          to="/coupons"
          aria-label={isTouch ? (open ? "Hide coupons" : "Show coupons") : "View coupons"}
          aria-expanded={isTouch ? open : undefined}
          onClick={(e) => {
            // Touch/no-hover devices can't hover to preview, so the tab toggles
            // the drawer open/closed instead of navigating. Users still reach
            // the full page via the coupon cards or "View All Coupons" below.
            if (isTouch) {
              e.preventDefault();
              setOpen((o) => !o);
            }
          }}
          className="relative flex flex-col items-center justify-center gap-[8px] py-[17px] px-[8px]
                     bg-[#1E3A6E] text-white rounded-l-md shadow-[-6px_0_18px_-4px_rgba(0,0,0,0.35)]
                     hover:bg-[#162e58] transition-colors"
        >
          <Tag className="size-[17px] shrink-0" aria-hidden="true" />
          <span
            className="font-bold tracking-[0.3em] text-[13px] uppercase leading-none"
            style={{ writingMode: "vertical-rl" }}
          >
            Coupons
          </span>
        </Link>
      </div>

      {/* Panel, sits to the RIGHT of the tab, pinned to viewport right edge */}
      <div
        className="relative bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-4 pt-11 lg:pt-4"
        style={{
          width: PANEL_WIDTH,
          pointerEvents: childPointerEvents,
          ["--coupon-notch-bg" as string]: "#ffffff",
        }}
      >
        {/* Mobile-only close affordance. Touch devices never fire a hover-out,
            so without a visible control the drawer looks stuck open. Desktop
            still closes on mouse-leave and doesn't need this. */}
        {open && (
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close coupons"
            className="lg:hidden absolute right-2 top-2 z-10 inline-flex size-8 items-center justify-center
                       bg-[#1E3A6E] text-white shadow-md transition-transform active:scale-95"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        )}

        <div className="flex flex-col gap-3">
          {COUPONS.map((c) => (
            <Link
              key={c.alt}
              to="/coupons"
              aria-label={c.alt}
              className="block overflow-hidden hover:scale-[1.02] transition-transform"
            >
              <CouponCard {...c} />
            </Link>
          ))}
          <Link
            to="/coupons"
            className="mt-1 inline-flex items-center justify-center gap-2 text-center text-[14px] font-extrabold text-[#1E3A6E] uppercase tracking-widest hover:text-[#4A7BC4] transition-colors"
          >
            View All Coupons <Tag className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
