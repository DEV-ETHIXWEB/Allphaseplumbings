import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Phone, Plus, Minus, ChevronRight } from "lucide-react";
import { useSiteOptions } from "@/hooks/use-site-options";
import { StarBorder } from "@/components/ui/StarBorder";
import wwd1 from "@/assets/wwd-1.svg";
import wwd2 from "@/assets/wwd-2.svg";
import wwd3 from "@/assets/wwd-3.svg";
import wwd4 from "@/assets/wwd-4.svg";
import wwd1Dark from "@/assets/wwd-1-dark.svg";
import wwd2Dark from "@/assets/wwd-2-dark.svg";
import wwd3Dark from "@/assets/wwd-3-dark.svg";
import wwd4Dark from "@/assets/wwd-4-dark.svg";

/**
 * Strict label → icon mapping. Only the 4 services that have a real
 * home-page icon get one; everything else returns null and the tile
 * renders a placeholder box (waiting on new icon assets).
 *
 * To add a new icon: drop the asset, import it above, and add a single
 * `case` returning `{ light, dark }` for the matching label.
 */
function iconForLabel(label: string): { light: string; dark: string } | null {
  switch (label.trim().toLowerCase()) {
    case "plumbing":
    case "plumbing repair":
      return { light: wwd1, dark: wwd1Dark };
    case "water heaters":
    case "water heater":
      return { light: wwd2, dark: wwd2Dark };
    case "sewer":
    case "sewer service":
    case "sewer services":
      return { light: wwd3, dark: wwd3Dark };
    case "drain cleaning":
      return { light: wwd4, dark: wwd4Dark };
    default:
      return null;
  }
}

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
  introHeading: string;
  introBlocks: ServiceContentBlock[];
  faqs: ServiceFAQ[];
  related: RelatedService[];
  heroImage?: string;
};

/* ───── Big hero with title and background image at 30% opacity ───── */
function ServicePageHero({ title, heroImage }: { title: string; heroImage?: string }) {
  return (
    <section className="relative bg-[#eef4fb] pt-16 pb-12 sm:pt-[90px] sm:pb-[68px] overflow-hidden border-b border-[#1E3A6E]/10">
      {heroImage && (
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          style={{ opacity: 0.3 }}
        />
      )}

      <div className="relative container mx-auto px-4 text-center">
        <h1
          className="text-[26px] sm:text-[43px] lg:text-[53px] font-black tracking-tight text-[#1E3A6E]"
          style={{
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "0.02em",
            textShadow: "0 4px 12px rgba(147, 197, 253, 0.9)",
          }}
        >
          {title.toUpperCase()}
        </h1>
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
        <p className="text-[#FFB800] font-semibold text-[18px] mt-1">Same Day Service</p>
        <p className="text-white text-[14px] mt-1">Plumbing and Drain Cleaning</p>
        <p className="text-white/85 text-[14px]">When booked before 2pm, Monday – Friday</p>
      </div>

      <form className="px-5 pb-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="FIRST NAME*"
            className="rounded-md border-2 border-[#1E3A6E] bg-white px-3 py-3 text-[14px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A6E]"
            required
          />
          <input
            type="text"
            placeholder="LAST NAME*"
            className="rounded-md border-2 border-[#1E3A6E] bg-white px-3 py-3 text-[14px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A6E]"
            required
          />
          <input
            type="email"
            placeholder="EMAIL*"
            className="rounded-md border-2 border-[#1E3A6E] bg-white px-3 py-3 text-[14px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A6E]"
            required
          />
          <input
            type="tel"
            placeholder="PHONE*"
            className="rounded-md border-2 border-[#1E3A6E] bg-white px-3 py-3 text-[14px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A6E]"
            required
          />
        </div>
        <select
          required
          defaultValue=""
          className="w-full rounded-md border-2 border-[#1E3A6E] bg-white px-3 py-3 text-[13px] font-semibold text-[#1E3A6E] focus:outline-none focus:ring-2 focus:ring-[#1E3A6E]"
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

/* ───── Sidebar related services
   Each tile shows the matching home-page icon. At rest the card is navy
   with the light-colored icon; on hover it inverts to a white card with
   the dark icon (mirroring the light → dark crossfade on the homepage
   What We Do grid). ───── */
function SidebarServicesMenu({ related }: { related: RelatedService[] }) {
  return (
    <div>
      <h3 className="text-[20px] font-bold uppercase tracking-wider text-[#1E3A6E] text-center mb-4">
        Services
      </h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        {related.map((r) => {
          const icon = iconForLabel(r.label);
          return (
            <Link
              key={r.href + r.label}
              to={r.href}
              className="group flex flex-col items-center justify-start text-center
                         px-1 py-2
                         hover:-translate-y-0.5 transition-transform duration-200"
            >
              {/* Icon stack — light fades to dark on hover (matches home page).
                  When no icon is assigned for this label yet, render an empty
                  dashed placeholder box of the same size. */}
              <span className="relative block w-[112px] h-[112px] sm:w-[128px] sm:h-[128px] mb-2">
                {icon ? (
                  <>
                    <img
                      src={icon.light}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-contain
                                 opacity-100 group-hover:opacity-0
                                 transition-opacity duration-150 ease-out"
                    />
                    <img
                      src={icon.dark}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-contain
                                 opacity-0 group-hover:opacity-100
                                 transition-opacity duration-150 ease-out"
                    />
                  </>
                ) : (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center
                               border-2 border-dashed border-[#1E3A6E]/35
                               bg-[#1E3A6E]/5
                               group-hover:border-[#1E3A6E]/55 group-hover:bg-[#1E3A6E]/10
                               transition-colors duration-150"
                  />
                )}
              </span>
              <span
                className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wide leading-tight
                           text-[#1E3A6E] group-hover:text-[#4A7BC4]
                           transition-colors duration-150"
              >
                {r.label}
              </span>
            </Link>
          );
        })}
      </div>
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
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left bg-[#eef4fb] hover:bg-[#dde9f6] transition-colors"
              >
                <span className="font-semibold text-[#4A7BC4] text-[16px]">{f.q}</span>
                {open ? (
                  <Minus className="size-5 text-[#4A7BC4] shrink-0" />
                ) : (
                  <Plus className="size-5 text-[#4A7BC4] shrink-0" />
                )}
              </button>
              {open && (
                <div className="px-5 py-4 text-[15px] text-gray-700 leading-relaxed">{f.a}</div>
              )}
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
      <ServicePageHero title={content.title} heroImage={content.heroImage} />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto px-4 max-w-[1305px]">
          {/* Breadcrumb */}
          <nav className="text-[15px] mb-6">
            <Link to="/" className="text-[#1E3A6E] hover:text-[#4A7BC4] font-semibold">
              Home
            </Link>
            <ChevronRight className="inline size-4 mx-1 text-gray-400" />
            {content.parentBreadcrumb && (
              <>
                <Link
                  to={content.parentBreadcrumb.href}
                  className="text-[#1E3A6E] hover:text-[#4A7BC4] font-semibold"
                >
                  {content.parentBreadcrumb.label}
                </Link>
                <ChevronRight className="inline size-4 mx-1 text-gray-400" />
              </>
            )}
            <span className="text-[#1E3A6E] font-semibold">{content.breadcrumbLabel}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
            {/* Main content */}
            <div>
              <h2
                className="text-[32px] sm:text-[40px] lg:text-[44px] font-black text-[#1E3A6E] leading-tight mb-6"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {content.introHeading}
              </h2>

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
              <SidebarServicesMenu related={content.related} />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
