import { useState, useEffect, useRef, type CSSProperties } from "react";
import { Star, Home, Building2, Phone } from "lucide-react";
import { StarBorder } from "@/components/ui/StarBorder";
import Particles from "@/components/ui/Particles";
import mascot from "@/assets/better-mascot.webp";
import { useSiteOptions } from "@/hooks/use-site-options";
import { gsap } from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { Recaptcha } from "@/components/ui/Recaptcha";
import { useRecaptchaGate } from "@/hooks/use-recaptcha-gate";
import { submitLeadFromForm } from "@/lib/lead-form";

gsap.registerPlugin(GSAPSplitText, useGSAP);

/* PC (lg+) keeps every tagline to two lines. */
const HERO_TAGLINES_PC: readonly (readonly string[])[] = [
  ["Your Home's Plumbing,", "Done Right the First Time."],
  ["24/7 Emergency Service", "When Pipes Won't Wait."],
  ["Licensed, Insured & Trusted", "in Seattle Since 1989."],
  ["From Quick Fixes to Full Repipes,", "We've Got You Covered."],
] as const;

/* Mobile/tablet shows the "Licensed, Insured & Trusted" tagline as four lines. */
const HERO_TAGLINES_MOBILE: readonly (readonly string[])[] = [
  ["Your Home's Plumbing,", "Done Right the First Time."],
  ["24/7 Emergency Service", "When Pipes Won't Wait."],
  ["Licensed, Insured", "& Trusted", "in Seattle", "Since 1989."],
  ["From Quick Fixes to Full Repipes,", "We've Got You Covered."],
] as const;

function CyclingSplitText({
  lines,
  intervalMs = 3000,
  className,
  style,
}: {
  lines: readonly (readonly string[])[];
  intervalMs?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.fonts?.status === "loaded") {
      setFontsLoaded(true);
    } else {
      document.fonts?.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  useGSAP(
    () => {
      if (!fontsLoaded || !ref.current) return;
      const el = ref.current;
      let split: InstanceType<typeof GSAPSplitText> | null = null;
      let killed = false;
      const tweens: gsap.core.Tween[] = [];
      const delayedCalls: gsap.core.Tween[] = [];

      const playLine = (i: number) => {
        if (killed) return;
        const next = (i + 1) % lines.length;

        if (split) {
          try {
            split.revert();
          } catch {
            /* noop */
          }
          split = null;
        }
        el.innerHTML = lines[i].join("<br/>");
        split = new GSAPSplitText(el, {
          type: "chars,lines",
          linesClass: "split-line",
          charsClass: "split-char",
          smartWrap: true,
        });

        gsap.set(split.chars, {
          opacity: 0,
          y: 44,
          willChange: "transform, opacity",
          force3D: true,
        });

        const inTween = gsap.to(split.chars, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.025,
          ease: "power3.out",
          onComplete: () => {
            // A single headline (e.g. a service landing page) reveals once and
            // stays — no hold/out/loop. The home page (multiple taglines) cycles.
            if (killed || lines.length <= 1) return;
            const holdSec = Math.max(0.4, (intervalMs - 1400) / 1000);
            const hold = gsap.delayedCall(holdSec, () => {
              if (killed || !split) return;
              const outTween = gsap.to(split.chars, {
                opacity: 0,
                y: -36,
                duration: 0.5,
                stagger: 0.012,
                ease: "power3.in",
                onComplete: () => {
                  if (killed) return;
                  playLine(next);
                },
              });
              tweens.push(outTween);
            });
            delayedCalls.push(hold);
          },
        });
        tweens.push(inTween);
      };

      playLine(0);

      return () => {
        killed = true;
        tweens.forEach((t) => t.kill());
        delayedCalls.forEach((d) => d.kill());
        if (split) {
          try {
            split.revert();
          } catch {
            /* noop */
          }
        }
      };
    },
    { dependencies: [fontsLoaded, lines, intervalMs], scope: ref },
  );

  /* Render first tagline as real text at first paint so the H1 (LCP element)
     is never empty while fonts/GSAP load. GSAP overwrites innerHTML on start. */
  return (
    <h1
      ref={ref}
      className={className}
      style={style}
      aria-live="polite"
      dangerouslySetInnerHTML={{ __html: lines[0].join("<br/>") }}
    />
  );
}

export function Hero({
  /* Optional overrides so service landing pages can name the service in the
     hero. Defaults reproduce the home-page hero exactly. */
  taglinesPc = HERO_TAGLINES_PC,
  taglinesMobile = HERO_TAGLINES_MOBILE,
  subtitle = "Serving Tukwila & the Greater Seattle Area with Expert Care Since 1989.",
  /* When set (landing pages), a gold pill with the service name renders above
     the cycling headline. Undefined on the home page → no badge. */
  badge,
}: {
  taglinesPc?: readonly (readonly string[])[];
  taglinesMobile?: readonly (readonly string[])[];
  subtitle?: string;
  badge?: string;
} = {}) {
  const opts = useSiteOptions();
  const [serviceType, setServiceType] = useState<"residential" | "commercial">("residential");
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [mascotIn, setMascotIn] = useState(false);
  const [sent, setSent] = useState(false);
  const captcha = useRecaptchaGate();

  /* Defer the background video + WebGL particles until the page is loaded and
     idle. Poster image is the LCP element; video/particles must not compete
     for bandwidth or main thread during first paint. */
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [showParticles, setShowParticles] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    let cancelled = false;
    const start = () =>
      idle(() => {
        if (cancelled) return;
        // Do not load background video on mobile to save payload
        if (window.innerWidth >= 1024) {
          setVideoSrc("/videos/seattle-bg.mp4");
        }
        setShowParticles(true);
      });
    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }
    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
    };
  }, []);
  useEffect(() => {
    if (videoSrc && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [videoSrc]);
  /* Mascot slides up on first paint */
  useEffect(() => {
    const t = setTimeout(() => setMascotIn(true), 120);
    return () => clearTimeout(t);
  }, []);

  /* PC (lg+) shows the cycling tagline as two lines; mobile/tablet use the
     four-line variant of the "Licensed, Insured & Trusted" tagline. */
  const [isPc, setIsPc] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsPc(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#cdd9e8] min-h-[820px]">
      {/* ── Video background at 50% opacity ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/videos/seattle-bg-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ opacity: 0.8 }}
        aria-hidden="true"
      >
        {videoSrc && <source src={videoSrc} type="video/mp4" />}
      </video>

      {/* ── #6B9FE4 colour filter at 10% opacity ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "#6B9FE4", opacity: 0.1 }}
        aria-hidden="true"
      />

      {/* ── Navy-blue tint at 10% opacity ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "#1E3A6E", opacity: 0.1 }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-4 pt-28 pb-0" style={{ zoom: 0.9 }}>
        {/* ── Two-column: text LEFT ·  mascot RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end">
          {/* LEFT, hero copy (10% larger, shifted 10% left) */}
          <div className="pb-0 lg:pb-20 lg:-ml-10 xl:-ml-16 lg:[transform:scale(1.1)_translateX(0%)] lg:[transform-origin:top_left]">
            <span
              className="hidden sm:inline-block text-white font-bold text-[34px] tracking-wide"
              style={{
                WebkitTextStroke: "1px #1E3A6E",
                paintOrder: "stroke fill",
                textShadow: "0 2px 8px rgba(15,34,70,0.55)",
              }}
            >
              All Phase Plumbing
            </span>

            {/* Landing-page service name badge (only when `badge` is provided). */}
            {badge && (
              <div className="mt-3 sm:mt-4 mb-1">
                <span
                  className="inline-block rounded-full bg-[#F5C842] border-2 border-[#1E3A6E] px-4 py-1.5 text-[12px] sm:text-[15px] font-black uppercase tracking-[0.18em] text-[#1E3A6E] shadow-[0_6px_18px_-4px_rgba(245,200,66,0.7)]"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {badge}
                </span>
              </div>
            )}

            <div className="mt-0 sm:mt-4 relative" style={{ minHeight: "2.6em" }}>
              <CyclingSplitText
                lines={isPc ? taglinesPc : taglinesMobile}
                intervalMs={3000}
                className="max-w-[240px] sm:max-w-none text-[36px] sm:text-[48px] lg:text-[50px] text-white leading-[1.15] lg:whitespace-nowrap"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 900,
                  WebkitTextStroke: "1.5px #1E3A6E",
                  paintOrder: "stroke fill",
                  textShadow: "0 4px 14px rgba(15,34,70,0.7), 0 2px 4px rgba(0,0,0,0.35)",
                }}
              />
            </div>

            <p
              className="hidden sm:block mt-3 sm:mt-5 text-[16px] sm:text-[30px]
                         max-w-[210px] sm:max-w-lg
                         leading-snug sm:leading-relaxed font-semibold sm:font-medium"
            >
              <span
                className="hero-subtitle-text text-white"
                style={{
                  WebkitTextStroke: "0px",
                  paintOrder: "stroke fill",
                  /* Layered navy shadow gives the text a soft "drop" against
                     the light sky on mobile, without the boxy highlight. */
                  textShadow:
                    "0 1px 0 rgba(15,34,70,0.95), 0 2px 4px rgba(15,34,70,0.9), 0 4px 12px rgba(15,34,70,0.75), 0 0 18px rgba(15,34,70,0.55)",
                  lineHeight: "1.4",
                }}
              >
                {subtitle}
              </span>
            </p>

            {/* Google reviews — with mascot perched on top edge (mobile only) */}
            <div
              className="relative mt-6 sm:mt-8 flex w-full flex-col items-start
                         px-4 py-3 sm:px-5 sm:py-4
                         rounded-xl rounded-b-none sm:rounded-b-xl sm:inline-flex sm:w-auto
                         backdrop-blur-md"
              style={{
                background: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(255,255,255,0.35)",
                boxShadow: "0 8px 24px -6px rgba(15,34,70,0.35)",
              }}
            >
              <p
                className="text-[32px] sm:text-[40px] font-normal leading-none select-none"
                style={{
                  fontFamily: "'Product Sans','Google Sans','Inter','Poppins',sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </p>
              <div className="flex items-center gap-2 sm:gap-2.5 mt-1.5">
                <span className="text-[15px] sm:text-[19px] font-semibold text-[#1E3A6E]">
                  5 Star Reviews
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-[19px] sm:size-6 fill-[#FFB800] text-[#FFB800]" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT, mascot, bottom-aligned, animates in on landing */}
          <div
            className="hidden lg:flex items-end justify-end"
            style={{
              opacity: mascotIn ? 1 : 0,
              transform: mascotIn ? "translate(8%, 0)" : "translate(8%, 60px)",
              transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <picture>
              <source media="(min-width: 1024px)" srcSet={mascot} />
              <img
                src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                alt="All Phase Plumbing technician"
                aria-hidden="true"
                className="h-[420px] xl:h-[480px] w-auto object-contain drop-shadow-2xl select-none pointer-events-none"
                style={{ transform: "translateY(calc(2% + 6px))" }}
                loading="lazy"
                decoding="async"
                width={380}
                height={480}
              />
            </picture>
          </div>
        </div>

        {/* ── Full-width form card, sits flush at the bottom of the hero ── */}
        <div id="book-now" className="mt-0 sm:mt-2 scroll-mt-20 w-full">
          <div
            className="relative rounded-t-2xl overflow-hidden"
            style={{
              background: "linear-gradient(150deg, #25497f 0%, #1E3A6E 45%, #15294e 100%)",
              boxShadow: "0 -4px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {/* Particle backdrop, drifts inside the form box */}
            <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
              {showParticles && (
                <Particles
                  particleCount={170}
                  particleSpread={13}
                  speed={0.45}
                  particleBaseSize={130}
                  sizeRandomness={1.1}
                  alphaParticles={true}
                  cameraDistance={20}
                  disableRotation={true}
                  moveParticlesOnHover={false}
                  particleColors={["#ffffff", "#eaf2ff", "#cfe0f9"]}
                  className="w-full h-full"
                />
              )}
            </div>

            {/* Residential / Commercial tabs */}
            <div className="relative z-10 flex border-b border-white/15">
              <button
                type="button"
                onClick={() => setServiceType("residential")}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-3 px-3 py-3.5 sm:px-10 sm:py-5 text-base sm:text-[26px] font-semibold transition-all duration-300 border-b-4 ${
                  serviceType === "residential"
                    ? "border-white text-white bg-white/25 shadow-[inset_0_-3px_0_#ffffff,0_4px_12px_rgba(0,0,0,0.25)] -translate-y-[1px] scale-[1.02]"
                    : "border-transparent text-white/70 hover:text-white hover:bg-white/10 bg-transparent"
                }`}
              >
                <Home className="size-4 sm:size-7" /> Residential
              </button>
              <button
                type="button"
                onClick={() => setServiceType("commercial")}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-3 px-3 py-3.5 sm:px-10 sm:py-5 text-base sm:text-[26px] font-semibold transition-all duration-300 border-b-4 ${
                  serviceType === "commercial"
                    ? "border-white text-white bg-white/25 shadow-[inset_0_-3px_0_#ffffff,0_4px_12px_rgba(0,0,0,0.25)] -translate-y-[1px] scale-[1.02]"
                    : "border-transparent text-white/70 hover:text-white hover:bg-white/10 bg-transparent"
                }`}
              >
                <Building2 className="size-4 sm:size-7" /> Commercial
              </button>
            </div>

            {/* Form body, split into promo (left) + form (right) on large screens */}
            <div className="relative z-10 px-4 py-4 sm:px-8 sm:py-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-8">
              {/* Contact promo (left column on lg) */}
              <div className="mb-4 lg:mb-0 text-white lg:border-r lg:border-white/25 lg:pr-6">
                <h2
                  className="text-[26px] sm:text-[37px] lg:text-[42px] font-bold leading-tight"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Contact us today
                </h2>
                <p className="mt-2 text-[19px] sm:text-[22px] font-bold leading-snug text-white">
                  Same Day Service
                </p>
                <p className="hidden sm:block text-[16.5px] sm:text-[19px] font-semibold leading-snug mt-1">
                  Plumbing and Drain Cleaning
                </p>
                <p className="hidden sm:block text-[15px] font-normal text-white/85 mt-1">
                  When booked before 2pm, Monday &ndash; Friday
                </p>

                {/* Trust badges row */}
                <div className="hidden lg:flex flex-col gap-2 mt-5 pt-5 border-t border-white/20">
                  <div className="flex items-center gap-3 text-white">
                    <span className="inline-flex size-[31px] items-center justify-center rounded-full bg-white/15 text-[#F5C842] font-black">
                      ✓
                    </span>
                    <span className="text-[16.5px] font-semibold">Licensed &amp; Insured</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <span className="inline-flex size-[31px] items-center justify-center rounded-full bg-white/15 text-[#F5C842] font-black">
                      ✓
                    </span>
                    <span className="text-[16.5px] font-semibold">Available 24/7</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <span className="inline-flex size-[31px] items-center justify-center rounded-full bg-white/15 text-[#F5C842] font-black">
                      ✓
                    </span>
                    <span className="text-[16.5px] font-semibold">Serving Seattle Since 1989</span>
                  </div>
                </div>

                <a
                  href={opts.phone_href}
                  className="hidden lg:inline-flex items-center gap-2.5 mt-5 px-[18px] py-3 rounded-lg bg-white/15 hover:bg-white/25 transition-colors font-bold text-white text-[19px]"
                >
                  <Phone className="size-[22px]" />
                  {opts.phone}
                </a>
              </div>

              {/* Form (right column on lg) */}
              <div>
                <h2
                  className="text-lg sm:text-[26px] font-bold text-white mb-3 sm:mb-4"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Let Us Call You
                </h2>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    if (await captcha.verify()) {
                      await submitLeadFromForm(form, {
                        source: "Homepage Hero",
                        serviceType,
                        smsOptIn,
                      });
                      setSent(true);
                    }
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3 items-stretch">
                    <input
                      type="text"
                      name="name"
                      placeholder="FULL NAME*"
                      required
                      className="rounded-lg border-2 border-[#1E3A6E] bg-white px-3.5 py-2.5 sm:px-4 sm:py-3.5 text-[14px] sm:text-[15px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow"
                    />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="PHONE*"
                      required
                      className="rounded-lg border-2 border-[#1E3A6E] bg-white px-3.5 py-2.5 sm:px-4 sm:py-3.5 text-[14px] sm:text-[15px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow"
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="EMAIL*"
                      required
                      className="rounded-lg border-2 border-[#1E3A6E] bg-white px-3.5 py-2.5 sm:px-4 sm:py-3.5 text-[14px] sm:text-[15px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow"
                    />

                    <input
                      type="text"
                      name="zip"
                      placeholder="ZIP CODE*"
                      required
                      maxLength={10}
                      className="rounded-lg border-2 border-[#1E3A6E] bg-white px-3.5 py-2.5 sm:px-4 sm:py-3.5 text-[14px] sm:text-[15px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow"
                    />

                    <select
                      required
                      name="service"
                      defaultValue=""
                      className="rounded-lg border-2 border-[#1E3A6E] bg-white px-3.5 py-2.5 sm:px-4 sm:py-3.5 text-[14px] sm:text-[15px] font-semibold text-[#1E3A6E] focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow sm:col-span-2 lg:col-span-1 appearance-none"
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
                          <option value="Drain Cleaning">Drain Cleaning</option>
                          <option value="Emergency Plumber">Emergency Plumber</option>
                          <option value="Garbage Disposals">Garbage Disposals</option>
                          <option value="Hydro Jetting">Hydro Jetting</option>
                          <option value="Repiping">Repiping</option>
                          <option value="Sump Pumps">Sump Pumps</option>
                          <option value="Toilets & Faucets">Toilets &amp; Faucets</option>
                          <option value="Water Heaters">Water Heaters</option>
                          <option value="Leak Detection">Leak Detection</option>
                          <option value="Water Softeners">Water Softeners &amp; Filtration</option>
                          <option value="Sewer Repair">Sewer Line Repair</option>
                          <option value="Other">Other Service</option>
                        </>
                      ) : (
                        <>
                          <option value="Commercial Drain Cleaning">
                            Commercial Drain Cleaning
                          </option>
                          <option value="Commercial Plumbing Repair">
                            Commercial Plumbing Repair
                          </option>
                          <option value="Commercial Sewer Services">
                            Commercial Sewer Services
                          </option>
                          <option value="Backflow Testing">Backflow Testing</option>
                          <option value="Gas Line Service">Gas Line Service</option>
                          <option value="Other Commercial">Other Commercial Service</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div className="mt-3.5 sm:mt-4 flex flex-col items-center gap-3">
                    <Recaptcha ref={captcha.ref} onVerify={captcha.setToken} />
                    {captcha.error && (
                      <p className="text-[13px] font-semibold text-red-300">
                        Please confirm you're not a robot to continue.
                      </p>
                    )}
                    <StarBorder
                      type="submit"
                      color="#F5C842"
                      className="inline-block active:scale-[0.98] transition-all"
                      innerClassName="font-bold px-8 py-2.5 text-[17px] sm:px-16 sm:py-3 sm:text-[22px]"
                      innerStyle={{
                        background: "#F5C842",
                        color: "#1E3A6E",
                        border: "2px solid #1E3A6E",
                      }}
                    >
                      Send Request
                    </StarBorder>
                    {sent && (
                      <p className="text-[14px] font-bold text-white text-center bg-white/10 px-5 py-2.5 rounded-xl border border-white/20">
                        ✓ Thanks, we'll be in touch shortly.
                      </p>
                    )}
                  </div>

                  {/* SMS opt-in */}
                  <div className="mt-3 flex items-start gap-2">
                    <input
                      id="sms-optin"
                      type="checkbox"
                      checked={smsOptIn}
                      onChange={(e) => setSmsOptIn(e.target.checked)}
                      className="mt-1 size-4 rounded border-white accent-[#1E3A6E] cursor-pointer shrink-0"
                    />
                    <label
                      htmlFor="sms-optin"
                      className="text-[12px] sm:text-[13px] text-white cursor-pointer leading-relaxed"
                    >
                      By submitting this form and signing up for texts, you consent to receive
                      messages from All Phase Plumbing at the number provided regarding your
                      request, updates about appointments and services or promotions and offers,
                      including messages sent by autodialer. Consent is not a condition of purchase.
                      Msg &amp; data rates may apply. Msg frequency varies. Unsubscribe at any time
                      by replying STOP. Reply HELP for help.
                    </label>
                  </div>

                  <p className="mt-3 text-[12px] sm:text-[13px] text-white/75 leading-relaxed border-t border-white/15 pt-2.5">
                    By entering your email address, you agree to receive emails about services,
                    updates or promotions, and you agree to our{" "}
                    <a href="/about" className="underline hover:text-white">
                      Terms
                    </a>{" "}
                    and{" "}
                    <a href="/about" className="underline hover:text-white">
                      Privacy Policy
                    </a>
                    . You may unsubscribe at any time.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
