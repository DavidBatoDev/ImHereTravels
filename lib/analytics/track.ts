/**
 * The one supported way to report a tracked interaction to GTM.
 *
 * GTM triggers should listen for these named Custom Events, not infer intent
 * from click text, CSS classes, or element structure — that's what silently
 * breaks every time a component gets redesigned. See docs/tracking-plan.md
 * for the canonical event catalog (names + when to fire them).
 *
 * Safe to call unconditionally: no-ops on the server, and self-initializes
 * `dataLayer` the same way the GTM snippet itself does, so calls made before
 * GTM has loaded (or in dev, where `NEXT_PUBLIC_GTM_ID` is unset) just queue
 * harmlessly instead of throwing.
 */

type TrackEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(name: string, params: TrackEventParams = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
}
