import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";

const CONTENT: ServicePageContent = {
  title: "Sewer Repair",
  breadcrumbLabel: "Sewer Repair",
  parentBreadcrumb: { label: "Sewer", href: "/services/sewer-services" },
  heroImage: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?w=1600&q=80",
  introHeading: "Seattle Sewer Repair",
  introBlocks: [
    {
      paragraphs: [
        "When sewer problems strike, Seattle Sewer Repair from All Phase Plumbing delivers the fast, reliable help you need. Whether it's a clogged line, a collapsed pipe, or tree roots invading your sewer system, our experienced plumbers have the skills and tools to handle it all. We specialize in both traditional excavation sewer repair and advanced trenchless sewer repair methods, so no matter the issue, we can restore your system efficiently and with minimal disruption to your property.",
        "With years of hands-on experience serving Seattle homeowners, we understand how disruptive sewer issues can be. That's why we respond quickly, diagnose the problem accurately, and provide long-term solutions that prevent future issues.",
      ],
    },
    {
      heading: "Sewer Repair in Seattle",
      paragraphs: [
        "Traditional excavation remains one of the most effective methods for Sewer Repair in Seattle, particularly when the damage is extensive or underground access is limited. This process involves carefully excavating the affected section to directly access the damaged pipes.",
        "While excavation can be more invasive than trenchless methods, it provides direct access for precise repair or full pipe replacement, ensuring your system is restored with accuracy and durability.",
        "At All Phase Plumbing, our crew is fully equipped and trained to handle excavation-based sewer repairs safely and efficiently. We work diligently to minimize property disturbance, complete repairs promptly, and restore your yard or landscape as nearly as possible once the job is done.",
      ],
    },
    {
      heading: "Common reasons for excavation sewer repair in Seattle include:",
      list: [
        "Severely collapsed or broken sewer lines",
        "Pipes shifted by soil movement or earthquakes",
        "Severe root intrusion that cannot be cleared",
        "Large-scale corrosion or aging metal piping",
      ],
    },
    {
      heading: "Seattle Trenchless Sewer Repair",
      paragraphs: [
        "Looking for a cleaner, faster, and less invasive solution? Seattle Trenchless Sewer Repair is the answer. Using modern plumbing technology, we can repair or replace damaged sewer lines without tearing up your yard, driveway, or landscaping.",
        "This innovative process involves creating small access points at each end of the sewer line. Specialized equipment then installs a durable pipe liner or replacement pipe inside the existing line, creating a seamless, long-lasting fix.",
      ],
    },
    {
      heading: "Benefits of Trenchless Sewer Repair in Seattle:",
      list: [
        "Minimal digging and surface disruption",
        "Faster completion time than traditional repair",
        "Cost-effective by avoiding yard or driveway restoration",
        "Durable materials that resist future root intrusion and corrosion",
      ],
      paragraphs: [
        "Whether you need pipe bursting, relining, or spot repair, All Phase Plumbing provides professional trenchless sewer repair designed for Seattle's soil and weather conditions.",
      ],
    },
    {
      heading: "Ready for Reliable Seattle Sewer Repair?",
      paragraphs: [
        "Don't let sewer problems disrupt your daily routine. Whether you need a simple repair, trenchless restoration, or full line replacement, All Phase Plumbing is ready to help.",
        "Our expert plumbers are fully licensed, insured, and experienced in handling all types of sewer repair in Seattle. We'll accurately diagnose your issue, explain your options, and deliver a fast, reliable repair that gets your system flowing smoothly again.",
        "Call (206) 772-6077, All Phase Plumbing, today to schedule your Seattle Sewer Repair service and restore your home's comfort and safety.",
      ],
    },
  ],
  faqs: [
    {
      q: "What are common signs I need sewer repair in Seattle?",
      a: "Watch for slow drains, frequent clogs, foul sewer odors, gurgling noises from toilets, or water pooling in your yard. These symptoms often indicate a break or blockage in your sewer line. Call (206) 772-6077.",
    },
    {
      q: "What causes sewer line damage in Seattle homes?",
      a: "Tree root intrusion, shifting soil, aging or corroded pipes, grease buildup, and ground movement from heavy rain are the most common causes. Older Seattle homes with clay or cast-iron lines are particularly vulnerable.",
    },
    {
      q: "What is trenchless sewer repair and how does it work?",
      a: "Trenchless sewer repair uses small access points to insert a new pipe liner or burst and replace the existing line, without digging up your yard. It's faster, cleaner, and usually less expensive when you factor in landscaping restoration.",
    },
    {
      q: "How long does sewer repair take?",
      a: "Most trenchless repairs are completed in 1–2 days. Traditional excavation repairs can take several days to a week depending on depth, length, and access. We'll give you a clear timeline before we start.",
    },
    {
      q: "Is trenchless sewer repair more expensive than traditional methods?",
      a: "The upfront cost can be similar or slightly higher, but trenchless usually ends up more cost-effective once you account for the cost of restoring landscaping, driveways, and hardscape damaged by traditional excavation.",
    },
    {
      q: "Can you repair all types of sewer lines?",
      a: "Yes, we work on clay, cast iron, ABS, PVC, and Orangeburg sewer lines. After a camera inspection, we'll recommend the best repair method for your specific material and the extent of the damage.",
    },
  ],
  related: [
    { label: "Sewer", href: "/services/sewer-services" },
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Water Heaters", href: "/services/water-heaters" },
  ],
};

export const Route = createFileRoute("/services/sewer-services/sewer-repair")({
  head: () => ({
    meta: [
      { title: "Seattle Sewer Repair, All Phase Plumbing" },
      {
        name: "description",
        content:
          "Professional Seattle sewer repair from All Phase Plumbing, traditional excavation and trenchless methods for fast, reliable, long-lasting fixes.",
      },
      { property: "og:title", content: "Sewer Repair, All Phase Plumbing" },
      {
        property: "og:description",
        content: "Trenchless and traditional sewer repair for Seattle homeowners.",
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
