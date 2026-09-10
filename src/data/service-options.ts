/**
 * service-options.ts
 *
 * Single source of truth for the "which service do you need" choices shown
 * as icon buttons on every lead form (Hero, CTA banner, Contact page, Area
 * pages, Service page sidebar, landing pages, chatbot). Previously each form
 * hardcoded its own <select> options, so labels drifted ("Water Heater" vs
 * "Water Heaters") and only Hero/AreaPageTemplate could reach the commercial
 * list at all. Import from here instead of redeclaring a local list.
 *
 * `value` is what gets emailed to the shop (kept identical to the historical
 * values already in use, e.g. Hero's old <option value="...">, so existing
 * inboxes/CRM filters keyed on the old text keep matching). `label` is what
 * renders on the button.
 */

import type { LucideIcon } from "lucide-react";
import {
  Droplets,
  ShieldAlert,
  Trash2,
  Waves,
  RefreshCw,
  ArrowUpDown,
  Toilet,
  Flame,
  Search,
  Filter,
  Pipette,
  Building2,
  Gauge,
} from "lucide-react";

export interface ServiceOption {
  value: string;
  label: string;
  icon: LucideIcon;
}

/** The value used for the free-text "Other" choice across every service picker. */
export const OTHER_SERVICE_VALUE = "Other" as const;

export const RESIDENTIAL_SERVICES: ServiceOption[] = [
  { value: "Drain Cleaning", label: "Drain Cleaning", icon: Droplets },
  { value: "Emergency Plumber", label: "Emergency Plumber", icon: ShieldAlert },
  { value: "Garbage Disposals", label: "Garbage Disposals", icon: Trash2 },
  { value: "Hydro Jetting", label: "Hydro Jetting", icon: Waves },
  { value: "Repiping", label: "Repiping", icon: RefreshCw },
  { value: "Sump Pumps", label: "Sump Pumps", icon: ArrowUpDown },
  { value: "Toilets & Faucets", label: "Toilets & Faucets", icon: Toilet },
  { value: "Water Heaters", label: "Water Heaters", icon: Flame },
  { value: "Leak Detection", label: "Leak Detection", icon: Search },
  { value: "Water Softeners", label: "Water Softeners & Filtration", icon: Filter },
  { value: "Sewer Repair", label: "Sewer Line Repair", icon: Pipette },
];

export const COMMERCIAL_SERVICES: ServiceOption[] = [
  { value: "Commercial Plumbing Repair", label: "Commercial Plumbing Repair", icon: Building2 },
  { value: "Commercial Drain Cleaning", label: "Commercial Drain Cleaning", icon: Droplets },
  { value: "Commercial Sewer Services", label: "Commercial Sewer Services", icon: Pipette },
  { value: "Backflow Testing", label: "Backflow Testing", icon: Gauge },
  { value: "Gas Line Service", label: "Gas Line Service", icon: Flame },
];
