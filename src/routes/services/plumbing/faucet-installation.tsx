import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";

const CONTENT: ServicePageContent = {
  title: "Faucet Installation",
  breadcrumbLabel: "Faucet Installation",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=1600&q=80",
  introHeading: "Faucet Installation",
  introBlocks: [
    {
      paragraphs: [
        "Installing a new faucet may seem simple, but even small mistakes can lead to leaks, low water pressure, or damage under the sink. Many homeowners call us after dealing with dripping faucets, loose handles, or water pooling inside cabinets from a poor installation.",
        "Whether you're replacing an old faucet or installing a new one during a remodel, professional faucet installation helps make sure everything works properly from day one. Our goal is a clean install, solid connections, and smooth water flow without future problems.",
        "Call (206) 772-6077 or book your faucet installation service online today.",
      ],
    },
    {
      heading: "Professional Faucet Installation Services",
      paragraphs: [
        "A faucet connects directly to your water supply, so proper installation matters. Incorrect fittings or loose connections can cause slow leaks that go unnoticed until damage appears.",
        "Our professional faucet installation service helps with:",
      ],
      list: [
        "Secure water line connections",
        "Proper faucet alignment",
        "Leak-free operation",
        "Smooth handle and valve function",
      ],
    },
    {
      paragraphs: [
        "We install faucets correctly the first time, helping prevent water damage, wasted water, and early wear.",
      ],
    },
    {
      heading: "Kitchen Faucet Installation",
      paragraphs: [
        "Kitchen faucets get used more than almost any other fixture in the home. A poorly installed kitchen faucet can lead to leaks under the sink, reduced water pressure, or loose movement over time.",
      ],
      list: [
        "Standard and pull-down faucets",
        "Single-handle and double-handle faucets",
        "Touchless and sensor faucets",
        "Replacement of old or leaking faucets",
      ],
      // Trailing paragraph below
    },
    {
      paragraphs: [
        "We confirm proper water flow, secure mounting, and leak-free connections before completing the job.",
      ],
    },
    {
      heading: "Bathroom Faucet Installation",
      paragraphs: [
        "Bathroom faucets may look simple, but tight spaces and older plumbing can make installation tricky. Even a small misalignment can cause dripping or damage to the sink or countertop.",
      ],
      list: [
        "Sink faucet replacements",
        "Vanity faucet installation",
        "Widespread and center-set faucets",
        "Vessel sink faucet installation",
      ],
    },
    {
      paragraphs: [
        "We make sure the faucet is mounted correctly, sealed properly, and tested before leaving.",
      ],
    },
    {
      heading: "Replacement Faucet Installation",
      paragraphs: [
        "Replacing an existing faucet is one of the most common plumbing upgrades. While the old faucet may come off easily, connecting the new one properly is where problems often start.",
      ],
      list: [
        "Removing old fixtures safely",
        "Inspecting supply lines and shutoff valves",
        "Installing the new faucet securely",
        "Testing for leaks and pressure issues",
      ],
    },
    {
      paragraphs: [
        "If worn valves or connections are found, we explain your options before completing the installation.",
      ],
    },
    {
      heading: "Faucet Installation for Remodels and Upgrades",
      paragraphs: [
        "New sinks, countertops, or cabinetry often require new faucets. Proper installation during a remodel helps everything fit correctly and function as intended.",
      ],
      list: [
        "Kitchen remodel faucet installs",
        "Bathroom renovation projects",
        "Fixture upgrades for style or efficiency",
      ],
    },
    {
      paragraphs: [
        "Our team coordinates installation timing and checks clearances to avoid future adjustments.",
      ],
    },
    {
      heading: "Preventing Leaks After Faucet Installation",
      paragraphs: [
        "One of the biggest concerns with faucet installation is leaks that appear days or weeks later. These slow leaks can damage cabinets, flooring, and nearby walls.",
        "After installation, we:",
      ],
      list: [
        "Test all connections",
        "Check shutoff valves",
        "Confirm proper sealing",
        "Verify smooth operation",
      ],
    },
    {
      heading: "Why Professional Faucet Installation Matters",
      paragraphs: ["DIY faucet installation often leads to:"],
      list: [
        "Cross-threaded connections",
        "Overtightened fittings",
        "Loose mounts",
        "Hidden leaks",
      ],
    },
    {
      heading: "When to Schedule Faucet Installation",
      paragraphs: ["You should schedule faucet installation if:"],
      list: [
        "Your faucet is leaking or dripping",
        "Handles are loose or hard to turn",
        "You're upgrading fixtures",
        "You're remodeling a kitchen or bathroom",
        "A previous installation failed",
      ],
    },
    {
      heading: "Schedule Your Faucet Installation Service Today",
      paragraphs: [
        "If you're installing a new faucet or replacing an old one, professional installation helps avoid leaks and future problems. Our experienced plumbers provide reliable faucet installation services with clear communication and upfront pricing.",
        "From simple replacements to full upgrades, we're ready to help. Call (206) 772-6077 or book online today to schedule your faucet installation service.",
      ],
    },
  ],
  faqs: [
    { q: "Can you install a faucet I bought myself?", a: "Yes. We install customer-supplied faucets all the time. We'll verify the model is compatible with your sink and supply lines before starting." },
    { q: "How long does faucet installation usually take?", a: "Most replacements take 45 minutes to 90 minutes. New installs or faucets requiring shutoff valve replacement can run 2 hours or more." },
    { q: "Do you replace the shutoff valves while you're under the sink?", a: "If the existing valves are old, stuck, or leaking, we recommend replacing them at the same time — it's much easier and cheaper now than a separate visit later." },
    { q: "Will a touchless faucet work with my existing plumbing?", a: "Yes, but it needs a power source. We'll confirm whether you need a nearby outlet for the AC adapter or whether the battery-pack version makes more sense for your sink." },
    { q: "What if I notice a leak a few days after installation?", a: "Call us — we stand behind our work. If something we installed is leaking, we'll come back and make it right." },
  ],
  related: [
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Water Heaters", href: "/services/water-heaters" },
    { label: "Sewer Services", href: "/services/sewer-services" },
  ],
};

export const Route = createFileRoute("/services/plumbing/faucet-installation")({
  head: () => ({
    meta: [
      { title: "Seattle Faucet Installation — All Phase Plumbing" },
      { name: "description", content: "Professional kitchen, bathroom, and replacement faucet installation in Seattle. Clean installs, leak-free connections, upfront pricing." },
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
