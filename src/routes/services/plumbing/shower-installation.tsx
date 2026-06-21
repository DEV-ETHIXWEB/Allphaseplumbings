import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";

const CONTENT: ServicePageContent = {
  title: "Shower Installation",
  breadcrumbLabel: "Shower Installation",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1600&q=80",
  introHeading: "Seattle Shower Installation",
  introBlocks: [
    {
      paragraphs: [
        "Whether you're upgrading an old fiberglass shower to a tiled walk-in, converting a tub to a shower, or building one from scratch in a remodel, proper plumbing is what makes the difference between years of trouble-free use and a slow leak destroying your subfloor.",
        "All Phase Plumbing handles the plumbing side of new shower installations across Seattle, drain, water supply, valve, shower head, and waterproofing inspection, coordinated with your tile or shower-pan contractor.",
        "Call (206) 772-6077 to schedule a shower installation consultation.",
      ],
    },
    {
      heading: "Our Shower Installation Services",
      list: [
        "New shower plumbing rough-in",
        "Tub-to-shower conversions",
        "Shower valve and trim replacement",
        "Shower drain installation and replacement",
        "Rain head and body spray plumbing",
        "Walk-in and ADA shower installations",
      ],
    },
    {
      heading: "Tub-to-Shower Conversions",
      paragraphs: [
        "Removing an unused tub and replacing it with a walk-in shower opens up floor space, improves accessibility, and modernizes the bathroom. We handle the demolition, drain reconfiguration, and new plumbing rough-in, then coordinate with your tile installer.",
      ],
    },
    {
      heading: "Shower Valve Replacement",
      paragraphs: [
        "Old shower valves are a leading cause of temperature scalding and hidden leaks. We replace failing valves with modern thermostatic or pressure-balanced models that keep temperature steady when other fixtures run.",
      ],
    },
    {
      heading: "Schedule Shower Installation",
      paragraphs: [
        "Planning a new shower or bathroom remodel? Call (206) 772-6077 and we'll walk through the plumbing scope, recommend the right valves and fixtures, and quote the work upfront.",
      ],
    },
  ],
  faqs: [
    {
      q: "Can you convert my tub to a walk-in shower?",
      a: "Yes, we handle the plumbing side of tub-to-shower conversions including drain relocation and supply line adjustments. We coordinate with your tile or shower-pan installer.",
    },
    {
      q: "What's the difference between pressure-balanced and thermostatic valves?",
      a: "Pressure-balanced valves keep temperature steady when pressure changes. Thermostatic valves let you preset an exact temperature. Thermostatic is more comfortable; pressure-balanced is more common in modern homes.",
    },
    {
      q: "Do you install rain heads and body sprays?",
      a: "Yes. They require larger supply lines and sometimes a higher-flow valve, we'll spec the right setup so all heads work at full pressure simultaneously.",
    },
    {
      q: "How long does shower installation take?",
      a: "Plumbing rough-in is typically 1–2 days. Total project time depends on tile and finish work, usually 4–10 days for a full shower build.",
    },
    {
      q: "Will the bathroom be unusable during installation?",
      a: "Usually for several days while plumbing, waterproofing, and tile cure. We coordinate timing to minimize disruption.",
    },
  ],
  related: [
    { label: "Bathtub Installation", href: "/services/plumbing/bathtub-installation" },
    { label: "Faucet Installation", href: "/services/plumbing/faucet-installation" },
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
  ],
};

export const Route = createFileRoute("/services/plumbing/shower-installation")({
  head: () => ({
    meta: [
      { title: "Seattle Shower Installation, All Phase Plumbing" },
      {
        name: "description",
        content:
          "Seattle shower installation, new builds, tub-to-shower conversions, valve replacement, ADA walk-ins. Licensed plumbers, code-compliant work.",
      },
    ],
  }),
  component: () => (
    <PageShell>
      <ServicePageTemplate content={CONTENT} />
      <HowItWorks />
      <WhyChooseUs />
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
            What Our Customers Say About All Phase Plumbing
          </h2>
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-extrabold text-white tracking-widest uppercase shadow-md hover:opacity-90 transition-all duration-200 border-4 border-[#1E3A6E]"
            style={{ background: "linear-gradient(135deg, #F5C842 0%, #d4a82e 100%)" }}
          >
            Read More
          </Link>
        </div>
      </section>
    </PageShell>
  ),
});

