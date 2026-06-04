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
