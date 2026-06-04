import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";

const CONTENT: ServicePageContent = {
  title: "Commercial",
  breadcrumbLabel: "Commercial",
  heroImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1600&q=80",
  introHeading: "Seattle Commercial Plumber",
  introBlocks: [
    {
      paragraphs: [
        "When your business needs a reliable Seattle commercial plumber, turn to the experts at All Phase Plumbing. We provide full-service commercial plumbing solutions designed to keep your property running smoothly, from routine maintenance and emergency repairs to new installations and system upgrades.",
        "As a trusted name in commercial plumbing, we understand the demands of operating in commercial environments. Whether you manage a restaurant, office building, apartment complex, or industrial facility, our licensed plumbers deliver efficient, code-compliant, and cost-effective services tailored to your business's needs.",
        "Our goal is to minimize downtime and maximize system performance, so you can focus on your operations, not your plumbing.",
      ],
    },
    {
      heading: "Seattle Commercial Plumbing Services",
      paragraphs: [
        "At All Phase Plumbing, we offer a complete range of Seattle commercial plumbing services for businesses of all sizes. Our experienced technicians are trained to diagnose, repair, and maintain complex plumbing systems with precision and care.",
      ],
    },
    {
      heading: "Our Commercial Plumbing Services Include:",
      list: [
        "Commercial Water Heater Services: Installation, repair, and maintenance for tank and tankless water heaters.",
        "Commercial Drain Cleaning: High-powered hydro jetting and professional drain unclogging for kitchens, restrooms, and utilities.",
        "Commercial Sewer Line Repair & Replacement: Trenchless and traditional methods available.",
        "Fixture Installation & Repair: Toilets, sinks, faucets, and commercial-grade plumbing fixtures.",
        "Pipe Repair & Repiping: Fast, reliable solutions for leaks, bursts, or aging pipelines.",
        "Grease Trap Cleaning: Prevent clogs and code violations with professional maintenance.",
        "Leak Detection: Non-invasive leak identification to prevent costly water damage.",
        "Preventative Plumbing Maintenance: Scheduled inspections and upkeep to avoid emergencies.",
      ],
      paragraphs: [
        "Whether you run a small office or oversee multiple locations, All Phase Plumbing ensures reliable, consistent service to keep your building safe and efficient.",
      ],
    },
    {
      heading: "Seattle Commercial Water Heater Repair",
      paragraphs: [
        "Hot water is critical for daily business operations. If your water heater is failing, you can count on All Phase Plumbing for prompt and professional Seattle commercial water heater repair.",
        "We service all makes and models, from standard tank units to high-efficiency commercial systems, restoring performance quickly to minimize downtime. Our team can handle:",
      ],
      list: [
        "Pilot light or ignition issues",
        "Fluctuating water temperatures",
        "Sediment buildup or corrosion",
        "Faulty heating elements or sensors",
      ],
    },
    {
      heading: "Seattle Commercial Drain Cleaning",
      paragraphs: [
        "A clogged drain can slow down your business or stop it completely. Our Seattle commercial drain cleaning experts use advanced tools like video inspections and hydro jetting to remove grease, debris, and mineral buildup from your pipes.",
        "By addressing blockages quickly and thoroughly, we prevent backups, foul odors, and costly downtime.",
      ],
    },
    {
      heading: "Seattle Commercial Plumbing Repair",
      paragraphs: [
        "From leaky pipes to malfunctioning fixtures, plumbing problems can disrupt productivity and damage property. That's why All Phase Plumbing provides fast, accurate Seattle commercial plumbing repair for businesses of all sizes.",
        "Our licensed plumbers arrive on time, equipped to handle any issue, ensuring minimal disruption to your operations. We provide durable, long-lasting repairs using top-quality materials and proven methods.",
      ],
    },
    {
      heading: "Your Trusted Commercial Plumber in Seattle",
      paragraphs: ["As a trusted commercial plumber in Seattle, All Phase Plumbing is proud to serve:"],
      list: [
        "Office Buildings: Maintenance, restrooms, and water supply systems",
        "Restaurants: Grease trap cleaning, kitchen drain repair, and line maintenance",
        "Retail Stores: Fixture installations and leak repairs",
        "Industrial Facilities: Large-scale plumbing systems and repiping",
        "Apartments & Multi-Family Properties: Shared plumbing systems and water heaters",
      ],
    },
    {
      heading: "Call Your Trusted Seattle Commercial Plumber Today",
      paragraphs: [
        "When you need a dependable Seattle commercial plumbing company, trust All Phase Plumbing to deliver quality service and peace of mind. From emergency repairs to preventative maintenance, we'll help keep your systems running efficiently.",
        "Call (206) 772-6077 today or schedule service online for expert commercial plumbing in Seattle, backed by experience, integrity, and results.",
      ],
    },
  ],
  faqs: [
    {
      q: "What types of commercial properties do you service?",
      a: "We work with all types of commercial clients, including offices, restaurants, retail centers, industrial facilities, and multi-family buildings. Call (206) 772-6077 to discuss your property.",
    },
    {
      q: "Do you offer emergency commercial plumbing services in Seattle?",
      a: "Yes, we offer 24/7 emergency commercial plumbing services across the Greater Seattle area. A licensed plumber is dispatched to your business as quickly as possible to minimize downtime.",
    },
    {
      q: "How often should I schedule commercial plumbing maintenance?",
      a: "For most commercial properties, we recommend a preventative maintenance visit at least once a year. High-volume spaces like restaurants or multi-family buildings often benefit from quarterly inspections.",
    },
    {
      q: "Can you handle large-scale plumbing installations?",
      a: "Absolutely. Our team is experienced with large-scale installations including repiping, multi-unit water heater systems, sewer line replacements, and full commercial fixture rollouts.",
    },
    {
      q: "What's the benefit of preventative maintenance for commercial plumbing?",
      a: "Preventative maintenance catches small issues before they become expensive emergencies, extends the lifespan of your equipment, keeps you code-compliant, and avoids unplanned downtime that costs your business money.",
    },
    {
      q: "Do you provide water heater service for commercial systems?",
      a: "Yes. We install, repair, and maintain commercial tank and tankless water heaters of all sizes and brands, including high-efficiency models.",
    },
  ],
  related: [
    { label: "Water Heaters", href: "/services/water-heaters" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Sewer Services", href: "/services/sewer-services" },
    { label: "Plumbing", href: "/services/plumbing" },
  ],
};

export const Route = createFileRoute("/commercial/")({
  head: () => ({
    meta: [
      { title: "Commercial Plumbing, All Phase Plumbing Seattle" },
      {
        name: "description",
        content:
          "Full-service commercial plumbing in Seattle, water heaters, drain cleaning, sewer repair, leak detection, and preventative maintenance for businesses of all sizes.",
      },
      { property: "og:title", content: "Commercial Plumbing, All Phase Plumbing" },
      {
        property: "og:description",
        content: "Trusted commercial plumber for Seattle businesses.",
      },
    ],
  }),
  component: () => (
    <PageShell>
      <ServicePageTemplate content={CONTENT} />
      <WhyUs />

      {/* ── Customer quote CTA ── */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
            What Our Customers Say About All Phase Plumbing
          </h2>
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-extrabold text-white tracking-widest uppercase rounded shadow-md hover:opacity-90 transition-all duration-200 border-4 border-[#1E3A6E]"
            style={{
              background: "linear-gradient(135deg, #F5C842 0%, #d4a82e 100%)",
            }}
          >
            Read More
          </Link>
        </div>
      </section>
    </PageShell>
  ),
});
