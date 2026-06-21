import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";
import { CustomerQuote } from "@/components/sections/CustomerQuote";

const CONTENT: ServicePageContent = {
  title: "Seattle Toilets",
  breadcrumbLabel: "Toilets",
  heroImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1600&q=80",
  introHeading: "Seattle Toilet Repair, Replacement & Installation",
  introBlocks: [
    {
      paragraphs: [
        "Seattle Toilet Repair, Replacement, and Installation are among the most requested plumbing services at All Phase Plumbing. Whether your toilet is leaking, running nonstop, or simply outdated, our licensed plumbers provide quick and reliable solutions. From simple repairs to complete replacements and new installations, we keep your bathroom working efficiently and comfortably.",
        "When you choose us, you're choosing expert service, quality workmanship, and a commitment to your satisfaction every time.",
      ],
    },
    {
      heading: "Seattle Toilet Repair",
      paragraphs: [
        "Toilet issues can quickly interrupt your day, but our experienced plumbers deliver fast and effective toilet repair in Seattle to restore full function. Whether you're dealing with a weak flush, leak, or persistent clog, we use high-quality parts and professional repair methods to fix the problem for good.",
      ],
      list: [
        "Constantly running toilets",
        "Weak or incomplete flushing",
        "Leaking seals or base leaks",
        "Refill and flapper valve replacements",
        "Tank or bowl cracks",
        "Clogged or slow-draining toilets",
      ],
    },
    {
      heading: "Seattle Toilet Replacement",
      paragraphs: [
        "If your toilet is outdated, inefficient, or beyond repair, our Seattle Toilet Replacement service can help. We provide a wide selection of modern, water-saving toilets that enhance comfort and reduce utility costs.",
      ],
      list: [
        "Remove your old fixture safely",
        "Inspect and prepare the drain connection",
        "Professionally install your new toilet",
        "Ensure leak-free operation and proper water flow",
      ],
    },
    {
      heading: "Seattle Toilet Installation",
      paragraphs: [
        "Planning a remodel or new construction project? We offer Seattle Toilet Installation services for homeowners and contractors alike. Our expert plumbers follow local building codes and best practices to ensure your installation is secure, properly sealed, and long-lasting.",
      ],
      list: [
        "Standard floor-mounted models",
        "Wall-hung toilets",
        "Dual-flush and low-flow designs",
        "Smart and bidet-integrated toilets",
      ],
    },
    {
      heading: "Seattle Toilet Plumber",
      paragraphs: [
        "When you need reliable plumbing assistance, turn to a Seattle Toilet Plumber from All Phase Plumbing. Our licensed experts are equipped to handle any issue whether it's a simple repair, emergency service, or full replacement. We pride ourselves on fast response times, transparent pricing, and guaranteed satisfaction.",
        "If your toilet is causing problems or you're planning an upgrade, contact us today for dependable solutions from Seattle's trusted plumbing professionals.",
      ],
    },
    {
      heading: "Need Seattle Toilet Repair Near Me? Call the Experts!",
      paragraphs: [
        "Searching for 'Seattle toilet repair near me'? All Phase Plumbing is your local team for expert toilet repair, replacement, and installation throughout the Seattle area. Whether it's a leak, clog, or complete upgrade, we're ready to help fast.",
        "Call Us: (206) 772-6077 today or schedule online for prompt, professional toilet service you can count on.",
      ],
    },
  ],
  faqs: [
    {
      q: "Why is my toilet constantly running?",
      a: "A constantly running toilet usually means a worn flapper valve or malfunctioning fill valve is allowing water to leak into the bowl. Replacing these parts restores proper water flow and prevents waste.",
    },
    {
      q: "What causes a toilet to clog frequently?",
      a: "Frequent clogs are often caused by flushing non-flushable items like wipes, paper towels, or excessive toilet paper. Partial blockages in the drain line or a weak flush can also lead to repeat clogging. Professional drain cleaning or a toilet inspection can identify the root cause.",
    },
    {
      q: "When should I replace my toilet instead of repairing it?",
      a: "Consider replacing your toilet if it requires frequent repairs, has visible cracks in the porcelain, uses excessive water per flush, or is more than 15-20 years old. Modern toilets are significantly more water-efficient and reliable.",
    },
    {
      q: "Can I install a new toilet myself?",
      a: "While DIY toilet installation is possible, improper sealing can lead to water damage and mold beneath the floor. Professional installation ensures the flange, wax seal, and supply lines are correctly set up, preventing costly problems later.",
    },
    {
      q: "How long does it take to replace a toilet?",
      a: "A standard toilet replacement typically takes 1-2 hours. If flange repairs or additional plumbing work are needed, it may take longer. We'll give you an accurate estimate before we begin.",
    },
  ],
  related: [
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Water Heaters", href: "/services/water-heaters" },
    { label: "Sewer Services", href: "/services/sewer-services" },
  ],
};

export const Route = createFileRoute("/services/toilets")({
  head: () => ({
    meta: [
      { title: "Seattle Toilet Repair, Replacement & Installation | All Phase Plumbing" },
      {
        name: "description",
        content:
          "Expert Seattle toilet repair, replacement, and installation. Licensed plumbers, fast service, upfront pricing. Call (206) 772-6077.",
      },
      { property: "og:title", content: "Seattle Toilets | All Phase Plumbing" },
      {
        property: "og:description",
        content: "Professional toilet repair, replacement, and installation throughout Seattle.",
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

