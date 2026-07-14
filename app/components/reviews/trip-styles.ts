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
      "/reviews/tourradar/solo-taj-mahal.jpg",
      "/reviews/tourradar/solo-sri-lanka-temple-bike.jpg",
      "/reviews/tourradar/solo-el-nido-sunset-friends.jpg",
      "/reviews/tourradar/solo-el-nido-boat-friends.jpg",
      "/reviews/tourradar/solo-el-nido-overlook.jpg",
      "/reviews/tourradar/solo-philippines-sunset-boat.jpg",
    ],
  },
  {
    key: "group-adventures",
    label: "Group Adventures",
    blurb: "Small groups, big days out.",
    images: [
      "/reviews/tourradar/group-el-nido-lagoon-swim.jpg",
      "/reviews/tourradar/group-cebu-lapulapu.jpg",
      "/reviews/tourradar/group-canyoneering-circle.jpg",
      "/reviews/tourradar/group-night-out-selfie.jpg",
      "/reviews/tourradar/group-beach-carry.jpg",
      "/reviews/tourradar/group-india-market-selfie.jpg",
    ],
  },
  {
    key: "bucket-list",
    label: "Bucket-List Trips",
    blurb: "The once-in-a-lifetime ones.",
    images: [
      "/reviews/tourradar/bucketlist-sri-lanka-leopard.jpg",
      "/reviews/tourradar/bucketlist-taj-mahal-group.jpg",
      "/reviews/tourradar/bucketlist-el-nido-zipline-sunset.jpg",
      "/reviews/tourradar/bucketlist-el-nido-aerial-island.jpg",
      "/reviews/tourradar/bucketlist-el-nido-aerial-boat.jpg",
      "/reviews/tourradar/bucketlist-philippines-sunset.jpg",
    ],
  },
];
