import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";

const CONTENT: ServicePageContent = {
  title: "Sewer Replacement",
  breadcrumbLabel: "Sewer Replacement",
  parentBreadcrumb: { label: "Sewer", href: "/services/sewer-services" },
  heroImage: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?w=1600&q=80",
  introHeading: "Seattle Trenchless Sewer Repair",
  introBlocks: [
    {
      paragraphs: [
        "When your sewer line starts backing up, leaking, or showing signs of age, Seattle trenchless sewer repair from All Phase Plumbing offers a faster, cleaner, and more efficient solution. Trenchless technology lets us replace or repair damaged sewer lines without the need for extensive digging — preserving your yard, driveway, and landscaping.",
        "If your sewer line is cracked, corroded, or frequently clogging, our experts can assess your system and provide a non-invasive trenchless replacement that restores flow and reliability without turning your property into a construction zone.",
        "Call (206) 772-6077 or book online to schedule your Seattle plumbing service today!",
      ],
    },
    {
      heading: "What Is Trenchless Sewer Repair?",
      paragraphs: [
        "Trenchless sewer repair is a modern method that uses advanced equipment to replace or restore underground pipes with minimal excavation. Rather than digging long trenches, our plumbers access the sewer line through small entry points, installing a new, durable liner or replacement pipe directly within the existing path.",
        "This method provides a permanent fix for many types of sewer damage, including cracks, corrosion, and tree root intrusion — offering the same durability as full excavation but with far less mess and disruption.",
      ],
    },
    {
      heading: "The Benefits of Trenchless Sewer Replacement in Seattle",
      paragraphs: [
        "Choosing trenchless sewer replacement in Seattle offers multiple advantages for homeowners.",
      ],
      list: [
        "Minimal Excavation: Avoid tearing up lawns, gardens, and driveways.",
        "Faster Completion: Most jobs can be finished within one to two days.",
        "Cost-Effective: Reduced restoration costs for landscaping and hardscapes.",
        "Durable Materials: New pipes are resistant to corrosion, cracks, and tree roots.",
        "Eco-Friendly: Less soil disruption and reduced waste compared to traditional digging.",
      ],
    },
    {
      paragraphs: [
        "At All Phase Plumbing, we use top-grade trenchless equipment and proven techniques to ensure your new sewer line lasts for decades.",
      ],
    },
    {
      heading: "Seattle Sewer Replacement",
      paragraphs: [
        "Sometimes, Seattle sewer replacement is the best or only option — especially when pipes are too damaged for trenchless repair. Our licensed plumbers handle every aspect of full sewer replacement, from initial inspection to final restoration.",
        "We specialize in both traditional dig-and-replace methods and trenchless technology, allowing us to choose the most efficient and cost-effective approach based on your property's condition.",
      ],
    },
    {
      heading: "Common reasons for full sewer replacement include:",
      list: [
        "Collapsed or crushed sewer lines",
        "Severe corrosion or deterioration",
        "Repeated blockages or backups",
        "Extensive tree root invasion",
        "Outdated or misaligned piping",
      ],
      paragraphs: [
        "When repairs are no longer practical, our Seattle sewer replacement experts will guide you through the process — handling permits, excavation, pipe installation, and inspections to ensure a smooth, code-compliant result.",
      ],
    },
    {
      heading: "Ready for Reliable Sewer Replacement in Seattle?",
      paragraphs: [
        "If you're experiencing recurring sewer problems, foul odors, or frequent backups, it may be time to replace your line entirely. All Phase Plumbing is Seattle's trusted choice for both trenchless sewer repair and full sewer replacement.",
        "We combine advanced technology with experienced craftsmanship to ensure your sewer system is repaired or replaced the right way — quickly, cleanly, and built to last.",
        "Call (206) 772-6077 — All Phase Plumbing — today to schedule your Seattle trenchless sewer repair or replacement service and restore your system with expert care.",
      ],
    },
  ],
  faqs: [
    {
      q: "How do I know if I need trenchless sewer repair?",
      a: "If your drains are slow, you smell sewage, or your yard has unexplained wet spots, your sewer line may be damaged. Our camera inspection can determine if trenchless repair is the right solution. Call (206) 772-6077.",
    },
    {
      q: "What's the difference between trenchless repair and trenchless replacement?",
      a: "Trenchless repair (CIPP lining) installs a new liner inside the existing pipe to seal cracks and leaks. Trenchless replacement (pipe bursting) breaks the old pipe and pulls a new one through. Both avoid major digging — we recommend the right option after a camera inspection.",
    },
    {
      q: "How long does trenchless sewer repair last?",
      a: "Modern trenchless materials — HDPE pipe and epoxy liners — are rated to last 50+ years under normal residential use, often longer than the original line they replaced.",
    },
    {
      q: "Is trenchless sewer repair more expensive than traditional methods?",
      a: "The upfront cost can be similar or slightly higher, but trenchless usually saves money overall once you factor in the cost of restoring landscaping, driveways, and hardscape damaged by traditional excavation.",
    },
    {
      q: "Can trenchless repair fix all types of sewer damage?",
      a: "Trenchless works for most cracks, leaks, root intrusion, and corrosion. Fully collapsed or misaligned pipes may still require traditional excavation — we'll confirm during the camera inspection.",
    },
    {
      q: "How long does the repair take?",
      a: "Most trenchless sewer repairs and replacements are completed in 1–2 days, including permitting and final inspection. Traditional dig-and-replace can take a week or more depending on length and depth.",
    },
  ],
  related: [
    { label: "Sewer", href: "/services/sewer-services" },
    { label: "Sewer Repair", href: "/services/sewer-services/sewer-repair" },
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
  ],
};

export const Route = createFileRoute("/services/sewer-services/sewer-replacement")({
  head: () => ({
    meta: [
      { title: "Seattle Sewer Replacement & Trenchless Repair — All Phase Plumbing" },
      {
        name: "description",
        content:
          "Trenchless sewer repair and full sewer replacement in Seattle from All Phase Plumbing — minimal digging, faster completion, decades of durability.",
      },
      { property: "og:title", content: "Sewer Replacement — All Phase Plumbing" },
      {
        property: "og:description",
        content: "Trenchless and traditional sewer replacement across Greater Seattle.",
      },
    ],
  }),
  component: () => (
    <PageShell>
      <ServicePageTemplate content={CONTENT} />
      <WhyUs />

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
            What Our Customers Say About All Phase Plumbing
          </h2>
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-extrabold text-white tracking-widest uppercase rounded shadow-md hover:opacity-90 transition-all duration-200 border-4 border-[#1E3A6E]"
            style={{
              background: "linear-gradient(135deg, #F5C842 0%, #d4a82e 100%)",
            }}
          >
            Read More
          </Link>
        </div>
      </section>
    </PageShell>
  ),
});
