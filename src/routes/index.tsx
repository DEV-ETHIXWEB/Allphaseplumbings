import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Badges } from "@/components/sections/Badges";
import { GoogleReviewsMarquee } from "@/components/sections/GoogleReviewsMarquee";
import { Coupons } from "@/components/sections/Coupons";
import { TeamSection } from "@/components/sections/TeamSection";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { CTABanner } from "@/components/sections/CTABanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "All Phase Plumbing, Seattle Plumber Since 1989" },
      {
        name: "description",
        content:
          "Trusted plumbing repair, drain cleaning, water heaters and sewer services across Greater Seattle. Same-day service, licensed since 1989.",
      },
      { property: "og:title", content: "All Phase Plumbing, Seattle Plumber Since 1989" },
      {
        property: "og:description",
        content: "Same-day plumbing service across Tukwila and Greater Seattle.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <WhyUs />
        <Badges />
        <TeamSection />
        <GoogleReviewsMarquee />
        <Coupons />
        <CTABanner />
        <ServiceArea />
        <BlogPreview />
      </main>
      <Footer />
    </div>
  );
}
