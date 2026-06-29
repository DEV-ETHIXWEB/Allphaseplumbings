import { createFileRoute } from "@tanstack/react-router";
import { Droplets, Wrench, Flame, ShowerHead, Activity, AlertTriangle } from "lucide-react";
import { LandingPageTemplate } from "@/components/sections/LandingPageTemplate";

export const Route = createFileRoute("/emergency-plumbing")({
  head: () => ({
    meta: [
      { title: "Emergency Plumber Seattle | All Phase Plumbing" },
      { name: "description", content: "Burst pipe? Flooded basement? We dispatch expert plumbers in Seattle immediately. 24/7 Emergency Service." }
    ],
  }),
  component: EmergencyPlumbingLanding,
});

const SERVICES = [
  {
    title: "Burst Pipes",
    desc: "A burst pipe can flood your home in minutes. We arrive fast to shut off the water and repair the break permanently.",
    icon: Droplets,
  },
  {
    title: "Overflowing Toilets",
    desc: "Stop the mess before it spreads. We clear the toughest toilet clogs and fix broken flapper valves immediately.",
    icon: ShowerHead,
  },
  {
    title: "Flooded Basements",
    desc: "Sump pump failure or main line backup? We extract water, find the source of the flood, and get your basement dry.",
    icon: Activity,
  },
  {
    title: "Gas Leaks",
    desc: "Smell gas? Evacuate and call us immediately. We safely locate and repair dangerous gas line leaks.",
    icon: Flame,
  },
  {
    title: "Sewer Backups",
    desc: "Sewage backing up into tubs or sinks is a major health hazard. We clear main line blockages fast.",
    icon: Wrench,
  },
  {
    title: "Broken Water Heaters",
    desc: "No hot water or a leaking tank? We can repair your unit on the spot or install a replacement the same day.",
    icon: AlertTriangle,
  },
];

const FAQS = [
  {
    q: "How quickly can you get here?",
    a: "For true emergencies, we dispatch our nearest available plumber immediately. We aim to be at your door within the hour for critical situations in the Seattle area.",
  },
  {
    q: "Are you really open 24/7?",
    a: "Yes. Plumbing emergencies don't stick to business hours, and neither do we. You will always reach a live person when you call, day or night.",
  },
  {
    q: "What should I do while waiting for the plumber?",
    a: "If there is an active leak or burst pipe, locate your main water shut-off valve and turn it off immediately. If it's a gas leak, leave the house and call us from outside.",
  },
  {
    q: "Will I be overcharged for an after-hours call?",
    a: "We believe in honest, upfront pricing. While after-hours dispatch has a standard premium, we will always give you a clear, fixed quote before any work begins.",
  },
];

export default function EmergencyPlumbingLanding() {
  return (
    <LandingPageTemplate
      heroTitle="Emergency Plumber Available 24/7."
      heroSubtitle="Burst pipe? Flooded basement? We dispatch expert plumbers in Seattle, Renton, Kent & Tukwila immediately. Honest quotes, no surprises."
      promoTextFirst="Limited Time: $50 Off Emergency Service Call"
      promoTextSecond="Call Now for Immediate Dispatch!"
      servicesTitle="Plumbing Emergencies We Handle"
      servicesDesc="When water is pouring into your home, you don't have time to wait. All Phase Plumbing provides rapid-response emergency plumbing services across the Seattle metro area. We come equipped to handle the worst disasters."
      services={SERVICES}
      ctaTitle={<>Burst Pipe? Overflowing Toilet?<br/>Don't Let It Destroy Your Home.</>}
      ctaDesc={<>Water damage gets worse by the minute. Call us now and we will dispatch a licensed emergency plumber immediately to stop the leak and fix the problem. <span className="font-bold text-white">We are standing by.</span></>}
      faqs={FAQS}
    />
  );
}
