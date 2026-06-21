import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";

const CONTENT: ServicePageContent = {
  title: "Sewer Services",
  breadcrumbLabel: "Sewer",
  heroImage: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?w=1600&q=80",
  introHeading: "Seattle Sewer Repair",
  introBlocks: [
    {
      paragraphs: [
        "When you need Seattle sewer repair, All Phase Plumbing is your trusted local expert for fast, reliable, and long-lasting solutions. Sewer problems can cause serious disruptions, from foul odors and slow drains to full system backups, and our team is ready to respond quickly to restore your peace of mind.",
        "We offer a complete range of sewer services in Seattle, including:",
      ],
      list: [
        "Sewer line repair and replacement",
        "Trenchless sewer repair",
        "Sewer camera inspection",
        "Sewer cleaning and maintenance",
      ],
    },
    {
      paragraphs: [
        "No matter the challenge, our licensed plumbers use advanced tools and proven techniques to accurately diagnose issues and deliver dependable, lasting repairs. From minor leaks to complete line replacements, All Phase Plumbing keeps Seattle's sewer systems running smoothly.",
      ],
    },
    {
      heading: "Comprehensive Sewer Services",
      paragraphs: [
        "When it comes to dependable Seattle sewer services, homeowners and businesses alike rely on All Phase Plumbing. Our experienced technicians understand the unique challenges of Seattle's plumbing systems, from older infrastructure to shifting soil conditions, and deliver precise, efficient solutions every time.",
      ],
    },
    {
      heading: "Our Seattle Sewer Services Include:",
      list: [
        "Sewer Line Replacement: Restore performance with new, durable piping.",
        "Sewer Line Camera Inspection: Identify blockages, cracks, and tree root intrusions.",
        "Sewer Repair: Quick, targeted fixes for leaks, breaks, or corrosion.",
        "Sewer Cleaning: Eliminate buildup and improve flow efficiency.",
        "Trenchless Sewer Repair & Replacement: Advanced, no-dig technology for minimal disruption.",
      ],
      paragraphs: [
        "If you're experiencing sewer issues or simply want a professional inspection, contact All Phase Plumbing today to schedule your Seattle sewer service.",
      ],
    },
    {
      heading: "Seattle Sewer Inspection",
      paragraphs: [
        "Not sure what's causing your sewer problem? Our Seattle sewer inspection service provides clear answers fast. Using advanced sewer camera technology, we can view the inside of your pipes in real time, detecting:",
      ],
      list: [
        "Cracks or collapsed sections",
        "Tree root intrusion",
        "Corrosion or buildup",
        "Blockages or foreign debris",
      ],
    },
    {
      paragraphs: [
        "This process eliminates guesswork, allowing us to recommend the most effective solution, whether it's a simple cleaning or a full sewer replacement. Don't wait for a small issue to become a major headache. Schedule your Seattle sewer inspection with All Phase Plumbing today.",
      ],
    },
    {
      heading: "Seattle Sewer Replacement",
      paragraphs: [
        "If your sewer system is outdated, corroded, or repeatedly clogging, it may be time for Seattle sewer replacement. Our plumbers specialize in installing modern, long-lasting sewer lines designed to handle Seattle's soil and moisture conditions.",
        "We offer both traditional excavation and trenchless replacement methods to meet your needs. Trenchless options minimize damage to your yard, driveways, and landscaping, while delivering a durable new line built for decades of reliable use.",
        "Trust All Phase Plumbing to handle your sewer replacement in Seattle with precision, care, and minimal disruption to your property.",
      ],
    },
    {
      heading: "Sewer Repair in Seattle",
      paragraphs: [
        "A damaged sewer line can't wait. All Phase Plumbing provides prompt and effective sewer repair in Seattle to stop leaks, eliminate backups, and restore your plumbing system's functionality.",
      ],
    },
    {
      heading: "Common Signs You Need Sewer Repair:",
      list: [
        "Gurgling noises in toilets or drains",
        "Frequent backups or slow drainage",
        "Foul sewer odors indoors or outdoors",
        "Wet or sunken patches in your yard",
        "Mold or mildew forming on floors or walls",
      ],
      paragraphs: [
        "Ignoring these warning signs can lead to costly property damage and health hazards. Call All Phase Plumbing today to schedule your Seattle sewer repair before the problem worsens.",
      ],
    },
    {
      heading: "Seattle Trenchless Sewer Repair",
      paragraphs: [
        "Want your sewer line fixed without tearing up your yard? Seattle trenchless sewer repair is the solution. This modern technique allows us to repair or replace damaged pipes through small access points, avoiding the need for large-scale excavation.",
        "Using advanced tools, we install a new lining or pipe inside the existing structure, creating a seamless, durable fix that restores flow and prevents future issues. It's faster, cleaner, and more affordable than traditional methods.",
        "If you want sewer repair without the mess, contact All Phase Plumbing for expert trenchless sewer repair in Seattle.",
      ],
    },
    {
      heading: "Trenchless Sewer Replacement in Seattle",
      paragraphs: [
        "When your existing sewer line is beyond repair, trenchless sewer replacement in Seattle offers an efficient, non-invasive upgrade. Our plumbers use specialized equipment to install new, high-strength piping underground, preserving your landscaping and property structures.",
        "This process ensures long-term durability and minimal disruption, ideal for Seattle homeowners who want a modern solution for aging infrastructure.",
        "Let All Phase Plumbing handle your sewer replacement project with the care and expertise your home deserves.",
      ],
    },
    {
      heading: "Get Expert Help with Seattle Sewer Repair",
      paragraphs: [
        "Don't let sewer issues take over your day, or your yard. Whether you're facing a backup, odor, or broken line, All Phase Plumbing provides fast, affordable, and professional Seattle sewer repair. Our goal is to restore your system efficiently so you can get back to normal life with confidence.",
        "Call (206) 772-6077 or schedule online to book your appointment today and experience the All Phase difference.",
      ],
    },
  ],
  faqs: [
    {
      q: "What causes sewer line damage in Seattle homes?",
      a: "Common causes include tree root intrusions, shifting soil, corrosion, grease buildup, or aging pipes. Heavy rain and ground movement can also lead to cracks or breaks. Call (206) 772-6077.",
    },
    {
      q: "How do I know if my sewer line needs repair or replacement?",
      a: "Signs include recurring backups, gurgling drains, foul odors, slow drainage in multiple fixtures, or wet patches in your yard. A camera inspection is the most reliable way to confirm whether your line can be repaired or needs replacement.",
    },
    {
      q: "What is trenchless sewer repair?",
      a: "Trenchless sewer repair is a no-dig method that uses small access points to repair or replace damaged sewer lines. Techniques include pipe bursting and CIPP lining, both faster, cleaner, and less disruptive than traditional excavation.",
    },
    {
      q: "How long does sewer repair or replacement take?",
      a: "Most trenchless sewer repairs are completed in 1–2 days. Traditional dig-and-replace jobs can take a week or more, depending on the length and depth of the line and any permitting requirements.",
    },
    {
      q: "Will I need to leave my home during sewer repair?",
      a: "In most cases, no. You can usually stay home during sewer repair or replacement, although water service may be temporarily interrupted while we work. We'll communicate the schedule clearly in advance.",
    },
    {
      q: "How can I prevent future sewer problems?",
      a: "Avoid flushing wipes, grease, or non-flushable items, schedule periodic camera inspections, address slow drains early, and consider hydro-jetting maintenance if you have older pipes or large trees on your property.",
    },
  ],
  related: [
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Water Heaters", href: "/services/water-heaters" },
    { label: "Commercial", href: "/commercial" },
  ],
};

export const Route = createFileRoute("/services/sewer-services/")({
  head: () => ({
    meta: [
      { title: "Sewer Repair & Trenchless Sewer Seattle, All Phase Plumbing" },
      {
        name: "description",
        content:
          "Sewer line repair, replacement, and trenchless solutions across Greater Seattle. Free camera inspection with qualifying work.",
      },
      { property: "og:title", content: "Sewer Services, All Phase Plumbing" },
      { property: "og:description", content: "Sewer repair and trenchless replacement." },
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

