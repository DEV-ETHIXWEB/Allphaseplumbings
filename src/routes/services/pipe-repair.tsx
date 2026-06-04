import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";
import { CustomerQuote } from "@/components/sections/CustomerQuote";

const CONTENT: ServicePageContent = {
  title: "Pipe Repair",
  breadcrumbLabel: "Pipe Repair",
  heroImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80",
  introHeading: "Professional Pipe Repair Services",
  introBlocks: [
    {
      paragraphs: [
        "Damaged pipes can cause problems fast, or slowly over time. Some pipe issues show up as sudden leaks or bursts. Others stay hidden behind walls or under floors, quietly causing water damage and rising utility bills.",
        "Many customers contact us after noticing low water pressure, wet spots, strange noises in the walls, or repeated leaks in the same area. In most cases, the pipe has already weakened and needs professional repair to prevent bigger issues.",
        "Our pipe repair services focus on finding the damaged section, fixing it correctly, and restoring your plumbing system so it works the way it should. We don't rely on temporary fixes. The goal is a lasting repair that protects your home and plumbing system.",
      ],
    },
    {
      heading: "Professional Pipe Repair Services",
      paragraphs: [
        "Pipe problems should never be ignored. Even small cracks or corrosion can worsen over time, leading to major water damage or emergency failures. Common signs you may need pipe repair include:",
      ],
      list: [
        "Visible water leaks",
        "Low or inconsistent water pressure",
        "Discolored water",
        "Damp walls, ceilings, or floors",
        "Strange noises from pipes",
        "Frequent plumbing leaks",
      ],
    },
    {
      heading: "Water Pipe Repair",
      paragraphs: [
        "Water pipes can crack, corrode, or loosen due to age, pressure changes, or shifting materials. Our water pipe repair service covers:",
      ],
      list: [
        "Leaking supply lines",
        "Cracked or corroded pipes",
        "Loose pipe connections",
        "Damaged joints and fittings",
      ],
    },
    {
      heading: "Burst Pipe Repair",
      paragraphs: [
        "Burst pipes can release large amounts of water in a short time and cause serious damage. Common causes of burst pipes include:",
      ],
      list: [
        "Aging or weakened pipes",
        "High water pressure",
        "Corrosion",
        "Sudden temperature changes",
      ],
    },
    {
      heading: "Corroded Pipe Repair",
      paragraphs: [
        "Over time, metal pipes can corrode from the inside out. Signs of corroded pipes may include:",
      ],
      list: [
        "Rust-colored or cloudy water",
        "Metallic taste in water",
        "Frequent leaks",
        "Reduced water pressure",
      ],
    },
    {
      heading: "Pipe Joint and Connection Repair",
      paragraphs: [
        "Many leaks start at joints and connections rather than in the pipe itself. Loose fittings, worn seals, or improper installation can cause water to escape over time. We inspect and repair:",
      ],
      list: [
        "Pipe joints",
        "Fittings and couplings",
        "Connection points behind walls or under sinks",
      ],
    },
    {
      heading: "Why Professional Pipe Repair Matters",
      paragraphs: [
        "Delaying pipe repairs can lead to:",
      ],
      list: [
        "Mold growth",
        "Structural damage",
        "Higher water bills",
        "Repeated plumbing failures",
        "Emergency repairs",
      ],
    },
    {
      heading: "When to Schedule Pipe Repair",
      paragraphs: [
        "It's time to schedule pipe repair if:",
      ],
      list: [
        "You notice recurring leaks",
        "Water pressure suddenly drops",
        "Pipes make unusual sounds",
        "Water damage appears without a clear cause",
        "You've had temporary fixes fail",
      ],
    },
    {
      heading: "Schedule Your Pipe Repair Service Today",
      paragraphs: [
        "If you're dealing with leaking, damaged, or aging pipes, don't wait for the problem to get worse. Our experienced plumbers provide reliable pipe repair services with honest recommendations and upfront pricing.",
        "From minor leaks to major pipe damage, we're ready to help restore your plumbing system safely and efficiently.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I know if I need pipe repair?",
      a: "Common signs include visible leaks, low water pressure, discolored water, damp walls or ceilings, unusual noises in pipes, or a spike in your water bill. If you notice any of these, schedule an inspection before the damage worsens.",
    },
    {
      q: "Can pipe leaks be repaired without replacing the whole pipe?",
      a: "Yes, in many cases. If the damage is isolated to a specific section, we can repair just that portion. We'll assess the overall condition of your pipes and recommend the most cost-effective solution.",
    },
    {
      q: "How quickly can a burst pipe be repaired?",
      a: "Burst pipe repairs are treated as emergencies. We respond 24/7 and can typically stop the water and complete the repair within a few hours of arrival.",
    },
    {
      q: "What causes pipes to corrode?",
      a: "Corrosion is caused by the chemical reaction between pipe material and water or soil. Galvanized steel and older copper pipes are especially prone to corrosion over time. Acidic water, high mineral content, and age all accelerate the process.",
    },
    {
      q: "How long do pipe repairs last?",
      a: "A proper pipe repair using quality materials should last many years. We focus on durable repairs, not temporary patches, to minimize the chance of the same problem recurring.",
    },
  ],
  related: [
    { label: "Pipe Replacement", href: "/services/pipe-replacement" },
    { label: "Water Lines", href: "/services/water-lines" },
    { label: "Burst Pipe Repair", href: "/services/burst-pipe-repair" },
    { label: "Plumbing", href: "/services/plumbing" },
  ],
};

export const Route = createFileRoute("/services/pipe-repair")({
  head: () => ({
    meta: [
      { title: "Professional Pipe Repair Services | All Phase Plumbing" },
      {
        name: "description",
        content:
          "Expert pipe repair services for leaks, bursts, corrosion, and joint failures. Licensed plumbers, 24/7 emergency service. Call (206) 772-6077.",
      },
      { property: "og:title", content: "Pipe Repair | All Phase Plumbing" },
      {
        property: "og:description",
        content: "Professional pipe repair services, fast, reliable, and built to last.",
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
