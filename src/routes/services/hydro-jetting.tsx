import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";
import { CustomerQuote } from "@/components/sections/CustomerQuote";

const CONTENT: ServicePageContent = {
  title: "Seattle Hydro Jetting",
  breadcrumbLabel: "Hydro Jetting",
  heroImage: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1600&q=80",
  introHeading: "Seattle Hydro Jetting Services",
  introBlocks: [
    {
      paragraphs: [
        "All Phase Plumbing offers professional Seattle Hydro Jetting services to keep your drains and sewer lines clear and flowing smoothly. Using high-pressure water streams, hydro jetting effectively removes stubborn clogs, grease buildup, and mineral deposits that traditional snaking methods often can't handle.",
        "Our team has the expertise and equipment to perform safe, thorough hydro jetting protecting your pipes while restoring optimal flow. Whether you're dealing with recurring blockages or need preventative maintenance, our hydro jetting service is a reliable solution to keep your plumbing running at its best.",
      ],
    },
    {
      heading: "Signs You Need Hydro Jet Drain Cleaning",
      paragraphs: [
        "Clogged or slow drains are more than just an inconvenience they can signal deeper problems in your plumbing system. Some common indicators that hydro jet drain cleaning may be necessary include:",
      ],
      list: [
        "Recurring Clogs: Drains that back up repeatedly despite snaking or chemical treatments.",
        "Slow Draining Sinks or Tubs: Water takes longer than usual to drain, signaling buildup in the pipes.",
        "Foul Odors: Persistent sewage smells coming from drains or around plumbing fixtures.",
        "Gurgling or Bubbling Pipes: Air trapped in the plumbing can indicate blockages in the main line.",
      ],
    },
    {
      heading: "Common Causes of Clogs That Require Hydro Jetting Services",
      paragraphs: [
        "Understanding what causes clogs can help prevent future plumbing issues. Some of the most common causes include:",
      ],
      list: [
        "Grease and Fat Buildup: Cooking oils, fats, and food scraps can accumulate in your pipes, leading to recurring blockages.",
        "Mineral Deposits: Hard water can leave calcium and lime deposits inside pipes, restricting water flow.",
        "Hair and Soap Scum: Common in bathroom drains, these materials form tough clogs that snaking alone can't remove.",
        "Foreign Objects: Items like wipes, paper products, or small toys can get stuck and cause backups.",
        "Tree Root Intrusion: Roots can penetrate sewer lines, creating blockages that require hydro jetting to remove completely.",
      ],
    },
    {
      heading: "How Hydro Jet Drain Cleaning Works",
      paragraphs: [
        "At All Phase Plumbing, we use advanced technology and proven methods to perform hydro jetting safely and effectively. Here's what you can expect:",
      ],
      list: [
        "Assessment and Appointment: We evaluate your plumbing system and schedule a convenient time for service.",
        "Inspection: Using cameras and diagnostic tools, we locate the clog and assess your pipes.",
        "Hydro Jetting: High-pressure water removes grease, mineral buildup, and debris, cleaning pipes thoroughly.",
        "Verification: After hydro jetting, we re-inspect the line to ensure it's completely clear.",
        "Advice and Prevention: Our technicians provide maintenance tips to reduce future clogs.",
      ],
    },
    {
      heading: "Benefits of Hydro Jetting",
      list: [
        "Comprehensive Cleaning: Removes grease, roots, and buildup for long-lasting results.",
        "Improved Flow: Clears obstructions and restores full water pressure.",
        "Prevents Future Clogs: Keeps your pipes clean and reduces the risk of backups.",
        "Eco-Friendly: Uses only water, no harsh chemicals.",
        "Extends Pipe Life: Regular hydro jetting minimizes corrosion and wear.",
      ],
      paragraphs: [
        "When you choose All Phase Plumbing, you're investing in a cleaner, safer, and more efficient plumbing system.",
      ],
    },
    {
      heading: "Schedule Your Hydro Jetting in Seattle Today",
      paragraphs: [
        "Don't let stubborn clogs slow down your plumbing. Our experts provide professional hydro jetting in Seattle to clear pipes quickly, thoroughly, and safely. With our skilled team and advanced tools, we'll restore flow and prevent future blockages.",
        "Call Us: (206) 772-6077 now or schedule online to book your Seattle hydro jetting service and experience the All Phase difference.",
      ],
    },
  ],
  faqs: [
    {
      q: "Is hydro jetting safe for all types of pipes?",
      a: "Yes. When performed by trained professionals, hydro jetting is safe for most plumbing systems. We inspect your pipes and adjust the water pressure to suit the material and condition of your plumbing, ensuring delicate or older pipes remain protected.",
    },
    {
      q: "Do you provide emergency hydro jetting services in Seattle?",
      a: "Yes, All Phase Plumbing is available 24/7 for emergency hydro jetting throughout the Greater Seattle area. Call us anytime at (206) 772-6077.",
    },
    {
      q: "How often should I have my drains hydro jetted?",
      a: "For most residential properties, hydro jetting every 18-24 months is recommended. High-use commercial kitchens and properties with recurring clogs may benefit from more frequent service every 6-12 months.",
    },
    {
      q: "How does hydro jetting compare to snaking or chemical drain cleaners?",
      a: "Snaking punches through a clog but leaves residue behind. Hydro jetting scours the entire pipe wall clean using high-pressure water up to 4,000 PSI, delivering longer-lasting results. Chemical cleaners can damage pipes and rarely fix the root cause.",
    },
    {
      q: "How long does a hydro jetting service take?",
      a: "Most hydro jetting jobs take 1-3 hours depending on the length and condition of the pipes. We'll give you an accurate time estimate during your inspection.",
    },
  ],
  related: [
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Sewer Services", href: "/services/sewer-services" },
    { label: "Water Heaters", href: "/services/water-heaters" },
  ],
};

export const Route = createFileRoute("/services/hydro-jetting")({
  head: () => ({
    meta: [
      { title: "Seattle Hydro Jetting Services | All Phase Plumbing" },
      {
        name: "description",
        content:
          "Professional hydro jetting in Seattle. High-pressure drain cleaning for stubborn clogs, grease buildup, and mineral deposits. Call (206) 772-6077.",
      },
      { property: "og:title", content: "Seattle Hydro Jetting | All Phase Plumbing" },
      {
        property: "og:description",
        content: "Expert hydro jetting services throughout Greater Seattle.",
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

