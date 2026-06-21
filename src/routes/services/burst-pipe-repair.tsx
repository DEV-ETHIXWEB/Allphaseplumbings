import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";
import { CustomerQuote } from "@/components/sections/CustomerQuote";

const CONTENT: ServicePageContent = {
  title: "Burst Pipe Repair",
  breadcrumbLabel: "Burst Pipe Repair",
  heroImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1600&q=80",
  introHeading: "Professional Burst Pipe Repair Services",
  introBlocks: [
    {
      paragraphs: [
        "A burst pipe is one of the most stressful plumbing problems a homeowner can face. Water can spread quickly, damage walls and floors, and disrupt your entire day. In many cases, burst pipes happen without warning, leaving little time to react.",
        "Our burst pipe repair services focus on stopping the water quickly, repairing the damaged pipe correctly, and restoring your plumbing system safely. We don't rely on temporary fixes.",
      ],
    },
    {
      heading: "Professional Burst Pipe Repair Services",
      paragraphs: ["Common signs of a burst pipe include:"],
      list: [
        "Sudden water flooding",
        "Water leaking from walls or ceilings",
        "Complete or partial loss of water pressure",
        "Unusual noises in pipes",
        "Visible pipe damage",
      ],
    },
    {
      heading: "Emergency Burst Pipe Repair",
      paragraphs: ["Our emergency burst pipe repair service includes:"],
      list: [
        "Locating the burst section",
        "Stopping water flow safely",
        "Repairing or replacing the damaged pipe",
        "Inspecting nearby pipes for weakness",
      ],
    },
    {
      heading: "Causes of Burst Pipes",
      paragraphs: ["Common causes include:"],
      list: [
        "Aging or weakened pipes",
        "Corrosion inside the pipe",
        "High water pressure",
        "Poor pipe installation",
        "Cracked or stressed joints",
      ],
    },
    {
      heading: "Burst Pipe Repair for Walls, Ceilings, and Floors",
      paragraphs: [
        "Many burst pipes occur behind walls, above ceilings, or under floors. Our process focuses on:",
      ],
      list: [
        "Locating hidden burst pipes",
        "Minimizing wall or ceiling removal",
        "Repairing the damaged section accurately",
        "Confirming the repair before restoration",
      ],
    },
    {
      heading: "Water Damage Prevention After a Burst Pipe",
      paragraphs: ["After burst pipe repair, we help by:"],
      list: [
        "Checking for lingering leaks",
        "Confirming proper water pressure",
        "Identifying areas at risk for mold",
        "Recommending next steps if water damage is present",
      ],
    },
    {
      heading: "Why Professional Burst Pipe Repair Matters",
      paragraphs: ["Professional burst pipe repair helps:"],
      list: [
        "Restore water service safely",
        "Prevent repeat failures",
        "Protect walls, floors, and foundations",
        "Reduce long-term plumbing costs",
      ],
    },
    {
      heading: "When to Call for Burst Pipe Repair",
      paragraphs: ["You should call for burst pipe repair if:"],
      list: [
        "Water is actively leaking or flooding",
        "Water pressure suddenly drops",
        "Pipes make loud banging or cracking sounds",
        "Walls or ceilings become wet quickly",
        "A pipe visibly splits or breaks",
      ],
    },
    {
      heading: "Schedule Your Burst Pipe Repair Service Today",
      paragraphs: [
        "A burst pipe can't wait. Our experienced plumbers provide fast, reliable burst pipe repair services with clear communication and upfront pricing. Whether the pipe burst suddenly or failed over time, we're ready to help.",
      ],
    },
  ],
  faqs: [
    {
      q: "What causes pipes to burst?",
      a: "Pipes burst due to aging and corrosion, high water pressure, freezing temperatures causing expansion, poor installation, or physical damage. Even newer pipes can fail if water pressure is too high or installation was improper.",
    },
    {
      q: "How do I stop a burst pipe?",
      a: "Immediately shut off your main water supply valve to stop water flow. Then call All Phase Plumbing at (206) 772-6077 for emergency repair. Don't attempt to patch the pipe yourself, temporary fixes can fail under pressure.",
    },
    {
      q: "How much water damage can a burst pipe cause?",
      a: "A burst pipe can release hundreds of gallons in minutes, damaging flooring, drywall, insulation, and electrical systems. The faster you shut off the water and call for help, the less damage occurs.",
    },
    {
      q: "Do you offer 24/7 burst pipe repair?",
      a: "Yes. Burst pipes are emergencies and we're available 24/7 throughout Greater Seattle. Call (206) 772-6077 anytime.",
    },
    {
      q: "Will my insurance cover burst pipe damage?",
      a: "Most homeowners insurance policies cover sudden and accidental burst pipe damage. Document the damage with photos and contact your insurer promptly. We can provide documentation to support your claim.",
    },
  ],
  related: [
    { label: "Emergency Plumber", href: "/services/emergency-plumber" },
    { label: "Pipe Repair", href: "/services/pipe-repair" },
    { label: "Water Lines", href: "/services/water-lines" },
    { label: "Plumbing", href: "/services/plumbing" },
  ],
};

export const Route = createFileRoute("/services/burst-pipe-repair")({
  head: () => ({
    meta: [
      { title: "Professional Burst Pipe Repair Services | All Phase Plumbing" },
      {
        name: "description",
        content:
          "Fast burst pipe repair available 24/7. Stop flooding, protect your home. Licensed plumbers throughout Greater Seattle. Call (206) 772-6077.",
      },
      { property: "og:title", content: "Burst Pipe Repair | All Phase Plumbing" },
      {
        property: "og:description",
        content: "Emergency burst pipe repair, fast response, reliable fix, upfront pricing.",
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

