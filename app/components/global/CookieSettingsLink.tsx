"use client";

import { openPanel } from "@/app/components/global/consent-store";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Persistent "Cookie Settings" entry point for the site footer. This is the GDPR/PECR-required
 * re-entry affordance: after a visitor dismisses the consent banner, this link is how they
 * come back to change or withdraw consent — as easy as it was to give. Clicking it re-opens
 * `ConsentBanner` via the shared store.
 *
 * Renders nothing unless GTM is configured (no analytics → nothing to manage).
 */
export default function CookieSettingsLink({ className }: { className?: string }) {
  if (!GTM_ID) return null;

  return (
    <>
      <span className="text-white/40" aria-hidden>
        ·
      </span>
      <button type="button" onClick={openPanel} className={className}>
        Cookie Settings
      </button>
    </>
  );
}
