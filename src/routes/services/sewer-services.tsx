import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { CTABanner } from "@/components/sections/CTABanner";

export const Route = createFileRoute("/services/sewer-services")({
  head: () => ({
    meta: [
      { title: "Sewer Repair & Trenchless Sewer Seattle — All Phase Plumbing" },
      {
        name: "description",
        content:
          "Sewer line repair, replacement, and trenchless solutions across Greater Seattle. Free camera inspection with qualifying work.",
      },
      { property: "og:title", content: "Sewer Services — All Phase Plumbing" },
      { property: "og:description", content: "Sewer repair and trenchless replacement." },
    ],
  }),
  component: () => (
    <PageShell>
      <PageHero
        eyebrow="Sewer Services"
        title="Sewer lines,"
        italic="solved."
        subtitle="Sewer repair, replacement, and trenchless solutions across the Puget Sound region."
      />
      <ServiceDetail
        body="Seattle's mature trees and old clay sewer lines don't mix. We camera-inspect first, give you flat-rate pricing for repair or trenchless replacement, and coordinate any permits with the city. No surprise dig-ups."
        features={[
          "Trenchless sewer replacement",
          "Sewer line repair",
          "Camera inspection & locating",
          "Root removal & treatment",
          "Sewer scopes for home buyers",
          "Side sewer permits & coordination",
        ]}
      />
      <CTABanner />
    </PageShell>
  ),
});
