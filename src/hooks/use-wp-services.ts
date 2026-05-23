/**
 * use-wp-services.ts
 *
 * Fetches the allphase_service CPT from WordPress and returns
 * normalised ServiceCard objects ready for the Services section.
 * Falls back to DEFAULT_SERVICES when WP is not configured.
 */

import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { fetchServices } from "@/lib/wordpress.functions";
import { DEFAULT_SERVICES } from "@/lib/wp-defaults";
import type { ServiceCard } from "@/types/wordpress";

export function useWpServices(): { cards: ServiceCard[]; isLoading: boolean } {
  const fn = useServerFn(fetchServices);

  const { data, isLoading } = useQuery({
    queryKey: ["wp-services"],
    queryFn: () => fn({ data: {} }),
    staleTime: 5 * 60 * 1_000,
    retry: 1,
  });

  const cards = data?.services && data.services.length > 0 ? data.services : DEFAULT_SERVICES;

  return { cards, isLoading };
}
