import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { AreaPageTemplate } from "@/components/sections/AreaPageTemplate";
import { getAreaContent, GOOGLE_REVIEWS, type AreaContent } from "@/data/area-content";

/** Canonical site origin (derived from the company domain). */
const SITE_URL = "https://www.allphaseplumbing.com";

/**
 * Builds the LocalBusiness (Plumber) + FAQPage JSON-LD for a city page.
 * areaServed is the city; geo carries the city-center coordinates.
 */
function buildSchema(area: AreaContent): string {
  const pageUrl = `${SITE_URL}/areas/${area.slug}`;

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: "All Phase Plumbing",
    image: `${SITE_URL}/favicon.svg`,
    url: pageUrl,
    telephone: "+1-206-772-6077",
    email: "info@allphaseplumbing.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "14101 Interurban Ave S, Unit 78-A",
      addressLocality: "Tukwila",
      addressRegion: "WA",
      postalCode: "98168",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: area.lat,
      longitude: area.lon,
    },
    areaServed: {
      "@type": "City",
      name: `${area.name}, WA`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: GOOGLE_REVIEWS.rating,
      reviewCount: GOOGLE_REVIEWS.count,
      bestRating: 5,
      worstRating: 1,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    foundingDate: "1989",
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return JSON.stringify([localBusiness, faqPage]);
}

export const Route = createFileRoute("/areas/$city")({
  loader: ({ params }) => {
    const area = getAreaContent(params.city);
    if (!area) throw notFound();
    return { area };
  },
  head: ({ loaderData }) => {
    const area = loaderData?.area;
    return {
      meta: [
        { title: area?.metaTitle ?? "Plumber | All Phase Plumbing" },
        { name: "description", content: area?.metaDescription ?? "" },
        { property: "og:title", content: area?.metaTitle ?? "" },
        { property: "og:description", content: area?.metaDescription ?? "" },
        { property: "og:type", content: "website" },
      ],
      links: area ? [{ rel: "canonical", href: `${SITE_URL}/areas/${area.slug}` }] : [],
    };
  },
  component: AreaPage,
});

function AreaPage() {
  const { area } = Route.useLoaderData();
  return (
    <PageShell>
      {/* LocalBusiness + FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildSchema(area) }}
      />
      <AreaPageTemplate area={area} />
    </PageShell>
  );
}
