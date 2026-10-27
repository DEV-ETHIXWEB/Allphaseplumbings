/**
 * seo.ts
 *
 * Shared structured-data (schema.org JSON-LD) builders and SEO constants.
 * Business details mirror the Plumber schema on the /areas/$city pages so
 * Google sees one consistent entity (name, address, phone) everywhere.
 */

import { SERVICE_AREA_CITIES } from "@/data/service-area-cities";
import { GOOGLE_REVIEWS } from "@/data/area-content";
import { SOCIAL_LINKS } from "@/lib/social-links";

export const SITE_URL = "https://www.allphaseplumbing.com";

/** 1200×630 branded fallback for og:image / twitter:image. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.jpg`;

const BUSINESS_ID = `${SITE_URL}/#business`;

/** JSON for a <script type="application/ld+json">, safe against `</script>`. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Copy still spells out the retired number; structured data must not. */
export function scrubOldPhone(text: string): string {
  return text.replace(/\(206\)\s*772-6077/g, "(206) 309-1088");
}

/** Sitewide LocalBusiness entity. Other schemas reference it by @id. */
export function businessSchema() {
  return {
    "@type": "Plumber",
    "@id": BUSINESS_ID,
    name: "All Phase Plumbing",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    image: DEFAULT_OG_IMAGE,
    telephone: "+1-206-309-1088",
    email: "info@allphaseplumbing.com",
    priceRange: "$$",
    foundingDate: "1989",
    address: {
      "@type": "PostalAddress",
      streetAddress: "14101 Interurban Ave S, Unit 78-A",
      addressLocality: "Tukwila",
      addressRegion: "WA",
      postalCode: "98168",
      addressCountry: "US",
    },
    areaServed: SERVICE_AREA_CITIES.map((c) => ({ "@type": "City", name: `${c.name}, WA` })),
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
    sameAs: Object.values(SOCIAL_LINKS),
  };
}

/** Homepage: the business plus the WebSite it publishes. */
export function homepageSchema(): string {
  return jsonLd({
    "@context": "https://schema.org",
    "@graph": [
      businessSchema(),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "All Phase Plumbing",
        publisher: { "@id": BUSINESS_ID },
      },
    ],
  });
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path === "/" ? "" : c.path}`,
    })),
  };
}

/** A service page: Service offered by the business, breadcrumbs, and FAQs. */
export function servicePageSchema({
  name,
  description,
  path,
  crumbs,
  faqs,
}: {
  name: string;
  description?: string;
  path: string;
  crumbs: Crumb[];
  faqs: { q: string; a: string }[];
}): string {
  const graph: unknown[] = [
    {
      "@type": "Service",
      name,
      serviceType: name,
      ...(description ? { description: scrubOldPhone(description) } : {}),
      url: `${SITE_URL}${path}`,
      provider: { "@id": BUSINESS_ID, "@type": "Plumber", name: "All Phase Plumbing" },
      areaServed: { "@type": "AdministrativeArea", name: "Greater Seattle, WA" },
    },
    breadcrumbSchema(crumbs),
  ];
  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: scrubOldPhone(f.a) },
      })),
    });
  }
  return jsonLd({ "@context": "https://schema.org", "@graph": graph });
}
