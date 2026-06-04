import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";
import { CustomerQuote } from "@/components/sections/CustomerQuote";

const CONTENT: ServicePageContent = {
  title: "Seattle Drain Cleaning",
  breadcrumbLabel: "Drain Cleaning",
  heroImage: "https://images.unsplash.com/photo-1654440122140-f1fc995ddb34?w=1600&q=80",
  introHeading: "Seattle Drain Cleaning",
  introBlocks: [
    {
      paragraphs: [
        "When your drains slow down or back up, trust All Phase Plumbing, Seattle's local drain cleaning experts, to restore smooth, consistent flow. As a leading drain cleaning company in Seattle, we provide complete services to remove clogs, eliminate buildup, and prevent future blockages.",
        "From kitchen sinks and bathroom drains to floor drains and main sewer lines, our licensed plumbers use professional-grade tools like augers, hydro jetting equipment, and camera inspection technology to accurately diagnose and clean your plumbing system. No matter the clog or cause, we'll get your drains running clear again.",
        "Call Us: (206) 772-6077 or schedule your Seattle drain cleaning online today!",
      ],
    },
    {
      heading: "Professional Drain Cleaning in Seattle",
      paragraphs: [
        "If your sinks, showers, or tubs are draining slowly, it's time for professional drain cleaning in Seattle. Over time, grease, soap, and debris can build up inside your pipes, restricting water flow and causing recurring clogs.",
        "Common signs you need drain cleaning include:",
      ],
      list: [
        "Slow-draining sinks, tubs, or showers",
        "Gurgling sounds from drains or toilets",
        "Foul odors rising from drains",
        "Water backing up into sinks or tubs",
        "Frequent clogs that DIY fixes can't solve",
      ],
    },
    {
      heading: "Seattle Hydro Jetting Services",
      paragraphs: [
        "For severe or recurring blockages, Seattle hydro jetting offers a powerful, long-term solution. Using high-pressure water streams, our hydro jetting service cuts through even the toughest obstructions, like grease buildup, scale, and tree roots, restoring your pipes to like-new condition.",
        "Safe for most plumbing systems and highly effective, hydro jet drain cleaning is ideal for both residential and commercial properties. If plungers and snakes can't clear your drains, our expert hydro jetting service can.",
      ],
    },
    {
      heading: "Seattle Sewer Line Cleaning",
      paragraphs: [
        "If multiple drains are backing up or slow to clear, the problem may be deeper in your system. Our Seattle sewer line cleaning services target clogs, buildup, and root intrusions in your home's main sewer line.",
        "We use advanced camera inspection tools to locate the source of the problem and professional cleaning equipment to clear your lines efficiently, helping you avoid costly sewer backups and property damage.",
        "Whether it's preventive maintenance or an urgent blockage, All Phase Plumbing ensures your sewer system flows smoothly again.",
      ],
    },
    {
      heading: "Seattle Sewer Inspection",
      paragraphs: [
        "Sometimes, the cause of drain or sewer issues isn't visible without professional inspection. That's where our Seattle sewer inspection service comes in. Using high-resolution video cameras, we inspect your sewer lines to identify leaks, cracks, or root intrusion without unnecessary digging.",
        "This accurate, non-invasive service gives you a full understanding of your plumbing's condition so you can make informed repair or replacement decisions.",
      ],
    },
    {
      heading: "Why Professional Drain Cleaning Matters",
      paragraphs: [
        "Clogged drains can cause more than inconvenience, they can lead to leaks, odors, and costly water damage. With professional drain cleaning in Seattle, you'll protect your pipes, prevent emergencies, and improve your plumbing system's efficiency.",
        "At All Phase Plumbing, our expert technicians provide long-lasting solutions using eco-friendly, proven methods. Whether it's a minor clog or a major blockage, we'll make sure your plumbing runs like it should.",
      ],
    },
    {
      heading: "Schedule Your Seattle Drain Cleaning Today",
      paragraphs: [
        "Don't let slow drains or backups disrupt your day. Trust the experts at All Phase Plumbing for fast, effective, and affordable drain cleaning in Seattle. We're available for same-day service, routine maintenance, and emergency drain repairs, always with upfront pricing and 100% satisfaction guaranteed.",
        "Call Us: (206) 772-6077 or book online today to schedule your Seattle drain cleaning service and keep your water flowing freely.",
      ],
    },
  ],
  faqs: [
    {
      q: "Why does my drain keep clogging?",
      a: "Frequent clogs usually mean there's buildup inside your pipes from grease, soap, hair, or minerals. In some cases, tree roots or damaged sewer lines can be the cause. Professional cleaning removes buildup and identifies deeper issues before they become costly repairs.",
    },
    {
      q: "How often should I get my drains professionally cleaned?",
      a: "For most homes, a professional drain cleaning every 18–24 months prevents buildup and keeps your plumbing running efficiently. Homes with older pipes, large households, or heavy cooking may benefit from annual cleaning. Commercial kitchens and restaurants should consider every 3–6 months.",
    },
    {
      q: "Can I use store-bought drain cleaners instead?",
      a: "We don't recommend chemical drain cleaners. They can corrode older pipes, harm septic systems, and rarely fix the root cause of recurring clogs. A one-time professional cleaning is safer for your pipes, more effective, and longer-lasting.",
    },
    {
      q: "What is hydro jetting, and when is it needed?",
      a: "Hydro jetting uses high-pressure water streams (up to 4,000 PSI) to scour the inside of your pipes clean, removing grease, scale, and even tree roots. It's the best solution for severe or recurring blockages where snaking alone isn't enough. It's safe for most modern plumbing systems.",
    },
    {
      q: "How do I know if I need sewer line cleaning instead of regular drain cleaning?",
      a: "If multiple drains in your home are slow or backing up at the same time, the problem is likely in the main sewer line rather than individual drain lines. Foul odors, gurgling toilets, and water backing up in the lowest drains are also signs. We use camera inspection to pinpoint the exact issue.",
    },
    {
      q: "Do you offer emergency drain cleaning services in Seattle?",
      a: "Yes, All Phase Plumbing is available 24/7 for emergency drain cleaning throughout the Greater Seattle area. A backed-up sewer or flooded floor can't wait. Call us anytime at (206) 772-6077 and we'll dispatch a technician right away.",
    },
  ],
  related: [
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Water Heaters", href: "/services/water-heaters" },
    { label: "Sewer Services", href: "/services/sewer-services" },
    { label: "Commercial", href: "/services" },
  ],
};

export const Route = createFileRoute("/services/drain-cleaning")({
  head: () => ({
    meta: [
      { title: "Seattle Drain Cleaning, Hydro Jetting & Sewer Inspection | All Phase Plumbing" },
      {
        name: "description",
        content:
          "Seattle's trusted drain cleaning experts. Hydro jetting, sewer line cleaning, and camera inspection by licensed plumbers. Same-day service, call (206) 772-6077.",
      },
      { property: "og:title", content: "Seattle Drain Cleaning | All Phase Plumbing" },
      {
        property: "og:description",
        content: "Hydro jetting, sewer line cleaning & camera inspection across Greater Seattle.",
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
