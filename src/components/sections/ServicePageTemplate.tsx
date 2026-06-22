import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Phone,
  Plus,
  ChevronRight,
  BadgeCheck,
  Award,
  ShieldCheck,
  CalendarCheck,
  Tag,
} from "lucide-react";
import { useSiteOptions } from "@/hooks/use-site-options";
import { StarBorder } from "@/components/ui/StarBorder";

/* Shared treatments reused across the service page. */
const HEADING_FONT = { fontFamily: "'Poppins', sans-serif" } as const;
const GOLD_GRADIENT = "linear-gradient(135deg, #F5C842 0%, #d4a82e 100%)";

/* Business-wide trust chips shown under the hero CTA. */
const HERO_TRUST_CHIPS = [
  { icon: BadgeCheck, label: "Licensed & Insured" },
  { icon: Award, label: "Since 1989" },
  { icon: ShieldCheck, label: "Written Warranty" },
] as const;

/* Three proof stats shown above the service list (business-wide). */
const INTRO_STAT_CARDS = [
  { icon: CalendarCheck, title: "Same-Day Service", sub: "Book before 2pm, Mon–Fri" },
  { icon: Tag, title: "Upfront Pricing", sub: "Flat-rate quotes, no surprises" },
  { icon: ShieldCheck, title: "Written Warranty", sub: "On every install & repair" },
] as const;

export type ServiceFAQ = { q: string; a: string };

export type ServiceContentBlock = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
};

export type RelatedService = { label: string; href: string };

export type ServicePageContent = {
  title: string;
  breadcrumbLabel: string;
  parentBreadcrumb?: { label: string; href: string };
  /** Full, keyword-rich H1 for the hero. Falls back to the title. */
  heroH1?: string;
  /** Small uppercase eyebrow above the intro heading. */
  introEyebrow?: string;
  introHeading: string;
  /** Short 1–2 line hook that replaces the opening wall of prose. */
  hook?: string;
  introBlocks: ServiceContentBlock[];
  faqs: ServiceFAQ[];
  related: RelatedService[];
  heroImage?: string;
};

/* ───── Hero: service photo under an ~80% navy overlay, with breadcrumb,
   keyword-rich H1, a single phone CTA, and three trust chips. ───── */
function ServicePageHero({ content }: { content: ServicePageContent }) {
  const opts = useSiteOptions();
  return (
    <section className="relative overflow-hidden bg-[#1E3A6E] border-b-2 border-white/10">
      {content.heroImage && (
        <img
          src={content.heroImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      )}
      {/* ~80% navy veil over the photo keeps white copy legible */}
      <div aria-hidden="true" className="absolute inset-0 bg-[#1E3A6E]/80" />

      <div className="relative container mx-auto px-4 pt-9 pb-12 sm:pt-12 sm:pb-16 text-center">
        {/* Breadcrumb, above the H1 */}
        <nav className="text-[13px] sm:text-[14px] mb-5 text-white/70">
          <Link to="/" className="hover:text-[#F5C842] font-semibold">
            Home
          </Link>
          <ChevronRight className="inline size-3.5 mx-1 text-white/40" />
          {content.parentBreadcrumb && (
            <>
              <Link
                to={content.parentBreadcrumb.href}
                className="hover:text-[#F5C842] font-semibold"
              >
                {content.parentBreadcrumb.label}
              </Link>
              <ChevronRight className="inline size-3.5 mx-1 text-white/40" />
            </>
          )}
          <span className="text-white font-semibold">{content.breadcrumbLabel}</span>
        </nav>

        <h1
          className="mx-auto max-w-4xl text-[27px] sm:text-[40px] lg:text-[50px] font-black text-white leading-[1.08]"
          style={HEADING_FONT}
        >
          {content.heroH1 ?? content.title}
        </h1>

        {/* Single CTA */}
        <div className="mt-7 flex justify-center">
          <a
            href={opts.phone_href}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-[17px] sm:text-[19px] font-black uppercase tracking-wide text-[#1E3A6E] shadow-[0_10px_30px_rgba(245,200,66,0.45)] hover:brightness-105 active:scale-[0.98] transition-all"
            style={{ background: GOLD_GRADIENT }}
          >
            <Phone className="size-5" strokeWidth={2.5} />
            Call {opts.phone}
          </a>
        </div>

        {/* Trust chips */}
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {HERO_TRUST_CHIPS.map((c) => (
            <li
              key={c.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[13px] sm:text-[14px] font-semibold text-white"
            >
              <c.icon className="size-4 text-[#F5C842]" strokeWidth={2.4} />
              {c.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───── Sidebar contact form ───── */
function SidebarContactCard() {
  const opts = useSiteOptions();
  return (
    <div className="bg-[#6B9EF8] rounded-xl shadow-xl border-2 border-[#1E3A6E] overflow-hidden">
      <div className="px-6 py-6 text-white">
        <h3
          className="text-[28px] font-bold text-center"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Contact Us Today
        </h3>
        <p className="text-white/90 text-[15px] text-center mt-2">Get a flat-rate quote today.</p>
      </div>

      <form className="px-5 pb-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="FIRST NAME*"
            className="w-full rounded-md border-2 border-[#1E3A6E] bg-white px-4 py-3.5 text-[16px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A6E]"
            required
          />
          <input
            type="text"
            placeholder="LAST NAME*"
            className="w-full rounded-md border-2 border-[#1E3A6E] bg-white px-4 py-3.5 text-[16px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A6E]"
            required
          />
          <input
            type="email"
            placeholder="EMAIL*"
            className="w-full sm:col-span-2 rounded-md border-2 border-[#1E3A6E] bg-white px-4 py-3.5 text-[16px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A6E]"
            required
          />
          <input
            type="tel"
            placeholder="PHONE*"
            className="w-full sm:col-span-2 rounded-md border-2 border-[#1E3A6E] bg-white px-4 py-3.5 text-[16px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A6E]"
            required
          />
        </div>
        <select
          required
          defaultValue=""
          className="w-full rounded-md border-2 border-[#1E3A6E] bg-white px-4 py-3.5 text-[15px] font-semibold text-[#1E3A6E] focus:outline-none focus:ring-2 focus:ring-[#1E3A6E]"
        >
          <option value="" disabled>
            SERVICE NEEDED*
          </option>
          <option>Plumbing Repair</option>
          <option>Drain Cleaning</option>
          <option>Water Heater</option>
          <option>Sewer Service</option>
          <option>Other</option>
        </select>
        <p className="text-[12px] text-white/85 leading-snug">
          By submitting this form and signing up for texts, you consent to receive messages from All
          Phase Plumbing. Msg &amp; data rates may apply. Reply STOP to unsubscribe. Reply HELP for
          help.
        </p>
        <button
          type="submit"
          className="w-full bg-[#F5C842] text-[#1E3A6E] font-bold text-[15px] py-3 rounded-md border-2 border-[#1E3A6E] hover:bg-[#f0c030] transition-colors"
        >
          CONTACT US
        </button>
      </form>
    </div>
  );
}

/* ───── Inline "Call Us" CTA bar ───── */
function CallUsLine() {
  const opts = useSiteOptions();
  return (
    <p className="text-[16px] font-bold text-[#1E3A6E] my-5">
      Call Us:{" "}
      <a href={opts.phone_href} className="text-[#4A7BC4] hover:underline">
        {opts.phone}
      </a>
    </p>
  );
}

/* ───── FAQ accordion ───── */
function ServiceFAQ({ faqs, title }: { faqs: ServiceFAQ[]; title: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="mt-8">
      <h2
        className="text-[28px] sm:text-[32px] font-black text-[#1E3A6E] mb-5"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {title} FAQs
      </h2>
      <div className="space-y-3">
        {faqs.map((f, i) => {
          const open = openIdx === i;
          return (
            <div
              key={f.q}
              className="border border-[#1E3A6E]/20 rounded-md overflow-hidden bg-white"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(open ? null : i)}
                aria-expanded={open}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left bg-[#eef4fb] hover:bg-[#dde9f6] transition-colors"
              >
                <span className="font-semibold text-[#4A7BC4] text-[16px]">{f.q}</span>
                <Plus
                  className={`size-5 text-[#4A7BC4] shrink-0 transition-transform duration-300 ease-out ${
                    open ? "rotate-45" : ""
                  }`}
                />
              </button>
              {/* Smooth height expand/collapse via the grid 0fr→1fr trick */}
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="px-5 py-4 text-[15px] text-gray-700 leading-relaxed">{f.a}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ───── Main template ───── */
export function ServicePageTemplate({ content }: { content: ServicePageContent }) {
  return (
    <>
      <ServicePageHero content={content} />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto px-4 max-w-[1305px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
            {/* Main content */}
            <div>
              {/* Dominant intro heading with eyebrow */}
              {content.introEyebrow && (
                <span className="inline-block text-[13px] sm:text-[15px] font-bold uppercase tracking-widest text-[#6B9FE4] mb-3">
                  {content.introEyebrow}
                </span>
              )}
              <h2
                className="text-[34px] sm:text-[44px] lg:text-[50px] font-black text-[#1E3A6E] leading-[1.05] mb-5"
                style={HEADING_FONT}
              >
                {content.introHeading}
              </h2>

              {/* Tight hook replaces the old wall of intro prose */}
              {content.hook && (
                <p className="text-[18px] sm:text-[20px] text-gray-700 leading-relaxed font-medium max-w-2xl mb-8">
                  {content.hook}
                </p>
              )}

              {/* Three proof stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {INTRO_STAT_CARDS.map((s, i) => (
                  <div
                    key={s.title}
                    style={{ transitionDelay: `${i * 90}ms` }}
                    className="reveal-on-scroll flex items-start gap-3 bg-[#f7f9fc] border border-[#1E3A6E]/10 p-4"
                  >
                    <span className="inline-flex items-center justify-center size-11 shrink-0 bg-[#1E3A6E] text-[#8AB4F8]">
                      <s.icon className="size-6" strokeWidth={2.2} />
                    </span>
                    <span>
                      <span className="block text-[15px] font-extrabold text-[#1E3A6E] leading-tight">
                        {s.title}
                      </span>
                      <span className="block text-[12.5px] text-gray-500 leading-snug mt-0.5">
                        {s.sub}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              {content.introBlocks.map((block, idx) => (
                <div key={idx}>
                  {block.heading && (
                    <h2
                      className="text-[26px] sm:text-[30px] font-black text-[#1E3A6E] mt-10 mb-4 leading-tight"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {block.heading}
                    </h2>
                  )}
                  {block.paragraphs?.map((p, pIdx) => (
                    <p key={pIdx} className="text-[16px] text-gray-700 leading-relaxed mb-4">
                      {p}
                    </p>
                  ))}
                  {block.list && (
                    <ul className="list-disc list-inside text-[16px] text-gray-700 space-y-1.5 my-4 marker:text-[#1E3A6E] pl-2">
                      {block.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {(block.heading || block.list) && <CallUsLine />}
                </div>
              ))}

              <ServiceFAQ faqs={content.faqs} title={content.breadcrumbLabel} />
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              <SidebarContactCard />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
