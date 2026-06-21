import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicePageTemplate,
  type ServicePageContent,
} from "@/components/sections/ServicePageTemplate";
import { HowItWorks, WhyChooseUs } from "@/components/sections/ServicesPageTemplate";
import { CustomerQuote } from "@/components/sections/CustomerQuote";

const CONTENT: ServicePageContent = {
  title: "Seattle Emergency Plumber",
  breadcrumbLabel: "Emergency Plumber",
  heroImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1600&q=80",
  introHeading: "24/7 Seattle Emergency Plumber",
  introBlocks: [
    {
      paragraphs: [
        "When plumbing problems strike at the worst possible time, you need a Seattle emergency plumber who can respond quickly and get the job done right. At All Phase Plumbing, our emergency plumbers are equipped to handle a full range of urgent plumbing services from burst pipes and overflowing toilets to severe drain clogs and water heater failures.",
        "We understand that emergencies don't wait for business hours, which is why we're available 24/7. No matter the issue, our expert team is ready to restore comfort and functionality to your home or business day or night.",
      ],
    },
    {
      heading: "Seattle Emergency Plumbing Services",
      paragraphs: [
        "If you need a 24 hour plumber in Seattle, we're always just a call away for any emergency repair, including:",
      ],
      list: [
        "Burst pipe repair",
        "Emergency drain cleaning",
        "Overflowing toilet repair",
        "Emergency water heater service",
        "Sewer backup resolution",
        "Gas leaks",
        "Emergency shut-off assistance",
      ],
    },
    {
      heading: "Emergency Plumbing vs. Non-Emergency: When to Call",
      paragraphs: ["Call an Emergency Plumber Immediately:"],
      list: [
        "Gas line issues or strong gas odors: Immediate attention is essential for safety. Evacuate your home, call your gas company or fire department, then contact us.",
        "Burst or major leaking pipes: Can cause flooding and water damage. Shut off power to the affected area, then turn off your main water valve.",
        "Sewer backups: Pose serious health risks and can worsen quickly.",
        "Overflowing toilets or sinks: Can cause water damage and sanitation issues.",
        "No hot water in urgent situations: When immediate hot water is necessary for your household or business needs.",
      ],
    },
    {
      heading: "Issues That Can Wait",
      list: [
        "Slow drains or minor clogs",
        "Dripping faucets or minor leaks",
        "Slightly discolored water",
      ],
      paragraphs: [
        "These issues can often wait for normal business hours, though we're happy to schedule convenient repairs.",
      ],
    },
    {
      heading: "Act Fast! Our Emergency Plumbers Are Ready To Help",
      paragraphs: [
        "When a plumbing crisis strikes, you don't have time to wait. Our emergency plumbers in Seattle are available 24/7 to handle any urgent situation from burst pipes and sewer backups to water heater failures and overflowing fixtures.",
        "We provide fast, reliable emergency plumbing repair to protect your home and prevent costly damage. Call now for immediate assistance from a trusted 24-hour plumber who's ready to restore comfort and safety to your home.",
      ],
    },
    {
      heading: "Contact Seattle's Most Trusted Plumbers",
      paragraphs: [
        "Don't let plumbing issues disrupt your day. Whether it's a small repair or a major replacement, All Phase Plumbing delivers reliable, affordable plumbing services throughout Seattle and nearby areas. Call Us: (206) 772-6077 or schedule online to book your appointment today and experience the All Phase difference.",
      ],
    },
  ],
  faqs: [
    {
      q: "Do you offer 24/7 emergency plumbing services?",
      a: "Yes, All Phase Plumbing is available 24 hours a day, 7 days a week for plumbing emergencies throughout Greater Seattle. Call (206) 772-6077 anytime.",
    },
    {
      q: "What counts as a plumbing emergency?",
      a: "True emergencies include burst pipes, major leaks causing flooding, complete loss of water, overflowing toilets or sewage backups, gas line leaks, and no hot water in urgent situations. When in doubt, call us, we'll help you determine priority.",
    },
    {
      q: "How quickly can an emergency plumber arrive?",
      a: "We aim to arrive as quickly as possible, typically within 1-2 hours for emergency calls in the Greater Seattle area. Response times may vary based on location and demand.",
    },
    {
      q: "What should I do while waiting for the emergency plumber?",
      a: "Shut off the main water valve to stop flooding. For gas leaks, evacuate immediately and call 911 or your gas company first. Document the damage with photos if it's safe to do so.",
    },
    {
      q: "Is emergency plumbing more expensive?",
      a: "Emergency service does carry a premium for after-hours response, but we always provide honest, upfront pricing before starting any work so there are no surprises.",
    },
  ],
  related: [
    { label: "Burst Pipe Repair", href: "/services/burst-pipe-repair" },
    { label: "Drain Cleaning", href: "/services/drain-cleaning" },
    { label: "Sewer Services", href: "/services/sewer-services" },
    { label: "Gas Line Repair", href: "/services/gas-line-repair" },
  ],
};

export const Route = createFileRoute("/services/emergency-plumber")({
  head: () => ({
    meta: [
      { title: "24/7 Seattle Emergency Plumber | All Phase Plumbing" },
      {
        name: "description",
        content:
          "Seattle emergency plumber available 24/7. Burst pipes, sewer backups, water heater failures, and more. Call now: (206) 772-6077.",
      },
      { property: "og:title", content: "Seattle Emergency Plumber | All Phase Plumbing" },
      {
        property: "og:description",
        content: "24/7 emergency plumbing services throughout Greater Seattle.",
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

