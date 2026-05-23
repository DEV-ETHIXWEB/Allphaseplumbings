import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { Coupons } from "@/components/sections/Coupons";
import { CTABanner } from "@/components/sections/CTABanner";

export const Route = createFileRoute("/coupons")({
  head: () => ({
    meta: [
      { title: "Plumbing Coupons & Offers — All Phase Plumbing Seattle" },
      {
        name: "description",
        content:
          "Current homeowner coupons from All Phase Plumbing — drain cleaning, camera inspection, and service call discounts.",
      },
      { property: "og:title", content: "Plumbing Coupons — All Phase" },
      { property: "og:description", content: "Save on your next plumbing visit." },
    ],
  }),
  component: () => (
    <PageShell>
      <PageHero
        eyebrow="Homeowner Coupons"
        title="Save more on your"
        italic="next visit."
        subtitle="Mention the code when you book. One coupon per service call."
      />
      <Coupons />
      <CTABanner />
    </PageShell>
  ),
});
