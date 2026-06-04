import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";

const CONTENT: ServicePageContent = {
  title: "Pipe Replacement",
  breadcrumbLabel: "Pipe Replacement",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1607400201515-c2c41c08d307?w=1600&q=80",
  introHeading: "Pipe Replacement",
  introBlocks: [
    {
      paragraphs: [
        "Pipes don't last forever. Over time, plumbing pipes wear down, corrode, crack, or fail completely. When repairs are no longer enough, pipe replacement becomes the safest way to protect your home and plumbing system.",
        "Pipe replacement focuses on removing damaged or outdated pipes and installing new, reliable plumbing lines. This helps restore proper water flow, prevent leaks, and avoid sudden pipe failures that can cause serious water damage.",
        "Call (206) 772-6077 or book your Pipe Replacement service online today.",
      ],
    },
    {
      heading: "Professional Pipe Replacement",
      paragraphs: [
        "Pipe replacement is more than swapping out old pipes. It involves inspecting the plumbing system, identifying weak points, and installing new pipes that meet modern standards. Common reasons pipe replacement is needed include:",
      ],
      list: [
        "Frequent leaks",
        "Corroded or rusted pipes",
        "Low or inconsistent water pressure",
        "Discolored or metallic-tasting water",
        "Pipes that crack or burst repeatedly",
      ],
    },
    {
      paragraphs: [
        "Replacing failing pipes helps restore safety and long-term reliability.",
      ],
    },
    {
      heading: "Signs You Need Pipe Replacement",
      paragraphs: [
        "Plumbing problems often start small and grow over time. Knowing the warning signs helps prevent major damage. Signs pipe replacement may be needed:",
      ],
      list: [
        "Repeated pipe leaks in different areas",
        "Rust-colored water",
        "Water pressure drops throughout the home",
        "Visible corrosion on exposed pipes",
        "Mold or damp smells near walls or ceilings",
        "Pipes older than their expected lifespan",
      ],
    },
    {
      heading: "Water Pipe Replacement",
      paragraphs: [
        "Water supply pipes carry clean water throughout the home. When these pipes fail, it can affect every fixture. Water pipe replacement addresses:",
      ],
      list: [
        "Main water lines",
        "Branch supply lines",
        "Hot and cold water pipes",
      ],
    },
    {
      heading: "Drain and Sewer Pipe Replacement",
      paragraphs: [
        "Drain and sewer pipes remove wastewater from the home. When these pipes crack or collapse, backups and odors become common. Drain and sewer pipe replacement may be needed when:",
      ],
      list: [
        "Pipes collapse due to age",
        "Roots cause severe damage",
        "Repeated clogs occur",
        "Pipes crack or separate",
      ],
    },
    {
      heading: "Pipe Replacement After Repeated Repairs",
      paragraphs: [
        "If pipes need frequent repairs, replacement often becomes the better long-term solution. Constant patching can lead to higher costs over time. Pipe replacement reduces:",
      ],
      list: [
        "Emergency plumbing calls",
        "Water damage risk",
        "Repair expenses",
      ],
    },
    {
      heading: "Residential Pipe Replacement",
      paragraphs: [
        "Residential pipe replacement protects homes from unexpected plumbing failures. Aging pipes are one of the leading causes of water damage in houses. Replacing pipes helps homeowners:",
      ],
      list: [
        "Maintain property value",
        "Prevent water damage",
        "Improve plumbing reliability",
      ],
    },
    {
      heading: "Preventing Future Pipe Problems",
      paragraphs: ["After pipe replacement, proper care helps extend the life of the new system. Helpful tips include:"],
      list: [
        "Avoid harsh chemical drain cleaners",
        "Monitor water pressure",
        "Fix small leaks early",
        "Schedule routine plumbing checks",
      ],
    },
    {
      heading: "Schedule Pipe Replacement Service",
      paragraphs: [
        "If your plumbing system shows signs of aging, corrosion, or repeated leaks, pipe replacement provides a long-term solution. Replacing failing pipes helps protect your home, improve performance, and prevent costly damage.",
        "Call (206) 772-6077 or book online today to schedule your Pipe Replacement service.",
      ],
    },
  ],
  faqs: [
    { q: "How do I know if I need repiping vs. spot repair?", a: "If you've had leaks in multiple spots within a year, see rust-colored water, or have galvanized pipe nearing end of life (50+ years), full repiping usually beats more patches." },
    { q: "What pipe materials do you use?", a: "PEX for most water supply (flexible, freeze-tolerant, long-lasting) and copper where required by spec. For drain/sewer, modern PVC or HDPE depending on application." },
    { q: "How long does a whole-home repipe take?", a: "Most single-family homes are repiped in 2–5 days. We work in phases so you have water at the end of each day whenever possible." },
    { q: "Will you have to cut into my walls?", a: "Some access is unavoidable, but we plan the route to minimize wall openings and patch them cleanly when finished." },
    { q: "Is repiping covered by insurance?", a: "Standard policies usually cover water damage caused by sudden leaks but not the cost of replacing pipes. Some policies offer service-line endorsements, worth checking." },
  ],
  related: [
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Leak Detection", href: "/services/plumbing/leak-detection" },
    { label: "Sewer Services", href: "/services/sewer-services" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
  ],
};

export const Route = createFileRoute("/services/plumbing/pipe-replacement")({
  head: () => ({
    meta: [
      { title: "Seattle Pipe Replacement & Repiping, All Phase Plumbing" },
      { name: "description", content: "Seattle pipe replacement and full home repiping, PEX, copper, drain & sewer lines. Long-term reliability over endless patches." },
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
