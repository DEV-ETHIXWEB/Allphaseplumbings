/**
 * use-site-options.ts
 *
 * Fetches global site options from WordPress and merges them over
 * the local defaults. Multiple components on the same page share
 * the same React Query cache entry, only one network request is made.
 */

import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteOptions } from "@/lib/wordpress.functions";
import { WP_DEFAULTS } from "@/lib/wp-defaults";
import type { WPSiteOptions } from "@/types/wordpress";

export function useSiteOptions(): Required<WPSiteOptions> {
  const fn = useServerFn(fetchSiteOptions);

  const { data } = useQuery({
    queryKey: ["wp-site-options"],
    queryFn: () => fn({ data: {} }),
    staleTime: 5 * 60 * 1_000, // cache for 5 minutes
    retry: 1,
  });

  if (!data?.options) return WP_DEFAULTS;

  // WP data wins; local defaults fill any missing fields
  return { ...WP_DEFAULTS, ...data.options };
}

/* CallRail tracking number, now the single sitewide phone number (formerly
   shown only on Google Ads landing pages). Fixed here rather than sourced
   from useSiteOptions()/WordPress so every phone CTA resolves to the same
   CallRail swap-pool number regardless of what's configured in the WP
   `allphase_phone` option. */
const CALLRAIL_PHONE = "(206) 309-1088";
const CALLRAIL_PHONE_HREF = "tel:2063091088";

export function useTrackedPhone(): { phone: string; phone_href: string } {
  return { phone: CALLRAIL_PHONE, phone_href: CALLRAIL_PHONE_HREF };
}
