import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * The drain cleaning landing page now lives at the clean, hyphenated URL
 * /drain-cleaning. Permanently redirect the old /draincleaning path so every
 * existing link, ad, and any accrued SEO value carries over.
 */
export const Route = createFileRoute("/draincleaning")({
  beforeLoad: () => {
    throw redirect({ to: "/drain-cleaning", statusCode: 301 });
  },
});
