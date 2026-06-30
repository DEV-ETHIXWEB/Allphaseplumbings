import { createFileRoute } from "@tanstack/react-router";
import { Droplets, Wrench, Search, Replace, Activity } from "lucide-react";
import { LandingPageTemplate } from "@/components/sections/LandingPageTemplate";

export const Route = createFileRoute("/draincleaning")({
  head: () => ({
    meta: [
      { title: "Drain Cleaning Seattle | All Phase Plumbing" },
      { name: "description", content: "Drain Cleared Today Or You Don't Pay. Fast, reliable drain cleaning and hydro jetting in Seattle." }
    ],
  }),
  component: DrainCleaningLanding,
});

const SERVICES = [
  {
    title: "Drain Cleaning",
    desc: "We clear sink, shower, and floor drains fast. No temporary fixes, we leave the pipes fully cleared.",
    icon: Droplets,
  },
  {
    title: "Sewer Backup Clearing",
    desc: "If sewage is backing up into your home, we treat it as an emergency because it is. Fast response.",
    icon: Wrench,
  },
  {
    title: "Hydro Jetting",
    desc: "High-pressure water blasts years of grease, scale, and debris out of your pipes, leaving them like new.",
    icon: Activity,
  },
  {
    title: "Sewer Line Inspection",
    desc: "We run a camera into your sewer line so you can see exactly what's going on before spending on repairs.",
    icon: Search,
  },
  {
    title: "Root Intrusion Treatment",
    desc: "Tree roots are the #1 cause of sewer backups. We cut them out and clear the line completely.",
    icon: Droplets,
  },
  {
    title: "Pipe Repair & Replacement",
    desc: "Older homes often experience pipe corrosion. Our plumbers repair or replace damaged pipes.",
    icon: Replace,
  },
];

const FAQS = [
  {
    q: "How much does drain cleaning cost?",
    a: "We provide upfront, honest pricing before any work begins. Every situation is different, but we'll give you a clear quote after diagnosing the issue so there are no surprises.",
  },
  {
    q: "Do you offer emergency service?",
    a: "Yes, we answer our phones 24/7 and offer same-day service for drain and sewer emergencies in the Seattle area.",
  },
  {
    q: "What is hydro jetting?",
    a: "Hydro jetting uses high-pressure water to blast away years of grease, scale, and roots from inside your pipes, leaving them like new. It's often the best solution for tough or recurring clogs.",
  },
  {
    q: "Why is my drain backing up?",
    a: "It could be anything from a simple grease clog to tree roots intruding into your main sewer line. We use advanced camera inspections to find the exact cause and recommend the right fix.",
  },
];

export default function DrainCleaningLanding() {
  return (
    <LandingPageTemplate
      trackingPhone="(206) 309-1088"
      heroTitle="Drain Cleared Today Or You Don't Pay."
      heroSubtitle="Same-day drain cleaning in Seattle, Renton, Kent & Tukwila. Licensed plumbers, honest quotes, no surprises."
      promoTextFirst="Limited Time: $100 Off Drain Cleaning"
      promoTextSecond="Expires Jul 6, 2026. Call Now!"
      trustBarLocation="Serving Puget Sound"
      servicesTitle="Drain & Sewer Services We Handle"
      servicesDesc="All Phase Plumbing proudly serves Seattle as a locally trusted plumbing company, delivering dependable service backed by decades of hands-on experience. We are committed to helping homeowners and businesses with fast response times, honest pricing, and quality workmanship."
      services={SERVICES}
      whyUsTitle="Why Seattle Homeowners Call All Phase for Drain Cleaning"
      whyUsText={<p>All Phase Plumbing has been clearing drains across the Greater Seattle area for decades, tackling everything from simple sink clogs to major sewer line backups. Every job is completed by a licensed, insured plumber, not a subcontractor, and we don't leave until the pipes are flowing perfectly.<br/><br/>When you call us for a backed up drain, you get an honest assessment, upfront pricing, and a fast response. No surprise charges, no aggressive upselling. Just honest work to get your home back to normal.</p>}
      ctaTitle={<>Slow Drain? Gurgling Toilet?<br/>Don't Let It Become a Flood.</>}
      ctaDesc={<>One quick call tells you if it's a 30-minute fix or a serious sewer issue. We give it to you straight, no upselling, no scare tactics. <span className="font-bold text-white">Most jobs done same day.</span></>}
      faqs={FAQS}
      offerText="$50 Off Drain Cleaning"
    />
  );
}
