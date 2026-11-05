/**
 * area-content-written.ts
 *
 * Hand-written city pages for the core service area, the cities where All Phase
 * actually works most and where the commercial intent is highest.
 *
 * WHY THIS FILE EXISTS: /areas/$city previously rendered ~20 of its 21 cities
 * from `buildGeneratedAreaContent()`, which rotates a handful of phrasing
 * variants and interpolates the city name. Google treats that pattern as thin
 * or doorway content and generally declines to rank it, which is the single
 * biggest reason a 21-city footprint was producing little organic traffic.
 * The cities below are instead written individually around details that are
 * only true of that city, which is what local search actually rewards.
 *
 * Every local claim here is verifiable, not invented:
 *   - Seattle homeowners own the side sewer all the way to the main under the
 *     street (Seattle Municipal Code ch. 21.16 / Seattle Public Utilities).
 *     Suburban cities and sewer districts draw that line differently, so the
 *     copy says we confirm jurisdiction before digging rather than asserting
 *     one rule everywhere.
 *   - Seattle's supply (Cedar River / South Fork Tolt) is soft, roughly
 *     20-26 mg/L as CaCO3. Soft water is mildly corrosive, which is a real
 *     contributor to pinhole leaks in older copper, and it is also why a water
 *     softener is usually the wrong product to sell here.
 *   - Tacoma Water draws on the Green River watershed and is likewise soft.
 *   - The Green River valley floor through Tukwila, Kent, and Auburn is former
 *     floodplain with a high water table, hence the sump pump and crawlspace
 *     emphasis on those pages.
 *   - Renton Highlands grew as WWII/Boeing-era worker housing, so its original
 *     galvanized supply and cast iron waste lines are now at end of life.
 *
 * NO FABRICATED PROOF: `testimonials` is empty on every city here and
 * `GOOGLE_REVIEWS.verified` is false, so no review counts, star ratings, or
 * customer quotes are published until real ones are supplied. See the notes in
 * data/area-content.ts.
 *
 * To deepen another city, add it here and it automatically takes precedence
 * over the generated version (see getAreaContent).
 */

import type { AreaContent } from "@/data/area-content";

/* Shared service-card copy is deliberately NOT factored out: each city's cards
   describe that city's housing stock, so the wording differs per page. Links
   point at canonical service URLs only (the /services/* duplicates now 301). */

const TUKWILA: AreaContent = {
  slug: "tukwila",
  name: "Tukwila",
  lat: 47.4729,
  lon: -122.2171,
  heroH1: "Tukwila Plumber, Same-Day Service From Our Own Backyard",
  heroPromise:
    "Our shop is on Interurban Ave S in Tukwila, so this is the one city where we're genuinely minutes away, not a dispatch away.",
  metaTitle: "Tukwila Plumber | Same-Day Plumbing Repair | All Phase Plumbing",
  metaDescription:
    "Licensed Tukwila plumbers based on Interurban Ave S. Drain cleaning, water heaters, sewer repair & 24/7 emergency service. Same-day appointments.",
  intro: [
    "All Phase Plumbing is headquartered in Tukwila, at 14101 Interurban Ave S. That matters more than it sounds: when a Tukwila homeowner calls with water coming up through a floor drain, our truck is leaving from inside the same city rather than fighting I-5 to get here. We have worked this valley since 1989, from the older homes up on Tukwila Hill to the commercial strips around Southcenter.",
    "Tukwila sits on the Duwamish and Green River valley floor, and that single geographic fact drives most of the plumbing we do here. A high water table means wet crawlspaces, hard-working sump pumps, and sewer lines that sit closer to groundwater than they do up on the hills. We fix the immediate problem and then tell you honestly whether the underlying cause needs addressing or can safely be left alone.",
  ],
  content: [
    {
      heading: "Valley-Floor Plumbing: High Water Table, Hard-Working Sump Pumps",
      paragraphs: [
        "Much of Tukwila is built on former Duwamish and Green River floodplain. Groundwater sits high, especially from November through March, and that shows up in ways homeowners on higher ground never deal with: standing water in crawlspaces, sump pumps that run constantly and burn out early, and musty smells that come back every winter no matter how often the carpet is cleaned.",
        "We service and replace sump pumps, add battery backup so a pump failure during a power outage doesn't flood a finished basement, and install backwater valves that stop a surcharged main from pushing sewage back into the house. When we quote a sump pump here we size it for Tukwila's actual water table, not a generic spec, because an undersized pump in this valley simply fails again next winter.",
      ],
    },
    {
      heading: "Older Tukwila Homes, Aging Supply and Waste Lines",
      paragraphs: [
        "Neighborhoods like Allentown, Riverton Heights, Foster, and Thorndyke hold a lot of mid-century housing with original galvanized steel supply lines and cast iron waste stacks. Galvanized pipe rusts from the inside out, so the symptom is almost never a dramatic leak at first, it is weak pressure in the upstairs shower, rust-tinted water after a vacation, and then pinhole leaks inside walls. Cast iron waste lines scale up internally and start catching everything that goes down them.",
        "We repipe in PEX and copper, sequenced so your water is off for hours rather than days, and we replace failing waste stacks section by section when a full replacement isn't warranted yet. We will also tell you when your galvanized is fine for another decade, because selling an unnecessary repipe is a quick way to lose a customer we expect to serve for years.",
      ],
    },
    {
      heading: "Commercial Plumbing Around Southcenter and the Industrial Corridor",
      paragraphs: [
        "Tukwila's commercial density is unusual for its size, with the Southcenter retail core, restaurants, hotels, and a deep warehouse and light-industrial corridor along the river. Those buildings need grease interceptor service, backflow assembly testing and certification, high-volume drain and sewer jetting, and repairs scheduled around business hours rather than ours.",
        "We handle commercial plumbing with the same crew that does our residential work, which keeps the standard consistent, and we schedule shutdowns early morning or overnight so a restaurant doesn't lose a dinner service to a drain repair. Annual backflow testing is a legal requirement for most commercial properties in Washington, and we can keep you on schedule so a missed test never becomes a compliance problem.",
      ],
    },
  ],
  services: [
    {
      name: "Sump Pumps",
      description:
        "Sized for Tukwila's valley-floor water table, with battery backup so an outage doesn't mean a flood.",
      href: "/services/plumbing/sump-pumps",
      icon: "Droplets",
    },
    {
      name: "Drain Cleaning",
      description:
        "Hydro-jetting and camera inspection for scaled cast iron waste lines in older Tukwila homes.",
      href: "/services/drain-cleaning",
      icon: "Droplets",
    },
    {
      name: "Repiping",
      description:
        "PEX and copper replacement for the original galvanized supply lines common in Allentown and Foster.",
      href: "/services/plumbing/repiping",
      icon: "Wrench",
    },
    {
      name: "Water Heaters",
      description:
        "Tank and tankless repair and replacement, with hot water usually back the same day you call.",
      href: "/services/water-heaters",
      icon: "Flame",
    },
    {
      name: "Backflow Testing",
      description:
        "Annual certification for Tukwila commercial properties, filed on time so you stay compliant.",
      href: "/services/plumbing/backflow-testing",
      icon: "ShieldCheck",
    },
    {
      name: "Emergency Plumbing",
      description:
        "We are based in Tukwila, so our emergency response here is measured in minutes, not drive time.",
      href: "/services/plumbing/emergency-plumber",
      icon: "ShieldAlert",
    },
  ],
  why: [
    {
      title: "We're Based Here",
      body: "Our shop is on Interurban Ave S. Tukwila isn't a service area we expanded into, it's where our trucks are parked overnight.",
      icon: "MapPin",
      stat: "14101 Interurban Ave S",
    },
    {
      title: "Valley Specialists",
      body: "High water table, wet crawlspaces, and sump pumps that run all winter. We've worked this valley floor since 1989.",
      icon: "Clock",
      stat: "Serving the valley since 1989",
    },
    {
      title: "Residential & Commercial",
      body: "The same licensed crew handles a Foster bungalow and a Southcenter restaurant, so the standard never changes.",
      icon: "ShieldCheck",
      stat: "No subcontractors, ever",
    },
  ],
  neighborhoods: [
    "Southcenter",
    "Allentown",
    "Riverton Heights",
    "Foster",
    "Thorndyke",
    "Tukwila Hill",
    "Duwamish Valley",
    "Cascade View",
  ],
  zips: ["98168", "98188", "98178", "98108"],
  testimonials: [],
  faqs: [
    {
      q: "Where in Tukwila are you located?",
      a: "Our shop is at 14101 Interurban Ave S, Unit 78-A, Tukwila, WA 98168. We are a local plumbing company physically based in Tukwila, not a call center dispatching from out of the area.",
    },
    {
      q: "Why does my Tukwila crawlspace keep flooding every winter?",
      a: "Most of Tukwila sits on former Duwamish and Green River floodplain with a high water table, so groundwater rises through the wet season rather than leaking in from one fixable spot. The usual answer is a correctly sized sump pump with a working check valve, and sometimes a second pump or battery backup. We can confirm whether you are dealing with groundwater or an actual plumbing leak before you spend money on the wrong fix.",
    },
    {
      q: "Do I need a water softener in Tukwila?",
      a: "Usually not. Water in this part of King County is soft, nothing like the hard water in much of the country, so a softener rarely pays for itself. Soft water is mildly corrosive though, which is one reason older copper develops pinhole leaks here. If you have staining or a smell we will test first and recommend treatment only if the test supports it.",
    },
    {
      q: "Can you do backflow testing for a Tukwila business?",
      a: "Yes. We test and certify backflow prevention assemblies for commercial properties throughout Tukwila and file the paperwork with the water purveyor. Annual testing is required for most commercial properties in Washington, and we can put you on a reminder schedule so a missed test never becomes a violation.",
    },
    {
      q: "How fast can you get to a Tukwila emergency?",
      a: "Faster than anywhere else we serve, because we are based in the city. Our emergency line is answered 24/7, every day of the year, and for a true emergency in Tukwila we are typically on site well inside the hour.",
    },
  ],
  responseTime: "Minutes Away",
};

const RENTON: AreaContent = {
  slug: "renton",
  name: "Renton",
  lat: 47.4829,
  lon: -122.2171,
  heroH1: "Renton Plumber, Same-Day Repair & 24/7 Emergency Service",
  heroPromise:
    "Licensed plumbers for Renton's Boeing-era neighborhoods and its newer Fairwood and Highlands builds, usually the same day you call.",
  metaTitle: "Renton Plumber | Same-Day & 24/7 Emergency | All Phase Plumbing",
  metaDescription:
    "Licensed Renton plumbers for repairs, drain cleaning, water heaters, repiping & 24/7 emergencies. Based minutes away in Tukwila. Same-day service.",
  intro: [
    "Renton is one of the busiest cities on our board, and we are based just up Interurban Ave in Tukwila, so a Renton call rarely waits. We work the whole city, from the WWII-era housing in the Highlands and Earlington to the hillside homes in Kennydale and the newer construction out through Fairwood and Benson Hill.",
    "Renton's plumbing problems split almost perfectly along the line between old and new. The mid-century neighborhoods are reaching the end of their original galvanized supply and cast iron waste lines, while the newer subdivisions are hitting the age where the builder-grade water heater and angle stops all fail within a couple of years of each other. We handle both, with flat-rate pricing quoted before the work starts.",
  ],
  content: [
    {
      heading: "Boeing-Era Housing and End-of-Life Galvanized Pipe",
      paragraphs: [
        "The Renton Highlands grew quickly as worker housing during and after the Second World War, and much of Earlington and the older Renton Hill housing dates from the same period. That generation of homes was plumbed in galvanized steel supply and cast iron waste, and both materials are now well past their design life. Galvanized rusts inward until pressure drops and pinholes open inside walls; cast iron scales until the drain catches everything.",
        "We repipe these homes in PEX and copper, and we do it in a sequence that keeps your water on overnight rather than leaving the house dry for days. Where a full repipe isn't justified yet we replace the worst runs and tell you plainly how much life the rest has. If you are buying one of these houses, a pre-purchase camera inspection and pressure check is cheap insurance against a surprise five-figure repair.",
      ],
    },
    {
      heading: "Valley Floor Versus Hillside: Two Different Drainage Problems",
      paragraphs: [
        "Renton straddles the Green River valley floor and the hills above it, and the drainage failures are completely different on each. Down in the valley and around the Earlington and Cascade areas, a high water table means wet crawlspaces, sump pumps running through the whole wet season, and sewer lines sitting near groundwater. Up in Kennydale, Talbot Hill, and Renton Hill, steep lots mean mature trees with aggressive roots and long side sewer runs that give those roots plenty of joints to find.",
        "We clear blockages with hydro-jetting and mechanical snaking, then camera the line so you see the actual cause rather than taking our word for it. For a root-damaged or bellied sewer line we offer trenchless repair and replacement, which restores the pipe without trenching across a mature Kennydale yard or a new Fairwood driveway. Who owns which part of a side sewer varies between jurisdictions, so we confirm responsibility with the city or sewer district before anyone starts digging.",
      ],
    },
    {
      heading: "Water Heaters and Fixtures in Renton's Newer Subdivisions",
      paragraphs: [
        "Fairwood, Benson Hill, and the newer Highlands builds have a different pattern entirely. These homes were finished with builder-grade equipment installed all at once, which means the water heater, the angle stops under every sink, the toilet fill valves, and the washing machine hoses all reach end of life within a short window of each other. Homeowners often read that cluster of failures as bad luck when it is really just a shared install date.",
        "We replace water heaters, tank or tankless, usually restoring hot water the same day, and when we are already under the sink we will replace a seized shutoff valve rather than leaving you with a fixture you cannot isolate next time. Renton requires permits for some of this work, and we pull them, which protects you at resale.",
      ],
    },
  ],
  services: [
    {
      name: "Repiping",
      description:
        "PEX and copper replacement for the end-of-life galvanized pipe common in the Highlands and Earlington.",
      href: "/services/plumbing/repiping",
      icon: "Wrench",
    },
    {
      name: "Sewer Services",
      description:
        "Trenchless sewer repair that spares mature Kennydale yards and newer Fairwood driveways.",
      href: "/services/sewer-services",
      icon: "Pipette",
    },
    {
      name: "Drain Cleaning",
      description:
        "Hydro-jetting and camera inspection for root intrusion on Renton's long hillside sewer runs.",
      href: "/services/drain-cleaning",
      icon: "Droplets",
    },
    {
      name: "Water Heaters",
      description:
        "Same-day tank and tankless replacement for the builder-grade units failing across Fairwood and Benson Hill.",
      href: "/services/water-heaters",
      icon: "Flame",
    },
    {
      name: "Leak Detection",
      description:
        "Pinhole and behind-wall leaks in aging galvanized located electronically, before the framing rots.",
      href: "/services/plumbing/leak-detection",
      icon: "Search",
    },
    {
      name: "Emergency Plumbing",
      description:
        "Burst pipes and sewer backups answered 24/7, dispatched from Tukwila just minutes up Interurban.",
      href: "/services/plumbing/emergency-plumber",
      icon: "ShieldAlert",
    },
  ],
  why: [
    {
      title: "Minutes From Renton",
      body: "Our Tukwila shop is a short run up Interurban Ave, so Renton calls get same-day slots that a cross-county company can't offer.",
      icon: "MapPin",
      stat: "Dispatched from Tukwila",
    },
    {
      title: "Old and New Housing",
      body: "Galvanized repipes in the Highlands and builder-grade replacements in Fairwood need different skills. We do both daily.",
      icon: "Clock",
      stat: "Licensed since 1989",
    },
    {
      title: "Written Guarantee",
      body: "Flat-rate quote before we start, written workmanship guarantee after, and our own licensed crew throughout.",
      icon: "ShieldCheck",
      stat: "100% workmanship guarantee",
    },
  ],
  neighborhoods: [
    "Renton Highlands",
    "Kennydale",
    "Talbot Hill",
    "Benson Hill",
    "Fairwood",
    "Earlington",
    "Maplewood",
    "Cascade",
    "Renton Hill",
    "Tiffany Park",
  ],
  zips: ["98055", "98056", "98057", "98058", "98059"],
  testimonials: [],
  faqs: [
    {
      q: "My Renton Highlands home has low water pressure upstairs. What causes that?",
      a: "In a house of that era it is almost always the original galvanized steel supply piping. Galvanized corrodes from the inside, so the pipe's internal diameter shrinks over decades until the upstairs fixtures starve. Cleaning fixtures or replacing a pressure regulator won't fix it. We can measure static and flowing pressure to confirm the cause before recommending a repipe.",
    },
    {
      q: "Do you offer same-day plumbing service in Renton?",
      a: "Usually yes. We dispatch from Tukwila, minutes up Interurban Ave, so Renton is one of our fastest cities. Book before 2pm on a weekday and we can typically get a licensed plumber out the same day, and true emergencies move ahead of routine work.",
    },
    {
      q: "Who is responsible for the sewer line from my Renton house to the street?",
      a: "Responsibility for the private side sewer depends on your jurisdiction and whether you are served by the city or a sewer district, and the line is not drawn the same way everywhere in King County. Before any excavation we confirm with the relevant authority who owns the failing section, so you are not paying for a repair that isn't yours.",
    },
    {
      q: "Why is my Renton crawlspace wet when I can't find a leak?",
      a: "If you are on the valley floor, near Earlington, Cascade, or the lower Highlands, it is usually groundwater rather than plumbing. The water table rises through the wet season and comes up from below. A correctly sized sump pump with a working check valve is the normal fix. We will test for an actual plumbing leak first so you don't buy a pump you didn't need.",
    },
    {
      q: "Are you available for after-hours emergencies in Renton?",
      a: "Yes, our emergency line is staffed 24/7, including weekends and holidays, for burst pipes, sewer backups, and water heater failures anywhere in Renton.",
    },
  ],
  responseTime: "Under 30 Minutes",
};

const KENT: AreaContent = {
  slug: "kent",
  name: "Kent",
  lat: 47.3809,
  lon: -122.2348,
  heroH1: "Kent Plumber, Same-Day Service Across the Valley and East Hill",
  heroPromise:
    "Licensed plumbing repair from the Kent valley floor up to East Hill and Panther Lake, with 24/7 emergency coverage.",
  metaTitle: "Kent WA Plumber | Same-Day Plumbing Repair | All Phase Plumbing",
  metaDescription:
    "Licensed Kent plumbers for drain cleaning, water heaters, sewer repair, sump pumps & 24/7 emergency service. Same-day appointments across Kent, WA.",
  intro: [
    "Kent splits cleanly into two plumbing worlds, and knowing which one you are in saves a lot of wasted diagnosis. On the valley floor, the old Green River floodplain that now holds Kent's warehouse district and the older Kent Valley housing, groundwater is the defining problem. Up on East Hill, West Hill, and Panther Lake, it is tree roots, long sewer runs, and the steady failure of 1980s and 1990s builder plumbing.",
    "We have worked both since 1989 and we are based a short run north in Tukwila, so Kent gets genuine same-day availability rather than a slot three days out. Every job starts with a flat-rate quote before we pick up a wrench.",
  ],
  content: [
    {
      heading: "The Kent Valley Floor: Groundwater, Sump Pumps, and Backflow",
      paragraphs: [
        "The Kent valley is former Green River floodplain, and the water table reflects it. Through the wet season homeowners here deal with crawlspace water, sump pumps that cycle constantly and wear out years early, and sewer lines that sit close enough to groundwater that infiltration becomes a real factor. None of that is a sign anything is broken in the house, it is the geology, and the right response is equipment sized for it.",
        "We size and install sump pumps for actual valley conditions, add battery backup so a winter power cut doesn't become a flooded floor, and fit backwater valves to stop a surcharged municipal main from pushing sewage back up through the lowest fixture in the house. For the warehouse and light-industrial properties along the valley we also handle high-volume jetting, grease interceptors, and annual backflow assembly certification.",
      ],
    },
    {
      heading: "East Hill, Panther Lake, and 1990s Builder Plumbing",
      paragraphs: [
        "A lot of East Hill, Panther Lake, Meridian, and Lake Meridian housing went up between the late 1970s and the 1990s. Those homes are now at the age where everything installed on the original build date fails at once: the water heater, the plastic-bodied toilet fill valves, the angle stops that will no longer close, and the original hose bibs that split in the first hard freeze. Some houses from that window also have polybutylene supply lines, which fail at the fittings without much warning.",
        "We replace water heaters the same day where we can, swap failing shutoff valves while we are already under the sink, and repipe out of polybutylene when we find it. If you are buying on East Hill, ask us to check what the supply lines are made of before closing, because it changes the number you should be negotiating with.",
      ],
    },
    {
      heading: "Roots, Long Sewer Runs, and Trenchless Repair in Kent",
      paragraphs: [
        "Kent's hill neighborhoods combine mature trees with long private sewer runs from house to main, which gives roots a lot of joints to exploit. The early symptoms are easy to dismiss: a toilet that gurgles when the washing machine drains, a shower that backs up only when the kitchen is in use, a smell outside after heavy rain. Left alone, those become a full backup at the worst possible moment.",
        "We jet and snake the line, then camera it so you can see whether you are dealing with roots, a belly holding water, or a cracked section. For damaged lines we offer trenchless repair and replacement, which puts a new pipe in without trenching across a lawn or driveway. Side sewer ownership differs between the city and the sewer districts serving parts of Kent, so we confirm who is responsible before any digging starts.",
      ],
    },
  ],
  services: [
    {
      name: "Sump Pumps",
      description: "Sized for the Kent valley water table, with battery backup for winter outages.",
      href: "/services/plumbing/sump-pumps",
      icon: "Droplets",
    },
    {
      name: "Sewer Services",
      description: "Trenchless repair for root-damaged side sewers on East Hill and Panther Lake.",
      href: "/services/sewer-services",
      icon: "Pipette",
    },
    {
      name: "Water Heaters",
      description:
        "Same-day tank and tankless replacement for the 1990s builder units now failing across East Hill.",
      href: "/services/water-heaters",
      icon: "Flame",
    },
    {
      name: "Drain Cleaning",
      description: "Hydro-jetting, snaking, and camera inspection anywhere in Kent, same day.",
      href: "/services/drain-cleaning",
      icon: "Droplets",
    },
    {
      name: "Repiping",
      description:
        "Replacement for polybutylene and failing galvanized supply lines found in older Kent homes.",
      href: "/services/plumbing/repiping",
      icon: "Wrench",
    },
    {
      name: "Emergency Plumbing",
      description: "Burst pipes, sewer backups, and flooding handled 24/7 across Kent.",
      href: "/services/plumbing/emergency-plumber",
      icon: "ShieldAlert",
    },
  ],
  why: [
    {
      title: "Valley and Hill",
      body: "Groundwater on the valley floor, roots and builder plumbing on East Hill. We diagnose for the Kent you actually live in.",
      icon: "MapPin",
      stat: "Both sides of Kent, daily",
    },
    {
      title: "Same-Day Capacity",
      body: "Dispatched from nearby Tukwila, so a weekday Kent booking usually gets a plumber the same day.",
      icon: "Clock",
      stat: "Same-day on weekday bookings",
    },
    {
      title: "Upfront Pricing",
      body: "A flat rate quoted before work starts, so the number you agree to is the number on the invoice.",
      icon: "ShieldCheck",
      stat: "Flat-rate quotes, every job",
    },
  ],
  neighborhoods: [
    "East Hill",
    "West Hill",
    "Panther Lake",
    "Meridian",
    "Scenic Hill",
    "Kent Valley",
    "Lake Meridian",
    "Star Lake",
    "Midway",
  ],
  zips: ["98030", "98031", "98032", "98035", "98042"],
  testimonials: [],
  faqs: [
    {
      q: "Why does my sump pump in the Kent valley run so often?",
      a: "Because the Kent valley floor is former Green River floodplain and the water table is genuinely high, particularly from November through March. Frequent cycling is normal here, but it does wear pumps out faster than the manufacturer's rating suggests. The fixes that matter are correct sizing, a working check valve so the pump isn't re-pumping the same water, and battery backup for power cuts.",
    },
    {
      q: "How do I know if my East Hill home has polybutylene pipe?",
      a: "Polybutylene is usually grey, sometimes blue or black, flexible, and stamped PB2110. It shows up in homes plumbed roughly between 1978 and 1995, which covers a lot of East Hill and Panther Lake. It tends to fail at the fittings rather than along the pipe, often with little warning. We can identify it in a few minutes at the water heater or under a sink.",
    },
    {
      q: "My toilet gurgles when the washing machine drains. Is that serious?",
      a: "It is an early warning worth taking seriously. Gurgling in one fixture when another drains means air is being pulled through the system because the main line is partly blocked, commonly by roots in Kent's hill neighborhoods. Jetting and a camera inspection at that stage costs far less than an emergency callout after a full backup.",
    },
    {
      q: "Do you serve commercial properties in the Kent warehouse district?",
      a: "Yes. We handle high-volume drain jetting, grease interceptor service, and annual backflow assembly testing and certification for commercial and light-industrial properties throughout the Kent valley, and we schedule disruptive work outside your operating hours.",
    },
    {
      q: "Can I get a plumber in Kent today?",
      a: "Often yes. Book before 2pm on a weekday and we can usually reach you in Kent the same day. Our emergency line runs 24/7 for burst pipes, sewer backups, and water heater failures.",
    },
  ],
  responseTime: "Under 45 Minutes",
};

const AUBURN: AreaContent = {
  slug: "auburn",
  name: "Auburn",
  lat: 47.3073,
  lon: -122.2285,
  heroH1: "Auburn Plumber, Same-Day Repair From the Valley to Lea Hill",
  heroPromise:
    "Licensed plumbing repair across Auburn, from the older valley core to the newer Lakeland Hills and Lea Hill subdivisions.",
  metaTitle: "Auburn WA Plumber | Same-Day Service | All Phase Plumbing",
  metaDescription:
    "Licensed Auburn plumbers for water heaters, drain cleaning, sewer repair, well and septic plumbing & 24/7 emergencies. Same-day service in Auburn, WA.",
  intro: [
    "Auburn covers a lot of ground and a lot of housing eras, which is why a plumber who only knows one part of the city tends to misdiagnose the rest. The valley core around downtown and Terminal Park holds genuinely old housing with original galvanized and cast iron. Lakeland Hills and Lea Hill are largely 1990s and 2000s construction with a completely different failure pattern. We work all of it.",
    "Auburn also has more properties on wells and septic systems than people expect, particularly toward the city edges and into unincorporated King and Pierce County. Those homes need a plumber who understands what you can and cannot put through a septic system, and who will check the drain field before blaming the toilet.",
  ],
  content: [
    {
      heading: "Downtown Auburn and Terminal Park: Original Galvanized and Cast Iron",
      paragraphs: [
        "The older Auburn neighborhoods around downtown, Terminal Park, and the Game Farm area include housing old enough to still be running on its original galvanized steel supply lines and cast iron waste stacks. Both are at or past end of life. Galvanized corrodes inward, which starves upstairs fixtures and eventually opens pinholes inside walls; cast iron scales internally until a drain that worked fine for forty years starts catching everything.",
        "We repipe in PEX and copper with the work sequenced to keep your water on overnight, and we replace failing waste stacks in sections where a full replacement isn't yet warranted. We also bring old DIY repairs up to current Washington code when we touch them, and pull permits where Auburn requires them, which matters at resale.",
      ],
    },
    {
      heading: "Lakeland Hills and Lea Hill: When Builder-Grade Equipment Ages Out",
      paragraphs: [
        "Lakeland Hills, Lea Hill, and Auburn North went up largely through the 1990s and 2000s. Everything in those houses was installed on the same day, so everything wears out around the same time. The tank water heater passes twenty years, the angle stops seize, the toilet fill valves start running, and the original hose bibs split during the first real freeze. Homeowners read that as a run of bad luck when it is just a shared install date arriving.",
        "We replace water heaters, tank or tankless, and usually restore hot water the same day. When we are already working under a sink we will replace a shutoff valve that no longer closes rather than leave you unable to isolate that fixture next time. For whole-house peace of mind on a home of that age, a pressure check and a camera look at the main are worth more than any single repair.",
      ],
    },
    {
      heading: "Septic Systems and Well Water Around Auburn",
      paragraphs: [
        "Plenty of Auburn-area properties, especially toward the edges and into unincorporated county, run on septic rather than municipal sewer. Septic changes the rules: a garbage disposal adds solids load, flushable wipes are not flushable, and a slow drain throughout the house is more likely a full tank or a failing drain field than a clog under one sink. We diagnose the system rather than just clearing the nearest line.",
        "Homes on private wells also see water chemistry you never get on the Cedar River supply that serves much of Seattle, including real hardness and iron that stains fixtures and shortens water heater life. Where treatment is genuinely warranted we test first and size equipment to the test result. Where it isn't, we will tell you that instead of selling you a softener.",
      ],
    },
  ],
  services: [
    {
      name: "Water Heaters",
      description:
        "Same-day tank and tankless replacement for the aging builder units across Lakeland Hills and Lea Hill.",
      href: "/services/water-heaters",
      icon: "Flame",
    },
    {
      name: "Septic Tank Service",
      description:
        "Diagnosis for Auburn-area homes on septic, including drain field assessment, not just a line clearing.",
      href: "/services/plumbing/septic-tank-service",
      icon: "Pipette",
    },
    {
      name: "Repiping",
      description:
        "PEX and copper replacement for original galvanized in downtown Auburn and Terminal Park.",
      href: "/services/plumbing/repiping",
      icon: "Wrench",
    },
    {
      name: "Drain Cleaning",
      description: "Hydro-jetting, snaking, and camera inspection throughout Auburn, same day.",
      href: "/services/drain-cleaning",
      icon: "Droplets",
    },
    {
      name: "Water Filtration",
      description:
        "Treatment sized to an actual water test for Auburn properties on private wells.",
      href: "/services/plumbing/water-filtration",
      icon: "Search",
    },
    {
      name: "Emergency Plumbing",
      description: "Burst pipes, sewer backups, and water heater failures handled 24/7 in Auburn.",
      href: "/services/plumbing/emergency-plumber",
      icon: "ShieldAlert",
    },
  ],
  why: [
    {
      title: "Every Auburn Era",
      body: "Original galvanized downtown, builder-grade in Lakeland Hills, septic and wells at the edges. We know which is which.",
      icon: "MapPin",
      stat: "Licensed since 1989",
    },
    {
      title: "Septic Literate",
      body: "On a septic property we assess the system and drain field, instead of clearing one line and calling it fixed.",
      icon: "Clock",
      stat: "Septic and sewer both",
    },
    {
      title: "Test, Then Recommend",
      body: "On well water we test before proposing treatment, and we say so when no treatment is needed.",
      icon: "ShieldCheck",
      stat: "No unnecessary upsells",
    },
  ],
  neighborhoods: [
    "Lea Hill",
    "Lakeland Hills",
    "Auburn North",
    "Terminal Park",
    "Game Farm",
    "West Hill",
    "Downtown Auburn",
    "Pacific",
  ],
  zips: ["98001", "98002", "98092"],
  testimonials: [],
  faqs: [
    {
      q: "Can I use a garbage disposal if my Auburn home is on septic?",
      a: "You can, but it adds solids load to the tank and shortens the interval between pumpings. If you run a disposal heavily on septic, expect to pump more often and keep an eye on the drain field. We would rather tell you that up front than clear a line every year without mentioning the cause.",
    },
    {
      q: "Every drain in my house is slow, not just one. What does that mean?",
      a: "Slowness everywhere points to the main line or, on a septic property, to the tank or drain field, rather than to a clog under a single fixture. Clearing one branch won't help. We camera the main and, on septic, check tank level and drain field condition so the repair addresses the actual cause.",
    },
    {
      q: "Do I need a water softener in Auburn?",
      a: "It depends entirely on your water source. If you are on a private well you may genuinely have hardness and iron worth treating, and we will test to confirm. If you are on municipal supply, water in this region is soft and a softener is usually unnecessary. We test before recommending either way.",
    },
    {
      q: "My Lakeland Hills water heater is 20 years old but still works. Replace it now?",
      a: "A tank that age is on borrowed time, and tanks usually fail by leaking rather than by simply stopping. If it sits anywhere that water damage would be expensive, a garage shared with finished space, or an interior closet, planned replacement is far cheaper than an emergency one. We will give you an honest read on its condition rather than a scare.",
    },
    {
      q: "Do you offer same-day service in Auburn?",
      a: "In most cases, yes. Book before 2pm Monday through Friday and we can usually get a licensed plumber to you in Auburn the same day, and our emergency line runs 24/7 for burst pipes and sewer backups.",
    },
  ],
  responseTime: "Under 45 Minutes",
};

const FEDERAL_WAY: AreaContent = {
  slug: "federal-way",
  name: "Federal Way",
  lat: 47.3223,
  lon: -122.3126,
  heroH1: "Federal Way Plumber, Same-Day Repair & 24/7 Emergencies",
  heroPromise:
    "Licensed plumbing repair across Federal Way, from Twin Lakes and Mirror Lake to Dash Point and Redondo.",
  metaTitle: "Federal Way Plumber | Same-Day Service | All Phase Plumbing",
  metaDescription:
    "Licensed Federal Way plumbers for water heaters, drain cleaning, repiping, sewer repair & 24/7 emergency service. Same-day appointments in Federal Way, WA.",
  intro: [
    "Most of Federal Way was built between the 1960s and the late 1980s, and that single fact predicts most of the plumbing we do here. Homes from that window are now at the age where the original supply piping, the waste lines, and the water heater are all reaching the end of their service life at roughly the same time. Some of the later houses also carry polybutylene, which fails at the fittings with very little warning.",
    "We work the whole city, from Twin Lakes and Mirror Lake through Steel Lake and Adelaide out to the bluff neighborhoods at Dash Point and Redondo. Flat-rate pricing quoted before the work begins, our own licensed crew, and a written workmanship guarantee on every repair.",
  ],
  content: [
    {
      heading: "1960s to 1980s Housing and What Fails First",
      paragraphs: [
        "Federal Way's housing boom means an unusually consistent housing age across the city, and that produces a predictable sequence of failures. Galvanized steel supply in the earlier homes corrodes inward until upstairs pressure drops and pinhole leaks start inside walls. Cast iron waste lines scale internally until drains that worked for decades begin catching everything. Houses plumbed from the late 1970s onward may have polybutylene, usually grey and stamped PB2110, which tends to let go at the fittings.",
        "We identify what you actually have before quoting, because the right answer differs a lot: a polybutylene house generally warrants a full repipe, while a galvanized house may only need its worst runs replaced for now. We repipe in PEX and copper, sequenced to keep your water on overnight rather than leaving the house dry for days.",
      ],
    },
    {
      heading: "Bluff Neighborhoods, Long Sewer Runs, and Root Intrusion",
      paragraphs: [
        "The neighborhoods out toward Dash Point, Redondo, and Woodmont combine slope, mature trees, and long private sewer runs between house and main. That is close to ideal conditions for root intrusion: every joint along a long run is an opportunity, and established conifers and maples will find them. The early signs are easy to ignore, a gurgling toilet when the washer drains, a tub that only backs up when the kitchen sink is running, a smell in the yard after heavy rain.",
        "We clear the line by jetting or snaking and then camera it, so you can see whether the cause is roots, a sagging section holding water, or a crack. For a damaged line we offer trenchless repair and replacement that spares established landscaping and driveways. Because Federal Way properties sit across different sewer jurisdictions, we confirm who owns the failing section before any excavation begins.",
      ],
    },
    {
      heading: "Water Heaters and Winter Freeze Damage",
      paragraphs: [
        "Water heaters are the single most common replacement we do in Federal Way, partly because of that uniform housing age and partly because tanks here are often in garages where a leak spreads into finished space before anyone notices. We replace tank and tankless units, usually restoring hot water the same day, and we will tell you honestly whether a repair is the better value on a unit with life left in it.",
        "The other seasonal pattern is freeze damage. Exterior hose bibs and pipe runs through unheated garages and crawlspaces are the usual casualties during a Puget Sound cold snap, and the damage often doesn't appear until the thaw, when a split line starts flowing. We repair burst pipes 24/7 through the winter and can add frost-proof hose bibs and insulation to the vulnerable runs so the same line doesn't split again next year.",
      ],
    },
  ],
  services: [
    {
      name: "Water Heaters",
      description:
        "Same-day tank and tankless replacement, the most common repair in Federal Way's 1970s and 80s housing.",
      href: "/services/water-heaters",
      icon: "Flame",
    },
    {
      name: "Repiping",
      description:
        "Full replacement for polybutylene and failing galvanized supply lines, quoted after we confirm what you have.",
      href: "/services/plumbing/repiping",
      icon: "Wrench",
    },
    {
      name: "Sewer Services",
      description:
        "Trenchless repair for root-damaged runs in the Dash Point and Redondo bluff neighborhoods.",
      href: "/services/sewer-services",
      icon: "Pipette",
    },
    {
      name: "Drain Cleaning",
      description: "Hydro-jetting, snaking, and camera inspection across Federal Way, same day.",
      href: "/services/drain-cleaning",
      icon: "Droplets",
    },
    {
      name: "Burst Pipe Repair",
      description:
        "Freeze-split hose bibs and garage runs repaired 24/7 through the Puget Sound winter.",
      href: "/services/plumbing/burst-pipe-repair",
      icon: "ShieldAlert",
    },
    {
      name: "Leak Detection",
      description:
        "Hidden pinhole and behind-wall leaks located electronically before the framing is damaged.",
      href: "/services/plumbing/leak-detection",
      icon: "Search",
    },
  ],
  why: [
    {
      title: "We Know This Housing",
      body: "Federal Way's homes are mostly one era, so the failures are predictable. We identify your pipe material before quoting.",
      icon: "MapPin",
      stat: "Licensed since 1989",
    },
    {
      title: "Winter Ready",
      body: "Freeze-split hose bibs and garage pipe runs are our busiest winter call here, and we repair them around the clock.",
      icon: "Clock",
      stat: "24/7 emergency line",
    },
    {
      title: "Honest Scope",
      body: "A polybutylene house needs a repipe; a galvanized house often doesn't yet. We quote the one you actually need.",
      icon: "ShieldCheck",
      stat: "Flat-rate quotes, every job",
    },
  ],
  neighborhoods: [
    "Twin Lakes",
    "Mirror Lake",
    "Steel Lake",
    "Adelaide",
    "Lakota",
    "Dash Point",
    "Redondo",
    "Woodmont",
  ],
  zips: ["98003", "98023", "98063"],
  testimonials: [],
  faqs: [
    {
      q: "How do I tell if my Federal Way home has polybutylene pipe?",
      a: "Look at the supply lines where they enter the water heater or under a sink. Polybutylene is flexible, usually grey, sometimes blue or black, and commonly stamped PB2110. It appears in homes plumbed roughly between 1978 and 1995, which covers a lot of Federal Way. It typically fails at the fittings rather than along the pipe, so age matters more than appearance. We can identify it in a few minutes.",
    },
    {
      q: "My outdoor faucet split after a cold snap. Why did it fail now?",
      a: "Water trapped in the hose bib or the short run behind it freezes, expands, and splits the pipe or the valve body. The split often doesn't show until the thaw, when water starts flowing again, which is why people discover it days after the freeze. We repair the damaged section and can fit a frost-proof hose bib so the same point doesn't fail again next winter.",
    },
    {
      q: "Should I repair or replace a leaking water heater?",
      a: "A leaking tank is a replacement, not a repair, because the leak means the inner tank has corroded through and no fitting or element will fix it. If the unit is only dripping at a valve or fitting, that is often repairable. We will tell you which one you have rather than defaulting to the bigger sale.",
    },
    {
      q: "Can you do trenchless sewer repair in the Dash Point area?",
      a: "Yes. Trenchless repair and replacement is particularly well suited to those bluff neighborhoods, where sewer runs are long and the landscaping and driveways you would otherwise have to trench across are worth protecting. We camera the line first so you can see what you are paying to fix.",
    },
    {
      q: "Do you offer same-day plumbing in Federal Way?",
      a: "Usually, yes. A weekday booking made before 2pm typically gets a licensed plumber out to Federal Way the same day, and our emergency line is answered 24/7 for burst pipes, sewer backups, and water heater failures.",
    },
  ],
  responseTime: "Under 45 Minutes",
};

const TACOMA: AreaContent = {
  slug: "tacoma",
  name: "Tacoma",
  lat: 47.2529,
  lon: -122.4443,
  heroH1: "Tacoma Plumber, Same-Day Repair for Century-Old Homes",
  heroPromise:
    "Licensed plumbing repair across Tacoma, from the early-1900s North End and Proctor homes to Northeast Tacoma's newer builds.",
  metaTitle: "Tacoma Plumber | Same-Day Plumbing Repair | All Phase Plumbing",
  metaDescription:
    "Licensed Tacoma plumbers for repiping, drain cleaning, sewer repair, water heaters & 24/7 emergency service. Specialists in Tacoma's older homes.",
  intro: [
    "Tacoma has some of the oldest housing stock we work on, and that is the whole story of plumbing in this city. The North End, Proctor District, Stadium District, and Old Town hold homes well over a century old, many still running original galvanized supply lines and clay or cast iron sewer laterals under mature trees. Those systems need a plumber who has opened a lot of old walls, not one guessing from a manual.",
    "We also work Tacoma's newer and mid-century areas, Northeast Tacoma, Browns Point, South Tacoma, and the Eastside, where the problems look completely different. Every job gets a flat-rate quote before work starts and a written workmanship guarantee after.",
  ],
  content: [
    {
      heading: "Century-Old North End and Proctor Plumbing",
      paragraphs: [
        "Homes in the North End, Proctor, Stadium District, and Old Town were plumbed in galvanized steel and drained through cast iron or clay, and in many houses a good share of that original material is still in service. Galvanized corrodes from the inside, so the first symptoms are weak upstairs pressure and rust-tinted water after the house sits empty, followed eventually by pinhole leaks inside finished walls. These are also houses where decades of partial DIY repairs have left a mix of materials and some connections that were never to code.",
        "We repipe in PEX and copper and we plan the route to minimize what has to be opened in a house with plaster, lath, and original trim worth preserving. Where a full repipe isn't warranted yet we replace the failing runs and give you a straight answer on how much life the rest has, which is the information you actually need for budgeting.",
      ],
    },
    {
      heading: "Clay Sewer Laterals, Big Trees, and Trenchless Repair",
      paragraphs: [
        "Tacoma's older neighborhoods pair clay sewer laterals with very mature street trees, and clay pipe joins in short sections, so a century-old lateral offers roots an enormous number of entry points. The classic progression is a line that needs snaking every couple of years, then every year, then every few months, until it fails completely. Each clearing is cheap; the pattern is the warning.",
        "We camera the lateral so you can see whether you are looking at root intrusion in otherwise sound pipe, a bellied section holding water, or a collapse. Trenchless replacement is often the right answer in these neighborhoods, since it restores the line without trenching through mature parking strips, established gardens, or a driveway. Side sewer responsibility is defined differently from one jurisdiction to the next, so we confirm with the city before excavation rather than assuming.",
      ],
    },
    {
      heading: "Soft Water, Old Copper, and Why You Probably Don't Need a Softener",
      paragraphs: [
        "Tacoma Water draws on the Green River watershed and the supply is soft, as is Seattle's Cedar River water. If you moved here from the Midwest or Southwest, the water-treatment equipment you were used to is mostly unnecessary, and we will say so rather than sell you a softener you do not need.",
        "Soft water does have one real plumbing consequence worth knowing: it is mildly corrosive, which contributes to pinhole leaks in aging copper. That is why a Tacoma house with 1960s or 70s copper can start weeping at multiple points in a short span. If you are seeing repeat pinholes, the answer is usually planned repiping of the affected runs rather than patching each leak as it appears. Where water quality genuinely is a problem, typically on a private well outside the city supply, we test first and size treatment to the result.",
      ],
    },
  ],
  services: [
    {
      name: "Repiping",
      description:
        "PEX and copper replacement for century-old galvanized in the North End and Proctor District.",
      href: "/services/plumbing/repiping",
      icon: "Wrench",
    },
    {
      name: "Sewer Services",
      description:
        "Trenchless replacement for root-damaged clay laterals under Tacoma's mature street trees.",
      href: "/services/sewer-services",
      icon: "Pipette",
    },
    {
      name: "Drain Cleaning",
      description:
        "Jetting, snaking, and camera inspection, so a line you keep clearing gets properly diagnosed.",
      href: "/services/drain-cleaning",
      icon: "Droplets",
    },
    {
      name: "Leak Detection",
      description:
        "Pinhole leaks in aging copper located electronically before they damage plaster and framing.",
      href: "/services/plumbing/leak-detection",
      icon: "Search",
    },
    {
      name: "Water Heaters",
      description:
        "Tank and tankless repair and replacement, with hot water usually restored the same day.",
      href: "/services/water-heaters",
      icon: "Flame",
    },
    {
      name: "Emergency Plumbing",
      description: "Burst pipes, sewer backups, and major leaks handled 24/7 across Tacoma.",
      href: "/services/plumbing/emergency-plumber",
      icon: "ShieldAlert",
    },
  ],
  why: [
    {
      title: "Old-Home Specialists",
      body: "Plaster, lath, original trim, and galvanized pipe. We repipe century-old Tacoma homes without wrecking what makes them worth owning.",
      icon: "MapPin",
      stat: "Licensed since 1989",
    },
    {
      title: "Diagnose, Don't Repeat",
      body: "If you're snaking the same line every year, we camera it and tell you what's actually wrong instead of selling another clearing.",
      icon: "Clock",
      stat: "Camera inspection included",
    },
    {
      title: "No Unnecessary Upsells",
      body: "Tacoma's water is soft. We'll tell you a softener is pointless here rather than quote you for one.",
      icon: "ShieldCheck",
      stat: "Flat-rate quotes, every job",
    },
  ],
  neighborhoods: [
    "North End",
    "Proctor District",
    "Stadium District",
    "Old Town",
    "Hilltop",
    "South Tacoma",
    "Eastside",
    "Northeast Tacoma",
    "Browns Point",
    "Central Tacoma",
  ],
  zips: ["98402", "98403", "98404", "98405", "98406", "98407", "98408", "98409", "98422"],
  testimonials: [],
  faqs: [
    {
      q: "I have to snake my Tacoma sewer line every year. Why does it keep clogging?",
      a: "Repeat clogging on an annual or faster cycle almost always means root intrusion into a clay lateral, which is standard in Tacoma's older neighborhoods. Snaking cuts the roots back but leaves the entry points, so they regrow. A camera inspection shows whether the pipe is otherwise sound, in which case trenchless lining or replacement ends the cycle for good.",
    },
    {
      q: "Why does my older Tacoma home keep springing pinhole leaks in the copper?",
      a: "Repeat pinholes in aging copper usually reflect the pipe's age combined with mildly corrosive soft water, which is what Tacoma's Green River supply is. Once a run starts weeping in several places, patching each leak gets expensive fast. Planned repiping of the affected runs is normally the better value, and we will show you which runs are actually involved.",
    },
    {
      q: "Do I need a water softener in Tacoma?",
      a: "Almost certainly not. Tacoma Water's supply is soft, so the softener that made sense where you used to live is unnecessary here. If you are on a private well outside the city supply, that is a different question and we will test your water before recommending anything.",
    },
    {
      q: "Can you repipe a century-old house without tearing out the plaster?",
      a: "Not without opening some of it, but far less than people expect. We plan routes through closets, basements, and crawlspaces wherever possible and open the minimum needed, because in a North End or Proctor home the original plaster and trim are part of the value. We will walk the planned route with you before starting so you know exactly what gets opened.",
    },
    {
      q: "Do you cover Tacoma for after-hours emergencies?",
      a: "Yes. Our emergency line is answered 24/7, every day of the year, for burst pipes, sewer backups, and water heater failures anywhere in Tacoma.",
    },
  ],
  responseTime: "Under 1 Hour",
};

/**
 * Hand-written cities, keyed by slug. Merged into AREA_CONTENT, so anything
 * listed here overrides the generated version for that city.
 */
export const WRITTEN_AREAS: Record<string, AreaContent> = {
  tukwila: TUKWILA,
  renton: RENTON,
  kent: KENT,
  auburn: AUBURN,
  "federal-way": FEDERAL_WAY,
  tacoma: TACOMA,
};
