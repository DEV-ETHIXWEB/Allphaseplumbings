import { Link } from "@tanstack/react-router";
import { Camera, Wrench, Percent, ArrowRight } from "lucide-react";
import GlareHover from "@/components/ui/GlareHover";

const COUPONS = [
  {
    value: "FREE",
    icon: Camera,
    title: "Free Camera Inspection",
    desc: "With any qualifying drain cleaning service.",
    code: "APP-CAM",
  },
  {
    value: "$100",
    icon: Wrench,
    title: "$100 Off Drain Cleaning",
    desc: "Save $100 on residential drain cleaning service.",
    code: "APP-100",
  },
  {
    value: "10%",
    icon: Percent,
    title: "10% Off Service Call",
    desc: "Up to $100 off your next plumbing service call.",
    code: "APP-10",
  },
] as const;

export function Coupons({ hideHeader = false }: { hideHeader?: boolean } = {}) {
  return (
    <section className={`${hideHeader ? "py-10" : "py-20"} bg-secondary/40`}>
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

        {/* grid — on mobile stack, tablet+ 3 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {COUPONS.map((c) => (
            /*
              Outer wrapper: overflow-visible so the circular notches can
              bleed outside, flex-col so GlareHover stretches to full height.
            */
            <div key={c.code} className="relative flex flex-col h-[220px]">
              {/* Left circular notch */}
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-secondary/60 z-20 border border-[#1E3A7B]/20" />
              {/* Right circular notch */}
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-secondary/60 z-20 border border-[#1E3A7B]/20" />

              <GlareHover
                width="100%"
                height="100%"
                background="transparent"
                borderRadius="0.75rem"
                borderColor="transparent"
                glareColor="#94a3b8"
                glareOpacity={0.18}
                glareAngle={-45}
                glareSize={300}
                transitionDuration={650}
                className="flex-1 shadow-md hover:shadow-[0_8px_30px_rgba(30,58,110,0.25)] hover:-translate-y-1 transition-all duration-300"
                style={{ border: "2px solid #1E3A7B", borderRadius: "0.75rem" }}
              >
                {/* Ticket row — self-stretch overrides GlareHover's grid place-items-center so all cards fill the fixed height equally */}
                <div className="w-full h-full flex self-stretch">
                  {/* Left stub — navy, 30% width */}
                  <div className="flex flex-col items-center justify-center w-[30%] bg-[#1E3A6E] px-3 border-r-2 border-dashed border-white/40 shrink-0 self-stretch">
                    <c.icon className="size-7 text-white mb-2" />
                    <span className="text-2xl font-black text-white leading-none tracking-tight">
                      {c.value}
                    </span>
                  </div>

                  {/* Right body — white, 70% width */}
                  <div className="flex-1 bg-white py-4 px-4 flex flex-col justify-center self-stretch">
                    <h3 className="font-bold text-gray-900 text-[17px] leading-snug">{c.title}</h3>
                    <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">{c.desc}</p>
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs font-mono px-2 py-1 rounded mt-2 w-fit">
                      {c.code}
                    </span>
                    <Link
                      to="/coupons"
                      className="inline-flex items-center gap-1 text-[#F5C842] font-semibold text-sm mt-2 hover:gap-2 transition-all"
                    >
                      CLAIM OFFER <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </GlareHover>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
