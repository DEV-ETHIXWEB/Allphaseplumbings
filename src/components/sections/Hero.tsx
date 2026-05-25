import { useState, useEffect } from "react";
import { Star, Home, Building2, Phone } from "lucide-react";
import { StarBorder } from "@/components/ui/StarBorder";
import mascot from "@/assets/mascot.svg";
import { useSiteOptions } from "@/hooks/use-site-options";

export function Hero() {
  const opts = useSiteOptions();
  const [serviceType, setServiceType] = useState<"residential" | "commercial">("residential");
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [mascotIn, setMascotIn] = useState(false);
  /* Mascot slides up on first paint */
  useEffect(() => {
    const t = setTimeout(() => setMascotIn(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#cdd9e8] min-h-[820px]">
      {/* ── Video background at 50% opacity ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ opacity: 0.8 }}
        aria-hidden="true"
      >
        <source src="/videos/seattle-bg.mp4" type="video/mp4" />
      </video>

      {/* ── #6B9FE4 colour filter at 10% opacity ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "#6B9FE4", opacity: 0.1 }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div
        className="relative z-10 container mx-auto px-4 pt-28 pb-0"
        style={{ zoom: 0.9 }}
      >
        {/* ── Two-column: text LEFT  ·  mascot RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end">
          {/* LEFT — hero copy (10% larger, shifted 10% left) */}
          <div
            className="pb-20 lg:-ml-10 xl:-ml-16"
            style={{
              transform: "scale(1.1) translateX(0%)",
              transformOrigin: "top left",
            }}
          >
            <span className="text-[#1E3A6E] font-bold text-[28px] tracking-wide">
              All Phase Plumbing
            </span>

            <h1
              className="mt-3 text-[27px] sm:text-[36px] lg:text-[38px] text-[#1E3A6E] leading-[1.15] lg:whitespace-nowrap"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 900,
                textShadow: "0 8px 6px #6399ED",
              }}
            >
              Your Home&rsquo;s Plumbing,
              <br />
              Done Right the First Time.
            </h1>

            <p className="mt-5 text-[21px] sm:text-[25px] text-gray-700 max-w-lg leading-relaxed font-medium">
              Serving Tukwila &amp; the Greater Seattle Area with Expert Care Since 1989.
            </p>

            {/* Google reviews */}
            <div className="mt-8">
              <p
                className="text-[40px] font-normal leading-none select-none"
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
              <div className="flex items-center gap-2.5 mt-1.5">
                <span className="text-[19px] font-semibold text-gray-700">5 Star Reviews</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-6 fill-[#FFB800] text-[#FFB800]" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — mascot, bottom-aligned, animates in on landing */}
          <div
            className="hidden lg:flex items-end justify-end"
            style={{
              opacity: mascotIn ? 1 : 0,
              transform: mascotIn ? "translate(8%, 0)" : "translate(8%, 60px)",
              transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <img
              src={mascot}
              alt="All Phase Plumbing technician"
              aria-hidden="true"
              className="h-[420px] xl:h-[480px] w-auto object-contain drop-shadow-2xl select-none pointer-events-none"
              style={{ transform: "translateY(2%)" }}
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        {/* ── Full-width form card — sits flush at the bottom of the hero (25% wider than container) ── */}
        <div
          className="mt-2"
          style={{
            width: "112.5%",
            marginLeft: "-6.25%",
            marginRight: "-6.25%",
          }}
        >
          <div
            className="rounded-t-2xl overflow-hidden border-[4px] sm:border-[6px] border-[#1E3A6E]"
            style={{
              background: "#6B9EF8",
              boxShadow: "0 -4px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            {/* Residential / Commercial tabs */}
            <div className="flex border-b border-[#1E3A6E]/30">
              <button
                type="button"
                onClick={() => setServiceType("residential")}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-3 px-3 py-3.5 sm:px-10 sm:py-5 text-base sm:text-[26px] font-semibold transition-all duration-300 border-b-4 ${
                  serviceType === "residential"
                    ? "border-[#F5C842] text-white bg-white/25 shadow-[inset_0_-3px_0_#F5C842,0_4px_12px_rgba(30,58,110,0.25)] -translate-y-[1px] scale-[1.02]"
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
                    ? "border-[#F5C842] text-white bg-white/25 shadow-[inset_0_-3px_0_#F5C842,0_4px_12px_rgba(30,58,110,0.25)] -translate-y-[1px] scale-[1.02]"
                    : "border-transparent text-white/70 hover:text-white hover:bg-white/10 bg-transparent"
                }`}
              >
                <Building2 className="size-4 sm:size-7" /> Commercial
              </button>
            </div>

            {/* Form body — split into promo (left) + form (right) on large screens */}
            <div className="px-4 py-4 sm:px-8 sm:py-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-8">
              {/* Contact promo (left column on lg) */}
              <div className="mb-4 lg:mb-0 text-white lg:border-r lg:border-white/25 lg:pr-6">
                <h2
                  className="text-2xl sm:text-[34px] lg:text-[38px] font-bold leading-tight"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Contact us today
                </h2>
                <p className="mt-2 text-[17px] sm:text-[20px] font-bold leading-snug text-[#F5C842]">
                  Same Day Service
                </p>
                <p className="text-[15px] sm:text-[17px] font-semibold leading-snug mt-1">
                  Plumbing and Drain Cleaning
                </p>
                <p className="text-[13px] sm:text-[14px] font-normal text-white/85 mt-1">
                  When booked before 2pm, Monday &ndash; Friday
                </p>

                {/* Trust badges row */}
                <div className="hidden lg:flex flex-col gap-2 mt-5 pt-5 border-t border-white/20">
                  <div className="flex items-center gap-2.5 text-white">
                    <span className="inline-flex size-7 items-center justify-center rounded-full bg-white/15 text-[#F5C842] font-black">
                      ✓
                    </span>
                    <span className="text-[15px] font-semibold">Licensed &amp; Insured</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-white">
                    <span className="inline-flex size-7 items-center justify-center rounded-full bg-white/15 text-[#F5C842] font-black">
                      ✓
                    </span>
                    <span className="text-[15px] font-semibold">Available 24/7</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-white">
                    <span className="inline-flex size-7 items-center justify-center rounded-full bg-white/15 text-[#F5C842] font-black">
                      ✓
                    </span>
                    <span className="text-[15px] font-semibold">Serving Seattle Since 1989</span>
                  </div>
                </div>

                <a
                  href={opts.phone_href}
                  className="hidden lg:inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-lg bg-white/15 hover:bg-white/25 transition-colors font-bold text-white text-[17px]"
                >
                  <Phone className="size-5" />
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

                <form onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5 sm:gap-3 items-stretch">
                  <input
                    type="text"
                    placeholder="FIRST NAME*"
                    required
                    className="rounded-lg border-2 border-[#1E3A6E] bg-white px-3.5 py-2.5 sm:px-4 sm:py-3.5 text-[14px] sm:text-[15px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow"
                  />

                  <input
                    type="text"
                    placeholder="LAST NAME*"
                    required
                    className="rounded-lg border-2 border-[#1E3A6E] bg-white px-3.5 py-2.5 sm:px-4 sm:py-3.5 text-[14px] sm:text-[15px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow"
                  />

                  <input
                    type="email"
                    placeholder="EMAIL*"
                    required
                    className="rounded-lg border-2 border-[#1E3A6E] bg-white px-3.5 py-2.5 sm:px-4 sm:py-3.5 text-[14px] sm:text-[15px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow"
                  />

                  <input
                    type="tel"
                    placeholder="PHONE*"
                    required
                    className="rounded-lg border-2 border-[#1E3A6E] bg-white px-3.5 py-2.5 sm:px-4 sm:py-3.5 text-[14px] sm:text-[15px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow"
                  />

                  <input
                    type="text"
                    placeholder="STREET ADDRESS*"
                    required
                    className="rounded-lg border-2 border-[#1E3A6E] bg-white px-3.5 py-2.5 sm:px-4 sm:py-3.5 text-[14px] sm:text-[15px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow"
                  />

                  <input
                    type="text"
                    placeholder="ZIP CODE*"
                    required
                    maxLength={10}
                    className="rounded-lg border-2 border-[#1E3A6E] bg-white px-3.5 py-2.5 sm:px-4 sm:py-3.5 text-[14px] sm:text-[15px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow"
                  />

                  <select
                    required
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
                        <option value="Commercial Drain Cleaning">Commercial Drain Cleaning</option>
                        <option value="Commercial Plumbing Repair">Commercial Plumbing Repair</option>
                        <option value="Commercial Sewer Services">Commercial Sewer Services</option>
                        <option value="Backflow Testing">Backflow Testing</option>
                        <option value="Gas Line Service">Gas Line Service</option>
                        <option value="Other Commercial">Other Commercial Service</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="mt-3.5 sm:mt-4 flex justify-center">
                  <StarBorder
                    type="submit"
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
                    className="text-[11px] sm:text-[12px] text-white cursor-pointer leading-relaxed"
                  >
                    By submitting this form and signing up for texts, you consent to receive
                    messages from All Phase Plumbing at the number provided regarding your request,
                    updates about appointments and services or promotions and offers, including
                    messages sent by autodialer. Consent is not a condition of purchase. Msg &amp;
                    data rates may apply. Msg frequency varies. Unsubscribe at any time by replying
                    STOP. Reply HELP for help.
                  </label>
                </div>

                <p className="mt-3 text-[12px] sm:text-[13px] text-white/75 leading-relaxed border-t border-white/15 pt-2.5">
                  By entering your email address, you agree to receive emails about services,
                  updates or promotions, and you agree to our{" "}
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
      </div>
    </section>
  );
}
