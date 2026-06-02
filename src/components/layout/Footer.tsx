import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Clock } from "lucide-react";
import logo from "@/assets/app-logo.svg";
import mascot from "@/assets/mascot.svg";

const CITIES = [
  "Seattle",   "Redmond",
  "Tacoma",    "Kirkland",
  "Renton",    "Puyallup",
  "Bellevue",  "Tukwila",
  "Mercer Island", "Auburn",
];

export function Footer() {
  return (
    <footer className="relative bg-[#1E3A6E] text-white overflow-hidden">
      {/* City skyline backdrop */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[280px] pointer-events-none opacity-[0.05] select-none z-0 fill-white"
        viewBox="0 0 1200 280"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,280 L0,200 L30,200 L30,220 L50,220 L50,180 L80,180 L80,160 L110,160 L110,100 L130,100 L130,130 L150,130 L150,230 L170,230 L170,160 L200,160 L200,70 L220,70 L220,110 L240,110 L240,220 L260,220 L260,150 L290,150 L290,120 L310,120 L310,160 L330,160 L330,250 L360,250 L360,140 L390,140 L390,60 L410,60 L410,20 L415,20 L415,60 L430,60 L430,140 L450,140 L450,170 L480,170 L480,110 L510,110 L510,220 L530,220 L530,130 L560,130 L560,70 L580,70 L580,200 L600,200 L600,150 L630,150 L630,90 L660,90 L660,240 L680,240 L680,160 L710,160 L710,120 L730,120 L730,60 L750,60 L750,130 L770,130 L770,190 L800,190 L800,140 L830,140 L830,50 L850,50 L850,10 L855,10 L855,50 L870,50 L870,170 L890,170 L890,220 L920,220 L920,110 L950,110 L950,70 L970,70 L970,140 L1000,140 L1000,200 L1030,200 L1030,160 L1060,160 L1060,100 L1090,100 L1090,230 L1120,230 L1120,150 L1150,150 L1150,120 L1180,120 L1180,250 L1200,250 L1200,280 Z" />
      </svg>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-[1305px] mx-auto px-6 sm:px-8 pt-14 pb-10 xl:pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[200px_1fr_120px_120px_200px] gap-x-6 gap-y-10 items-start xl:pr-[320px]">

          {/* ── Col 1: Logo + tagline ── */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="inline-block self-start">
              <img
                src={logo}
                alt="All Phase Plumbing"
                className="h-[69px] w-auto block"
                style={{
                  filter:
                    "drop-shadow(0 0 6px rgba(255,255,255,0.85)) drop-shadow(0 0 14px rgba(255,255,255,0.45))",
                }}
              />
            </Link>
            <p className="text-[13px] text-white/55 leading-relaxed max-w-[180px]">
              Greater Seattle's trusted plumber — licensed, insured &amp; available 24/7.
            </p>
            <a
              href="tel:+12067726077"
              className="inline-flex items-center gap-2 mt-1 bg-[#F5C842] text-[#1E3A6E] font-black text-[14px] px-4 py-2.5 rounded-none hover:bg-[#eec136] transition-colors w-fit"
            >
              <Phone className="size-3.5" strokeWidth={3} />
              (206) 772-6077
            </a>
          </div>

          {/* ── Col 2: Service Areas ── */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#F5C842] pb-2 border-b border-white/10">
              Service Areas
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {CITIES.map((city) => (
                <Link
                  key={city}
                  to="/service-area"
                  className="text-[14px] font-medium text-white/70 hover:text-[#F5C842] transition-colors truncate"
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Col 3: Services ── */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#F5C842] pb-2 border-b border-white/10">
              Services
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Plumbing",   to: "/services/plumbing" },
                { label: "Sewers",     to: "/services/sewer-services" },
                { label: "Commercial", to: "/services" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-[14px] font-medium text-white/70 hover:text-[#F5C842] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Company ── */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#F5C842] pb-2 border-b border-white/10">
              Company
            </h3>
            <ul className="space-y-2">
              {[
                { label: "About Us", to: "/about" },
                { label: "Blog",     to: "/blog" },
                { label: "Coupons",  to: "/coupons" },
                { label: "Contact",  to: "/contact" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-[14px] font-medium text-white/70 hover:text-[#F5C842] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 5: Contact info ── */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#F5C842] pb-2 border-b border-white/10">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="size-4 shrink-0 text-[#F5C842] mt-0.5" />
                <address className="not-italic text-[13px] text-white/70 leading-relaxed">
                  14101 Interurban Ave S<br />
                  Unit 78-A<br />
                  Tukwila, WA 98168
                </address>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="size-4 shrink-0 text-[#F5C842]" />
                <span className="text-[13px] text-white/70">Open 24/7</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Mascot — only at xl where the pr-[320px] grid gap gives it space */}
      <div className="absolute bottom-0 right-[8%] z-20 pointer-events-none select-none hidden xl:block">
        <img
          src={mascot}
          alt="All Phase Plumbing Mascot"
          className="h-[240px] w-auto object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.5)] translate-y-[0.5px]"
        />
      </div>

      {/* ── Copyright bar ── */}
      <div className="relative z-10 bg-[#0f2246] border-t border-white/10 py-4 text-center">
        <p className="text-[12px] font-medium tracking-widest text-white/40 uppercase">
          © {new Date().getFullYear()} All Phase Plumbing · All Rights Reserved · Tukwila, WA
        </p>
      </div>
    </footer>
  );
}
