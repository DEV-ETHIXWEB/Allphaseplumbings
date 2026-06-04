import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { WhyUs } from "@/components/sections/WhyUs";
import { CustomerQuote } from "@/components/sections/CustomerQuote";
import { PlumbingServicesGrid } from "@/components/sections/PlumbingServicesGrid";

const CONTENT: ServicePageContent = {
  title: "Plumbing",
  breadcrumbLabel: "Plumbing",
  heroImage: "https://images.unsplash.com/photo-1542013936693-884638332954?w=1600&q=80",
  introHeading: "Seattle's Trusted Plumbing Experts: All Phase Plumbing",
  introBlocks: [
    {
      paragraphs: [
        "When you need a reliable Seattle plumber, trust the experts at All Phase Plumbing to deliver exceptional results fast. Our skilled plumbers handle everything from emergency plumbing repairs and drain cleaning to water heater installations and sewer replacements with professionalism, precision, and care.",
        "As one of the top-rated plumbing companies in Seattle, we're proud to serve homeowners and businesses throughout the Seattle metro area. Whether it's a leaking faucet, clogged drain, or a full system installation, we're committed to providing honest, upfront service and long-lasting results.",
      ],
    },
    {
      heading: "Comprehensive Seattle Plumbing Services",
      paragraphs: [
        "At All Phase Plumbing, we're a full-service plumbing company offering a complete range of residential and commercial plumbing solutions across Seattle and nearby areas. From quick repairs to full replacements, we handle every job with expertise and efficiency.",
      ],
    },
    {
      heading: "Our Seattle plumbing services include:",
      list: [
        "Drain cleaning & hydro jetting",
        "Emergency plumbing repairs",
        "Garbage disposal installation & repair",
        "Whole-home repiping",
        "Sewer repair & replacement",
        "Sump pump installation & maintenance",
        "Tankless water heater installation",
        "Toilet repair & replacement",
        "Traditional & tankless water heaters",
        "Water line installation & leak detection",
        "Water softeners & filtration systems",
      ],
      paragraphs: [
        "No matter what plumbing challenge you're facing, All Phase Plumbing has the tools, training, and technology to fix it right the first time.",
      ],
    },
    {
      heading: "Seattle Plumbing Repair",
      paragraphs: [
        "Need fast and reliable plumbing repair in Seattle? Our licensed plumbers provide expert diagnostics and durable solutions for all types of residential plumbing issues. From leaky pipes and dripping faucets to damaged water heaters and backed-up sewer lines, we've got you covered.",
      ],
    },
    {
      heading: "Seattle Plumbing Replacement & Installation",
      paragraphs: [
        "When it's time to upgrade or replace a plumbing fixture, system, or pipe, our certified team ensures a seamless installation every time. We specialize in:",
      ],
      list: [
        "Water heater replacement",
        "Sewer and drain line replacement",
        "Faucet, sink, and toilet upgrades",
        "Whole-house pipe replacement",
      ],
    },
    {
      heading: "24/7 Emergency Plumbers in Seattle",
      paragraphs: [
        "Plumbing disasters don't wait for business hours, neither do we. All Phase Plumbing offers 24/7 emergency plumbing in Seattle for burst pipes, flooding, major leaks, or clogged drains.",
        "When every minute counts, our local plumbers respond quickly to minimize water damage and restore your system's function. Call us anytime for immediate assistance from our emergency plumbing team.",
      ],
    },
    {
      heading: "Plumbing Maintenance in Seattle",
      paragraphs: [
        "Prevent costly plumbing problems with routine plumbing maintenance from All Phase Plumbing. Our Seattle maintenance services include system inspections, drain cleaning, leak detection, and pressure checks to help you:",
      ],
      list: [
        "Avoid water damage",
        "Reduce repair costs",
        "Improve efficiency",
        "Extend your plumbing's lifespan",
      ],
    },
    {
      heading: "Seattle Plumber Near Me",
      paragraphs: [
        "Searching for a \"Seattle plumber near me\"? Look no further than All Phase Plumbing. We're a locally owned and operated plumbing company dedicated to serving Seattle's residential neighborhoods and surrounding communities with honesty, transparency, and quality workmanship.",
        "Our licensed and insured Seattle plumbers provide same-day service and flexible scheduling so you can get help when you need it most.",
      ],
    },
    {
      heading: "Contact Seattle's Most Trusted Plumbers",
      paragraphs: [
        "Don't let plumbing issues disrupt your day. Whether it's a small repair or a major replacement, All Phase Plumbing delivers reliable, affordable plumbing services throughout Seattle and nearby areas.",
        "Call or schedule online to book your appointment today and experience the All Phase difference.",
        "All Phase Plumbing: Seattle's Go-To Experts for Plumbing Repairs, Maintenance & Installation.",
      ],
    },
  ],
  faqs: [
    {
      q: "Why does my garbage disposal smell?",
      a: "It's often caused by trapped food particles or poor drainage. Try flushing it with hot water and a mix of vinegar and baking soda. If the odor persists, call All Phase Plumbing for a professional garbage disposal cleaning or repair service.",
    },
    {
      q: "Why is my water pressure low?",
      a: "Low water pressure can be caused by clogged pipes, leaks, mineral buildup, or issues with the municipal supply. Our plumbers can diagnose the root cause and restore proper pressure throughout your home.",
    },
    {
      q: "What should I do if my toilet keeps running?",
      a: "A constantly running toilet usually points to a worn flapper, faulty fill valve, or float issue. These are inexpensive parts to replace, but we'll inspect and fix the right component to stop the water waste.",
    },
    {
      q: "Why do my drains keep clogging?",
      a: "Repeat clogs often mean buildup deeper in the line, grease, soap scum, or tree roots. We use hydro-jetting and camera inspection to clear and verify the line, not just snake the surface.",
    },
    {
      q: "How can I prevent my pipes from freezing in winter?",
      a: "Insulate exposed pipes, keep your home above 55°F, let faucets drip during hard freezes, and disconnect outdoor hoses before winter. We also offer pipe insulation and freeze-prevention services.",
    },
    {
      q: "Why is my water heater making noise?",
      a: "Popping or rumbling typically means sediment buildup at the tank bottom. Flushing the tank annually helps; if noises persist, the heating element or tank itself may need service or replacement.",
    },
  ],
  related: [
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Water Heaters", href: "/services/water-heaters" },
    { label: "Sewer Services", href: "/services/sewer-services" },
    { label: "Commercial", href: "/services" },
  ],
};

export const Route = createFileRoute("/services/plumbing/")({
  head: () => ({
    meta: [
      { title: "Plumbing Repair Seattle, All Phase Plumbing" },
      {
        name: "description",
        content:
          "Leaks, fixtures, pipes, water pressure, diagnosed and repaired by licensed Seattle plumbers.",
      },
      { property: "og:title", content: "Plumbing Repair Seattle" },
      { property: "og:description", content: "Licensed plumbing repair across Greater Seattle." },
    ],
  }),
  component: () => (
    <PageShell>
      <ServicePageTemplate content={CONTENT} />
      <PlumbingServicesGrid />
      <WhyUs />
      <CustomerQuote />
    </PageShell>
  ),
});
