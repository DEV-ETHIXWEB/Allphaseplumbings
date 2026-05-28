import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";
import { CustomerQuote } from "@/components/sections/CustomerQuote";

const CONTENT: ServicePageContent = {
  title: "Gas Line Repair",
  breadcrumbLabel: "Gas Line Repair",
  heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
  introHeading: "Professional Gas Line Repair Services",
  introBlocks: [
    {
      paragraphs: [
        "Gas lines play a critical role in powering appliances like stoves, water heaters, furnaces, and fireplaces. When a gas line becomes damaged, corroded, or loose, it can create serious safety risks. Even small gas leaks should never be ignored, as they can lead to fire hazards, health concerns, and appliance failure.",
        "If you smell gas, hear hissing near gas lines, or notice appliances not working correctly, immediate gas line repair is essential.",
      ],
    },
    {
      heading: "Professional Gas Line Repair Services",
      paragraphs: [
        "Gas line systems must remain sealed and stable at all times. Our gas line repair services include:",
      ],
      list: [
        "Locating gas leaks",
        "Repairing damaged or corroded pipes",
        "Replacing faulty fittings or connectors",
        "Restoring safe gas pressure",
        "Testing the system after repairs",
      ],
    },
    {
      heading: "Signs You Need Gas Line Repair",
      paragraphs: [
        "Common signs include:",
      ],
      list: [
        "Smell of gas or sulfur-like odor",
        "Hissing or whistling sounds near gas lines",
        "Appliances failing to ignite or stay lit",
        "Yellow or orange burner flames",
        "Sudden increase in gas bills",
        "Dizziness or headaches indoors",
      ],
    },
    {
      heading: "Gas Leak Detection and Repair",
      paragraphs: [
        "Gas leaks can occur at joints, fittings, valves, or damaged pipe sections. Gas leak repair involves:",
      ],
      list: [
        "Shutting off gas supply safely",
        "Locating the exact source of the leak",
        "Repairing or replacing affected sections",
        "Pressure testing the system",
        "Confirming safe operation",
      ],
    },
    {
      heading: "Gas Line Repair for Appliances",
      paragraphs: [
        "We provide gas line repair for:",
      ],
      list: [
        "Gas stoves and ovens",
        "Water heaters",
        "Furnaces and boilers",
        "Dryers",
        "Fireplaces",
      ],
    },
    {
      heading: "Why Professional Gas Line Repair Matters",
      paragraphs: [
        "Professional gas line repair provides:",
      ],
      list: [
        "Accurate diagnosis",
        "Safe repair methods",
        "Code-compliant work",
        "Reduced risk of fire or explosion",
        "Peace of mind",
      ],
    },
    {
      heading: "Our Gas Line Repair Process",
      paragraphs: [
        "Our process includes:",
      ],
      list: [
        "Shutting off gas supply safely",
        "Inspecting gas lines and connections",
        "Identifying the source of the issue",
        "Explaining repair options",
        "Completing approved repairs",
        "Pressure testing and safety checks",
      ],
    },
    {
      heading: "Preventing Future Gas Line Problems",
      paragraphs: [
        "Helpful steps include:",
      ],
      list: [
        "Scheduling routine inspections",
        "Avoiding impact or movement near gas lines",
        "Monitoring appliances for performance changes",
        "Addressing minor issues early",
      ],
    },
    {
      heading: "Schedule Gas Line Repair Today",
      paragraphs: [
        "Gas line issues should never be ignored. Prompt professional gas line repair restores safe operation and prevents serious hazards. Whether the issue is a small leak or a damaged pipe, proper repair protects your home and appliances. If you suspect a gas line problem, act quickly.",
      ],
    },
  ],
  faqs: [
    {
      q: "What should I do if I smell gas?",
      a: "Leave your home immediately, avoid using any electrical switches or open flames, and call your gas company from outside. Once safe, contact All Phase Plumbing at (206) 772-6077 for emergency gas line repair.",
    },
    {
      q: "How do I know if I have a gas leak?",
      a: "A sulfur or rotten egg smell is the most common sign. You may also hear hissing near gas lines, notice dead plants near buried lines, see bubbling in water near your home, or experience symptoms like dizziness or nausea indoors.",
    },
    {
      q: "Can I repair a gas line myself?",
      a: "No. Gas line repairs must be performed by licensed professionals. DIY repairs can lead to leaks, fires, or explosions. Always call a licensed plumber like All Phase Plumbing for any gas line work.",
    },
    {
      q: "How long does gas line repair take?",
      a: "Simple repairs can take 1-3 hours. More complex work involving multiple sections or pressure testing may take longer. We'll give you an accurate estimate before starting any work.",
    },
    {
      q: "Is gas line repair covered by homeowners insurance?",
      a: "Coverage varies by policy. Most policies cover sudden and accidental damage but may not cover issues from age or corrosion. Check with your insurer and we can provide documentation to support your claim.",
    },
  ],
  related: [
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Hot Water System Repair", href: "/services/hot-water-system-repair" },
    { label: "Pipe Repair", href: "/services/pipe-repair" },
    { label: "Emergency Plumber", href: "/services/emergency-plumber" },
  ],
};

export const Route = createFileRoute("/services/gas-line-repair")({
  head: () => ({
    meta: [
      { title: "Professional Gas Line Repair Services | All Phase Plumbing" },
      {
        name: "description",
        content:
          "Expert gas line repair and leak detection. Licensed, code-compliant work with safety-first procedures. Call (206) 772-6077.",
      },
      { property: "og:title", content: "Gas Line Repair | All Phase Plumbing" },
      {
        property: "og:description",
        content: "Professional gas line repair — safe, code-compliant, and reliable.",
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
