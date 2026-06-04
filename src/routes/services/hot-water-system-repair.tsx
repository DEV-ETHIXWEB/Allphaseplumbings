import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";
import { CustomerQuote } from "@/components/sections/CustomerQuote";

const CONTENT: ServicePageContent = {
  title: "Hot Water System Repair",
  breadcrumbLabel: "Hot Water System Repair",
  heroImage: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1600&q=80",
  introHeading: "Hot Water System Repair Services",
  introBlocks: [
    {
      paragraphs: [
        "A failing hot water system can disrupt your entire routine. From cold showers to inconsistent water temperature and strange noises from the tank, hot water problems often signal an issue that needs professional attention.",
        "Hot water systems experience wear over time due to heat, pressure, mineral buildup, and regular use. Our hot water system repair services focus on accurate troubleshooting, reliable repairs, and long-term performance.",
      ],
    },
    {
      heading: "Professional Hot Water System Repair Services",
      list: [
        "Diagnosing heating issues",
        "Repairing faulty components",
        "Fixing leaks and pressure problems",
        "Restoring consistent hot water",
        "Improving system efficiency",
      ],
      paragraphs: [
        "We work with both residential and light commercial hot water systems and repair issues safely and efficiently.",
      ],
    },
    {
      heading: "Common Hot Water System Problems",
      paragraphs: [
        "Common signs you need hot water system repair include:",
      ],
      list: [
        "No hot water",
        "Lukewarm or inconsistent water temperature",
        "Hot water running out quickly",
        "Strange noises from the tank or unit",
        "Water leaking around the system",
        "Rust-colored or cloudy water",
        "Rising energy bills",
      ],
    },
    {
      heading: "No Hot Water or Inconsistent Temperature",
      paragraphs: [
        "A complete lack of hot water or fluctuating temperatures usually points to heating component failure. Possible causes include:",
      ],
      list: [
        "Failed heating elements",
        "Faulty thermostat",
        "Gas burner or ignition problems",
        "Electrical supply issues",
      ],
    },
    {
      heading: "Hot Water System Leaks",
      paragraphs: [
        "Leaks can occur at fittings, valves, or from the tank itself. Leak repair services include:",
      ],
      list: [
        "Identifying the leak source",
        "Repairing valves or connections",
        "Replacing damaged components",
        "Testing system pressure",
      ],
    },
    {
      heading: "Gas Hot Water System Repair",
      paragraphs: [
        "Gas hot water systems rely on burners, gas valves, and ventilation to operate safely. Gas system repair services include:",
      ],
      list: [
        "Burner and pilot light repair",
        "Gas valve inspection",
        "Thermostat repair",
        "Venting and safety checks",
      ],
    },
    {
      heading: "Electric Hot Water System Repair",
      paragraphs: [
        "Common electric hot water repairs include:",
      ],
      list: [
        "Heating element replacement",
        "Thermostat repair or adjustment",
        "Electrical connection inspection",
        "Circuit testing",
      ],
    },
    {
      heading: "Schedule Hot Water System Repair Today",
      paragraphs: [
        "If your hot water system isn't performing properly, professional repair can restore comfort and prevent bigger problems. Our experienced plumbers provide reliable hot water system repair using proven methods and quality parts.",
        "We're committed to restoring your hot water quickly and safely.",
      ],
    },
  ],
  faqs: [
    {
      q: "Why do I have no hot water?",
      a: "No hot water is commonly caused by a failed heating element (electric systems), a faulty gas burner or pilot light (gas systems), a tripped circuit breaker, or a failed thermostat. Call us for fast diagnosis and repair.",
    },
    {
      q: "How long do hot water systems last?",
      a: "Traditional tank water heaters typically last 8-12 years. Tankless units can last 20+ years with proper maintenance. If your system is nearing the end of its lifespan, repairs may not be cost-effective compared to replacement.",
    },
    {
      q: "Is it normal for a hot water heater to make noise?",
      a: "Popping, rumbling, or banging sounds usually indicate sediment buildup at the bottom of the tank. Flushing the tank can help, but if noises persist, a professional inspection is recommended.",
    },
    {
      q: "Can I repair a leaking water heater?",
      a: "Small leaks from fittings or valves can often be repaired. However, leaks from the tank itself usually mean the tank has corroded through and replacement is necessary. We'll assess which option is right for you.",
    },
    {
      q: "How do I know when to repair vs. replace my hot water system?",
      a: "If your system is under 8 years old and the repair cost is under half the cost of a new unit, repair is usually the better choice. For older systems with recurring problems, replacement often provides better long-term value.",
    },
  ],
  related: [
    { label: "Water Heaters", href: "/services/water-heaters" },
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Gas Line Repair", href: "/services/gas-line-repair" },
    { label: "Pipe Repair", href: "/services/pipe-repair" },
  ],
};

export const Route = createFileRoute("/services/hot-water-system-repair")({
  head: () => ({
    meta: [
      { title: "Hot Water System Repair Services | All Phase Plumbing" },
      {
        name: "description",
        content:
          "Professional hot water system repair for gas and electric units. Fast diagnosis, reliable repairs, upfront pricing. Call (206) 772-6077.",
      },
      { property: "og:title", content: "Hot Water System Repair | All Phase Plumbing" },
      {
        property: "og:description",
        content: "Expert hot water system repair, gas and electric, throughout Greater Seattle.",
      },
    ],
  }),
  component: () => (
    <PageShell>
      <ServicePageTemplate content={CONTENT} />
      <WhyUs />
      <CustomerQuote />
    </PageShell>
  ),
});
