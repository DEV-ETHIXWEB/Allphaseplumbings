import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";

const CONTENT: ServicePageContent = {
  title: "Backflow Testing",
  breadcrumbLabel: "Backflow Testing",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1600&q=80",
  introHeading: "Seattle Backflow Testing & Certification",
  introBlocks: [
    {
      paragraphs: [
        "Backflow prevention devices keep contaminated water from flowing backwards into the public drinking-water supply. In Seattle and most cities in King and Pierce counties, these devices must be tested annually by a certified tester and the results submitted to the water purveyor.",
        "All Phase Plumbing's certified backflow assembly testers (BATs) perform annual testing, send the report to your water utility, and repair or replace failed assemblies.",
        "Call (206) 772-6077 to schedule annual backflow testing.",
      ],
    },
    {
      heading: "Who Needs Backflow Testing?",
      paragraphs: ["Most properties with any of the following require annual backflow testing:"],
      list: [
        "Irrigation systems with in-ground sprinklers",
        "Fire sprinkler systems",
        "Boilers connected to potable water",
        "Commercial kitchens and dishwashers",
        "Multi-family or commercial buildings with dedicated water service",
        "Pools, spas, or auxiliary water sources",
      ],
    },
    {
      heading: "Our Backflow Services",
      list: [
        "Annual backflow assembly testing (RPZ, DCVA, PVB)",
        "Certified test results submitted directly to your water utility",
        "Repair of failed assemblies",
        "New backflow assembly installation",
        "Replacement of expired or non-compliant devices",
      ],
    },
    {
      heading: "What Happens During a Test",
      paragraphs: [
        "Testing takes 20–40 minutes per assembly. We isolate the device, run a series of pressure differential tests with calibrated gauges, document the results, and submit the certification to your water utility. If the device fails, we'll review repair vs. replacement options on the spot.",
      ],
    },
    {
      heading: "Schedule Backflow Testing",
      paragraphs: [
        "Backflow tests are due annually and missing the deadline can result in water-service shutoff. Call (206) 772-6077 and we'll get you tested and certified.",
      ],
    },
  ],
  faqs: [
    {
      q: "How often do I need backflow testing?",
      a: "Once a year for most assemblies. Some cities require more frequent testing for high-risk facilities, we'll confirm based on your specific property.",
    },
    {
      q: "What happens if my device fails?",
      a: "Failed assemblies must be repaired or replaced before re-testing. We can usually rebuild or replace on the same visit.",
    },
    {
      q: "Do you submit the report for me?",
      a: "Yes, we file the certification directly with your water utility so you don't have to chase paperwork.",
    },
    {
      q: "How much does testing cost?",
      a: "Testing is a flat per-assembly fee. We'll confirm the price before the visit; no hidden charges.",
    },
    {
      q: "I got a notice from the city, what do I do?",
      a: "Call us right away. We can usually schedule within a few days and get you compliant before the deadline.",
    },
  ],
  related: [
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Commercial", href: "/commercial" },
    { label: "Leak Detection", href: "/services/plumbing/leak-detection" },
    { label: "Water Lines", href: "/services/plumbing/water-lines" },
  ],
};

export const Route = createFileRoute("/services/plumbing/backflow-testing")({
  head: () => ({
    meta: [
      { title: "Seattle Backflow Testing & Certification, All Phase Plumbing" },
      {
        name: "description",
        content:
          "Annual backflow testing in Seattle by certified BATs. Results filed directly with your water utility. Repair and replacement available.",
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

