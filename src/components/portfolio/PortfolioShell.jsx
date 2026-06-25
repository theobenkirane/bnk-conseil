import '@fontsource-variable/fraunces'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'

import { ThemeProvider, Backdrop } from './theme'
import { Cursor } from './motion'

// Coquille du portfolio : polices, variables de design, fond cinématique,
// curseur custom et styles globaux scopés sous #portfolio-root.
export default function PortfolioShell({ children }) {
  return (
    <ThemeProvider>
      <div id="portfolio-root">
        <style>{CSS}</style>
        <Backdrop />
        <Cursor />
        <div className="pf-content">{children}</div>
      </div>
    </ThemeProvider>
  )
}

const CSS = `
#portfolio-root {
  --font-display: 'Fraunces Variable', Georgia, 'Times New Roman', serif;
  --font-body: 'Geist Variable', system-ui, -apple-system, sans-serif;
  --font-mono: 'Geist Mono Variable', ui-monospace, monospace;
  --ink: #15120E;
  --ivory: #F3EEE4;
  --brass: #BE823A;
  --brass-bright: #D89A4B;
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow-x: clip;
  background: var(--ivory);
  color: var(--ink);
  font-family: var(--font-body);
  font-synthesis: none;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* ── Thèmes ─────────────────────────────────────────────────────────────── */
#portfolio-root [data-theme="ivory"] {
  --fg: #15120E;
  --muted: #6F6557;
  --line: rgba(21,18,14,0.12);
  --hair: rgba(21,18,14,0.07);
  --base: #F3EEE4;
  --card: rgba(21,18,14,0.022);
  --card-hover: rgba(21,18,14,0.045);
}
#portfolio-root [data-theme="ink"] {
  --fg: #F3EEE4;
  --muted: #A99E8D;
  --line: rgba(243,238,228,0.15);
  --hair: rgba(243,238,228,0.08);
  --base: #15120E;
  --card: rgba(243,238,228,0.035);
  --card-hover: rgba(243,238,228,0.07);
}

/* ── Fond cinématique fixe ──────────────────────────────────────────────── */
.pf-backdrop { position: fixed; inset: 0; z-index: 0; }
.pf-grid {
  position: absolute; inset: -12%;
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: calc(100vw / 8) calc(100vw / 8);
  -webkit-mask-image: radial-gradient(120% 100% at 50% 30%, #000 35%, transparent 88%);
  mask-image: radial-gradient(120% 100% at 50% 30%, #000 35%, transparent 88%);
  will-change: transform;
}
.pf-vignette {
  position: absolute; inset: 0;
  background: radial-gradient(130% 120% at 50% 0%, transparent 52%, rgba(0,0,0,0.16) 100%);
  pointer-events: none;
}
.pf-grain {
  position: absolute; inset: 0; opacity: 0.045; pointer-events: none;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.pf-content { position: relative; z-index: 1; }

/* ── Sections ───────────────────────────────────────────────────────────── */
.pf-section {
  position: relative;
  z-index: 1;
  color: var(--fg);
  padding: clamp(5rem, 12vh, 9rem) clamp(1.25rem, 5vw, 4rem);
}
.pf-wrap { width: 100%; max-width: 1240px; margin: 0 auto; }
.pf-wrap-narrow { max-width: 880px; }

/* ── Typographie ────────────────────────────────────────────────────────── */
#portfolio-root h1, #portfolio-root h2, #portfolio-root h3, #portfolio-root h4 {
  font-family: var(--font-display);
  font-weight: 460;
  letter-spacing: -0.02em;
  line-height: 0.98;
  margin: 0;
}
.pf-display {
  font-size: clamp(2.9rem, 9vw, 8.5rem);
  font-weight: 430;
  line-height: 0.92;
  letter-spacing: -0.035em;
}
.pf-h2 {
  font-size: clamp(2rem, 5.2vw, 4.4rem);
  line-height: 0.96;
  letter-spacing: -0.028em;
}
.pf-h3 { font-size: clamp(1.4rem, 2.6vw, 2.1rem); letter-spacing: -0.02em; }
.pf-italic { font-style: italic; font-weight: 380; }
.pf-serif { font-family: var(--font-display); }

.pf-lead {
  font-size: clamp(1.1rem, 1.8vw, 1.5rem);
  line-height: 1.5;
  color: var(--fg);
  font-weight: 380;
  max-width: 46ch;
}
.pf-body {
  font-size: clamp(1rem, 1.25vw, 1.12rem);
  line-height: 1.65;
  color: var(--muted);
  font-weight: 400;
}
.pf-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}
.pf-eyebrow::before {
  content: '';
  width: 7px; height: 7px;
  background: var(--brass);
  border-radius: 1px;
  transform: rotate(45deg);
  flex: none;
}
.pf-mono { font-family: var(--font-mono); }
.pf-brass { color: var(--brass); }

/* ── Texte masqué (MaskText) ────────────────────────────────────────────── */
.pf-mask { display: inline-flex; overflow: hidden; vertical-align: top; padding-bottom: 0.06em; }
.pf-mask-inner { display: inline-block; will-change: transform; }

/* ── Filets & séparateurs ───────────────────────────────────────────────── */
.pf-hr { height: 1px; width: 100%; background: var(--line); border: 0; }

/* ── Boutons ────────────────────────────────────────────────────────────── */
.pf-btn, .pf-btn-ghost, .pf-btn-brass {
  display: inline-flex; align-items: center; gap: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.82rem; font-weight: 500;
  letter-spacing: 0.04em;
  padding: 1rem 1.6rem;
  border-radius: 999px;
  cursor: pointer; border: 1px solid transparent;
  text-decoration: none; line-height: 1;
  transition: background 0.4s var(--ease, ease), color 0.4s ease, border-color 0.4s ease, transform 0.3s ease;
}
.pf-btn { background: var(--fg); color: var(--base); }
.pf-btn:hover { background: var(--brass); color: var(--ink); }
.pf-btn-brass { background: var(--brass); color: var(--ink); }
.pf-btn-brass:hover { background: var(--brass-bright); }
.pf-btn-ghost { background: transparent; color: var(--fg); border-color: var(--line); }
.pf-btn-ghost:hover { border-color: var(--brass); color: var(--brass); }
.pf-btn .pf-arrow, .pf-btn-ghost .pf-arrow, .pf-btn-brass .pf-arrow {
  transition: transform 0.35s var(--ease, ease);
}
.pf-btn:hover .pf-arrow, .pf-btn-ghost:hover .pf-arrow, .pf-btn-brass:hover .pf-arrow {
  transform: translate(3px, -3px);
}

/* ── Cartes ─────────────────────────────────────────────────────────────── */
.pf-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 18px;
  transition: background 0.4s ease, border-color 0.4s ease, transform 0.5s var(--ease, ease);
  backdrop-filter: blur(2px);
}
.pf-card:hover { background: var(--card-hover); border-color: var(--brass); }

/* ── Curseur custom ─────────────────────────────────────────────────────── */
.pf-cursor-ring, .pf-cursor-dot {
  position: fixed; top: 0; left: 0; z-index: 9999;
  pointer-events: none; border-radius: 50%;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
}
.pf-cursor-ring { width: 38px; height: 38px; border: 1px solid #F3EEE4; }
.pf-cursor-dot { width: 6px; height: 6px; background: #F3EEE4; }
@media (pointer: coarse) { .pf-cursor-ring, .pf-cursor-dot { display: none; } }

/* ── Loader d'intro ─────────────────────────────────────────────────────── */
.pf-loader {
  position: fixed; inset: 0; z-index: 9000;
  background: var(--ink); color: var(--ivory);
  display: flex; align-items: flex-end; justify-content: center;
  padding: clamp(2rem, 6vw, 5rem);
}
.pf-loader-inner {
  width: 100%; max-width: 1240px;
  display: grid; grid-template-columns: 1fr auto; align-items: end; gap: 1rem;
}
.pf-loader-label {
  font-family: var(--font-mono); font-size: 0.8rem;
  letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.65;
}
.pf-loader-count {
  font-family: var(--font-display); font-weight: 380;
  font-size: clamp(4rem, 16vw, 13rem); line-height: 0.8;
  letter-spacing: -0.04em; grid-column: 1 / -1;
}
.pf-loader-bar { grid-column: 1 / -1; height: 1px; background: rgba(243,238,228,0.2); margin-top: 1.5rem; }
.pf-loader-fill { height: 100%; background: var(--brass); transform-origin: left; }

/* ── Liens fins ─────────────────────────────────────────────────────────── */
.pf-link {
  color: var(--fg); text-decoration: none; position: relative;
  background-image: linear-gradient(var(--brass), var(--brass));
  background-size: 0% 1px; background-position: 0 100%; background-repeat: no-repeat;
  transition: background-size 0.4s var(--ease, ease), color 0.4s ease;
  padding-bottom: 2px;
}
.pf-link:hover { background-size: 100% 1px; color: var(--brass); }

#portfolio-root a:focus-visible, #portfolio-root button:focus-visible {
  outline: 2px solid var(--brass); outline-offset: 4px; border-radius: 3px;
}
#portfolio-root ::selection { background: var(--brass); color: var(--ink); }

@media (prefers-reduced-motion: reduce) {
  #portfolio-root * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  .pf-cursor-ring, .pf-cursor-dot { display: none; }
}
`
