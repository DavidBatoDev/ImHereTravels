import { CONSENT_COOKIE, consentState } from "@/app/components/global/consent";

/**
 * Google Consent Mode v2 defaults — must run BEFORE the GTM container so tags never fire
 * without consent.
 *
 * This is a plain inline `<script>` (not `next/script`) rendered by the server into <head>.
 * That is deliberate: consent defaults must execute synchronously, in document order, before
 * anything else — including GTM's `afterInteractive` snippet, which Next injects client-side
 * after hydration. `next/script`'s `beforeInteractive` renders a `<script>` with text
 * children, which React 19 refuses to execute; `dangerouslySetInnerHTML` is the supported
 * way to emit inline JS (see the JSON-LD block in the root layout for the same pattern).
 *
 * Privacy-first posture: every signal defaults to `denied` for all visitors, and the GTM
 * container stays dormant until `ConsentBanner` grants consent. `wait_for_update` gives the
 * banner a moment to apply a returning visitor's stored choice before tags evaluate.
 *
 * The stored-choice re-application reads `document.cookie` at runtime (not on the server),
 * so it stays correct even though this HTML is statically cached.
 *
 * Renders nothing unless `NEXT_PUBLIC_GTM_ID` is set — parity with `GoogleTagManager`.
 */
export default function ConsentModeDefault() {
  if (!process.env.NEXT_PUBLIC_GTM_ID) return null;

  const denied = JSON.stringify({ ...consentState("denied"), wait_for_update: 500 });
  const granted = JSON.stringify(consentState("granted"));

  const js = `window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=window.gtag||gtag;
gtag('consent','default',${denied});
try{if(document.cookie.split('; ').indexOf('${CONSENT_COOKIE}=granted')!==-1){gtag('consent','update',${granted});}}catch(e){}`;

  return (
    <script id="consent-mode-default" dangerouslySetInnerHTML={{ __html: js }} />
  );
}
