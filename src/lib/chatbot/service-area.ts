/**
 * service-area.ts
 *
 * Offline ZIP / city → coverage check for the chatbot. The home page and
 * Contact page geocode through Nominatim; the bot needs an instant, network-
 * free answer mid-conversation, so it classifies against known ZIPs instead:
 *
 *   "in"   — Seattle (all 981xx) plus the King + south Pierce ZIPs we serve
 *   "edge" — other Puget Sound ZIPs (980/983/984xx) and nearby towns: the
 *            bot books normally but flags the lead so the office confirms
 *   "out"  — anything else (still emailed to the team, not a conversion)
 *
 * Previously any 98xxx ZIP counted as in-area, which included Spokane-side
 * and Yakima addresses.
 */

import { SERVICE_AREA_CITIES } from "@/data/service-area-cities";

export type Coverage = "in" | "edge" | "out";

/* King County (outside the 981xx Seattle block) + south Pierce County. */
const CORE_ZIPS = new Set(
  // Auburn, Algona, Pacific
  (
    "98001 98002 98047 98071 98092 98093 " +
    // Federal Way
    "98003 98023 98063 " +
    // Bellevue, Medina
    "98004 98005 98006 98007 98008 98009 98015 98039 " +
    // Bothell, Kenmore, Woodinville
    "98011 98012 98021 98028 98041 98072 98077 " +
    // Issaquah, Sammamish
    "98027 98029 98074 98075 " +
    // Kent, Covington, Maple Valley
    "98030 98031 98032 98035 98038 98042 98064 98089 " +
    // Kirkland, Redmond
    "98033 98034 98052 98053 98073 98083 " +
    // Mercer Island
    "98040 " +
    // Renton, Newcastle
    "98055 98056 98057 98058 98059 " +
    // Milton, Puyallup, South Hill, Summit, Edgewood
    "98354 98371 98372 98373 98374 98375 " +
    // Spanaway, Steilacoom, Sumner, Bonney Lake
    "98387 98388 98390 98391 " +
    // Tacoma, Fife, University Place, Parkland
    "98402 98403 98404 98405 98406 98407 98408 98409 98411 98412 98413 98415 98416 98418 98421 " +
    "98422 98424 98443 98444 98445 98446 98465 98466 98467 " +
    // Lakewood, JBLM
    "98430 98433 98439 98498 98499"
  ).split(" "),
);

export function classifyZip(zip: string): Coverage {
  if (!/^\d{5}$/.test(zip)) return "out";
  if (zip.startsWith("981") || CORE_ZIPS.has(zip)) return "in";
  if (/^98[034]/.test(zip)) return "edge";
  return "out";
}

/** Neighborhoods and cities inside the core area that aren't in SERVICE_AREA_CITIES. */
const EXTRA_IN = [
  "tukwila",
  "burien",
  "seatac",
  "sea tac",
  "white center",
  "shoreline",
  "lake forest park",
  "kenmore",
  "woodinville",
  "newcastle",
  "normandy park",
  "medina",
  "covington",
  "maple valley",
  "issaquah",
  "sammamish",
  "sumner",
  "edgewood",
  "milton",
  "university place",
  "parkland",
  "steilacoom",
  "algona",
  "ballard",
  "fremont",
  "west seattle",
  "capitol hill",
  "queen anne",
  "beacon hill",
  "georgetown",
  "magnolia",
  "wallingford",
  "green lake",
  "greenwood",
  "university district",
  "columbia city",
  "rainier beach",
  "rainier valley",
  "south park",
  "delridge",
  "lake city",
  "northgate",
  "ravenna",
  "montlake",
  "madison park",
  "belltown",
  "downtown seattle",
  "south lake union",
  "first hill",
  "central district",
  "leschi",
  "mount baker",
  "sodo",
  "interbay",
  "phinney ridge",
  "crown hill",
  "laurelhurst",
  "sand point",
  "wedgwood",
  "maple leaf",
  "bitter lake",
  "haller lake",
  "skyway",
  "fairwood",
  "lakeland",
  "jovita",
  "north tacoma",
  "ruston",
  "fircrest",
];

const EDGE = [
  "lynnwood",
  "edmonds",
  "mountlake terrace",
  "mill creek",
  "mukilteo",
  "brier",
  "snoqualmie",
  "north bend",
  "enumclaw",
  "black diamond",
  "duvall",
  "carnation",
  "fall city",
  "vashon",
  "gig harbor",
  "orting",
  "buckley",
  "dupont",
  "frederickson",
  "eatonville",
  "ravensdale",
  "hobart",
];

const OUT = [
  "everett",
  "marysville",
  "arlington",
  "lake stevens",
  "snohomish",
  "monroe",
  "olympia",
  "lacey",
  "tumwater",
  "yelm",
  "bremerton",
  "port orchard",
  "silverdale",
  "poulsbo",
  "bainbridge",
  "bellingham",
  "mount vernon",
  "spokane",
  "yakima",
  "wenatchee",
  "leavenworth",
  "ellensburg",
  "tri cities",
  "kennewick",
  "richland",
  "pasco",
  "vancouver",
  "portland",
  "oregon",
  "california",
  "idaho",
  "texas",
  "florida",
  "new york",
];

type CityHit = { name: string; coverage: Coverage };

const titled = (s: string) => s.replace(/(^|\s)(\w)/g, (_, p, c) => p + c.toUpperCase());

const CITY_TABLE: CityHit[] = [
  ...SERVICE_AREA_CITIES.map((c) => ({ name: c.name, coverage: "in" as const })),
  ...EXTRA_IN.map((n) => ({
    name: n === "seatac" || n === "sea tac" ? "SeaTac" : titled(n),
    coverage: "in" as const,
  })),
  ...EDGE.map((n) => ({ name: titled(n), coverage: "edge" as const })),
  ...OUT.map((n) => ({ name: titled(n), coverage: "out" as const })),
  // Longest first so "west seattle" wins over "seattle", "south hill" over "hill".
].sort((a, b) => b.name.length - a.name.length);

/**
 * Finds a known city / neighborhood in normalized text. "Washington" and
 * "Tacoma Dome" style noise is fine; we only need the first real hit.
 */
export function findCity(norm: string): CityHit | null {
  const t = ` ${norm} `;
  for (const c of CITY_TABLE) {
    if (t.includes(` ${c.name.toLowerCase()} `)) return c;
  }
  return null;
}

/** Short list of the headline cities used in bot replies. */
export const HEADLINE_CITIES = [
  "Seattle",
  "Tukwila",
  "Bellevue",
  "Renton",
  "Kent",
  "Auburn",
  "Federal Way",
  "Tacoma",
  "Puyallup",
  "Kirkland",
  "Redmond",
  "Bothell",
];
