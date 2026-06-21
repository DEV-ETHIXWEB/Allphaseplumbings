import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";
import { CustomerQuote } from "@/components/sections/CustomerQuote";

const CONTENT: ServicePageContent = {
  title: "Toilet Installation",
  breadcrumbLabel: "Toilet Installation",
  heroImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1600&q=80",
  introHeading: "Professional Toilet Installation Services",
  introBlocks: [
    {
      paragraphs: [
        "A properly installed toilet keeps your bathroom clean, functional, and free from leaks or water damage. Whether you're replacing an old toilet or installing a new one during a remodel, professional toilet installation helps avoid common problems like leaks at the base, poor flushing, rocking toilets, and sewer gas odors.",
        "Our toilet installation services focus on precision, proper sealing, and long-term reliability. Every toilet is installed, secured, and tested to ensure smooth operation and leak-free performance.",
      ],
    },
    {
      heading: "Professional Toilet Installation Services",
      paragraphs: ["Our toilet installation services include:"],
      list: [
        "New toilet installation",
        "Toilet replacement",
        "Toilet flange inspection and repair",
        "Wax ring and seal installation",
        "Water supply line connection",
        "Leak and flush testing",
      ],
    },
    {
      heading: "New Toilet Installation",
      paragraphs: ["New toilet installation includes:"],
      list: [
        "Inspecting the drain flange",
        "Installing a new wax or rubber seal",
        "Setting and leveling the toilet",
        "Securing the toilet to the floor",
        "Connecting the water supply",
        "Testing flushing and drainage",
      ],
    },
    {
      heading: "Toilet Replacement Services",
      paragraphs: ["Signs you may need toilet replacement include:"],
      list: [
        "Constant running or weak flushing",
        "Cracks in the porcelain",
        "Water leaking around the base",
        "Frequent clogs",
        "Wobbling or rocking toilet",
      ],
    },
    {
      heading: "Toilet Flange Inspection and Repair",
      paragraphs: [
        "The toilet flange connects the toilet to the drain pipe and anchors it to the floor. Our services include:",
      ],
      list: [
        "Inspecting the existing flange",
        "Repairing cracked or corroded flanges",
        "Adjusting flange height if needed",
        "Installing flange repair rings",
      ],
    },
    {
      heading: "Wax Ring and Seal Installation",
      paragraphs: ["Our seal installation includes:"],
      list: [
        "Removing old wax or rubber seals",
        "Installing a new wax or modern rubber seal",
        "Proper toilet positioning to prevent seal damage",
        "Leak testing after installation",
      ],
    },
    {
      heading: "Types of Toilets We Install",
      paragraphs: ["Common toilet installations include:"],
      list: [
        "Standard two-piece toilets",
        "One-piece toilets",
        "Comfort-height toilets",
        "Water-efficient and low-flow toilets",
        "Dual-flush toilets",
      ],
    },
    {
      heading: "Why Professional Toilet Installation Matters",
      paragraphs: ["Benefits of professional toilet installation include:"],
      list: [
        "Reduced risk of leaks",
        "Proper flushing performance",
        "Secure, level installation",
        "Long-term reliability",
        "Peace of mind",
      ],
    },
    {
      heading: "Schedule Your Toilet Installation Service Today",
      paragraphs: [
        "If you need a new toilet installed or an old one replaced, professional installation makes a difference. Our experienced plumbers handle toilet installation with attention to detail and proper sealing.",
        "We provide reliable toilet installation services designed to prevent leaks and ensure smooth operation.",
      ],
    },
  ],
  faqs: [
    {
      q: "How long does toilet installation take?",
      a: "A standard toilet installation typically takes 1-2 hours. If flange repairs or additional plumbing work are needed, it may take somewhat longer. We'll give you an accurate time estimate before beginning.",
    },
    {
      q: "Do I need a plumber to install a toilet?",
      a: "Professional installation is strongly recommended. Improper sealing, flange issues, or incorrect supply line connections can lead to water damage and mold beneath the floor, often not discovered until significant damage has occurred.",
    },
    {
      q: "What type of toilet should I choose?",
      a: "The best toilet depends on your bathroom layout, comfort preferences, and water efficiency goals. We can help you select the right model, whether standard two-piece, comfort-height, low-flow, or dual-flush.",
    },
    {
      q: "What is a toilet flange and why does it matter?",
      a: "The toilet flange is the fitting that connects the toilet to the drain pipe and anchors it to the floor. A damaged or improperly sized flange is one of the most common causes of toilet leaks and rocking.",
    },
    {
      q: "How do I know if my wax ring needs to be replaced?",
      a: "Signs include water pooling around the base of the toilet, sewage odors in the bathroom, or a toilet that rocks slightly. Any of these symptoms warrant a professional inspection.",
    },
  ],
  related: [
    { label: "Toilets", href: "/services/toilets" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "Water Lines", href: "/services/water-lines" },
  ],
};

export const Route = createFileRoute("/services/toilet-installation")({
  head: () => ({
    meta: [
      { title: "Professional Toilet Installation Services | All Phase Plumbing" },
      {
        name: "description",
        content:
          "Expert toilet installation and replacement. Proper sealing, secure fitting, and leak testing. Licensed plumbers. Call (206) 772-6077.",
      },
      { property: "og:title", content: "Toilet Installation | All Phase Plumbing" },
      {
        property: "og:description",
        content:
          "Professional toilet installation services, reliable, leak-free, and built to last.",
      },
    ],
  }),
  component: () => (
    <PageShell>
      <ServicePageTemplate content={CONTENT} />
      <HowItWorks />
      <WhyChooseUs />
      <CustomerQuote />
    </PageShell>
  ),
});

