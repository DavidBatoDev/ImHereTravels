/**
 * Tours registry.
 *
 * Source of truth for every tour the site can render. The dynamic route
 * `app/tours/[slug]/page.tsx` looks up tours here by slug, and
 * `generateStaticParams` uses `getAllTourSlugs()` to prerender each page.
 *
 * Each tour lives in its own file (`data/<slug>.ts`). Most are generated
 * from `data/json/tourPackages-04142026.json` by the script in
 * `data/scripts/generate-tours.mjs`. They can be hand-enriched after
 * generation — the script never overwrites existing files unless you pass
 * `--force`.
 *
 * To add a new tour:
 *   1. Add an entry to the JSON file (or hand-write `data/<slug>.ts`).
 *   2. If using the JSON, run `node data/scripts/generate-tours.mjs`.
 *   3. Import the new file here and add it to ALL_TOURS.
 *   4. Optionally drop richer assets in `public/tours/<slug>/`.
 */
import type { Tour, TourRelated } from "@/types/tour";

import { argentinasWonders } from "./argentinas-wonders";
import { brazilsTreasures } from "./brazils-treasures";
import { bhutanQuest } from "./bhutan-quest";
import { chinaDiscovery } from "./china-discovery";
import { danielleErinTanzaniaExploration } from "./danielleerintanzania";
import { indiaDiscoveryTour } from "./india-discovery-tour";
import { indiaHoliFestivalTour } from "./india-holi-festival-tour";
import { japanAdventure } from "./japan-adventure";
import { japanAdventureWinter } from "./japan-adventure-winter";
import { maldivesBucketlist } from "./maldives-bucketlist";
import { nepalHorizons } from "./nepal-horizons";
import { newZealandExpedition } from "./new-zealand-expedition";
import { philippineSunrise } from "./philippine-sunrise";
import { philippineSunset } from "./philippine-sunset";
import { sriLangkaWanderTour } from "./sri-langka-wander-tour";
import { tanzaniaExploration } from "./tanzania-exploration";
import { vietnamExpedition } from "./vietnam-expedition";

const ALL_TOURS: Tour[] = [
  philippineSunrise,
  philippineSunset,
  maldivesBucketlist,
  bhutanQuest,
  nepalHorizons,
  indiaDiscoveryTour,
  indiaHoliFestivalTour,
  sriLangkaWanderTour,
  vietnamExpedition,
  chinaDiscovery,
  japanAdventure,
  japanAdventureWinter,
  tanzaniaExploration,
  danielleErinTanzaniaExploration,
  newZealandExpedition,
  argentinasWonders,
  brazilsTreasures,
];

// Auto-populate `relatedTours` for any tour that doesn't already have one.
// Picks the next three tours in registry order (wrapping around) so the
// detail page always has a discovery path to other content.
function attachRelatedTours(
  registry: Record<string, Tour>,
): Record<string, Tour> {
  const slugs = Object.keys(registry);
  for (const slug of slugs) {
    const tour = registry[slug];
    if (tour.relatedTours) continue;
    if (slugs.length < 2) continue;
    const start = slugs.indexOf(slug);
    const picks = Array.from(
      { length: Math.min(3, slugs.length - 1) },
      (_, i) => {
        let idx = (start + 1 + i) % slugs.length;
        if (slugs[idx] === slug) idx = (idx + 1) % slugs.length;
        return slugs[idx];
      },
    );
    const items: TourRelated[] = picks.map((s) => {
      const other = registry[s];
      return {
        slug: other.slug,
        image: other.gallery.hero,
        imageAlt: other.gallery.heroAlt,
        duration: other.listingCard.duration,
        title: other.listingCard.duration
          ? other.header.title.split("|").slice(-1)[0].trim()
          : other.header.title,
        description: other.listingCard.description,
        priceFromLabel: "From",
        priceCurrency: other.booking.priceCurrency,
        priceAmount: other.booking.priceAmount,
      };
    });
    registry[slug] = {
      ...tour,
      relatedTours: { heading: "You might also like", items },
    };
  }
  return registry;
}

// Slug → Tour. Keys must match each tour's `slug` field; the dynamic
// route segment `[slug]` is matched against these keys.
export const tours: Record<string, Tour> = attachRelatedTours(
  Object.fromEntries(ALL_TOURS.map((t) => [t.slug, t])),
);

// Returns undefined for unknown slugs so the page can call `notFound()`.
export function getTourBySlug(slug: string): Tour | undefined {
  return tours[slug];
}

// Used by `generateStaticParams` to prerender every tour page at build time.
export function getAllTourSlugs(): string[] {
  return Object.keys(tours);
}

// Used by the `/tours` listing page to render the tour card grid.
export function getAllTours(): Tour[] {
  return Object.values(tours);
}
