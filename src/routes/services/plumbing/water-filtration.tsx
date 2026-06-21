import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";

const CONTENT: ServicePageContent = {
  title: "Water Filtration System Installation",
  breadcrumbLabel: "Water Filtration",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=1600&q=80",
  introHeading: "Seattle Water Filtration System Installation",
  introBlocks: [
    {
      paragraphs: [
        "Cleaner-tasting water, fewer mineral deposits, and peace of mind about what's coming out of your tap, that's what a properly chosen water filtration system delivers. All Phase Plumbing installs whole-home filters, under-sink filters, and reverse osmosis systems across the Seattle area.",
        "Every home's water is different. We start with a water test, recommend the right filtration approach for your concerns and budget, and handle the install cleanly with proper bypass valves and supply-line work.",
        "Call (206) 772-6077 to schedule a filtration consultation.",
      ],
    },
    {
      heading: "Filtration Systems We Install",
      list: [
        "Whole-home sediment and carbon filters",
        "Under-sink drinking water filters",
        "Reverse osmosis (RO) systems",
        "Combination softener and filter systems",
        "Iron, sulfur, and specialty filters for well water",
        "UV disinfection systems",
      ],
    },
    {
      heading: "How to Choose the Right Filter",
      paragraphs: [
        "There's no single best filter, it depends on what's in your water. Chlorine taste is a different filter than iron staining, which is different from heavy metals. We start with a free water test, then recommend the right approach for what you actually need (and avoid expensive systems for problems you don't have).",
      ],
    },
    {
      heading: "Whole-Home vs. Point-of-Use",
      paragraphs: [
        "Whole-home filters treat all water entering the house, great for chlorine, sediment, and overall taste improvement. Point-of-use systems (under-sink, RO) treat just drinking water, best when you want premium drinking quality without the cost of treating water for showers, laundry, and irrigation.",
      ],
    },
    {
      heading: "Schedule Filter Installation",
      paragraphs: [
        "Ready to upgrade your water? Call (206) 772-6077 and we'll test your water, walk through your options, and install the right system.",
      ],
    },
  ],
  faqs: [
    {
      q: "Do I need a filter on Seattle city water?",
      a: "Seattle tap water is generally high quality, but many homeowners want to remove chlorine taste, lead from old plumbing, or improve drinking water specifically. A simple under-sink filter often does the job affordably.",
    },
    {
      q: "What about well water?",
      a: "Well water usually needs more comprehensive treatment, sediment, iron, hardness, and sometimes bacteria. We test first and design a system that fits the issues found.",
    },
    {
      q: "What's the difference between a filter and a softener?",
      a: "A softener removes hardness (calcium and magnesium) by ion exchange. A filter removes contaminants like sediment, chlorine, or metals. Many homes benefit from both, we can install a combo system.",
    },
    {
      q: "How often do filters need to be changed?",
      a: "Depends on the system and water quality. Whole-home sediment filters: 3–6 months. Carbon filters: 6–12 months. RO membranes: 2–3 years. We can set up a reminder service.",
    },
    {
      q: "Will a filter slow my water pressure?",
      a: "Properly sized filters have minimal pressure impact. Undersized systems or clogged filters cause noticeable drops, sizing it right at install matters.",
    },
  ],
  related: [
    { label: "Water Softeners", href: "/services/plumbing/water-softeners" },
    { label: "Water Lines", href: "/services/plumbing/water-lines" },
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Leak Detection", href: "/services/plumbing/leak-detection" },
  ],
};

export const Route = createFileRoute("/services/plumbing/water-filtration")({
  head: () => ({
    meta: [
      { title: "Seattle Water Filtration System Installation, All Phase Plumbing" },
      {
        name: "description",
        content:
          "Whole-home and under-sink water filtration installation in Seattle. RO, carbon, sediment, and well-water systems matched to your water test.",
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

