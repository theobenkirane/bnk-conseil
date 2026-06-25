import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Section } from '../theme'
import { MaskText, Magnetic, Counter } from '../motion'
import { HERO } from '../../../lib/portfolio-content'

const START = 0.2 // léger délai d'entrée au montage de la page

export default function HeroSection() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <Section theme="ivory" id="hero" className="pf-hero">
      <div ref={ref} className="pf-wrap pf-hero-grid">
        <div className="pf-hero-main">
          <motion.span
            className="pf-eyebrow pf-hero-eyebrow"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: START }}
          >
            {HERO.role} · {HERO.domain}
          </motion.span>

          <h1 className="pf-display pf-hero-title">
            {HERO.headline.map((line, i) => (
              <MaskText
                key={i}
                as="span"
                className="pf-hero-line"
                text={line}
                delay={START + 0.15 + i * 0.12}
              />
            ))}
          </h1>

          <motion.p
            className="pf-lead pf-hero-pitch"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: START + 0.7 }}
          >
            {HERO.pitch}
          </motion.p>

          <motion.div
            className="pf-hero-cta"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: START + 0.9 }}
          >
            <Magnetic>
              <a className="pf-btn-brass" href="#contact" data-cursor>
                Me contacter <span className="pf-arrow">↗</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a className="pf-btn-ghost" href={HERO.cta.cv} target="_blank" rel="noreferrer" data-cursor>
                Télécharger le CV
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          className="pf-hero-aside"
          style={{ opacity: fade }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: START + 0.4 }}
        >
          <div className="pf-hero-portrait">
            <motion.img
              className="pf-hero-img"
              src="/portfolio/theo-portrait.jpg"
              alt="Théo Benkirane"
              style={{ y: portraitY, scale: portraitScale }}
              loading="eager"
            />
            <span className="pf-hero-frame" />
            <span className="pf-hero-tag pf-mono">{HERO.name}</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="pf-hero-stats pf-wrap"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: START + 1.05 }}
      >
        {HERO.facts.map((f) => (
          <div key={f.v} className="pf-hero-stat">
            <span className="pf-hero-stat-k">
              <Counter to={f.value} prefix={f.prefix} suffix={f.suffix} />
            </span>
            <span className="pf-hero-stat-v">{f.v}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="pf-scrollcue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: START + 1.3 }}
      >
        <span className="pf-mono">Scroll</span>
        <span className="pf-scrollcue-line" />
      </motion.div>

      <style>{CSS}</style>
    </Section>
  )
}

const CSS = `
.pf-hero {
  min-height: 100vh; display: flex; flex-direction: column; justify-content: center;
  padding-top: clamp(6rem, 14vh, 9rem); padding-bottom: clamp(3rem, 6vh, 5rem);
}
.pf-hero-grid {
  position: relative;
  display: grid; grid-template-columns: 1.35fr 0.65fr; gap: clamp(2rem, 5vw, 5rem);
  align-items: center; flex: 1;
}
.pf-hero-eyebrow { margin-bottom: clamp(1.2rem, 3vh, 2rem); }
.pf-hero-title { margin-bottom: clamp(1.5rem, 3.5vh, 2.5rem); }
.pf-hero-line { display: block; }
.pf-hero-line:nth-child(2) { padding-left: clamp(0px, 6vw, 4rem); }
.pf-hero-line:nth-child(3) { font-style: italic; font-weight: 380; color: var(--brass); }
.pf-hero-pitch { margin-bottom: clamp(1.8rem, 4vh, 2.6rem); }
.pf-hero-cta { display: flex; flex-wrap: wrap; gap: 0.9rem; }

.pf-hero-aside { display: flex; justify-content: center; }
.pf-hero-portrait {
  position: relative; width: 100%; max-width: 340px; aspect-ratio: 3 / 4;
  border-radius: 200px 200px 18px 18px; overflow: hidden;
  border: 1px solid var(--line);
}
.pf-hero-img {
  position: absolute; top: -8%; left: 0; z-index: 0;
  width: 100%; height: 116%;
  object-fit: cover; object-position: center top; display: block;
}
.pf-hero-frame {
  position: absolute; inset: 10px; z-index: 2; border: 1px solid rgba(21,18,14,0.14);
  border-radius: 190px 190px 12px 12px; pointer-events: none;
}
.pf-hero-tag {
  position: absolute; left: 14px; bottom: 14px; z-index: 3;
  font-size: 0.7rem; letter-spacing: 0.08em; color: #F3EEE4;
  background: rgba(21,18,14,0.55); backdrop-filter: blur(8px);
  padding: 0.4rem 0.7rem; border-radius: 999px;
}

.pf-hero-stats {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: clamp(1rem, 3vw, 2.5rem); margin-top: clamp(2rem, 5vh, 3.5rem);
  padding-top: clamp(1.5rem, 4vh, 2.5rem); border-top: 1px solid var(--line);
}
.pf-hero-stat { display: flex; flex-direction: column; gap: 0.35rem; }
.pf-hero-stat-k {
  font-family: var(--font-display); font-size: clamp(1.5rem, 3vw, 2.4rem);
  font-weight: 440; letter-spacing: -0.02em; line-height: 1;
}
.pf-hero-stat-v { font-family: var(--font-mono); font-size: 0.72rem; color: var(--muted); letter-spacing: 0.04em; }

.pf-scrollcue {
  position: absolute; bottom: clamp(1.2rem, 3vh, 2rem); left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
  font-size: 0.66rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted);
}
.pf-scrollcue-line { width: 1px; height: 38px; background: linear-gradient(var(--brass), transparent); animation: pf-cue 2s infinite; }
@keyframes pf-cue { 0%,100% { transform: scaleY(0.4); opacity: 0.4; transform-origin: top; } 50% { transform: scaleY(1); opacity: 1; transform-origin: top; } }

@media (max-width: 900px) {
  .pf-hero-grid { grid-template-columns: 1fr; }
  .pf-hero-aside { grid-row: 1; justify-content: flex-start; }
  .pf-hero-portrait { max-width: 240px; }
  .pf-hero-line:nth-child(2) { padding-left: 0; }
  .pf-hero-stats { grid-template-columns: repeat(2, 1fr); }
  .pf-scrollcue { display: none; }
}
`
