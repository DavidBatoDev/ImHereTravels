"use client";

import Script from "next/script";

export default function SherpaWidget() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-8 md:px-8">
      {/* Sherpa travel requirements widget */}
      <div
        id="sherpa-widget"
        className="min-h-[600px] w-full overflow-hidden rounded-lg"
      />
      <Script
        src="https://widgets.sherpa.com/widget/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Initialise Sherpa widget after script loads
          if (typeof window !== "undefined" && (window as Window & { SherpaWidget?: { init: (config: Record<string, unknown>) => void } }).SherpaWidget) {
            (window as Window & { SherpaWidget?: { init: (config: Record<string, unknown>) => void } }).SherpaWidget!.init({
              container: "sherpa-widget",
            });
          }
        }}
      />
    </div>
  );
}
