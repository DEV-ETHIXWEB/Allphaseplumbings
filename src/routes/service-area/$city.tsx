import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * The per-city service-area pages now live under /areas/$city (new layout).
 * Permanently redirect the old URL so there's no duplicate content and every
 * visitor lands on the current design.
 */
export const Route = createFileRoute("/service-area/$city")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/areas/$city", params: { city: params.city }, statusCode: 301 });
  },
});
