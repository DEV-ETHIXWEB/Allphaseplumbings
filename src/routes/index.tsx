import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Badges } from "@/components/sections/Badges";
import { GoogleReviewsMarquee } from "@/components/sections/GoogleReviewsMarquee";
import { TeamSection } from "@/components/sections/TeamSection";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { CTABanner } from "@/components/sections/CTABanner";
import { homepageSchema } from "@/lib/seo";

/** Canonical site origin (matches the rest of the site's SEO tags). */
const SITE_URL = "https://www.allphaseplumbing.com";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      /* The title leads with the keyword people actually search ("Seattle
         plumber"), not the brand name. Nobody searches "All Phase Plumbing"
         who isn't already a customer, and the first words of a title carry the
         most weight in both ranking and click-through on a local result. */
      { title: "Seattle Plumber, Same-Day Service & 24/7 Emergency Repair" },
      {
        name: "description",
        content:
          "Licensed Seattle plumbers since 1989. Drain cleaning, water heaters, sewer repair and 24/7 emergency service across Tukwila, Renton, Kent and Greater Seattle.",
      },
      {
        property: "og:title",
        content: "Seattle Plumber, Same-Day Service & 24/7 Emergency Repair",
      },
      {
        property: "og:description",
        content:
          "Licensed, family-owned since 1989. Same-day plumbing repair and 24/7 emergency service across Greater Seattle.",
      },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      /* The hero background still is the LCP element. Preload the exact
         variant each viewport will actually request — a single href here would
         make phones fetch the 1280px file *in addition* to the 800px one the
         <picture> resolves to. */
      {
        rel: "preload",
        as: "image",
        href: "/videos/seattle-bg-poster-800.webp",
        media: "(max-width: 1023px)",
        fetchPriority: "high",
      },
      {
        rel: "preload",
        as: "image",
        href: "/videos/seattle-bg-poster.webp",
        media: "(min-width: 1024px)",
        fetchPriority: "high",
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
        {/* LocalBusiness (Plumber) + WebSite structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: homepageSchema() }} />
        <Hero />
        <Services />
        <WhyUs />
        <Badges />
        <TeamSection />
        <GoogleReviewsMarquee />
        <CTABanner />
        <ServiceArea />
        <BlogPreview />
      </main>
      <Footer />
    </div>
  );
}
