import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { CTABanner } from "@/components/sections/CTABanner";

export const Route = createFileRoute("/services/water-heaters")({
  head: () => ({
    meta: [
      { title: "Water Heater Repair & Install Seattle — Tank & Tankless" },
      {
        name: "description",
        content:
          "Same-day water heater repair, replacement, and tankless installation across Greater Seattle.",
      },
      { property: "og:title", content: "Water Heaters — All Phase Plumbing" },
      { property: "og:description", content: "Tank and tankless water heater experts." },
    ],
  }),
  component: () => (
    <PageShell>
      <PageHero
        eyebrow="Water Heaters"
        title="Hot water,"
        italic="back today."
        subtitle="Tank and tankless water heater repair, replacement, and installation — most jobs done same-day."
      />
      <ServiceDetail
        body="Cold shower this morning? Most water heater issues are diagnosable in under 30 minutes, and we stock the most common parts and units on our trucks. If you need a full replacement, we'll walk you through tank vs tankless and what actually pays back in a Seattle climate."
        features={[
          "Tank water heater repair & install",
          "Tankless water heater install",
          "Heat pump water heaters",
          "Anode rod & thermostat replacement",
          "Recirculation pumps",
          "Annual flush & maintenance",
        ]}
      />
      <CTABanner />
    </PageShell>
  ),
});
