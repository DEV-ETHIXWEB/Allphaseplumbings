import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { ServicePageTemplate, type ServicePageContent } from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";

const CONTENT: ServicePageContent = {
  title: "Sump Pumps",
  breadcrumbLabel: "Sump Pumps",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1607400201515-c2c41c08d307?w=1600&q=80",
  introHeading: "Sump Pump Repair, Replacement & Installation",
  introBlocks: [
    {
      paragraphs: [
        "In Seattle, your sump pump is one of the few things standing between heavy winter rain and a flooded basement. When it fails, you usually find out the hard way. All Phase Plumbing installs, repairs, and replaces sump pumps to keep your basement and crawl space dry year-round.",
        "Whether your existing pump is humming but not pumping, cycling constantly, or it's simply time for an upgrade, our licensed plumbers will get you a system you can rely on.",
        "Call (206) 772-6077 to schedule sump pump service.",
      ],
    },
    {
      heading: "Sump Pump Repair",
      paragraphs: ["Common sump pump problems we fix:"],
      list: [
        "Pump runs constantly or short-cycles",
        "Pump hums but doesn't pump water",
        "Float switch stuck or damaged",
        "Discharge line frozen or blocked",
        "Power or wiring issues",
        "Loud grinding or rattling noises",
      ],
    },
    {
      heading: "Sump Pump Replacement",
      paragraphs: [
        "Most sump pumps last 7–10 years. If yours is older, struggling, or failed during a recent storm, replacement is usually more cost-effective than chasing repairs. We'll size the new pump to your basin and discharge run, and offer battery-backup options so a power outage doesn't equal a flooded basement.",
      ],
    },
    {
      heading: "Sump Pump Installation",
      paragraphs: ["New installations include:"],
      list: [
        "Basin and pit installation if needed",
        "Primary submersible or pedestal pump",
        "Optional battery-backup secondary pump",
        "Check valve and discharge plumbing",
        "Outdoor termination away from the foundation",
      ],
    },
    {
      heading: "Schedule Sump Pump Service",
      paragraphs: [
        "Don't wait for the next big storm to find out your pump can't keep up. Call (206) 772-6077 for a sump pump check, repair, or new install.",
      ],
    },
  ],
  faqs: [
    { q: "How often should I test my sump pump?", a: "Twice a year — pour a bucket of water into the pit and confirm the float lifts and the pump kicks on. We can include this as part of an annual maintenance visit." },
    { q: "Do I need a battery backup?", a: "In Seattle, yes — power outages often happen during the exact storms when the pump is needed most. A backup pump runs on its own battery and keeps pumping when the main is dead." },
    { q: "My pump runs constantly — is that bad?", a: "It can burn out the motor early and usually means the float is stuck, the check valve has failed, or groundwater is finding a new path in. We diagnose and fix the underlying issue." },
    { q: "Where does the discharge water go?", a: "It needs to terminate at least 10 feet from the foundation, ideally to a yard drain or storm system per code. We handle the routing as part of installation." },
    { q: "Can you install a sump pump where there isn't one?", a: "Yes — we cut and install a basin if your basement or crawl space has a recurring water problem. We'll evaluate the best location during a site visit." },
  ],
  related: [
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Leak Detection", href: "/services/plumbing/leak-detection" },
    { label: "Pipe Replacement", href: "/services/plumbing/pipe-replacement" },
    { label: "Sewer Services", href: "/services/sewer-services" },
  ],
};

export const Route = createFileRoute("/services/plumbing/sump-pumps")({
  head: () => ({
    meta: [
      { title: "Sump Pump Repair, Replacement & Installation Seattle — All Phase Plumbing" },
      { name: "description", content: "Seattle sump pump service — repair, replacement, and new installs with battery-backup options to keep your basement dry." },
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
