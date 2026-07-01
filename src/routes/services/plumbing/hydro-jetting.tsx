import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Hydro jetting was merged into the drain cleaning service page — drain
 * cleaning already covers hydro jetting in depth. Permanently redirect so
 * there's no duplicate content and old links keep working.
 */
export const Route = createFileRoute("/services/plumbing/hydro-jetting")({
  beforeLoad: () => {
    throw redirect({ to: "/services/drain-cleaning", statusCode: 301 });
  },
});
