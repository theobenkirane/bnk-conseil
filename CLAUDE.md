# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview production build locally
npm run lint     # ESLint
```

No test suite is configured.

## Architecture

**React 19 + Vite 8 + TailwindCSS v4 + React Router v7 + Framer Motion.**  
SPA deployed to Vercel with `vercel.json` rewriting all routes to `index.html`.

### Two apps in one SPA

`App.jsx` hosts two completely separate experiences under the same router:

- **BNK Consulting site** — all routes except `/portfolio`. Rendered inside `AppLayout` with `Header`, `Footer`, and `AvailabilityBanner`. Light theme (`#FAFBFF` base), Inter font, violet/purple palette (`primary: #7C3AED`).
- **Personal portfolio** — `/portfolio` only. `AppLayout` detects `location.pathname === '/portfolio'` and renders without the shared shell, using IBM Plex Sans font instead.

All routes except `Home` are lazy-loaded via `React.lazy`.

### Page transitions

Every page should be wrapped in `<PageTransition>` (fade + slide-up, 0.35 s). `AnimatePresence mode="wait"` in `AnimatedRoutes` orchestrates enter/exit. Scroll resets to top on each navigation via `useEffect` on `location.pathname`.

### SEO pattern

Each page uses `<SEOHead>` (wraps `react-helmet-async`) for `<title>`, `<meta description>`, Open Graph, Twitter card, canonical URL, and optional JSON-LD schema. The default OG image is `https://bnk-conseil.com/og-image.png`.

### Availability banner

`src/config/availability.js` exports `AVAILABILITY = { active, message, cta, ctaLink }`. When `active: true`, `AvailabilityBanner` renders a sticky top bar and `AppLayout` adds `paddingTop: 40px` to `<main>`. Toggle `active` here to show/hide the banner.

### Portfolio content

All portfolio copy (hero stats, experience, projects, skills, etc.) lives in `src/lib/portfolio-content.js`. Update that file to change displayed content without touching any component.

### SEO & guide pages

`src/pages/seo/` contains city/sector landing pages (restaurant, artisan, coach, etc.).  
`src/pages/guides/` contains editorial guide pages.  
Both follow the same `PageTransition` + `SEOHead` pattern as other pages.

### Calendly

The booking URL used across the site is `https://calendly.com/conseil-bnk/30min` (defined as a constant in each page that uses it, not centralised).
