import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";

const CONTENT: ServicePageContent = {
  title: "Water Lines",
  breadcrumbLabel: "Water Lines",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1607400201515-c2c41c08d307?w=1600&q=80",
  introHeading: "Seattle Water Line Repair & Replacement",
  introBlocks: [
    {
      paragraphs: [
        "Your main water line carries every gallon of water into your home, and when it fails, the whole house feels it. A buried main line leak can mean wet spots in the yard, dropping pressure, climbing water bills, or no water at all. All Phase Plumbing diagnoses, repairs, and replaces water service lines across the Seattle area.",
        "We use modern locating and leak-detection equipment so we can pinpoint problems and propose targeted fixes, not exploratory digging.",
        "Call (206) 772-6077 to schedule water line service.",
      ],
    },
    {
      heading: "Signs Your Water Line Needs Service",
      list: [
        "Sudden drop in water pressure throughout the home",
        "Unexpected spike in your water bill",
        "Wet, soft, or sunken patches in the yard",
        "Discolored water from every tap",
        "Sounds of running water with everything off",
        "Visible leak at the meter or shutoff",
      ],
    },
    {
      heading: "Water Line Repair vs. Replacement",
      paragraphs: [
        "Small leaks or single-point damage can often be spot-repaired without replacing the whole line. Older galvanized or polybutylene service lines that have failed in multiple spots usually warrant full replacement for long-term reliability.",
      ],
    },
    {
      heading: "Trenchless Water Line Replacement",
      paragraphs: [
        "Where conditions allow, we replace water service lines using trenchless techniques that preserve driveways, patios, and landscaping. We dig small access pits at each end and pull a new HDPE pipe through, saving you thousands in hardscape restoration.",
      ],
    },
    {
      heading: "Schedule Water Line Service",
      paragraphs: [
        "If you suspect a water line problem, don't wait, small leaks become large losses fast. Call (206) 772-6077 and a licensed plumber will diagnose the issue and walk you through repair options.",
      ],
    },
  ],
  faqs: [
    {
      q: "How long does a water line replacement take?",
      a: "Trenchless replacements are often completed in a single day. Traditional dig-and-replace can take 1–3 days depending on length and depth.",
    },
    {
      q: "Will my water be off the whole time?",
      a: "Service is typically off for several hours while the new line is connected. We coordinate the shutdown window with you in advance.",
    },
    {
      q: "Who's responsible, me or the city?",
      a: "The city owns the line to the meter; everything from the meter to your house is yours. We work on the homeowner side and coordinate with the city when meter or shutoff work is needed.",
    },
    {
      q: "Will you need to tear up my yard?",
      a: "Often not. Trenchless methods need only small access pits. Even traditional excavation is planned to minimize landscape damage.",
    },
    {
      q: "What pipe material do you install?",
      a: "HDPE (high-density polyethylene) for buried mains, flexible, corrosion-proof, and rated for 50+ years.",
    },
  ],
  related: [
    { label: "Pipe Replacement", href: "/services/plumbing/pipe-replacement" },
    { label: "Leak Detection", href: "/services/plumbing/leak-detection" },
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Sewer Services", href: "/services/sewer-services" },
  ],
};

export const Route = createFileRoute("/services/plumbing/water-lines")({
  head: () => ({
    meta: [
      { title: "Seattle Water Line Repair & Replacement, All Phase Plumbing" },
      {
        name: "description",
        content:
          "Seattle water line repair and trenchless replacement. Diagnose pressure loss, leaks, and aging service lines without tearing up your yard.",
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

