import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";

const CONTENT: ServicePageContent = {
  title: "Hydro Jetting",
  breadcrumbLabel: "Hydro Jetting",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1600&q=80",
  introHeading: "Seattle Hydro Jetting",
  introBlocks: [
    {
      paragraphs: [
        "All Phase Plumbing offers professional Seattle Hydro Jetting services to keep your drains and sewer lines clear and flowing smoothly. Using high-pressure water streams, hydro jetting effectively removes stubborn clogs, grease buildup, and mineral deposits that traditional snaking methods often can't handle.",
        "Our team has the expertise and equipment to perform safe, thorough hydro jetting, protecting your pipes while restoring optimal flow. Whether you're dealing with recurring blockages or need preventative maintenance, our hydro jetting service is a reliable solution to keep your plumbing running at its best.",
      ],
    },
    {
      heading: "Signs You Need Hydro Jet Drain Cleaning",
      paragraphs: [
        "Clogged or slow drains are more than just an inconvenience, they can signal deeper problems in your plumbing system. Some common indicators that hydro jet drain cleaning may be necessary include:",
      ],
      list: [
        "Recurring Clogs, drains that back up repeatedly despite snaking or chemical treatments.",
        "Slow Draining Sinks or Tubs, water takes longer than usual to drain, signaling buildup in the pipes.",
        "Foul Odors, persistent sewage smells coming from drains or around plumbing fixtures.",
        "Gurgling or Bubbling Pipes, air trapped in the plumbing can indicate blockages in the main line.",
      ],
      // Trailing paragraph below
    },
    {
      paragraphs: [
        "A professional hydro jet clears away grease, mineral deposits, and other buildup that traditional methods often leave behind. If you're experiencing any of these issues, contact All Phase Plumbing for expert hydro jet drain cleaning and keep your system flowing freely.",
      ],
    },
    {
      heading: "Common Causes of Clogs That Require Hydro Jetting Services",
      paragraphs: [
        "Understanding what causes clogs can help prevent future plumbing issues. Some of the most common causes include:",
      ],
      list: [
        "Grease and Fat Buildup, cooking oils, fats, and food scraps accumulate in pipes.",
        "Mineral Deposits, hard water leaves calcium and lime inside pipes, restricting flow.",
        "Hair and Soap Scum, common in bathroom drains; tough clogs that snaking alone can't remove.",
        "Foreign Objects, wipes, paper products, or small toys can get stuck and cause backups.",
        "Tree Root Intrusion, roots penetrate sewer lines and create blockages that require hydro jetting to remove completely.",
      ],
    },
    {
      heading: "How Hydro Jet Drain Cleaning Works",
      paragraphs: [
        "At All Phase Plumbing, we use advanced technology and proven methods to perform hydro jetting safely and effectively. Here's what you can expect:",
      ],
      list: [
        "Assessment and Appointment, we evaluate your plumbing system and schedule a convenient time.",
        "Inspection, using cameras and diagnostic tools, we locate the clog and assess your pipes.",
        "Hydro Jetting, high-pressure water removes grease, mineral buildup, and debris, cleaning pipes thoroughly.",
        "Verification, after hydro jetting, we re-inspect the line to ensure it's completely clear.",
        "Advice and Prevention, our technicians provide maintenance tips to reduce future clogs.",
      ],
    },
    {
      heading: "Benefits of Hydro Jetting",
      list: [
        "Comprehensive Cleaning, removes grease, roots, and buildup for long-lasting results.",
        "Improved Flow, clears obstructions and restores full water pressure.",
        "Prevents Future Clogs, keeps pipes clean and reduces backups.",
        "Eco-Friendly, uses only water, no harsh chemicals.",
        "Extends Pipe Life, regular hydro jetting minimizes corrosion and wear.",
      ],
      paragraphs: [
        "When you choose All Phase Plumbing, you're investing in a cleaner, safer, and more efficient plumbing system.",
      ],
    },
    {
      heading: "Schedule Your Hydro Jetting in Seattle Today",
      paragraphs: [
        "Don't let stubborn clogs slow down your plumbing. Our experts provide professional hydro jetting in Seattle to clear pipes quickly, thoroughly, and safely. With our skilled team and advanced tools, we'll restore flow and prevent future blockages.",
        "Call (206) 772-6077 now or schedule online to book your Seattle hydro jetting service and experience the All Phase difference.",
      ],
    },
  ],
  faqs: [
    {
      q: "How is hydro jetting different from snaking?",
      a: "Snaking punches a hole through the clog. Hydro jetting cleans the entire inner diameter of the pipe with high-pressure water, removing buildup that grows the clog back. Jetting prevents recurrence.",
    },
    {
      q: "Is hydro jetting safe for my pipes?",
      a: "On healthy modern pipes, yes. We always camera-inspect first to confirm the line can handle the pressure. If pipes are cracked or fragile, we recommend repair before jetting.",
    },
    {
      q: "How often should I get my main line jetted?",
      a: "Homes with frequent grease, tree-root issues, or older clay lines benefit from every 12–18 months. Average homes can go a few years between professional jettings.",
    },
    {
      q: "Will hydro jetting clear tree roots?",
      a: "Yes, we use a root-cutting jetter head specifically for this. For severe root intrusion, we may recommend trenchless sewer repair as a longer-term fix.",
    },
    {
      q: "How long does a hydro jetting service take?",
      a: "Most residential jobs run 1–2 hours including camera inspection. Larger commercial lines can take longer depending on length and severity.",
    },
  ],
  related: [
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Sewer Services", href: "/services/sewer-services" },
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Water Heaters", href: "/services/water-heaters" },
  ],
};

export const Route = createFileRoute("/services/plumbing/hydro-jetting")({
  head: () => ({
    meta: [
      { title: "Seattle Hydro Jetting, All Phase Plumbing" },
      {
        name: "description",
        content:
          "Professional hydro jetting in Seattle. Removes grease, scale, and tree roots from drains and sewer lines.",
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

