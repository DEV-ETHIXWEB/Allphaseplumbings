import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";

const CONTENT: ServicePageContent = {
  title: "Outdoor Faucet Repair",
  breadcrumbLabel: "Outdoor Faucet Repair",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=1600&q=80",
  introHeading: "Outdoor Faucet Repair",
  introBlocks: [
    {
      paragraphs: [
        "Outdoor faucets are used more than most homeowners realize. From watering lawns and washing cars to filling pools and cleaning outdoor spaces, these fixtures work hard year-round. Because they're exposed to weather and temperature changes, outdoor faucets are more likely to develop problems than indoor plumbing.",
        "Outdoor faucet repair focuses on fixing leaks, restoring proper water flow, and preventing damage caused by freezing, corrosion, or worn-out parts. Addressing these issues early helps avoid water waste, structural damage, and costly pipe repairs inside the home.",
        "Call (206) 772-6077 or book your Outdoor Faucet Repair service online today.",
      ],
    },
    {
      heading: "Professional Outdoor Faucet Repair",
      paragraphs: [
        "Outdoor faucets, also known as hose bibs or spigots, connect directly to your home's water supply. When something goes wrong, the problem often affects more than just the faucet itself.",
        "Common outdoor faucet problems include:",
      ],
      list: [
        "Constant dripping or leaking",
        "Faucet that won't turn on or off",
        "Low water pressure",
        "Water leaking inside walls",
        "Cracked or split faucet bodies",
        "Freeze damage after cold weather",
      ],
    },
    {
      paragraphs: [
        "Professional outdoor faucet repair addresses both the visible fixture and any hidden pipe issues connected to it.",
      ],
    },
    {
      heading: "Signs Your Outdoor Faucet Needs Repair",
      paragraphs: [
        "Outdoor faucet issues often start small but can lead to serious water damage if ignored. Common warning signs include slow drips, low pressure, unusual sounds, or water pooling near the house foundation.",
      ],
    },
    {
      heading: "Leaking Hose Bib Repair",
      paragraphs: [
        "A leaking hose bib is one of the most common outdoor faucet problems. Even small drips can waste a surprising amount of water. Our team replaces worn washers, packing, and damaged hose bibs to restore leak-free operation.",
      ],
    },
    {
      heading: "Outdoor Faucet Freeze Damage Repair",
      paragraphs: [
        "Freezing temperatures can crack the faucet body or the pipe behind the wall. Sometimes the damage isn't visible until spring when water starts leaking inside the wall. We diagnose and repair freeze damage and can upgrade to frost-proof spigots to prevent future issues.",
      ],
    },
    {
      heading: "Outdoor Faucet Water Pressure Issues",
      paragraphs: [
        "If pressure at your outdoor faucet has dropped, the cause may be a partial blockage, a damaged valve, or a deeper supply-line issue. We inspect the full line to restore proper flow.",
      ],
    },
    {
      heading: "Wall and Foundation Leak Prevention",
      paragraphs: [
        "Outdoor faucets that leak into walls or down the foundation can cause hidden water damage and mold. Early repair prevents costly drywall, framing, and foundation issues.",
      ],
    },
    {
      heading: "Schedule Outdoor Faucet Repair Service",
      paragraphs: [
        "If your outdoor faucet is leaking, frozen, or damaged, our licensed plumbers can repair or replace it quickly. Call (206) 772-6077 or book online to schedule outdoor faucet repair service.",
      ],
    },
  ],
  faqs: [
    { q: "My outdoor faucet leaks only when I turn it on, what's wrong?", a: "Usually a worn washer or packing inside the valve stem. It's a quick repair and stops the drip without needing a full faucet replacement." },
    { q: "Should I replace a standard hose bib with a frost-proof one?", a: "If you don't have a frost-proof spigot, we strongly recommend the upgrade in Seattle's climate. They prevent freeze bursts that often happen inside the wall." },
    { q: "Why is water dripping from my ceiling when I use the outdoor spigot?", a: "Likely a cracked pipe behind the wall, often from a past freeze. Don't keep using the spigot. We'll open the wall in a targeted spot, repair the pipe, and patch as needed." },
    { q: "How long does outdoor faucet repair take?", a: "Most repairs are completed in under an hour. A frost-proof replacement that requires accessing pipe behind the wall can take 2–3 hours." },
    { q: "Do you winterize outdoor faucets?", a: "Yes, we can shut off and drain the outdoor line for you each fall, or install dedicated shutoffs so you can do it yourself in future seasons." },
  ],
  related: [
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Water Heaters", href: "/services/water-heaters" },
    { label: "Sewer Services", href: "/services/sewer-services" },
  ],
};

export const Route = createFileRoute("/services/plumbing/outdoor-faucet-repair")({
  head: () => ({
    meta: [
      { title: "Outdoor Faucet & Hose Bib Repair Seattle, All Phase Plumbing" },
      { name: "description", content: "Seattle outdoor faucet and hose bib repair, leaks, freeze damage, low pressure, and frost-proof spigot upgrades." },
    ],
  }),
  component: () => (
    <PageShell>
      <ServicePageTemplate content={CONTENT} />
      <WhyUs />
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
            What Our Customers Say About All Phase Plumbing
          </h2>
          <Link to="/about" className="inline-flex items-center justify-center px-8 py-3 text-sm font-extrabold text-white tracking-widest uppercase shadow-md hover:opacity-90 transition-all duration-200 border-4 border-[#1E3A6E]" style={{ background: "linear-gradient(135deg, #F5C842 0%, #d4a82e 100%)" }}>
            Read More
          </Link>
        </div>
      </section>
    </PageShell>
  ),
});
