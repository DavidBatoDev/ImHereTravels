import type { MetadataRoute } from "next";
import { getAllTourSlugs } from "@/data/tours";
import { getAllDestinationSlugs } from "@/data/destinations";

const BASE_URL = "https://www.imheretravels.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /* ── Static pages ─────────────────────────────────────────────────────── */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/all-destinations`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tours`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/why-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/faqs`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/join-our-community`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/pre-departure`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/travel-information`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/travel-requirements`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/travel-safety`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-and-conditions`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  /* ── Destination pages ────────────────────────────────────────────────── */
  const destinationPages: MetadataRoute.Sitemap = getAllDestinationSlugs().map(
    (slug) => ({
      url: `${BASE_URL}/all-destinations/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }),
  );

  /* ── Tour detail pages ────────────────────────────────────────────────── */
  const tourPages: MetadataRoute.Sitemap = getAllTourSlugs().map((slug) => ({
    url: `${BASE_URL}/tours/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...destinationPages, ...tourPages];
}
