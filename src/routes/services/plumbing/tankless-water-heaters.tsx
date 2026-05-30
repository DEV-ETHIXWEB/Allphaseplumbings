import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";

const CONTENT: ServicePageContent = {
  title: "Tankless Water Heaters",
  breadcrumbLabel: "Tankless Water Heaters",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=1600&q=80",
  introHeading: "Seattle Tankless Water Heaters",
  introBlocks: [
    {
      paragraphs: [
        "Seattle tankless water heaters are an energy-efficient and space-saving upgrade to traditional storage tank systems. Many homeowners across Seattle are switching to tankless systems for endless hot water and reduced utility bills.",
        "At All Phase Plumbing, we specialize in tankless water heater repair, replacement, and installation in Seattle. Whether you're upgrading your home or need quick repairs for your existing unit, our experienced plumbers deliver reliable, high-quality solutions. Ready to go tankless? Contact our experts today to get started.",
      ],
    },
    {
      heading: "Why Choose a Tankless Water Heater in Seattle?",
      paragraphs: ["Switching to a tankless water heater is one of the smartest investments you can make for your home. Here's why:"],
      list: [
        "Energy Efficiency — heats water only when needed, cutting energy costs and waste.",
        "Endless Hot Water — never run out, even during long showers or multiple appliance use.",
        "Compact Design — small, wall-mounted units free up space in your utility area.",
        "Longer Lifespan — tankless systems often last 20+ years with proper maintenance.",
        "Reduced Risk of Leaks — without a large tank, the risk of flooding from tank failure is eliminated.",
      ],
      // Trailing paragraph below
    },
    {
      paragraphs: [
        "Whether you're replacing an old tank or upgrading for efficiency, our Seattle plumbers can help you choose the best model for your home and budget.",
      ],
    },
    {
      heading: "Seattle Tankless Water Heater Replacement",
      paragraphs: [
        "When it's time to upgrade, our Seattle tankless water heater replacement service ensures a safe, professional installation. Replacing your unit requires careful planning to match your home's water demand, gas or electric setup, and venting needs. At All Phase Plumbing, we handle every step:",
      ],
      list: [
        "Safe removal of your old system",
        "Expert installation of your new tankless water heater",
        "Testing and calibration for peak performance",
        "Cleanup and disposal of old components",
      ],
    },
    {
      paragraphs: [
        "Our licensed plumbers ensure your replacement is completed right the first time — efficiently, safely, and to code.",
      ],
    },
    {
      heading: "Seattle Tankless Water Heater Repair",
      paragraphs: [
        "If your tankless water heater is acting up, our team provides fast, effective tankless water heater repair in Seattle. Common signs your unit may need service include:",
      ],
      list: [
        "Inconsistent water temperature",
        "No hot water at all",
        "Unusual noises (clicking, rumbling, or buzzing)",
        "Water leaks from the unit",
        "Error codes on the display panel",
      ],
    },
    {
      paragraphs: [
        "Our plumbers will diagnose the issue, explain your repair options clearly, and use high-quality parts to restore your system's efficiency and reliability. Don't wait for small issues to turn into costly breakdowns — schedule your repair today.",
      ],
    },
    {
      heading: "Tankless Water Heater Repair Process in Seattle",
      paragraphs: ["Our Seattle tankless water heater repair process ensures precise diagnostics and long-lasting results. Here's what to expect:"],
      list: [
        "Inspection — we evaluate heating elements, sensors, water lines, and controls.",
        "Diagnosis — we identify the root cause of performance issues or error codes.",
        "Repair — we perform quick, professional repairs using trusted components.",
        "Testing — we verify that your system delivers consistent, efficient hot water.",
        "Maintenance Tips — we offer advice to extend your unit's lifespan and prevent future problems.",
      ],
    },
    {
      heading: "Seattle Tankless Water Heaters: Upgrade to Efficiency",
      paragraphs: [
        "Searching for Seattle tankless water heaters near me? All Phase Plumbing offers comprehensive services — from repair to installation. Our skilled technicians are ready to provide expert care that keeps your system running smoothly.",
        "Call (206) 772-6077 today or schedule online for professional tankless water heater service in Seattle and experience the comfort of endless, energy-efficient hot water.",
      ],
    },
  ],
  faqs: [
    { q: "Will a tankless system give my whole house hot water at once?", a: "Sized correctly, yes. We calculate your peak demand (showers, dishwasher, washing machine running together) and pick a unit with the right flow rate, or recommend two units in parallel for larger homes." },
    { q: "Do I need a new gas line for a tankless heater?", a: "Often yes — gas tankless units require a larger BTU input than a tank unit, which usually means upsizing the gas line. We handle this as part of the installation." },
    { q: "How much can I save going tankless?", a: "Most homes see 20–35% lower water-heating bills compared to a tank. Savings depend on usage and fuel type — we'll give you realistic numbers for your home." },
    { q: "What maintenance does a tankless heater need?", a: "An annual descale flush, especially in areas with harder water. Skipping this is the #1 cause of premature failure and error codes." },
    { q: "How long does installation take?", a: "Replacing a tank with a tankless unit usually takes a full day because of gas, venting, and water-line upgrades. A like-for-like tankless swap is faster — usually 4–6 hours." },
  ],
  related: [
    { label: "Water Heaters", href: "/services/water-heaters" },
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Sewer Services", href: "/services/sewer-services" },
  ],
};

export const Route = createFileRoute("/services/plumbing/tankless-water-heaters")({
  head: () => ({
    meta: [
      { title: "Seattle Tankless Water Heaters — All Phase Plumbing" },
      { name: "description", content: "Seattle tankless water heater installation, replacement, and repair. Endless hot water, energy savings, expert installation." },
    ],
  }),
  component: () => (
    <PageShell>
      <ServicePageTemplate content={CONTENT} />
      <WhyUs />
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
            What Our Customers Say About All Phase Plumbing
          </h2>
          <Link to="/about" className="inline-flex items-center justify-center px-8 py-3 text-sm font-extrabold text-white tracking-widest uppercase shadow-md hover:opacity-90 transition-all duration-200 border-4 border-[#1E3A6E]" style={{ background: "linear-gradient(135deg, #F5C842 0%, #d4a82e 100%)" }}>
            Read More
          </Link>
        </div>
      </section>
    </PageShell>
  ),
});
