import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";

const CONTENT: ServicePageContent = {
  title: "Water Softeners",
  breadcrumbLabel: "Water Softeners",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=1600&q=80",
  introHeading: "Seattle Water Softeners",
  introBlocks: [
    {
      paragraphs: [
        "Hard water can do more damage than you might think. It leaves behind mineral deposits, shortens the lifespan of your plumbing fixtures and appliances, and can even make your skin and hair feel dry and dull. That's why so many homeowners are turning to Seattle water softeners for a reliable, long-term solution.",
        "At All Phase Plumbing, we specialize in Seattle water softener repair, installation, and maintenance. Whether you're dealing with mineral buildup, inconsistent water quality, or ready to install a new system, our expert plumbers provide solutions tailored to your home's unique needs. Enjoy cleaner, softer water and protect your plumbing system for years to come.",
        "Call (206) 772-6077 or book online to schedule your Seattle plumbing service today!",
      ],
    },
    {
      heading: "Seattle Water Softener Repair",
      paragraphs: [
        "Is your water softener struggling to keep up? Over time, salt bridges, resin issues, or valve problems can reduce performance. Our team provides professional Seattle water softener repair to restore system efficiency and keep your water at its best.",
      ],
    },
    {
      heading: "Common Signs You May Need Water Softener Repair:",
      list: [
        "Soap scum or residue, cloudy dishes, stiff laundry, or scale on faucets often means your softener isn't regenerating properly.",
        "Low water pressure, mineral buildup inside pipes could mean your softener isn't working efficiently.",
        "Unusual taste or odor, a salty or metallic taste could indicate a malfunction in the brine tank or resin bed.",
        "Excessive salt use, if you're refilling the salt tank too often, your system may have a leak or efficiency problem.",
      ],
      paragraphs: [
        "At All Phase Plumbing, our water softener repair experts diagnose the issue quickly and provide long-lasting repairs to restore performance. Contact us today to schedule your Seattle water softener repair service.",
      ],
    },
    {
      heading: "Seattle Water Softener Installation",
      paragraphs: [
        "Installing a water softener is one of the best ways to protect your home's plumbing, appliances, and fixtures. Our professional Seattle water softener installation service ensures your new system is set up correctly for maximum performance and efficiency.",
      ],
    },
    {
      heading: "Benefits of Installing a Water Softener:",
      list: [
        "Extends appliance lifespan, prevents scale buildup in dishwashers, washing machines, and water heaters.",
        "Improves water pressure, reduces mineral clogs in your plumbing lines.",
        "Healthier skin and hair, soft water helps retain moisture and reduces irritation.",
        "Cleaner dishes and laundry, no more soap spots or stiff fabrics.",
      ],
      paragraphs: [
        "Whether you're upgrading from an outdated softener or adding one for the first time, we'll help you choose the right system and ensure a seamless installation. Contact All Phase Plumbing today for expert water softener installation in Seattle.",
      ],
    },
    {
      heading: "Seattle Water Softener Maintenance",
      paragraphs: [
        "Like any home system, water softeners perform best with routine care. Regular Seattle water softener maintenance helps prevent breakdowns, optimize water quality, and extend your system's lifespan.",
      ],
      list: [
        "Checking and refilling salt levels",
        "Cleaning and sanitizing the brine tank",
        "Inspecting resin beads and valves",
        "Testing water hardness and system performance",
        "Ensuring proper regeneration cycles",
      ],
    },
    {
      paragraphs: [
        "We recommend scheduling annual water softener maintenance to keep your system efficient and your water consistently soft. Our maintenance visits are quick, affordable, and ensure your equipment is working exactly as it should.",
      ],
    },
    {
      heading: "Call for Seattle Water Softener Services",
      paragraphs: [
        "Don't let hard water cause long-term damage to your plumbing or appliances. Whether you need water softener repair, installation, or maintenance, the team at All Phase Plumbing is ready to help.",
        "Call (206) 772-6077 today or schedule your service online to enjoy cleaner, softer water throughout your Seattle home.",
      ],
    },
  ],
  faqs: [
    {
      q: "Do I really need a water softener in Seattle?",
      a: "Seattle's tap water is generally on the soft side, but well water and some neighborhoods do see hardness issues. A simple hardness test tells you for sure, we can do this during the first visit.",
    },
    {
      q: "How often should I add salt?",
      a: "Most homes refill every 4–8 weeks. If you're going through salt faster than that, the system may be set to over-regenerate or could have a leak, both worth diagnosing.",
    },
    {
      q: "How long does installation take?",
      a: "A straightforward replacement is typically 2–4 hours. New installations that need plumbing rerouting or a power outlet can take half a day.",
    },
    {
      q: "Will soft water damage my plants or lawn?",
      a: "Watering with high-sodium soft water long-term can affect some plants. We can install the softener so it only treats indoor water, leaving exterior hose bibs hard.",
    },
    {
      q: "Can a softener fix iron or sulfur smells?",
      a: "Some softeners handle low levels of iron, but heavy iron or rotten-egg smells usually need a dedicated iron filter or aeration system. We'll test and recommend the right setup.",
    },
  ],
  related: [
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Water Heaters", href: "/services/water-heaters" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Sewer Services", href: "/services/sewer-services" },
  ],
};

export const Route = createFileRoute("/services/plumbing/water-softeners")({
  head: () => ({
    meta: [
      { title: "Seattle Water Softener Repair, Installation & Maintenance, All Phase Plumbing" },
      {
        name: "description",
        content:
          "Seattle water softener repair, installation, and maintenance. Protect your plumbing and appliances from hard water damage.",
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

