import { Link } from "@tanstack/react-router";
import { Phone, MapPin } from "lucide-react";
import logo from "@/assets/app-logo.svg";
import mascot from "@/assets/mascot.svg";

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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:pr-[280px]">
          {/* Column 1 — Logo */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="inline-block">
              <img
                src={logo}
                alt="All Phase Plumbing"
                className="h-14 w-auto brightness-0 invert"
              />
            </Link>
          </div>

          {/* Column 2 — Services Area */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[15px] font-bold uppercase tracking-wider text-white border-b border-white/15 pb-2.5">
              Services Area
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-2 text-[19px] font-medium text-white/70">
              <Link to="/service-area" className="hover:text-[#F5C842]">Seattle</Link>
              <Link to="/service-area" className="hover:text-[#F5C842]">Redmond</Link>
              <Link to="/service-area" className="hover:text-[#F5C842]">Tacoma</Link>
              <Link to="/service-area" className="hover:text-[#F5C842]">Kirkland</Link>
              <Link to="/service-area" className="hover:text-[#F5C842]">Renton</Link>
              <Link to="/service-area" className="hover:text-[#F5C842]">Puyallup</Link>
              <Link to="/service-area" className="hover:text-[#F5C842]">Bellevue</Link>
              <Link to="/service-area" className="hover:text-[#F5C842]">Tukwila</Link>
              <Link to="/service-area" className="hover:text-[#F5C842] col-span-2">Mercer Island</Link>
            </div>
          </div>

          {/* Column 3 — Services */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[15px] font-bold uppercase tracking-wider text-white border-b border-white/15 pb-2.5">
              Services
            </h3>
            <ul className="space-y-2.5 mt-2 text-[19px] font-medium text-white/70">
              <li>
                <Link to="/services/plumbing" className="hover:text-[#F5C842]">
                  Plumbing
                </Link>
              </li>
              <li>
                <Link to="/services/sewer-services" className="hover:text-[#F5C842]">
                  Sewers
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#F5C842]">
                  Commercial
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — About */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[15px] font-bold uppercase tracking-wider text-white border-b border-white/15 pb-2.5">
              About
            </h3>
            <ul className="space-y-2.5 mt-2 text-[19px] font-medium text-white/70">
              <li>
                <Link to="/about" className="hover:text-[#F5C842]">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#F5C842]">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/coupons" className="hover:text-[#F5C842]">
                  Coupons
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5 — Contact Us */}
          <div className="flex flex-col gap-4 lg:pr-10">
            <h3 className="text-[15px] font-bold uppercase tracking-wider text-white border-b border-white/15 pb-2.5">
              Contact Us
            </h3>
            <ul className="space-y-4 text-[19px] font-medium text-white/70 mt-2">
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-[#F5C842]" />
                <a
                  href="tel:+12067726077"
                  className="font-bold text-white hover:text-[#F5C842] transition-colors"
                >
                  (206) 772-6077
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="size-4 shrink-0 text-[#F5C842] mt-0.5" />
                <address className="not-italic leading-relaxed">
                  14101 Interurban Ave S<br />
                  Unit 78-A Tukwila, WA,<br />
                  98168 United States
                </address>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mascot standing at the bottom right */}
      <div className="absolute bottom-0 right-4 sm:right-10 lg:right-8 z-20 pointer-events-none select-none hidden sm:block">
        <img
          src={mascot}
          alt="All Phase Plumbing Mascot"
          className="h-[210px] sm:h-[250px] lg:h-[300px] w-auto object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* Copyright bar */}
      <div className="relative z-10 bg-[#152a55] border-t border-white/10 py-4 text-center">
        <p className="text-[13px] font-normal tracking-widest text-white/50 uppercase">
          © {new Date().getFullYear()} All Phase Plumbing · All Rights Reserved · Tukwila, WA
        </p>
      </div>
    </footer>
  );
}
