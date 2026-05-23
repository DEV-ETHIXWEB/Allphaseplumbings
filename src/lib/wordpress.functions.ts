/**
 * wordpress.functions.ts
 *
 * Server-side fetch functions for every WordPress content type.
 * All functions run on the server (createServerFn) and never expose
 * credentials or internal URLs to the browser.
 *
 * Environment variable required: PUBLIC_WP_URL
 * e.g.  PUBLIC_WP_URL=https://allphaseplumbing.com
 */

import { createServerFn } from "@tanstack/react-start";
import type {
  WPPost,
  WPService,
  WPTeamMember,
  WPSiteOptions,
  ServiceCard,
} from "@/types/wordpress";

// ── Helpers ───────────────────────────────────────────────────────────────────

function getBase(): string | null {
  const url = process.env.PUBLIC_WP_URL;
  if (!url) return null;
  return url.replace(/\/$/, "");
}

async function wpFetch<T>(path: string): Promise<T> {
  const base = getBase();
  if (!base) throw new Error("WordPress URL not configured (PUBLIC_WP_URL)");
  const res = await fetch(`${base}${path}`, {
    headers: { Accept: "application/json" },
    // 10-second timeout via AbortSignal
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`WP REST API ${res.status} — ${path}`);
  return res.json() as Promise<T>;
}

/** Strip HTML tags from a WP rendered string. */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

/** Transform a raw WPService into the flat ServiceCard the UI consumes. */
export function wpServiceToCard(s: WPService): ServiceCard {
  return {
    number: s.meta?.service_number ?? String(s.menu_order || s.id),
    iconName: s.meta?.service_icon ?? "Wrench",
    title: stripHtml(s.title.rendered),
    description: stripHtml(s.excerpt.rendered),
    href: s.meta?.service_page_slug ?? `/services/${s.slug}`,
  };
}

// ── Blog posts ─────────────────────────────────────────────────────────────────

export const fetchPosts = createServerFn({ method: "GET" })
  .inputValidator((data: { perPage?: number } | undefined) => data ?? {})
  .handler(async ({ data }) => {
    try {
      const posts = await wpFetch<WPPost[]>(
        `/wp-json/wp/v2/posts?_embed&per_page=${data.perPage ?? 3}`,
      );
      return { posts, error: null };
    } catch (e) {
      return { posts: [] as WPPost[], error: (e as Error).message };
    }
  });

export const fetchPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    try {
      const posts = await wpFetch<WPPost[]>(
        `/wp-json/wp/v2/posts?_embed&slug=${encodeURIComponent(data.slug)}`,
      );
      return { post: posts[0] ?? null, error: null };
    } catch (e) {
      return { post: null as WPPost | null, error: (e as Error).message };
    }
  });

// ── Services CPT ───────────────────────────────────────────────────────────────

export const fetchServices = createServerFn({ method: "GET" })
  .inputValidator((data: Record<string, unknown> | undefined) => data ?? {})
  .handler(async () => {
    try {
      const raw = await wpFetch<WPService[]>(
        "/wp-json/wp/v2/allphase_service?_embed&per_page=20&orderby=menu_order&order=asc",
      );
      const services: ServiceCard[] = raw.map(wpServiceToCard);
      return { services, error: null };
    } catch (e) {
      return { services: [] as ServiceCard[], error: (e as Error).message };
    }
  });

export const fetchServiceBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    try {
      const raw = await wpFetch<WPService[]>(
        `/wp-json/wp/v2/allphase_service?_embed&slug=${encodeURIComponent(data.slug)}`,
      );
      return { service: raw[0] ?? null, error: null };
    } catch (e) {
      return { service: null as WPService | null, error: (e as Error).message };
    }
  });

// ── Team members CPT ───────────────────────────────────────────────────────────

export const fetchTeamMembers = createServerFn({ method: "GET" })
  .inputValidator((data: Record<string, unknown> | undefined) => data ?? {})
  .handler(async () => {
    try {
      const members = await wpFetch<WPTeamMember[]>(
        "/wp-json/wp/v2/allphase_team?_embed&per_page=20&orderby=menu_order&order=asc",
      );
      return { members, error: null };
    } catch (e) {
      return { members: [] as WPTeamMember[], error: (e as Error).message };
    }
  });

// ── Global site options ────────────────────────────────────────────────────────

export const fetchSiteOptions = createServerFn({ method: "GET" })
  .inputValidator((data: Record<string, unknown> | undefined) => data ?? {})
  .handler(async () => {
    try {
      const options = await wpFetch<WPSiteOptions>("/wp-json/allphase/v1/options");
      return { options, error: null };
    } catch (e) {
      return { options: null as WPSiteOptions | null, error: (e as Error).message };
    }
  });
