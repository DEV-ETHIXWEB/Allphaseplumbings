import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { Services } from "@/components/sections/Services";
import { CTABanner } from "@/components/sections/CTABanner";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Plumbing Services, All Phase Plumbing Seattle" },
      {
        name: "description",
        content:
          "Plumbing repair, drain cleaning, water heaters, and sewer services across Greater Seattle.",
      },
      { property: "og:title", content: "Plumbing Services, All Phase Plumbing" },
      {
        property: "og:description",
        content: "Comprehensive plumbing solutions for Greater Seattle.",
      },
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <PageShell>
      <PageHero
        eyebrow="What We Do"
        title="Comprehensive plumbing"
        italic="for Seattle homes."
        subtitle="From a single dripping faucet to a full sewer line replacement, one call covers it."
      />
      <Services />
      <CTABanner />
    </PageShell>
  );
}
