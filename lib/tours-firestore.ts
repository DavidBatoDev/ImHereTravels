/**
 * Firestore-backed tour registry.
 *
 * Exposes the same public API as `data/tours.ts` so all consumers can swap
 * the import with minimal churn — but functions are now async (they fetch
 * from Firestore) rather than returning static in-memory data.
 *
 * Caching strategy
 * ────────────────
 * `fetchAllActiveTours()` is wrapped in React `cache()` so a single Firestore
 * read serves the entire build / request, regardless of how many route segments
 * call it.  ISR `revalidate` in each page segment controls how often the cache
 * is invalidated between deploys.
 *
 * Environment
 * ───────────
 * Requires `FIREBASE_SERVICE_ACCOUNT` (base-64 service-account JSON) to be set.
 * See `lib/firebase-admin.ts` for details.
 */

import { cache } from "react";
import { adminDb } from "@/lib/firebase-admin";
import type {
  Tour,
  TourTag,
  TourKeyFact,
  TourIncludedItem,
  TourHighlight,
  TourDay,
  TourDayDetail,
  TourAccommodation,
  TourFaq,
  TourThingToKnow,
  TourTip,
  TourRelated,
  TourBookingCard,
} from "@/types/tour";

// ─── Constants ──────────────────────────────────────────────────────────────

const TOURS_COLLECTION = "tourPackages";
const FALLBACK_IMAGE = "/figma/tour-philippines-sunrise.png";

// Booking CTA fallback when a tour has no Stripe payment link configured.
const RESERVATION_BOOKING_FORM_URL =
  "https://admin.imheretravels.com/reservation-booking-form";

const CURRENCY_SYMBOL: Record<string, string> = {
  GBP: "£",
  USD: "$",
  EUR: "£",
  PHP: "₱",
};

// ─── Firestore document shape (raw) ─────────────────────────────────────────
// We use `any` / unknown here because Firestore documents arrive untyped.

type RawDoc = Record<string, any>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toTitleCase(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}


function priceParts(pricing: RawDoc | undefined): {
  currency: string;
  amount: string;
} {
  if (!pricing) return { currency: "", amount: "" };
  const amount =
    pricing.discounted && pricing.discounted > 0
      ? pricing.discounted
      : pricing.original;
  const symbol = CURRENCY_SYMBOL[pricing.currency] ?? "";
  return {
    currency: pricing.currency ?? "",
    amount: amount != null ? `${symbol}${amount.toLocaleString()}` : "",
  };
}

function priceLabel(pricing: RawDoc | undefined): string {
  const { currency, amount } = priceParts(pricing);
  return `${currency} ${amount}`.trim();
}

function formatDateRange(td: RawDoc): string | null {
  const start = td?.startDate?.toDate?.();
  const end = td?.endDate?.toDate?.();
  if (!start || !end) return null;
  const fmt = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return `${fmt.format(start)} – ${fmt.format(end)}`;
}

// ISO (YYYY-MM-DD, UTC) start date — matches the reservation form's `tourdate`
// param format so a deep-linked date pre-selects correctly.
function isoStartDate(td: RawDoc): string {
  const start = td?.startDate?.toDate?.();
  if (!start) return "";
  return start.toISOString().slice(0, 10);
}

// ─── Transformer ─────────────────────────────────────────────────────────────

function toTour(raw: RawDoc): Tour {
  const details: RawDoc = raw.details ?? {};

  // ── Tags ─────────────────────────────────────────────────────────────────
  let tags: TourTag[];
  if (Array.isArray(details.tags) && details.tags.length) {
    tags = details.tags.map((tag: unknown) => {
      if (typeof tag === "string") return { label: tag, icon: "location" as const };
      const t = tag as { label?: string; icon?: string };
      return { label: t.label ?? "", icon: (t.icon as TourTag["icon"]) ?? "location" };
    });
  } else {
    const places: string[] = [];
    if (Array.isArray(raw.destinations)) places.push(...raw.destinations.slice(0, 3));
    const seen = new Set<string>();
    tags = places
      .filter((p) => {
        const k = p.toLowerCase();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .slice(0, 4)
      .map((label) => ({ label, icon: "location" as const }));
  }

  // ── Key Facts ─────────────────────────────────────────────────────────────
  const keyFacts: TourKeyFact[] = [];

  // Each available date links to the reservation form with that tour + date
  // pre-filled. Dated links use the `bookingSlug` override (the host's bookable
  // catalog entry) when set, otherwise the tour's own slug. The admin persists
  // blank inputs as "" (not undefined), so fall through with `||`, not `??`.
  const dateLinkSlug =
    (typeof raw.bookingSlug === "string" && raw.bookingSlug.trim()) ||
    raw.slug ||
    "";
  const dateEntries = (raw.travelDates ?? [])
    .filter((d: RawDoc) => d.isAvailable !== false)
    .map((d: RawDoc) => {
      const value = formatDateRange(d);
      if (!value) return null;
      const iso = isoStartDate(d);
      const link =
        iso && dateLinkSlug
          ? `${RESERVATION_BOOKING_FORM_URL}?tour=${dateLinkSlug}&tourdate=${iso}`
          : "";
      return { value, link };
    })
    .filter(Boolean)
    .slice(0, 3) as { value: string; link: string }[];
  // Always surface "Tour Dates" — when there are no available dates, KeyFacts
  // renders "To be announced" (mirrors the admin tour form's derived row).
  keyFacts.push({
    icon: "days",
    label: "Tour Dates",
    values: dateEntries.map((e) => e.value),
    links: dateEntries.map((e) => e.link),
  });
  // Use stored keyFacts (admin-edited) when available; fall back to derived
  if (Array.isArray(details.keyFacts) && details.keyFacts.length > 0) {
    keyFacts.push(...details.keyFacts);
  } else {
    if (raw.duration) {
      keyFacts.push({ icon: "days", label: "Duration", values: [raw.duration] });
    }
  }

  // ── Trip Highlights ───────────────────────────────────────────────────────
  const highlightItems: TourHighlight[] = (details.highlights ?? [])
    .filter((h: RawDoc) => typeof h === "object" && h.image && h.text)
    .map((h: RawDoc) => ({
      image: h.image as string,
      imageAlt: h.text as string,
      title: h.text as string,
      subtitle: (h.subtitle as string) ?? "",
    }));
  const tripHighlights =
    highlightItems.length
      ? { heading: "Trip Highlights", items: highlightItems }
      : undefined;

  // ── What's Included ───────────────────────────────────────────────────────
  let whatsIncluded: Tour["whatsIncluded"];
  if (Array.isArray(details.inclusions) && details.inclusions.length) {
    whatsIncluded = {
      heading: "What's Included",
      items: (details.inclusions as RawDoc[]).map(
        (item): TourIncludedItem => ({
          icon: item.icon ?? "plus",
          label: item.label ?? "",
          value: item.value ?? "",
        }),
      ),
    };
  }

  // ── Itinerary ─────────────────────────────────────────────────────────────
  const days: TourDay[] = (details.itinerary ?? []).map(
    (d: RawDoc, i: number): TourDay => {
      const dayDetails: TourDayDetail[] = [];
      if (Array.isArray(d.details) && d.details.length > 0) {
        dayDetails.push(...(d.details as RawDoc[]).map((det) => ({
          icon: (det.icon ?? "activities") as TourDayDetail["icon"],
          label: det.label ?? "",
          value: det.value ?? "",
        })));
      } else {
        if (d.accommodation) {
          dayDetails.push({ icon: "accommodation", label: "Accommodation", value: d.accommodation });
        }
        if (d.activities) {
          dayDetails.push({ icon: "activities", label: "Activity", value: d.activities });
        }
        if (d.meals) {
          dayDetails.push({ icon: "meals", label: "Meals", value: d.meals });
        }
      }

      const day: TourDay = {
        dayNumber: d.day ?? i + 1,
        title: d.title ?? "",
        description: d.description ?? "",
        details: dayDetails,
      };
      if (d.image) {
        day.image = d.image;
        day.imageAlt = d.title ?? "";
      }
      return day;
    },
  );

  const itinerary: Tour["itinerary"] = {
    heading: "Itinerary",
    downloadLabel: "Download Itinerary",
    downloadHref: raw.brochureLink || "#",
    days,
  };

  // ── Where We Stay ─────────────────────────────────────────────────────────
  let whereWeStay: Tour["whereWeStay"];
  if (Array.isArray(details.accommodations) && details.accommodations.length) {
    whereWeStay = {
      heading: "Where we stay",
      items: (details.accommodations as RawDoc[]).map(
        (item): TourAccommodation => ({
          image: item.image ?? FALLBACK_IMAGE,
          imageAlt: item.name ?? "",
          name: item.name ?? "",
          nights: item.nights ?? "",
        }),
      ),
    };
  }

  // ── FAQs ──────────────────────────────────────────────────────────────────
  let faqs: Tour["faqs"];
  if (Array.isArray(details.faqs) && details.faqs.length) {
    faqs = {
      heading: "FAQs",
      items: (details.faqs as RawDoc[]).map(
        (item): TourFaq => ({
          question: item.question ?? "",
          answer: item.answer ?? "",
        }),
      ),
    };
  }

  // ── Things to Know ────────────────────────────────────────────────────────
  let thingsToKnow: Tour["thingsToKnow"];
  if (Array.isArray(details.thingsToKnow) && details.thingsToKnow.length) {
    thingsToKnow = {
      heading: "Things to know",
      items: (details.thingsToKnow as RawDoc[]).map(
        (item): TourThingToKnow => ({
          icon: item.icon ?? "info",
          title: item.title ?? "",
          description: item.description ?? "",
          ctaLabel: item.ctaLabel ?? "",
          ctaHref: item.ctaHref ?? "#",
        }),
      ),
    };
  } else {
    thingsToKnow = { heading: "Things to know", items: [] };
  }

  // ── Tips ──────────────────────────────────────────────────────────────────
  let tips: Tour["tips"];
  if (Array.isArray(details.tips) && details.tips.length) {
    tips = {
      heading: "Tips",
      items: (details.tips as RawDoc[]).map(
        (item): TourTip => ({
          icon: item.icon ?? "sun",
          title: item.title ?? "",
          description: item.description ?? "",
        }),
      ),
    };
  } else {
    tips = { heading: "Tips", items: [] };
  }

  // ── Map ───────────────────────────────────────────────────────────────────
  let map: Tour["map"];
  if (details.map && (details.map.image || details.map.embedUrl)) {
    map = {
      heading: "Map",
      image: details.map.image ?? FALLBACK_IMAGE,
      imageAlt: raw.name ?? "",
      embedUrl: details.map.embedUrl,
    };
  }

  // ── Booking Card ──────────────────────────────────────────────────────────
  const { currency, amount } = priceParts(raw.pricing);
  const symbol = CURRENCY_SYMBOL[raw.pricing?.currency] ?? "";
  const deposit = raw.pricing?.deposit;
  // When no Stripe payment link is set, send the traveller to the in-house
  // reservation booking form with this tour pre-selected by its own slug.
  // (The booking-slug override only applies to the dated KeyFacts links.)
  const reservationSlug = raw.slug ?? "";
  const reservationFallback = reservationSlug
    ? `${RESERVATION_BOOKING_FORM_URL}?tour=${reservationSlug}`
    : RESERVATION_BOOKING_FORM_URL;
  // The admin form persists blank inputs as "" (not undefined), so treat
  // empty/whitespace strings as "not set" — otherwise `??` defaults below
  // never apply and the deposit/footnote lines render blank or vanish.
  const depositNote =
    typeof raw.depositNote === "string" && raw.depositNote.trim()
      ? raw.depositNote
      : undefined;
  const footnote =
    typeof raw.footnote === "string" && raw.footnote.trim()
      ? raw.footnote
      : "Additional fees may apply";
  const booking: TourBookingCard = {
    durationLabel: raw.cardHeaderTitle ?? "",
    routeLabel: raw.cardSubHeader || "",
    priceFromLabel: "From",
    priceCurrency: currency,
    priceAmount: amount,
    depositAmount:
      deposit && deposit > 0 ? `${symbol}${deposit.toLocaleString()}` : undefined,
    depositNote,
    ctaLabel: "Reserve Now",
    ctaHref: raw.stripePaymentLink || reservationFallback,
    footnote,
  };

  // ── Gallery ───────────────────────────────────────────────────────────────
  const heroImage = raw.media?.coverImage || FALLBACK_IMAGE;
  const galleryImages: string[] = Array.isArray(raw.media?.gallery)
    ? (raw.media.gallery as string[])
    : [];

  // ── SEO ───────────────────────────────────────────────────────────────────
  const seoTitle =
    raw.seo?.title ?? `${raw.name} — I'm Here Travels`;
  const seoDescription =
    raw.seo?.description ?? (raw.description ?? "").slice(0, 200);

  return {
    slug: raw.slug ?? "",
    name: raw.name ?? "",
    bookingSlug: raw.bookingSlug,
    comingSoon: raw.comingSoon ?? false,
    isHosted: raw.isHosted === true,
    meta: { title: seoTitle, description: seoDescription },
    gallery: {
      hero: heroImage,
      heroAlt: raw.name ?? "",
      thumbnails: galleryImages.map((src, i) => ({
        src,
        alt: `${raw.name ?? ""} photo ${i + 1}`,
      })),
    },
    header: {
      title: raw.duration ? `${toTitleCase(raw.duration)} | ${raw.name}` : (raw.name ?? ""),
      tags,
      description: raw.description ?? "",
    },
    keyFacts,
    whatsIncluded,
    tripHighlights,
    map,
    itinerary,
    whereWeStay,
    faqs,
    thingsToKnow,
    tips,
    tourRadarWidgetId: raw.tourRadarWidgetId || undefined,
    tourRadarWidgetUrl: raw.tourRadarWidgetUrl || undefined,
    booking,
    listingCard: {
      duration: raw.duration ? toTitleCase(raw.duration) : "",
      description: (raw.description ?? "").slice(0, 160),
      price: priceLabel(raw.pricing),
      image: heroImage,
      imageAlt: raw.name ?? "",
    },
  };
}

// ─── Related tours (same logic as data/tours.ts) ─────────────────────────────

function attachRelatedTours(registry: Record<string, Tour>): Record<string, Tour> {
  const slugs = Object.keys(registry);
  for (const slug of slugs) {
    const tour = registry[slug];
    if (tour?.relatedTours) continue;
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
      const other = registry[s]!;
      return {
        slug: other.slug,
        image: other.gallery.hero,
        imageAlt: other.gallery.heroAlt,
        duration: other.listingCard.duration,
        title: other.listingCard.duration
          ? other.header.title.split("|").slice(-1)[0]!.trim()
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

// ─── Firestore fetch (cached per request/build) ───────────────────────────────

const fetchAllActiveTours = cache(async (): Promise<Tour[]> => {
  const snap = await adminDb
    .collection(TOURS_COLLECTION)
    .where("status", "==", "active")
    .get();

  const rawTours = snap.docs.map((d) => ({ id: d.id, ...d.data() } as RawDoc));
  const tours = rawTours.map(toTour);
  const registry = attachRelatedTours(
    Object.fromEntries(tours.map((t) => [t.slug, t])),
  );
  return Object.values(registry);
});

// ─── Public API (mirrors data/tours.ts) ──────────────────────────────────────

export async function getAllTours(): Promise<Tour[]> {
  return fetchAllActiveTours();
}

export async function getTourBySlug(slug: string): Promise<Tour | undefined> {
  const tours = await fetchAllActiveTours();
  return tours.find((t) => t.slug === slug);
}

export async function getAllTourSlugs(): Promise<string[]> {
  const tours = await fetchAllActiveTours();
  return tours.map((t) => t.slug);
}

/**
 * Hosted tours are defined by the tour's own `isHosted` flag on the tourPackages
 * doc — independent of resident-host attachment (a tour can be hosted without a
 * resident host, e.g. Tanzania with Danielle & Erin).
 */
export async function getHostedTours(): Promise<Tour[]> {
  const tours = await fetchAllActiveTours();
  return tours.filter((t) => t.isHosted);
}

export async function getHostedTourSlugs(): Promise<string[]> {
  return (await getHostedTours()).map((t) => t.slug);
}

/**
 * Map of active tour doc ID → current slug. Lets callers that hold a tour ID
 * (e.g. a resident host's upcoming-trip link) resolve the live slug, so links
 * never go stale when a tour is renamed. Cached per build/request.
 */
const fetchActiveTourSlugById = cache(async (): Promise<Record<string, string>> => {
  const snap = await adminDb
    .collection(TOURS_COLLECTION)
    .where("status", "==", "active")
    .get();
  const map: Record<string, string> = {};
  snap.docs.forEach((d) => {
    const slug = (d.data() as RawDoc).slug;
    if (typeof slug === "string" && slug) map[d.id] = slug;
  });
  return map;
});

export async function getActiveTourSlugById(): Promise<Record<string, string>> {
  return fetchActiveTourSlugById();
}

/**
 * Map of old slug → current slug, built from each active tour's `previousSlugs`.
 * Lets a stale `/tours/{oldSlug}` URL permanently redirect to the live page.
 * Only entries whose `redirect` toggle is on (default on if missing) are mapped,
 * so an admin can keep an old slug recorded without redirecting it. Cached per
 * build/request.
 */
const fetchSlugByPreviousSlug = cache(async (): Promise<Record<string, string>> => {
  const snap = await adminDb
    .collection(TOURS_COLLECTION)
    .where("status", "==", "active")
    .get();
  const map: Record<string, string> = {};
  snap.docs.forEach((d) => {
    const data = d.data() as RawDoc & {
      previousSlugs?: Array<{ slug?: unknown; redirect?: unknown }>;
    };
    const cur = data.slug;
    if (typeof cur !== "string" || !cur) return;
    const prev = Array.isArray(data.previousSlugs) ? data.previousSlugs : [];
    for (const p of prev) {
      if (p && typeof p.slug === "string" && p.slug && p.redirect !== false) {
        map[p.slug] = cur;
      }
    }
  });
  return map;
});

export async function getCurrentSlugForPreviousSlug(
  slug: string,
): Promise<string | undefined> {
  return (await fetchSlugByPreviousSlug())[slug];
}
