import { useEffect, useRef } from "react";
import { cityHighlightPolygon } from "@/data/service-area-cities";
import { enableTwoFingerPan } from "@/lib/leaflet-two-finger-pan";

type Props = {
  name: string;
  lat: number;
  lon: number;
};

/** GeoJSON coords are [lon, lat]; Leaflet wants [lat, lon]. Convert. */
type Ring = [number, number][];
function geoJsonToLeafletRings(geo: {
  type: string;
  coordinates: unknown;
}): Ring[] {
  if (geo.type === "Polygon") {
    const coords = geo.coordinates as [number, number][][];
    return coords.map((ring) => ring.map(([lon, lat]) => [lat, lon] as [number, number]));
  }
  if (geo.type === "MultiPolygon") {
    const coords = geo.coordinates as [number, number][][][];
    return coords.flatMap((poly) =>
      poly.map((ring) => ring.map(([lon, lat]) => [lat, lon] as [number, number])),
    );
  }
  return [];
}

/** Fetch the real city admin boundary from Nominatim. Falls back to null on any error. */
async function fetchCityBoundary(name: string): Promise<Ring[] | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(name + ", Washington, USA")}&format=json&polygon_geojson=1&limit=1`,
      { headers: { Accept: "application/json" } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as Array<{ geojson?: { type: string; coordinates: unknown } }>;
    const hit = data?.[0];
    if (!hit?.geojson) return null;
    const rings = geoJsonToLeafletRings(hit.geojson);
    return rings.length ? rings : null;
  } catch {
    return null;
  }
}

/**
 * Renders a Leaflet map centered on a city with a navy-blue highlight
 * polygon that follows the actual city border (via OpenStreetMap Nominatim).
 * If the boundary can't be fetched, falls back to a circular approximation.
 */
export function CityHighlightMap({ name, lat, lon }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const teardownTouchRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;

    let cancelled = false;

    (async () => {
      const [L, boundaryRings] = await Promise.all([
        import("leaflet"),
        fetchCityBoundary(name),
      ]);
      if (cancelled || !mapRef.current) return;

      // Defensive: tear down any existing instance before re-init
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapRef.current, {
        center: [lat, lon],
        zoom: 12,
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

      const rings = boundaryRings ?? [cityHighlightPolygon(lat, lon)];
      const polygon = L.polygon(rings, {
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

      L.marker([lat, lon], { icon: pin })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:Inter,sans-serif;font-weight:700;color:#1E3A6E;font-size:13px;line-height:1.4">
            ${name}, WA<br>
            <span style="font-weight:400;color:#555;font-size:12px">All Phase Plumbing · (206) 772-6077</span>
          </div>`,
          { maxWidth: 220 },
        )
        .openPopup();

      map.fitBounds(polygon.getBounds(), { padding: [32, 32] });

      /* ── Mobile: require two fingers to pan ── */
      if (mapRef.current) {
        teardownTouchRef.current = enableTwoFingerPan(map, mapRef.current);
      }
    })();

    return () => {
      cancelled = true;
      teardownTouchRef.current?.();
      teardownTouchRef.current = null;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [name, lat, lon]);

  return (
    <section className="bg-white pb-12 sm:pb-16">
      <div className="container mx-auto px-4 max-w-[1305px]">
        <h2
          className="text-[24px] sm:text-[30px] font-black text-[#1E3A6E] mb-4"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Our Service Area in {name}
        </h2>
        <div
          ref={mapRef}
          className="w-full h-[420px] lg:h-[520px] border-2 border-[#1E3A6E]/30 shadow-lg"
          style={{ isolation: "isolate" }}
        />
      </div>
    </section>
  );
}
