import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";

const CONTENT: ServicePageContent = {
  title: "Residential",
  breadcrumbLabel: "Residential",
  heroImage: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1600&q=80",
  introHeading: "Seattle Residential Plumber",
  introBlocks: [
    {
      paragraphs: [
        "When something goes wrong with the plumbing in your home, you want a plumber who shows up on time, fixes it right, and treats your house like their own. That's exactly what you get with All Phase Plumbing, Seattle's trusted residential plumber for everything from a dripping faucet to a full repipe.",
        "We've helped homeowners across the Greater Seattle area keep their water running clean and their drains flowing freely since 1989. Whether you own a older Craftsman in the city or a newer build in the suburbs, our licensed plumbers deliver honest, code-compliant work backed by upfront pricing and a written warranty.",
        "No subcontractors, no surprise charges, and no aggressive upselling, just dependable home plumbing service from a team you can trust.",
      ],
    },
    {
      heading: "Seattle Residential Plumbing Services",
      paragraphs: [
        "At All Phase Plumbing, we handle the full range of residential plumbing needs for single-family homes, townhomes, and condos. From quick repairs to major upgrades, our experienced technicians have the tools and know-how to get the job done right the first time.",
      ],
    },
    {
      heading: "Our Residential Plumbing Services Include:",
      list: [
        "Drain Cleaning & Hydro Jetting: Clearing slow or clogged sinks, tubs, showers, and main lines.",
        "Water Heater Services: Repair, replacement, and tankless upgrades, often same day.",
        "Leak Detection & Repair: Finding and fixing hidden slab and behind-wall leaks before they cause damage.",
        "Toilet, Faucet & Fixture Repair: Installation and repair of toilets, faucets, sinks, and garbage disposals.",
        "Pipe Repair & Repiping: Fixing burst, corroded, or aging pipes in copper and modern PEX.",
        "Sewer Line Service: Camera inspection, repair, and trenchless replacement of your main sewer line.",
        "Water Softeners & Filtration: Cleaner, softer water that protects your pipes and fixtures.",
        "24/7 Emergency Plumbing: Fast response for burst pipes, backups, and flooding.",
      ],
      paragraphs: [
        "Whatever your home needs, All Phase Plumbing keeps your plumbing safe, efficient, and worry-free.",
      ],
    },
    {
      heading: "Seattle Water Heater Repair & Replacement",
      paragraphs: [
        "Few things disrupt a household like losing hot water. When your water heater fails, you can count on All Phase Plumbing for fast, professional water heater repair and replacement in Seattle.",
        "We service all makes and models, from standard tank units to high-efficiency tankless systems, and can usually restore hot water the same day. Common issues we fix include:",
      ],
      list: [
        "No hot water or water that won't stay hot",
        "Pilot light or ignition problems",
        "Rumbling, popping, or sediment buildup",
        "Leaking tanks or corroded fittings",
      ],
    },
    {
      heading: "Home Drain Cleaning & Hydro Jetting",
      paragraphs: [
        "A slow or backed-up drain is more than an annoyance, it's a warning sign. Our Seattle drain cleaning experts use professional augers, hydro jetting, and camera inspection to clear grease, hair, scale, and tree roots from your pipes.",
        "Instead of a temporary fix, we leave your drains fully cleared and flowing, and we'll show you exactly what caused the clog so you can avoid it next time.",
      ],
    },
    {
      heading: "Emergency Plumbing Repair for Your Home",
      paragraphs: [
        "Plumbing emergencies don't wait for business hours, and neither do we. From burst pipes and overflowing toilets to sewage backups, All Phase Plumbing answers the phone 24/7 and dispatches a licensed plumber to your home as fast as possible.",
        "We arrive prepared, diagnose the problem quickly, and give you an honest, upfront quote before any work begins, so a stressful situation gets handled calmly and correctly.",
      ],
    },
    {
      heading: "Why Seattle Homeowners Choose All Phase Plumbing",
      paragraphs: [
        "As a trusted residential plumber in Seattle, All Phase Plumbing is proud to serve homeowners with:",
      ],
      list: [
        "Licensed & Insured Plumbers: Every job is done by a pro, never a subcontractor",
        "Upfront, Flat-Rate Pricing: Know the cost before we start, with no surprises",
        "Same-Day & Emergency Service: Fast help when you need it most",
        "Written Warranty: Stand-behind-it guarantees on installs and repairs",
        "Local Since 1989: Decades of hands-on experience across Greater Seattle",
      ],
    },
    {
      heading: "Call Your Trusted Seattle Residential Plumber Today",
      paragraphs: [
        "When you need a dependable home plumber, trust All Phase Plumbing for quality work and peace of mind. From a quick repair to a whole-home upgrade, we'll keep your plumbing running the way it should.",
        "Call (206) 772-6077 today or schedule service online for expert residential plumbing in Seattle, backed by experience, integrity, and results.",
      ],
    },
  ],
  faqs: [
    {
      q: "What residential plumbing services do you offer?",
      a: "We handle everything a home needs, including drain cleaning, hydro jetting, water heater repair and replacement, leak detection, pipe repair and repiping, sewer line service, fixture installation, water softeners, and 24/7 emergency plumbing. Call (206) 772-6077 to discuss your home.",
    },
    {
      q: "Do you offer emergency plumbing services for homeowners?",
      a: "Yes, All Phase Plumbing is available 24/7 for emergency residential plumbing across the Greater Seattle area. For burst pipes, backups, or flooding, call us anytime and we'll dispatch a licensed plumber as quickly as possible.",
    },
    {
      q: "How much will my plumbing repair cost?",
      a: "We provide upfront, flat-rate pricing before any work begins. After diagnosing the issue, we'll give you a clear written quote so there are no surprises, you approve the price before we start.",
    },
    {
      q: "Can you replace my water heater the same day?",
      a: "In most cases, yes. We stock common tank and tankless water heaters and can often complete a replacement the same day so your household isn't left without hot water.",
    },
    {
      q: "Are your plumbers licensed and insured?",
      a: "Absolutely. Every job is completed by a licensed, insured All Phase Plumbing technician, never a subcontractor, and our work is backed by a written warranty.",
    },
    {
      q: "Do you handle older Seattle homes?",
      a: "Yes. We work on homes of every age, from historic Craftsman houses with original galvanized pipes to modern builds. For older homes we always inspect before recommending repairs, repiping, or hydro jetting to make sure the solution fits your system.",
    },
  ],
  related: [
    { label: "Drain Cleaning & Hydro Jetting", href: "/services/drain-cleaning" },
    { label: "Water Heaters", href: "/services/water-heaters" },
    { label: "Sewer Services", href: "/services/sewer-services" },
    { label: "Commercial", href: "/commercial" },
  ],
};

export const Route = createFileRoute("/residential/")({
  head: () => ({
    meta: [
      { title: "Residential Plumbing, All Phase Plumbing Seattle" },
      {
        name: "description",
        content:
          "Trusted residential plumber in Seattle. Drain cleaning, water heaters, leak detection, repiping, sewer service, and 24/7 emergency plumbing for your home. Call (206) 772-6077.",
      },
      { property: "og:title", content: "Residential Plumbing, All Phase Plumbing" },
      {
        property: "og:description",
        content: "Trusted home plumber for Seattle homeowners since 1989.",
      },
    ],
  }),
  component: () => (
    <PageShell>
      <ServicePageTemplate content={CONTENT} />
      <WhyUs />

      {/* ── Customer quote CTA ── */}
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
