import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";
import { CustomerQuote } from "@/components/sections/CustomerQuote";

const CONTENT: ServicePageContent = {
  title: "Seattle Water Softeners",
  breadcrumbLabel: "Water Softeners",
  heroImage: "https://images.unsplash.com/photo-1564182842519-8a3b2af3e228?w=1600&q=80",
  introHeading: "Seattle Water Softener Services",
  introBlocks: [
    {
      paragraphs: [
        "Hard water can do more damage than you might think. It leaves behind mineral deposits, shortens the lifespan of your plumbing fixtures and appliances, and can even make your skin and hair feel dry and dull. That's why so many homeowners are turning to Seattle water softeners for a reliable, long-term solution.",
        "At All Phase Plumbing, we specialize in Seattle water softener repair, installation, and maintenance. Enjoy cleaner, softer water and protect your plumbing system for years to come.",
      ],
    },
    {
      heading: "Seattle Water Softener Repair",
      paragraphs: [
        "Is your water softener struggling to keep up? Our team provides professional Seattle water softener repair to restore system efficiency. Common Signs You May Need Water Softener Repair:",
      ],
      list: [
        "Soap scum or residue: Cloudy dishes, stiff laundry, or scale on faucets.",
        "Low water pressure: Mineral buildup inside pipes could mean your softener isn't working efficiently.",
        "Unusual taste or odor: A salty or metallic taste could indicate a malfunction in the brine tank or resin bed.",
        "Excessive salt use: If you're refilling the salt tank too often, your system may have a leak or efficiency problem.",
      ],
    },
    {
      heading: "Seattle Water Softener Installation",
      paragraphs: [
        "Installing a water softener is one of the best ways to protect your home's plumbing. Benefits of Installing a Water Softener:",
      ],
      list: [
        "Extends appliance lifespan: Prevents scale buildup in dishwashers, washing machines, and water heaters.",
        "Improves water pressure: Reduces mineral clogs in your plumbing lines.",
        "Healthier skin and hair: Soft water helps retain moisture and reduces irritation.",
        "Cleaner dishes and laundry: No more soap spots or stiff fabrics.",
      ],
    },
    {
      heading: "Seattle Water Softener Maintenance",
      paragraphs: ["Our Maintenance Services Include:"],
      list: [
        "Checking and refilling salt levels",
        "Cleaning and sanitizing the brine tank",
        "Inspecting resin beads and valves",
        "Testing water hardness and system performance",
        "Ensuring proper regeneration cycles",
      ],
    },
    {
      heading: "Why Choose All Phase Plumbing for Water Softeners in Seattle?",
      paragraphs: ["Here's what sets us apart:"],
      list: [
        "Licensed and insured local plumbers",
        "Honest, upfront pricing with no hidden fees",
        "Expert diagnostics and quality parts",
        "Fast, clean, and efficient service",
        "100% satisfaction guaranteed",
      ],
    },
    {
      heading: "Call for Seattle Water Softener Services",
      paragraphs: [
        "Don't let hard water cause long-term damage to your plumbing or appliances. Whether you need water softener repair, installation, or maintenance, the team at All Phase Plumbing is ready to help.",
        "Call Us: (206) 772-6077 today or schedule your service online to enjoy cleaner, softer water throughout your Seattle home.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I know if I have hard water?",
      a: "Signs include white mineral deposits on faucets and showerheads, soap scum on tubs and sinks, stiff or faded laundry, spots on dishes, and dry or itchy skin after bathing. A water hardness test can confirm the level.",
    },
    {
      q: "How does a water softener work?",
      a: "Water softeners use an ion-exchange process to replace hard minerals (calcium and magnesium) with sodium or potassium ions. The result is 'soft' water that's gentler on your pipes, appliances, and skin.",
    },
    {
      q: "How often does a water softener need maintenance?",
      a: "We recommend annual maintenance including checking salt levels, cleaning the brine tank, and inspecting the resin bed. Regular upkeep ensures optimal performance and water quality.",
    },
    {
      q: "Can a water softener damage my pipes?",
      a: "No, in fact, softened water reduces mineral buildup inside pipes, which can extend their lifespan. Properly installed and maintained water softeners are safe for all standard plumbing.",
    },
    {
      q: "How long does a water softener last?",
      a: "A quality water softener typically lasts 10-15 years with proper maintenance. Regular servicing helps maximize lifespan and efficiency.",
    },
  ],
  related: [
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Water Lines", href: "/services/water-lines" },
    { label: "Water Heaters", href: "/services/water-heaters" },
    { label: "Pipe Repair", href: "/services/pipe-repair" },
  ],
};

export const Route = createFileRoute("/services/water-softeners")({
  head: () => ({
    meta: [
      { title: "Seattle Water Softener Services | All Phase Plumbing" },
      {
        name: "description",
        content:
          "Professional water softener installation, repair, and maintenance in Seattle. Protect your plumbing and enjoy cleaner water. Call (206) 772-6077.",
      },
      { property: "og:title", content: "Seattle Water Softeners | All Phase Plumbing" },
      {
        property: "og:description",
        content: "Expert water softener services throughout Greater Seattle.",
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

