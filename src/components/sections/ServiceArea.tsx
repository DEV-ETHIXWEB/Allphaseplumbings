import { Link } from "@tanstack/react-router";
import { Check, Loader2, MapPin, Phone, ShieldCheck } from "lucide-react";
import { StarBorder } from "@/components/ui/StarBorder";
import { useSiteOptions } from "@/hooks/use-site-options";
import { slugify } from "@/data/area-content";
import { useEffect, useRef, useState } from "react";
import Particles from "@/components/ui/Particles";
import { enableTwoFingerPan } from "@/lib/leaflet-two-finger-pan";
import { useZipGeocode } from "@/hooks/use-zip-geocode";
import type { ZipLocation } from "@/lib/service-area-geo";

/* ── Leaflet dynamic import (avoids SSR issues) ───────────────────────────── */
declare global {
  interface Window {
    L: typeof import("leaflet");
  }
}

function ServiceMap({ zipLocation }: { zipLocation: ZipLocation | null }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const zipMarkerRef = useRef<import("leaflet").Marker | null>(null);
  const LRef = useRef<typeof import("leaflet") | null>(null);
  const originalBoundsRef = useRef<import("leaflet").LatLngBounds | null>(null);
  const teardownTouchRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamically import Leaflet to avoid SSR issues
    import("leaflet").then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return;
      LRef.current = L;

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

      /* ── Tile layer (CartoDB light, crisp & neutral) ── */
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
      originalBoundsRef.current = polygon.getBounds();
      map.fitBounds(originalBoundsRef.current, { padding: [32, 32] });

      /* ── Mobile: require two fingers to pan ── */
      if (mapRef.current) {
        teardownTouchRef.current = enableTwoFingerPan(map, mapRef.current);
      }
    });

    return () => {
      teardownTouchRef.current?.();
      teardownTouchRef.current = null;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // React to zip lookup, fly the map smoothly and drop a highlight marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    const L = LRef.current;
    if (!map || !L) return;

    if (zipMarkerRef.current) {
      zipMarkerRef.current.remove();
      zipMarkerRef.current = null;
    }

    if (!zipLocation) {
      if (originalBoundsRef.current) {
        map.flyToBounds(originalBoundsRef.current, {
          padding: [32, 32],
          duration: 1.2,
          easeLinearity: 0.25,
        });
      }
      return;
    }

    map.flyTo([zipLocation.lat, zipLocation.lon], 12, {
      animate: true,
      duration: 1.4,
      easeLinearity: 0.25,
    });

    const zipIcon = L.divIcon({
      className: "",
      html: `<div style="
        background: linear-gradient(135deg,#F5C842,#e6b228);
        color:#1E3A6E;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        width:36px;height:36px;
        border:3px solid #1E3A6E;
        box-shadow:0 4px 14px rgba(30,58,110,0.5);
        display:flex;align-items:center;justify-content:center;
        animation: zipPinDrop 0.5s ease-out;">
        <span style="transform:rotate(45deg);font-size:16px;">📍</span>
      </div>
      <style>@keyframes zipPinDrop{0%{transform:rotate(-45deg) translateY(-40px);opacity:0}100%{transform:rotate(-45deg) translateY(0);opacity:1}}</style>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -40],
    });

    zipMarkerRef.current = L.marker([zipLocation.lat, zipLocation.lon], { icon: zipIcon })
      .addTo(map)
      .bindPopup(
        `<div style="font-family:Inter,sans-serif;font-weight:700;color:#1E3A6E;font-size:13px;line-height:1.4;max-width:220px">
          Your Area<br>
          <span style="font-weight:400;color:#555;font-size:12px">${zipLocation.label}</span>
        </div>`,
        { maxWidth: 240 },
      )
      .openPopup();
  }, [zipLocation]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full min-h-[300px] lg:min-h-[500px]"
      style={{ zIndex: 0 }}
    />
  );
}

/* ── ZIP search + availability check ──────────────────────────────────
   Live debounced lookup (mirrors the contact page): the visitor types a
   ZIP, useZipGeocode resolves it, the map flies to the pin and the banner
   reports whether we serve the area. No button / reCAPTCHA gate. ─────── */
function ZipAvailabilityCheck({ onResult }: { onResult: (loc: ZipLocation | null) => void }) {
  const [zip, setZip] = useState("");
  const { status, location } = useZipGeocode(zip);

  // Hand the resolved pin off to the map (or clear it while typing/idle).
  useEffect(() => {
    onResult(status === "ok" || status === "out" ? location : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, location]);

  const served = status === "ok";
  const showBanner = (status === "ok" || status === "out") && location;

  return (
    <div
      className="mx-auto mb-10 max-w-[720px] rounded-2xl border border-white/20 p-5 sm:p-6"
      style={{ background: "rgba(15,34,70,0.55)" }}
    >
      <div className="flex items-center gap-2 mb-1">
        <ShieldCheck className="size-4 text-[#F5C842]" />
        <p className="text-[12px] font-bold uppercase tracking-widest text-[#F5C842]">
          Check Your Address
        </p>
      </div>
      <h3 className="text-white font-black text-[20px] sm:text-[22px] leading-tight">
        Do we service your ZIP code?
      </h3>

      <div className="mt-4">
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            pattern="\d{5}"
            placeholder="ENTER ZIP CODE*"
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
            className={`w-full rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm px-4 py-3.5 text-[14px] sm:text-[15px] font-semibold text-white placeholder:text-white/45 focus:outline-none focus:border-[#F5C842] focus:bg-white/15 transition-all duration-200
              ${status === "ok" ? "!border-emerald-400 !bg-emerald-500/10" : ""}
              ${status === "out" ? "!border-amber-400 !bg-amber-500/10" : ""}
              ${status === "error" ? "!border-red-400 !bg-red-500/10" : ""}`}
          />
          {status === "loading" && (
            <Loader2 className="absolute right-3.5 top-1/2 -translate-y-1/2 size-5 text-white/60 animate-spin" />
          )}
          {status === "ok" && (
            <Check className="absolute right-3.5 top-1/2 -translate-y-1/2 size-5 text-emerald-400" strokeWidth={3} />
          )}
        </div>
      </div>

      {showBanner && (
        <div
          className={`mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 rounded-2xl px-5 py-4 border animate-in fade-in slide-in-from-bottom-2 duration-300 ${
            served
              ? "border-emerald-400/40 bg-emerald-500/10"
              : "border-amber-400/40 bg-amber-500/10"
          }`}
          role="alert"
        >
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div
              className={`flex items-center justify-center size-9 rounded-xl shrink-0 font-black ${
                served ? "text-white bg-emerald-500" : "text-[#1E3A6E]"
              }`}
              style={!served ? { background: "linear-gradient(135deg,#F5C842,#e6b228)" } : undefined}
            >
              {served ? <Check className="size-5" strokeWidth={3} /> : "!"}
            </div>
            <div className="text-white/90 text-[14px] leading-relaxed min-w-0">
              <p className="font-bold text-white truncate">{location!.label}</p>
              <p className="text-white/75 mt-0.5">
                {served
                  ? "Great news, we serve your area! Same-day service available."
                  : "Sorry, we don't currently serve this area."}
              </p>
            </div>
          </div>
          {served ? (
            <a
              href="tel:+12067726077"
              className="shrink-0 inline-flex items-center justify-center gap-2 bg-white text-[#1E3A6E] font-bold text-[13px] px-4 py-2.5 rounded-xl hover:bg-[#F5C842] transition-colors duration-150"
            >
              <Phone className="size-4" /> Call Now
            </a>
          ) : (
            <button
              type="button"
              onClick={() => setZip("")}
              className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#F5C842] text-[#1E3A6E] font-bold text-[13px] px-4 py-2.5 rounded-xl hover:bg-[#eec136] transition-colors duration-150"
            >
              Try Another ZIP
            </button>
          )}
        </div>
      )}

      {status === "error" && (
        <div className="mt-4 rounded-xl bg-red-500/15 border border-red-300/40 text-white px-4 py-3 text-sm">
          Couldn't find that ZIP code. Double-check it or call us directly.
        </div>
      )}
    </div>
  );
}

export function ServiceArea() {
  const opts = useSiteOptions();
  const cities = opts.service_area_cities;
  const [zipLocation, setZipLocation] = useState<ZipLocation | null>(null);

  return (
    <section
      className="py-20 relative overflow-hidden border-b-2 border-white"
      style={{
        background: "linear-gradient(135deg, #0f2246 0%, #1E3A6E 40%, #2d5fa8 75%, #4A7BC4 100%)",
      }}
    >
      {/* ── Particle background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <Particles
          particleCount={320}
          particleSpread={18}
          speed={0.5}
          particleBaseSize={140}
          sizeRandomness={1.2}
          alphaParticles={true}
          cameraDistance={20}
          disableRotation={true}
          moveParticlesOnHover={false}
          particleColors={["#ffffff", "#cfe2fa", "#9fc1ee"]}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Heading, white text on gradient bg */}
        <div className="text-center mb-10">
          <span className="inline-block text-2xl font-bold uppercase tracking-widest text-[#F5C842] mb-3">
            Service Area
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Serving the Greater{" "}
            <span className="font-display-italic text-[#F5C842]">Seattle Area.</span>
          </h2>
          <p className="hidden sm:block mt-4 text-lg text-white/75 max-w-2xl mx-auto">
            Licensed plumbers dispatched same-day across King &amp; Pierce counties. If you're in
            any of these areas, we can be there today.
          </p>
        </div>

        {/* ZIP search + availability check */}
        <ZipAvailabilityCheck onResult={setZipLocation} />

        {/* Two-column layout: map LEFT, city list RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── LEFT: Map, full-bleed on mobile, contained on desktop ── */}
          <div
            className="-mx-4 lg:mx-0 rounded-none lg:rounded-2xl overflow-hidden border-y-2 lg:border-2 border-white/25 shadow-2xl bg-white order-1 h-[300px] sm:h-[380px] lg:h-[500px]"
            style={{ isolation: "isolate", position: "relative" }}
          >
            <ServiceMap zipLocation={zipLocation} />
          </div>

          {/* ── RIGHT (desktop) / BELOW (mobile): City list ── */}
          <div
            className="order-2 flex flex-col justify-start pt-4 sm:pt-0
                       sm:rounded-2xl sm:border sm:border-white/20 sm:p-6 lg:p-8
                       sm:h-auto lg:h-[500px] sm:overflow-y-auto
                       sm:[background:rgba(15,34,70,0.55)]"
          >
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-x-3 gap-y-0">
              {cities.map((city) => (
                <Link
                  key={city}
                  to="/areas/$city"
                  params={{ city: slugify(city) }}
                  className="flex items-center gap-1.5 py-2 sm:py-3 border-b border-white/15 text-white font-semibold text-[13px] sm:text-base hover:text-[#F5C842] transition-colors group"
                >
                  <MapPin className="size-3.5 sm:size-4 text-[#F5C842] shrink-0 group-hover:scale-110 transition-transform" />
                  {city}, WA
                </Link>
              ))}
            </div>

            {/* CTA row, hidden on mobile to fit the square */}
            <div className="mt-8 pt-6 border-t border-white/20 hidden sm:flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-base text-white/65 italic">
                Don't see your city? Call us, we likely serve your area.
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
