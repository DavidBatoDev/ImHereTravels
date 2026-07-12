/**
 * Featured trip styles for the reviews hub's left rail.
 *
 * These are NOT a filter — the rail is a curated photo showcase. Each style is a
 * stacked-photo card the visitor can browse (prev/next) through a hand-picked set
 * of images. This file is the single source of truth: edit `TRIP_STYLES` freely —
 * rename labels, reorder, and curate the `images` list (front-of-stack first).
 *
 * Images point at files under `public/` (verified present). You can feature tour
 * gallery shots (`/figma/*`, `/tours/<slug>/*`) or hand-pick a favourite traveler
 * review photo — just add its path. `ImageWithSkeleton`'s `fallbackSrc` covers any
 * miss. Aim for a consistent orientation (landscape reads best in these cards).
 *
 * Server-safe (pure data) — importable from server or client.
 */

export type TripStyle = {
  /** Stable id (React key). */
  key: string;
  /** Display label under the card. */
  label: string;
  /** One-liner shown beneath the label. */
  blurb?: string;
  /** Curated photos to browse, front-of-stack first. */
  images: string[];
};

export const TRIP_STYLES: TripStyle[] = [
  {
    key: "solo-friendly",
    label: "Solo-Friendly Escapes",
    blurb: "Come alone, leave with a crew.",
    images: [
      "/figma/dest-philippines-sunset.jpg",
      "/figma/dest-el-nido.png",
      "/figma/dest-moalboal.png",
      "/figma/dest-siargao-island.png",
      "/figma/dest-philippines-sunrise.jpg",
      "/figma/dest-vietnam.jpg",
    ],
  },
  {
    key: "group-adventures",
    label: "Group Adventures",
    blurb: "Small groups, big days out.",
    images: [
      "/figma/dest-japan-adventure.jpg",
      "/figma/dest-sri-lanka-wander.jpg",
      "/figma/dest-china-discovery.jpg",
      "/figma/dest-nepal-horizons.jpg",
      "/figma/dest-india-discovery.jpg",
      "/figma/dest-vietnam.jpg",
    ],
  },
  {
    key: "bucket-list",
    label: "Bucket-List Trips",
    blurb: "The once-in-a-lifetime ones.",
    images: [
      "/figma/dest-maldives.png",
      "/figma/tour-maldives-bucketlist.png",
      "/figma/dest-new-zealand-expedition.jpg",
      "/figma/dest-bhutan-quest.jpg",
      "/figma/dest-tanzania-exploration.jpg",
      "/figma/dest-japan-adventure.jpg",
    ],
  },
];
