import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { CTABanner } from "@/components/sections/CTABanner";

export const Route = createFileRoute("/services/plumbing")({
  head: () => ({
    meta: [
      { title: "Plumbing Repair Seattle — All Phase Plumbing" },
      {
        name: "description",
        content:
          "Leaks, fixtures, pipes, water pressure — diagnosed and repaired by licensed Seattle plumbers.",
      },
      { property: "og:title", content: "Plumbing Repair Seattle" },
      { property: "og:description", content: "Licensed plumbing repair across Greater Seattle." },
    ],
  }),
  component: () => (
    <PageShell>
      <PageHero
        eyebrow="Plumbing Repair"
        title="Leaks, fixtures, pipes —"
        italic="fixed right."
        subtitle="Licensed Seattle plumbers diagnosing and repairing residential and commercial plumbing every day since 1989."
      />
      <ServiceDetail
        body="From a slow drip under the sink to low water pressure across the whole house, our techs arrive in fully stocked trucks ready to fix it the same day. Upfront pricing, written guarantees, and zero pressure tactics."
        features={[
          "Faucet, toilet & fixture repair",
          "Pipe leak detection & repair",
          "Garbage disposal install & repair",
          "Water pressure diagnostics",
          "Re-piping & remodels",
          "Whole-home water filtration",
        ]}
      />
      <CTABanner />
    </PageShell>
  ),
});
