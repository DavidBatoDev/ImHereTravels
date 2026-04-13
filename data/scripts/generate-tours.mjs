#!/usr/bin/env node
/**
 * Generates per-tour `data/<slug>.ts` files from the JSON export at
 * `data/json/tourPackages-04142026.json`.
 *
 * Usage:
 *   node data/scripts/generate-tours.mjs          # only creates new files
 *   node data/scripts/generate-tours.mjs --force  # overwrite existing files
 *
 * Behavior:
 * - Skips tours whose `status` is not `active`.
 * - Skips files that already exist on disk unless `--force` is passed,
 *   so hand-enrichments (e.g. `whatsIncluded`, `faqs`) are preserved.
 * - Never touches `philippine-sunrise.ts` (curated tour).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, "..");
const JSON_PATH = path.join(DATA_DIR, "json", "tourPackages-04142026.json");

const force = process.argv.includes("--force");
const SKIP_SLUGS = new Set(["philippine-sunrise"]);

const FALLBACK_IMAGE = "/figma/tour-philippines-sunrise.png";
const CURRENCY_SYMBOL = { GBP: "£", USD: "$", EUR: "€", PHP: "₱" };

// ─── helpers ───────────────────────────────────────────────────────────────

function camelCaseSlug(slug) {
  return slug
    .split(/[-_]/)
    .map((part, i) =>
      i === 0
        ? part
        : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
    )
    .join("")
    .replace(/[^a-zA-Z0-9]/g, "");
}

function priceParts(p) {
  const amount = p?.discounted && p.discounted > 0 ? p.discounted : p?.original;
  const symbol = CURRENCY_SYMBOL[p?.currency] ?? "";
  return {
    currency: p?.currency ?? "",
    amount: amount != null ? `${symbol}${amount.toLocaleString()}` : "",
  };
}

function priceLabel(p) {
  const { currency, amount } = priceParts(p);
  return `${currency} ${amount}`.trim();
}

function formatDateRange(d) {
  if (!d?.startDate || !d?.endDate) return null;
  const fmt = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const start = new Date(d.startDate._seconds * 1000);
  const end = new Date(d.endDate._seconds * 1000);
  return `${fmt.format(start)} – ${fmt.format(end)}`;
}

function buildTags(t) {
  const places = [];
  if (t.location) places.push(t.location);
  if (Array.isArray(t.destinations)) places.push(...t.destinations.slice(0, 3));
  const seen = new Set();
  return places
    .filter((p) => {
      const k = String(p).toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .slice(0, 4)
    .map((label) => ({ label, icon: "location" }));
}

function buildKeyFacts(t) {
  const facts = [];
  const dateValues = (t.travelDates ?? [])
    .filter((d) => d.isAvailable !== false)
    .map(formatDateRange)
    .filter(Boolean)
    .slice(0, 3);
  if (dateValues.length) {
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

function buildHighlights(t) {
  const items = (t.details?.highlights ?? [])
    .filter((h) => h.image && h.text)
    .map((h) => ({
      image: h.image,
      imageAlt: h.text,
      title: h.text,
      subtitle: "",
    }));
  return items.length ? { heading: "Trip Highlights", items } : null;
}

function buildItinerary(t) {
  const cover = t.media?.coverImage || FALLBACK_IMAGE;
  const days = (t.details?.itinerary ?? []).map((d, i) => ({
    dayNumber: d.day ?? i + 1,
    title: d.title ?? "",
    description: d.description ?? "",
    image: d.image || t.details?.highlights?.[i]?.image || cover,
    imageAlt: d.title ?? "",
    details: [],
  }));
  return {
    heading: "Itinerary",
    downloadLabel: "Download Itinerary",
    downloadHref: t.brochureLink ?? "#",
    days,
  };
}

function buildBooking(t) {
  const { currency, amount } = priceParts(t.pricing);
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

function buildListingCard(t) {
  return {
    duration: t.duration ?? "",
    description: (t.description ?? "").slice(0, 160),
    price: priceLabel(t.pricing),
    image: t.media?.coverImage ?? FALLBACK_IMAGE,
    imageAlt: t.name ?? "",
  };
}

// ─── code emission ─────────────────────────────────────────────────────────

// JSON.stringify produces double-quoted strings. We emit those directly into
// TS source — TypeScript accepts double-quoted string literals, and this
// avoids any escape-character ambiguity for tour copy.
function emit(value, indent = 0) {
  return JSON.stringify(value, null, 2)
    .split("\n")
    .map((l, i) => (i === 0 ? l : " ".repeat(indent) + l))
    .join("\n");
}

function buildFile(t) {
  const exportName = camelCaseSlug(t.slug);
  const cover = t.media?.coverImage || FALLBACK_IMAGE;

  const tour = {
    slug: t.slug,
    name: t.name,
    meta: {
      title: `${t.name} — I'm Here Travels`,
      description: (t.description ?? "").slice(0, 200),
    },
    gallery: {
      hero: cover,
      heroAlt: t.name,
      thumbnails: (t.media?.gallery ?? []).map((src, i) => ({
        src,
        alt: `${t.name} photo ${i + 1}`,
      })),
    },
    header: {
      title: t.duration ? `${t.duration} | ${t.name}` : t.name,
      tags: buildTags(t),
      description: t.description ?? "",
    },
    keyFacts: buildKeyFacts(t),
  };

  const trip = buildHighlights(t);
  if (trip) tour.tripHighlights = trip;
  tour.itinerary = buildItinerary(t);
  tour.thingsToKnow = {
    heading: "Things to know",
    items: [
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
    ],
  };
  tour.booking = buildBooking(t);
  tour.listingCard = buildListingCard(t);

  return `/**
 * ${t.name}
 *
 * Auto-generated from data/json/tourPackages-04142026.json by
 * data/scripts/generate-tours.mjs. Safe to hand-edit — the generator
 * only writes files that don't exist yet (run with --force to overwrite).
 *
 * Add richer sections (whatsIncluded, faqs, testimonials, etc.) here as
 * curated content becomes available; see data/philippine-sunrise.ts for a
 * fully-fleshed example.
 */
import type { Tour } from "@/types/tour";

export const ${exportName}: Tour = ${emit(tour)};

export default ${exportName};
`;
}

// ─── main ──────────────────────────────────────────────────────────────────

const raw = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
let written = 0;
let skipped = 0;
let inactive = 0;

for (const entry of raw) {
  const t = entry.data;
  if (!t?.slug) continue;
  if (t.status !== "active") {
    inactive++;
    continue;
  }
  if (SKIP_SLUGS.has(t.slug)) {
    console.log(`· skip curated:  ${t.slug}`);
    continue;
  }

  const outPath = path.join(DATA_DIR, `${t.slug}.ts`);
  if (fs.existsSync(outPath) && !force) {
    console.log(`· skip existing: ${t.slug}.ts`);
    skipped++;
    continue;
  }

  fs.writeFileSync(outPath, buildFile(t));
  console.log(`✓ wrote          ${t.slug}.ts`);
  written++;
}

console.log(
  `\n${written} written, ${skipped} skipped (existing), ${inactive} inactive.`,
);
