import { useState, useEffect } from "react";
import { Phone, CheckCircle, ShieldCheck, Clock, Star, ChevronDown, type LucideIcon } from "lucide-react";
import { useSiteOptions } from "@/hooks/use-site-options";
import Particles from "@/components/ui/Particles";
import { StarBorder } from "@/components/ui/StarBorder";
import { GoogleReviewsMarquee } from "@/components/sections/GoogleReviewsMarquee";
import { ServiceArea } from "@/components/sections/ServiceArea";

import textLogo from "@/assets/App updated logo.png";
import teamImg from "@/assets/team.jpg";
import team1 from "@/assets/team-1.webp";
import team3 from "@/assets/team-3.webp";
import peekingMascot from "@/assets/peeking mascot watermark.svg";
import mascot from "@/assets/mascot.svg";

export interface LandingServiceItem {
  title: string;
  desc: string;
  icon: LucideIcon;
}

export interface LandingFaqItem {
  q: string;
  a: string;
}

export interface LandingPageTemplateProps {
  heroTitle: React.ReactNode;
  heroSubtitle: React.ReactNode;
  promoTextFirst: string;
  promoTextSecond: string;
  servicesTitle: string;
  servicesDesc: string;
  services: LandingServiceItem[];
  ctaTitle: React.ReactNode;
  ctaDesc: React.ReactNode;
  faqs: LandingFaqItem[];
}

/* ── Minimal Header ── */
function LandingHeader() {
  const opts = useSiteOptions();
  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_6px_14px_-2px_rgba(0,0,0,0.22)]">
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between py-2 min-h-[90px] sm:min-h-[120px]">
          <div className="shrink-0 translate-y-1">
            <img src={textLogo} alt="All Phase Plumbing" className="h-[42px] sm:h-[80px] w-auto object-contain" />
          </div>
          <div className="flex items-center">
            <StarBorder
              as="a"
              href={opts.phone_href}
              className="active:scale-[0.98] hover:scale-[1.04] hover:-translate-y-0.5 transition-all duration-300"
              innerClassName="flex items-center justify-center font-extrabold text-[#1E3A6E] whitespace-nowrap"
              innerStyle={{
                background: "#F5C842",
                border: "2px solid #1E3A6E",
                padding: "8px 16px",
                fontSize: "18px",
                boxShadow: "0 4px 12px -2px rgba(30,58,110,0.3)",
                transition: "transform 300ms ease, box-shadow 300ms ease",
              }}
            >
              <Phone className="size-5 mr-2" />
              {opts.phone}
            </StarBorder>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── Navy Blue Form with Particles (Like Screenshot) ── */
function LeadForm({ title = "Request a Service", className = "" }: { title?: string, className?: string }) {
  return (
    <div className={`relative bg-[#1E3A6E] p-8 sm:p-12 text-white ${className}`}>
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <Particles
          particleCount={150}
          particleSpread={15}
          speed={0.5}
          particleBaseSize={80}
          sizeRandomness={1}
          alphaParticles={true}
          cameraDistance={20}
          disableRotation={true}
          particleColors={["#ffffff"]}
          className="w-full h-full"
        />
      </div>
      <div className="relative z-10 w-full max-w-xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black mb-4 leading-tight text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
          {title}
        </h2>
        <div className="w-16 h-1 bg-[#F5C842] mx-auto mb-6"></div>
        <p className="font-medium text-white/90 mb-10 text-center text-[15px] sm:text-base leading-relaxed">
          Fill out the form and we'll get back to you within the hour. Same-day service available.
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="FIRST NAME*"
              required
              className="w-full rounded bg-white/5 border border-white/20 px-4 py-3.5 text-[15px] font-semibold text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#F5C842] focus:bg-white/10 transition-all"
            />
            <input
              type="text"
              placeholder="LAST NAME*"
              required
              className="w-full rounded bg-white/5 border border-white/20 px-4 py-3.5 text-[15px] font-semibold text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#F5C842] focus:bg-white/10 transition-all"
            />
            <input
              type="text"
              placeholder="ZIP CODE*"
              required
              className="w-full rounded bg-white/5 border border-white/20 px-4 py-3.5 text-[15px] font-semibold text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#F5C842] focus:bg-white/10 transition-all"
            />
            <input
              type="tel"
              placeholder="PHONE*"
              required
              className="w-full rounded bg-white/5 border border-white/20 px-4 py-3.5 text-[15px] font-semibold text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#F5C842] focus:bg-white/10 transition-all"
            />
          </div>
          <select
            required
            defaultValue=""
            className="w-full rounded bg-white/5 border border-white/20 px-4 py-3.5 text-[15px] font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#F5C842] focus:bg-white/10 transition-all appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 16px center",
              backgroundSize: "16px",
              paddingRight: "40px",
            }}
          >
            <option value="" disabled className="text-gray-900">SERVICE NEEDED</option>
            <option value="Drain Cleaning" className="text-gray-900">Drain Cleaning</option>
            <option value="Hydro Jetting" className="text-gray-900">Hydro Jetting</option>
            <option value="Sewer Repair" className="text-gray-900">Sewer Line Repair</option>
            <option value="Other" className="text-gray-900">Other Emergency</option>
          </select>

          <div className="flex items-start gap-3 mt-6 pt-2">
            <input
              id={`sms-optin-${title.replace(/\s+/g, '')}`}
              type="checkbox"
              defaultChecked
              className="mt-1 size-4 rounded bg-white/10 border-white/20 accent-[#F5C842] cursor-pointer shrink-0"
            />
            <label htmlFor={`sms-optin-${title.replace(/\s+/g, '')}`} className="text-[12px] text-white/70 cursor-pointer leading-relaxed">
              By submitting this form and signing up for texts, you consent to receive messages from All Phase Plumbing at the number provided regarding your request, updates about appointments and services or promotions and offers, including messages sent by autodialer. Consent is not a condition of purchase. Msg &amp; data rates may apply. Msg frequency varies. Unsubscribe at any time by replying STOP. Reply HELP for help.
            </label>
          </div>

          <button
            type="submit"
            className="w-full max-w-sm mx-auto block mt-8 bg-[#F5C842] text-[#1E3A6E] font-black text-lg py-4 px-8 rounded shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] hover:bg-[#eec136] hover:-translate-y-0.5 active:scale-[0.98] transition-all tracking-wide uppercase"
          >
            SEND REQUEST
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── Hero Slideshow Background ── */
const HERO_IMAGES = [
  teamImg,
  team1,
  team3
];

function HeroSlideshow() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 bg-slate-900 overflow-hidden">
      {HERO_IMAGES.map((img, i) => (
        <img
          key={i}
          src={img}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === idx ? "opacity-35 grayscale-[10%]" : "opacity-0"
          }`}
          alt="All Phase Plumbing Team"
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1835]/95 via-[#1E3A6E]/80 to-transparent lg:w-[75%]"></div>
    </div>
  );
}

/* ── Hero Section ── */
function LandingHero({ title, subtitle }: { title: React.ReactNode, subtitle: React.ReactNode }) {
  const opts = useSiteOptions();
  return (
    <section className="relative overflow-hidden bg-slate-100 min-h-[700px] flex items-center pt-24 pb-20 lg:pt-32 lg:pb-28">
      <HeroSlideshow />

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div className="max-w-2xl transform -translate-y-[60px]">
            <h2 className="text-[#6B9FE4] font-bold text-2xl sm:text-3xl mb-2 tracking-wide">All Phase Plumbing</h2>
            <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight drop-shadow-md" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {title}
            </h1>
            <p className="text-white/90 text-lg sm:text-2xl font-medium mb-10 leading-snug drop-shadow-sm">
              {subtitle}
            </p>
            
            <a
              href={opts.phone_href}
              className="inline-flex items-center justify-center rounded bg-[#275BB5] hover:bg-[#F5C842] hover:text-[#1E3A6E] text-white px-8 py-4 font-bold text-xl sm:text-2xl transition-colors shadow-lg"
            >
              CALL {opts.phone}
            </a>

            {/* Trust Indicators */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/90 font-semibold text-sm sm:text-base drop-shadow-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="size-5 text-[#6B9FE4]" /> Serving Puget Sound Since 1989
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-[#6B9FE4]" /> Licensed &amp; Insured
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-5 text-[#6B9FE4]" /> Same-Day Service Available
              </div>
              <div className="flex items-center gap-2">
                <Star className="size-5 text-[#6B9FE4] fill-current" /> 4.8 Google Rating (50+ reviews)
              </div>
            </div>
          </div>

          <div className="mt-10 lg:mt-0 lg:ml-auto w-full max-w-lg mx-auto lg:mx-0 shadow-2xl rounded-2xl overflow-hidden border border-white/20 relative transform lg:scale-95 lg:origin-center lg:-translate-y-[60px]">
            <LeadForm title="Request a Service" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Rotating Promo Bar ── */
function PromoBar({ line1, line2 }: { line1: string, line2: string }) {
  const [showFirst, setShowFirst] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowFirst((prev) => !prev);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-[#1E3A6E] py-6 overflow-hidden border-y-4 border-[#F5C842]">
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <Particles
          particleCount={200}
          particleSpread={10}
          speed={0.5}
          particleBaseSize={100}
          sizeRandomness={1}
          alphaParticles={true}
          cameraDistance={20}
          disableRotation={true}
          particleColors={["#ffffff", "#6B9FE4"]}
          className="w-full h-full"
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center h-[32px] flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <p className={`absolute text-white font-bold text-xl md:text-2xl tracking-wide transition-all duration-700 ${showFirst ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-4'}`}>
            {line1}
          </p>
          <p className={`absolute text-[#F5C842] font-bold text-xl md:text-2xl tracking-wide transition-all duration-700 ${!showFirst ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
            {line2}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Services Section ── */
function LandingServices({ title, desc, services }: { title: string, desc: string, services: LandingServiceItem[] }) {
  const opts = useSiteOptions();
  return (
    <section className="py-20 bg-[#F8FAFC] relative overflow-hidden">
      {/* Peeking Mascot Watermark */}
      <img
        src={peekingMascot}
        alt=""
        className="absolute top-1/2 -translate-y-1/2 w-40 sm:w-60 lg:w-80 opacity-90 pointer-events-none object-contain object-left"
        style={{ left: "-60px", marginTop: "60px" }}
        width={320}
        height={320}
        loading="lazy"
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-[#1E3A6E] mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
            {title}
          </h2>
          <p className="text-gray-600 text-lg">
            {desc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-8 border border-gray-100 shadow-[0_15px_40px_-10px_rgba(30,58,110,0.2)] hover:-translate-y-2 hover:shadow-[0_25px_60px_-15px_rgba(30,58,110,0.35)] transition-all duration-300 text-center flex flex-col h-full">
              <div className="w-16 h-16 mx-auto bg-[#4A7BC4] text-white rounded-full flex items-center justify-center mb-6 shadow-inner shrink-0">
                <s.icon className="w-8 h-8" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-[#1E3A6E] mb-4">{s.title}</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6 flex-grow">
                {s.desc}
              </p>
              <button className="text-[#4A7BC4] font-semibold text-sm hover:text-[#1E3A6E] transition-colors mt-auto shrink-0">
                Learn More →
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href={opts.phone_href}
            className="inline-flex items-center justify-center rounded bg-[#F5C842] text-[#1E3A6E] px-10 py-5 font-black text-xl shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] hover:bg-[#eec136] transition-all hover:-translate-y-1 uppercase tracking-wide"
          >
            CALL NOW {opts.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Emergency CTA with Particles ── */
function EmergencyCTASection({ title, desc }: { title: React.ReactNode, desc: React.ReactNode }) {
  const opts = useSiteOptions();
  return (
    <section className="relative bg-[#1E3A6E] py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <Particles
          particleCount={300}
          particleSpread={20}
          speed={0.4}
          particleBaseSize={100}
          sizeRandomness={1}
          alphaParticles={true}
          cameraDistance={20}
          disableRotation={true}
          particleColors={["#ffffff", "#4A7BC4"]}
          className="w-full h-full"
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
          {title}
        </h2>
        <p className="text-base sm:text-xl text-white/90 font-medium mb-10 leading-relaxed max-w-3xl mx-auto">
          {desc}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={opts.phone_href}
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#F5C842] text-[#1E3A6E] px-8 py-4 font-bold text-[15px] sm:text-lg shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] hover:bg-[#eec136] transition-all hover:-translate-y-1 uppercase tracking-wide"
          >
            CALL {opts.phone}
          </a>
          <button
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#F5C842] text-[#1E3A6E] px-8 py-4 font-bold text-[15px] sm:text-lg shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] hover:bg-[#eec136] transition-all hover:-translate-y-1 uppercase tracking-wide"
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          >
            GET FREE QUOTE
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ Section ── */
function LandingFAQ({ faqs }: { faqs: LandingFaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-black text-[#1E3A6E] mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-[#F5C842] mx-auto"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-lg text-[#1E3A6E] pr-4">{faq.q}</span>
                <ChevronDown className={`size-5 text-[#4A7BC4] shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-6 text-gray-600 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Bottom Form Section ── */
function BottomFormSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 shadow-[0_20px_60px_-15px_rgba(30,58,110,0.4)] rounded-2xl overflow-hidden border border-gray-200">
          
          {/* Left: Image */}
          <div className="relative h-64 lg:h-auto">
            <img src={teamImg} alt="All Phase Plumbing Crew" className="absolute inset-0 w-full h-full object-cover" />
          </div>

          {/* Right: Form */}
          <LeadForm title="Request a Service" />
        </div>
      </div>
    </section>
  );
}

/* ── Minimal Footer ── */
function LandingFooter() {
  const opts = useSiteOptions();
  return (
    <footer className="bg-white py-12 border-t border-gray-200 relative overflow-hidden">
      {/* Mascot pulled closer to the center text */}
      <img 
        src={mascot} 
        alt="All Phase Plumbing Mascot" 
        className="absolute bottom-0 left-1/2 ml-[130px] sm:ml-[200px] lg:ml-[250px] h-32 sm:h-48 lg:h-56 object-contain pointer-events-none opacity-90"
      />
      <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-10">
        <img src={textLogo} alt="All Phase Plumbing" className="h-[60px] w-auto object-contain mb-6 grayscale opacity-80" />
        <p className="text-gray-500 font-medium mb-2">Licensed &amp; Insured Plumbers serving Seattle</p>
        <p className="text-gray-500 font-medium mb-6">Call {opts.phone} for 24/7 service.</p>
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} All Phase Plumbing. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ── Main Layout Assembly ── */
export function LandingPageTemplate(props: LandingPageTemplateProps) {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      <main>
        <LandingHero title={props.heroTitle} subtitle={props.heroSubtitle} />
        <PromoBar line1={props.promoTextFirst} line2={props.promoTextSecond} />
        <LandingServices title={props.servicesTitle} desc={props.servicesDesc} services={props.services} />
        <style>{`
          .connected-sections {
            background: linear-gradient(150deg, #0f2246 0%, #1E3A6E 40%, #2d5fa8 75%, #4A7BC4 100%) !important;
          }
          .connected-sections > section {
            background: transparent !important;
            border: none !important;
          }
        `}</style>
        <div className="connected-sections">
          <GoogleReviewsMarquee />
          <ServiceArea />
          <EmergencyCTASection title={props.ctaTitle} desc={props.ctaDesc} />
        </div>
        <LandingFAQ faqs={props.faqs} />
        <BottomFormSection />
      </main>
      <LandingFooter />
    </div>
  );
}
