import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";
import { CustomerQuote } from "@/components/sections/CustomerQuote";

const CONTENT: ServicePageContent = {
  title: "Pipe Replacement",
  breadcrumbLabel: "Pipe Replacement",
  heroImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80",
  introHeading: "Professional Pipe Replacement Services",
  introBlocks: [
    {
      paragraphs: [
        "Pipes don't last forever. Over time, plumbing pipes wear down, corrode, crack, or fail completely. When repairs are no longer enough, pipe replacement becomes the safest way to protect your home and plumbing system.",
        "Pipe replacement focuses on removing damaged or outdated pipes and installing new, reliable plumbing lines. This helps restore proper water flow, prevent leaks, and avoid sudden pipe failures that can cause serious water damage.",
      ],
    },
    {
      heading: "Professional Pipe Replacement",
      paragraphs: ["Common reasons pipe replacement is needed include:"],
      list: [
        "Frequent leaks",
        "Corroded or rusted pipes",
        "Low or inconsistent water pressure",
        "Discolored or metallic-tasting water",
        "Pipes that crack or burst repeatedly",
      ],
    },
    {
      heading: "Signs You Need Pipe Replacement",
      paragraphs: ["Signs pipe replacement may be needed:"],
      list: [
        "Repeated pipe leaks in different areas",
        "Rust-colored water",
        "Water pressure drops throughout the home",
        "Visible corrosion on exposed pipes",
        "Mold or damp smells near walls or ceilings",
        "Pipes older than their expected lifespan",
      ],
    },
    {
      heading: "Water Pipe Replacement",
      paragraphs: ["Water pipe replacement addresses:"],
      list: ["Main water lines", "Branch supply lines", "Hot and cold water pipes"],
    },
    {
      heading: "Drain and Sewer Pipe Replacement",
      paragraphs: ["Drain and sewer pipe replacement may be needed when:"],
      list: [
        "Pipes collapse due to age",
        "Roots cause severe damage",
        "Repeated clogs occur",
        "Pipes crack or separate",
      ],
    },
    {
      heading: "Pipe Replacement After Repeated Repairs",
      paragraphs: ["Pipe replacement reduces:"],
      list: ["Emergency plumbing calls", "Water damage risk", "Repair expenses"],
    },
    {
      heading: "Residential Pipe Replacement",
      paragraphs: [
        "Residential pipe replacement protects homes from unexpected plumbing failures. Replacing pipes helps homeowners:",
      ],
      list: ["Maintain property value", "Prevent water damage", "Improve plumbing reliability"],
    },
    {
      heading: "Preventing Future Pipe Problems",
      paragraphs: ["Helpful tips include:"],
      list: [
        "Avoid harsh chemical drain cleaners",
        "Monitor water pressure",
        "Fix small leaks early",
        "Schedule routine plumbing checks",
      ],
    },
    {
      heading: "Schedule Pipe Replacement Service",
      paragraphs: [
        "If your plumbing system shows signs of aging, corrosion, or repeated leaks, pipe replacement provides a long-term solution. Replacing failing pipes helps protect your home, improve performance, and prevent costly damage.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I know if I need pipe replacement vs. repair?",
      a: "If you're experiencing leaks in multiple locations, have very old pipes (galvanized steel over 40 years, copper over 50 years), or face repeated repair costs, full replacement is often more cost-effective. We'll assess your system and give an honest recommendation.",
    },
    {
      q: "How long does whole-home pipe replacement take?",
      a: "Whole-home repiping typically takes 2-5 days depending on the size of the home and pipe accessibility. We work efficiently to minimize disruption.",
    },
    {
      q: "What types of pipes do you replace with?",
      a: "We most commonly use PEX (cross-linked polyethylene) for its flexibility, corrosion resistance, and longevity. Copper is also available. We'll recommend the best material for your specific situation.",
    },
    {
      q: "Will pipe replacement require opening my walls?",
      a: "In most cases, yes, access points are needed to route new pipes. We minimize disruption as much as possible and can advise on restoration options. Trenchless methods may reduce excavation for exterior lines.",
    },
    {
      q: "Can pipe replacement increase my home's value?",
      a: "Yes. Updated plumbing is a significant selling point for homebuyers and can increase your home's value by avoiding potential water damage disclosures during inspections.",
    },
  ],
  related: [
    { label: "Pipe Repair", href: "/services/pipe-repair" },
    { label: "Water Lines", href: "/services/water-lines" },
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Burst Pipe Repair", href: "/services/burst-pipe-repair" },
  ],
};

export const Route = createFileRoute("/services/pipe-replacement")({
  head: () => ({
    meta: [
      { title: "Professional Pipe Replacement Services | All Phase Plumbing" },
      {
        name: "description",
        content:
          "Expert pipe replacement for corroded, aging, or repeatedly failing pipes. Quality materials, upfront pricing. Call (206) 772-6077.",
      },
      { property: "og:title", content: "Pipe Replacement | All Phase Plumbing" },
      {
        property: "og:description",
        content:
          "Professional pipe replacement services, durable, long-lasting plumbing solutions.",
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

