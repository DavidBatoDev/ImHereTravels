"use client";

/**
 * Embeds an official TourRadar review widget (generated from the operator's
 * Widget Center → "Get Code"). TourRadar widgets are iframe-based (the Widget
 * Center lets you pick a width/height), so we render a sandboxed <iframe> rather
 * than injecting a third-party <script>. That keeps it self-contained, avoids
 * blocking LCP, and — if a CSP is ever added — only needs `frame-src`, not
 * `script-src`.
 *
 * Admins may paste either the full `<iframe …>` snippet or just the iframe src
 * URL into the tour's `tourRadarWidgetUrl` field; `resolveSrc` handles both.
 * A reserved min-height + skeleton prevents layout shift while the frame loads.
 */

import { useMemo, useState } from "react";

/** Pull an https URL out of whatever the admin pasted (full snippet or bare URL). */
function resolveSrc(widgetUrl?: string, widgetId?: string): string | null {
  const raw = (widgetUrl ?? "").trim();
  if (raw) {
    // Full "<iframe … src="…" …>" snippet → extract the src.
    const match = raw.match(/src\s*=\s*["']([^"']+)["']/i);
    const candidate = match ? match[1] : raw;
    if (/^https?:\/\//i.test(candidate)) return candidate;
    if (candidate.startsWith("//")) return `https:${candidate}`;
  }
  // A bare widget id alone isn't enough to build a URL (TourRadar's URL pattern
  // isn't published), so we only render when a usable URL was provided.
  void widgetId;
  return null;
}

export default function TourRadarWidget({
  widgetId,
  widgetUrl,
  variant = "tour",
  title,
  minHeight = 460,
}: {
  widgetId?: string;
  widgetUrl?: string;
  variant?: "tour" | "operator";
  title?: string;
  minHeight?: number;
}) {
  const src = useMemo(() => resolveSrc(widgetUrl, widgetId), [widgetUrl, widgetId]);
  const [loaded, setLoaded] = useState(false);

  if (!src) return null;

  const heading =
    title ?? (variant === "operator" ? "Reviews on TourRadar" : "Reviews on TourRadar");

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <h2 className="font-sans text-h3-mobile md:text-h3-desktop text-midnight">
        {heading}
      </h2>
      <div
        className="relative mt-6 w-full overflow-hidden rounded-md"
        style={{ minHeight }}
      >
        {!loaded && (
          <div
            aria-hidden
            className="absolute inset-0 animate-pulse rounded-md bg-light-grey"
          />
        )}
        <iframe
          src={src}
          title={heading}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="relative block w-full rounded-md border-0"
          style={{ minHeight }}
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
