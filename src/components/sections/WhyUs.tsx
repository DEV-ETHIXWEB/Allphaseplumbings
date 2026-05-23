import { resolveIcon } from "@/lib/icon-map";
import { useSiteOptions } from "@/hooks/use-site-options";
import Particles from "@/components/ui/Particles";

export function WhyUs() {
  const opts = useSiteOptions();

  return (
    <section className="relative py-20 bg-[#1E3A6E] overflow-hidden">
      {/* ── Particle background ── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Particles
          particleCount={650}
          particleSpread={20}
          speed={1}
          particleBaseSize={300}
          sizeRandomness={1.2}
          alphaParticles={true}
          cameraDistance={22}
          disableRotation={true}
          moveParticlesOnHover={false}
          particleColors={["#ffffff"]}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block text-[24px] font-bold uppercase tracking-widest text-[#6B9FE4] mb-3">
            {opts.why_us_eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            {opts.why_us_heading}{" "}
            <span className="font-display-italic text-[#F5C842]">{opts.why_us_italic}</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-x-10 lg:gap-y-10">
          {opts.why_us_reasons.map((r) => {
            const Icon = resolveIcon(r.icon);
            return (
              <div
                key={r.title}
                className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-4 p-4 lg:p-0 rounded-xl lg:rounded-none bg-white/5 lg:bg-transparent border border-white/10 lg:border-none hover:bg-white/10 lg:hover:bg-transparent transition-all duration-300"
              >
                {/* Icon bubble */}
                <div className="shrink-0 inline-flex items-center justify-center size-12 rounded-full bg-[#5B9BD5]/20 text-[#5B9BD5]">
                  <Icon className="size-6" />
                </div>
                <div>
                  <h3
                    className="font-extrabold text-lg lg:text-2xl text-white mb-2 leading-snug"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {r.title}
                  </h3>
                  <p className="text-xs lg:text-lg text-white/70 leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
