import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { WhyUs } from "@/components/sections/WhyUs";
import { Services } from "@/components/sections/Services";
import { TeamSection } from "@/components/sections/TeamSection";
import { Badges } from "@/components/sections/Badges";
import { CTABanner } from "@/components/sections/CTABanner";
import { StarBorder } from "@/components/ui/StarBorder";
import { useSiteOptions } from "@/hooks/use-site-options";
import { Play, Phone, ShieldCheck, Clock, Award, Wrench } from "lucide-react";
import skylineBg from "@/assets/seattle-skyline.jpg";
import teamImg from "@/assets/team.jpg";
import { Masonry } from "@/components/ui/Masonry";
import Particles from "@/components/ui/Particles";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About All Phase Plumbing — Seattle Family-Owned Since 1989" },
      {
        name: "description",
        content:
          "Family-owned plumbing company in Tukwila, WA. Licensed technicians serving Greater Seattle for over 35 years.",
      },
      { property: "og:title", content: "About All Phase Plumbing" },
      {
        property: "og:description",
        content: "Family-owned plumbing serving Greater Seattle since 1989.",
      },
    ],
  }),
  component: AboutPage,
});

/* ── 1. About Us Hero (Height reduced at the bottom by 20%) ── */
function AboutHero() {
  return (
    <section className="relative bg-[#eef4fb] pt-16 pb-7 sm:pt-[90px] sm:pb-10 overflow-hidden border-b border-[#1E3A6E]/10">
      <img
        src={skylineBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        style={{ opacity: 0.3, filter: "blur(1px) brightness(0.95)" }}
      />
      <div className="relative container mx-auto px-4 text-center">
        <h1
          className="text-[26px] sm:text-[43px] lg:text-[53px] font-black tracking-tight text-[#1E3A6E]"
          style={{
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "0.02em",
            textShadow: "0 4px 12px rgba(147, 197, 253, 0.9)",
          }}
        >
          ABOUT US
        </h1>
        <nav className="text-[13px] sm:text-[14px] mt-3 flex items-center justify-center font-bold text-[#1E3A6E]">
          <Link to="/" className="hover:underline text-[#4A7BC4]">
            Home
          </Link>
          <span className="mx-2 text-[#1E3A6E]/50">-</span>
          <span className="text-[#1E3A6E]">About Us</span>
        </nav>
      </div>
    </section>
  );
}

/* ── 2. Core Intro Section ("We Protect Your Home") ── */
function AboutIntro() {
  const points = [
    { Icon: ShieldCheck, title: "Licensed & Insured", body: "Every job backed by certified, bonded technicians." },
    { Icon: Clock, title: "24/7 Emergency Response", body: "Same-day service across Greater Seattle." },
    { Icon: Award, title: "35+ Years of Trust", body: "Family-owned and serving the community since 1989." },
    { Icon: Wrench, title: "Honest, Upfront Pricing", body: "No surprises — clear quotes before we start work." },
  ];

  return (
    <section className="relative bg-white py-16 sm:py-20 overflow-hidden">
      {/* subtle dot grid backdrop */}
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
          {/* ── LEFT: copy + points + CTA ── */}
          <div>
            <span className="inline-block text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-[#4A7BC4] mb-3">
              About All Phase
            </span>

            <h2
              className="text-[30px] sm:text-[40px] font-black text-[#1E3A6E] leading-[1.1]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              We Protect Your Home as if It Were Our Own
            </h2>

            <div className="mt-5 w-16 h-1.5 rounded-full bg-[#F5C842]" />

            <p className="mt-6 text-[15px] sm:text-[17px] text-gray-600 leading-relaxed">
              At All Phase Plumbing, nothing speaks louder than the words of our satisfied customers. We've proudly earned the trust of homeowners across the Greater Seattle Area by delivering fast, reliable, and affordable plumbing services every single time. From emergency repairs to full system installations, our clients appreciate our honesty, professionalism, and quality workmanship.
            </p>

            {/* feature points */}
            <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-5">
              {points.map(({ Icon, title, body }) => (
                <li key={title} className="flex items-start gap-3.5">
                  <span
                    className="inline-flex items-center justify-center size-11 rounded-xl text-white shrink-0 shadow-md"
                    style={{ background: "linear-gradient(135deg,#1E3A6E,#4A7BC4)" }}
                  >
                    <Icon className="size-5" strokeWidth={2.4} />
                  </span>
                  <div>
                    <div className="text-[15px] font-black text-[#1E3A6E] leading-tight">{title}</div>
                    <div className="text-[13.5px] text-gray-500 mt-1 leading-snug">{body}</div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Stylish CALL US strip */}
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
              <a
                href="tel:+12067726077"
                className="group relative inline-flex items-center gap-3 overflow-hidden
                           rounded-xl px-7 py-4 text-white font-extrabold tracking-wide
                           shadow-[0_10px_25px_-8px_rgba(30,58,110,0.55)]
                           hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-8px_rgba(30,58,110,0.65)]
                           active:scale-[0.98] transition-all duration-200"
                style={{ background: "linear-gradient(135deg,#1E3A6E 0%,#2d5fa8 60%,#4A7BC4 100%)" }}
              >
                <span
                  className="absolute inset-y-0 -left-1 w-1.5 bg-[#F5C842]"
                  aria-hidden="true"
                />
                <span className="inline-flex items-center justify-center size-9 rounded-full bg-[#F5C842] text-[#1E3A6E] shadow-inner shrink-0 group-hover:rotate-[18deg] transition-transform duration-300">
                  <Phone className="size-4.5" strokeWidth={3} />
                </span>
                <span className="flex flex-col leading-tight text-left">
                  <span className="text-[10px] uppercase tracking-[0.22em] opacity-80">Call us 24/7</span>
                  <span className="text-[19px] font-black">(206) 772-6077</span>
                </span>
              </a>

              <div className="text-[13px] text-gray-500 leading-snug max-w-[220px]">
                <span className="font-bold text-[#1E3A6E]">Free estimates</span>
                <br />
                on most services — talk to a real plumber, not a robot.
              </div>
            </div>
          </div>

          {/* ── RIGHT: framed team photo with navy border ── */}
          <div className="relative flex items-center justify-center order-first lg:order-last">
            {/* offset navy frame */}
            <div
              className="absolute inset-0 rounded-3xl border-[3px] border-[#1E3A6E]/30 pointer-events-none"
              style={{ transform: "translate(14px, 14px)" }}
              aria-hidden="true"
            />
            {/* gold corner accents */}
            <div
              className="absolute -top-1 -left-1 w-14 h-14 border-t-[5px] border-l-[5px] border-[#F5C842] rounded-tl-3xl z-20"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-1 -right-1 w-14 h-14 border-b-[5px] border-r-[5px] border-[#F5C842] rounded-br-3xl z-20"
              aria-hidden="true"
            />

            {/* main framed photo */}
            <div
              className="relative w-full rounded-3xl overflow-hidden bg-slate-50
                         shadow-[0_25px_60px_-15px_rgba(30,58,110,0.45)]
                         border-[6px] border-[#1E3A6E]
                         aspect-[1.45] sm:aspect-[1.55] group"
            >
              <img
                src={teamImg}
                alt="All Phase Plumbing Crew"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
              {/* soft navy gradient at bottom for depth */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(30,58,110,0.35), transparent)" }}
                aria-hidden="true"
              />
            </div>

            {/* Floating badge — "Family Owned" */}
            <div
              className="absolute -bottom-6 left-4 sm:left-6 z-30 flex items-center gap-3
                         bg-white rounded-xl px-4 py-3 shadow-[0_10px_30px_rgba(30,58,110,0.22)]
                         border border-[#1E3A6E]/10"
            >
              <div
                className="flex items-center justify-center w-11 h-11 rounded-full text-white text-lg font-black shrink-0"
                style={{ background: "linear-gradient(135deg,#1E3A6E,#4A7BC4)" }}
              >
                ★
              </div>
              <div>
                <div className="text-[14px] font-black text-[#1E3A6E] leading-none">Family Owned</div>
                <div className="text-[12px] text-gray-500 mt-1">Since 1989</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 5. Hear From Our Team — YouTube video carousel + lightbox ── */

// ⚠️  Replace each youtubeId with the real video ID from the URL
//     e.g. https://youtu.be/dQw4w9WgXcQ  →  youtubeId: "dQw4w9WgXcQ"
const TEAM_VIDEOS = [
  { youtubeId: "RajYE63nG3U", name: "Gary Hanowalt", role: "Owner" },
  { youtubeId: "lt3EWALCVJQ", name: "Larry Belich", role: "General Manager" },
  { youtubeId: "5d--UIUnVvA", name: "Regina Wright", role: "Office Manager" },
  { youtubeId: "VuiMTB6R1NM", name: "Mike McCrae", role: "Equipment & Tech Support" },
  { youtubeId: "4BjcTb-qMYY", name: "EJ Snyder", role: "Sewer & Excavation Specialist" },
  { youtubeId: "nICtZl4hoM4", name: "Jason Carlton", role: "Project Manager / Field Supervisor" },
];

function AboutInterview() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0); // bumped on manual navigation to restart timer

  const total = TEAM_VIDEOS.length;
  const current = TEAM_VIDEOS[activeIdx];

  const prev = () => { setActiveIdx((i) => (i === 0 ? total - 1 : i - 1)); setResetKey((k) => k + 1); };
  const next = () => { setActiveIdx((i) => (i === total - 1 ? 0 : i + 1)); setResetKey((k) => k + 1); };
  const goTo = (i: number) => { setActiveIdx(i); setResetKey((k) => k + 1); };

  /* ── Auto-slide every 3 s (pauses when lightbox is open) ── */
  useEffect(() => {
    if (lightboxOpen) return;
    const timer = setInterval(() => {
      setActiveIdx((i) => (i === total - 1 ? 0 : i + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [lightboxOpen, total, resetKey]);

  /* ── Keyboard nav + body scroll lock when lightbox is open ── */
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, activeIdx]);

  return (
    <section className="bg-slate-50 py-16 sm:py-20 border-y border-slate-100">
      <div className="mx-auto px-4 max-w-[1305px]">
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-14 items-center">
          {/* ── LEFT: video carousel ── */}
          <div className="w-full">
            <div
              className="relative aspect-video overflow-hidden rounded-2xl bg-slate-950 cursor-pointer group
                         shadow-[0_25px_60px_-15px_rgba(30,58,110,0.45)]
                         border-[6px] border-[#1E3A6E]"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                key={current.youtubeId}
                src={`https://img.youtube.com/vi/${current.youtubeId}/maxresdefault.jpg`}
                alt={current.name}
                className="w-full h-full object-cover transition-all duration-700 animate-in fade-in group-hover:scale-[1.02]"
              />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-16 sm:size-20 rounded-full bg-white/25 backdrop-blur-[3px] border-2 border-white/70 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/35 transition-all duration-300">
                  <Play className="size-7 sm:size-9 fill-white text-white ml-1" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-[7px] mt-5">
              {TEAM_VIDEOS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Video ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ease-out ${
                    i === activeIdx
                      ? "w-[22px] h-[8px] bg-[#1E3A6E]"
                      : "w-[8px] h-[8px] bg-[#1E3A6E]/25 hover:bg-[#1E3A6E]/55"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT: description + team list ── */}
          <div>
            <span className="inline-block text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-[#4A7BC4] mb-3">
              Meet the Crew
            </span>
            <h2
              className="text-[30px] sm:text-[40px] font-black text-[#1E3A6E] leading-[1.1]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Hear From Our Team
            </h2>
            <div className="mt-4 w-14 h-1.5 rounded-full bg-[#F5C842]" />
            <p className="mt-5 text-[15px] sm:text-[16px] text-gray-600 leading-relaxed">
              The people behind All Phase Plumbing — born and raised in the Pacific Northwest with decades of plumbing experience between them. Click any video to hear their story in their own words.
            </p>

            {/* Team list — name + designation */}
            <ul className="mt-7 space-y-2.5">
              {TEAM_VIDEOS.map((m, i) => {
                const active = i === activeIdx;
                return (
                  <li key={m.youtubeId}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      className={`group w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-lg border text-left
                                  transition-all duration-200
                                  ${
                                    active
                                      ? "bg-white border-[#1E3A6E] shadow-[0_8px_24px_-12px_rgba(30,58,110,0.35)]"
                                      : "bg-white/60 border-transparent hover:bg-white hover:border-[#1E3A6E]/30"
                                  }`}
                    >
                      <span
                        className={`flex items-center justify-center size-9 rounded-full shrink-0 text-white text-[13px] font-black
                                    transition-colors duration-200
                                    ${active ? "" : "opacity-80 group-hover:opacity-100"}`}
                        style={{ background: "linear-gradient(135deg,#1E3A6E,#4A7BC4)" }}
                      >
                        {i + 1}
                      </span>
                      <span className="flex flex-col leading-tight min-w-0">
                        <span className="text-[15px] font-black text-[#1E3A6E] truncate">{m.name}</span>
                        <span className="text-[12.5px] font-semibold uppercase tracking-wider text-[#4A7BC4] mt-0.5 truncate">
                          {m.role}
                        </span>
                      </span>
                      {active && (
                        <span className="ml-auto text-[10px] font-black uppercase tracking-widest text-[#F5C842] shrink-0">
                          Now playing
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Lightbox modal ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/88 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Counter */}
          <div className="absolute top-4 left-4 text-white/70 text-sm font-bold tracking-widest select-none">
            {activeIdx + 1} / {total}
          </div>

          {/* Close */}
          <button
            type="button"
            className="absolute top-3 right-4 p-2.5 text-white/80 hover:text-white transition-colors"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-7">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Prev arrow */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 sm:left-6 p-3 text-white/70 hover:text-white transition-colors"
            aria-label="Previous video"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-8 sm:size-10">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 sm:right-6 p-3 text-white/70 hover:text-white transition-colors"
            aria-label="Next video"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-8 sm:size-10">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* YouTube embed */}
          <div
            className="relative w-full max-w-5xl mx-16 sm:mx-24 aspect-video shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              key={current.youtubeId}
              src={`https://www.youtube.com/embed/${current.youtubeId}?autoplay=1&rel=0`}
              title={current.name}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}

/* ── 6. Standalone quote banner ("At All Phase Plumbing... CONTACT US") ── */
function AboutActionBanner() {
  return (
    <section className="bg-white py-12 w-full">
      {/* Full-width Blue Gradient Banner from total left to right */}
      <div
        className="w-full bg-gradient-to-r from-[#1E3A6E] via-[#244585] to-[#4A7BC4] py-16 px-6 sm:px-12 relative overflow-hidden text-center shadow-xl border-y border-white/10"
      >
        {/* Particle background (same as Why Us home section) */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <Particles
            particleCount={325}
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

        {/* Inline SVG Outline of Space Needle on the Left side */}
        <svg className="absolute left-[-20px] bottom-[-20px] h-[150px] sm:h-[220px] w-auto opacity-[0.08] text-white pointer-events-none select-none" viewBox="0 0 100 250" fill="currentColor">
          <path d="M45,250 L55,250 L55,100 L65,100 L55,80 L70,80 L55,70 L55,20 L45,20 L45,70 L30,70 L45,80 L35,80 L45,100 L45,250 Z" />
          <ellipse cx="50" cy="80" rx="25" ry="10" />
          <ellipse cx="50" cy="70" rx="15" ry="6" />
        </svg>

        {/* Inline SVG Outline of Water Heater on the Right side */}
        <svg className="absolute right-[-10px] top-[-10px] h-[140px] sm:h-[200px] w-auto opacity-[0.08] text-white pointer-events-none select-none" viewBox="0 0 100 200" fill="currentColor">
          <rect x="25" y="20" width="50" height="150" rx="25" />
          <rect x="45" y="5" width="10" height="15" />
          <circle cx="50" cy="80" r="10" />
          <circle cx="50" cy="120" r="10" />
        </svg>

        {/* Banner content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-white text-[20px] sm:text-[25px] font-bold leading-relaxed mb-8 drop-shadow-sm">
            At All Phase Plumbing, nothing speaks louder than the words of our satisfied customers.
          </p>
          
          {/* Pointy corners contact button */}
          <Link
            to="/contact"
            className="inline-block active:scale-[0.98] transition-all bg-[#F5C842] text-[#1E3A6E] border-[5px] border-[#1E3A6E] px-10 py-3.5 text-[16px] sm:text-[18px] font-black rounded-none hover:bg-[#eec136] tracking-widest uppercase shadow-[0_8px_20px_-6px_rgba(30,58,110,0.45)]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            CONTACT US
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── 10. Reviews Banner ("What Our Customers Say About All Phase Plumbing") ── */
function CustomerReviewsBanner() {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20 text-center"
      style={{
        background: "linear-gradient(165deg, #0f2246 0%, #1E3A6E 40%, #2d5fa8 75%, #4A7BC4 100%)",
      }}
    >
      {/* Particle background (same as Why Us home section) */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
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

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h2
          className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white mb-6 leading-tight"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          What Our Customers Say About All Phase Plumbing
        </h2>
        <div className="mt-8">
          <Link
            to="/contact"
            className="inline-block active:scale-[0.98] transition-all bg-[#F5C842] text-[#1E3A6E] border-[5px] border-[#1E3A6E] px-10 py-3.5 text-[16px] sm:text-[18px] font-black rounded-none hover:bg-[#eec136] tracking-widest uppercase shadow-[0_8px_20px_-6px_rgba(30,58,110,0.45)]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            read more
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── 11. Masonry Gallery items — real project photos ── */
const MASONRY_ITEMS = [
  { id: "1",  img: "/projects/project-1.jpg",  height: 680, url: "#" },
  { id: "2",  img: "/projects/project-2.jpg",  height: 580, url: "#" },
  { id: "3",  img: "/projects/project-3.jpg",  height: 650, url: "#" },
  { id: "4",  img: "/projects/project-4.jpg",  height: 700, url: "#" },
  { id: "5",  img: "/projects/project-5.jpg",  height: 620, url: "#" },
  { id: "6",  img: "/projects/project-6.jpg",  height: 660, url: "#" },
  { id: "7",  img: "/projects/project-7.jpg",  height: 640, url: "#" },
  { id: "8",  img: "/projects/project-8.png",  height: 590, url: "#" },
  { id: "9",  img: "/projects/project-9.png",  height: 670, url: "#" },
  { id: "10", img: "/projects/project-10.png", height: 710, url: "#" },
  { id: "11", img: "/projects/project-11.png", height: 600, url: "#" },
  { id: "12", img: "/projects/project-12.png", height: 630, url: "#" },
];

function RecentProjects() {
  return (
    <section className="bg-white py-16 sm:py-20 border-t border-slate-100">
      <div className="mx-auto px-4 max-w-[1305px]">
        <h2
          className="text-center text-[36px] sm:text-[44px] font-black text-[#1E3A6E] mb-12"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Our Recent Projects
        </h2>
        {/* Animated grid displaying the 12 popping image placeholders */}
        <div className="w-full max-w-[760px] mx-auto relative min-h-[500px]">
          <Masonry items={MASONRY_ITEMS} />
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <PageShell>
      {/* 1. Hero */}
      <AboutHero />

      {/* 2. We Protect Your Home Intro */}
      <AboutIntro />

      {/* 3. Why Us from home page */}
      <WhyUs />

      {/* 4. Services cards from home page */}
      <Services />

      {/* 5. Team video */}
      <AboutInterview />

      {/* 6. Contact Us quotes banner */}
      <AboutActionBanner />

      {/* 7. TeamSection from home page */}
      <TeamSection />

      {/* 8. Badges */}
      <Badges />

      {/* 9. Van and contact us from home page (CTABanner) */}
      <CTABanner />

      {/* 10. Customer reviews quote */}
      <CustomerReviewsBanner />

      {/* 11. Our Recent Projects with 12 masonry popping images */}
      <RecentProjects />
    </PageShell>
  );
}
