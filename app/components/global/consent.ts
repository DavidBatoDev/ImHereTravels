/**
 * Shared constants and helpers for Google Consent Mode v2.
 *
 * The flow, end to end:
 *   1. `ConsentModeDefault` (beforeInteractive, in <head>) sets every consent signal to
 *      "denied" BEFORE the GTM container loads, and re-applies a stored "granted" choice
 *      for returning visitors.
 *   2. GTM (`GoogleTagManager`, afterInteractive) loads and honours that consent state —
 *      GA4/ads tags stay dormant until consent is granted.
 *   3. `ConsentBanner` (client) lets a first-time visitor accept or reject, persists the
 *      choice in a cookie, and pushes a `consent: update` so tags start firing immediately
 *      on accept — no reload needed.
 *
 * Everything is a no-op unless `NEXT_PUBLIC_GTM_ID` is set, matching `GoogleTagManager`,
 * so dev/preview never load tags or show the banner.
 */

/** Cookie that records the visitor's choice. Read both client-side and in the inline script. */
export const CONSENT_COOKIE = "iht_consent";

/** One year, in seconds — the max the choice is remembered before we ask again. */
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;

export type ConsentChoice = "granted" | "denied";

/**
 * The Consent Mode v2 signals we manage. `security_storage` is intentionally omitted —
 * it is essential (always granted) and not something a banner should gate.
 */
export const CONSENT_SIGNALS = [
  "ad_storage",
  "ad_user_data",
  "ad_personalization",
  "analytics_storage",
] as const;

/** Build a `{signal: value}` map for a `gtag('consent', ...)` call. */
export function consentState(value: ConsentChoice): Record<string, ConsentChoice> {
  return Object.fromEntries(CONSENT_SIGNALS.map((s) => [s, value]));
}

declare global {
  interface Window {
    // Defined by the inline `ConsentModeDefault` script (loads before any client code runs).
    gtag?: (...args: unknown[]) => void;
  }
}
