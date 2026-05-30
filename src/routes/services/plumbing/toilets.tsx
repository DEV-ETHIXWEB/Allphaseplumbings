import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";

const CONTENT: ServicePageContent = {
  title: "Toilets",
  breadcrumbLabel: "Toilets",
  parentBreadcrumb: { label: "Plumbing", href: "/services/plumbing" },
  heroImage: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=1600&q=80",
  introHeading: "Seattle Toilets",
  introBlocks: [
    {
      paragraphs: [
        "Seattle Toilet Repair, Replacement, and Installation are among the most requested plumbing services at All Phase Plumbing. Whether your toilet is leaking, running nonstop, or simply outdated, our licensed plumbers provide quick and reliable solutions. From simple repairs to complete replacements and new installations, we keep your bathroom working efficiently and comfortably.",
        "When you choose us, you're choosing expert service, quality workmanship, and a commitment to your satisfaction every time.",
        "Call (206) 772-6077 or book online to schedule your Seattle plumbing service today!",
      ],
    },
    {
      heading: "Seattle Toilet Repair",
      paragraphs: [
        "Toilet issues can quickly interrupt your day, but our experienced plumbers deliver fast and effective toilet repair in Seattle to restore full function. Whether you're dealing with a weak flush, leak, or persistent clog, we use high-quality parts and professional repair methods to fix the problem for good.",
      ],
    },
    {
      heading: "Common Toilet Repairs We Handle:",
      list: [
        "Constantly running toilets",
        "Weak or incomplete flushing",
        "Leaking seals or base leaks",
        "Refill and flapper valve replacements",
        "Tank or bowl cracks",
        "Clogged or slow-draining toilets",
      ],
      paragraphs: [
        "Our team ensures your toilet runs efficiently and reliably, saving you time, water, and money.",
      ],
    },
    {
      heading: "Seattle Toilet Replacement",
      paragraphs: [
        "If your toilet is outdated, inefficient, or beyond repair, our Seattle Toilet Replacement service can help. We provide a wide selection of modern, water-saving toilets that enhance comfort and reduce utility costs.",
      ],
      list: [
        "Remove your old fixture safely",
        "Inspect and prepare the drain connection",
        "Professionally install your new toilet",
        "Ensure leak-free operation and proper water flow",
      ],
    },
    {
      paragraphs: [
        "We take care of everything from start to finish, making the process stress-free and efficient. Upgrade to a new model today and enjoy improved performance and style in your bathroom.",
      ],
    },
    {
      heading: "Seattle Toilet Installation",
      paragraphs: [
        "Planning a remodel or new construction project? We offer Seattle Toilet Installation services for homeowners and contractors alike. Our expert plumbers follow local building codes and best practices to ensure your installation is secure, properly sealed, and long-lasting.",
      ],
      list: [
        "Standard floor-mounted models",
        "Wall-hung toilets",
        "Dual-flush and low-flow designs",
        "Smart and bidet-integrated toilets",
      ],
      // Note: the trailing paragraph below comes after the list intentionally
    },
    {
      paragraphs: [
        "With All Phase Plumbing, you can count on a professional installation that ensures comfort and reliability from day one.",
      ],
    },
    {
      heading: "Seattle Toilet Plumber",
      paragraphs: [
        "When you need reliable plumbing assistance, turn to a Seattle Toilet Plumber from All Phase Plumbing. Our licensed experts are equipped to handle any issue — whether it's a simple repair, emergency service, or full replacement. We pride ourselves on fast response times, transparent pricing, and guaranteed satisfaction.",
        "If your toilet is causing problems or you're planning an upgrade, contact us today for dependable solutions from Seattle's trusted plumbing professionals.",
      ],
    },
    {
      heading: 'Need "Seattle Toilet Repair Near Me"? Call the Experts!',
      paragraphs: [
        'Searching for "Seattle toilet repair near me"? All Phase Plumbing is your local team for expert toilet repair, replacement, and installation throughout the Seattle area. Whether it\'s a leak, clog, or complete upgrade, we\'re ready to help fast.',
        "Call (206) 772-6077 today or schedule online for prompt, professional toilet service you can count on.",
      ],
    },
  ],
  faqs: [
    { q: "Why does my toilet keep running?", a: "Usually a worn flapper, fill valve, or chain length issue. These are inexpensive parts but a slow refill leak can waste hundreds of gallons a month. We replace the failed parts and adjust the tank to stop the running for good." },
    { q: "How do I know if I need a new toilet vs. a repair?", a: "If you've had two or more repairs in a year, the tank or bowl is cracked, or it's a high-water-use model from the 90s, replacement usually pays for itself in water savings within a few years." },
    { q: "Do you install bidet and smart toilets?", a: "Yes. We handle smart and bidet-integrated toilets including the additional water supply and electrical considerations they often need." },
    { q: "What causes a toilet to leak around the base?", a: "Almost always a failed wax ring or loose flange bolts. Don't wait — water leaking under the toilet can rot the subfloor. We reset the toilet with a new seal and check the flange for damage." },
    { q: "Can you replace a toilet during a bathroom remodel?", a: "Absolutely. We coordinate with your remodel timeline so the new toilet goes in after flooring and is ready when the rest of the bathroom is finished." },
  ],
  related: [
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Water Heaters", href: "/services/water-heaters" },
    { label: "Sewer Services", href: "/services/sewer-services" },
  ],
};

export const Route = createFileRoute("/services/plumbing/toilets")({
  head: () => ({
    meta: [
      { title: "Seattle Toilet Repair, Replacement & Installation — All Phase Plumbing" },
      { name: "description", content: "Seattle toilet repair, replacement, and installation. Licensed plumbers, modern fixtures, fast service." },
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
