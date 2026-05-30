import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";

const CONTENT: ServicePageContent = {
  title: "Bathtub Installation",
  breadcrumbLabel: "Bathtub Installation",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1600&q=80",
  introHeading: "Bathtub Installation",
  introBlocks: [
    {
      paragraphs: [
        "Installing a new bathtub can completely change how your bathroom looks and functions. Whether you're replacing an old tub, upgrading for comfort, or remodeling your bathroom, proper bathtub installation is essential for long-term performance and water safety. A poorly installed bathtub can lead to leaks, drainage issues, and hidden water damage.",
        "Professional bathtub installation ensures the tub is set correctly, sealed properly, and connected to your plumbing system without issues. From standard tubs to modern soaking and walk-in options, correct installation protects your home and improves daily comfort.",
        "If you're planning a bathroom upgrade or replacing a worn-out tub, professional bathtub installation makes all the difference. Call (206) 772-6077 or book your Bathtub Installation service online today.",
      ],
    },
    {
      heading: "Professional Bathtub Installation Services",
      paragraphs: [
        "Bathtub installation involves more than placing a tub in position. It requires precise plumbing connections, proper leveling, secure sealing, and correct drainage setup. Our bathtub installation services include:",
      ],
      list: [
        "Removing existing bathtubs",
        "Preparing plumbing connections",
        "Installing new tubs securely",
        "Sealing and waterproofing",
        "Testing drainage and water flow",
      ],
    },
    {
      paragraphs: [
        "Every installation is completed with attention to detail to prevent leaks and future problems.",
      ],
    },
    {
      heading: "When You Need Bathtub Installation",
      paragraphs: [
        "Many homeowners delay bathtub replacement until problems worsen. Installing a new bathtub early can prevent water damage and improve bathroom usability. Common reasons to schedule bathtub installation include:",
      ],
      list: [
        "Cracked or damaged tubs",
        "Persistent leaks around the tub",
        "Mold or mildew buildup",
        "Outdated or uncomfortable designs",
        "Bathroom remodeling projects",
        "Accessibility needs",
      ],
    },
    {
      heading: "Replacing an Old or Damaged Bathtub",
      paragraphs: [
        "Over time, bathtubs can develop cracks, stains, or surface damage that cannot be repaired effectively. These issues can allow water to seep into walls or floors. Bathtub replacement includes:",
      ],
      list: [
        "Safe removal of the old tub",
        "Inspection of plumbing and framing",
        "Installing a new tub correctly",
        "Ensuring watertight seals",
      ],
    },
    {
      heading: "Standard Bathtub Installation",
      paragraphs: [
        "Standard bathtubs are common in many homes and are available in a variety of materials and styles. Proper installation ensures stability and comfort.",
      ],
      list: [
        "Proper leveling",
        "Secure wall connections",
        "Correct drain alignment",
        "Sealing around edges",
      ],
    },
    {
      heading: "Soaking Tub Installation",
      paragraphs: [
        "Soaking tubs are designed for comfort and relaxation. These tubs are often deeper and heavier than standard bathtubs. Soaking tub installation may require:",
      ],
      list: [
        "Reinforced flooring support",
        "Upgraded drain capacity",
        "Precise placement and leveling",
        "Secure plumbing connections",
      ],
    },
    {
      heading: "Why Professional Bathtub Installation Matters",
      paragraphs: [
        "Bathtub installation requires precision and plumbing knowledge. Small mistakes can lead to serious water damage over time. Benefits of professional installation include:",
      ],
      list: [
        "Proper waterproofing",
        "Leak prevention",
        "Correct drainage",
        "Secure placement",
        "Long-term reliability",
      ],
    },
    {
      heading: "Our Bathtub Installation Process",
      paragraphs: ["Our bathtub installation process is designed for quality and reliability:"],
      list: [
        "Removing the existing tub",
        "Inspecting plumbing and framing",
        "Preparing the installation area",
        "Installing and securing the new tub",
        "Connecting drains and water lines",
        "Sealing and testing for leaks",
      ],
    },
    {
      heading: "Schedule Bathtub Installation Today",
      paragraphs: [
        "If you're upgrading your bathroom or replacing an old tub, professional bathtub installation ensures lasting performance and comfort. A properly installed bathtub adds value to your home and improves everyday use.",
        "Call (206) 772-6077 or book online today to schedule bathtub installation service.",
      ],
    },
  ],
  faqs: [
    { q: "How long does bathtub installation take?", a: "A standard like-for-like tub swap is typically one day. Soaking tubs or full bathroom remodels can take 2–4 days depending on flooring, plumbing rerouting, and tile work." },
    { q: "Do I need to upgrade my floor for a soaking tub?", a: "Often yes — soaking tubs filled with water are very heavy. We assess your floor framing and reinforce if needed before installing." },
    { q: "Can you install a walk-in tub for accessibility?", a: "Yes. Walk-in tubs require specific plumbing, electrical, and structural considerations we handle as part of the installation." },
    { q: "What's included in the installation?", a: "Old tub removal, plumbing prep, leveling, secure mounting, drain/overflow connection, sealing, and leak testing. Tile and finish work can be coordinated with our partner contractors." },
    { q: "Will you haul away my old tub?", a: "Yes — disposal of the old tub is included with installation." },
  ],
  related: [
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Faucet Installation", href: "/services/plumbing/faucet-installation" },
    { label: "Toilets", href: "/services/plumbing/toilets" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
  ],
};

export const Route = createFileRoute("/services/plumbing/bathtub-installation")({
  head: () => ({
    meta: [
      { title: "Seattle Bathtub Installation — All Phase Plumbing" },
      { name: "description", content: "Professional bathtub installation in Seattle — standard, soaking, and walk-in tubs. Watertight, leak-tested, code-compliant." },
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
