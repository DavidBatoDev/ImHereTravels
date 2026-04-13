# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Stack

- **Next.js 16.2.3** with App Router — see `node_modules/next/dist/docs/` for version-specific APIs
- **React 19.2.4**
- **Tailwind CSS v4** — uses `@import "tailwindcss"` and `@theme inline {}` blocks in CSS, not `tailwind.config.js`. Design tokens are defined via CSS custom properties in `app/globals.css`.
- **TypeScript 5** with strict mode; path alias `@/*` maps to the project root

## Architecture

The project is in early development — currently a thin scaffold on top of create-next-app.

```
app/            # Next.js App Router (all routes live here)
  layout.tsx    # Root layout: base HTML structure (no font loader — brand fonts self-hosted via @font-face)
  globals.css   # Tailwind import + CSS custom properties for theming
  page.tsx      # Home route
public/         # Static assets
  Fonts/        # Cartograph, DM Sans, HKGrotesk (self-hosted)
  Icons/        # SVG travel icons (Car Surf, Globe, Heart, People, Pin, Snorkle)
  Logos/        # Brand logo variants (Clover)
  Emojis/       # Custom emoji assets
  brandkitGuideLines/
  Instagram-Highlights/
```

## Brand Assets

Self-hosted fonts live in `public/Fonts/`. When adding typography, prefer the brand fonts (Cartograph CF, DM Sans, HK Grotesk) by referencing them via `@font-face` in `globals.css` rather than pulling from Google Fonts.

## Styling Foundation

All brand tokens live in `app/globals.css` as CSS custom properties and are exposed to Tailwind via `@theme inline {}`. Sources: `public/brandkitGuideLines/ImHereTravels_BrandGuidelines.pdf` + Figma web style guide (file `kch1q9WkGZSyxgBzuQGPno`, node `32:7450` — the Figma node is the authoritative web implementation spec; PDF values are poster-scale).

Light-only; **do not add a `prefers-color-scheme: dark` block** — brand defines no dark theme.

### Colors (Tailwind utilities)

Primary: `crimson-red` `#EF3340`, `light-red` `#FF585D`, `midnight` `#1C1F2A`, `grey` `#959595`, `light-grey` `#F2F0EE`, `dark-gray` `#505050`, plus `white`/`black`.
Secondary: `royal-purple`, `light-purple`, `spring-green`, `light-green`, `vivid-orange`, `light-orange`, `sunglow-yellow`, `light-yellow`.
Semantic aliases: `background` (white), `foreground` (midnight).

### Fonts

- `font-display` → **Cartograph CF** (H1, H2, tagline, large display)
- `font-sans` → **HK Grotesk** (H3–H6, subheads)
- `font-body` → **DM Sans** (body copy, CTAs, URLs) — also the default `<body>` font

### Type scale

Desktop + mobile tokens are exposed separately. Apply responsively:

```tsx
<h1 className="font-display text-h1-mobile md:text-h1-desktop">…</h1>
<p  className="font-body text-b2-mobile md:text-b2-desktop">…</p>
```

Available: `text-h1-{desktop,mobile}` … `text-h6-{desktop,mobile}`, `text-b1`, `text-b2-{desktop,mobile}`, `text-b4-{desktop,mobile}`. Each bundles size + line-height + letter-spacing + font-weight per Tailwind v4's `--text-*--line-height` conventions.

H1/H2 are Cartograph CF Bold; H3–H6 are HK Grotesk Bold (weight 700); B1/B2/B4 are DM Sans Medium (weight 500).

### Shadows

`shadow-xxsmall`, `shadow-xsmall`, `shadow-small`, `shadow-medium`, `shadow-large`, `shadow-xlarge`, `shadow-xxlarge`.

### Radii

`rounded-sm` (8px), `rounded-md` (16px), `rounded-lg` (24px).

### When extending

- New tokens go in `globals.css` only — there is no `tailwind.config.js`.
- Add the CSS var to `:root`, then mirror it inside `@theme inline {}` so Tailwind generates the utility.
- Verify against the Figma node `32:7450` first, then the PDF.
