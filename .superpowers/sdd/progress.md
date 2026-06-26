# BNK Home Liquid Upgrade — SDD Progress Ledger

Plan: docs/superpowers/plans/2026-06-26-bnk-home-liquid-upgrade.md
Branch: main
Started: 2026-06-26
Base commit: 777560b

## Tasks

- [x] Task 1: Fondation — tokens couleur, police, utilitaires CSS (777560b..6a8ca7b, review clean)
- [x] Task 2: Reveal (GSAP scroll reveal) (6a8ca7b..3c36441, review clean)
- [x] Task 3: MagneticButton (3c36441..2768dca, review clean — added <button> fallback fix)
- [x] Task 4: LiquidCursor + intégration AppLayout (2768dca..64fccd7, brief-faithful; portfolio early-return intact)
- [x] Task 5: LiquidChrome (WebGL shader hero) (64fccd7..c43e273, review clean — fix: shader error fallback + GL cleanup)
- [x] Task 6: LiquidDivider (gooey SVG) (c43e273..3db6698, review clean)
- [x] Task 7: StellarNav (logo cavalier, tokens, MagneticButton) (3db6698..1c42335, review clean — fix: restored mobile-menu close effect)
- [x] Task 8: NominationCard (tilt 3D + sheen) (1c42335..0a98bde, review clean — new signature {title,subtitle,to,icon,className}, Home still builds via {Icon &&})
- [x] Task 9: StatCard (procédural, counter animé) (0a98bde..ca7779e, review clean — mix-blend bug removed, scroller wired, reduced-motion deviation sound)
- [x] Task 10: Home.jsx (rewrite complet) (ca7779e..55e3d66, review clean — keystone; only cosmetic Minor: em-dashes in JSX comments, unused className on LiquidChrome)
- [x] Task 11: Vérification finale + graphify update (build OK, lint clean on changed files, graphify updated 96344 nodes)

## Live preview verification (npm dev @ 5173, port reached via node node_modules/vite/bin/vite.js — npm/.cmd spawn fails on Windows)
- Hero LiquidChrome WebGL canvas renders (subtle teal liquid behind "BNK Conseil", h1 opacity 1).
- Nav: cavalier logo visible via CSS mask (logo.svg now committed), chamfered teal CTA.
- Services de-cramped: clean 2-col NominationCard grid (Audit / Suivi KPIs / Création Site / SEO Local / Digitalisation).
- StatCards LEGIBLE: +40% / 50+ / 30j white #fff, opacity 1, mixBlendMode normal (original plus-darker illegibility bug GONE).
- LiquidCursor = single mix-blend-difference dot, NOT a broken doubled cursor → Task 4 VISUAL concern RESOLVED.
- LiquidDivider gooey transition + PageIndicator (01—03) + ScrollHint render. Zero console errors/warnings.
- launch.json fixed: runtimeExecutable node + node_modules/vite/bin/vite.js (npm.cmd → EINVAL on Windows preview spawn).

## Final whole-branch review (777560b..55e3d66, opus reviewer): "Merge with fixes"
- CRITICAL (RESOLVED, commit 8d68508): public/logo.svg was untracked → empty nav logo in prod. Committed. ("logo transparent.png" left untracked: unreferenced source asset, user's to keep.)
- Minor (open, recorded for user): StellarNav.jsx:68 #737373 hardcoded (already tracked); StatCard module-scope prefersReducedMotion cached at import (inconsistent w/ siblings, negligible in client SPA); --grad-display token (index.css:25) defined but unused; LiquidChrome global window mousemove not gated on visibility (cheap, cleaned up).
- Reviewer confirmed: portfolio untouched, no em-dashes in visible French, tokens-only in new components, ScrollTrigger scroller wiring correct, WebGL cleanup+fallback exceed plan, a11y guards present everywhere.
- Repo-wide `npm run lint` has 43 PRE-EXISTING errors (unused `motion` in seo/guides/portfolio) present on base 777560b; branch's own files lint-clean.

## Minor findings (for final review)
- Task 1 (Important, pre-existing not introduced): hardcoded colors in src/index.css body/scrollbar/.gradient-text duplicate the new tokens (#FAFBFF=--c-bg, #066377=--c-teal, #3B9BB3=--c-teal-mid). Cleanup candidate.
- Task 1 (Minor): eslint.config.js touched outside brief (added open-design to ignores) — justified one-liner.
- Repo has 45 pre-existing eslint errors in src/pages/seo/** (unused `motion` imports) unrelated to this work. Per-task lint gate = no NEW errors on changed files.
- Task 2 (Minor): Reveal.jsx uses eslint-disable-next-line no-unused-vars on the `as: Element` param. prefers-reduced-motion not reactive to live OS toggle (spec-inherent).
- Task 4 (VISUAL — confirm in final live preview): LiquidCursor never sets cursor:none, so the custom mix-blend dot coexists with the native pointer. This is brief-intended (decorative trailing blend dot), but verify live it does not read as a broken doubled cursor; if it does, add guarded cursor:none. rAF loop has no visibility/blur pause (minor perf).
- Task 5 (Minor): LiquidChrome null-shader early-return path leaks vertShader if frag compile fails but vert succeeds (one-time per mount, extremely unlikely). Link-failure path deletes both correctly.
- Task 6 (Minor, brief design): LiquidDivider embeds <filter id="liquid-goo"> each instance; rendering N dividers => duplicate DOM ids (valid render, invalid HTML). Task 10 should render the divider but be aware. Acceptable as-is.
- Task 7 (Minor, inherited from brief): nav inactive link color hardcoded #737373 (not a token). Track for a future token pass (e.g. --c-mid).
- Task 8 (Minor, inherited from brief): NominationCard SVG polygon uses hardcoded rgba(255,255,255,0.6) + rgba(6,99,119,0.25) instead of tokens. matchMedia called per mousemove (negligible).
- Task 10 (Cosmetic): 3 em-dashes in JSX comments (lines 33/72/93) — not visible French copy, harmless. LiquidChrome receives an unused `className` prop.
