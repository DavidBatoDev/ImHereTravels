/**
 * Tours registry.
 *
 * Source of truth for every tour the site can render. The dynamic route
 * `app/tours/[slug]/page.tsx` looks up tours here by slug, and
 * `generateStaticParams` uses `getAllTourSlugs()` to prerender each page.
 *
 * Tours are loaded from `data/json/tourPackages-*.json` via the mapper in
 * `from-json.ts`. Hand-curated tour files (e.g., `philippine-sunrise.ts`)
 * are merged in last so they override the JSON-derived data with richer
 * sections (What's Included, Where We Stay, FAQs, Testimonials, etc.).
 *
 * To enrich an existing tour:
 *   1. Create `data/<slug>.ts` exporting a `Tour` object (see `philippine-sunrise.ts`).
 *   2. Import it here and spread it after the JSON merge so it overrides.
 *   3. Optionally drop image assets in `public/tours/<slug>/`.
 */
import type { Tour, TourRelated } from "@/types/tour";
import { loadToursFromJson } from "./from-json";
import { philippineSunrise } from "./philippine-sunrise";

const CURATED: Tour[] = [philippineSunrise];

// Build the registry: JSON-derived tours first, curated overrides on top.
function buildRegistry(): Record<string, Tour> {
  const fromJson = loadToursFromJson();
  const merged: Record<string, Tour> = { ...fromJson };
  for (const t of CURATED) {
    merged[t.slug] = t;
  }
  return attachRelatedTours(merged);
}

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
    const others = slugs.filter((s) => s !== slug);
    if (others.length === 0) continue;
    const start = slugs.indexOf(slug);
    const picks = Array.from({ length: Math.min(3, others.length) }, (_, i) => {
      const idx = (start + 1 + i) % slugs.length;
      // Skip self if the rotation lands on it.
      return slugs[idx] === slug ? slugs[(idx + 1) % slugs.length] : slugs[idx];
    });
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
      relatedTours: { heading: "Tours you might like", items },
    };
  }
  return registry;
}

// Slug → Tour. Keys must match each tour's `slug` field; the dynamic
// route segment `[slug]` is matched against these keys.
export const tours: Record<string, Tour> = buildRegistry();

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
