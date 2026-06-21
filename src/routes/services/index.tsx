import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import {
  ServicesPageTemplate,
  SERVICES_CATALOG,
  SERVICE_FAQS,
} from "@/components/sections/ServicesPageTemplate";

const SITE_URL = "https://www.allphaseplumbing.com";

/** Plumber business + service catalog + FAQPage structured data. */
function buildSchema(): string {
  const business = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: "All Phase Plumbing",
    image: `${SITE_URL}/favicon.svg`,
    url: `${SITE_URL}/services`,
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
    areaServed: { "@type": "City", name: "Seattle, WA" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Plumbing Services",
      itemListElement: SERVICES_CATALOG.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          url: `${SITE_URL}${s.href}`,
        },
      })),
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SERVICE_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return JSON.stringify([business, faqPage]);
}

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Plumbing Services | All Phase Plumbing | Greater Seattle" },
      {
        name: "description",
        content:
          "Full-service plumbing across Greater Seattle: repairs, drains, water heaters, sewer, leak detection & 24/7 emergencies. Licensed since 1989. Same-day service.",
      },
      { property: "og:title", content: "Plumbing Services | All Phase Plumbing" },
      {
        property: "og:description",
        content: "Comprehensive residential & commercial plumbing for Greater Seattle.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/services` }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildSchema() }}
      />
      <ServicesPageTemplate />
    </PageShell>
  );
}
