import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";

const CONTENT: ServicePageContent = {
  title: "Emergency Plumber",
  breadcrumbLabel: "Emergency Plumber",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1607400201515-c2c41c08d307?w=1600&q=80",
  introHeading: "24/7 Emergency Plumber in Seattle",
  introBlocks: [
    {
      paragraphs: [
        "When a pipe bursts at 2 AM, water is flooding your basement, or your only toilet has stopped working, you need an emergency plumber who can actually get to you fast. All Phase Plumbing dispatches licensed emergency plumbers across the Greater Seattle area 24 hours a day, 7 days a week.",
        "Our trucks are stocked for common emergency repairs so we can stop the water, diagnose the problem, and get things working again in a single visit whenever possible.",
        "Call (206) 772-6077 — we answer the phone, day or night.",
      ],
    },
    {
      heading: "When to Call an Emergency Plumber",
      paragraphs: ["Call us immediately for any of the following:"],
      list: [
        "Burst or leaking pipes flooding your home",
        "No water anywhere in the house",
        "Sewer backup into sinks, tubs, or floor drains",
        "Water heater leaking or flooding",
        "Gas smell near plumbing fixtures",
        "Only toilet in the home not working",
        "Frozen pipes that may burst when thawed",
      ],
    },
    {
      heading: "What to Do Before We Arrive",
      paragraphs: ["A few quick steps can limit damage while we're on the way:"],
      list: [
        "Shut off the main water valve to stop active flooding",
        "Turn off the water heater if it's leaking",
        "If you smell gas, leave the building and call your gas utility first",
        "Move valuables away from the affected area",
        "Take photos for insurance documentation",
      ],
    },
    {
      heading: "Why Choose Our Emergency Plumbers",
      list: [
        "Real 24/7 dispatch — not just an answering service",
        "Licensed and insured technicians",
        "Same trucks stocked for most repairs on the first visit",
        "Upfront pricing before work begins",
        "Service across King and Pierce counties",
      ],
    },
    {
      heading: "Schedule Emergency Plumbing Service",
      paragraphs: [
        "Don't wait — water damage gets worse by the minute. Call (206) 772-6077 right now and a licensed Seattle plumber will be on the way.",
      ],
    },
  ],
  faqs: [
    { q: "Do you really answer at night and on weekends?", a: "Yes. Our emergency line rings to a live dispatcher 24/7 — you'll talk to a real person who can get a plumber rolling." },
    { q: "What counts as a plumbing emergency?", a: "Anything actively causing damage or unsafe conditions: flooding, no water, sewer backup, gas smells, or a complete loss of toilets/heat." },
    { q: "Is there an extra charge for after-hours service?", a: "After-hours rates do apply for nights, weekends, and holidays. We'll confirm pricing on the phone before dispatch — no surprises." },
    { q: "How fast can you get to me?", a: "Most Seattle-area emergency calls are reached within 60–90 minutes. Heavy weather events can extend this — we'll give you a realistic ETA when you call." },
    { q: "Can you fix it on the first visit?", a: "We stock our trucks for the most common emergencies, so yes in most cases. For specialty parts we'll stabilize the situation and return same-day or next morning to finish." },
  ],
  related: [
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Burst Pipe Repair", href: "/services/plumbing/burst-pipe-repair" },
    { label: "Leak Detection", href: "/services/plumbing/leak-detection" },
    { label: "Sewer Services", href: "/services/sewer-services" },
  ],
};

export const Route = createFileRoute("/services/plumbing/emergency-plumber")({
  head: () => ({
    meta: [
      { title: "24/7 Emergency Plumber Seattle — All Phase Plumbing" },
      { name: "description", content: "Seattle 24/7 emergency plumber — burst pipes, sewer backups, water heater failures, leaks. Same-day dispatch across King & Pierce counties." },
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
