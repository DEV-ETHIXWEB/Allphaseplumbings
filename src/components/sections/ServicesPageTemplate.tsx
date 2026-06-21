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
  Star,
  Plus,
  Minus,
  PhoneCall,
  ClipboardCheck,
  Truck,
  ShieldCheck,
  Wrench,
  Droplets,
  Flame,
  Pipette,
  Search,
  Siren,
  Replace,
  Gauge,
  Fuel,
  Filter,
  ShowerHead,
  Building2,
  DollarSign,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { useSiteOptions } from "@/hooks/use-site-options";
import { GOOGLE_REVIEWS } from "@/data/area-content";
import { GoogleReviewsMarquee } from "@/components/sections/GoogleReviewsMarquee";
import { CTABanner } from "@/components/sections/CTABanner";
import Particles from "@/components/ui/Particles";
import teamPhoto from "@/assets/plumbing_service_hero.png";

const HEADING_FONT = { fontFamily: "'Poppins', sans-serif" } as const;
const GOLD_GRADIENT = "linear-gradient(135deg, #F5C842 0%, #d4a82e 100%)";

/* ───── Data (exported so the route can build matching JSON-LD) ───── */
export type ServiceItem = { name: string; description: string; href: string; icon: LucideIcon };

export const SERVICES_CATALOG: ServiceItem[] = [
  {
    name: "Plumbing Repair",
    description: "Leaks, faucets, toilets, and worn pipes fixed right the first time.",
    href: "/services/plumbing",
    icon: Wrench,
  },
  {
    name: "Drain Cleaning",
    description: "Hydro-jetting and snaking that clears any clog, with camera inspection.",
    href: "/services/drain-cleaning",
    icon: Droplets,
  },
  {
    name: "Water Heaters",
    description: "Repair, replacement, and tankless upgrades, often the same day.",
    href: "/services/water-heaters",
    icon: Flame,
  },
  {
    name: "Sewer Services",
    description: "Trenchless sewer line repair and replacement, minimal digging.",
    href: "/services/sewer-services",
    icon: Pipette,
  },
  {
    name: "Leak Detection",
    description: "Electronic detection of hidden slab and behind-wall leaks.",
    href: "/services/plumbing/leak-detection",
    icon: Search,
  },
  {
    name: "Emergency Plumbing",
    description: "24/7 response for burst pipes, backups, and flooding.",
    href: "/services/emergency-plumber",
    icon: Siren,
  },
  {
    name: "Repiping",
    description: "Whole-home repipes in modern PEX and copper.",
    href: "/services/repiping",
    icon: Replace,
  },
  {
    name: "Hydro Jetting",
    description: "High-pressure jetting that blasts out grease, roots, and buildup.",
    href: "/services/hydro-jetting",
    icon: Gauge,
  },
  {
    name: "Gas Line Services",
    description: "Safe gas line repair, installation, and leak checks.",
    href: "/services/gas-line-repair",
    icon: Fuel,
  },
  {
    name: "Water Softeners & Filtration",
    description: "Cleaner, softer water that protects your pipes and fixtures.",
    href: "/services/water-softeners",
    icon: Filter,
  },
  {
    name: "Toilets & Fixtures",
    description: "Toilet, faucet, and fixture repair and installation.",
    href: "/services/toilets",
    icon: ShowerHead,
  },
  {
    name: "Commercial Plumbing",
    description: "Plumbing and drain service that keeps your business running.",
    href: "/commercial",
    icon: Building2,
  },
];

const WHY = [
  {
    title: "Licensed & Guaranteed",
    body: "Every job is done by our own licensed, insured crew, never a subcontractor, and backed in writing.",
    icon: ShieldCheck,
    stat: "100% workmanship guarantee",
  },
  {
    title: "Upfront Flat-Rate Pricing",
    body: "You get a clear, flat-rate quote before any work begins, so there are never surprise add-ons.",
    icon: DollarSign,
    stat: "Quoted before we begin",
  },
  {
    title: "One Call Does It All",
    body: "Plumbing, drains, sewer, water heaters, and gas, all handled by one trusted local team.",
    icon: Layers,
    stat: "10,000+ jobs completed",
  },
];

const STEPS = [
  {
    icon: PhoneCall,
    title: "Call or Book Online",
    body: "Tell us what's going on, any time, day or night.",
  },
  {
    icon: ClipboardCheck,
    title: "Upfront Quote",
    body: "We diagnose the problem and give you a flat-rate price before starting.",
  },
  {
    icon: Truck,
    title: "Same-Day Repair",
    body: "Our licensed technician fixes it right, usually the same day.",
  },
  {
    icon: ShieldCheck,
    title: "Guaranteed & Clean",
    body: "We test the work, clean up, and back the repair in writing.",
  },
];

export const SERVICE_FAQS = [
  {
    q: "How fast can you come out?",
    a: "In most cases we offer same-day service when you book before 2pm, Monday through Friday, and we run 24/7 emergency dispatch every day for urgent issues like burst pipes and backups.",
  },
  {
    q: "Do you charge for estimates?",
    a: "Every job starts with a clear, flat-rate quote before any work begins. You'll know the price up front, with no surprise add-ons after we start.",
  },
  {
    q: "Are you available 24/7 for emergencies?",
    a: "Yes. Our emergency line is answered around the clock, every day of the year, for burst pipes, sewer backups, water heater failures, and other urgent plumbing problems.",
  },
  {
    q: "Are your plumbers licensed and insured?",
    a: "Every plumber we dispatch is fully licensed in Washington State, bonded, and insured. We never subcontract, so your job is always handled by our own crew.",
  },
  {
    q: "Do you service both homes and businesses?",
    a: "Both. We handle residential plumbing across Greater Seattle and offer dedicated commercial plumbing and drain service for businesses, property managers, and contractors.",
  },
];

/* ───────────────────────── 1. HERO ─────────────────────────
   Two-column split: copy + CTAs on the left, a real photo of the crew on
   the right. Distinct from the area pages' full-bleed skyline hero. */
function Hero() {
  const opts = useSiteOptions();
  return (
    <section className="relative overflow-hidden bg-[#1E3A6E]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:26px_26px] opacity-30"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 size-[460px] rounded-full bg-[#6B9FE4]/20 blur-3xl"
      />

      <div className="relative container mx-auto px-4 pt-10 pb-14 sm:pt-12 sm:pb-16">
        <nav className="text-[13px] mb-6 text-white/70">
          <Link to="/" className="hover:text-[#F5C842] font-semibold">
            Home
          </Link>
          <ChevronRight className="inline size-3.5 mx-1 text-white/40" />
          <span className="text-white font-semibold">Services</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* LEFT: heading + CTAs */}
          <div>
            <span className="inline-block text-[12px] sm:text-[13px] font-bold uppercase tracking-widest text-[#F5C842] mb-3">
              Greater Seattle &middot; Licensed Since 1989
            </span>
            <h1
              className="text-[30px] sm:text-[42px] lg:text-[50px] font-black text-white leading-[1.06]"
              style={HEADING_FONT}
            >
              Plumbing Services in Greater Seattle
            </h1>
            <p className="mt-4 text-[16px] sm:text-[18px] text-white/85 leading-relaxed max-w-xl">
              From a single dripping faucet to a full sewer line replacement, one local team covers
              it, with same-day service and honest, upfront pricing.
            </p>

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
                href="#book"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-[15px] font-semibold uppercase tracking-wider text-white border border-white/60 hover:bg-white hover:text-[#1E3A6E] hover:border-white transition-colors duration-300 ease-out"
              >
                Get Free Quote
                <ArrowRight className="size-4" />
              </a>
            </div>

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

          {/* RIGHT: crew photo */}
          <div className="relative">
            <div className="overflow-hidden border-4 border-white shadow-2xl">
              <img
                src={teamPhoto}
                alt="The All Phase Plumbing team at their Tukwila, WA shop"
                className="w-full h-[260px] sm:h-[360px] lg:h-[440px] object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden sm:block bg-[#F5C842] text-[#1E3A6E] border-2 border-[#1E3A6E] px-5 py-3 shadow-xl">
              <span className="block text-[24px] font-black leading-none">35+ Years</span>
              <span className="block text-[12px] font-bold uppercase tracking-wide mt-0.5">
                Serving Seattle
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const HERO_TRUST_ITEMS = [
  { icon: BadgeCheck, label: "Licensed & Insured", stat: "Bonded WA contractor" },
  { icon: Clock3, label: "24/7 Emergency", stat: "We answer live, day or night" },
  { icon: CalendarCheck, label: "Same-Day Service", stat: "Book before 2pm, Mon-Fri" },
  { icon: Award, label: "Serving Since 1989", stat: "35+ years in Seattle" },
] as const;

/* ───── Trust strip (sits below the hero) ───── */
function TrustStrip() {
  return (
    <section className="bg-white border-b border-[#1E3A6E]/10">
      <div className="container mx-auto px-4">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-5 py-6">
          {HERO_TRUST_ITEMS.map((it) => (
            <li key={it.label} className="flex items-center gap-3 justify-center lg:justify-start">
              <span className="inline-flex items-center justify-center size-11 shrink-0 bg-[#F5C842] text-[#1E3A6E] shadow-md">
                <it.icon className="size-6" strokeWidth={2.4} />
              </span>
              <span>
                <span className="block text-[14px] sm:text-[15px] font-extrabold text-[#1E3A6E] leading-tight">
                  {it.label}
                </span>
                <span className="block text-[12px] sm:text-[13px] text-gray-500 leading-tight mt-0.5">
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

/* ───────────────────────── 2. SERVICES CATALOG ───────────────────────── */
function ServicesCatalog() {
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
            Complete Plumbing Services
          </h2>
          <p className="mt-3 text-[16px] text-gray-600 max-w-2xl mx-auto">
            Residential and commercial plumbing across the Greater Seattle area. Tap any service to
            learn more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {SERVICES_CATALOG.map((svc) => (
            <Link
              key={svc.href + svc.name}
              to={svc.href}
              className="group flex flex-col bg-white border-2 border-[#1E3A6E] p-6
                         shadow-md hover:shadow-[0_14px_40px_rgba(30,58,110,0.22)]
                         hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center size-14 bg-[#1E3A6E] text-[#6B9FE4] mb-4 group-hover:bg-[#4A7BC4] group-hover:text-white transition-colors">
                <svc.icon className="size-7" strokeWidth={2.2} />
              </div>
              <h3 className="text-[20px] font-extrabold text-[#1E3A6E] leading-snug">{svc.name}</h3>
              <p className="mt-2 text-[15px] text-gray-600 leading-relaxed flex-1">
                {svc.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[#1E3A6E] font-bold text-[15px] group-hover:gap-3 group-hover:text-[#4A7BC4] transition-all">
                Learn More <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 3. INTRO / SEO COPY ───────────────────────── */
function IntroContent() {
  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2
          className="text-2xl sm:text-[34px] font-black text-[#1E3A6E] leading-tight mb-5"
          style={HEADING_FONT}
        >
          Greater Seattle's Full-Service Plumbing Company
        </h2>
        <p className="text-[16px] sm:text-[17px] text-gray-600 leading-relaxed mb-4">
          Since 1989, All Phase Plumbing has been the team Greater Seattle homeowners and businesses
          call when something goes wrong with their plumbing. We handle the full range of work, from
          routine repairs and drain cleaning to water heater installs, repiping, and trenchless sewer
          replacement, so you never have to juggle multiple contractors for one project.
        </p>
        <p className="text-[16px] text-gray-600 leading-relaxed">
          Every job is performed by our own licensed, bonded, and insured plumbers, priced with a
          clear flat-rate quote up front, and backed by a written workmanship guarantee. Whether it's
          a planned upgrade or a 2am emergency, you get the same honest, professional service that has
          earned us the trust of thousands of local customers.
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────── 4. HOW IT WORKS ───────────────────────── */
export function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 bg-[#eef4fb]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-[13px] sm:text-[15px] font-bold uppercase tracking-widest text-[#6B9FE4] mb-3">
            Simple Process
          </span>
          <h2
            className="text-3xl sm:text-4xl font-black text-[#1E3A6E] leading-tight"
            style={HEADING_FONT}
          >
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <div key={s.title} className="relative bg-white border-2 border-[#1E3A6E]/15 p-6 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
              <span className="absolute -top-4 -left-3 inline-flex items-center justify-center size-9 bg-[#6B9FE4] text-white font-black text-[16px] border-2 border-[#1E3A6E]">
                {i + 1}
              </span>
              <div className="inline-flex items-center justify-center size-12 bg-[#1E3A6E] text-[#6B9FE4] mb-4">
                <s.icon className="size-6" strokeWidth={2.2} />
              </div>
              <h3 className="text-[18px] font-extrabold text-[#1E3A6E] mb-2 leading-snug">
                {s.title}
              </h3>
              <p className="text-[14px] text-gray-600 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 5. WHY CHOOSE US ───────────────────────── */
export function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-block text-[13px] sm:text-[15px] font-bold uppercase tracking-widest text-[#6B9FE4] mb-3">
              The All Phase Difference
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#1E3A6E] leading-tight mb-6"
              style={HEADING_FONT}
            >
              Why Greater Seattle Chooses Us
            </h2>
            <div className="space-y-5 text-[16px] sm:text-[17px] text-gray-600 leading-relaxed">
              <p>
                When you invite a plumber into your home or business, you need to know they are
                experienced, trustworthy, and fully equipped to handle the job. At All Phase Plumbing,
                we pride ourselves on delivering top-tier service without the sales pressure or hidden fees.
              </p>
              <p>
                Our philosophy is simple: diagnose the issue accurately, provide a clear and upfront
                solution, and execute the repair or installation flawlessly. We invest heavily in the
                latest technology—from advanced leak detection to high-powered hydro jetting—ensuring
                that our solutions are not just temporary fixes, but long-term improvements for your
                property's plumbing infrastructure.
              </p>
              <p>
                We understand that plumbing emergencies disrupt your life. That's why our dedicated
                team is on standby 24 hours a day, 7 days a week, ready to restore comfort and
                safety to your environment.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {WHY.map((w) => (
              <div
                key={w.title}
                className="flex items-start gap-5 bg-[#f7f9fc] p-5 border-l-4 border-[#6B9FE4] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center size-12 shrink-0 bg-[#1E3A6E] text-[#6B9FE4] rounded-md shadow-sm">
                  <w.icon className="size-6" strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-[19px] font-extrabold text-[#1E3A6E] mb-1 leading-snug">
                    {w.title}
                  </h3>
                  <p className="text-[14px] text-gray-600 leading-relaxed mb-2">{w.body}</p>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-extrabold text-[#1E3A6E]">
                    <BadgeCheck className="size-4 text-[#6B9FE4]" />
                    {w.stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 6. EMERGENCY BANNER ───────────────────────── */
function EmergencyBanner() {
  const opts = useSiteOptions();
  return (
    <section className="relative overflow-hidden bg-[#1E3A6E]">
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
            Plumbing Emergency?
          </h2>
          <p className="mt-2 text-lg sm:text-xl text-[#F5C842] font-bold">
            We&apos;re Available 24/7, Every Day.
          </p>
        </div>
        <a
          href={opts.phone_href}
          className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-[16px] font-extrabold uppercase tracking-wider text-[#1E3A6E] shadow-xl hover:brightness-105 active:scale-[0.98] transition-all shrink-0"
          style={{ background: GOLD_GRADIENT }}
        >
          <Phone className="size-5" />
          Call Now &mdash; {opts.phone}
        </a>
      </div>
    </section>
  );
}

/* ───────────────────────── 7. FAQ ───────────────────────── */
function FAQ() {
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
            Plumbing Service Questions
          </h2>
        </div>

        <div className="space-y-3">
          {SERVICE_FAQS.map((f, i) => {
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
                  {open ? (
                    <Minus className="size-5 text-[#4A7BC4] shrink-0" />
                  ) : (
                    <Plus className="size-5 text-[#4A7BC4] shrink-0" />
                  )}
                </button>
                {open && (
                  <div className="px-5 pb-5 text-[15px] text-gray-700 leading-relaxed">{f.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Template ───────────────────────── */
export function ServicesPageTemplate() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesCatalog />
      <IntroContent />
      <HowItWorks />
      <WhyChooseUs />
      <GoogleReviewsMarquee />
      <EmergencyBanner />
      <FAQ />
      <div id="book" className="scroll-mt-20">
        <CTABanner />
      </div>
    </>
  );
}
