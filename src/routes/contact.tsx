import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Badges } from "@/components/sections/Badges";
import { MapPin, Phone, Clock, Loader2, ChevronDown, Check } from "lucide-react";
import Particles from "@/components/ui/Particles";

/* ── Custom styled service select ───────────────────────────── */
const SERVICE_OPTIONS = [
  "Plumbing Repair",
  "Drain Cleaning",
  "Water Heater",
  "Sewer Service",
  "Other",
];

function ServiceSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full select-none">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between rounded-xl border-2 bg-white/10 backdrop-blur-sm px-4 py-3.5 text-[14px] sm:text-[15px] font-semibold transition-all duration-200
          ${open ? "border-[#F5C842] bg-white/15" : "border-white/20"}
          ${value ? "text-white" : "text-white/50"}`}
      >
        <span>{value || "SERVICE NEEDED"}</span>
        <ChevronDown
          className={`size-5 transition-transform duration-200 ${open ? "rotate-180 text-[#F5C842]" : "text-white/60"}`}
          strokeWidth={2.5}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-sm"
          style={{ background: "#0f2246" }}
        >
          {SERVICE_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="group w-full flex items-center justify-between px-4 py-3.5 text-left text-[14px] sm:text-[15px] font-semibold text-white/80 transition-colors duration-150 hover:bg-[#F5C842] hover:text-[#1E3A6E] border-b border-white/10 last:border-b-0"
            >
              <span>{opt}</span>
              {value === opt && (
                <Check className="size-4 shrink-0 text-[#F5C842] group-hover:text-[#1E3A6E]" strokeWidth={3} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

declare global {
  interface Window {
    L: typeof import("leaflet");
  }
}

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact All Phase Plumbing, Seattle Plumber" },
      {
        name: "description",
        content:
          "Call (206) 772-6077 or request a tech online. Same-day plumbing service across Greater Seattle.",
      },
      { property: "og:title", content: "Contact All Phase Plumbing" },
      { property: "og:description", content: "Call (206) 772-6077, speak to a real person." },
    ],
  }),
  component: ContactPage,
});

/* ── Leaflet dynamic map component ───────────────────────────── */
type ZipLocation = { lat: number; lon: number; label: string };

function ContactServiceMap({ zipLocation }: { zipLocation: ZipLocation | null }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const zipMarkerRef = useRef<import("leaflet").Marker | null>(null);
  const LRef = useRef<typeof import("leaflet") | null>(null);
  const originalBoundsRef = useRef<import("leaflet").LatLngBounds | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return;
      LRef.current = L;

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

      originalBoundsRef.current = polygon.getBounds();
      map.fitBounds(originalBoundsRef.current, { padding: [32, 32] });
    });

    return () => {
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
      // ZIP cleared, smoothly fly back to the original service area view
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
      className="w-full h-full min-h-[400px] lg:min-h-full"
      style={{ zIndex: 0 }}
    />
  );
}

/* ── Service-area polygon (must match the one drawn on the map) ── */
const SERVICE_AREA_POLYGON: [number, number][] = [
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

/** Standard ray-casting point-in-polygon test. */
function pointInPolygon(lat: number, lon: number, poly: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [yi, xi] = poly[i];
    const [yj, xj] = poly[j];
    const intersect =
      yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/* ── ZIP geocoder hook (Nominatim, debounced) ───────────────── */
function useZipGeocode(zip: string) {
  const [state, setState] = useState<{
    status: "idle" | "loading" | "ok" | "out" | "error";
    location: ZipLocation | null;
  }>({ status: "idle", location: null });

  useEffect(() => {
    if (!/^\d{5}$/.test(zip)) {
      setState({ status: "idle", location: null });
      return;
    }

    let cancelled = false;
    setState((s) => ({ ...s, status: "loading" }));

    const t = setTimeout(() => {
      fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${zip}&country=US&format=json&addressdetails=1&limit=1`,
        { headers: { Accept: "application/json" } },
      )
        .then((r) => r.json())
        .then((data: any[]) => {
          if (cancelled) return;
          if (!data || data.length === 0) {
            setState({ status: "error", location: null });
            return;
          }
          const hit = data[0];
          const a = hit.address ?? {};
          const city =
            a.city || a.town || a.village || a.hamlet || a.suburb || a.county || "";
          const state_ = a.state || "";
          const label = [city, state_, zip].filter(Boolean).join(", ");
          const lat = parseFloat(hit.lat);
          const lon = parseFloat(hit.lon);
          const served = pointInPolygon(lat, lon, SERVICE_AREA_POLYGON);
          setState({
            status: served ? "ok" : "out",
            location: { lat, lon, label },
          });
        })
        .catch(() => {
          if (!cancelled) setState({ status: "error", location: null });
        });
    }, 450);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [zip]);

  return state;
}

function ContactHero() {
  return (
    <section className="relative bg-[#eef4fb] pt-16 pb-12 sm:pt-[90px] sm:pb-[68px] overflow-hidden border-b border-[#1E3A6E]/10">
      <img
        src="https://images.unsplash.com/photo-1542013936693-884638332954?w=1600&q=80"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        style={{ opacity: 0.35, filter: "blur(1px) brightness(0.95)" }}
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
          CONTACT US
        </h1>
        <nav className="text-[13px] sm:text-[14px] mt-3 flex items-center justify-center font-bold text-[#1E3A6E]">
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

function ContactFormBox({
  zip,
  setZip,
  zipStatus,
}: {
  zip: string;
  setZip: (z: string) => void;
  zipStatus: "idle" | "loading" | "ok" | "out" | "error";
}) {
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [service, setService] = useState("");

  const inputBase =
    "w-full rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm px-4 py-3.5 text-[14px] sm:text-[15px] font-semibold text-white placeholder:text-white/45 focus:outline-none focus:border-[#F5C842] focus:bg-white/15 transition-all duration-200";

  return (
    <div className="py-16 sm:py-20 relative z-10">
      <div className="mx-auto px-4 max-w-[1305px]">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2
            className="text-[28px] sm:text-[38px] font-black text-white leading-tight"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Request a Service
          </h2>
          <div className="mt-3 w-14 h-1.5 rounded-full bg-[#F5C842] mx-auto" />
          <p className="mt-4 text-white/65 text-[15px] max-w-[480px] mx-auto leading-relaxed">
            Fill out the form and we'll get back to you within the hour. Same-day service available.
          </p>
        </div>

        {/* Form card */}
        <div className="mx-auto max-w-[860px] p-6 sm:p-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStatus("sent");
            }}
            className="space-y-4 sm:space-y-5"
          >
            {/* Name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="FIRST NAME*"
                required
                className={inputBase}
              />
              <input
                type="text"
                placeholder="LAST NAME*"
                required
                className={inputBase}
              />
            </div>

            {/* ZIP + Phone row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  pattern="\d{5}"
                  placeholder="ZIP CODE*"
                  required
                  value={zip}
                  onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  className={`${inputBase}
                    ${zipStatus === "ok"
                      ? "!border-emerald-400 !bg-emerald-500/10"
                      : zipStatus === "out"
                      ? "!border-amber-400 !bg-amber-500/10"
                      : zipStatus === "error"
                      ? "!border-red-400 !bg-red-500/10"
                      : ""}`}
                />
                {zipStatus === "loading" && (
                  <Loader2 className="absolute right-3.5 top-1/2 -translate-y-1/2 size-5 text-white/60 animate-spin" />
                )}
                {zipStatus === "ok" && (
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400 font-black text-lg animate-in zoom-in duration-300">
                    ✓
                  </span>
                )}
                {zipStatus === "out" && (
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-amber-400 font-black text-lg">
                    !
                  </span>
                )}
              </div>
              <input
                type="tel"
                placeholder="PHONE*"
                required
                className={inputBase}
              />
            </div>

            {/* Service dropdown */}
            <ServiceSelect value={service} onChange={setService} />

            {/* SMS opt-in */}
            <div className="flex items-start gap-3">
              <input
                id="sms-optin"
                type="checkbox"
                checked={smsOptIn}
                onChange={(e) => setSmsOptIn(e.target.checked)}
                className="mt-1 size-4 sm:size-[18px] rounded border-white/30 accent-[#F5C842] cursor-pointer shrink-0"
              />
              <label
                htmlFor="sms-optin"
                className="text-[11px] sm:text-[12px] text-white/50 cursor-pointer leading-relaxed select-none"
              >
                By submitting this form and signing up for texts, you consent to receive messages
                from All Phase Plumbing at the number provided regarding your request, updates
                about appointments and services or promotions and offers, including messages sent
                by autodialer. Consent is not a condition of purchase. Msg &amp; data rates may
                apply. Msg frequency varies. Unsubscribe at any time by replying STOP. Reply HELP
                for help.
              </label>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* Submit */}
            <div className="flex flex-col items-center gap-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center active:scale-[0.98] transition-all duration-200
                  bg-[#F5C842] text-[#1E3A6E] font-black text-[16px] sm:text-[20px] tracking-wide uppercase
                  px-10 py-4 sm:px-16 sm:py-5 rounded-xl
                  hover:bg-[#eec136] hover:shadow-[0_8px_28px_rgba(245,200,66,0.5)]
                  shadow-[0_4px_18px_rgba(245,200,66,0.35)]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                SEND REQUEST
              </button>
              {status === "sent" && (
                <p className="text-[15px] font-bold text-white text-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20 animate-in fade-in slide-in-from-bottom-2 duration-400">
                  ✓ Thanks, we'll be in touch within the hour.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const SERVICE_CITIES = [
  "Seattle, WA",
  "Tacoma, WA",
  "Auburn, WA",
  "Bellevue, WA",
  "Kirkland, WA",
  "Redmond, WA",
  "Renton, WA",
  "Kent, WA",
  "Mercer Island, WA",
  "Burien, WA",
  "Federal Way, WA",
  "Tukwila, WA",
  "Shoreline, WA",
  "Bothell, WA",
  "Kenmore, WA",
  "Issaquah, WA",
  "Sammamish, WA",
  "Puyallup, WA",
];

function ContactServiceAreaSection({
  zipLocation,
  zipStatus,
  onResetZip,
}: {
  zipLocation: ZipLocation | null;
  zipStatus: "idle" | "loading" | "ok" | "out" | "error";
  onResetZip: () => void;
}) {
  const showInfo = zipStatus === "ok" && zipLocation;
  const showOutOfArea = zipStatus === "out" && zipLocation;
  const showCities = !showInfo && !showOutOfArea;

  return (
    <div className="py-20">
      <div className="relative z-10 mx-auto px-4 max-w-[1305px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* Left Panel: Map */}
          <div
            className="bg-white rounded-3xl overflow-hidden shadow-2xl relative w-full min-h-[400px] lg:min-h-full h-full border-2 border-white/20"
            style={{ isolation: "isolate" }}
          >
            <ContactServiceMap zipLocation={zipLocation} />
          </div>

          {/* Right Panel */}
          <div
            className="rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 lg:p-10 flex flex-col"
            style={{ background: "#1E3A6E" }}
          >
            <h2
              className="text-[28px] sm:text-[36px] font-black text-white leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {showInfo
                ? "We Serve Your Area"
                : showOutOfArea
                ? "Sorry, We Don't Serve Here Yet"
                : "Find Your Service Area"}
            </h2>
            <div className="mt-3 w-14 h-1.5 rounded-full bg-[#F5C842]" />

            <p className="mt-4 text-[14px] sm:text-[15px] text-white/80 leading-relaxed">
              {showInfo
                ? "Great news, we dispatch local technicians to your neighborhood daily. Same-day service across Greater Seattle, with honest, upfront pricing on every job."
                : showOutOfArea
                ? `Looks like ${zipLocation?.label} is outside our current service area. We're sorry, we don't serve here for now. Below are the cities we currently cover.`
                : "Enter your ZIP code in the form above and we'll instantly check coverage, drop a pin on your area, and connect you with our nearest technician."}
            </p>

            {/* Out-of-area banner */}
            {showOutOfArea && (
              <div
                className="mt-5 rounded-2xl border border-amber-400/40 bg-amber-500/10 p-4 flex flex-col gap-3"
                role="alert"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex items-center justify-center size-9 rounded-xl shrink-0 text-[#1E3A6E] font-black"
                    style={{ background: "linear-gradient(135deg,#F5C842,#e6b228)" }}
                  >
                    !
                  </div>
                  <div className="text-white/90 text-[14px] leading-relaxed">
                    <p className="font-bold text-white">
                      {zipLocation?.label} is outside our service area.
                    </p>
                    <p className="text-white/75 mt-0.5">
                      Sorry, we don't serve here for now.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onResetZip}
                  className="self-start inline-flex items-center gap-2 px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-[#1E3A6E] bg-[#F5C842] hover:bg-[#eec136] active:scale-[0.98] transition-all duration-150"
                >
                  ← Go Back to Area List
                </button>
              </div>
            )}

            {/* Cities list, shown when no valid ZIP */}
            {showCities && (
              <div
                key="cities-list"
                className="mt-5 flex-1 overflow-y-auto rounded-2xl border border-white/10 divide-y divide-white/10 animate-in fade-in slide-in-from-bottom-2 duration-400"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  maxHeight: "320px",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#F5C842 transparent",
                }}
              >
                {SERVICE_CITIES.map((city) => (
                  <div
                    key={city}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/10 transition-colors duration-150 cursor-default"
                  >
                    <MapPin className="size-4 shrink-0 text-[#F5C842]" strokeWidth={2.5} />
                    <span className="text-[15px] font-semibold text-white">{city}</span>
                  </div>
                ))}
              </div>
            )}

            {/* ZIP result info, shown when valid ZIP */}
            {showInfo && (
              <div
                key={zipLocation?.label || "zip-info"}
                className="mt-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-5 animate-in fade-in slide-in-from-bottom-3 duration-500"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex items-center justify-center size-11 rounded-xl shrink-0 text-white shadow-md"
                    style={{ background: "linear-gradient(135deg,#F5C842,#e6b228)" }}
                  >
                    <MapPin className="size-5 text-[#1E3A6E]" strokeWidth={2.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#F5C842]">
                      Service Area
                    </div>
                    <div className="mt-1 text-[18px] sm:text-[22px] font-black text-white leading-tight truncate">
                      {zipLocation!.label}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {zipStatus === "error" && (
              <div className="mt-4 rounded-xl bg-red-500/15 border border-red-300/40 text-white px-4 py-3 text-sm animate-in fade-in duration-300">
                Couldn't find that ZIP code. Double-check it or call us directly.
              </div>
            )}

            {/* Contact + Availability, only shown after a valid ZIP is entered */}
            {showInfo && (
              <div className="mt-6 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-400">
                <a
                  href="tel:+12067726077"
                  className="group flex items-center gap-4 rounded-2xl px-5 py-4 text-white
                             shadow-[0_10px_25px_-8px_rgba(0,0,0,0.45)]
                             hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
                  style={{ background: "linear-gradient(135deg,#0f2246,#2d5fa8)" }}
                >
                  <span className="inline-flex items-center justify-center size-12 rounded-full bg-[#F5C842] text-[#1E3A6E] shadow-inner shrink-0 group-hover:rotate-[18deg] transition-transform duration-300">
                    <Phone className="size-5" strokeWidth={3} />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[10px] uppercase tracking-[0.25em] opacity-80">Call us now</span>
                    <span className="text-[22px] sm:text-[24px] font-black">(206) 772-6077</span>
                  </span>
                </a>

                <div
                  className="flex items-center gap-4 rounded-2xl px-5 py-4 border-2 border-[#F5C842]/60"
                  style={{ background: "rgba(245,200,66,0.10)" }}
                >
                  <span className="inline-flex items-center justify-center size-12 rounded-full bg-[#F5C842] text-[#1E3A6E] shrink-0">
                    <Clock className="size-5" strokeWidth={3} />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#F5C842]">Availability</span>
                    <span className="text-[18px] sm:text-[20px] font-black text-white">Open 24/7, Same-day Service</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [zip, setZip] = useState("");
  const { status: zipStatus, location: zipLocation } = useZipGeocode(zip);

  return (
    <PageShell>
      <ContactHero />

      {/* Single shared background for form + service area */}
      <section className="relative overflow-hidden bg-[#1E3A6E]">
        {/* Particle background, same as WhyUs / homepage */}
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
        <ContactFormBox zip={zip} setZip={setZip} zipStatus={zipStatus} />
        <ContactServiceAreaSection
          zipLocation={zipLocation}
          zipStatus={zipStatus}
          onResetZip={() => setZip("")}
        />
      </section>

      <Badges />
    </PageShell>
  );
}
