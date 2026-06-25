import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SECTIONS, HERO } from '../../lib/portfolio-content'

// Navigation : wordmark + statut en haut, pagination de sections à droite.
// Couleurs en mix-blend-difference pour rester lisible sur ivoire comme encre.
export default function Nav({ ready }) {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  function go(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <AnimatePresence>
      {ready && (
        <>
          <motion.div
            className="pf-nav-top"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <button className="pf-wordmark" onClick={() => go('hero')} data-cursor>
              TB<span className="pf-wordmark-dot" />
            </button>
            <span className="pf-nav-status">
              <span className="pf-status-pulse" />
              {HERO.status}
            </span>
          </motion.div>

          <motion.nav
            className="pf-nav-side"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            aria-label="Sections"
          >
            {SECTIONS.map((s, i) => (
              <button
                key={s.id}
                className={`pf-nav-item ${active === s.id ? 'is-active' : ''}`}
                onClick={() => go(s.id)}
                data-cursor
              >
                <span className="pf-nav-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="pf-nav-label">{s.label}</span>
                <span className="pf-nav-tick" />
              </button>
            ))}
          </motion.nav>

          <style>{NAV_CSS}</style>
        </>
      )}
    </AnimatePresence>
  )
}

const NAV_CSS = `
.pf-nav-top {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: clamp(1.1rem, 2.5vw, 1.8rem) clamp(1.25rem, 5vw, 4rem);
  mix-blend-mode: difference; color: #F3EEE4;
  pointer-events: none;
}
.pf-nav-top > * { pointer-events: auto; }
.pf-wordmark {
  font-family: var(--font-display); font-size: 1.5rem; font-weight: 500;
  letter-spacing: -0.03em; background: none; border: 0; color: inherit;
  cursor: pointer; display: inline-flex; align-items: flex-end; gap: 2px;
}
.pf-wordmark-dot { width: 5px; height: 5px; background: var(--brass); border-radius: 50%; margin-bottom: 6px; }
.pf-nav-status {
  font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.12em;
  text-transform: uppercase; display: inline-flex; align-items: center; gap: 0.55rem;
}
.pf-status-pulse {
  width: 7px; height: 7px; border-radius: 50%; background: #4ADE80;
  box-shadow: 0 0 0 0 rgba(74,222,128,0.6); animation: pf-pulse 2s infinite;
}
@keyframes pf-pulse {
  0% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
  70% { box-shadow: 0 0 0 7px rgba(74,222,128,0); }
  100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
}

.pf-nav-side {
  position: fixed; right: clamp(1rem, 2.5vw, 2.2rem); top: 50%; z-index: 100;
  transform: translateY(-50%);
  display: flex; flex-direction: column; gap: 0.35rem; align-items: flex-end;
  mix-blend-mode: difference; color: #F3EEE4;
}
.pf-nav-item {
  background: none; border: 0; cursor: pointer; color: inherit;
  display: inline-flex; align-items: center; gap: 0.7rem;
  padding: 0.35rem 0; opacity: 0.5;
  transition: opacity 0.3s ease;
}
.pf-nav-item:hover { opacity: 1; }
.pf-nav-item.is-active { opacity: 1; }
.pf-nav-num { font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.1em; }
.pf-nav-label {
  font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.08em;
  text-transform: uppercase;
  max-width: 0; overflow: hidden; white-space: nowrap; opacity: 0;
  transition: max-width 0.45s var(--ease, ease), opacity 0.35s ease;
}
.pf-nav-item:hover .pf-nav-label, .pf-nav-item.is-active .pf-nav-label {
  max-width: 160px; opacity: 1;
}
.pf-nav-tick { width: 22px; height: 1px; background: currentColor; transition: width 0.35s ease; }
.pf-nav-item.is-active .pf-nav-tick { width: 40px; background: var(--brass); }

@media (max-width: 860px) {
  .pf-nav-side { display: none; }
  .pf-nav-status { display: none; }
}
`
