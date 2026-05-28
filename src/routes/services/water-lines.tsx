import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";
import { CustomerQuote } from "@/components/sections/CustomerQuote";

const CONTENT: ServicePageContent = {
  title: "Seattle Water Line Replacement",
  breadcrumbLabel: "Water Lines",
  heroImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80",
  introHeading: "Seattle Water Line Repair & Replacement",
  introBlocks: [
    {
      paragraphs: [
        "Seattle Water Line Replacement is one of the most critical plumbing services for homeowners dealing with old, leaking, or corroded pipes. Your home's main water line plays a vital role in supplying clean water, and even minor damage can lead to major problems like low water pressure, high bills, or contaminated water.",
        "At All Phase Plumbing, we specialize in Seattle water line replacement and repair, providing expert solutions to restore your home's water supply safely and efficiently.",
      ],
    },
    {
      heading: "Seattle Water Line Repair",
      paragraphs: [
        "When your main water line is damaged, you need fast and reliable service. Seattle water line repair from All Phase Plumbing is designed to quickly identify and fix issues before they worsen.",
      ],
      list: [
        "Low or inconsistent water pressure",
        "Discolored or rusty water",
        "Unexpected spike in your water bill",
        "Damp spots or pooling water in your yard",
        "Sounds of running water when no faucets are on",
      ],
    },
    {
      heading: "Water Line Replacement in Seattle",
      paragraphs: [
        "Sometimes, a water line is simply too damaged or corroded to repair. In these cases, water line replacement in Seattle is the best long-term solution. Aging pipes especially those made from galvanized steel, lead, or copper can deteriorate over time and pose risks to your home's water quality and pressure.",
        "At All Phase Plumbing, we replace old or broken water lines with high-quality, durable materials designed for longevity and performance. When repairs just aren't enough, count on us for professional water line replacement that restores safety, reliability, and peace of mind.",
      ],
    },
    {
      heading: "Seattle Trenchless Water Line Replacement",
      paragraphs: [
        "If you're worried about your yard being torn up, our Seattle trenchless water line replacement offers a cleaner, faster alternative to traditional digging methods. This innovative process allows us to replace underground pipes with minimal excavation, preserving your driveway, landscaping, and lawn.",
      ],
      list: [
        "Minimal Property Damage: No need to dig long trenches.",
        "Faster Installation: Most projects completed within a day.",
        "Cost-Effective: Reduces labor and restoration costs.",
        "Long-Lasting Materials: Durable piping that resists corrosion and leaks.",
      ],
    },
    {
      heading: "Why Choose All Phase Plumbing for Seattle Water Line Services?",
      paragraphs: [
        "When it comes to Seattle water line repair and replacement, experience and reliability matter. Here's why homeowners choose All Phase Plumbing:",
      ],
      list: [
        "Licensed and insured plumbers with years of local experience",
        "Advanced diagnostic and trenchless technology",
        "Honest pricing and upfront estimates",
        "Fast response times and emergency services",
        "Quality workmanship guaranteed",
      ],
    },
    {
      heading: "Get Reliable Assistance for Your Seattle Water Lines",
      paragraphs: [
        "If you're noticing low water pressure, discolored water, or unexplained wet spots around your yard, don't wait until it becomes an emergency. All Phase Plumbing offers trusted Seattle water line repair and replacement to protect your property and restore your water supply.",
        "Call Us: (206) 772-6077 today or schedule your inspection online — our friendly team will ensure your home's water line is repaired or replaced with expert precision and care.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I know if my main water line needs repair or replacement?",
      a: "Signs include low pressure, rusty water, soggy areas in your yard, or an unusually high water bill. A professional inspection can determine whether repair or full replacement is necessary.",
    },
    {
      q: "What causes water line damage?",
      a: "Water lines can be damaged by aging and corrosion, tree root intrusion, shifting soil, freezing temperatures, or high water pressure. Older materials like galvanized steel are especially prone to deterioration over time.",
    },
    {
      q: "What is trenchless water line replacement?",
      a: "Trenchless replacement allows us to install new pipes underground with minimal digging — protecting your lawn, driveway, and landscaping. It's faster, less disruptive, and often more cost-effective than traditional excavation.",
    },
    {
      q: "How long does a water line replacement take?",
      a: "Most water line replacements take 1-2 days depending on the length of the line and the method used. Trenchless replacements are often completed in a single day.",
    },
    {
      q: "How much does Seattle water line replacement cost?",
      a: "Costs vary based on pipe length, depth, material, and access. We provide honest upfront estimates after a thorough inspection — call (206) 772-6077 for a quote.",
    },
    {
      q: "Can a leaking water line cause property damage?",
      a: "Yes. A leaking main water line can saturate soil, damage your foundation, kill landscaping, and lead to mold growth if water enters the home. Early detection and repair are essential.",
    },
  ],
  related: [
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Sewer Services", href: "/services/sewer-services" },
    { label: "Water Heaters", href: "/services/water-heaters" },
  ],
};

export const Route = createFileRoute("/services/water-lines")({
  head: () => ({
    meta: [
      { title: "Seattle Water Line Repair & Replacement | All Phase Plumbing" },
      {
        name: "description",
        content:
          "Expert Seattle water line repair and replacement. Trenchless options available. Licensed plumbers, upfront pricing. Call (206) 772-6077.",
      },
      { property: "og:title", content: "Seattle Water Line Replacement | All Phase Plumbing" },
      {
        property: "og:description",
        content: "Professional water line repair and replacement throughout Greater Seattle.",
      },
    ],
  }),
  component: () => (
    <PageShell>
      <ServicePageTemplate content={CONTENT} />
      <WhyUs />
      <CustomerQuote />
    </PageShell>
  ),
});
