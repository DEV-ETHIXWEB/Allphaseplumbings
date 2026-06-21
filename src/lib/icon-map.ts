/**
 * icon-map.ts
 *
 * Maps the icon name strings stored in WordPress (e.g. "Award")
 * to the corresponding Lucide React component.
 * Add more entries here as new icons are needed in WP content.
 */

import {
  Award,
  Clock,
  DollarSign,
  ShieldCheck,
  Home,
  Layers,
  Wrench,
  Droplets,
  Flame,
  Pipette,
  MapPin,
  Phone,
  Mail,
  Star,
  CheckCircle,
  Search,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  Award,
  Clock,
  DollarSign,
  ShieldCheck,
  Home,
  Layers,
  Wrench,
  Droplets,
  Flame,
  Pipette,
  MapPin,
  Phone,
  Mail,
  Star,
  CheckCircle,
  Search,
  ShieldAlert,
};

/** Returns the Lucide component for a given icon name, falling back to Wrench. */
export function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Wrench;
}
