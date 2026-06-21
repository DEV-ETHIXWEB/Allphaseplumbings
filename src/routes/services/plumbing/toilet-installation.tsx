import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";

const CONTENT: ServicePageContent = {
  title: "Toilet Installation",
  breadcrumbLabel: "Toilet Installation",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=1600&q=80",
  introHeading: "Seattle Toilet Installation",
  introBlocks: [
    {
      paragraphs: [
        "A properly installed toilet should last 20+ years without leaking, rocking, or wasting water. Cutting corners on installation, bad wax ring, loose flange, no shutoff replacement, usually shows up as a leaking base or a soft floor a year later.",
        "All Phase Plumbing installs toilets across Seattle the right way: new wax ring, new supply line, flange checked and rebuilt if needed, level set, and leak-tested before we leave.",
        "Call (206) 772-6077 to schedule toilet installation.",
      ],
    },
    {
      heading: "Models We Install",
      list: [
        "Standard floor-mounted gravity toilets",
        "High-efficiency dual-flush models",
        "Wall-hung tankless toilets",
        "Smart and bidet-integrated toilets",
        "ADA comfort-height toilets",
      ],
    },
    {
      heading: "Installation Process",
      list: [
        "Remove existing toilet and old wax ring",
        "Inspect and repair flange if needed",
        "Replace angle stop shutoff if it's old or sticky",
        "Set toilet with new wax ring and bolts",
        "Connect new braided supply line",
        "Level, caulk base, and test full flush cycle",
      ],
    },
    {
      heading: "New Installation vs. Replacement",
      paragraphs: [
        "Replacing an existing toilet is straightforward in most cases. Brand-new installations, for example, adding a half-bath where there wasn't one, require new drain, vent, and supply lines plus permits. We handle both.",
      ],
    },
    {
      heading: "Schedule Toilet Installation",
      paragraphs: [
        "Whether you bought a new toilet or want us to recommend one, call (206) 772-6077 and we'll handle the install with leak-tested, code-compliant work.",
      ],
    },
  ],
  faqs: [
    {
      q: "Can you install a toilet I bought myself?",
      a: "Yes, happens often. We confirm rough-in dimensions are compatible before starting.",
    },
    {
      q: "Do I need a new wax ring?",
      a: "Always on a fresh install. Reusing an old wax ring is one of the most common causes of base leaks.",
    },
    {
      q: "Should you replace the shutoff valve too?",
      a: "If the existing valve is sticky, leaking, or old, yes, it's much cheaper to do it while the toilet is off than as a separate call later.",
    },
    {
      q: "How long does installation take?",
      a: "Most standard replacements take 60–90 minutes. Wall-hung or smart toilets can take 2–3 hours.",
    },
    {
      q: "Will you haul away the old toilet?",
      a: "Yes, old toilet disposal is included with installation.",
    },
  ],
  related: [
    { label: "Toilets", href: "/services/plumbing/toilets" },
    { label: "Faucet Installation", href: "/services/plumbing/faucet-installation" },
    { label: "Bathtub Installation", href: "/services/plumbing/bathtub-installation" },
    { label: "Plumbing", href: "/services/plumbing" },
  ],
};

export const Route = createFileRoute("/services/plumbing/toilet-installation")({
  head: () => ({
    meta: [
      { title: "Seattle Toilet Installation, All Phase Plumbing" },
      {
        name: "description",
        content:
          "Seattle toilet installation, standard, dual-flush, wall-hung, smart, and ADA models. Leak-tested, code-compliant installation.",
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

