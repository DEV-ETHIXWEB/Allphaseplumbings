import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";
import { CustomerQuote } from "@/components/sections/CustomerQuote";

const CONTENT: ServicePageContent = {
  title: "Septic Tank Service",
  breadcrumbLabel: "Septic Tank Service",
  heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
  introHeading: "Professional Septic Tank Services",
  introBlocks: [
    {
      paragraphs: [
        "A properly maintained septic system is essential for safe wastewater management and protecting your property from costly damage. Septic tanks require regular service to function efficiently and prevent backups, overflows, and environmental contamination.",
        "Professional septic tank service ensures your system operates correctly by addressing buildup, blockages, and wear before they turn into serious problems.",
      ],
    },
    {
      heading: "Professional Septic Tank Services",
      paragraphs: ["Our septic tank services include:"],
      list: [
        "Septic tank inspection",
        "Septic tank pumping",
        "Sludge and scum level evaluation",
        "Inlet and outlet inspection",
        "Septic system troubleshooting",
      ],
    },
    {
      heading: "Why Septic Tank Service Is Important",
      paragraphs: ["Regular septic tank service helps:"],
      list: [
        "Prevent sewage backups",
        "Avoid foul odors",
        "Protect drain fields",
        "Extend system lifespan",
        "Reduce costly emergency repairs",
      ],
    },
    {
      heading: "Signs You Need Septic Tank Service",
      paragraphs: ["Common signs include:"],
      list: [
        "Slow-draining sinks or toilets",
        "Gurgling sounds in plumbing",
        "Sewage odors indoors or outdoors",
        "Standing water near the drain field",
        "Unusually green or soggy grass",
      ],
    },
    {
      heading: "Septic Tank Pumping Services",
      paragraphs: [
        "Septic tank pumping removes accumulated solids that settle at the bottom of the tank. Septic pumping service includes:",
      ],
      list: [
        "Removing sludge and scum buildup",
        "Inspecting tank condition",
        "Checking inlet and outlet baffles",
        "Ensuring proper waste levels",
      ],
    },
    {
      heading: "Septic Tank Inspection",
      paragraphs: [
        "A septic tank inspection identifies hidden problems before they escalate. Septic inspection services include:",
      ],
      list: [
        "Measuring sludge and scum levels",
        "Checking tank structure",
        "Inspecting baffles and filters",
        "Evaluating system performance",
      ],
    },
    {
      heading: "Septic System Maintenance",
      paragraphs: [
        "Routine septic maintenance keeps your system functioning properly between pumping intervals. Maintenance services include:",
      ],
      list: [
        "System performance checks",
        "Identifying early signs of blockage",
        "Ensuring proper drainage",
        "Offering usage recommendations",
      ],
    },
    {
      heading: "Septic Tank Repairs",
      paragraphs: ["Common septic repairs include:"],
      list: [
        "Baffle replacement",
        "Tank sealing and leak repair",
        "Pipe connection repairs",
        "Filter cleaning or replacement",
      ],
    },
    {
      heading: "Schedule Septic Tank Service Today",
      paragraphs: [
        "Routine septic tank service is essential for protecting your property, plumbing, and environment. Regular maintenance prevents costly failures and ensures safe wastewater disposal.",
        "If your septic system needs inspection, pumping, or maintenance, professional service is the best solution.",
      ],
    },
  ],
  faqs: [
    {
      q: "How often should I have my septic tank pumped?",
      a: "Most septic tanks should be pumped every 3-5 years, depending on household size and tank capacity. High-use households may need more frequent service. Regular pumping prevents solids from overflowing into the drain field.",
    },
    {
      q: "What are the signs my septic tank is full?",
      a: "Signs include slow drains throughout the home, gurgling sounds, sewage odors indoors or outdoors, and wet or soggy areas near the drain field. Don't wait for a complete backup, schedule service at the first sign of trouble.",
    },
    {
      q: "Can I use a garbage disposal with a septic system?",
      a: "Yes, but with caution. Garbage disposals increase the amount of solids entering your tank, which can require more frequent pumping. We recommend using it sparingly and scheduling more regular maintenance.",
    },
    {
      q: "What should I never put in a septic system?",
      a: "Avoid flushing wipes (even 'flushable' ones), feminine hygiene products, medications, cooking grease, or harsh chemicals. These can disrupt the bacterial balance in your tank or cause clogs.",
    },
    {
      q: "How do I know if my drain field is failing?",
      a: "Signs include soggy or unusually green grass over the drain field, sewage surfacing above ground, slow drains, or sewage backing up into the home. A failing drain field requires immediate professional attention.",
    },
  ],
  related: [
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Sewer Services", href: "/services/sewer-services" },
    { label: "Pipe Repair", href: "/services/pipe-repair" },
  ],
};

export const Route = createFileRoute("/services/septic-tank-service")({
  head: () => ({
    meta: [
      { title: "Professional Septic Tank Services | All Phase Plumbing" },
      {
        name: "description",
        content:
          "Expert septic tank pumping, inspection, and maintenance. Protect your property from backups and failures. Call (206) 772-6077.",
      },
      { property: "og:title", content: "Septic Tank Service | All Phase Plumbing" },
      {
        property: "og:description",
        content: "Professional septic tank service, pumping, inspection, and maintenance.",
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

