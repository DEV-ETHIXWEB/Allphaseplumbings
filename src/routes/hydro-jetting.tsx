import { createFileRoute } from "@tanstack/react-router";
import { Activity, Droplets, Waves, Wrench, ShieldCheck, Factory } from "lucide-react";
import { LandingPageTemplate } from "@/components/sections/LandingPageTemplate";

export const Route = createFileRoute("/hydro-jetting")({
  head: () => ({
    meta: [
      { title: "Hydro Jetting Seattle | All Phase Plumbing" },
      { name: "description", content: "Blast away years of grease and roots with high-pressure hydro jetting in Seattle. Honest quotes, no surprises." }
    ],
  }),
  component: HydroJettingLanding,
});

const SERVICES = [
  {
    title: "Root Removal",
    desc: "Tree roots are notorious for destroying main sewer lines. Our high-pressure jetters slice through roots and clear the pipe.",
    icon: Droplets,
  },
  {
    title: "Grease Clearing",
    desc: "Restaurants and old homes suffer from grease buildup that snaking can't fix. Hydro jetting scours the pipe walls clean.",
    icon: Waves,
  },
  {
    title: "Scale Removal",
    desc: "Cast iron pipes accumulate hard scale over decades. Jetting removes this mineral buildup and restores pipe diameter.",
    icon: Activity,
  },
  {
    title: "Commercial Jetting",
    desc: "Heavy-duty hydro jetting for restaurants, apartments, and commercial facilities to keep operations running smoothly.",
    icon: Factory,
  },
  {
    title: "Storm Drain Jetting",
    desc: "Keep parking lots and basements from flooding by jetting out leaves, mud, and debris from storm drains.",
    icon: Wrench,
  },
  {
    title: "Preventative Maintenance",
    desc: "Don't wait for a backup. We offer routine hydro jetting maintenance plans to keep your pipes perfectly clear.",
    icon: ShieldCheck,
  },
];

const FAQS = [
  {
    q: "What is hydro jetting?",
    a: "Hydro jetting uses highly pressurized water (up to 4,000 PSI) delivered through a specialized nozzle to scour the inside of your pipes. Unlike snaking, which just pokes a hole in a clog, jetting completely cleans the pipe walls.",
  },
  {
    q: "Is hydro jetting safe for old pipes?",
    a: "In most cases, yes. However, we always perform a video camera inspection first to assess the condition of your pipes. If they are too brittle or damaged, we will recommend an alternative solution.",
  },
  {
    q: "Hydro jetting vs. snaking: Which is better?",
    a: "Snaking is great for simple, soft clogs near the drain. Hydro jetting is necessary for severe grease buildup, heavy tree roots, scale, or long-term blockages deep in the main sewer line.",
  },
  {
    q: "How long does hydro jetting take?",
    a: "Most residential hydro jetting jobs take between 1 to 3 hours, depending on the severity of the blockage and the length of the sewer line.",
  },
];

export default function HydroJettingLanding() {
  return (
    <LandingPageTemplate
      heroTitle="Blast Away Years of Grease & Roots."
      heroSubtitle="High-pressure hydro jetting in Seattle. We scour your pipes clean so they flow like new. Honest quotes, no surprises."
      promoTextFirst="Limited Time: $150 Off Whole-House Hydro Jetting"
      promoTextSecond="Expires soon — Book Your Jetting Today!"
      servicesTitle="Professional Hydro Jetting Services"
      servicesDesc="When traditional snaking isn't enough, hydro jetting is the ultimate solution. All Phase Plumbing uses state-of-the-art high-pressure water jetters to restore your pipes to their original condition."
      services={SERVICES}
      ctaTitle={<>Recurring Clogs? Slow Drains?<br/>Snaking Isn't Always Enough.</>}
      ctaDesc={<>Stop paying for temporary fixes. A quick camera inspection will show you exactly what's hiding in your pipes. <span className="font-bold text-white">Let us wash it all away.</span></>}
      faqs={FAQS}
    />
  );
}
