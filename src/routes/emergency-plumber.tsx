import { createFileRoute } from "@tanstack/react-router";
import { Droplets, ShieldAlert, ThermometerSnowflake, Waves, AlertTriangle, BatteryWarning, Flame, Slash } from "lucide-react";
import { LandingPageTemplate } from "@/components/sections/LandingPageTemplate";

export const Route = createFileRoute("/emergency-plumber")({
  head: () => ({
    meta: [
      { title: "Emergency Plumber Renton, Kent, Auburn WA | All Phase Plumbing" },
      { name: "description", content: "All Phase Plumbing provides 24-hour emergency plumbing in Renton, Kent, and Auburn WA. Licensed, insured, same-day response. Call (206) 309-1088 now." }
    ],
  }),
  component: EmergencyPlumberAdsLanding,
});

const EMERGENCY_TYPES = [
  {
    title: "Burst or broken pipe",
    desc: "One of the most urgent situations — water volume can cause structural damage within minutes.",
    icon: Droplets,
  },
  {
    title: "Sewage backup in drains or toilets",
    desc: "Health hazard. Do not attempt to clear it yourself. Call immediately.",
    icon: ShieldAlert,
  },
  {
    title: "No hot water",
    desc: "Especially urgent in winter months. Could be water heater failure or a larger system issue.",
    icon: ThermometerSnowflake,
  },
  {
    title: "Flooding or standing water anywhere",
    desc: "Could indicate a broken supply line, failed sump pump, or severe blockage.",
    icon: Waves,
  },
  {
    title: "Major leak under sink or behind walls",
    desc: "Water behind walls damages insulation, drywall, and framing fast.",
    icon: AlertTriangle,
  },
  {
    title: "Overflowing toilet that won't stop",
    desc: "Shut off the valve behind the toilet, then call us.",
    icon: BatteryWarning,
  },
  {
    title: "Gas line concern near fixtures",
    desc: "Evacuate the home and call us immediately alongside your gas company.",
    icon: Flame,
  },
  {
    title: "Drain completely blocked",
    desc: "If every drain in the home is blocked, this is a main sewer line issue.",
    icon: Slash,
  },
];

export default function EmergencyPlumberAdsLanding() {
  return (
    <LandingPageTemplate
      trackingPhone="(206) 309-1088"
      heroTitle="Emergency Plumber in Renton, Kent, and Auburn, WA"
      heroSubtitle="Burst pipe, sewer backup, or major leak? All Phase Plumbing responds fast across South King County. Available 24 hours a day."
      promoTextFirst="Emergency Plumbing Service — 24 Hour Plumber"
      promoTextSecond="Call Now for Immediate Dispatch"
      trustBarLocation="Serving South King County"
      servicesTitle="Is Your Situation a Plumbing Emergency?"
      servicesDesc="If any of the following apply, stop waiting and call now. Every minute water is where it shouldn't be, the damage gets worse."
      services={EMERGENCY_TYPES}
      whyUsTitle="Why Renton, Kent, and Auburn Homeowners Call All Phase First"
      whyUsText={
        <p>
          All Phase Plumbing has been serving South King County for years, handling everything from routine drain cleaning to full emergency plumbing response across Renton, Kent, Auburn, Federal Way, and Des Moines. Every job is completed by a licensed, insured plumber — not a subcontractor — and we don't leave until the problem is fully resolved.
          <br /><br />
          When you call All Phase for an emergency plumbing situation, you get an honest assessment, an upfront price before any work starts, and a plumber who shows up on time. No surprise charges. No upselling. Just the fix your home needs.
        </p>
      }
      ctaTitle="Plumbing Emergency? Don't Wait."
      ctaDesc="Every minute water is where it shouldn't be, the damage compounds. Call All Phase Plumbing now and speak to a licensed plumber directly."
      faqs={[]}
    />
  );
}
