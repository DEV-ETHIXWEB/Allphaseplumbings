import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Badges } from "@/components/sections/Badges";
import { StarBorder } from "@/components/ui/StarBorder";
import { useSiteOptions } from "@/hooks/use-site-options";
import { MapPin } from "lucide-react";

declare global {
  interface Window {
    L: typeof import("leaflet");
  }
}

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact All Phase Plumbing — Seattle Plumber" },
      {
        name: "description",
        content:
          "Call (206) 772-6077 or request a tech online. Same-day plumbing service across Greater Seattle.",
      },
      { property: "og:title", content: "Contact All Phase Plumbing" },
      { property: "og:description", content: "Call (206) 772-6077 — speak to a real person." },
    ],
  }),
  component: ContactPage,
});

/* ── Leaflet dynamic map component ───────────────────────────── */
function ContactServiceMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return;

      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      const map = L.map(mapRef.current, {
        center: [47.52, -122.18],
        zoom: 10,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: false,
      });
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      const serviceAreaCoords: [number, number][] = [
        [47.77, -122.42],
        [47.77, -122.05],
        [47.68, -122.04],
        [47.6, -121.97],
        [47.49, -122.03],
        [47.32, -122.03],
        [47.24, -122.13],
        [47.22, -122.32],
        [47.26, -122.52],
        [47.35, -122.58],
        [47.48, -122.55],
        [47.62, -122.52],
        [47.73, -122.48],
        [47.77, -122.42],
      ];

      const polygon = L.polygon(serviceAreaCoords, {
        color: "#1E3A6E",
        weight: 2.5,
        fillColor: "#1E3A6E",
        fillOpacity: 0.22,
      }).addTo(map);

      const pin = L.divIcon({
        className: "",
        html: `<div style="
          background: linear-gradient(135deg,#1E3A6E,#4A7BC4);
          color:#fff;
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          width:32px;height:32px;
          border:3px solid #F5C842;
          box-shadow:0 3px 10px rgba(0,0,0,0.4);
          display:flex;align-items:center;justify-content:center;">
          <span style="transform:rotate(45deg);font-size:14px;">📍</span>
        </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -36],
      });

      L.marker([47.4729, -122.2171], { icon: pin })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:Inter,sans-serif;font-weight:700;color:#1E3A6E;font-size:13px;line-height:1.4">
            All Phase Plumbing<br>
            <span style="font-weight:400;color:#555;font-size:12px">Tukwila, WA · (206) 772-6077</span>
          </div>`,
          { maxWidth: 220 },
        )
        .openPopup();

      map.fitBounds(polygon.getBounds(), { padding: [32, 32] });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-full min-h-[400px] lg:min-h-full"
      style={{ zIndex: 0 }}
    />
  );
}

function ContactHero() {
  return (
    <section className="relative bg-[#eef4fb] pt-20 pb-15 sm:pt-28 sm:pb-21 overflow-hidden border-b border-[#1E3A6E]/10">
      <img
        src="https://images.unsplash.com/photo-1542013936693-884638332954?w=1600&q=80"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        style={{ opacity: 0.35, filter: "blur(1px) brightness(0.95)" }}
      />
      <div className="relative container mx-auto px-4 text-center">
        <h1
          className="text-[33px] sm:text-[54px] lg:text-[66px] font-black tracking-tight text-[#1E3A6E]"
          style={{
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "0.02em",
            textShadow: "0 4px 12px rgba(147, 197, 253, 0.9)",
          }}
        >
          CONTACT US
        </h1>
        <nav className="text-[16px] sm:text-[18px] mt-4 flex items-center justify-center font-bold text-[#1E3A6E]">
          <Link to="/" className="hover:underline text-[#4A7BC4]">
            Home
          </Link>
          <span className="mx-2 text-[#1E3A6E]/50">-</span>
          <span className="text-[#1E3A6E]">Contact Us</span>
        </nav>
      </div>
    </section>
  );
}

function ContactFormBox() {
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto px-4 max-w-[1305px]">
        {/* Pointy Corners: rounded-none */}
        <div
          className="mx-auto max-w-[900px] border-[4px] sm:border-[6px] border-[#1E3A6E] rounded-none"
          style={{
            background: "#6B9EF8",
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          }}
        >
          <div className="px-4 py-6 sm:px-10 sm:py-12 md:p-14">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStatus("sent");
              }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="FIRST NAME*"
                  required
                  className="rounded-none border-2 border-[#1E3A6E] bg-white px-3.5 py-3 sm:px-4 sm:py-4 text-[14px] sm:text-[16px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow"
                />
                <input
                  type="text"
                  placeholder="LAST NAME*"
                  required
                  className="rounded-none border-2 border-[#1E3A6E] bg-white px-3.5 py-3 sm:px-4 sm:py-4 text-[14px] sm:text-[16px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="EMAIL*"
                  required
                  className="rounded-none border-2 border-[#1E3A6E] bg-white px-3.5 py-3 sm:px-4 sm:py-4 text-[14px] sm:text-[16px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow"
                />
                <input
                  type="tel"
                  placeholder="PHONE*"
                  required
                  className="rounded-none border-2 border-[#1E3A6E] bg-white px-3.5 py-3 sm:px-4 sm:py-4 text-[14px] sm:text-[16px] font-semibold text-[#1E3A6E] placeholder:text-gray-400 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow"
                />
              </div>

              <div className="relative">
                <select
                  required
                  defaultValue=""
                  className="w-full rounded-none border-2 border-[#1E3A6E] bg-white px-3.5 py-3 sm:px-4 sm:py-4 text-[14px] sm:text-[16px] font-semibold text-[#1E3A6E] focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231E3A6E' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 16px center",
                    backgroundSize: "20px",
                    paddingRight: "48px",
                  }}
                >
                  <option value="" disabled>
                    SERVICE NEEDED
                  </option>
                  <option>Plumbing Repair</option>
                  <option>Drain Cleaning</option>
                  <option>Water Heater</option>
                  <option>Sewer Service</option>
                  <option>Other</option>
                </select>
              </div>

              {/* SMS opt-in */}
              <div className="flex items-start gap-2.5 sm:gap-3">
                <input
                  id="sms-optin"
                  type="checkbox"
                  checked={smsOptIn}
                  onChange={(e) => setSmsOptIn(e.target.checked)}
                  className="mt-1 size-4 sm:size-5 rounded border-white accent-[#1E3A6E] cursor-pointer shrink-0"
                />
                <label
                  htmlFor="sms-optin"
                  className="text-[12px] sm:text-[14px] text-white cursor-pointer leading-relaxed select-none"
                >
                  By submitting this form and signing up for texts, you consent to receive
                  messages from All Phase Plumbing at the number provided regarding your request,
                  updates about appointments and services or promotions and offers, including
                  messages sent by autodialer. Consent is not a condition of purchase. Msg &amp;
                  data rates may apply. Msg frequency varies. Unsubscribe at any time by replying
                  STOP. Reply HELP for help.
                </label>
              </div>

              {/* Pointy corners for button */}
              <div className="pt-2 flex flex-col items-center">
                <button
                  type="submit"
                  className="inline-block active:scale-[0.98] transition-all bg-[#F5C842] text-[#1E3A6E] border-2 border-[#1E3A6E] px-8 py-3 sm:px-[72px] sm:py-[18px] text-[16px] sm:text-[26px] font-black rounded-none hover:bg-[#eec136] tracking-wide uppercase"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  SEND REQUEST
                </button>
                {status === "sent" && (
                  <p className="mt-4 text-base sm:text-lg text-white font-bold text-center bg-[#1E3A6E]/30 px-6 py-2 rounded-none border border-white/20">
                    Thanks — we'll be in touch within the hour.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactServiceAreaSection() {
  const opts = useSiteOptions();
  const cities = opts.service_area_cities;

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f2246 0%, #1E3A6E 40%, #2d5fa8 75%, #4A7BC4 100%)",
      }}
    >
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #ffffff;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1E3A6E;
          border-radius: 9999px;
          border: 2px solid #ffffff;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2d5fa8;
        }
      `}</style>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto px-4 max-w-[1305px]">
        {/* Two-column grid containing the separate white Map Card and dark blue Cities List Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Panel: White Card containing the Map with very rounded corners ([24px] / rounded-3xl) */}
          <div
            className="bg-white rounded-3xl overflow-hidden shadow-2xl relative w-full min-h-[400px] lg:min-h-full h-full border-2 border-white/20"
            style={{ isolation: "isolate" }}
          >
            <ContactServiceMap />
          </div>

          {/* Right Panel: Dark Blue Card containing the scrollable cities list with identical rounded-3xl corners */}
          <div
            className="rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between"
            style={{
              background: "#1E3A6E",
            }}
          >
            <div>
              {/* White Header inside the card */}
              <h2
                className="text-[32px] sm:text-[40px] font-black text-white mb-6 leading-tight"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Proudly Serving Area
              </h2>

              {/* Scrollable Single-Column list exactly as the user's mockup */}
              <div
                className="custom-scrollbar overflow-y-auto max-h-[380px] pr-2 space-y-0"
              >
                <div className="flex flex-col">
                  {cities.map((city) => (
                    <Link
                      key={city}
                      to="/service-area"
                      className="flex items-center gap-3 py-3.5 border-b border-white/15 text-white font-bold text-[16px] sm:text-[18px] hover:text-[#F5C842] transition-colors group first:pt-1 last:border-b-0"
                    >
                      <MapPin className="size-[18px] text-[#F5C842] shrink-0 group-hover:scale-110 transition-transform" />
                      <span>{city}, WA</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Book Online Now Button at the bottom */}
            <div className="mt-8 pt-6 border-t border-white/15 flex justify-end">
              <StarBorder
                as="a"
                href="tel:+12067726077"
                className="inline-block transition-all"
                innerClassName="text-base sm:text-lg font-bold text-[#1E3A6E]"
                innerStyle={{
                  background: "#F5C842",
                  border: "2px solid #1E3A6E",
                  padding: "12px 28px",
                  color: "#1E3A6E",
                  whiteSpace: "nowrap",
                }}
              >
                BOOK ONLINE NOW
              </StarBorder>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <PageShell>
      <ContactHero />
      <ContactFormBox />
      <ContactServiceAreaSection />
      {/* Badges placed UNDER the Proudly Serving Area section */}
      <Badges />
    </PageShell>
  );
}
