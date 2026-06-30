import { useState, useEffect } from "react";
import { Phone, CheckCircle, ShieldCheck, Clock, Star, ChevronDown, MapPin, Truck, Wrench, Shield, Tag, X, type LucideIcon } from "lucide-react";
import { useSiteOptions } from "@/hooks/use-site-options";
import Particles from "@/components/ui/Particles";
import { StarBorder } from "@/components/ui/StarBorder";
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
  trackingPhone?: string;
  heroTitle: React.ReactNode;
  heroSubtitle: React.ReactNode;
  trustBarLocation: string;
  promoTextFirst: string;
  promoTextSecond: string;
  servicesTitle: string;
  servicesDesc: string;
  services: LandingServiceItem[];
  whyUsTitle: string;
  whyUsText: React.ReactNode;
  ctaTitle: React.ReactNode;
  ctaDesc: React.ReactNode;
  faqs: LandingFaqItem[];
  offerText?: string;
}

/* ── Minimal Header ── */
function LandingHeader({ trackingPhone }: { trackingPhone?: string }) {
  const opts = useSiteOptions();
  const phoneToUse = trackingPhone || opts.phone;
  const phoneHref = `tel:${phoneToUse.replace(/[^0-9]/g, '')}`;
  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_6px_14px_-2px_rgba(0,0,0,0.22)]">
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between py-2 min-h-[100px] sm:min-h-[120px]">
          <div className="shrink-0 translate-y-1">
            <img src={textLogo} alt="All Phase Plumbing" className="h-[54px] sm:h-[80px] w-auto object-contain" />
          </div>
          <div className="flex items-center">
            <StarBorder
              as="a"
              href={phoneHref}
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
              {phoneToUse}
            </StarBorder>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── Lead Form ── */
function LeadForm({ title = "Request a Service", className = "" }: { title?: string, className?: string }) {
  return (
    <div className={`relative bg-[#1E3A6E] p-8 sm:p-12 text-white ${className}`}>
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <Particles particleCount={150} particleSpread={15} speed={0.5} particleBaseSize={80} sizeRandomness={1} alphaParticles={true} cameraDistance={20} disableRotation={true} particleColors={["#ffffff"]} className="w-full h-full" />
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
            <input type="text" placeholder="FIRST NAME*" required className="w-full rounded bg-white/5 border border-white/20 px-4 py-3.5 text-[15px] font-semibold text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#F5C842] focus:bg-white/10 transition-all" />
            <input type="text" placeholder="LAST NAME*" required className="w-full rounded bg-white/5 border border-white/20 px-4 py-3.5 text-[15px] font-semibold text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#F5C842] focus:bg-white/10 transition-all" />
            <input type="text" placeholder="ZIP CODE*" required className="w-full rounded bg-white/5 border border-white/20 px-4 py-3.5 text-[15px] font-semibold text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#F5C842] focus:bg-white/10 transition-all" />
            <input type="tel" placeholder="PHONE*" required className="w-full rounded bg-white/5 border border-white/20 px-4 py-3.5 text-[15px] font-semibold text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#F5C842] focus:bg-white/10 transition-all" />
          </div>
          <div className="flex items-start gap-3 mt-6 pt-2">
            <input id={`sms-optin-${title.replace(/\s+/g, '')}`} type="checkbox" defaultChecked className="mt-1 size-4 rounded bg-white/10 border-white/20 accent-[#F5C842] cursor-pointer shrink-0" />
            <label htmlFor={`sms-optin-${title.replace(/\s+/g, '')}`} className="text-[12px] text-white/70 cursor-pointer leading-relaxed">
              By submitting this form and signing up for texts, you consent to receive messages from All Phase Plumbing at the number provided regarding your request. Msg &amp; data rates may apply.
            </label>
          </div>
          <button type="submit" className="w-full max-w-sm mx-auto block mt-8 bg-[#F5C842] text-[#1E3A6E] font-black text-lg py-4 px-8 rounded shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] hover:bg-[#eec136] hover:-translate-y-0.5 active:scale-[0.98] transition-all tracking-wide uppercase">
            SEND REQUEST
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── Hero Slideshow Background ── */
const HERO_IMAGES = [teamImg, team1, team3];
function HeroSlideshow() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => { setIdx((prev) => (prev + 1) % HERO_IMAGES.length); }, 4500);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="absolute inset-0 bg-slate-900 overflow-hidden">
      {HERO_IMAGES.map((img, i) => (
        <img key={i} src={img} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${i === idx ? "opacity-35 grayscale-[10%]" : "opacity-0"}`} alt="All Phase Plumbing Team" />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1835]/95 via-[#1E3A6E]/80 to-transparent lg:w-[85%]"></div>
    </div>
  );
}

/* ── Hero Section ── */
function LandingHero({ title, subtitle, trackingPhone }: { title: React.ReactNode, subtitle: React.ReactNode, trackingPhone?: string }) {
  const opts = useSiteOptions();
  const phoneToUse = trackingPhone || opts.phone;
  const phoneHref = `tel:${phoneToUse.replace(/[^0-9]/g, '')}`;

  return (
    <section className="relative overflow-hidden bg-slate-100 min-h-[600px] flex items-center pt-20 pb-16 lg:pt-28 lg:pb-24">
      <HeroSlideshow />
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div className="max-w-3xl transform -translate-y-[20px]">
            <h2 className="text-[#6B9FE4] font-bold text-2xl sm:text-3xl mb-2 tracking-wide">All Phase Plumbing</h2>
            <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight drop-shadow-md" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {title}
            </h1>
            <p className="text-white/90 text-lg sm:text-2xl font-medium mb-10 leading-snug drop-shadow-sm">
              {subtitle}
            </p>
            
            <div className="bg-[#1E3A6E]/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 block sm:inline-block w-full sm:w-auto">
              <a href={phoneHref} className="inline-flex items-center justify-center w-full whitespace-nowrap rounded bg-[#275BB5] hover:bg-[#F5C842] hover:text-[#1E3A6E] text-white px-4 sm:px-8 py-4 sm:py-5 font-black text-2xl sm:text-4xl transition-colors shadow-lg tracking-wider">
                <Phone className="size-7 sm:size-10 mr-2 sm:mr-4 shrink-0" />
                {phoneToUse}
              </a>
              <p className="text-center text-white/80 font-semibold mt-4 text-sm sm:text-base">
                We answer 24 hours a day. Call now and speak to a plumber.
              </p>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 lg:ml-auto w-full max-w-lg mx-auto lg:mx-0 shadow-2xl rounded-2xl overflow-hidden border border-white/20 relative transform lg:scale-95 lg:origin-center lg:-translate-y-[40px]">
            <LeadForm title="Request a Service" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Trust Bar (New for Ads) ── */
function LandingTrustBar({ location }: { location: string }) {
  return (
    <div className="bg-white border-b border-gray-200 py-6 sm:py-8 shadow-sm relative z-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center divide-x-0 md:divide-x divide-gray-100">
          <div className="flex flex-col items-center justify-center px-4">
            <Star className="size-8 text-[#F5C842] fill-current mb-3" />
            <p className="font-bold text-[#1E3A6E] text-[15px] leading-tight">4.9 Stars on Google</p>
            <p className="text-gray-500 text-xs mt-1 font-medium">50+ verified reviews</p>
          </div>
          <div className="flex flex-col items-center justify-center px-4">
            <ShieldCheck className="size-8 text-[#4A7BC4] mb-3" />
            <p className="font-bold text-[#1E3A6E] text-[15px] leading-tight">Licensed & Insured</p>
            <p className="text-gray-500 text-xs mt-1 font-medium">WA State Licensed Plumber</p>
          </div>
          <div className="flex flex-col items-center justify-center px-4">
            <Clock className="size-8 text-[#4A7BC4] mb-3" />
            <p className="font-bold text-[#1E3A6E] text-[15px] leading-tight">Same-Day Response</p>
            <p className="text-gray-500 text-xs mt-1 font-medium">Most jobs dispatched within the hour</p>
          </div>
          <div className="flex flex-col items-center justify-center px-4">
            <Shield className="size-8 text-[#4A7BC4] mb-3" />
            <p className="font-bold text-[#1E3A6E] text-[15px] leading-tight">Google Guaranteed</p>
            <p className="text-gray-500 text-xs mt-1 font-medium">Verified and background checked</p>
          </div>
          <div className="flex flex-col items-center justify-center px-4 md:col-span-3 lg:col-span-1">
            <MapPin className="size-8 text-[#4A7BC4] mb-3" />
            <p className="font-bold text-[#1E3A6E] text-[15px] leading-tight">{location}</p>
            <p className="text-gray-500 text-xs mt-1 font-medium">Locally owned & operated</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Rotating Promo Bar ── */
function PromoBar({ line1, line2 }: { line1: string, line2: string }) {
  const [showFirst, setShowFirst] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => { setShowFirst((prev) => !prev); }, 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="relative bg-[#1E3A6E] py-6 overflow-hidden border-b-4 border-[#F5C842]">
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <Particles particleCount={200} particleSpread={10} speed={0.5} particleBaseSize={100} sizeRandomness={1} alphaParticles={true} cameraDistance={20} disableRotation={true} particleColors={["#ffffff", "#6B9FE4"]} className="w-full h-full" />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center h-[32px] flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <p className={`absolute text-white font-bold text-xl md:text-2xl tracking-wide transition-all duration-700 ${showFirst ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-4'}`}>{line1}</p>
          <p className={`absolute text-[#F5C842] font-bold text-xl md:text-2xl tracking-wide transition-all duration-700 ${!showFirst ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>{line2}</p>
        </div>
      </div>
    </div>
  );
}

/* ── How It Works (New for Ads) ── */
function LandingHowItWorks({ trackingPhone }: { trackingPhone?: string }) {
  const opts = useSiteOptions();
  const phoneToUse = trackingPhone || opts.phone;
  const phoneHref = `tel:${phoneToUse.replace(/[^0-9]/g, '')}`;

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-[#1E3A6E] mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
            How It Works: Simple and Fast
          </h2>
          <div className="w-24 h-1.5 bg-[#F5C842] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gray-200 z-0"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-[#1E3A6E] text-white rounded-full flex items-center justify-center mb-6 shadow-xl border-4 border-white">
              <Phone className="size-10" />
            </div>
            <h3 className="text-2xl font-black text-[#1E3A6E] mb-3">1. Call {phoneToUse}</h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              Available 24 hours, 7 days a week. A real person or plumber answers, not a voicemail system.
            </p>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-[#1E3A6E] text-white rounded-full flex items-center justify-center mb-6 shadow-xl border-4 border-white">
              <Truck className="size-10" />
            </div>
            <h3 className="text-2xl font-black text-[#1E3A6E] mb-3">2. We Assess & Dispatch</h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              Tell us what's happening. We'll tell you immediately whether we can dispatch and give you an honest ETA.
            </p>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-[#1E3A6E] text-white rounded-full flex items-center justify-center mb-6 shadow-xl border-4 border-white">
              <Wrench className="size-10" />
            </div>
            <h3 className="text-2xl font-black text-[#1E3A6E] mb-3">3. Problem Solved</h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              A licensed plumber arrives, diagnoses the issue, and gives you an upfront price before any work starts.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-500 font-medium mb-4">Ready to call? {phoneToUse}</p>
          <a href={phoneHref} className="inline-flex items-center justify-center rounded bg-[#F5C842] text-[#1E3A6E] px-10 py-5 font-black text-xl shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] hover:bg-[#eec136] transition-all hover:-translate-y-1 uppercase tracking-wide">
            CALL {phoneToUse}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Services Section ── */
function LandingServices({ title, desc, services }: { title: string, desc: string, services: LandingServiceItem[] }) {
  return (
    <section className="py-20 bg-[#F8FAFC] relative overflow-hidden">
      <img src={peekingMascot} alt="" className="absolute top-1/2 -translate-y-1/2 w-40 sm:w-60 lg:w-80 opacity-90 pointer-events-none object-contain object-left" style={{ left: "-60px", marginTop: "60px" }} />
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-[#1E3A6E] mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>{title}</h2>
          <p className="text-gray-600 text-lg">{desc}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-8 border border-gray-100 shadow-lg hover:-translate-y-1 transition-all duration-300 text-center flex flex-col h-full">
              <div className="w-16 h-16 mx-auto bg-[#4A7BC4] text-white rounded-full flex items-center justify-center mb-6 shadow-inner shrink-0">
                <s.icon className="w-8 h-8" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-[#1E3A6E] mb-4">{s.title}</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed flex-grow">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Why Us / Static Reviews (New for Ads) ── */
const STATIC_REVIEWS = [
  { name: "Sarah M.", text: "Called at 2 AM for a flooded basement and they arrived within 45 minutes. Super professional, honest pricing, and saved our house from major damage." },
  { name: "John D.", text: "The only plumbers I'll ever use. Showed up on time, diagnosed the sewer issue immediately, and didn't try to upsell me on things I didn't need." },
  { name: "Emily R.", text: "Fast response and extremely knowledgeable. We had a completely blocked main line and they had it cleared same day. Highly recommended for emergencies." }
];

function LandingWhyUs({ title, text }: { title: string, text: React.ReactNode }) {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1E3A6E] mb-8 leading-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {title}
            </h2>
            <div className="w-20 h-1.5 bg-[#F5C842] mb-8"></div>
            <div className="prose prose-lg text-gray-600 font-medium leading-relaxed">
              {text}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-black text-[#1E3A6E] mb-6 border-b pb-4">What Our Customers Say</h3>
            <div className="relative overflow-hidden landing-reviews-mask h-[440px] sm:h-[480px]">
              <div className="landing-reviews-track">
                {[...STATIC_REVIEWS, ...STATIC_REVIEWS].map((review, i) => (
                  <div key={i} className="bg-[#F8FAFC] p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
                    <div className="flex text-[#F5C842] mb-3">
                      {[...Array(5)].map((_, j) => <Star key={j} className="size-5 fill-current" />)}
                    </div>
                    <p className="text-gray-700 italic mb-4 font-medium leading-relaxed">"{review.text}"</p>
                    <p className="text-[#1E3A6E] font-bold">{review.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .landing-reviews-mask {
          mask-image: linear-gradient(180deg, transparent 0, #000 10%, #000 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(180deg, transparent 0, #000 10%, #000 90%, transparent 100%);
        }
        .landing-reviews-track {
          animation: landing-reviews-scroll 28s linear infinite;
          will-change: transform;
        }
        .landing-reviews-mask:hover .landing-reviews-track {
          animation-play-state: paused;
        }
        @keyframes landing-reviews-scroll {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .landing-reviews-track { animation: none; }
        }
      `}</style>
    </section>
  );
}

/* ── Emergency CTA with Particles ── */
function EmergencyCTASection({ title, desc, trackingPhone }: { title: React.ReactNode, desc: React.ReactNode, trackingPhone?: string }) {
  const opts = useSiteOptions();
  const phoneToUse = trackingPhone || opts.phone;
  const phoneHref = `tel:${phoneToUse.replace(/[^0-9]/g, '')}`;

  return (
    <section className="relative bg-[#1E3A6E] py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <Particles particleCount={300} particleSpread={20} speed={0.4} particleBaseSize={100} sizeRandomness={1} alphaParticles={true} cameraDistance={20} disableRotation={true} particleColors={["#ffffff", "#4A7BC4"]} className="w-full h-full" />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>{title}</h2>
        <p className="text-base sm:text-xl text-white/90 font-medium mb-10 leading-relaxed max-w-3xl mx-auto">{desc}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={phoneHref} className="w-full sm:w-auto inline-flex items-center justify-center bg-[#F5C842] text-[#1E3A6E] px-8 py-4 font-bold text-[15px] sm:text-lg shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] hover:bg-[#eec136] transition-all hover:-translate-y-1 uppercase tracking-wide">
            CALL {phoneToUse}
          </a>
          <button className="w-full sm:w-auto inline-flex items-center justify-center bg-[#F5C842] text-[#1E3A6E] px-8 py-4 font-bold text-[15px] sm:text-lg shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] hover:bg-[#eec136] transition-all hover:-translate-y-1 uppercase tracking-wide" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
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
  if (!faqs || faqs.length === 0) return null;
  
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
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-gray-50 transition-colors">
                <span className="font-bold text-lg text-[#1E3A6E] pr-4">{faq.q}</span>
                <ChevronDown className={`size-5 text-[#4A7BC4] shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-6 text-gray-600 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">{faq.a}</div>
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
          <div className="relative h-64 lg:h-auto">
            <img src={teamImg} alt="All Phase Plumbing Crew" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <LeadForm title="Request a Service" />
        </div>
      </div>
    </section>
  );
}

/* ── Minimal Footer ── */
function LandingFooter({ trackingPhone }: { trackingPhone?: string }) {
  const opts = useSiteOptions();
  const phoneToUse = trackingPhone || opts.phone;
  return (
    <footer className="bg-white py-12 pb-28 sm:pb-12 border-t border-gray-200 relative overflow-hidden">
      <img src={mascot} alt="All Phase Plumbing Mascot" className="absolute bottom-0 right-2 left-auto ml-0 sm:right-auto sm:left-1/2 sm:ml-[200px] lg:ml-[250px] h-20 sm:h-48 lg:h-56 object-contain pointer-events-none opacity-40 sm:opacity-90" />
      <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-10">
        <img src={textLogo} alt="All Phase Plumbing" className="h-[60px] w-auto object-contain mb-6 grayscale opacity-80" />
        <p className="text-gray-500 font-medium mb-2">Licensed &amp; Insured Plumbers serving Seattle</p>
        <p className="text-gray-500 font-medium mb-6">Call {phoneToUse} for 24/7 service.</p>
        <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} All Phase Plumbing. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ── Sticky Offer Bar ── */
function OfferBar({ offerText, trackingPhone }: { offerText: string, trackingPhone?: string }) {
  const opts = useSiteOptions();
  const [dismissed, setDismissed] = useState(false);
  const phoneToUse = trackingPhone || opts.phone;
  const phoneHref = `tel:${phoneToUse.replace(/[^0-9]/g, '')}`;
  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] bg-[#1E3A6E] border-t-4 border-[#F5C842] shadow-[0_-8px_24px_-6px_rgba(0,0,0,0.4)]">
      <div className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <span className="hidden sm:flex shrink-0 size-9 sm:size-11 rounded-full bg-[#F5C842] items-center justify-center">
            <Tag className="size-5 sm:size-6 text-[#1E3A6E]" strokeWidth={2.5} />
          </span>
          <div className="min-w-0">
            <p className="text-[#F5C842] font-black text-sm sm:text-xl leading-tight truncate">{offerText}</p>
            <p className="text-white/80 text-[11px] sm:text-sm font-medium leading-tight truncate">Mention this offer when you call.</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <a href={phoneHref} className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#F5C842] text-[#1E3A6E] font-black text-xs sm:text-base px-3.5 sm:px-7 py-2.5 sm:py-3 rounded shadow-[0_4px_12px_-2px_rgba(0,0,0,0.35)] hover:bg-[#eec136] active:scale-[0.98] transition-all uppercase tracking-wide whitespace-nowrap">
            <Phone className="size-4 sm:size-5" />
            <span className="hidden sm:inline">Claim Offer</span>
            <span className="sm:hidden">Call</span>
          </a>
          <button onClick={() => setDismissed(true)} aria-label="Dismiss offer" className="shrink-0 text-white/50 hover:text-white transition-colors p-1">
            <X className="size-4 sm:size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Layout Assembly ── */
export function LandingPageTemplate(props: LandingPageTemplateProps) {
  return (
    <div className="min-h-screen bg-white pb-[72px] sm:pb-[84px]">
      <LandingHeader trackingPhone={props.trackingPhone} />
      <main>
        <LandingHero title={props.heroTitle} subtitle={props.heroSubtitle} trackingPhone={props.trackingPhone} />
        <LandingTrustBar location={props.trustBarLocation} />
        <PromoBar line1={props.promoTextFirst} line2={props.promoTextSecond} />
        <LandingServices title={props.servicesTitle} desc={props.servicesDesc} services={props.services} />
        <LandingHowItWorks trackingPhone={props.trackingPhone} />
        <LandingWhyUs title={props.whyUsTitle} text={props.whyUsText} />
        
        <style>{`
          .connected-sections { background: linear-gradient(150deg, #0f2246 0%, #1E3A6E 40%, #2d5fa8 75%, #4A7BC4 100%) !important; }
          .connected-sections > section { background: transparent !important; border: none !important; }
        `}</style>
        <div className="connected-sections">
          <ServiceArea />
          <EmergencyCTASection title={props.ctaTitle} desc={props.ctaDesc} trackingPhone={props.trackingPhone} />
        </div>
        <LandingFAQ faqs={props.faqs} />
        <BottomFormSection />
      </main>
      <LandingFooter trackingPhone={props.trackingPhone} />
      <OfferBar offerText={props.offerText ?? "$50 Off Drain Cleaning"} trackingPhone={props.trackingPhone} />
    </div>
  );
}
