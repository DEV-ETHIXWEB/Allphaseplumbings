import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";

const CONTENT: ServicePageContent = {
  title: "Commercial Drain Cleaning",
  breadcrumbLabel: "Commercial Drain Cleaning",
  parentBreadcrumb: { label: "Commercial", href: "/commercial" },
  heroImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1600&q=80",
  introHeading: "Seattle Commercial Drain Cleaning",
  introBlocks: [
    {
      paragraphs: [
        "Keeping your business running smoothly starts with clean, efficient drains. At All Phase Plumbing, we provide professional Seattle commercial drain cleaning services designed to prevent costly disruptions and maintain the flow of your plumbing systems. Our expert plumbers understand that clogged or slow drains can impact your business operations, customer experience, and overall productivity. That's why we offer reliable, high-performance drain cleaning solutions for restaurants, offices, retail spaces, and industrial facilities.",
        "Using advanced tools and techniques, we handle everything from stubborn grease buildup to deep-seated blockages. Our commercial hydro jetting service uses powerful, high-pressure water to eliminate grease, soap residue, and debris that traditional snaking can't remove. We also offer commercial drain camera inspection to accurately detect hidden issues like cracks, root intrusions, or collapsed pipes. When you choose All Phase Plumbing for commercial drain cleaning in Seattle, you're choosing efficiency, precision, and long-term protection for your plumbing system.",
        "Call (206) 772-6077 or book online to schedule your Seattle plumbing service today!",
      ],
    },
    {
      heading: "Seattle Commercial Drain Cleaning Services",
      paragraphs: [
        "For Seattle businesses, clean and properly functioning drains are essential to maintaining health, safety, and productivity. At All Phase Plumbing, we take a proactive approach to drain maintenance to help you avoid plumbing emergencies and unsanitary conditions. Our Seattle commercial drain cleaning services are customized to meet the specific needs of your facility — whether you operate a restaurant kitchen with heavy grease flow, an office building with multiple restrooms, or a retail store that depends on reliable drainage.",
        "We use advanced camera inspection tools to diagnose problems at their source and provide targeted cleaning that fully restores your plumbing's performance. When buildup or blockages threaten to slow your operations, our commercial hydro jetting in Seattle clears out pipes fast, helping you avoid downtime and expensive repairs. Every service is performed with minimal disruption to your business, ensuring you can stay open and productive while we get your plumbing back on track.",
      ],
    },
    {
      heading: "Seattle Commercial Hydro Jetting",
      paragraphs: [
        "When clogs or backups become a recurring problem, Seattle commercial hydro jetting offers a safe and effective solution. This high-pressure water cleaning process removes years of accumulated grease, mineral scale, soap scum, and other debris from inside your drain lines. Unlike traditional snaking, hydro jetting cleans the entire diameter of the pipe, restoring smooth flow and preventing future clogs.",
        "Businesses such as restaurants, hotels, apartment complexes, and industrial facilities benefit greatly from hydro jetting because it's both preventative and corrective. By keeping your pipes clean and free of buildup, you reduce the risk of slow drains, foul odors, and costly shutdowns. At All Phase Plumbing, our experienced team provides thorough hydro jetting services throughout Seattle to keep your drainage systems performing at their best.",
      ],
    },
    {
      heading: "Seattle Drain Camera Inspection",
      paragraphs: [
        "Identifying the root cause of a drain problem is just as important as cleaning it, and that's where our Seattle drain camera inspection service makes a difference. Using state-of-the-art video technology, our plumbers can visually inspect the inside of your commercial drain lines to locate cracks, blockages, or other forms of damage. This precise, non-invasive method helps us determine exactly what's causing your drainage issues and ensures that we apply the right repair or cleaning solution.",
        "By using drain camera inspections before and after cleaning, we can guarantee lasting results and help you avoid repeat problems. It's one of the most accurate and cost-effective ways to protect your plumbing system and keep your Seattle business running without interruption.",
      ],
    },
    {
      heading: "Signs You Need Commercial Drain Cleaning in Seattle",
      paragraphs: [
        "If your drains are moving slowly, making gurgling noises, or producing unpleasant odors, it's time to schedule commercial drain cleaning in Seattle. Recurring clogs in sinks, toilets, or floor drains can be an early sign of buildup or blockages deeper in the line. Ignoring these warning signs can lead to larger problems like backups, leaks, or even pipe bursts. At All Phase Plumbing, we provide professional cleaning and inspection services to stop issues early and restore full flow to your drainage system.",
      ],
    },
    {
      heading: "Schedule Your Seattle Commercial Drain Cleaning Today",
      paragraphs: [
        "Don't let clogged drains, foul odors, or hidden plumbing problems slow down your business. With Seattle commercial drain cleaning from All Phase Plumbing, you get a complete solution that includes routine maintenance, hydro jetting, and camera inspections. Our licensed plumbers work quickly, efficiently, and with minimal disruption to your daily operations. Whether you're dealing with a current drainage issue or want to prevent future problems, we're here to help. Contact All Phase Plumbing today to schedule your commercial drain cleaning in Seattle and keep your plumbing system clean, efficient, and problem-free for the long term.",
      ],
    },
  ],
  faqs: [
    {
      q: "How often should commercial drains be cleaned in Seattle?",
      a: "For most Seattle businesses, it's recommended to schedule professional commercial drain cleaning at least once or twice a year. Restaurants, hotels, and other high-use facilities may benefit from quarterly cleanings to prevent grease and debris buildup. Regular maintenance helps avoid costly plumbing emergencies and keeps operations running smoothly. Call (206) 772-6077.",
    },
    {
      q: "What are the signs that my business needs commercial drain cleaning?",
      a: "Slow-moving drains, gurgling noises from sinks or toilets, foul odors, recurring clogs, and water backing up in floor drains are all clear signs your commercial drains need attention. The earlier you address these issues, the lower the chance they'll turn into a full backup or pipe failure.",
    },
    {
      q: "What is hydro jetting, and how does it help my commercial drains?",
      a: "Hydro jetting uses high-pressure water (up to 4,000 PSI) to scour the inside of your drain pipes. Unlike snaking, which only punches a hole through a clog, hydro jetting cleans the entire diameter of the pipe — removing grease, mineral buildup, and debris that cause repeat clogs.",
    },
    {
      q: "What is the difference between drain snaking and hydro jetting?",
      a: "Snaking is a mechanical method that breaks through a single blockage with a rotating cable. Hydro jetting uses pressurized water to clean the full length and diameter of the pipe. Snaking is great for quick clog removal; hydro jetting is the gold standard for thorough cleaning and prevention.",
    },
    {
      q: "Can hydro jetting damage my plumbing system?",
      a: "When performed by a trained, licensed plumber, hydro jetting is safe for most modern plumbing systems. We always inspect your pipes with a camera before jetting to confirm they can handle the pressure and to identify any damage that needs repair first.",
    },
    {
      q: "Do you offer emergency commercial drain cleaning in Seattle?",
      a: "Yes. We provide 24/7 emergency commercial drain cleaning services across the Greater Seattle area to get your business back up and running as quickly as possible.",
    },
  ],
  related: [
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Commercial", href: "/commercial" },
    { label: "Sewer Services", href: "/services/sewer-services" },
    { label: "Plumbing", href: "/services/plumbing" },
  ],
};

export const Route = createFileRoute("/commercial/drain-cleaning")({
  head: () => ({
    meta: [
      { title: "Commercial Drain Cleaning — All Phase Plumbing Seattle" },
      {
        name: "description",
        content:
          "Professional commercial drain cleaning in Seattle — hydro jetting, camera inspection, and grease line maintenance for restaurants, offices, and industrial facilities.",
      },
      { property: "og:title", content: "Commercial Drain Cleaning — All Phase Plumbing" },
      {
        property: "og:description",
        content: "Hydro jetting and camera inspection for Seattle businesses.",
      },
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
