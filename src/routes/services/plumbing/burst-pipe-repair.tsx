import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";

const CONTENT: ServicePageContent = {
  title: "Burst Pipe Repair",
  breadcrumbLabel: "Burst Pipe Repair",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1607400201515-c2c41c08d307?w=1600&q=80",
  introHeading: "Emergency Burst Pipe Repair in Seattle",
  introBlocks: [
    {
      paragraphs: [
        "A burst pipe is one of the most damaging plumbing emergencies a home can face. Water can dump into walls, ceilings, and floors at hundreds of gallons per hour. All Phase Plumbing dispatches emergency burst-pipe crews 24/7 across the Seattle area to stop the water, repair the line, and help you minimize damage.",
        "If you have a burst pipe right now, shut off your main water valve and call us at (206) 772-6077, we'll be on the way.",
      ],
    },
    {
      heading: "What to Do Immediately",
      list: [
        "Shut off the main water valve at the meter or where it enters the house",
        "Turn off the water heater if water has reached it",
        "Cut power to affected areas at the breaker if safe to do so",
        "Move belongings out of the wet area",
        "Take photos for your insurance claim",
        "Call (206) 772-6077, 24/7 emergency line",
      ],
    },
    {
      heading: "Common Causes of Burst Pipes",
      list: [
        "Frozen pipes that expand and split",
        "Aging galvanized or corroded copper",
        "Excessive water pressure",
        "Ground movement or settling",
        "Physical damage during construction",
      ],
    },
    {
      heading: "Our Burst Pipe Repair Process",
      paragraphs: [
        "We isolate and shut down the affected section, expose the damaged pipe with the smallest opening practical, replace the damaged section with new pipe and fittings, pressure-test the line, and document everything for your insurance.",
        "If we find the pipe failed because the surrounding plumbing is at end of life, we'll discuss longer-term options like repiping so you're not paying for the same repair twice.",
      ],
    },
    {
      heading: "Preventing Future Bursts",
      list: [
        "Insulate exposed pipes and outdoor lines before winter",
        "Disconnect garden hoses in fall to prevent freeze damage",
        "Install a pressure regulator if your house pressure exceeds 80 PSI",
        "Address small leaks and corrosion early",
      ],
    },
    {
      heading: "Call Now for Burst Pipe Repair",
      paragraphs: [
        "Every minute matters with a burst pipe. Call (206) 772-6077 right now, our 24/7 line answers immediately and a licensed plumber will be dispatched.",
      ],
    },
  ],
  faqs: [
    {
      q: "How fast can you get to my house?",
      a: "Most Seattle-area emergency calls reach you within 60–90 minutes. We'll give you a realistic ETA the moment you call.",
    },
    {
      q: "Will insurance cover the damage?",
      a: "Most homeowner policies cover sudden water damage from burst pipes, though they usually don't cover the pipe itself. We provide written documentation for your claim.",
    },
    {
      q: "Can I just patch it myself?",
      a: "A temporary clamp can slow a small leak in an emergency, but full-pressure water service shouldn't be restored until a licensed plumber properly replaces the section.",
    },
    {
      q: "Why do pipes burst when they freeze?",
      a: "Frozen water expands and creates extreme pressure inside the pipe. The actual rupture is usually somewhere between the freeze and a closed faucet, not where the ice is.",
    },
    {
      q: "Should I shut off the water heater too?",
      a: "Yes, if water has reached it or if you've shut off the main and the heater is now empty. Running it dry can damage the heating elements.",
    },
  ],
  related: [
    { label: "Emergency Plumber", href: "/services/plumbing/emergency-plumber" },
    { label: "Pipe Repair", href: "/services/plumbing/pipe-repair" },
    { label: "Pipe Replacement", href: "/services/plumbing/pipe-replacement" },
    { label: "Leak Detection", href: "/services/plumbing/leak-detection" },
  ],
};

export const Route = createFileRoute("/services/plumbing/burst-pipe-repair")({
  head: () => ({
    meta: [
      { title: "Emergency Burst Pipe Repair Seattle, All Phase Plumbing" },
      {
        name: "description",
        content:
          "24/7 burst pipe repair in Seattle. Stop the water and call (206) 772-6077, licensed emergency plumbers on the way.",
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

