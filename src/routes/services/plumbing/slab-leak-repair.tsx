import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { ServicePageTemplate, type ServicePageContent } from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";

const CONTENT: ServicePageContent = {
  title: "Slab Leak Repair",
  breadcrumbLabel: "Slab Leak Repair",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1600&q=80",
  introHeading: "Seattle Slab Leak Detection & Repair",
  introBlocks: [
    {
      paragraphs: [
        "Slab leaks happen when water pipes running through or under your home's concrete foundation crack, corrode, or shift. Because the leak is hidden under concrete, it often goes undetected until water bills spike, flooring warps, or warm spots show up underfoot. By then, structural damage is usually already underway.",
        "All Phase Plumbing uses non-invasive slab leak detection to pinpoint the exact location of the leak — then offers the right repair approach for your home, from spot repair to full rerouting that avoids the slab entirely.",
        "Call (206) 772-6077 to schedule slab leak detection.",
      ],
    },
    {
      heading: "Signs of a Slab Leak",
      list: [
        "Warm or hot spots on the floor (hot water line leak)",
        "Unexplained spike in your water bill",
        "Sound of running water when nothing is on",
        "Cracks appearing in walls or floor tile",
        "Damp carpet or warped flooring with no visible source",
        "Low water pressure throughout the home",
        "Mold or mildew smell at floor level",
      ],
    },
    {
      heading: "Non-Invasive Slab Leak Detection",
      paragraphs: [
        "Before opening any concrete, we use electronic listening equipment, thermal imaging, and pressure isolation to pinpoint exactly where the leak is. This means surgical access instead of guesswork demolition — a smaller hole, a faster fix, and a cleaner patch.",
      ],
    },
    {
      heading: "Slab Leak Repair Options",
      list: [
        "Spot repair — cut concrete, repair the specific pipe section, patch",
        "Re-routing — abandon the under-slab section and run new pipe through walls or ceiling",
        "Whole-home repipe — when multiple slab failures suggest end-of-life pipes",
      ],
      paragraphs: [
        "We walk you through the tradeoffs honestly. Spot repair is cheapest if the rest of the line is in good shape; rerouting often makes more sense for older homes where another slab leak is likely.",
      ],
    },
    {
      heading: "Why Slab Leaks Get Worse Fast",
      paragraphs: [
        "Water under the slab erodes the soil supporting your foundation, can rot subflooring above, and creates conditions for mold. What costs $1,500 to repair this week can become $15,000 in remediation in six months. If you suspect a slab leak, don't wait.",
      ],
    },
    {
      heading: "Schedule Slab Leak Service",
      paragraphs: [
        "Suspect a slab leak? Call (206) 772-6077 — we'll detect, locate, and repair with the least disruption possible to your floors and foundation.",
      ],
    },
  ],
  faqs: [
    { q: "How do you find a leak under concrete?", a: "Acoustic listening devices, thermal imaging, and pressure isolation testing. We pinpoint the spot before any concrete comes up — so the opening is targeted, not exploratory." },
    { q: "Will my insurance cover slab leak repair?", a: "Coverage varies. Most policies cover the damage caused by the leak but not the leak repair itself. Documentation of the exact failure helps your claim." },
    { q: "Is it better to repair or reroute?", a: "Depends on pipe age and history. Single failure in newer pipe — spot repair. Multiple failures or old galvanized pipe — rerouting or repiping is usually smarter long-term." },
    { q: "How long does slab leak repair take?", a: "Detection: 1–2 hours. Spot repair: same day to next day. Rerouting: 1–3 days depending on scope." },
    { q: "Can I keep using water while you work?", a: "Sometimes — depends which line is leaking. We'll let you know what's affected so you can plan." },
  ],
  related: [
    { label: "Leak Detection", href: "/services/plumbing/leak-detection" },
    { label: "Pipe Repair", href: "/services/plumbing/pipe-repair" },
    { label: "Repiping", href: "/services/plumbing/repiping" },
    { label: "Plumbing", href: "/services/plumbing" },
  ],
};

export const Route = createFileRoute("/services/plumbing/slab-leak-repair")({
  head: () => ({
    meta: [
      { title: "Seattle Slab Leak Detection & Repair — All Phase Plumbing" },
      { name: "description", content: "Seattle slab leak detection and repair — non-invasive location, spot repair or rerouting. Stop hidden water damage before it spreads." },
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
