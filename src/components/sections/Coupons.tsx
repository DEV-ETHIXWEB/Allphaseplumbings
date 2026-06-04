import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import coupon1 from "@/assets/coupon-1.svg";
import coupon2 from "@/assets/coupon-2.svg";
import coupon3 from "@/assets/coupon-3.svg";

const COUPONS = [
  { src: coupon1, alt: "$100 OFF on your next drain cleaning" },
  { src: coupon2, alt: "10% OFF on all drain cleaning services" },
  { src: coupon3, alt: "FREE follow up camera inspection with drain cleaning" },
] as const;

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
              className="inline-flex items-center gap-1.5 text-[28px] font-semibold text-primary hover:text-accent"
            >
              View All Offers <ArrowRight className="size-7" />
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {COUPONS.map((c) => (
            <Link
              key={c.alt}
              to="/coupons"
              className="block rounded-xl overflow-hidden shadow-md hover:shadow-[0_8px_30px_rgba(30,58,110,0.25)] hover:-translate-y-1 transition-all duration-300"
            >
              <img src={c.src} alt={c.alt} className="w-full h-auto block" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
