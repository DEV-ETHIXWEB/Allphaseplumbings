import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Phone,
  ChevronRight,
  ArrowRight,
  BadgeCheck,
  Clock3,
  CalendarCheck,
  Award,
  MapPin,
  Star,
  Plus,
  Mail,
  Home,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { resolveIcon } from "@/lib/icon-map";
import { useSiteOptions } from "@/hooks/use-site-options";
import { StarBorder } from "@/components/ui/StarBorder";
import { CityHighlightMap } from "@/components/sections/CityHighlightMap";
import { SERVICES, ServiceCard } from "@/components/sections/Services";
import Particles from "@/components/ui/Particles";
import { GOOGLE_REVIEWS, slugify, type AreaContent } from "@/data/area-content";
import { Recaptcha } from "@/components/ui/Recaptcha";
import { useRecaptchaGate } from "@/hooks/use-recaptcha-gate";
import { submitLeadFromForm } from "@/lib/lead-form";

/* Shared heading font treatment used across the site (Poppins, navy, heavy). */
const HEADING_FONT = { fontFamily: "'Poppins', sans-serif" } as const;
const GOLD_GRADIENT = "linear-gradient(135deg, #F5C842 0%, #d4a82e 100%)";

/* ───────────────────────── 1. HERO ─────────────────────────
   City skyline photo behind the text, with an ~80%-opaque navy veil over it
   so the white copy stays readable. The image is the intended LCP element,
   so it loads eagerly at high priority. */
function Hero({ area }: { area: AreaContent }) {
  const opts = useSiteOptions();
  return (
    <section className="relative overflow-hidden bg-[#1E3A6E]">
      {/* City skyline background */}
      {area.heroImage && (
        <img
          src={area.heroImage}
          alt={`${area.name}, WA skyline`}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      )}
      {/* Navy veil (~80% behind the copy, lighter on the right so the
          skyline reads) keeps white text legible while showing the photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#1E3A6E]/90 via-[#1E3A6E]/80 to-[#1E3A6E]/55"
      />
      {/* Subtle grid on top of the veil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:26px_26px] opacity-30"
      />

      <div className="relative container mx-auto px-4 pt-10 pb-14 sm:pt-14 sm:pb-20">
        {/* Breadcrumb */}
        <nav className="text-[13px] mb-6 text-white/70">
          <Link to="/" className="hover:text-[#F5C842] font-semibold">
            Home
          </Link>
          <ChevronRight className="inline size-3.5 mx-1 text-white/40" />
          <Link to="/service-area" className="hover:text-[#F5C842] font-semibold">
            Service Area
          </Link>
          <ChevronRight className="inline size-3.5 mx-1 text-white/40" />
          <span className="text-white font-semibold">{area.name}</span>
        </nav>

        <div className="max-w-3xl">
          <span className="inline-block text-[12px] sm:text-[13px] font-bold uppercase tracking-widest text-[#F5C842] mb-3">
            Plumbing in {area.name}, WA &middot; Since 1989
          </span>
          <h1
            className="text-[30px] sm:text-[42px] lg:text-[52px] font-black text-white leading-[1.06]"
            style={HEADING_FONT}
          >
            {area.heroH1}
          </h1>
          <p className="mt-4 text-[16px] sm:text-[18px] text-white/85 leading-relaxed max-w-2xl">
            {area.heroPromise}
          </p>

          {/* CTAs: Call Now = primary (solid), Get Free Quote = secondary (outline) */}
          <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href={opts.phone_href}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-[17px] font-black uppercase tracking-wider text-[#1E3A6E] shadow-[0_10px_30px_rgba(245,200,66,0.45)] hover:brightness-105 active:scale-[0.98] transition-all"
              style={{ background: GOLD_GRADIENT }}
            >
              <Phone className="size-5" strokeWidth={2.5} />
              Call Now {opts.phone}
            </a>
            <a
              href="#contact"
              className="group/quote inline-flex items-center justify-center gap-2 px-7 py-4 text-[15px] font-semibold uppercase tracking-wider text-white border border-white/60 hover:bg-white hover:text-[#1E3A6E] hover:border-white transition-colors duration-300 ease-out"
            >
              Get Free Quote
              <ArrowRight className="size-4" />
            </a>
          </div>

          {/* Google rating proof */}
          <a
            href={GOOGLE_REVIEWS.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2.5 text-white/90 hover:text-white transition-colors"
          >
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-[18px] fill-[#FBBC05] text-[#FBBC05]" />
              ))}
            </span>
            <span className="text-[14px] sm:text-[15px] font-semibold">
              {GOOGLE_REVIEWS.rating} rating &middot; {GOOGLE_REVIEWS.count}+ Google reviews
            </span>
          </a>
        </div>

        {/* Trust bar, moved into the hero directly below the CTAs */}
        <ul className="mt-9 pt-7 border-t border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6">
          {HERO_TRUST_ITEMS.map((it) => (
            <li key={it.label} className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center size-11 shrink-0 bg-[#F5C842] text-[#1E3A6E] shadow-md">
                <it.icon className="size-6" strokeWidth={2.4} />
              </span>
              <span>
                <span className="block text-[14px] sm:text-[15px] font-extrabold text-white leading-tight">
                  {it.label}
                </span>
                <span className="block text-[12px] sm:text-[13px] text-[#9fc1ee] leading-tight mt-0.5">
                  {it.stat}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Trust items shown inside the hero (business-wide, with proof stats). */
const HERO_TRUST_ITEMS = [
  { icon: BadgeCheck, label: "Licensed & Insured", stat: "Bonded WA contractor" },
  { icon: Clock3, label: "24/7 Emergency", stat: "We answer live, day or night" },
  { icon: CalendarCheck, label: "Same-Day Service", stat: "Book before 2pm, Mon–Fri" },
  { icon: Award, label: "Serving Since 1989", stat: "35+ years in Seattle" },
] as const;

/* ───── Intro lede + long-form SEO content ───── */
function IntroContent({ area }: { area: AreaContent }) {
  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2
          className="text-2xl sm:text-[34px] font-black text-[#1E3A6E] leading-tight mb-5"
          style={HEADING_FONT}
        >
          Your Trusted Plumber in {area.name}
        </h2>
        {area.intro.map((p, i) => (
          <p key={i} className="text-[16px] sm:text-[17px] text-gray-600 leading-relaxed mb-4">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}

function LongContent({ area }: { area: AreaContent }) {
  return (
    <section className="py-14 sm:py-16 bg-[#f7f9fc] border-t border-[#1E3A6E]/10">
      <div className="container mx-auto px-4 max-w-4xl space-y-10">
        {area.content.map((block) => (
          <div key={block.heading}>
            <h2
              className="text-xl sm:text-[28px] font-black text-[#1E3A6E] leading-tight mb-4"
              style={HEADING_FONT}
            >
              {block.heading}
            </h2>
            {block.paragraphs.map((p, i) => (
              <p key={i} className="text-[16px] text-gray-600 leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── 3. SERVICES IN [CITY] ─────────────────────────
   Reuses the home page's "What We Do" cards (dark→light icon swap on hover). */
function Services({ area }: { area: AreaContent }) {
  return (
    <section className="py-16 sm:py-20 bg-[#f7f9fc]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-[13px] sm:text-[15px] font-bold uppercase tracking-widest text-[#6B9FE4] mb-3">
            What We Do
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#1E3A6E] leading-tight"
            style={HEADING_FONT}
          >
            Plumbing Services in {area.name}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-7">
          {SERVICES.map((svc) => (
            <ServiceCard key={svc.href} svc={svc} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 4. WHY CHOOSE US IN [CITY] ───────────────────────── */
function WhyChooseUs({ area }: { area: AreaContent }) {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-[13px] sm:text-[15px] font-bold uppercase tracking-widest text-[#6B9FE4] mb-3">
            The All Phase Difference
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#1E3A6E] leading-tight"
            style={HEADING_FONT}
          >
            Why {area.name} Homeowners Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {area.why.map((w) => {
            const Icon = resolveIcon(w.icon);
            return (
              <div
                key={w.title}
                className="flex h-full flex-col items-center md:items-start text-center md:text-left bg-[#f7f9fc] p-7"
              >
                <div className="inline-flex items-center justify-center size-14 bg-[#1E3A6E] text-[#8AB4F8] shadow-md mb-4">
                  <Icon className="size-7" strokeWidth={2.2} />
                </div>
                <h3 className="text-[22px] font-extrabold text-[#1E3A6E] mb-2 leading-snug">
                  {w.title}
                </h3>
                <p className="text-[15px] text-gray-600 leading-relaxed flex-1">{w.body}</p>
                <span className="mt-4 inline-flex items-center gap-2 bg-[#8AB4F8]/20 border border-[#8AB4F8] px-3 py-1.5 text-[13px] font-extrabold text-[#1E3A6E]">
                  <CheckCircle2 className="size-4 text-[#1E9E5A]" />
                  {w.stat}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 5. AREAS WE COVER ───────────────────────── */
function AreasWeCover({ area }: { area: AreaContent }) {
  const hasZips = area.zips.length > 0;
  return (
    <section className="py-16 sm:py-20 bg-[#eef4fb]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block text-[13px] sm:text-[15px] font-bold uppercase tracking-widest text-[#6B9FE4] mb-3">
            Areas We Cover
          </span>
          <h2
            className="text-3xl sm:text-4xl font-black text-[#1E3A6E] leading-tight"
            style={HEADING_FONT}
          >
            Areas We Serve In &amp; Around {area.name}
          </h2>
        </div>

        <div
          className={`max-w-5xl mx-auto grid grid-cols-1 gap-6 ${hasZips ? "lg:grid-cols-2" : ""}`}
        >
          {/* Neighborhoods / nearby areas (each links to its own area page) */}
          <div className="bg-white border-2 border-[#1E3A6E]/15 p-6 sm:p-8">
            <h3 className="text-[16px] font-extrabold uppercase tracking-wide text-[#1E3A6E] mb-4">
              Neighborhoods &amp; Nearby Areas
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
              {area.neighborhoods.map((n) => (
                <li key={n}>
                  <Link
                    to="/areas/$city"
                    params={{ city: slugify(n) }}
                    className="group flex items-center gap-2 py-1.5 text-[15px] font-medium text-[#1E3A6E] hover:text-[#4A7BC4] transition-colors"
                  >
                    <MapPin className="size-4 text-[#F5C842] shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="underline-offset-2 group-hover:underline">{n}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {!hasZips && (
              <p className="mt-5 text-[14px] text-gray-500 italic">
                Don&apos;t see your area? Call us, we likely cover it too.
              </p>
            )}
          </div>

          {/* ZIP codes (only when known for this city) */}
          {hasZips && (
            <div className="bg-white border-2 border-[#1E3A6E]/15 p-6 sm:p-8">
              <h3 className="text-[16px] font-extrabold uppercase tracking-wide text-[#1E3A6E] mb-4">
                ZIP Codes
              </h3>
              <div className="flex flex-wrap gap-2">
                {area.zips.map((z) => (
                  <span
                    key={z}
                    className="inline-flex items-center px-3 py-1.5 bg-[#1E3A6E]/5 border border-[#1E3A6E]/15 text-[14px] font-semibold text-[#1E3A6E]"
                  >
                    {z}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-[14px] text-gray-500 italic">
                Don&apos;t see your area? Call us, we likely cover it too.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 6. TESTIMONIALS ─────────────────────────
   Reuses the home page's Google-style review card (white card, colored
   initial avatar, gold stars) on a navy gradient backdrop. */
const REVIEW_AVATAR_COLORS = ["#4285F4", "#EA4335", "#34A853", "#FBBC05"];

function Testimonials({ area }: { area: AreaContent }) {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20 border-y border-white"
      style={{
        background: "linear-gradient(160deg, #0f2246 0%, #1E3A6E 40%, #2d5fa8 75%, #4A7BC4 100%)",
      }}
    >
      {/* Particle backdrop */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Particles
          particleCount={160}
          particleSpread={20}
          speed={0.4}
          particleBaseSize={80}
          sizeRandomness={1.1}
          alphaParticles={true}
          cameraDistance={20}
          disableRotation={true}
          moveParticlesOnHover={false}
          particleColors={["#ffffff", "#aac8f0", "#7ab3e0"]}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-[13px] sm:text-[15px] font-bold uppercase tracking-widest text-[#6B9FE4] mb-3">
            Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight" style={HEADING_FONT}>
            What {area.name} Customers Say
          </h2>

          {/* Aggregate Google rating, links to the Google Business Profile */}
          <a
            href={GOOGLE_REVIEWS.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-1 py-1 hover:opacity-90 transition-opacity"
          >
            <span
              className="text-[20px] font-normal leading-none"
              style={{
                fontFamily: "'Product Sans','Google Sans','Inter',sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              <span className="text-[#8AB4F8]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#8AB4F8]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </span>
            <span className="text-[18px] font-black text-white">{GOOGLE_REVIEWS.rating}</span>
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-[18px] fill-[#FBBC05] text-[#FBBC05]" />
              ))}
            </span>
            <span className="text-[14px] font-semibold text-white">
              {GOOGLE_REVIEWS.count}+ reviews
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {area.testimonials.map((t, idx) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-6 shadow-[0_12px_32px_rgba(0,0,0,0.18)] flex flex-col"
            >
              <div className="flex items-center gap-3">
                <div
                  className="size-11 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
                  style={{ background: REVIEW_AVATAR_COLORS[idx % REVIEW_AVATAR_COLORS.length] }}
                >
                  {t.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#1E3A6E] text-[15px] leading-tight truncate">
                    {t.name}
                  </p>
                  <p className="flex items-center gap-1 text-[12px] text-gray-500">
                    <MapPin className="size-3 text-[#F5C842]" />
                    {t.neighborhood}, {area.name}
                  </p>
                </div>
              </div>
              <div
                className="flex gap-0.5 mt-3"
                aria-label={`${t.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${i < t.rating ? "fill-[#FBBC05] text-[#FBBC05]" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-gray-700">{t.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 7. EMERGENCY CTA BANNER ───────────────────────── */
function EmergencyBanner({ area }: { area: AreaContent }) {
  const opts = useSiteOptions();
  return (
    <section className="relative overflow-hidden bg-[#1E3A6E]">
      {/* Particle backdrop */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Particles
          particleCount={300}
          particleSpread={20}
          speed={0.5}
          particleBaseSize={120}
          sizeRandomness={1.2}
          alphaParticles={true}
          cameraDistance={20}
          disableRotation={true}
          moveParticlesOnHover={false}
          particleColors={["#ffffff", "#aac8f0", "#7ab3e0"]}
          className="w-full h-full"
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 py-14 sm:py-16 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
        <div>
          <h2
            className="text-2xl sm:text-3xl lg:text-[38px] font-black text-white leading-tight"
            style={HEADING_FONT}
          >
            Plumbing Emergency in {area.name}?
          </h2>
          <p className="mt-2 text-lg sm:text-xl text-[#F5C842] font-bold">
            We&apos;re {area.responseTime}.
          </p>
        </div>
        <a
          href={opts.phone_href}
          className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-[16px] font-extrabold uppercase tracking-wider text-[#1E3A6E] shadow-xl hover:brightness-105 active:scale-[0.98] transition-all shrink-0"
          style={{ background: GOLD_GRADIENT }}
        >
          <Phone className="size-5" />
          Call Now &mdash; Available 24/7
        </a>
      </div>
    </section>
  );
}

/* ───────────────────────── 8. FAQ ───────────────────────── */
function FAQ({ area }: { area: AreaContent }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section className="py-16 sm:py-20 bg-[#f7f9fc]">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <span className="inline-block text-[13px] sm:text-[15px] font-bold uppercase tracking-widest text-[#6B9FE4] mb-3">
            FAQ
          </span>
          <h2
            className="text-3xl sm:text-4xl font-black text-[#1E3A6E] leading-tight"
            style={HEADING_FONT}
          >
            {area.name} Plumbing Questions
          </h2>
        </div>

        <div className="space-y-3">
          {area.faqs.map((f, i) => {
            const open = openIdx === i;
            return (
              <div key={f.q} className="border-2 border-[#1E3A6E]/15 bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-[#eef4fb] transition-colors"
                  aria-expanded={open}
                >
                  <span className="font-bold text-[#1E3A6E] text-[16px]">{f.q}</span>
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
                    <div className="px-5 pb-5 text-[15px] text-gray-700 leading-relaxed">{f.a}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 9. CONTACT SECTION ─────────────────────────
   Right column is a form card styled to match the home page hero form:
   a #6B9EF8 card with a heavy navy border, Residential/Commercial tabs,
   white inputs with navy borders, a gold StarBorder submit, and the SMS
   consent + terms copy. City field is pre-filled. */
const HERO_INPUT_CLS =
  "rounded-lg border-2 border-[#1E3A6E] bg-white px-3.5 py-2.5 sm:px-4 sm:py-3.5 text-[14px] sm:text-[15px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow";

function Contact({ area }: { area: AreaContent }) {
  const opts = useSiteOptions();
  const [serviceType, setServiceType] = useState<"residential" | "commercial">("residential");
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [sent, setSent] = useState(false);
  const captcha = useRecaptchaGate();

  const tabCls = (active: boolean) =>
    `flex-1 flex items-center justify-center gap-2 px-3 py-3.5 text-[15px] sm:text-[18px] font-semibold transition-all duration-300 border-b-4 ${
      active
        ? "border-[#F5C842] text-white bg-white/25 shadow-[inset_0_-3px_0_#F5C842]"
        : "border-transparent text-white/70 hover:text-white hover:bg-white/10"
    }`;

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
          {/* Left: phone + details */}
          <div>
            <span className="inline-block text-[13px] sm:text-[15px] font-bold uppercase tracking-widest text-[#1E3A6E] mb-3">
              Get In Touch
            </span>
            <h2
              className="text-3xl sm:text-4xl font-black text-[#1E3A6E] leading-tight"
              style={HEADING_FONT}
            >
              Book a {area.name} Plumber
            </h2>
            <p className="mt-3 text-[16px] text-gray-600 leading-relaxed">
              Call now for fast, same-day plumbing service across {area.name}, or send the form and
              we&apos;ll reach out right away.
            </p>

            <a
              href={opts.phone_href}
              className="mt-6 inline-flex items-center gap-3 text-[#1E3A6E] hover:text-[#4A7BC4] transition-colors"
            >
              <span className="inline-flex items-center justify-center size-12 bg-[#1E3A6E] text-[#F5C842]">
                <Phone className="size-6" />
              </span>
              <span>
                <span className="block text-[13px] font-semibold uppercase tracking-wide text-gray-500">
                  Call Us
                </span>
                <span className="block text-[24px] font-black">{opts.phone}</span>
              </span>
            </a>

            <div className="mt-5 flex items-start gap-3 text-[15px] text-gray-600">
              <Mail className="size-5 text-[#F5C842] shrink-0 mt-0.5" />
              <span>{opts.email}</span>
            </div>
            <div className="mt-3 flex items-start gap-3 text-[15px] text-gray-600">
              <MapPin className="size-5 text-[#F5C842] shrink-0 mt-0.5" />
              <span>
                {opts.address_line1}, {opts.address_city}, {opts.address_state} {opts.address_zip}
              </span>
            </div>
          </div>

          {/* Right: hero-style form card (city pre-filled) */}
          <div
            className="rounded-2xl overflow-hidden border-[4px] border-[#1E3A6E]"
            style={{
              background: "#6B9EF8",
              boxShadow: "0 12px 40px rgba(30,58,110,0.18)",
            }}
          >
            {/* Residential / Commercial tabs */}
            <div className="flex border-b border-[#1E3A6E]/30">
              <button
                type="button"
                onClick={() => setServiceType("residential")}
                className={tabCls(serviceType === "residential")}
              >
                <Home className="size-5" /> Residential
              </button>
              <button
                type="button"
                onClick={() => setServiceType("commercial")}
                className={tabCls(serviceType === "commercial")}
              >
                <Building2 className="size-5" /> Commercial
              </button>
            </div>

            <div className="px-5 py-6 sm:px-7 sm:py-7">
              <h3
                className="text-[22px] sm:text-[26px] font-bold text-white mb-4"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Let Us Call You
              </h3>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  if (await captcha.verify()) {
                    await submitLeadFromForm(form, {
                      source: `Area Page — ${area.name}`,
                      serviceType,
                    });
                    setSent(true);
                  }
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="FULL NAME*"
                    required
                    className={HERO_INPUT_CLS}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="PHONE*"
                    required
                    className={HERO_INPUT_CLS}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="EMAIL*"
                    required
                    className={HERO_INPUT_CLS}
                  />
                  <input
                    type="text"
                    name="city"
                    defaultValue={area.name}
                    aria-label="City"
                    className={HERO_INPUT_CLS}
                  />
                  <select
                    required
                    name="service"
                    defaultValue=""
                    className={`${HERO_INPUT_CLS} sm:col-span-2 appearance-none`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231E3A6E' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 12px center",
                      backgroundSize: "16px",
                      paddingRight: "36px",
                    }}
                  >
                    <option value="" disabled>
                      SERVICE NEEDED*
                    </option>
                    {serviceType === "residential" ? (
                      <>
                        {area.services.map((s) => (
                          <option key={s.name} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                        <option value="Other">Other Service</option>
                      </>
                    ) : (
                      <>
                        <option value="Commercial Plumbing Repair">Commercial Plumbing Repair</option>
                        <option value="Commercial Drain Cleaning">Commercial Drain Cleaning</option>
                        <option value="Commercial Sewer Services">Commercial Sewer Services</option>
                        <option value="Backflow Testing">Backflow Testing</option>
                        <option value="Gas Line Service">Gas Line Service</option>
                        <option value="Other Commercial">Other Commercial Service</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="mt-4 flex flex-col items-center gap-3">
                  <Recaptcha ref={captcha.ref} onVerify={captcha.setToken} />
                  {captcha.error && (
                    <p className="text-[13px] font-semibold text-red-700">
                      Please confirm you're not a robot to continue.
                    </p>
                  )}
                  <StarBorder
                    type="submit"
                    className="inline-block active:scale-[0.98] transition-all"
                    innerClassName="font-bold px-10 py-2.5 text-[18px] sm:px-14 sm:py-3 sm:text-[20px]"
                    innerStyle={{
                      background: "#F5C842",
                      color: "#1E3A6E",
                      border: "2px solid #1E3A6E",
                    }}
                  >
                    Send Request
                  </StarBorder>
                  {sent && (
                    <p className="text-[13px] font-bold text-white text-center bg-white/15 px-4 py-2 rounded-lg">
                      ✓ Thanks, we'll be in touch shortly.
                    </p>
                  )}
                </div>

                <div className="mt-4 flex items-start gap-2">
                  <input
                    id="area-sms-optin"
                    type="checkbox"
                    checked={smsOptIn}
                    onChange={(e) => setSmsOptIn(e.target.checked)}
                    className="mt-1 size-4 accent-[#1E3A6E] cursor-pointer shrink-0"
                  />
                  <label
                    htmlFor="area-sms-optin"
                    className="text-[12px] sm:text-[13px] text-white cursor-pointer leading-relaxed"
                  >
                    By submitting this form and signing up for texts, you consent to receive messages
                    from All Phase Plumbing. Msg &amp; data rates may apply. Reply STOP to
                    unsubscribe, HELP for help.
                  </label>
                </div>

                <p className="mt-3 text-[12px] sm:text-[13px] text-white/75 leading-relaxed border-t border-white/15 pt-2.5">
                  By submitting, you agree to our{" "}
                  <a href="/about" className="underline hover:text-[#F5C842]">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="/about" className="underline hover:text-[#F5C842]">
                    Privacy Policy
                  </a>
                  . You may unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Template ───────────────────────── */
export function AreaPageTemplate({ area }: { area: AreaContent }) {
  return (
    <>
      <Hero area={area} />
      <IntroContent area={area} />
      <Services area={area} />
      <WhyChooseUs area={area} />
      <LongContent area={area} />
      <AreasWeCover area={area} />
      <Testimonials area={area} />
      <EmergencyBanner area={area} />
      <FAQ area={area} />
      <Contact area={area} />
      <CityHighlightMap name={area.name} lat={area.lat} lon={area.lon} themed />
    </>
  );
}
