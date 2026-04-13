/**
 * Converts entries from `data/json/tourPackages-*.json` into `Tour` objects
 * that the reusable detail page can render.
 *
 * The JSON is the source of truth (exported from the back office). It only
 * has a subset of the Tour shape — gallery thumbnails, what's included,
 * map, where we stay, FAQs, testimonials, and community photos are NOT
 * present. The mapper produces partial Tour objects with optional sections
 * left undefined; the page renders sections conditionally.
 */
import type {
  Tour,
  TourCrumb,
  TourDay,
  TourHighlight,
  TourKeyFact,
  TourTag,
  TourThingToKnow,
} from "@/types/tour";
import raw from "./json/tourPackages-04142026.json";

interface JsonPricing {
  original: number;
  discounted?: number;
  deposit?: number;
  currency: string;
}

interface JsonItineraryDay {
  day: number;
  title: string;
  description: string;
  image?: string;
}

interface JsonHighlight {
  text: string;
  image?: string;
}

interface JsonTravelDate {
  startDate?: { _seconds: number };
  endDate?: { _seconds: number };
  isAvailable?: boolean;
  maxCapacity?: number;
}

interface JsonTour {
  id: string;
  slug: string;
  name: string;
  status?: string;
  location?: string;
  description?: string;
  duration?: string;
  destinations?: string[];
  highlights?: string[];
  brochureLink?: string;
  stripePaymentLink?: string;
  media: { coverImage?: string; gallery?: string[] };
  pricing: JsonPricing;
  travelDates?: JsonTravelDate[];
  details: {
    highlights?: JsonHighlight[];
    itinerary?: JsonItineraryDay[];
    requirements?: string[];
  };
}

interface JsonEntry {
  id: string;
  data: JsonTour;
}

const FALLBACK_IMAGE = "/figma/tour-philippines-sunrise.png";

const CURRENCY_SYMBOL: Record<string, string> = {
  GBP: "£",
  USD: "$",
  EUR: "€",
  PHP: "₱",
};

function formatPrice(p: JsonPricing): string {
  const amount = p.discounted && p.discounted > 0 ? p.discounted : p.original;
  const symbol = CURRENCY_SYMBOL[p.currency] ?? "";
  return `${p.currency} ${symbol}${amount.toLocaleString()}`;
}

function formatPriceParts(p: JsonPricing): {
  currency: string;
  amount: string;
} {
  const amount = p.discounted && p.discounted > 0 ? p.discounted : p.original;
  const symbol = CURRENCY_SYMBOL[p.currency] ?? "";
  return {
    currency: p.currency,
    amount: `${symbol}${amount.toLocaleString()}`,
  };
}

function formatDateRange(d: JsonTravelDate): string | null {
  if (!d.startDate || !d.endDate) return null;
  const fmt = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const start = new Date(d.startDate._seconds * 1000);
  const end = new Date(d.endDate._seconds * 1000);
  return `${fmt.format(start)} – ${fmt.format(end)}`;
}

function buildBreadcrumbs(name: string): TourCrumb[] {
  return [
    { label: "Home", href: "/" },
    { label: "Tours", href: "/tours" },
    { label: name },
  ];
}

function buildTags(t: JsonTour): TourTag[] {
  const places: string[] = [];
  if (t.location) places.push(t.location);
  if (t.destinations) places.push(...t.destinations.slice(0, 3));
  // De-dupe while preserving order, cap at 4 chips.
  const seen = new Set<string>();
  return places
    .filter((p) => {
      const k = p.toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .slice(0, 4)
    .map((label) => ({ label, icon: "location" as const }));
}

function buildKeyFacts(t: JsonTour): TourKeyFact[] {
  const facts: TourKeyFact[] = [];

  const dateValues = (t.travelDates ?? [])
    .filter((d) => d.isAvailable !== false)
    .map(formatDateRange)
    .filter((v): v is string => !!v)
    .slice(0, 3);
  if (dateValues.length > 0) {
    facts.push({ icon: "days", label: "Tour Dates", values: dateValues });
  }

  if (t.duration) {
    facts.push({ icon: "days", label: "Duration", values: [t.duration] });
  }

  if (t.location) {
    facts.push({ icon: "route", label: "Location", values: [t.location] });
  }

  const cap = t.travelDates?.find((d) => d.maxCapacity)?.maxCapacity;
  if (cap) {
    facts.push({
      icon: "people",
      label: "Group Size",
      values: [`Maximum ${cap} people`],
    });
  }

  return facts;
}

function buildTripHighlights(
  t: JsonTour,
): Tour["tripHighlights"] | undefined {
  const items: TourHighlight[] = (t.details.highlights ?? [])
    .filter((h) => h.image && h.text)
    .map((h) => ({
      image: h.image!,
      imageAlt: h.text,
      title: h.text,
      subtitle: "",
    }));
  if (items.length === 0) return undefined;
  return { heading: "Trip Highlights", items };
}

function buildItinerary(t: JsonTour): Tour["itinerary"] {
  const days: TourDay[] = (t.details.itinerary ?? []).map((d, i) => ({
    dayNumber: d.day ?? i + 1,
    title: d.title,
    description: d.description,
    image:
      d.image ||
      (t.details.highlights?.[i]?.image ?? "") ||
      t.media.coverImage ||
      FALLBACK_IMAGE,
    imageAlt: d.title,
    details: [],
  }));
  return {
    heading: "Itinerary",
    downloadLabel: "Download Itinerary",
    downloadHref: t.brochureLink ?? "#",
    days,
  };
}

const STANDARD_THINGS_TO_KNOW: TourThingToKnow[] = [
  {
    icon: "info",
    title: "Travel Information",
    description:
      "Get ready for your trip! Find helpful links to everything you need from travel and health requirements to travel guides, visa information, and more here.",
    ctaLabel: "Show more",
    ctaHref: "/travel-information",
  },
  {
    icon: "faq",
    title: "General FAQs",
    description:
      "Have more questions? Check out our FAQs as we might already have the answers.",
    ctaLabel: "Show more",
    ctaHref: "/faqs",
  },
];

function buildBookingCard(t: JsonTour): Tour["booking"] {
  const { currency, amount } = formatPriceParts(t.pricing);
  return {
    durationLabel: t.duration ?? "Tour",
    routeLabel: t.location ?? "",
    priceFromLabel: "From",
    priceCurrency: currency,
    priceAmount: amount,
    ctaLabel: "Inquire Now",
    ctaHref: t.stripePaymentLink ?? "/contact-us",
    footnote: "Additional fees may apply",
  };
}

function buildListingCard(t: JsonTour): Tour["listingCard"] {
  return {
    duration: t.duration ?? "",
    description: (t.description ?? "").slice(0, 160),
    price: formatPrice(t.pricing),
    image: t.media.coverImage ?? FALLBACK_IMAGE,
    imageAlt: t.name,
  };
}

export function jsonTourToTour(j: JsonTour): Tour {
  const cover = j.media.coverImage ?? FALLBACK_IMAGE;
  const galleryThumbs = (j.media.gallery ?? []).map((src, i) => ({
    src,
    alt: `${j.name} photo ${i + 1}`,
  }));

  return {
    slug: j.slug,
    meta: {
      title: `${j.name} — I'm Here Travels`,
      description: (j.description ?? "").slice(0, 200),
    },
    breadcrumbs: buildBreadcrumbs(j.name),
    gallery: {
      hero: cover,
      heroAlt: j.name,
      thumbnails: galleryThumbs,
    },
    header: {
      title: j.duration ? `${j.duration} | ${j.name}` : j.name,
      tags: buildTags(j),
      description: j.description ?? "",
    },
    keyFacts: buildKeyFacts(j),
    tripHighlights: buildTripHighlights(j),
    itinerary: buildItinerary(j),
    thingsToKnow: { heading: "Things to know", items: STANDARD_THINGS_TO_KNOW },
    booking: buildBookingCard(j),
    listingCard: buildListingCard(j),
  };
}

export function loadToursFromJson(): Record<string, Tour> {
  const entries = raw as unknown as JsonEntry[];
  const out: Record<string, Tour> = {};
  for (const entry of entries) {
    const j = entry.data;
    if (j.status && j.status !== "active") continue;
    if (!j.slug) continue;
    out[j.slug] = jsonTourToTour(j);
  }
  return out;
}
