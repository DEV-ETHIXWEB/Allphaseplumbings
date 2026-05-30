import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";

const CONTENT: ServicePageContent = {
  title: "Garbage Disposals",
  breadcrumbLabel: "Garbage Disposals",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80",
  introHeading: "Seattle Garbage Disposal Repair",
  introBlocks: [
    {
      paragraphs: [
        "A broken garbage disposal can quickly disrupt your kitchen routine, causing backups, bad smells, or loud grinding noises. At All Phase Plumbing, we provide fast and dependable garbage disposal repair in Seattle to restore functionality and prevent further plumbing issues. Whether your unit is jammed, leaking, or completely unresponsive, we'll get it working again in no time.",
        "We proudly offer complete garbage disposal repair, replacement, and installation services for homeowners and businesses across Seattle. Our licensed plumbers work with all major brands and models and can recommend the right repair or upgrade based on your needs. With All Phase Plumbing, you can count on honest service, reliable workmanship, and long-lasting results every time.",
      ],
    },
    {
      heading: "Garbage Disposal Repair in Seattle",
      paragraphs: [
        "If your disposal is leaking, jammed, or making unusual noises, our team is here to help with expert garbage disposal repair in Seattle. Common issues include worn parts, electrical malfunctions, clogs, or foreign objects stuck in the blades. Ignoring these signs can lead to bigger plumbing problems, so it's important to call a professional as soon as possible.",
        "At All Phase Plumbing, we diagnose the problem quickly and make lasting repairs using quality components and safe techniques. Our plumbers understand the unique plumbing setups found in Seattle homes and will ensure your disposal runs quietly and efficiently again in no time.",
      ],
    },
    {
      heading: "Seattle Garbage Disposal Replacement",
      paragraphs: [
        "If your garbage disposal is more than 10 years old or beyond repair, garbage disposal replacement in Seattle may be your best option. Older units often struggle with frequent breakdowns, leaks, or reduced grinding power — making replacement a more cost-effective solution.",
        "Our plumbers will handle the entire process, from safely removing your old disposal to installing your new one with precision. We install all major disposal brands and can help you choose a quiet, energy-efficient model that fits your kitchen's needs and plumbing system.",
      ],
    },
    {
      heading: "Seattle Garbage Disposal Installation",
      paragraphs: [
        "Whether you're upgrading your kitchen or adding a disposal for the first time, All Phase Plumbing offers professional garbage disposal installation in Seattle. Proper installation is essential to prevent leaks, clogs, or electrical hazards down the line.",
        "Our skilled plumbers ensure that your new system is correctly connected to your sink and drainage line, operates quietly, and is ready to handle daily food waste safely. We also walk you through basic maintenance tips to help extend the lifespan of your unit.",
      ],
    },
    {
      heading: "Call for Expert Garbage Disposal Repair, Replacement & Installation in Seattle",
      paragraphs: [
        "If your garbage disposal is acting up, completely broken, or you're ready for a new installation, All Phase Plumbing is here to help. We provide fast, reliable garbage disposal repair, replacement, and installation services in Seattle tailored to your kitchen's needs.",
        "Call (206) 772-6077 today or schedule online to keep your plumbing system running smoothly and your kitchen functioning at its best.",
      ],
    },
  ],
  faqs: [
    { q: "Why is my garbage disposal humming but not working?", a: "A humming disposal usually means the motor has power but the grinding plate is jammed. Don't keep flipping the switch — it can burn out the motor. Call us at (206) 772-6077 and we'll safely free the jam and check for damage." },
    { q: "How long does a garbage disposal last?", a: "Most quality units last 8–15 years with regular use and proper care. If yours is over 10 years old and giving you frequent trouble, replacement is usually the better long-term investment." },
    { q: "Can you replace a disposal with a more powerful model?", a: "Absolutely. We'll size the right horsepower for your household, confirm your sink and electrical can handle it, and install the new unit cleanly with leak-tested connections." },
    { q: "Why does my disposal smell bad?", a: "Food residue stuck under the splash guard or in the chamber is the usual cause. We can clean and deodorize the unit during a service visit, or replace worn seals that are trapping debris." },
    { q: "Do you install disposals in homes that have never had one?", a: "Yes. We handle first-time installations including the under-sink plumbing changes and any electrical coordination needed for safe operation." },
  ],
  related: [
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Water Heaters", href: "/services/water-heaters" },
    { label: "Sewer Services", href: "/services/sewer-services" },
  ],
};

export const Route = createFileRoute("/services/plumbing/garbage-disposals")({
  head: () => ({
    meta: [
      { title: "Seattle Garbage Disposal Repair, Replacement & Installation — All Phase Plumbing" },
      { name: "description", content: "Fast, reliable garbage disposal repair, replacement, and installation in Seattle from All Phase Plumbing." },
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
