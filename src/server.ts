import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

/* Every canonical URL, sitemap entry, and structured-data URL in this app is
   built as https://www.allphaseplumbing.com/... — but nothing previously
   enforced that at the host level, so Google was indexing the bare apex
   domain (allphaseplumbing.com) as a second, separate site alongside the www
   version (visible in Semrush as two subdomains splitting the same organic
   traffic). Redirect only that one known bare-apex host to its www
   equivalent; every other host (localhost, Vercel preview URLs, the
   Cloudflare *.workers.dev domain, etc.) is left untouched so dev/preview
   deployments keep working normally. */
const BARE_APEX_HOST = "allphaseplumbing.com";
const CANONICAL_HOST = "www.allphaseplumbing.com";

export default {
  async fetch(request: Request) {
    try {
      const url = new URL(request.url);
      if (url.hostname === BARE_APEX_HOST) {
        url.hostname = CANONICAL_HOST;
        url.protocol = "https:";
        return Response.redirect(url.toString(), 301);
      }
      const handler = await getServerEntry();
      return await handler.fetch(request, {}, {});
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
