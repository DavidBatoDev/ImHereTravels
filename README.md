<div align="center">

<img src="public/logos/Horizontal/Digital/SVG/Red/Digital_Horizontal_Red.svg" alt="I'm Here Travels" width="320" />

### _We connect people with places — and create a positive impact, together._

<br />

[![Live Site](https://img.shields.io/badge/live-imheretravels.com-EF3340?style=for-the-badge&labelColor=1C1F2A)](https://imheretravels.com)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-1C1F2A?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-1C1F2A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-1C1F2A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-1C1F2A?style=for-the-badge&logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org)

</div>

---

## ✶ About

**I'm Here Travels** is a boutique travel company crafting meaningful journeys across the Philippines and beyond. This repository contains the marketing site and booking touchpoints that power our digital presence.

🌐 **Production:** [**imheretravels.com**](https://imheretravels.com)

---

## ✦ Getting Started (Step-by-Step)

New to the stack? Follow every step below, in order. By the end you'll have the site running on your own machine at `http://localhost:3000`.

### Step 1 — Install Git

Git is how you download the project and sync changes.

1. Go to **[git-scm.com/downloads](https://git-scm.com/downloads)**.
2. Download the installer for your OS (**Windows**, **macOS**, or **Linux**).
3. Run the installer and accept the defaults.
4. Open a terminal and verify:

   ```bash
   git --version
   # should print something like: git version 2.45.0
   ```

> **Windows users:** the installer also adds **Git Bash** — we recommend using it as your terminal so you can follow the Unix-style commands in this README verbatim.

---

### Step 2 — Install Node.js (v20 LTS or newer)

Node.js runs Next.js. It also ships with **npm**, the package manager we use.

1. Visit **[nodejs.org/en/download](https://nodejs.org/en/download)**.
2. Download the **LTS** build (currently 20.x or 22.x — either works).
3. Run the installer — accept the defaults.
4. Close and reopen your terminal, then check both tools are on your PATH:

   ```bash
   node --version   # v20.x.x or higher
   npm --version    # 10.x.x or higher
   ```

> **Already have an older Node?** Use [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows) to install Node 20 side-by-side without breaking other projects.

---

### Step 3 — Install Visual Studio Code

VSCode is our recommended editor.

1. Download from **[code.visualstudio.com](https://code.visualstudio.com/download)**.
2. Install with defaults. On Windows, tick **"Add to PATH"** and **"Open with Code"** in the installer options — they make life easier.
3. Launch VSCode and install these extensions (open the Extensions panel with `Ctrl+Shift+X` / `Cmd+Shift+X`):
   - **ESLint** — `dbaeumer.vscode-eslint`
   - **Tailwind CSS IntelliSense** — `bradlc.vscode-tailwindcss`
   - **Prettier** — `esbenp.prettier-vscode`
   - **GitLens** _(optional but lovely)_ — `eamodio.gitlens`

---

### Step 4 — Clone the Repository

1. Pick a folder to keep your projects in (e.g. `~/projects` or `D:\GitHub`).
2. In your terminal:

   ```bash
   cd ~/projects                                   # or your chosen folder
   git clone https://github.com/YOUR-ORG/ImHereTravels.git
   cd ImHereTravels/web
   ```

3. Open the project in VSCode:

   ```bash
   code .
   ```

   _(If `code` isn't recognised, open VSCode manually → **File → Open Folder** → pick the `web` folder.)_

---

### Step 5 — Install Project Dependencies

Inside the `web/` folder, run:

```bash
npm install
```

This reads [`package.json`](package.json) and downloads everything Next.js, React, Tailwind, and Framer Motion need into a local `node_modules/` folder. First install takes 1–3 minutes.

> You do **not** need to install Next.js globally — `npm install` puts it in the project for you.

---

### Step 6 — Configure Environment Variables

The contact form talks to the Gmail API. Even if you aren't testing email locally, the file must exist.

1. In VSCode's terminal (<kbd>Ctrl</kbd>+<kbd>`</kbd>), duplicate the template:

   ```bash
   cp .env.example .env          # macOS / Linux / Git Bash
   copy .env.example .env        # Windows CMD / PowerShell
   ```

2. Open [`.env`](.env.example) and paste the Gmail OAuth2 credentials (ask a teammate for them):

   ```bash
   GMAIL_CLIENT_ID=your-client-id
   GMAIL_CLIENT_SECRET=your-client-secret
   GMAIL_REFRESH_TOKEN=your-refresh-token
   ```

> `.env` is gitignored — credentials never get committed. Leave the values blank if you just want to browse the site without testing contact-form submissions.

---

### Step 7 — Start the Dev Server

Still in `web/`, run:

```bash
npm run dev
```

You should see:

```
 ▲ Next.js 16.2.3
 - Local:    http://localhost:3000
 ✓ Ready in 1.2s
```

Open **[http://localhost:3000](http://localhost:3000)** in any browser. 🎉

**Hot reload** is on — save any file in [`app/`](app/) and the page updates automatically.

---

### Step 8 — Running from VSCode's Built-in Terminal

Day-to-day, you'll stay inside VSCode:

1. Open the terminal: **View → Terminal** or <kbd>Ctrl</kbd>+<kbd>`</kbd>.
2. Ensure you're in the `web/` folder (the prompt should end in `…/ImHereTravels/web`).
3. Start the dev server: `npm run dev`.
4. Stop the server anytime with <kbd>Ctrl</kbd>+<kbd>C</kbd>.

Use the **+** icon in the terminal panel to open a second terminal for running git commands or linting while the dev server keeps running.

---

### Step 9 — Verify Your Setup

Run these once to make sure everything is wired up correctly:

```bash
npm run lint     # should exit with no errors
npm run build    # should produce a .next/ folder and finish successfully
```

If both succeed, you're ready to contribute. ✅

---

### Troubleshooting

| Problem | Fix |
| ------- | --- |
| `command not found: npm` | Node.js didn't add itself to PATH — reinstall and restart the terminal. |
| `EACCES` / permission errors on macOS/Linux | Don't use `sudo`. Fix npm's prefix per [npm docs](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally). |
| Port `3000` already in use | Run `npm run dev -- -p 3001` to switch ports. |
| `Module not found` after pulling changes | Re-run `npm install` — someone added a new dependency. |
| Styling looks broken | Restart the dev server; Tailwind v4 rebuilds tokens on start. |
| Gmail OAuth error on `/contact-us` | Check `.env` values; ensure the refresh token hasn't expired. |

---

## ✦ Scripts

| Command          | Purpose                         |
| ---------------- | ------------------------------- |
| `npm run dev`    | Start the local dev server      |
| `npm run build`  | Create an optimized prod build  |
| `npm run start`  | Serve the production build      |
| `npm run lint`   | Run ESLint across the codebase  |

---

## ✦ Environment

The contact form hits the Gmail API via OAuth2. Populate `.env` with:

```bash
GMAIL_CLIENT_ID=
GMAIL_CLIENT_SECRET=
GMAIL_REFRESH_TOKEN=
```

See [`.env.example`](.env.example) for the full template and [`app/api/contact/route.ts`](app/api/contact/route.ts) for how they're consumed.

---

## ✦ Tech Stack

| Layer         | Choice                                                                 |
| ------------- | ---------------------------------------------------------------------- |
| Framework     | **Next.js 16** (App Router)                                            |
| UI            | **React 19** + **Framer Motion**                                       |
| Styling       | **Tailwind CSS v4** — tokens defined in [`app/globals.css`](app/globals.css) |
| Language      | **TypeScript 5** (strict)                                              |
| Fonts         | Cartograph CF, HK Grotesk, DM Sans — self-hosted in [`public/Fonts/`](public/Fonts/) |

> ⚠️ Next.js 16 ships breaking changes — consult [`node_modules/next/dist/docs/`](node_modules/next/dist/docs/) or [`AGENTS.md`](AGENTS.md) before adding routes or server utilities.

---

## ✦ Project Structure

```
web/
├── app/                      Next.js App Router
│   ├── components/global/    Header, Footer, shared UI
│   ├── api/contact/          Contact-form Gmail OAuth handler
│   ├── globals.css           Tailwind v4 + brand tokens
│   └── layout.tsx            Root layout
├── data/                     Tour content (typed TS modules)
├── public/
│   ├── Fonts/                Cartograph, HK Grotesk, DM Sans
│   ├── Logos/ · logos/       Clover, Horizontal, Stacked, Tagline, Wordmark
│   ├── Icons/                Travel iconography (SVG)
│   ├── Emojis/ · Stickers/   Brand illustrations
│   └── brandkitGuideLines/   Brand guidelines PDF
└── types/                    Shared TypeScript types
```

---

## 🎨 Brand Kit

Full guidelines live in [`public/brandkitGuideLines/`](public/brandkitGuideLines/). Key excerpts:

### Color palette

| Token              | Hex       | Preview |
| ------------------ | --------- | :-----: |
| `crimson-red`      | `#EF3340` | ![](https://readme-swatches.vercel.app/EF3340?style=round) |
| `light-red`        | `#FF585D` | ![](https://readme-swatches.vercel.app/FF585D?style=round) |
| `midnight`         | `#1C1F2A` | ![](https://readme-swatches.vercel.app/1C1F2A?style=round) |
| `grey`             | `#959595` | ![](https://readme-swatches.vercel.app/959595?style=round) |
| `light-grey`       | `#F2F0EE` | ![](https://readme-swatches.vercel.app/F2F0EE?style=round) |
| `royal-purple`     | secondary | ![](https://readme-swatches.vercel.app/5B2C86?style=round) |
| `spring-green`     | secondary | ![](https://readme-swatches.vercel.app/2EB086?style=round) |
| `vivid-orange`     | secondary | ![](https://readme-swatches.vercel.app/F28A33?style=round) |
| `sunglow-yellow`   | secondary | ![](https://readme-swatches.vercel.app/FFC94A?style=round) |

### Typography

- **`font-display`** → Cartograph CF — headlines & taglines
- **`font-sans`** → HK Grotesk — subheads (H3–H6)
- **`font-body`** → DM Sans — body copy, CTAs, URLs _(default)_

Apply responsively:

```tsx
<h1 className="font-display text-h1-mobile md:text-h1-desktop">Hello</h1>
<p  className="font-body text-b2-mobile md:text-b2-desktop">Tagline</p>
```

### Logo family

| Variant    | When to use                        | Path                          |
| ---------- | ---------------------------------- | ----------------------------- |
| Horizontal | Headers, nav, email signatures     | [`public/logos/Horizontal/`](public/logos/Horizontal/) |
| Stacked    | Social avatars, square placements  | [`public/logos/Stacked/`](public/logos/Stacked/) |
| Clover     | Favicons, watermarks, monograms    | [`public/logos/Clover/`](public/logos/Clover/) |
| Wordmark   | Typography-led layouts             | [`public/logos/Wordmark/`](public/logos/Wordmark/) |
| Tagline    | Campaigns with the brand promise   | [`public/logos/Tagline/`](public/logos/Tagline/) |

_Light-only — do **not** add a `prefers-color-scheme: dark` block. The brand defines no dark theme._

---

## ✦ Deployment

The site is hosted on **Vercel**. Every push to `main` triggers a production deploy to [imheretravels.com](https://imheretravels.com); pull requests get preview URLs automatically.

---

<div align="center">

<img src="public/logos/Clover/Digital/SVG/Red/Digital_Clover_Red.svg" alt="" width="48" />

**Made with ♥ for travelers who want to be _here_.**

© I'm Here Travels · [imheretravels.com](https://imheretravels.com)

</div>
