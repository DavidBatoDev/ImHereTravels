import Script from "next/script";

/**
 * Google Tag Manager container (which in turn loads GA4).
 *
 * Renders nothing unless `NEXT_PUBLIC_GTM_ID` is set, so local dev and preview builds
 * never pollute the production GA4 property. Set it only in the environments you actually
 * want measured.
 *
 * `afterInteractive` (the default) is right for GTM: the container must not block first
 * paint, and Google's own snippet is designed to be injected after hydration. Using
 * `beforeInteractive` here would delay the page for a tag that nothing renders.
 *
 * NOTE ON CONSENT: this loads GTM unconditionally for every visitor. There is no consent
 * banner in this app. If the site serves EU/UK visitors, GTM's consent mode (or a banner
 * gating this component) is a legal requirement, not a nicety — see the roadmap's
 * instrumentation task.
 */
export default function GoogleTagManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  if (!gtmId) return null;

  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
    </Script>
  );
}

/**
 * The `<noscript>` half of the GTM snippet. Separate from the script so it can sit at the
 * top of `<body>`, where Google requires it.
 */
export function GoogleTagManagerNoScript() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  if (!gtmId) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
