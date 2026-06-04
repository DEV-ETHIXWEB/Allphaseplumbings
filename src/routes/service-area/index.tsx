import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { ServiceArea } from "@/components/sections/ServiceArea";

export const Route = createFileRoute("/service-area/")({
  head: () => ({
    meta: [
      { title: "Service Area, All Phase Plumbing Greater Seattle" },
      {
        name: "description",
        content:
          "All Phase Plumbing serves Seattle, Tacoma, Bellevue, Renton, Kent, and the greater Puget Sound region.",
      },
      { property: "og:title", content: "Service Area, All Phase Plumbing" },
      { property: "og:description", content: "Serving the Greater Seattle area." },
    ],
  }),
  component: () => (
    <PageShell>
      <PageHero
        eyebrow="Service Area"
        title="Proudly serving the"
        italic="Puget Sound region."
        subtitle="20+ cities across Greater Seattle. If you're nearby, we're on the way."
        largeEyebrow
      />
      <ServiceArea />
    </PageShell>
  ),
});
