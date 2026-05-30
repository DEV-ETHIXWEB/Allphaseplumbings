import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";
import { CityHighlightMap } from "@/components/sections/CityHighlightMap";
import { getCityBySlug } from "@/data/service-area-cities";

const DEFAULT_HERO = "https://images.unsplash.com/photo-1542013936693-884638332954?w=1600&q=80";

/** In-memory cache so revisiting a city doesn't re-hit Wikipedia. */
const heroImageCache = new Map<string, string>();

/**
 * Fetches the lead image of a Washington-state city from Wikipedia's REST API.
 * Tries `<City>,_Washington` first, then bare `<City>` as a fallback for
 * unambiguous names like Seattle.
 */
async function fetchCityImage(name: string): Promise<string> {
  const cached = heroImageCache.get(name);
  if (cached) return cached;

  const slug = name.replace(/ /g, "_");
  const titles = [`${slug},_Washington`, slug];
  for (const title of titles) {
    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
        { headers: { Accept: "application/json" } },
      );
      if (!res.ok) continue;
      const data = (await res.json()) as {
        originalimage?: { source?: string };
        thumbnail?: { source?: string };
      };
      const url = data.originalimage?.source || data.thumbnail?.source;
      if (url) {
        heroImageCache.set(name, url);
        return url;
      }
    } catch {
      // try next title
    }
  }
  // Cache the fallback too so we don't keep retrying a city Wikipedia doesn't index
  heroImageCache.set(name, DEFAULT_HERO);
  return DEFAULT_HERO;
}

/**
 * Builds a fully populated ServicePageContent for any city in the
 * service area. Same structure as the reference Auburn page — intro,
 * service breakdown sections, FAQs, and the sidebar.
 */
function buildCityContent(name: string, heroImage: string): ServicePageContent {
  return {
    title: name,
    breadcrumbLabel: name,
    parentBreadcrumb: { label: "Service Area", href: "/service-area" },
    heroImage,
    introHeading: `Plumber in ${name}`,
    introBlocks: [
      {
        paragraphs: [
          `Finding a trusted ${name} plumber is essential for keeping your home safe, comfortable, and fully functional. At All Phase Plumbing, we've proudly served ${name} and the surrounding areas since 2011, providing expert plumbing solutions backed by professionalism, skill, and integrity. Whether you're dealing with a leaky faucet, a water heater failure, or a major sewer issue, our licensed and insured team delivers prompt, reliable service you can count on.`,
          `As one of the most trusted plumbing companies in ${name}, we handle everything from routine maintenance and repairs to complete plumbing installations and replacements. No matter the size of the job, our team ensures your plumbing system runs efficiently and reliably year-round.`,
        ],
      },
      {
        heading: `${name} Plumbing Services`,
        paragraphs: [
          `Our team of licensed plumbers provides a complete range of plumbing services in ${name} to meet all your residential needs. From emergency repairs to new system installations, we approach every project with care, precision, and dedication. Explore our key services below to learn how we can help keep your plumbing in top shape.`,
        ],
      },
      {
        heading: "Water Heaters",
        paragraphs: [
          `We provide repair, replacement, and maintenance for water heaters of all kinds — including tankless, gas, and electric models. Whether you're dealing with leaks, inconsistent temperatures, or a complete system failure, our ${name} plumbers ensure your hot water supply stays dependable and energy-efficient.`,
        ],
      },
      {
        heading: "Drain Cleaning",
        paragraphs: [
          `Clogged or slow drains are no match for our expert team. We offer comprehensive drain cleaning in ${name} using advanced tools such as hydro jetting and mechanical snaking. From main sewer lines to smaller household drains, we remove grease, roots, and buildup efficiently — helping prevent future clogs and backups.`,
        ],
      },
      {
        heading: "Emergency Plumbing",
        paragraphs: [
          `When a plumbing disaster strikes, you can rely on our emergency plumbing services in ${name}, available 24/7. Whether it's a burst pipe, flooded basement, or overflowing toilet, our skilled team responds quickly to minimize water damage and restore comfort to your home.`,
        ],
      },
      {
        heading: "Sump Pumps",
        paragraphs: [
          `Protect your basement from flooding with our sump pump repair, replacement, and installation services. We work with all types — submersible, pedestal, and battery backup systems — to ensure your pump operates reliably, especially during ${name}'s rainy seasons.`,
        ],
      },
      {
        heading: "Toilets",
        paragraphs: [
          `From running toilets and leaks to complete replacements, our team handles all types of toilet repairs and installations. We ensure every component functions perfectly, improving efficiency and reducing water waste. Whether you're upgrading fixtures or remodeling your bathroom, our plumbers have you covered.`,
        ],
      },
      {
        heading: "Water Softeners",
        paragraphs: [
          `Hard water can damage plumbing and appliances over time. Our team installs, maintains, and repairs all types of water softeners in ${name}, including salt-based and salt-free systems. Enjoy cleaner dishes, softer laundry, and longer-lasting fixtures with our reliable water conditioning solutions.`,
        ],
      },
      {
        heading: "Garbage Disposals",
        paragraphs: [
          `If your garbage disposal is jammed, leaking, or not running efficiently, we can help. We provide full garbage disposal repair and replacement services to keep your kitchen sink running smoothly and odor-free.`,
        ],
      },
      {
        heading: "Faucets and Fixtures",
        paragraphs: [
          `Leaky faucets, dripping showers, and outdated fixtures can waste water and reduce efficiency. We offer professional faucet and fixture repair, installation, and replacement for kitchens, bathrooms, and outdoor spigots — keeping your home looking and functioning its best.`,
        ],
      },
      {
        heading: "Sewer Repair & Replacement",
        paragraphs: [
          `Our team provides both traditional and trenchless sewer repair in ${name}. Whether you're dealing with root intrusion, broken pipes, or ongoing backups, we identify the cause and implement lasting solutions. Trenchless methods minimize digging and restore your sewer system quickly with minimal disruption.`,
        ],
      },
      {
        heading: "Water Lines",
        paragraphs: [
          `A damaged water line can cause significant issues if not repaired quickly. We specialize in water line repair and replacement in ${name}, handling everything from leaks to full line replacements. Our plumbers use advanced equipment to locate problems accurately and restore your water supply safely and efficiently.`,
        ],
      },
      {
        heading: "Call Your Trusted Plumber Today",
        paragraphs: [
          `When plumbing problems arise, you need a local plumber you can trust. At All Phase Plumbing, we're proud to be ${name}'s reliable, full-service plumbing company. From minor leaks to complex system repairs, our team is ready to respond with speed, skill, and professionalism.`,
          `Call (206) 772-6077 or book online to schedule service in ${name} today.`,
        ],
      },
    ],
    faqs: [
      {
        q: `Do you offer same-day plumbing service in ${name}?`,
        a: `Yes — we dispatch licensed plumbers across ${name} and the surrounding Greater Seattle area daily, and we offer same-day service whenever possible. Call (206) 772-6077 to confirm availability.`,
      },
      {
        q: `Are your ${name} plumbers licensed and insured?`,
        a: `Absolutely. Every plumber we send is fully licensed in Washington State and insured for your protection. We don't subcontract — your job is handled by our team.`,
      },
      {
        q: "Do you handle emergencies after hours?",
        a: `Yes. We provide 24/7 emergency plumbing services for burst pipes, sewer backups, water heater failures, and other urgent issues in ${name}.`,
      },
      {
        q: "How do I know if I need pipe repair or full replacement?",
        a: "Frequent leaks, low water pressure, rust-colored water, or visible corrosion are all signs your pipes may need replacing. We'll inspect your system and give you an honest recommendation.",
      },
      {
        q: "Do you provide upfront pricing?",
        a: "Yes — every job starts with a clear, upfront quote. No surprise add-ons after the work begins.",
      },
    ],
    related: [
      { label: "Plumbing", href: "/services/plumbing" },
      { label: "Drain Cleaning", href: "/services/drain-cleaning" },
      { label: "Water Heaters", href: "/services/water-heaters" },
      { label: "Sewer Services", href: "/services/sewer-services" },
    ],
  };
}

export const Route = createFileRoute("/service-area/$city")({
  loader: async ({ params }) => {
    const city = getCityBySlug(params.city);
    if (!city) throw notFound();
    // Pre-fetch the Wikipedia hero image so the page renders with the real
    // photo already in place — no placeholder flash on navigation.
    const heroImage = await fetchCityImage(city.name);
    return { city, heroImage };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Plumber in ${loaderData?.city.name} — All Phase Plumbing`,
      },
      {
        name: "description",
        content: `Licensed plumbing services in ${loaderData?.city.name}, WA — repairs, installations, water heaters, drains, sewer, and 24/7 emergency service from All Phase Plumbing.`,
      },
    ],
  }),
  component: CityPage,
});

function CityPage() {
  const { city, heroImage } = Route.useLoaderData();
  const content = buildCityContent(city.name, heroImage);

  return (
    <PageShell>
      <ServicePageTemplate content={content} />
      <CityHighlightMap name={city.name} lat={city.lat} lon={city.lon} />
      <WhyUs />

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
            What Our Customers Say About All Phase Plumbing
          </h2>
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-extrabold text-white tracking-widest uppercase shadow-md hover:opacity-90 transition-all duration-200 border-4 border-[#1E3A6E]"
            style={{ background: "linear-gradient(135deg, #F5C842 0%, #d4a82e 100%)" }}
          >
            Read More
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
