import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CouponCard, type CouponCardProps } from "./CouponCard";

const COUPONS: (CouponCardProps & { alt: string })[] = [
  {
    headline: "$100",
    headlineSuffix: "OFF",
    description: "On Your Next Drain Cleaning",
    alt: "$100 OFF on your next drain cleaning",
  },
  {
    headline: "10%",
    headlineSuffix: "OFF",
    description: "On All Drain Cleaning Services",
    alt: "10% OFF on all drain cleaning services",
  },
  {
    headline: "FREE",
    description: "Follow-Up Camera Inspection with Drain Cleaning",
    alt: "FREE follow up camera inspection with drain cleaning",
  },
];

export function Coupons({ hideHeader = false }: { hideHeader?: boolean } = {}) {
  return (
    <section
      id="homeowner-coupons"
      data-coupons-section
      className={`${hideHeader ? "py-10" : "py-20"} bg-secondary/40`}
    >
      <div className="container mx-auto px-4">
        {!hideHeader && (
          <div className="flex flex-col items-center text-center gap-4 mb-12">
            <div>
              <span className="inline-block text-[24px] font-semibold uppercase tracking-widest text-accent mb-3">
                Homeowner Coupons
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                Save more on your <span className="font-display-italic text-accent">next visit.</span>
              </h2>
            </div>
            <Link
              to="/coupons"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-[22px] sm:text-[26px]
                         shadow-[0_8px_20px_-6px_rgba(30,58,110,0.55)]
                         hover:shadow-[0_12px_28px_-6px_rgba(30,58,110,0.7)]
                         hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #1E3A6E 0%, #6B9FE4 100%)",
                border: "2px solid #1E3A6E",
              }}
            >
              View All Offers <ArrowRight className="size-6 sm:size-7" />
            </Link>
          </div>
        )}

        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {COUPONS.map((c) => (
            <Link
              key={c.alt}
              to="/coupons"
              aria-label={c.alt}
              className="block overflow-hidden hover:shadow-[0_8px_30px_rgba(30,58,110,0.25)] hover:-translate-y-1 transition-all duration-300"
            >
              <CouponCard {...c} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
