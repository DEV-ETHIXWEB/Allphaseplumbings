import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SERVICE_AREA_CITIES } from "@/data/service-area-cities";
import { STATIC_ARTICLES } from "@/data/articles";

const BASE_URL = "https://www.allphaseplumbing.com";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.7" },
          { path: "/services", changefreq: "monthly", priority: "0.8" },
          { path: "/services/plumbing", changefreq: "monthly", priority: "0.8" },
          { path: "/services/drain-cleaning", changefreq: "monthly", priority: "0.8" },
          { path: "/services/water-heaters", changefreq: "monthly", priority: "0.8" },
          { path: "/services/sewer-services", changefreq: "monthly", priority: "0.8" },
          { path: "/services/sewer-services/sewer-repair", changefreq: "monthly", priority: "0.6" },
          { path: "/services/sewer-services/sewer-replacement", changefreq: "monthly", priority: "0.6" },
          // NOTE: /services/emergency-plumber, /services/repiping, /services/gas-line-repair,
          // /services/water-lines, /services/water-softeners, /services/toilets,
          // /services/toilet-installation, /services/fixture-replacement, /services/pipe-repair,
          // /services/pipe-replacement, /services/slab-leak-repair, /services/septic-tank-service,
          // and /services/burst-pipe-repair are separate, real pages from their
          // /services/plumbing/* namesakes below (different copy, not redirects). The header,
          // mobile nav, and PlumbingServicesGrid all link to the /services/plumbing/* version;
          // ServicesPageTemplate's SERVICES_CATALOG (rendered on /services) links to 5 of the
          // /services/* versions instead (emergency-plumber, repiping, gas-line-repair,
          // water-softeners, toilets) — an existing inconsistency in which URL is "canonical"
          // for those 5, predating this change. Deliberately left out of the sitemap either way:
          // submitting both URLs for the same service would only reinforce the duplicate-content
          // signal. Picking one URL as canonical and redirecting/removing the other is a content
          // architecture decision for the site owner, not a mechanical fix.
          // Individual plumbing sub-service pages (/services/plumbing/*)
          { path: "/services/plumbing/leak-detection", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/backflow-testing", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/bathtub-installation", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/burst-pipe-repair", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/clogged-drain-repair", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/emergency-plumber", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/faucet-installation", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/fixture-replacement", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/garbage-disposals", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/gas-line-repair", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/hot-water-system-repair", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/outdoor-faucet-repair", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/pipe-repair", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/pipe-replacement", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/repiping", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/septic-tank-service", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/sewer-line-repair", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/shower-installation", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/slab-leak-repair", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/sump-pumps", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/tankless-water-heaters", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/toilet-installation", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/toilets", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/water-filtration", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/water-lines", changefreq: "monthly", priority: "0.6" },
          { path: "/services/plumbing/water-softeners", changefreq: "monthly", priority: "0.6" },
          { path: "/residential", changefreq: "monthly", priority: "0.8" },
          { path: "/commercial", changefreq: "monthly", priority: "0.8" },
          { path: "/commercial/drain-cleaning", changefreq: "monthly", priority: "0.6" },
          { path: "/coupons", changefreq: "monthly", priority: "0.6" },
          { path: "/service-area", changefreq: "monthly", priority: "0.7" },
          { path: "/blog", changefreq: "weekly", priority: "0.7" },
          { path: "/contact", changefreq: "monthly", priority: "0.6" },
          // Static (non-WordPress) blog articles
          ...STATIC_ARTICLES.map(
            (a): SitemapEntry => ({
              path: `/blog/${a.slug}`,
              changefreq: "monthly",
              priority: "0.5",
            }),
          ),
          // Per-city area landing pages
          ...SERVICE_AREA_CITIES.map(
            (c): SitemapEntry => ({
              path: `/areas/${c.slug}`,
              changefreq: "monthly",
              priority: "0.7",
            }),
          ),
        ];

        const urls = entries
          .map((e) =>
            [
              ` <url>`,
              ` <loc>${BASE_URL}${e.path}</loc>`,
              e.changefreq ? ` <changefreq>${e.changefreq}</changefreq>` : null,
              e.priority ? ` <priority>${e.priority}</priority>` : null,
              ` </url>`,
            ]
              .filter(Boolean)
              .join("\n"),
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
