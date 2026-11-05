import { createFileRoute } from "@tanstack/react-router";
import { Flame, ThermometerSnowflake, Droplets, Gauge, Wrench, Zap } from "lucide-react";
import { LandingPageTemplate } from "@/components/sections/LandingPageTemplate";

/** Canonical site origin (matches the rest of the site's SEO tags). */
const SITE_URL = "https://www.allphaseplumbing.com";

export const Route = createFileRoute("/water-heater")({
  head: () => ({
    meta: [
      /* Google Ads landing page, same as /drain-cleaning and /emergency-plumber:
         the organic copy of these keywords lives on /services/water-heaters, so
         keep this page live for paid traffic but out of the organic index. */
      { name: "robots", content: "noindex, follow" },
      { title: "Water Heater Repair & Installation in Renton, Kent & Auburn | All Phase Plumbing" },
      {
        name: "description",
        content:
          "Same-day water heater repair, replacement & installation in Renton, Kent, Auburn and the greater Seattle area. Tank & tankless. Licensed plumbers, upfront pricing, no surprises. Call (206) 309-1088.",
      },
      // Location keywords kept for SEO without stuffing them into the URL.
      {
        name: "keywords",
        content:
          "water heater repair Renton, water heater installation Kent, water heater replacement Auburn, tankless water heater Seattle, no hot water, water heater Tukwila",
      },
      {
        property: "og:title",
        content: "Water Heater Repair & Installation in Renton, Kent & Auburn | All Phase Plumbing",
      },
      {
        property: "og:description",
        content:
          "Same-day water heater repair, replacement & installation in Renton, Kent, Auburn & Seattle. Tank & tankless. Upfront pricing.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/water-heater` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/water-heater` }],
  }),
  component: WaterHeaterLanding,
});

const SERVICES = [
  {
    title: "Water Heater Repair",
    desc: "No hot water, leaks, or strange noises? We diagnose the real problem and fix it fast, not just patch it.",
    icon: Wrench,
  },
  {
    title: "Water Heater Replacement",
    desc: "When repair no longer makes sense, we remove your old unit and install a properly sized replacement the same day.",
    icon: Flame,
  },
  {
    title: "Tankless Water Heaters",
    desc: "Endless hot water and lower energy bills. We install and service high-efficiency tankless systems.",
    icon: Zap,
  },
  {
    title: "No Hot Water Diagnosis",
    desc: "Pilot light, heating element, thermostat, or a bigger issue? We find the cause quickly and give it to you straight.",
    icon: ThermometerSnowflake,
  },
  {
    title: "Leaking Tank & Valve Repair",
    desc: "A leaking tank or failing T&P valve can flood a home fast. We stop the leak and protect your space.",
    icon: Droplets,
  },
  {
    title: "Maintenance & Flushing",
    desc: "Sediment buildup shortens tank life and raises bills. Regular flushing keeps your heater running longer.",
    icon: Gauge,
  },
];

const FAQS = [
  {
    q: "How much does a new water heater cost?",
    a: "It depends on the type and size of unit your home needs, tank vs. tankless, gas vs. electric. We give you a clear, upfront quote after assessing your setup so there are no surprises.",
  },
  {
    q: "Should I repair or replace my water heater?",
    a: "If your unit is under 8-10 years old and the repair is minor, a fix usually makes sense. Older tanks that leak or repeatedly fail are often cheaper to replace. We'll give you an honest recommendation, not a sales pitch.",
  },
  {
    q: "Do you install tankless water heaters?",
    a: "Yes. Tankless systems give you endless hot water and lower energy bills. We handle sizing, installation, and any gas or venting upgrades required for a safe, code-compliant setup.",
  },
  {
    q: "My water heater is leaking, is that an emergency?",
    a: "A leaking tank can cause serious water damage and should be addressed right away. Turn off the water supply to the heater if you can and call us, we answer 24/7 and offer same-day service.",
  },
  {
    q: "How long does a water heater installation take?",
    a: "Most standard tank replacements are completed in a few hours the same day. Tankless conversions can take longer depending on gas, venting, and electrical requirements. We'll give you an accurate timeline before we start.",
  },
];

export default function WaterHeaterLanding() {
  return (
    <LandingPageTemplate
      trackingPhone="(206) 309-1088"
      heroTitle="Hot Water Back Today. Guaranteed Upfront Pricing."
      heroSubtitle="Same-day water heater repair, replacement & installation in Seattle, Renton, Kent & Auburn. Tank & tankless. Licensed plumbers, honest quotes, no surprises."
      promoTextFirst="Limited Time: $50 Off Water Heater Installation"
      promoTextSecond="Ask About Financing. Call Now!"
      trustBarLocation="Serving Puget Sound"
      servicesTitle="Water Heater Services We Handle"
      servicesDesc="All Phase Plumbing installs, repairs, and replaces every kind of water heater, tank and tankless, gas and electric. Backed by decades of hands-on experience, we deliver fast response times, honest pricing, and quality workmanship for homeowners across the Seattle area."
      services={SERVICES}
      whyUsTitle="Why Seattle Homeowners Call All Phase for Water Heaters"
      whyUsText={
        <p>
          All Phase Plumbing has been installing and repairing water heaters across the Greater
          Seattle area for decades, from quick thermostat fixes to full tankless conversions. Every
          job is completed by a licensed, insured plumber, not a subcontractor, and we size every
          system correctly the first time so you get reliable hot water for years.
          <br />
          <br />
          When you call us about your water heater, you get an honest assessment, upfront pricing,
          and a fast response. No surprise charges, no aggressive upselling. Just honest work to get
          your hot water back.
        </p>
      }
      ctaTitle={
        <>
          No Hot Water?
          <br />
          Don't Wait for a Cold Shower.
        </>
      }
      ctaDesc={
        <>
          One quick call tells you whether it's a simple repair or time for a new unit. We give it to
          you straight, no upselling, no scare tactics.{" "}
          <span className="font-bold text-white">Most jobs done same day.</span>
        </>
      }
      faqs={FAQS}
      offerText="$50 Off Water Heater Installation"
    />
  );
}
