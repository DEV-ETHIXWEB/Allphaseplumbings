import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Duplicate-content consolidation.
 *
 * This page and /services/plumbing/fixture-replacement covered the same service with
 * near-identical copy, each declaring itself canonical. Google split the
 * ranking signal between the two URLs instead of ranking one of them, so
 * neither placed well for its target keyword.
 *
 * /services/plumbing/fixture-replacement is the version the header nav, mobile nav,
 * PlumbingServicesGrid and sitemap.xml all point at, so it keeps the URL and
 * this one permanently redirects into it. The answers that were unique to this
 * page were merged into that page's FAQ list first, so no content was lost.
 */
export const Route = createFileRoute("/services/fixture-replacement")({
  beforeLoad: () => {
    throw redirect({ to: "/services/plumbing/fixture-replacement", statusCode: 301 });
  },
});
