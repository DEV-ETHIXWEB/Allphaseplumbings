import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";
import { CustomerQuote } from "@/components/sections/CustomerQuote";

const CONTENT: ServicePageContent = {
  title: "Seattle Repiping",
  breadcrumbLabel: "Repiping",
  heroImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80",
  introHeading: "Seattle Repiping Specialists",
  introBlocks: [
    {
      paragraphs: [
        "When aging or damaged plumbing starts causing issues in your home, Seattle repiping may be the best long-term solution. At All Phase Plumbing, our expert team of licensed plumbers provides repiping services designed to replace old, failing pipe systems with modern, durable materials.",
        "As experienced repipe specialists in Seattle, we handle all types of pipe materials and ensure your new plumbing system delivers improved water pressure, better water quality, and long-lasting performance.",
      ],
    },
    {
      heading: "Repiping in Seattle",
      paragraphs: [
        "If your home is facing recurring plumbing issues, it might be time to consider repiping in Seattle. Common signs you may need a repipe:",
      ],
      list: [
        "Low Water Pressure: Corroded or narrowed pipes reduce flow throughout your plumbing system.",
        "Discolored or Rusty Water: A clear sign of corrosion, especially in older galvanized steel lines.",
        "Frequent Leaks or Bursts: Multiple small leaks are often symptoms of a larger systemic issue.",
        "Visible Corrosion: Rust or buildup on exposed pipes often means hidden damage behind walls.",
        "Noisy Plumbing: Banging or rattling sounds can indicate loose or weakened pipe connections.",
      ],
    },
    {
      heading: "Seattle Repipe Specialists",
      paragraphs: ["We pride ourselves on delivering repiping services that are:"],
      list: [
        "Safe and Code-Compliant: Every installation meets local Seattle plumbing regulations.",
        "Efficient and Organized: Minimal disruption to your daily routine during the process.",
        "Long-Lasting: Installed with top-grade materials designed for decades of reliable use.",
      ],
    },
    {
      heading: "Seattle Repipe: Common Pipe Materials We Replace",
      paragraphs: ["Many older homes in Seattle still contain outdated plumbing materials:"],
      list: [
        "Galvanized Steel: Prone to rust and buildup, restricting water flow.",
        "Polybutylene: A brittle plastic used in the '70s–'90s known for cracking and unexpected failure.",
        "Aged Copper Pipes: Can develop pinhole leaks over time, especially in areas with acidic water.",
      ],
    },
    {
      heading: "Benefits of Repiping Your Seattle Home",
      list: [
        "Improved Water Pressure: Restore consistent, strong flow throughout your home.",
        "Cleaner Water: Eliminate rust and metal particles caused by corroded pipes.",
        "Fewer Leaks: Modern materials prevent water damage and costly repairs.",
        "Higher Home Value: Updated plumbing adds lasting value and buyer confidence.",
        "Peace of Mind: A reliable system means fewer unexpected emergencies.",
      ],
    },
    {
      heading: "Contact Seattle's Most Trusted Plumbers",
      paragraphs: [
        "Don't let plumbing issues disrupt your day. Whether it's a small repair or a major replacement, All Phase Plumbing delivers reliable, affordable plumbing services throughout Seattle and nearby areas. Call Us: (206) 772-6077 or schedule online to book your appointment today.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I know if my home needs repiping?",
      a: "Signs include frequent leaks in multiple locations, consistently low water pressure, discolored or metallic-tasting water, visible corrosion on pipes, and pipes that are more than 40-50 years old. A professional inspection can confirm whether repiping is necessary.",
    },
    {
      q: "How long does whole-home repiping take?",
      a: "Most whole-home repiping projects take 2-5 days depending on home size, pipe accessibility, and materials used. We work efficiently to minimize disruption.",
    },
    {
      q: "Will repiping require opening my walls?",
      a: "In most cases, yes. Access points are needed to run new pipes through the home. We take care to minimize the number of openings and can advise on drywall repair options.",
    },
    {
      q: "What pipe material do you use for repiping?",
      a: "We most commonly use PEX tubing for its flexibility, durability, and resistance to corrosion. Copper is also available. We'll recommend the best option based on your home's plumbing layout and your budget.",
    },
    {
      q: "Does repiping increase home value?",
      a: "Yes. Updated plumbing is a strong selling point that can increase buyer confidence, reduce inspection concerns, and add real value to your home.",
    },
  ],
  related: [
    { label: "Pipe Replacement", href: "/services/pipe-replacement" },
    { label: "Water Lines", href: "/services/water-lines" },
    { label: "Pipe Repair", href: "/services/pipe-repair" },
    { label: "Plumbing", href: "/services/plumbing" },
  ],
};

export const Route = createFileRoute("/services/repiping")({
  head: () => ({
    meta: [
      { title: "Seattle Repiping Specialists | All Phase Plumbing" },
      {
        name: "description",
        content:
          "Expert repiping services in Seattle. Replace aging, corroded pipes with modern materials. Licensed specialists, upfront pricing. Call (206) 772-6077.",
      },
      { property: "og:title", content: "Seattle Repiping | All Phase Plumbing" },
      {
        property: "og:description",
        content: "Professional repiping services throughout Greater Seattle.",
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

