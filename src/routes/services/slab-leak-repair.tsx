import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";
import { CustomerQuote } from "@/components/sections/CustomerQuote";

const CONTENT: ServicePageContent = {
  title: "Slab Leak Repair",
  breadcrumbLabel: "Slab Leak Repair",
  heroImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80",
  introHeading: "Professional Slab Leak Repair Services",
  introBlocks: [
    {
      paragraphs: [
        "Slab leaks happen when water pipes running beneath a concrete foundation develop leaks. Because these pipes are hidden, slab leaks often go unnoticed until they cause serious damage. Rising water bills, warm spots on floors, or cracks in flooring are common signs that something is wrong below the surface.",
        "Slab leak repair focuses on locating and fixing leaks under concrete slabs before they lead to structural damage, mold growth, or ongoing water loss.",
      ],
    },
    {
      heading: "Professional Slab Leak Repair",
      paragraphs: [
        "Professional slab leak repair includes:",
      ],
      list: [
        "Locating the exact leak source",
        "Assessing pipe condition",
        "Selecting the least disruptive repair method",
        "Restoring plumbing performance",
      ],
    },
    {
      heading: "Signs You May Have a Slab Leak",
      paragraphs: [
        "Common slab leak signs include:",
      ],
      list: [
        "Sudden increase in water bills",
        "Warm or damp spots on floors",
        "Cracks in tile or flooring",
        "Low water pressure",
        "Sound of running water when fixtures are off",
        "Mold or mildew smells",
      ],
    },
    {
      heading: "Water Line Slab Leak Repair",
      paragraphs: [
        "Water line slab leak repair helps:",
      ],
      list: [
        "Stop pressurized water leaks",
        "Restore normal water pressure",
        "Prevent foundation erosion",
      ],
    },
    {
      heading: "Drain Line Slab Leak Repair",
      paragraphs: [
        "Drain line slab leak repair addresses:",
      ],
      list: [
        "Cracked or collapsed pipes",
        "Separated pipe joints",
        "Long-term drainage issues",
      ],
    },
    {
      heading: "Slab Leak Repair for Foundation Protection",
      paragraphs: [
        "Slab leak repair helps:",
      ],
      list: [
        "Prevent soil erosion",
        "Reduce foundation stress",
        "Protect flooring materials",
      ],
    },
    {
      heading: "What Happens During Slab Leak Repair",
      paragraphs: [
        "Slab leak repair typically follows these steps:",
      ],
      list: [
        "Confirm leak presence",
        "Locate leak under the slab",
        "Evaluate pipe condition",
        "Perform targeted repair or reroute",
        "Test plumbing system",
      ],
    },
    {
      heading: "Slab Leak Repair for Older Plumbing Systems",
      paragraphs: [
        "Older plumbing materials are more prone to failure under concrete. Repairing slab leaks in older systems helps:",
      ],
      list: [
        "Prevent repeat leaks",
        "Extend plumbing lifespan",
        "Improve reliability",
      ],
    },
    {
      heading: "Schedule Slab Leak Repair Service",
      paragraphs: [
        "If you notice signs of moisture under floors, rising water bills, or unexplained pressure loss, slab leak repair helps protect your plumbing system and foundation. Addressing slab leaks early prevents extensive damage and restores reliable water service.",
      ],
    },
  ],
  faqs: [
    {
      q: "How are slab leaks detected?",
      a: "We use electronic leak detection equipment, pressure testing, and sometimes acoustic listening devices to pinpoint the exact location of a slab leak without unnecessary digging or damage to your floor.",
    },
    {
      q: "Can a slab leak be repaired without breaking the concrete?",
      a: "In some cases, yes. Pipe rerouting, running new pipes through walls or ceilings to bypass the damaged section, can avoid concrete breaking. In other cases, targeted concrete cutting is necessary but we minimize the area affected.",
    },
    {
      q: "How long does slab leak repair take?",
      a: "Most slab leak repairs take 1-3 days depending on the access method and extent of the damage. Rerouting jobs may be faster than those requiring concrete cutting.",
    },
    {
      q: "What causes slab leaks?",
      a: "Common causes include pipe corrosion, shifting soil or foundation movement, poor original installation, abrasion from the concrete, and high water pressure. Copper pipes in older homes are especially prone to pinhole leaks under slabs.",
    },
    {
      q: "Will my homeowner's insurance cover slab leak repair?",
      a: "Many homeowners insurance policies cover the cost of breaking through the slab and making the repair, but not the pipe replacement itself. Coverage varies, we can provide documentation to help with your claim.",
    },
  ],
  related: [
    { label: "Pipe Repair", href: "/services/pipe-repair" },
    { label: "Water Lines", href: "/services/water-lines" },
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Emergency Plumber", href: "/services/emergency-plumber" },
  ],
};

export const Route = createFileRoute("/services/slab-leak-repair")({
  head: () => ({
    meta: [
      { title: "Professional Slab Leak Repair Services | All Phase Plumbing" },
      {
        name: "description",
        content:
          "Expert slab leak detection and repair. Protect your foundation and plumbing system. Licensed plumbers throughout Seattle. Call (206) 772-6077.",
      },
      { property: "og:title", content: "Slab Leak Repair | All Phase Plumbing" },
      {
        property: "og:description",
        content: "Professional slab leak repair, accurate detection, minimal disruption.",
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
