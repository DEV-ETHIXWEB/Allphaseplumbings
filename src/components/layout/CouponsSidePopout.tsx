import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Tag } from "lucide-react";
import coupon1 from "@/assets/coupon-1.svg";
import coupon2 from "@/assets/coupon-2.svg";
import coupon3 from "@/assets/coupon-3.svg";

const COUPON_IMAGES = [
  { src: coupon1, alt: "$100 OFF on your next drain cleaning" },
  { src: coupon2, alt: "10% OFF on all drain cleaning services" },
  { src: coupon3, alt: "FREE follow up camera inspection with drain cleaning" },
] as const;

const PANEL_WIDTH = 260;

/**
 * Right-edge drawer. Tab is tightly sized around the "COUPONS" label and
 * tag icon. The whole assembly slides offscreen to the right when closed,
 * leaving only the tab hugging the right edge.
 *
 * The drawer also hides itself entirely when the on-page Homeowner Coupons
 * section enters the viewport (no need to advertise a shortcut when the
 * user is already looking at the offers) — it reappears once that section
 * leaves the viewport.
 *
 * Hidden entirely when navigating to /coupons.
 */
export function CouponsSidePopout() {
  const [open, setOpen] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // The section element only exists on pages that render the Coupons
    // component (home + /coupons). When absent we just stay visible.
    const target = document.getElementById("homeowner-coupons");
    if (!target) {
      setSectionVisible(false);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    obs.observe(target);
    return () => obs.disconnect();
  }, [location.pathname]);

  if (location.pathname.startsWith("/coupons")) return null;

  return (
    <div
      className="fixed right-0 top-1/2 z-[60] hidden lg:flex items-stretch"
      style={{
        transform: `translate(${open ? 0 : PANEL_WIDTH}px, -50%)`,
        transition: "transform 300ms ease-out, opacity 250ms ease-out",
        opacity: sectionVisible ? 0 : 1,
        pointerEvents: sectionVisible ? "none" : "auto",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Tab — vertical pill, attached to the left side of the panel.
          Icon at the top, "Coupons" label running top-to-bottom below. */}
      <div className="self-center">
        <Link
          to="/coupons"
          aria-label="View coupons"
          className="relative flex flex-col items-center justify-center gap-3 py-6 px-3
                     bg-[#1E3A6E] text-white rounded-l-md shadow-[-6px_0_18px_-4px_rgba(0,0,0,0.35)]
                     hover:bg-[#162e58] transition-colors"
        >
          <Tag className="size-6 shrink-0" aria-hidden="true" />
          <span
            className="font-bold tracking-[0.3em] text-[18px] uppercase leading-none"
            style={{ writingMode: "vertical-rl" }}
          >
            Coupons
          </span>
        </Link>
      </div>

      {/* Panel — sits to the RIGHT of the tab, pinned to viewport right edge */}
      <div
        className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-2.5"
        style={{ width: PANEL_WIDTH }}
      >
        <div className="flex flex-col gap-2">
          {COUPON_IMAGES.map((c) => (
            <Link
              key={c.alt}
              to="/coupons"
              className="block rounded-md overflow-hidden hover:scale-[1.02] transition-transform"
            >
              <img src={c.src} alt={c.alt} className="w-full h-auto block" />
            </Link>
          ))}
          <Link
            to="/coupons"
            className="mt-0.5 inline-flex items-center justify-center gap-1.5 text-center text-[11px] font-extrabold text-[#1E3A6E] uppercase tracking-widest hover:text-[#4A7BC4] transition-colors"
          >
            View All Coupons <Tag className="size-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
