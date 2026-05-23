import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { TeamSection } from "@/components/sections/TeamSection";
import { WhyUs } from "@/components/sections/WhyUs";
import { CTABanner } from "@/components/sections/CTABanner";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About All Phase Plumbing — Seattle Family-Owned Since 1989" },
      {
        name: "description",
        content:
          "Family-owned plumbing company in Tukwila, WA. Licensed technicians serving Greater Seattle for over 35 years.",
      },
      { property: "og:title", content: "About All Phase Plumbing" },
      {
        property: "og:description",
        content: "Family-owned plumbing serving Greater Seattle since 1989.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Us"
        title="Plumbers your neighbors"
        italic="actually recommend."
        subtitle="Family-owned and operated in Tukwila since 1989. Three generations of licensed plumbers serving Greater Seattle homes and businesses."
      />
      <TeamSection />
      <WhyUs />
      <CTABanner />
    </PageShell>
  );
}
