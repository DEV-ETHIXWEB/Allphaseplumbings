export type CityInfo = {
  slug: string;
  name: string;
  lat: number;
  lon: number;
};

/**
 * Centroids for every city in the All Phase service area.
 * Coordinates are approximate city-center lat/lon used to anchor the
 * highlight polygon on each city page's map.
 */
export const SERVICE_AREA_CITIES: CityInfo[] = [
  { slug: "auburn", name: "Auburn", lat: 47.3073, lon: -122.2285 },
  { slug: "bellevue", name: "Bellevue", lat: 47.6101, lon: -122.2015 },
  { slug: "bonney-lake", name: "Bonney Lake", lat: 47.1862, lon: -122.1865 },
  { slug: "bothell", name: "Bothell", lat: 47.7623, lon: -122.2054 },
  { slug: "des-moines", name: "Des Moines", lat: 47.4018, lon: -122.3243 },
  { slug: "federal-way", name: "Federal Way", lat: 47.3223, lon: -122.3126 },
  { slug: "fife", name: "Fife", lat: 47.2398, lon: -122.3596 },
  { slug: "kent", name: "Kent", lat: 47.3809, lon: -122.2348 },
  { slug: "kirkland", name: "Kirkland", lat: 47.6815, lon: -122.2087 },
  { slug: "lakewood", name: "Lakewood", lat: 47.1717, lon: -122.5185 },
  { slug: "mercer-island", name: "Mercer Island", lat: 47.5707, lon: -122.2221 },
  { slug: "puyallup", name: "Puyallup", lat: 47.1854, lon: -122.2929 },
  { slug: "redmond", name: "Redmond", lat: 47.674, lon: -122.1215 },
  { slug: "renton", name: "Renton", lat: 47.4829, lon: -122.2171 },
  { slug: "seattle", name: "Seattle", lat: 47.6062, lon: -122.3321 },
  { slug: "south-hill", name: "South Hill", lat: 47.1376, lon: -122.2918 },
  { slug: "spanaway", name: "Spanaway", lat: 47.1043, lon: -122.4329 },
  { slug: "summit", name: "Summit", lat: 47.1801, lon: -122.3879 },
  { slug: "summit-view", name: "Summit View", lat: 47.2026, lon: -122.3851 },
  { slug: "tacoma", name: "Tacoma", lat: 47.2529, lon: -122.4443 },
  { slug: "tukwila", name: "Tukwila", lat: 47.4729, lon: -122.2171 },
];

export function getCityBySlug(slug: string): CityInfo | undefined {
  return SERVICE_AREA_CITIES.find((c) => c.slug === slug);
}

/**
 * Generates a rough circular polygon (~3 mile radius) centered on a city,
 * used to draw the navy-blue highlight on each city page's map.
 */
export function cityHighlightPolygon(
  lat: number,
  lon: number,
  radiusDeg = 0.04,
  steps = 28,
): [number, number][] {
  const ring: [number, number][] = [];
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    // Stretch slightly more east-west to mimic typical city footprint shape
    ring.push([lat + Math.sin(t) * radiusDeg * 0.85, lon + Math.cos(t) * radiusDeg]);
  }
  ring.push(ring[0]);
  return ring;
}
