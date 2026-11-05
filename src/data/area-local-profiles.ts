/**
 * area-local-profiles.ts
 *
 * One short, factual profile per city that does NOT have a hand-written page in
 * area-content-written.ts. These feed a genuinely city-specific content block
 * and FAQ into `buildGeneratedAreaContent`, so each generated /areas/<city>
 * page says something true only of that city instead of rotating the same three
 * phrasings with the name swapped in, which is the pattern Google discounts as
 * thin or doorway content.
 *
 * EDITORIAL RULE FOR THIS FILE: every field must be a verifiable fact about the
 * place (county, geography, water source, broad housing era) or a plumbing
 * consequence that follows directly from one. Nothing here invents job counts,
 * customer names, response times, or review data. Where a city's water source
 * genuinely varies by neighborhood, `water` says so rather than picking one,
 * because telling a homeowner they definitely have soft water when they are on
 * a private well is worse than saying it depends.
 *
 * Regional facts these draw on:
 *   - Seattle's regional supply (Cedar River / South Fork Tolt) is soft, about
 *     20-26 mg/L as CaCO3, and Tacoma Water's Green River supply is likewise
 *     soft. Soft water is mildly corrosive, which contributes to pinhole leaks
 *     in aging copper, and it is why water softeners are usually the wrong
 *     product in this region.
 *   - Groundwater-fed systems in parts of Pierce County and the south King
 *     County valleys can carry real hardness and iron, unlike the surface
 *     supplies above.
 *   - The Green, Duwamish, Puyallup and Sammamish river valleys are former
 *     floodplain with a high water table, which drives crawlspace water and
 *     sump pump work on valley-floor properties.
 */

export type LocalProfile = {
  /** County the city sits in. */
  county: string;
  /** Terrain/geography in a few words, used in copy. */
  terrain: string;
  /** What the local water supply is, honestly hedged where it varies. */
  water: string;
  /** Dominant housing era(s) and the plumbing consequence that follows. */
  housing: string;
  /** The single most common local job type this profile implies. */
  focus: string;
};

export const LOCAL_PROFILES: Record<string, LocalProfile> = {
  bellevue: {
    county: "King County",
    terrain: "the rolling ground east of Lake Washington, with long hillside lots above the lake",
    water:
      "the regional Cedar River and Tolt supply, which is soft, so a water softener is almost never the right spend here",
    housing:
      "a wide split between 1950s and 1960s ranches in the older neighborhoods and far newer construction, so the same street can hold both end-of-life galvanized pipe and ten-year-old PEX",
    focus: "repiping older ranch homes and locating pinhole leaks in aging copper",
  },
  kirkland: {
    county: "King County",
    terrain: "the slopes running down to the Lake Washington shoreline",
    water: "the soft regional Cedar and Tolt supply shared across the Eastside",
    housing:
      "older waterfront and downtown-adjacent homes alongside large amounts of 1980s through 2000s construction",
    focus: "sewer line work on long, sloping lots and water heater replacement",
  },
  redmond: {
    county: "King County",
    terrain: "the Sammamish River valley floor and the plateau above it",
    water: "the soft regional supply serving the Eastside",
    housing:
      "mostly 1980s onward, which means plumbing that is aging as a cohort rather than individually: water heaters, angle stops and fill valves reaching end of life together",
    focus: "water heater replacement and failing shutoff valves",
  },
  bothell: {
    county: "both King and Snohomish County, since the city line runs through it",
    terrain: "the Sammamish River valley and the hills on either side",
    water: "the soft regional surface supply",
    housing:
      "a mix of mid-century homes near the historic downtown and extensive newer subdivisions on the hills",
    focus: "valley-floor crawlspace water and sump pumps",
  },
  "mercer-island": {
    county: "King County",
    terrain: "an island in Lake Washington, where almost every lot slopes toward the water",
    water: "the soft regional Cedar and Tolt supply",
    housing:
      "a large share of 1950s through 1970s homes, many since remodelled, so original galvanized or early copper often sits behind newer finishes",
    focus: "repiping behind finished walls and sewer runs on steep lots",
  },
  "des-moines": {
    county: "King County",
    terrain: "the Puget Sound shoreline and the bluff above it",
    water: "the soft regional supply serving south King County",
    housing:
      "substantial mid-century stock near the marina and bluff, much of it still on original supply and waste lines",
    focus: "galvanized repipes and bluff-lot sewer line repair",
  },
  fife: {
    county: "Pierce County",
    terrain: "the flat Puyallup River valley floor",
    water:
      "groundwater in much of the area rather than a mountain surface supply, so hardness and iron genuinely vary street to street and are worth testing before any treatment is bought",
    housing: "valley housing where the high water table matters more than the build year",
    focus: "sump pumps, crawlspace water and backwater valves",
  },
  puyallup: {
    county: "Pierce County",
    terrain: "the Puyallup River valley floor with the South Hill plateau rising above it",
    water:
      "a mix of sources depending on where you sit, including groundwater, so water chemistry is worth testing rather than assuming",
    housing:
      "older housing in the valley and downtown core, with large newer subdivisions up on the plateau",
    focus: "valley sump pump work below, water heater and fixture replacement above",
  },
  "south-hill": {
    county: "Pierce County",
    terrain: "the plateau above the Puyallup valley",
    water:
      "largely groundwater-fed, so hardness and iron staining are a real possibility here in a way they are not on Seattle's surface supply",
    housing:
      "heavily 1990s and 2000s subdivisions, now hitting the age where original water heaters and shutoff valves fail as a group",
    focus: "water heater replacement and water testing before any treatment",
  },
  lakewood: {
    county: "Pierce County",
    terrain: "the lake-dotted ground southwest of Tacoma",
    water:
      "local groundwater wells rather than a mountain surface supply, so unlike Seattle or Tacoma water, hardness and iron here can genuinely warrant treatment, after a test",
    housing:
      "a broad mix including a lot of mid-century housing with original galvanized supply and cast iron waste lines",
    focus: "repiping, plus water treatment sized to an actual water test",
  },
  spanaway: {
    county: "Pierce County",
    terrain: "the flatter ground south of Tacoma around Spanaway Lake",
    water:
      "groundwater, and some properties toward the edges are on private wells, so water chemistry varies considerably",
    housing:
      "a mix of mid-century and newer homes, with septic systems still in service on a meaningful share of properties",
    focus: "septic system diagnosis and well-water treatment",
  },
  summit: {
    county: "Pierce County",
    terrain: "the ground east of Tacoma above the Puyallup valley",
    water: "groundwater-fed supply, with hardness that varies by neighborhood",
    housing: "largely post-war and later suburban housing",
    focus: "drain cleaning, water heaters and septic work where properties are unsewered",
  },
  "summit-view": {
    county: "Pierce County",
    terrain: "the plateau ground east of Tacoma",
    water: "groundwater-fed supply, worth testing before buying any treatment",
    housing: "predominantly newer suburban construction",
    focus: "water heater replacement and routine drain work",
  },
  "bonney-lake": {
    county: "Pierce County",
    terrain: "the plateau above the Puyallup valley, well above the valley floor",
    water: "a municipal supply drawing on local groundwater sources",
    housing:
      "overwhelmingly 1990s and 2000s subdivision construction, so plumbing failures arrive in clusters tied to the original build date",
    focus: "water heater replacement and failing builder-grade shutoff valves",
  },
};

export function getLocalProfile(slug: string): LocalProfile | undefined {
  return LOCAL_PROFILES[slug];
}
