import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";

const CONTENT: ServicePageContent = {
  title: "Repiping",
  breadcrumbLabel: "Repiping",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1607400201515-c2c41c08d307?w=1600&q=80",
  introHeading: "Seattle Whole-Home Repiping",
  introBlocks: [
    {
      paragraphs: [
        "If you live in an older Seattle home, your water lines may be on borrowed time. Galvanized steel and old copper pipes corrode from the inside out, slowing water pressure, rusting the water you drink, and eventually springing leaks in random spots throughout the house.",
        "Whole-home repiping replaces all of your water supply lines with modern PEX or copper, giving you reliable pressure, clean water, and decades of peace of mind. Our licensed plumbers plan the route carefully to minimize wall openings and complete most jobs in 2–5 days.",
        "Call (206) 772-6077 to schedule a repipe estimate.",
      ],
    },
    {
      heading: "Signs You Need a Repipe",
      list: [
        "Rust-colored or metallic-tasting water",
        "Leaks appearing in multiple spots within a year",
        "Pressure drops when more than one fixture runs",
        "Visible corrosion on exposed pipes",
        "Home is 50+ years old with original galvanized steel",
      ],
    },
    {
      heading: "Materials We Use",
      paragraphs: [
        "We use PEX for most water supply repipes, it's flexible, freeze-tolerant, and rated for 50+ years. Where local code or your spec calls for copper, we install Type L copper with soldered or press-fit joints.",
      ],
    },
    {
      heading: "What to Expect",
      list: [
        "On-site walkthrough and written estimate",
        "Phased work so you have water at the end of each day when possible",
        "Targeted wall openings, not exploratory demolition",
        "Permit pulled and inspection coordinated",
        "Clean patching of opened walls",
      ],
    },
    {
      heading: "Schedule a Repipe Estimate",
      paragraphs: [
        "Tired of patching the same pipes over and over? Call (206) 772-6077 and we'll walk through your home, explain your options, and put a flat-rate quote in writing.",
      ],
    },
  ],
  faqs: [
    {
      q: "How long does a whole-home repipe take?",
      a: "Most single-family homes take 2–5 days. We work in phases so water service is restored each evening whenever possible.",
    },
    {
      q: "Do I have to move out?",
      a: "No. There will be short periods without water during the day, but most homeowners stay home through the work.",
    },
    {
      q: "Will you have to cut into every wall?",
      a: "We plan the route to minimize openings and pull pipe through existing chases where we can. Some access is unavoidable; we patch cleanly when finished.",
    },
    {
      q: "PEX vs. copper, which is better?",
      a: "Both are excellent. PEX is more flexible, freeze-tolerant, and quieter; copper has a longer track record. We'll recommend based on your home and budget.",
    },
    {
      q: "Is repiping covered by insurance?",
      a: "Generally no, but the water damage from a sudden pipe failure usually is. A planned repipe avoids those emergencies.",
    },
  ],
  related: [
    { label: "Pipe Replacement", href: "/services/plumbing/pipe-replacement" },
    { label: "Pipe Repair", href: "/services/plumbing/pipe-repair" },
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Leak Detection", href: "/services/plumbing/leak-detection" },
  ],
};

export const Route = createFileRoute("/services/plumbing/repiping")({
  head: () => ({
    meta: [
      { title: "Seattle Whole-Home Repiping, All Phase Plumbing" },
      {
        name: "description",
        content:
          "Whole-home repiping in Seattle, PEX and copper. Replace failing galvanized or old copper water lines for decades of clean, reliable plumbing.",
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

