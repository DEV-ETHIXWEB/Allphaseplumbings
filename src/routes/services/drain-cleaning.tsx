import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { CTABanner } from "@/components/sections/CTABanner";

export const Route = createFileRoute("/services/drain-cleaning")({
  head: () => ({
    meta: [
      { title: "Drain Cleaning Seattle — Hydro-Jetting & Camera" },
      {
        name: "description",
        content:
          "Fast, lasting drain cleaning across Greater Seattle. Hydro-jetting, snaking, and camera inspection by licensed plumbers.",
      },
      { property: "og:title", content: "Drain Cleaning Seattle" },
      { property: "og:description", content: "Hydro-jetting, snaking, and camera inspection." },
    ],
  }),
  component: () => (
    <PageShell>
      <PageHero
        eyebrow="Drain Cleaning"
        title="Clogs cleared —"
        italic="for good."
        subtitle="Hydro-jetting and camera inspection clear the line and confirm it stays clear. No guesswork."
      />
      <ServiceDetail
        body="If you've snaked a drain three times this year, the problem isn't the drain — it's what's living in the line. We inspect with a sewer camera, hydro-jet the buildup out, and show you the before-and-after footage on a tablet before we leave."
        features={[
          "High-pressure hydro-jetting",
          "Mechanical snaking",
          "Sewer camera inspection",
          "Kitchen, bath & laundry drains",
          "Grease & root removal",
          "Preventative maintenance plans",
        ]}
      />
      <CTABanner />
    </PageShell>
  ),
});
