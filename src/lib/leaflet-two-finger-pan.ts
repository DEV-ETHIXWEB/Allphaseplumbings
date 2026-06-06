import type { Map as LeafletMap } from "leaflet";

/**
 * On touch devices, require two fingers to pan the map.
 *
 * Without this, a single finger touching an inline map starts dragging the
 * map even when the user is just trying to scroll the page past it.
 *
 * Approach:
 *  - leave map dragging DISABLED by default on touch devices
 *  - enable it only while ≥2 fingers are on the map container
 *  - disable again as soon as one finger lifts
 *
 * On non-touch (mouse) devices this is a no-op and the map behaves normally.
 *
 * Returns a teardown function to detach the listeners.
 */
export function enableTwoFingerPan(map: LeafletMap, container: HTMLElement): () => void {
  const isTouch =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || (navigator as Navigator).maxTouchPoints > 0);
  if (!isTouch) return () => {};

  // Start with single-finger dragging off so page scroll can pass through.
  map.dragging.disable();

  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length >= 2) {
      map.dragging.enable();
    }
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (e.touches.length < 2) {
      map.dragging.disable();
    }
  };

  container.addEventListener("touchstart", onTouchStart, { passive: true });
  container.addEventListener("touchend", onTouchEnd, { passive: true });
  container.addEventListener("touchcancel", onTouchEnd, { passive: true });

  return () => {
    container.removeEventListener("touchstart", onTouchStart);
    container.removeEventListener("touchend", onTouchEnd);
    container.removeEventListener("touchcancel", onTouchEnd);
  };
}
