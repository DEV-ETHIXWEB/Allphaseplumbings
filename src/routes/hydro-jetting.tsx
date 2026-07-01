import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Hydro jetting was merged into the drain cleaning landing page — the two
 * cover the same service. Permanently redirect so there's no duplicate
 * content and every old link still resolves.
 */
export const Route = createFileRoute("/hydro-jetting")({
  beforeLoad: () => {
    throw redirect({ to: "/drain-cleaning", statusCode: 301 });
  },
});
