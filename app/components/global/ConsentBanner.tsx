"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import type { ConsentChoice } from "@/app/components/global/consent";
import {
  subscribe,
  getChoice,
  isPanelOpen,
  closePanel,
  setChoice,
} from "@/app/components/global/consent-store";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Cookie-consent banner gating Google Consent Mode, built for EU/UK (GDPR/PECR) rules.
 *
 * Behaviour:
 *   - First-time visitor (no stored choice): banner auto-shows with equal-weight Accept /
 *     Reject buttons and no dismiss-without-deciding shortcut.
 *   - After a decision: the banner disappears and does NOT auto-re-prompt. It only comes
 *     back when the visitor deliberately clicks the footer "Cookie Settings" link
 *     (`openPanel`), which is the symmetric withdraw/change path required by GDPR.
 *   - In that re-opened "manage" state we add a close (✕) so they can back out without
 *     changing anything.
 *
 * Accept and Reject are styled with identical size/weight (both solid) — no nudging.
 */
export default function ConsentBanner() {
  const choice = useSyncExternalStore(subscribe, getChoice, () => null);
  const panelOpen = useSyncExternalStore(subscribe, isPanelOpen, () => false);

  // Auto-show only before a decision; after that, only when explicitly re-opened.
  const visible = panelOpen || choice === null;
  if (!GTM_ID || !visible) return null;

  // If a choice already exists, the banner is up because the visitor re-opened it to manage
  // their preferences — offer a no-change exit.
  const manageMode = choice !== null;

  const decide = (next: ConsentChoice) => setChoice(next);

  const btn =
    "font-body rounded-sm px-5 py-2.5 text-center transition-colors min-w-28";

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
    >
      <div className="relative mx-auto flex max-w-4xl flex-col gap-4 rounded-md bg-white p-5 shadow-large sm:flex-row sm:items-center sm:justify-between sm:p-6">
        {manageMode && (
          <button
            type="button"
            onClick={closePanel}
            aria-label="Close cookie preferences"
            className="absolute right-3 top-3 text-grey hover:text-midnight transition-colors"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        )}

        <p className="font-body text-b2-mobile md:text-b2-desktop text-midnight sm:pr-4">
          {manageMode
            ? "Update your cookie preferences. You can accept or reject analytics cookies at any time."
            : "We use cookies to measure site traffic and improve your experience."}{" "}
          Read our{" "}
          <Link href="/privacy-policy" className="text-crimson-red underline">
            Privacy Policy
          </Link>
          .
        </p>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide("denied")}
            className={`${btn} bg-midnight text-white hover:bg-dark-gray`}
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => decide("granted")}
            className={`${btn} bg-crimson-red text-white hover:bg-light-red`}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
