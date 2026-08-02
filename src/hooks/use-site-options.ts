/**
 * use-site-options.ts
 *
 * Fetches global site options from WordPress and merges them over
 * the local defaults. Multiple components on the same page share
 * the same React Query cache entry, only one network request is made.
 */

import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { fetchSiteOptions } from "@/lib/wordpress.functions";
import { WP_DEFAULTS } from "@/lib/wp-defaults";
import { isGoogleAdsPath } from "@/lib/page-type";
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

/* Google Ads CallRail tracking number, shown only on the confirmed Google Ads
   destination pages (see GOOGLE_ADS_PATH_PREFIXES in lib/page-type.ts) so ad
   spend attributes correctly. Every other route keeps the normal site
   phone/phone_href from useSiteOptions() untouched. */
const GOOGLE_ADS_PHONE = "(206) 309-1088";
const GOOGLE_ADS_PHONE_HREF = "tel:2063091088";

export function useTrackedPhone(): { phone: string; phone_href: string } {
  const opts = useSiteOptions();
  const pathname = useRouter().state.location.pathname;

  if (isGoogleAdsPath(pathname)) {
    return { phone: GOOGLE_ADS_PHONE, phone_href: GOOGLE_ADS_PHONE_HREF };
  }
  return { phone: opts.phone, phone_href: opts.phone_href };
}
