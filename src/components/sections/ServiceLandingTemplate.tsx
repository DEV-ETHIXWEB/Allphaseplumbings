import { Check, Phone } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Badges } from "@/components/sections/Badges";
import { GoogleReviewsMarquee } from "@/components/sections/GoogleReviewsMarquee";
import { TeamSection } from "@/components/sections/TeamSection";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { CTABanner } from "@/components/sections/CTABanner";
import { useSiteOptions } from "@/hooks/use-site-options";
import type { ServiceLandingContent } from "@/data/service-landing";

/* ── The single "about this service" intro section, in the home design
   language (navy headings, gold accent, Poppins). ── */
function ServiceIntro({ content }: { content: ServiceLandingContent }) {
  const opts = useSiteOptions();
  return (
    <section className="relative bg-white py-16 sm:py-20 overflow-hidden">
      {/* subtle dot-grid backdrop, same as the About intro */}
      <div
        className="absolute top-10 right-0 w-64 h-64 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #1E3A6E 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto px-4 max-w-[1305px]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── LEFT: copy + highlights + CTA ── */}
          <div>
            <span className="inline-block text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-[#4A7BC4] mb-3">
              {content.introEyebrow}
            </span>

            <h2
              className="text-[30px] sm:text-[40px] font-black text-[#1E3A6E] leading-[1.1]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {content.introHeading}
            </h2>

            <div className="mt-5 w-16 h-1.5 rounded-full bg-[#F5C842]" />

            {content.introParagraphs.map((p, i) => (
              <p key={i} className="mt-6 text-[15px] sm:text-[17px] text-gray-600 leading-relaxed">
                {p}
              </p>
            ))}

            {/* highlight checklist */}
            <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
              {content.introHighlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span
                    className="inline-flex items-center justify-center size-7 rounded-lg text-white shrink-0 shadow-sm"
                    style={{ background: "linear-gradient(135deg,#1E3A6E,#4A7BC4)" }}
                  >
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  <span className="text-[14.5px] font-semibold text-[#1E3A6E] leading-snug">
                    {h}
                  </span>
                </li>
              ))}
            </ul>

            {/* phone CTA */}
            <div className="mt-10">
              <a
                href={opts.phone_href}
                className="group relative inline-flex items-center gap-3 overflow-hidden
                           rounded-xl px-7 py-4 text-white font-extrabold tracking-wide
                           shadow-[0_10px_25px_-8px_rgba(30,58,110,0.55)]
                           hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-8px_rgba(30,58,110,0.65)]
                           active:scale-[0.98] transition-all duration-200"
                style={{ background: "linear-gradient(135deg,#1E3A6E 0%,#2d5fa8 60%,#4A7BC4 100%)" }}
              >
                <span className="absolute inset-y-0 -left-1 w-1.5 bg-[#F5C842]" aria-hidden="true" />
                <span className="inline-flex items-center justify-center size-9 rounded-full bg-[#F5C842] text-[#1E3A6E] shadow-inner shrink-0 group-hover:rotate-[18deg] transition-transform duration-300">
                  <Phone className="size-4.5" strokeWidth={3} />
                </span>
                <span className="flex flex-col leading-tight text-left">
                  <span className="text-[10px] uppercase tracking-[0.22em] opacity-80">
                    Call us 24/7
                  </span>
                  <span className="text-[19px] font-black">{opts.phone}</span>
                </span>
              </a>
            </div>
          </div>

          {/* ── RIGHT: framed service photo (navy border + gold corners) ── */}
          <div className="relative flex items-center justify-center order-first lg:order-last">
            <div
              className="absolute inset-0 rounded-3xl border-[3px] border-[#1E3A6E]/30 pointer-events-none"
              style={{ transform: "translate(14px, 14px)" }}
              aria-hidden="true"
            />
            <div
              className="absolute -top-1 -left-1 w-14 h-14 border-t-[5px] border-l-[5px] border-[#F5C842] rounded-tl-3xl z-20"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-1 -right-1 w-14 h-14 border-b-[5px] border-r-[5px] border-[#F5C842] rounded-br-3xl z-20"
              aria-hidden="true"
            />
            <div
              className="relative w-full rounded-3xl overflow-hidden bg-slate-50
                         shadow-[0_25px_60px_-15px_rgba(30,58,110,0.45)]
                         border-[6px] border-[#1E3A6E]
                         aspect-[1.45] sm:aspect-[1.55] group"
            >
              <img
                src={content.introImage}
                alt={`All Phase Plumbing ${content.name} in Seattle`}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                loading="lazy"
                decoding="async"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(30,58,110,0.35), transparent)" }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Home-page-style service landing page. Same component stack and order as the
 * real home page, with a service-specific hero and one intro section inserted
 * right after it. Reuses every other home section verbatim.
 */
export function ServiceLandingTemplate({ content }: { content: ServiceLandingContent }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero
          badge={content.name}
          taglinesPc={content.heroTaglinesPc}
          taglinesMobile={content.heroTaglinesMobile}
          subtitle={content.heroSubtitle}
        />
        <ServiceIntro content={content} />
        <Services />
        <WhyUs />
        <Badges />
        <TeamSection />
        <GoogleReviewsMarquee />
        <CTABanner />
        <ServiceArea />
        <BlogPreview />
      </main>
      <Footer />
    </div>
  );
}
