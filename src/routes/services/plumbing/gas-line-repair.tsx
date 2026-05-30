import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { ServicePageTemplate, type ServicePageContent } from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";

const CONTENT: ServicePageContent = {
  title: "Gas Line Repair",
  breadcrumbLabel: "Gas Line Repair",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1600&q=80",
  introHeading: "Seattle Gas Line Repair & Installation",
  introBlocks: [
    {
      paragraphs: [
        "Natural gas lines power your water heater, furnace, range, dryer, and outdoor BBQ. They're safe when installed and maintained correctly — and dangerous when they're not. All Phase Plumbing's licensed plumbers handle gas line repair, installation, and leak testing across the Seattle area to code.",
        "If you smell gas right now, leave the building, call your gas utility's emergency line first, and then call us at (206) 772-6077 once it's safe.",
      ],
    },
    {
      heading: "Gas Line Services We Provide",
      list: [
        "Gas leak detection and repair",
        "New gas line installation for appliances",
        "Gas line extension for outdoor BBQs and fire pits",
        "Generator gas line installation",
        "Gas shutoff valve replacement",
        "Pressure testing and certification",
      ],
    },
    {
      heading: "Warning Signs of a Gas Leak",
      list: [
        'Rotten-egg or "sulfur" odor near gas appliances or lines',
        "Hissing sound near a gas line",
        "Dead vegetation in a strip along a buried gas line",
        "Higher-than-normal gas bills with no usage change",
        "Headaches, dizziness, or nausea inside the home",
      ],
      paragraphs: [
        "If you suspect a leak, evacuate, don't use any electrical switches, and call your gas utility's emergency line immediately.",
      ],
    },
    {
      heading: "New Appliance Gas Connections",
      paragraphs: [
        "Adding a gas range, dryer, or tankless water heater? We size and install the gas branch line, install a properly rated shutoff, pressure-test, and coordinate any required permits and inspections.",
      ],
    },
    {
      heading: "Schedule Gas Line Service",
      paragraphs: [
        "For non-emergency gas line repair, new installations, or appliance hookups, call (206) 772-6077 — licensed plumbers, code-compliant work, and safe gas systems guaranteed.",
      ],
    },
  ],
  faqs: [
    { q: "Are gas lines part of plumbing?", a: "Yes — in Washington, gas piping work is performed under a plumbing license. We're qualified to install, repair, and test natural gas piping." },
    { q: "What should I do if I smell gas?", a: "Leave the building immediately, don't operate any electrical switches, and call your gas utility's emergency line from outside. Once they've made the area safe, call us for the repair." },
    { q: "Do you pull permits for gas work?", a: "Yes — gas line work requires permits and inspection in Seattle and most surrounding jurisdictions. We handle the paperwork." },
    { q: "Can you run a gas line to my outdoor grill?", a: "Yes — we extend gas lines to BBQs, fire pits, patio heaters, and outdoor kitchens. Permits and inspection included." },
    { q: "How do you find a gas leak without taking apart the wall?", a: "Calibrated electronic gas detectors and bubble-soap testing on accessible joints. For hidden leaks we use pressure-drop testing to isolate the section before opening anything." },
  ],
  related: [
    { label: "Leak Detection", href: "/services/plumbing/leak-detection" },
    { label: "Water Heaters", href: "/services/water-heaters" },
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Tankless Water Heaters", href: "/services/plumbing/tankless-water-heaters" },
  ],
};

export const Route = createFileRoute("/services/plumbing/gas-line-repair")({
  head: () => ({
    meta: [
      { title: "Seattle Gas Line Repair & Installation — All Phase Plumbing" },
      { name: "description", content: "Seattle gas line repair, installation, and leak detection by licensed plumbers. Code-compliant, permitted, safe." },
    ],
  }),
  component: () => (
    <PageShell>
      <ServicePageTemplate content={CONTENT} />
      <WhyUs />
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">What Our Customers Say About All Phase Plumbing</h2>
          <Link to="/about" className="inline-flex items-center justify-center px-8 py-3 text-sm font-extrabold text-white tracking-widest uppercase shadow-md hover:opacity-90 transition-all duration-200 border-4 border-[#1E3A6E]" style={{ background: "linear-gradient(135deg, #F5C842 0%, #d4a82e 100%)" }}>Read More</Link>
        </div>
      </section>
    </PageShell>
  ),
});
