import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";
import { CustomerQuote } from "@/components/sections/CustomerQuote";

const CONTENT: ServicePageContent = {
  title: "Fixture Replacement",
  breadcrumbLabel: "Fixture Replacement",
  heroImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1600&q=80",
  introHeading: "Professional Fixture Replacement Services",
  introBlocks: [
    {
      paragraphs: [
        "Outdated or damaged plumbing fixtures don't just affect how your bathroom or kitchen looks — they can also waste water, reduce performance, and cause ongoing plumbing issues. Fixture replacement is a simple but powerful way to improve efficiency, reliability, and appearance.",
        "Our fixture replacement services are designed to remove old or failing fixtures and install new ones correctly, safely, and to code.",
      ],
    },
    {
      heading: "Professional Fixture Replacement Services",
      paragraphs: [
        "Common fixtures we replace include:",
      ],
      list: [
        "Faucets",
        "Toilets",
        "Showers",
        "Bathtubs",
        "Sinks",
        "Valves and trim components",
      ],
    },
    {
      heading: "Signs You Need Fixture Replacement",
      paragraphs: [
        "If you notice any of the following, replacement may be the best solution:",
      ],
      list: [
        "Constant dripping or leaking",
        "Rust, corrosion, or mineral buildup",
        "Loose or unstable fixtures",
        "Reduced water pressure",
        "Cracks or visible damage",
        "Difficulty turning handles or valves",
        "Frequent repairs that don't last",
      ],
    },
    {
      heading: "Faucet Replacement",
      paragraphs: [
        "Faucets are among the most frequently used plumbing fixtures. Replacing a faucet improves:",
      ],
      list: [
        "Water flow consistency",
        "Leak prevention",
        "Ease of use",
        "Overall appearance",
      ],
    },
    {
      heading: "Toilet Fixture Replacement",
      paragraphs: [
        "Modern toilet fixtures are designed for:",
      ],
      list: [
        "Improved flushing efficiency",
        "Reduced water usage",
        "Better sealing and stability",
        "Enhanced comfort and height options",
      ],
    },
    {
      heading: "Shower Fixture Replacement",
      paragraphs: [
        "Replacing shower fixtures can:",
      ],
      list: [
        "Improve temperature control",
        "Restore water pressure",
        "Prevent hidden leaks",
        "Modernize the look of your bathroom",
      ],
    },
    {
      heading: "Why Timely Fixture Replacement Matters",
      paragraphs: [
        "Delaying fixture replacement can lead to:",
      ],
      list: [
        "Hidden water damage",
        "Mold growth",
        "Structural issues",
        "Increased water bills",
      ],
    },
    {
      heading: "Schedule Fixture Replacement Service",
      paragraphs: [
        "If your plumbing fixtures are outdated, leaking, or no longer performing properly, professional fixture replacement is the most reliable solution. Replacing fixtures improves efficiency, appearance, and peace of mind while protecting your plumbing system from future issues.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I know when to replace vs. repair a fixture?",
      a: "If a fixture requires repeated repairs, has visible cracks or corrosion, is more than 15-20 years old, or lacks modern water-efficiency features, replacement is usually the better investment. We'll give you an honest assessment.",
    },
    {
      q: "What types of faucets do you install?",
      a: "We install all styles and brands — single-handle, double-handle, pull-down kitchen faucets, bathroom vanity faucets, tub fillers, and more. We can also help you select a fixture that matches your existing hardware.",
    },
    {
      q: "How long does fixture replacement take?",
      a: "Most single fixture replacements take 1-2 hours. Full bathroom fixture upgrades may take a full day. We'll give you a time estimate before beginning.",
    },
    {
      q: "Can fixture replacement reduce my water bill?",
      a: "Yes. Modern WaterSense certified fixtures use significantly less water than older models. Replacing a 3.5 GPF toilet with a 1.28 GPF model, for example, can save thousands of gallons per year.",
    },
    {
      q: "Do you haul away old fixtures?",
      a: "Yes — we remove and dispose of old fixtures as part of our service, leaving your bathroom or kitchen clean and ready to use.",
    },
  ],
  related: [
    { label: "Toilets", href: "/services/toilets" },
    { label: "Toilet Installation", href: "/services/toilet-installation" },
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
  ],
};

export const Route = createFileRoute("/services/fixture-replacement")({
  head: () => ({
    meta: [
      { title: "Professional Fixture Replacement Services | All Phase Plumbing" },
      {
        name: "description",
        content:
          "Expert plumbing fixture replacement for faucets, toilets, showers, and more. Improve efficiency and appearance. Call (206) 772-6077.",
      },
      { property: "og:title", content: "Fixture Replacement | All Phase Plumbing" },
      {
        property: "og:description",
        content: "Professional fixture replacement services — reliable, code-compliant, and efficient.",
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
