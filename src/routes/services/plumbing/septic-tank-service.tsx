import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";

const CONTENT: ServicePageContent = {
  title: "Septic Tank Service",
  breadcrumbLabel: "Septic Tank Service",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?w=1600&q=80",
  introHeading: "Seattle-Area Septic Tank Service",
  introBlocks: [
    {
      paragraphs: [
        "Homes outside Seattle's main sewer footprint, across parts of King, Pierce, and Snohomish counties, rely on septic systems to safely process household wastewater. A well-maintained septic system can last 25+ years; a neglected one can fail in 5.",
        "All Phase Plumbing helps homeowners with the plumbing side of septic systems, clogged lines into and out of the tank, baffle and tee repairs, and coordination with licensed septic pumpers and installers.",
        "Call (206) 772-6077 to schedule septic-related plumbing service.",
      ],
    },
    {
      heading: "Septic-Related Services We Provide",
      list: [
        "Drain line repair from house to tank",
        "Cleanout installation",
        "Baffle and tee repair or replacement",
        "Sewer camera inspection of inlet and outlet lines",
        "Clog clearing on drain field laterals",
        "Coordination with septic pumping and inspection contractors",
      ],
    },
    {
      heading: "Signs Your Septic System Needs Attention",
      list: [
        "Slow drains throughout the house",
        "Sewage backing up into floor drains or tubs",
        "Foul odors near the tank or drain field",
        "Wet, spongy areas or unusually green grass over the drain field",
        "Gurgling sounds from toilets",
      ],
    },
    {
      heading: "Septic Tank Pumping",
      paragraphs: [
        "Most residential tanks need pumping every 3–5 years. We don't pump tanks ourselves but we coordinate with licensed septic pumpers and can schedule a camera inspection of the lines while the tank is open.",
      ],
    },
    {
      heading: "Schedule Septic Service",
      paragraphs: [
        "If you're seeing slow drains, odors, or wet spots in the yard, don't wait, septic failures get expensive fast. Call (206) 772-6077 and we'll diagnose the plumbing-side issue and coordinate any septic specialist work needed.",
      ],
    },
  ],
  faqs: [
    {
      q: "Do you pump septic tanks yourselves?",
      a: "We focus on the plumbing connections, the lines into and out of the tank. We coordinate with licensed septic pumping contractors when tank pumping is needed.",
    },
    {
      q: "How often should I pump my septic tank?",
      a: "Every 3–5 years for typical residential use. Larger households or heavy water use may need pumping more often.",
    },
    {
      q: "Can I use a garbage disposal with a septic system?",
      a: "It's possible but adds significant solids to the tank, which means pumping more often. We can advise on whether your system is sized for it.",
    },
    {
      q: "My drain field smells, what's wrong?",
      a: "Could be a saturated field, failed lateral, or solids that have escaped a poorly-maintained tank. Camera inspection of the outlet line helps diagnose.",
    },
    {
      q: "Do I need a sewer camera inspection if I'm buying a septic home?",
      a: "Strongly recommended, along with a tank inspection by a licensed septic contractor. We do the line inspection portion.",
    },
  ],
  related: [
    { label: "Sewer Services", href: "/services/sewer-services" },
    { label: "Sewer Line Repair", href: "/services/plumbing/sewer-line-repair" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Plumbing", href: "/services/plumbing" },
  ],
};

export const Route = createFileRoute("/services/plumbing/septic-tank-service")({
  head: () => ({
    meta: [
      { title: "Septic Tank Service Seattle Area, All Phase Plumbing" },
      {
        name: "description",
        content:
          "Septic system plumbing service across the Seattle area, drain line repair, cleanouts, baffles, and coordination with septic pumpers.",
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

