"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type MediaItem = {
  /** Animation step 1–12. -1 = static structural spacer (always visible, no animation). */
  seq: number;
  type: "photo" | "video" | "placeholder";
  size: "tall" | "short";
  src?: string;
  alt?: string;
};

const FB =
  "https://firebasestorage.googleapis.com/v0/b/imheretravels-a3f81.firebasestorage.app/o/";
const t = (token: string) => `?alt=media&token=${token}`;

// 12-item masonry grid — 10 real media slots + 2 structural spacers for visual balance
// Sizes from Figma node 8021:12482: tall ≈ 308×397, short ≈ 308×199
const COLUMNS: MediaItem[][] = [
  // ── Column 1 ──────────────────────────────────────────────
  [
    {
      seq: 1,
      type: "photo",
      size: "tall",
      src: `${FB}images%2F1777896856050_frame.png${t("2f9165c4-a515-498c-956c-4f8ee946de07")}`,
      alt: "Group trip moment",
    },
    {
      seq: 9,
      type: "video",
      size: "tall",
      src: `${FB}videos%2F1777891757301_e8c841a0-ba11-449c-8349-f6c8b3fc35ee.mp4${t("39dc8866-a5b0-4573-9ecb-26261a226889")}`,
    },
    {
      seq: 5,
      type: "photo",
      size: "short",
      src: `${FB}images%2F1777891735622_2e4f3d29-5be7-4465-89aa-f6f33493fd64.jpg${t("c17f0121-c04b-4301-b8bb-0910fcdfe936")}`,
      alt: "Group trip moment",
    },
  ],

  // ── Column 2 ──────────────────────────────────────────────
  [
    {
      seq: 8,
      type: "video",
      size: "tall",
      src: `${FB}videos%2F1777898934156_38dd363d-7cd1-400b-92fd-6120218a00fb.mp4${t("88db3ec6-0470-437d-86ae-31ca115c8899")}`,
    },
    {
      seq: 2,
      type: "photo",
      size: "short",
      src: `${FB}images%2F1777891748548_08.png${t("2d20d3d7-eaea-4949-a3a9-c62971286cbc")}`,
      alt: "Group trip moment",
    },
    {
      seq: 12,
      type: "photo",
      size: "tall",
      src: `${FB}images%2F1777896783964_frame%20(1).png${t("7b2f8863-e6ce-4bbe-80a0-dba31367daa3")}`,
      alt: "Group trip moment",
    },
  ],

  // ── Column 3 ──────────────────────────────────────────────
  [
    {
      seq: 11,
      type: "photo",
      size: "short",
      src: `${FB}images%2F1777896787661_frame%20(2).png${t("de8ba2d5-e3ff-411d-8050-e8017b64ce4b")}`,
      alt: "Group trip moment",
    },
    {
      seq: 10,
      type: "video",
      size: "tall",
      src: `${FB}videos%2F1777888423053_WhatsApp%20Video%202026-05-04%20at%205.10.08%20PM.mp4${t("7fc9d547-5c1b-4782-a713-0d6d53dd0625")}`,
    },
    {
      seq: 6,
      type: "photo",
      size: "tall",
      src: `${FB}images%2F1777891730097_2c35b783-d3a9-4a87-a6d7-c451e1c7ac07.jpg${t("aed7bf06-c9c7-40b2-8594-a2ed9fed48fb")}`,
      alt: "Group trip moment",
    },
  ],

  // ── Column 4 ──────────────────────────────────────────────
  [
    {
      seq: 4,
      type: "photo",
      size: "tall",
      src: `${FB}images%2F1777891752929_98c9d811-9e55-478c-99ee-e238b55f23d8.jpg${t("211ec8bd-c10b-4d97-ad1d-3a56820deb2a")}`,
      alt: "Group trip moment",
    },
    {
      seq: 7,
      type: "photo",
      size: "short",
      src: `${FB}images%2F1777891739965_3adcc24c-dc79-4de0-a9e0-5b08650c7628.jpg${t("829a8a38-63c6-4784-a894-bcbf0c86334c")}`,
      alt: "Group trip moment",
    },
    {
      seq: 3,
      type: "photo",
      size: "tall",
      src: `${FB}images%2F1777896791492_frame%20(3).png${t("314d9519-7603-4630-a6e1-cba3438e399c")}`,
      alt: "Group trip moment",
    },
  ],
];

const STAGGER_MS  = 450;   // ms between each item in the reveal sequence
const ANIM_MS     = 1400;  // per-item filter transition duration
const LAST_SEQ    = 12;
const PAUSE_MS    = 800;   // hold in full color before fading out
const FADE_OUT_MS = 1400;  // all items fade to grayscale simultaneously

// Time from colorize start until the very last item finishes
const TOTAL_IN_MS = (LAST_SEQ - 1) * STAGGER_MS + ANIM_MS; // 6350 ms

export default function TripMomentsGallery() {
  const rootRef    = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const root    = rootRef.current;
    if (!trigger || !root) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    const getSeqEls = () =>
      Array.from(root.querySelectorAll<HTMLElement>("[data-seq]"));

    // Mutual recursion via let — safe because calls are always async
    let colorize: () => void;
    let fadeOut: () => void;

    colorize = () => {
      const els = getSeqEls();
      els.forEach((el) => {
        const delay = (Number(el.dataset.seq) - 1) * STAGGER_MS;
        timers.push(
          setTimeout(() => {
            el.style.transition = `filter ${ANIM_MS}ms ease-out`;
            el.style.filter = "grayscale(0) brightness(1)";
          }, delay)
        );
      });
      // After last item is fully in color, hold then fade
      timers.push(setTimeout(fadeOut, TOTAL_IN_MS + PAUSE_MS));
    };

    fadeOut = () => {
      getSeqEls().forEach((el) => {
        el.style.transition = `filter ${FADE_OUT_MS}ms ease-in`;
        el.style.filter = "grayscale(1) brightness(0.88)";
      });
      // After fade completes, run colorize again
      timers.push(setTimeout(colorize, FADE_OUT_MS));
    };

    // Start when the sentinel (at 45% height ≈ middle row) enters the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          colorize();
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );

    observer.observe(trigger);

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative flex gap-2 sm:gap-2.5">
      {/* Sentinel at 45% grid height — fires when middle row is on screen */}
      <div
        ref={triggerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0"
        style={{ top: "45%", height: 1 }}
      />

      {COLUMNS.map((col, ci) => (
        <div key={ci} className="flex flex-1 flex-col gap-2 sm:gap-2.5">
          {col.map((item, ii) => {
            const isStatic = item.seq === -1;
            return (
              <div
                key={`${ci}-${ii}`}
                data-seq={isStatic ? undefined : item.seq}
                className={[
                  "relative w-full overflow-hidden rounded-md",
                  item.size === "tall" ? "aspect-308/397" : "aspect-308/199",
                ].join(" ")}
                // Initial grayscale via inline style — JS takes over from here
                style={isStatic ? {} : { filter: "grayscale(1) brightness(0.88)" }}
              >
                {item.type === "photo" && item.src && (
                  <Image
                    src={item.src}
                    alt={item.alt ?? "Trip moment"}
                    fill
                    sizes="(max-width: 640px) 25vw, 300px"
                    className="object-cover"
                  />
                )}

                {item.type === "video" && item.src && (
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}

                {item.type === "placeholder" && (
                  <div className="absolute inset-0 bg-grey/15" />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
