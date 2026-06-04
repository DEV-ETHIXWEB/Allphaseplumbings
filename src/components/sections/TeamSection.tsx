import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { TeamSlideshow } from "@/components/ui/TeamSlideshow";
import { useSiteOptions } from "@/hooks/use-site-options";

export function TeamSection() {
  const opts = useSiteOptions();

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Subtle diagonal accent strip behind right column */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[45%] pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #f0f5ff 0%, #e4edfa 100%)",
          clipPath: "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
        aria-hidden="true"
      />

      {/* Decorative dot grid top-left */}
      <div
        className="absolute top-0 left-0 w-48 h-48 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, #1E3A6E 1.5px, transparent 1.5px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* ── LEFT: text ── */}
          <div>
            <span className="inline-block text-2xl font-bold uppercase tracking-widest text-[#4A7BC4] mb-3">
              {opts.team_eyebrow}
            </span>

            <h2
              className="text-4xl sm:text-5xl font-black text-[#1E3A6E] leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {opts.team_heading}{" "}
              <span className="font-display-italic text-[#4A7BC4]">{opts.team_italic}</span>
            </h2>

            {/* Gold accent line */}
            <div className="mt-5 w-14 h-1.5 rounded-full bg-[#F5C842]" />

            <p className="mt-5 text-[17px] text-gray-600 leading-relaxed max-w-lg">
              {opts.team_body}
            </p>

            <ul className="mt-7 space-y-3.5">
              {opts.team_points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center size-6 rounded-full bg-[#1E3A6E] text-white shrink-0 mt-0.5">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-[16px] text-gray-700 font-medium">{p}</span>
                </li>
              ))}
            </ul>

            {/* CTA button, matches reference */}
            <Link
              to="/about"
              className="mt-10 inline-flex items-center justify-center px-10 py-4
                         text-sm font-extrabold text-white tracking-widest uppercase
                         rounded-lg shadow-lg hover:opacity-90 hover:-translate-y-0.5
                         active:scale-[0.98] transition-all duration-200"
              style={{ background: "linear-gradient(135deg, #1E3A6E 0%, #2d5fa8 100%)" }}
            >
              Read More
            </Link>
          </div>

          {/* ── RIGHT: styled slideshow ── */}
          <div className="relative flex items-center justify-center">
            {/* Outer decorative frame, offset navy border */}
            <div
              className="absolute inset-0 rounded-2xl border-2 border-[#1E3A6E]/25"
              style={{ transform: "translate(10px, 10px)" }}
              aria-hidden="true"
            />

            {/* Gold corner accent */}
            <div
              className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#F5C842] rounded-tl-2xl z-10"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#F5C842] rounded-br-2xl z-10"
              aria-hidden="true"
            />

            {/* The slideshow */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(30,58,110,0.22)]">
              <TeamSlideshow />
            </div>

            {/* Floating badge, "35+ Years" */}
            <div
              className="absolute -bottom-5 -left-5 z-20 flex items-center gap-3
                         bg-white rounded-xl px-4 py-3 shadow-[0_8px_32px_rgba(30,58,110,0.18)]
                         border border-[#1E3A6E]/10
                         scale-[1.15] origin-bottom-left"
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full text-white text-lg font-black shrink-0"
                style={{ background: "linear-gradient(135deg,#1E3A6E,#4A7BC4)" }}
              >
                ✓
              </div>
              <div>
                <div className="text-sm font-black text-[#1E3A6E] leading-none">35+ Years</div>
                <div className="text-xs text-gray-500 mt-0.5">Trusted in Seattle</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
