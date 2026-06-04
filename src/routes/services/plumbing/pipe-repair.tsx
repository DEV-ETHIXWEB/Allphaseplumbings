import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { ServicePageTemplate, type ServicePageContent } from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";

const CONTENT: ServicePageContent = {
  title: "Pipe Repair",
  breadcrumbLabel: "Pipe Repair",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1607400201515-c2c41c08d307?w=1600&q=80",
  introHeading: "Seattle Pipe Repair",
  introBlocks: [
    {
      paragraphs: [
        "From slow drips behind walls to pinhole leaks under sinks, pipe damage rarely fixes itself. The longer it sits, the more it costs, in water bills, drywall, flooring, and mold remediation. All Phase Plumbing provides fast, code-compliant pipe repair across the Seattle area for residential and small commercial properties.",
        "We diagnose the actual problem, explain your options, and complete the repair right the first time. No guesswork, no upselling.",
        "Call (206) 772-6077 to schedule pipe repair.",
      ],
    },
    {
      heading: "Common Pipe Problems We Repair",
      list: [
        "Pinhole leaks in copper or galvanized pipe",
        "Cracked or split PEX connections",
        "Loose or leaking joints and fittings",
        "Corroded supply line damage",
        "Frozen pipes that have failed",
        "Leaks behind walls, ceilings, or under floors",
      ],
    },
    {
      heading: "Targeted Pipe Repair",
      paragraphs: [
        "For single-point damage, a targeted repair is the most cost-effective fix. We isolate the damaged section, replace it with new pipe and fittings, and pressure-test the line before closing up.",
      ],
    },
    {
      heading: "When Repair Isn't Enough",
      paragraphs: [
        "If we find widespread corrosion, repeated failures in nearby sections, or pipe material at end of life, we'll tell you straight, patching the same pipe over and over costs more than a planned replacement. See our pipe replacement and repiping services for those options.",
      ],
    },
    {
      heading: "Schedule Pipe Repair",
      paragraphs: [
        "Got a leak? Don't wait for it to spread. Call (206) 772-6077 and a licensed plumber will diagnose and repair the problem with upfront pricing.",
      ],
    },
  ],
  faqs: [
    { q: "How do you find a leak inside a wall?", a: "We use acoustic listening tools, thermal imaging, and pressure testing to pinpoint the spot before cutting. The opening is precise, not exploratory damage." },
    { q: "Will my water bill drop after repair?", a: "If the leak was active, yes, sometimes dramatically. We can compare meter readings before and after to confirm the fix." },
    { q: "Do you handle hot water pipe repairs differently?", a: "Same materials and joints, but extra care to support the repaired section because hot water pipe expansion stresses joints over time." },
    { q: "Can you repair galvanized pipe?", a: "Sometimes, short sections can be transitioned to PEX or copper. If the surrounding galvanized is heavily corroded, partial replacement is usually a better investment." },
    { q: "How long does a typical pipe repair take?", a: "Most single-point repairs are 1–2 hours including testing. Repairs requiring drywall opening or harder-to-access pipes can take 3–4 hours." },
  ],
  related: [
    { label: "Pipe Replacement", href: "/services/plumbing/pipe-replacement" },
    { label: "Repiping", href: "/services/plumbing/repiping" },
    { label: "Leak Detection", href: "/services/plumbing/leak-detection" },
    { label: "Plumbing", href: "/services/plumbing" },
  ],
};

export const Route = createFileRoute("/services/plumbing/pipe-repair")({
  head: () => ({
    meta: [
      { title: "Seattle Pipe Repair, All Phase Plumbing" },
      { name: "description", content: "Pinhole leaks, joint failures, hidden pipe damage, fast, code-compliant Seattle pipe repair from licensed plumbers." },
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
