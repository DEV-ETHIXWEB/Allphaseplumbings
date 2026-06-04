import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";

const CONTENT: ServicePageContent = {
  title: "Leak Detection",
  breadcrumbLabel: "Leak Detection",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1600&q=80",
  introHeading: "Leak Detection",
  introBlocks: [
    {
      paragraphs: [
        "Leaks don't always show up as dripping pipes or puddles on the floor. Many leaks stay hidden behind walls, under floors, or beneath concrete for weeks or even months. During that time, water keeps running, damage keeps spreading, and utility bills keep climbing.",
        "Most customers reach out after noticing a higher water bill, damp drywall, or the sound of running water when nothing is turned on. In many cases, the leak has already caused more damage than expected.",
        "Our professional leak detection services are designed to locate the source of water or gas leaks quickly and accurately, without unnecessary damage to your home. We focus on finding the exact problem, explaining what's happening, and helping you stop the leak before it turns into a major repair.",
        "Call (206) 772-6077 or book your leak detection service online today.",
      ],
    },
    {
      heading: "Professional Leak Detection Services",
      paragraphs: [
        "Hidden leaks require more than guesswork. Cutting into walls or floors without knowing where the problem is can create extra damage and higher repair costs. Professional leak detection allows us to locate leaks precisely before repairs begin.",
        "Common signs you may need leak detection include:",
      ],
      list: [
        "Sudden increase in water bills",
        "Water stains on walls or ceilings",
        "Damp or warm spots on floors",
        "Mold or mildew odors",
        "Low water pressure",
        "Sound of running water when fixtures are turned off",
      ],
    },
    {
      paragraphs: [
        "Our licensed plumbers use specialized leak detection equipment to find leaks in walls, ceilings, floors, crawl spaces, and underground lines. This approach helps reduce disruption and allows repairs to be targeted and efficient.",
      ],
    },
    {
      heading: "Slab Leak Detection",
      paragraphs: [
        "Slab leaks occur when pipes beneath a concrete foundation crack, corrode, or shift over time. Because these pipes are hidden under concrete, slab leaks often go unnoticed until damage becomes visible. Signs of a slab leak include:",
      ],
      list: [
        "Warm areas on floors",
        "Cracks in flooring or foundation",
        "Constant sound of water movement",
        "Low water pressure throughout the home",
        "Mold growth with no visible source",
      ],
    },
    {
      paragraphs: [
        "Ignoring a slab leak can lead to foundation damage, flooring issues, and high water costs. Our slab leak detection service uses non-invasive methods to pinpoint the exact location of the leak before any concrete is removed. This allows repairs to be planned accurately and helps avoid unnecessary digging or demolition.",
      ],
    },
    {
      heading: "Water Line Leak Detection",
      paragraphs: [
        "Water line leaks can happen inside walls, under floors, or in buried supply lines. Even a small leak can waste a large amount of water over time and weaken surrounding materials. Our water line leak detection service focuses on:",
      ],
      list: [
        "Locating hidden supply line leaks",
        "Identifying pressure loss and weak points",
        "Detecting underground pipe damage",
        "Inspecting fittings, joints, and connections",
      ],
    },
    {
      heading: "Gas Line Leak Detection",
      paragraphs: [
        "Gas leaks are dangerous and should never be ignored. If you smell gas, feel dizzy, or suspect an active gas leak, leave the area immediately and contact emergency services.",
        "For non-emergency concerns or system checks, our gas line leak detection service helps locate leaks and confirm system safety. We perform controlled testing to identify faulty connections, damaged pipes, or pressure issues. Gas line detection helps protect your home and family while providing clear information about necessary repairs.",
      ],
    },
    {
      heading: "Non-Invasive Leak Detection Methods",
      paragraphs: [
        "One of the biggest concerns homeowners have is damage caused during the search for a leak. Our approach focuses on accuracy first. We use professional leak detection tools designed to:",
      ],
      list: [
        "Locate leaks without tearing into walls",
        "Pinpoint underground leaks",
        "Identify pressure changes and moisture buildup",
        "Confirm leak locations before repairs begin",
      ],
    },
    {
      heading: "When to Schedule Leak Detection",
      paragraphs: ["It's a good idea to schedule leak detection if:"],
      list: [
        "Your water bill increases without explanation",
        "You notice damp areas with no visible source",
        "You hear water running when fixtures are off",
        "You suspect a slab or underground leak",
        "You want confirmation before starting repairs",
      ],
    },
    {
      heading: "Schedule Your Leak Detection Service Today",
      paragraphs: [
        "If you suspect a hidden leak, don't wait for the damage to spread. Our experienced plumbers provide fast, accurate, and reliable leak detection services with honest recommendations and upfront pricing. Whether you're dealing with a suspected slab leak, water line issue, or unexplained water loss, our team is ready to help.",
        "Call (206) 772-6077 or book online today to schedule your leak detection service.",
      ],
    },
  ],
  faqs: [
    { q: "How can you find a leak without tearing up my walls?", a: "We use acoustic listening devices, thermal imaging, and pressure testing to pinpoint the exact spot before any cutting. When we do open a wall, it's a precise hole, not exploratory damage." },
    { q: "What's a typical sign of a slab leak?", a: "Warm spots on the floor, the sound of water running with everything off, and a rising water bill without explanation. Foundation cracks or unexplained mold are red flags too." },
    { q: "Will my homeowners insurance cover hidden leak damage?", a: "Many policies cover the water damage but not the leak repair itself. Documenting the exact leak source helps your claim, we provide written findings you can give your adjuster." },
    { q: "How long does leak detection take?", a: "Most residential detections are completed in 1–2 hours. Underground or large-home detections can take longer depending on the system layout." },
    { q: "Do you detect gas leaks too?", a: "Yes, for non-emergency situations. If you smell gas right now, leave the building and call your gas utility's emergency line first." },
  ],
  related: [
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Sewer Services", href: "/services/sewer-services" },
    { label: "Water Heaters", href: "/services/water-heaters" },
  ],
};

export const Route = createFileRoute("/services/plumbing/leak-detection")({
  head: () => ({
    meta: [
      { title: "Seattle Leak Detection, All Phase Plumbing" },
      { name: "description", content: "Non-invasive Seattle leak detection, slab leaks, water lines, gas lines. Find leaks accurately before they cause major damage." },
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
          <Link to="/about" className="inline-flex items-center justify-center px-8 py-3 text-sm font-extrabold text-white tracking-widest uppercase shadow-md hover:opacity-90 transition-all duration-200 border-4 border-[#1E3A6E]" style={{ background: "linear-gradient(135deg, #F5C842 0%, #d4a82e 100%)" }}>
            Read More
          </Link>
        </div>
      </section>
    </PageShell>
  ),
});
