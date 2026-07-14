/**
 * Nationality list for the review form's country picker — plain data only (no
 * JSX), since `www` renders the flag icon itself in NationalitySelect. Mirrors
 * the priority-sorted list the reservation booking form uses
 * (admin/client/src/app/reservation-booking-form/utils/nationalityUtils.ts),
 * reimplemented here since `www` and `admin/client` are separate apps with no
 * shared package.
 */

import countries from "world-countries";

export interface NationalityOption {
  countryName: string;
  countryCode: string; // ISO 3166-1 alpha-2, for the flag icon
}

// Territories with no meaningful "nationality" of their own.
const EXCLUDED_CODES = new Set([
  "UM", // US Minor Outlying Islands
  "BV", // Bouvet Island
  "HM", // Heard Island and McDonald Islands
  "GS", // South Georgia and the South Sandwich Islands
  "TF", // French Southern Territories
  "AQ", // Antarctica
]);

const PRIORITY_COUNTRIES = [
  "Philippines",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "India",
  "China",
  "Japan",
  "South Korea",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Mexico",
  "Brazil",
];

export function getAllNationalities(): NationalityOption[] {
  const byName = new Map<string, string>();
  for (const country of countries) {
    if (EXCLUDED_CODES.has(country.cca2)) continue;
    if (country.name?.common) byName.set(country.name.common, country.cca2);
  }

  const all = Array.from(byName.entries())
    .map(([countryName, countryCode]) => ({ countryName, countryCode }))
    .sort((a, b) => a.countryName.localeCompare(b.countryName));

  const priority = PRIORITY_COUNTRIES.map((name) =>
    all.find((c) => c.countryName === name),
  ).filter((c): c is NationalityOption => !!c);
  const rest = all.filter((c) => !PRIORITY_COUNTRIES.includes(c.countryName));

  return [...priority, ...rest];
}
