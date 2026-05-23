import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Mail, Clock } from "lucide-react";
import logo from "@/assets/app-logo.svg";
import { StarBorder } from "@/components/ui/StarBorder";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/blog", label: "Blog" },
  { to: "/coupons", label: "Coupons" },
  { to: "/service-area", label: "Service Area" },
  { to: "/contact", label: "Contact Us" },
];

const SERVICE_LINKS = [
  { to: "/services/plumbing", label: "Plumbing Repair" },
  { to: "/services/drain-cleaning", label: "Drain Cleaning" },
  { to: "/services/water-heaters", label: "Water Heaters" },
  { to: "/services/sewer-services", label: "Sewer Services" },
  { to: "/services", label: "Commercial" },
];

export function Footer() {
  return (
    <footer className="relative bg-[#1E3A6E] text-white overflow-hidden">
      {/* Subtle city skyline backdrop */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[280px] pointer-events-none opacity-[0.05] select-none z-0 fill-white"
        viewBox="0 0 1200 280"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,280 L0,200 L30,200 L30,220 L50,220 L50,180 L80,180 L80,160 L110,160 L110,100 L130,100 L130,130 L150,130 L150,230 L170,230 L170,160 L200,160 L200,70 L220,70 L220,110 L240,110 L240,220 L260,220 L260,150 L290,150 L290,120 L310,120 L310,160 L330,160 L330,250 L360,250 L360,140 L390,140 L390,60 L410,60 L410,20 L415,20 L415,60 L430,60 L430,140 L450,140 L450,170 L480,170 L480,110 L510,110 L510,220 L530,220 L530,130 L560,130 L560,70 L580,70 L580,200 L600,200 L600,150 L630,150 L630,90 L660,90 L660,240 L680,240 L680,160 L710,160 L710,120 L730,120 L730,60 L750,60 L750,130 L770,130 L770,190 L800,190 L800,140 L830,140 L830,50 L850,50 L850,10 L855,10 L855,50 L870,50 L870,170 L890,170 L890,220 L920,220 L920,110 L950,110 L950,70 L970,70 L970,140 L1000,140 L1000,200 L1030,200 L1030,160 L1060,160 L1060,100 L1090,100 L1090,230 L1120,230 L1120,150 L1150,150 L1150,120 L1180,120 L1180,250 L1200,250 L1200,280 Z" />
      </svg>

      {/* Main grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 — Logo + tagline + phone */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            <Link to="/" className="inline-block">
              <img
                src={logo}
                alt="All Phase Plumbing"
                className="h-14 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-white/65 leading-relaxed max-w-[200px]">
              Providing reliable residential and commercial plumbing solutions since 1989.
            </p>
            <StarBorder
              as="a"
              href="tel:+12067726077"
              className="inline-block transition-all"
              innerClassName="flex items-center gap-2 font-bold text-white text-base"
              innerStyle={{
                background: "linear-gradient(135deg, #1E3A6E 0%, #6B9FE4 100%)",
                border: "none",
                padding: "10px 16px",
              }}
            >
              <Phone className="size-4" />
              (206) 772-6077
            </StarBorder>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-normal uppercase tracking-widest text-white border-b border-white/15 pb-3">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-white/70 font-normal hover:text-[#F5C842] hover:translate-x-1 transition-all inline-block"
                  >
                    › {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-normal uppercase tracking-widest text-white border-b border-white/15 pb-3">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-white/70 font-normal hover:text-[#F5C842] hover:translate-x-1 transition-all inline-block"
                  >
                    › {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact Us */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-normal uppercase tracking-widest text-white border-b border-white/15 pb-3">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="size-4 shrink-0 text-[#F5C842] mt-0.5" />
                <address className="not-italic leading-relaxed">
                  14101 Interurban Ave S<br />
                  Unit 78-A
                  <br />
                  Tukwila, WA 98168
                </address>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-[#F5C842]" />
                <a
                  href="tel:+12067726077"
                  className="font-semibold text-white hover:text-[#F5C842] transition-colors"
                >
                  (206) 772-6077
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-[#F5C842]" />
                <a
                  href="mailto:info@allphaseplumbing.com"
                  className="hover:text-[#F5C842] transition-colors break-all"
                >
                  info@allphaseplumbing.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="size-4 shrink-0 text-[#F5C842] mt-0.5" />
                <div className="leading-relaxed">
                  <p>Mon–Fri: 7am – 7pm</p>
                  <p>Sat–Sun: 8am – 5pm</p>
                  <p className="text-[#F5C842] font-normal mt-1">24/7 Emergency</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="relative z-10 bg-[#152a55] border-t border-white/10 py-4 text-center">
        <p className="text-xs font-normal tracking-widest text-white/50 uppercase">
          © {new Date().getFullYear()} All Phase Plumbing · All Rights Reserved · Tukwila, WA
        </p>
      </div>
    </footer>
  );
}
