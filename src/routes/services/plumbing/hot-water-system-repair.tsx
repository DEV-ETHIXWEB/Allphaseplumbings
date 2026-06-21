import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";

const CONTENT: ServicePageContent = {
  title: "Hot Water System Repair",
  breadcrumbLabel: "Hot Water System Repair",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1585351733588-d2f7e1066bf6?w=1600&q=80",
  introHeading: "Hot Water System Repair",
  introBlocks: [
    {
      paragraphs: [
        "A failing hot water system can disrupt your entire routine. From cold showers to inconsistent water temperature and strange noises from the tank, hot water problems often signal an issue that needs professional attention. Prompt hot water system repair helps restore comfort, prevent further damage, and extend the life of your unit.",
        "Hot water systems experience wear over time due to heat, pressure, mineral buildup, and regular use. Ignoring early warning signs can lead to higher energy bills, water damage, or complete system failure. Professional repair ensures the system is diagnosed correctly and fixed safely.",
        "Our hot water system repair services focus on accurate troubleshooting, reliable repairs, and long-term performance.",
        "Call (206) 772-6077 to schedule hot water system repair.",
      ],
    },
    {
      heading: "Professional Hot Water System Repair Services",
      paragraphs: [
        "Hot water systems involve electrical, gas, and plumbing components that must work together properly. When one part fails, it can affect the entire system.",
      ],
      list: [
        "Diagnosing heating issues",
        "Repairing faulty components",
        "Fixing leaks and pressure problems",
        "Restoring consistent hot water",
        "Improving system efficiency",
      ],
    },
    {
      paragraphs: [
        "We work with both residential and light commercial hot water systems and repair issues safely and efficiently.",
      ],
    },
    {
      heading: "Common Hot Water System Problems",
      paragraphs: [
        "Hot water systems rarely stop working without warning. Most issues develop gradually and worsen over time. Common signs you need hot water system repair include:",
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
      // Trailing paragraph below
    },
    {
      paragraphs: [
        "Addressing these problems early can prevent costly repairs or full replacement.",
      ],
    },
    {
      heading: "No Hot Water or Inconsistent Temperature",
      paragraphs: [
        "A complete lack of hot water or fluctuating temperatures usually points to heating component failure or control issues. Possible causes include:",
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
        "Leaks can occur at fittings, valves, or from the tank itself. Even small leaks can cause water damage and reduce system efficiency. Leak repair services include:",
      ],
      list: [
        "Identifying the leak source",
        "Repairing valves or connections",
        "Replacing damaged components",
        "Testing system pressure",
      ],
    },
    {
      heading: "Strange Noises from the Hot Water System",
      paragraphs: [
        "Banging, popping, or rumbling noises often indicate sediment buildup inside the tank. Over time, minerals settle at the bottom and interfere with heating. Our repair process may include:",
      ],
      list: [
        "Flushing sediment buildup",
        "Inspecting heating elements",
        "Restoring normal operation",
      ],
    },
    {
      heading: "Gas Hot Water System Repair",
      paragraphs: [
        "Gas hot water systems rely on burners, gas valves, and ventilation to operate safely. When these components fail, professional repair is essential.",
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
        "Electric systems depend on heating elements and thermostats to heat water effectively. Common electric hot water repairs include:",
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
        "Call (206) 772-6077 to schedule repair today.",
      ],
    },
  ],
  faqs: [
    {
      q: "How long should a hot water tank last?",
      a: "Most standard tank-style water heaters last 8–12 years. Tankless units can last 20+ years with proper maintenance. If yours is near or past these ranges, plan for replacement rather than another repair.",
    },
    {
      q: "Is no hot water always the heating element?",
      a: "Not always. On gas units it's often the pilot, igniter, or thermocouple. On electric, it's usually a heating element or thermostat. We diagnose first, then repair only what's actually failed.",
    },
    {
      q: "Why does my hot water smell metallic or look rusty?",
      a: "Usually corrosion inside the tank or the anode rod nearing end of life. A new anode rod is cheap and can buy you years; a corroded tank itself usually needs replacement.",
    },
    {
      q: "Can sediment really damage my water heater?",
      a: "Yes, it insulates the burner from the water, forcing the unit to run longer, which overheats components. An annual flush keeps things efficient and extends the unit's life.",
    },
    {
      q: "Do you handle gas water heaters?",
      a: "Yes, burner, valve, venting, and safety inspections included. All repairs are done to code by licensed plumbers.",
    },
  ],
  related: [
    { label: "Water Heaters", href: "/services/water-heaters" },
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Sewer Services", href: "/services/sewer-services" },
  ],
};

export const Route = createFileRoute("/services/plumbing/hot-water-system-repair")({
  head: () => ({
    meta: [
      { title: "Hot Water System Repair Seattle, All Phase Plumbing" },
      {
        name: "description",
        content:
          "Seattle hot water system repair, gas and electric tank units, leaks, sediment, no-hot-water diagnostics. Same-day service.",
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

