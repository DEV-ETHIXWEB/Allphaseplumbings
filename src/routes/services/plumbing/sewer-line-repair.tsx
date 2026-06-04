import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";

const CONTENT: ServicePageContent = {
  title: "Sewer Line Repair",
  breadcrumbLabel: "Sewer Line Repair",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?w=1600&q=80",
  introHeading: "Sewer Line Repair",
  introBlocks: [
    {
      paragraphs: [
        "Sewer line problems can cause serious damage if they're not handled quickly. Unlike small plumbing issues, sewer line damage often affects multiple drains and can lead to backups, foul odors, and water damage throughout the property.",
        "Many homeowners first notice slow drains, recurring clogs, or sewage smells before realizing the sewer line itself is damaged. By the time sewage backs up into sinks, tubs, or floor drains, the issue usually requires immediate professional repair.",
        "Our sewer line repair services focus on identifying the damaged section, repairing it correctly, and restoring proper wastewater flow. We don't rely on temporary fixes. The goal is a reliable repair that protects your plumbing system and prevents future sewer problems.",
        "Call (206) 772-6077 or book your sewer line repair service online today.",
      ],
    },
    {
      heading: "Professional Sewer Line Repair Services",
      paragraphs: [
        "Sewer lines carry wastewater away from your home. When something goes wrong, the effects are hard to ignore and can create unsafe conditions. Common signs you may need sewer line repair include:",
      ],
      list: [
        "Multiple drains backing up at once",
        "Slow drainage throughout the home",
        "Gurgling sounds from toilets or drains",
        "Sewage odors inside or outside",
        "Frequent drain clogs that keep returning",
        "Wet areas near sewer cleanouts",
      ],
    },
    {
      paragraphs: [
        "Our licensed plumbers inspect the sewer line, identify the cause of the problem, and recommend the right repair method based on pipe condition and damage severity.",
      ],
    },
    {
      heading: "Sewer Line Damage Causes",
      paragraphs: [
        "Sewer lines can fail for several reasons, even in well-maintained homes. Understanding the cause helps prevent repeat issues. Common causes of sewer line damage include:",
      ],
      list: [
        "Aging or deteriorated pipes",
        "Tree root intrusion",
        "Shifting soil or ground movement",
        "Cracked or collapsed pipes",
        "Grease and debris buildup",
        "Poor original installation",
      ],
    },
    {
      heading: "Broken Sewer Line Repair",
      paragraphs: [
        "A broken sewer line can cause wastewater to leak into surrounding soil or back up into the home. These issues often require prompt attention to avoid property damage and health risks. Our broken sewer line repair service includes:",
      ],
      list: [
        "Locating the damaged section",
        "Assessing pipe integrity",
        "Repairing or replacing the affected area",
        "Restoring proper flow",
      ],
    },
    {
      heading: "Sewer Line Leak Repair",
      paragraphs: [
        "Leaks in sewer lines are not always obvious. In some cases, wastewater leaks into the ground before any backup occurs. Signs of a sewer line leak may include:",
      ],
      list: [
        "Persistent sewage odors",
        "Soft or soggy areas in the yard",
        "Mold growth with no visible water source",
        "Cracks in foundations or walkways",
      ],
    },
    {
      heading: "Collapsed Sewer Line Repair",
      paragraphs: [
        "A collapsed sewer line is one of the most serious sewer issues. Collapses can block wastewater flow completely and lead to repeated backups. Our repair process focuses on:",
      ],
      list: [
        "Confirming the collapse location",
        "Removing damaged pipe sections",
        "Replacing with durable materials",
        "Restoring safe sewer function",
      ],
    },
    {
      heading: "Minimizing Disruption During Sewer Line Repair",
      paragraphs: [
        "One of the biggest concerns with sewer line repair is property disruption. Our approach focuses on accuracy and efficiency. Before repairs begin, we:",
      ],
      list: [
        "Locate the exact problem area",
        "Plan targeted access",
        "Avoid unnecessary excavation when possible",
      ],
    },
    {
      heading: "When to Schedule Sewer Line Repair",
      paragraphs: ["You should schedule sewer line repair if:"],
      list: [
        "Multiple drains clog at the same time",
        "Sewage backs up into fixtures",
        "You smell sewage indoors or outdoors",
        "Drain cleaning doesn't solve the problem",
        "Sewer issues keep returning",
      ],
    },
    {
      heading: "Schedule Your Sewer Line Repair Service Today",
      paragraphs: [
        "If you're dealing with sewer backups, slow drains, or sewage odors, professional sewer line repair can restore your plumbing system safely and effectively. Our experienced plumbers provide reliable sewer line repair services with clear communication and upfront pricing. From minor damage to major sewer failures, we're ready to help.",
        "Call (206) 772-6077 or book online today to schedule your sewer line repair service.",
      ],
    },
  ],
  faqs: [
    { q: "How do I know my sewer line is the actual problem?", a: "If multiple fixtures back up at the same time, the issue is almost certainly the main sewer line, not an individual drain. A camera inspection confirms it." },
    { q: "Do you offer trenchless sewer repair?", a: "Yes. For damaged but not fully collapsed lines, trenchless lining or pipe bursting saves your landscaping. We recommend the right method after camera inspection." },
    { q: "How fast can you respond to a sewer backup?", a: "Backups are an emergency, we dispatch same day across the Seattle area. Call (206) 772-6077 and we'll get a plumber out as quickly as possible." },
    { q: "Will you need to dig up my yard?", a: "Not always. Trenchless repair uses small access points. Even for traditional excavation, we plan targeted access to minimize landscape disruption." },
    { q: "Does insurance cover sewer line repair?", a: "Standard policies usually don't cover sewer line repair, but many insurers offer service-line endorsements that do. Worth checking your policy." },
  ],
  related: [
    { label: "Sewer Services", href: "/services/sewer-services" },
    { label: "Sewer Repair", href: "/services/sewer-services/sewer-repair" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Plumbing", href: "/services/plumbing" },
  ],
};

export const Route = createFileRoute("/services/plumbing/sewer-line-repair")({
  head: () => ({
    meta: [
      { title: "Seattle Sewer Line Repair, All Phase Plumbing" },
      { name: "description", content: "Seattle sewer line repair, broken, leaking, and collapsed sewer line solutions. Camera inspection and trenchless options available." },
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
