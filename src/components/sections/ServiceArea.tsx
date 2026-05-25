import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { StarBorder } from "@/components/ui/StarBorder";
import { useSiteOptions } from "@/hooks/use-site-options";
import { useEffect, useRef } from "react";
import Particles from "@/components/ui/Particles";

/* ── Leaflet dynamic import (avoids SSR issues) ───────────────────────────── */
declare global {
  interface Window {
    L: typeof import("leaflet");
  }
}

function ServiceMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamically import Leaflet to avoid SSR issues
    import("leaflet").then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return;

      /* ── Leaflet CSS ── */
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

      /* ── Tile layer (CartoDB light — crisp & neutral) ── */
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      /* ── Service-area polygon (King + southern Pierce) in navy blue ── */
      const serviceAreaCoords: [number, number][] = [
        // Approximate boundary of Greater Seattle service area
        // North Seattle
        [47.77, -122.42],
        [47.77, -122.05],
        // East: Redmond, Bellevue, Renton
        [47.68, -122.04],
        [47.6, -121.97],
        [47.49, -122.03],
        // South: Auburn, Federal Way, Tacoma
        [47.32, -122.03],
        [47.24, -122.13],
        [47.22, -122.32],
        [47.26, -122.52],
        // West: Vashon area shoreline
        [47.35, -122.58],
        [47.48, -122.55],
        // NW Seattle
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

      /* ── Company pin ── */
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

      /* ── Fit map to polygon ── */
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
      className="w-full h-full min-h-[160px] lg:min-h-[480px]"
      style={{ zIndex: 0 }}
    />
  );
}

export function ServiceArea() {
  const opts = useSiteOptions();
  const cities = opts.service_area_cities;

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f2246 0%, #1E3A6E 40%, #2d5fa8 75%, #4A7BC4 100%)",
      }}
    >
      {/* ── Particle background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <Particles
          particleCount={500}
          particleSpread={20}
          speed={1}
          particleBaseSize={150}
          sizeRandomness={1.1}
          alphaParticles={true}
          cameraDistance={20}
          disableRotation={true}
          moveParticlesOnHover={false}
          particleColors={["#ffffff", "#aac8f0", "#7ab3e0"]}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Heading — white text on gradient bg */}
        <div className="text-center mb-10">
          <span className="inline-block text-2xl font-bold uppercase tracking-widest text-[#F5C842] mb-3">
            Service Area
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Serving the Greater{" "}
            <span className="font-display-italic text-[#F5C842]">Seattle Area.</span>
          </h2>
          <p className="mt-4 text-lg text-white/75 max-w-2xl mx-auto">
            Licensed plumbers dispatched same-day across King &amp; Pierce counties. If you're in
            any of these areas, we can be there today.
          </p>
        </div>

        {/* Two-column layout: map LEFT, city list RIGHT */}
        <div className="grid grid-cols-2 gap-3 lg:gap-6 items-stretch">
          {/* ── LEFT: Map — isolation:isolate keeps Leaflet z-indexes contained ── */}
          <div
            className="rounded-2xl overflow-hidden border-2 border-white/25 shadow-2xl bg-white aspect-square order-1 h-full"
            style={{ isolation: "isolate", position: "relative" }}
          >
            <ServiceMap />
          </div>

          {/* ── RIGHT: City list ── */}
          <div
            className="rounded-2xl border border-white/20 p-3 sm:p-6 lg:p-8 order-2 aspect-square flex flex-col justify-start overflow-y-auto"
            style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(12px)" }}
          >
            <div className="grid grid-cols-1 gap-y-1">
              {cities.map((city) => (
                <Link
                  key={city}
                  to="/service-area"
                  className="flex items-center gap-1.5 py-1.5 sm:py-3 border-b border-white/15 text-white font-semibold text-[11px] sm:text-base hover:text-[#F5C842] transition-colors group"
                >
                  <MapPin className="size-3 sm:size-4 text-[#F5C842] shrink-0 group-hover:scale-110 transition-transform" />
                  {city}, WA
                </Link>
              ))}
            </div>

            {/* CTA row — hidden on mobile to fit the square */}
            <div className="mt-8 pt-6 border-t border-white/20 hidden sm:flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-base text-white/65 italic">
                Don't see your city? Call us — we likely serve your area.
              </p>
              <StarBorder
                as="a"
                href="tel:+12067726077"
                className="inline-block transition-all"
                innerClassName="text-base font-bold text-[#1E3A6E]"
                innerStyle={{
                  background: "white",
                  border: "none",
                  padding: "12px 24px",
                  color: "#1E3A6E",
                  whiteSpace: "nowrap",
                }}
              >
                Book Online
              </StarBorder>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
