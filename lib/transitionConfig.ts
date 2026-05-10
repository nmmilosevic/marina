/** Shared timings so navigation waits until the wipe fully covers the screen. */

export const WIPE_EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

export function getWipeInDurationMs(): number {
  if (typeof window === "undefined") return 360;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 1;
  if (window.matchMedia("(max-width: 768px)").matches) return 300;
  return 360;
}

/** Fire router navigation once the wipe-in has essentially finished (avoids flash of old page). */
export function getNavigateAfterMs(): number {
  return getWipeInDurationMs() + 32;
}
