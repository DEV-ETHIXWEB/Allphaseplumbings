import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";
import { CustomerQuote } from "@/components/sections/CustomerQuote";

const CONTENT: ServicePageContent = {
  title: "Water Heaters",
  breadcrumbLabel: "Water Heaters",
  heroImage: "https://images.unsplash.com/photo-1701421047855-d7bafd8d6f69?w=1600&q=80",
  introHeading: "Seattle's Water Heater Experts: All Phase Plumbing",
  introBlocks: [
    {
      paragraphs: [
        "Cold showers? Rust-colored water? Strange popping noises from the tank? All Phase Plumbing services, repairs, and installs every major brand of tank and tankless water heater across the Seattle area.",
        "We've been keeping Seattle homes in hot water since 1989 with same-day service, upfront pricing, and a written warranty on every install.",
      ],
    },
    {
      heading: "Complete Water Heater Services",
      paragraphs: [
        "Whether you need a quick repair, a brand-new tankless system, or a like-for-like tank replacement, our licensed plumbers handle the entire job, from removing the old unit to permitting and final inspection.",
      ],
    },
    {
      heading: "Our water heater services include:",
      list: [
        "Tank water heater installation & replacement",
        "Tankless water heater installation",
        "Water heater repair & troubleshooting",
        "Annual flush & maintenance",
        "Anode rod replacement",
        "Thermostat & heating element replacement",
        "Pressure relief valve repair",
        "Expansion tank install",
        "Gas & electric water heater service",
      ],
    },
    {
      heading: "Tank vs. Tankless: Which Is Right for You?",
      paragraphs: [
        "Traditional tank heaters store 40–80 gallons of pre-heated water and have a lower upfront cost. Tankless units heat on demand, they cost more to install but last longer, save energy, and provide unlimited hot water.",
      ],
      list: [
        "Tank: lower install cost, simpler service",
        "Tankless: 20+ year lifespan, endless hot water",
        "Tankless: 25–35% energy savings",
        "Tankless: frees up floor space",
      ],
    },
    {
      heading: "24/7 Emergency Water Heater Service",
      paragraphs: [
        "Leaking tank? No hot water in the middle of winter? Our emergency team is on call around the clock to diagnose and resolve water heater failures before they damage your home.",
      ],
    },
    {
      heading: "Water Heater Maintenance",
      paragraphs: [
        "Annual maintenance extends your water heater's life by 5–10 years. We flush sediment, test the anode rod, check pressure, and verify all safety devices are working correctly.",
      ],
    },
  ],
  faqs: [
    {
      q: "How long should a water heater last?",
      a: "Tank water heaters typically last 8–12 years. Tankless units last 20+ years with proper maintenance. Hard water and skipped maintenance shorten lifespan.",
    },
    {
      q: "Why is my water heater making popping noises?",
      a: "Popping or rumbling is usually sediment buildup at the tank bottom hitting the heating element. An annual flush usually solves it; if it doesn't, the tank may be near end of life.",
    },
    {
      q: "Is a tankless water heater worth the cost?",
      a: "For most Seattle homes, yes, over a 20-year span tankless typically saves money on energy bills and lasts twice as long as a tank. We'll run the numbers for your home before recommending one.",
    },
    {
      q: "How quickly can you install a new water heater?",
      a: "We stock the most common tank sizes and can usually complete a same-day replacement. Tankless installs typically take 4–8 hours depending on whether gas or electrical upgrades are needed.",
    },
    {
      q: "Do you handle the permit?",
      a: "Yes, water heater installs in Seattle require a permit, and we pull and close it as part of every install. You'll have proper paperwork for your insurance and home sale.",
    },
  ],
  related: [
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Sewer Services", href: "/services/sewer-services" },
    { label: "Commercial", href: "/services" },
  ],
};

export const Route = createFileRoute("/services/water-heaters")({
  head: () => ({
    meta: [
      { title: "Water Heater Repair & Install Seattle, All Phase Plumbing" },
      {
        name: "description",
        content:
          "Tank and tankless water heater installation, repair, and maintenance across Greater Seattle.",
      },
      { property: "og:title", content: "Water Heaters Seattle" },
      {
        property: "og:description",
        content: "Tank and tankless installation, repair, and service.",
      },
    ],
  }),
  component: () => (
    <PageShell>
      <ServicePageTemplate content={CONTENT} />
      <HowItWorks />
      <WhyChooseUs />
      <CustomerQuote />
    </PageShell>
  ),
});

