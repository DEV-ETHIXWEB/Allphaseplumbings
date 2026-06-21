import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";

const CONTENT: ServicePageContent = {
  title: "Clogged Drain Repair",
  breadcrumbLabel: "Clogged Drain Repair",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1600&q=80",
  introHeading: "Clogged Drain Repair",
  introBlocks: [
    {
      paragraphs: [
        "A clogged drain can quickly turn into a major problem. Slow drainage, standing water, bad smells, or repeated backups are signs that something deeper is going on inside your pipes. While small clogs may seem harmless at first, untreated drain blockages can cause leaks, pipe damage, and costly water issues.",
        "Professional clogged drain repair focuses on fixing the root cause of the blockage, not just pushing it further down the line. Proper repair restores normal flow and helps prevent future clogs from returning.",
        "If water is backing up or draining slower than usual, it's time to schedule clogged drain repair. Call (206) 772-6077 or book your Clogged Drain Repair service online today.",
      ],
    },
    {
      heading: "Professional Clogged Drain Repair Services",
      paragraphs: [
        "Drain clogs form for many reasons. Grease, soap residue, food waste, hair, mineral buildup, and foreign objects can all restrict water flow over time. In some cases, damaged pipes or sewer line issues are involved. Our clogged drain repair services include:",
      ],
      list: [
        "Locating the cause of the blockage",
        "Removing stubborn clogs safely",
        "Repairing damaged drain lines",
        "Restoring proper drainage",
        "Preventing repeat blockages",
      ],
    },
    {
      paragraphs: ["Each repair is tailored to the type of drain and severity of the clog."],
    },
    {
      heading: "Signs You Need Clogged Drain Repair",
      paragraphs: [
        "Drain problems usually show warning signs before becoming emergencies. Ignoring these signs often leads to more serious damage. Common symptoms include:",
      ],
      list: [
        "Slow-draining sinks, tubs, or showers",
        "Water backing up into fixtures",
        "Gurgling noises from drains or toilets",
        "Foul odors coming from pipes",
        "Frequent clogs that keep returning",
        "Overflowing floor drains",
      ],
    },
    {
      heading: "Kitchen Drain Clog Repair",
      paragraphs: [
        "Kitchen drains commonly clog due to grease, food scraps, and soap residue. Over time, buildup coats the inside of pipes and restricts flow. Kitchen drain repair may involve:",
      ],
      list: [
        "Removing grease buildup",
        "Clearing food blockages",
        "Repairing damaged drain sections",
        "Improving water flow",
      ],
    },
    {
      heading: "Bathroom Drain Clog Repair",
      paragraphs: [
        "Bathroom drains often clog from hair, soap, toothpaste, and hygiene products. These materials can form dense blockages that plungers can't remove. Bathroom drain repair services address:",
      ],
      list: [
        "Shower and tub drain clogs",
        "Sink drain blockages",
        "Slow-draining fixtures",
        "Pipe damage caused by buildup",
      ],
    },
    {
      heading: "Toilet Drain Clog Repair",
      paragraphs: [
        "Toilet clogs may occur when too much paper, wipes, or foreign objects enter the drain. Repeated toilet clogs can indicate a deeper issue in the drain or sewer line. Toilet drain repair includes:",
      ],
      list: [
        "Removing stubborn blockages",
        "Inspecting drain lines",
        "Repairing damaged pipes",
        "Restoring proper flushing",
      ],
    },
    {
      heading: "Why Professional Clogged Drain Repair Matters",
      paragraphs: [
        "Improper drain repair can worsen blockages or damage pipes. Chemical cleaners may corrode plumbing and push debris deeper. Benefits of professional repair include:",
      ],
      list: [
        "Accurate diagnosis",
        "Safe removal of blockages",
        "Protection against pipe damage",
        "Long-term drainage performance",
        "Reduced risk of leaks or backups",
      ],
    },
    {
      heading: "Our Clogged Drain Repair Process",
      paragraphs: [
        "Every repair begins with a thorough evaluation of the drain system. Our process includes:",
      ],
      list: [
        "Drain inspection",
        "Identifying the clog source",
        "Explaining repair options",
        "Completing approved repairs",
        "Testing drainage and flow",
      ],
    },
    {
      heading: "Schedule Clogged Drain Repair Today",
      paragraphs: [
        "A clogged drain doesn't fix itself. Delaying repair can lead to leaks, pipe damage, and water backups. Professional clogged drain repair restores proper drainage and keeps your plumbing system working the way it should.",
        "If you're dealing with slow drains or repeated blockages, now is the time to act. Call (206) 772-6077 or book online today to schedule clogged drain repair.",
      ],
    },
  ],
  faqs: [
    {
      q: "Should I try chemical drain cleaner first?",
      a: "We recommend against it. Store-bought chemicals can damage pipes (especially older metal lines) and rarely clear the full clog. They also make professional clearing more hazardous.",
    },
    {
      q: "What's the difference between snaking and hydro jetting?",
      a: "Snaking punches through a clog. Hydro jetting cleans the entire pipe interior. For recurring clogs or grease-heavy lines, jetting is the better long-term fix.",
    },
    {
      q: "Why does the same drain keep clogging?",
      a: "Repeated clogs usually mean buildup in the pipe wall, a partial collapse, or a problem in the main sewer line. We camera-inspect to find the real cause instead of just clearing it again.",
    },
    {
      q: "Can you tell if my clog is local or in the main line?",
      a: "Yes, by checking which fixtures are affected and running a camera if needed. Multiple drains backing up usually points to the main sewer line.",
    },
    {
      q: "How fast can you respond to a backed-up drain?",
      a: "Same day across Seattle for most calls. For sewer backups, we treat it as an emergency and dispatch as quickly as possible.",
    },
  ],
  related: [
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Hydro Jetting", href: "/services/plumbing/hydro-jetting" },
    { label: "Sewer Services", href: "/services/sewer-services" },
    { label: "Plumbing", href: "/services/plumbing" },
  ],
};

export const Route = createFileRoute("/services/plumbing/clogged-drain-repair")({
  head: () => ({
    meta: [
      { title: "Clogged Drain Repair Seattle, All Phase Plumbing" },
      {
        name: "description",
        content:
          "Seattle clogged drain repair, kitchen, bathroom, toilet, and recurring drain issues solved at the root cause.",
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

