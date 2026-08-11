/**
 * page-type.ts
 *
 * Single source of truth for classifying a route as an ad "landing page" vs. a
 * normal "inside" page. Landing pages live at bare service slugs (not under a
 * distinct /lp/ folder), so the set is enumerated here and reused everywhere:
 *   - GTM `page_type` dataLayer variable (drives the landing-vs-rest trigger split)
 *   - Suppressing `phone_click` tracking on landing pages (CallRail dynamic number
 *     insertion already attributes calls there — tracking here would double-count)
 *   - Hiding the main-site floating widgets on landing pages (see __root.tsx)
 *
 * When a new landing page is added, add its path prefix here and the analytics
 * split follows automatically.
 */

export const LANDING_PATH_PREFIXES = [
  "/drain-cleaning",
  "/emergency-plumber",
  "/hydro-jetting",
] as const;

export function isLandingPath(pathname: string): boolean {
  return LANDING_PATH_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export type PageType = "landing" | "inside";

export function getPageType(pathname: string): PageType {
  return isLandingPath(pathname) ? "landing" : "inside";
}

/**
 * Commercial-facing routes. The homeowner coupons and the residential ad
 * landing pages target new residential customers, so we suppress links to them
 * on these pages (coupons side popout, footer/header coupon links).
 */
export const COMMERCIAL_PATH_PREFIXES = ["/commercial"] as const;

export function isCommercialPath(pathname: string): boolean {
  return COMMERCIAL_PATH_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}
