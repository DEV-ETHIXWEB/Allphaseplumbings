import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { ServicePageTemplate, type ServicePageContent } from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";

const CONTENT: ServicePageContent = {
  title: "Fixture Replacement",
  breadcrumbLabel: "Fixture Replacement",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=1600&q=80",
  introHeading: "Seattle Plumbing Fixture Replacement",
  introBlocks: [
    {
      paragraphs: [
        "Plumbing fixtures wear out, leak, and go out of style. Replacing them is one of the quickest ways to refresh a kitchen or bathroom — but it has to be done with care to avoid leaks behind walls and damaged supply lines. All Phase Plumbing replaces every fixture in the house, cleanly and code-compliantly.",
        "Whether it's a single faucet, a full bathroom refresh, or a kitchen remodel, we'll handle the demo, replacement, supply-line upgrades, and leak testing.",
        "Call (206) 772-6077 to schedule fixture replacement.",
      ],
    },
    {
      heading: "Fixtures We Replace",
      list: [
        "Kitchen and bathroom faucets",
        "Toilets and bidets",
        "Shower valves, heads, and trim kits",
        "Tub spouts and diverters",
        "Sinks and laundry tubs",
        "Hose bibs and outdoor spigots",
        "Garbage disposals",
        "Angle stop shutoff valves",
      ],
    },
    {
      heading: "Why Replace Worn Fixtures",
      list: [
        "Stop chronic leaks and water waste",
        "Lower water bills with modern WaterSense fixtures",
        "Refresh the look of a kitchen or bath",
        "Eliminate cross-threaded or corroded supply lines",
        "Improve accessibility with lever handles or comfort-height models",
      ],
    },
    {
      heading: "What's Included",
      paragraphs: [
        "Our standard fixture replacement includes the new fixture install, new braided supply lines, new wax ring (toilets), shutoff valve replacement when needed, full leak testing, and cleanup including hauling away the old fixture.",
      ],
    },
    {
      heading: "Schedule Fixture Replacement",
      paragraphs: [
        "Got fixtures already? We install. Need recommendations? We've installed every major brand and can point you to reliable models. Call (206) 772-6077.",
      ],
    },
  ],
  faqs: [
    { q: "Can I supply my own fixtures?", a: "Yes — we install customer-supplied fixtures all the time. We confirm sizing and compatibility before starting." },
    { q: "Do you replace shutoff valves while you're under there?", a: "If they're sticky, leaking, or old, yes — it's much cheaper to do during the same visit." },
    { q: "How long does fixture replacement take?", a: "A single faucet runs ~45–90 minutes. A toilet takes 60–90 minutes. A full bathroom of fixtures usually takes a half day." },
    { q: "Will you haul away my old fixtures?", a: "Yes — disposal is included in standard fixture replacement." },
    { q: "What if I notice a leak after install?", a: "Call us — if we installed it and it's leaking, we fix it. We stand behind our work." },
  ],
  related: [
    { label: "Faucet Installation", href: "/services/plumbing/faucet-installation" },
    { label: "Toilet Installation", href: "/services/plumbing/toilet-installation" },
    { label: "Bathtub Installation", href: "/services/plumbing/bathtub-installation" },
    { label: "Plumbing", href: "/services/plumbing" },
  ],
};

export const Route = createFileRoute("/services/plumbing/fixture-replacement")({
  head: () => ({
    meta: [
      { title: "Seattle Fixture Replacement — All Phase Plumbing" },
      { name: "description", content: "Seattle plumbing fixture replacement — faucets, toilets, valves, shower trim, sinks. Clean installs and leak-tested work." },
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
