import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useThemeSection } from '../theme'
import { Reveal, MaskText } from '../motion'
import { EXPERIENCE } from '../../../lib/portfolio-content'

export default function ExperienceSection() {
  const [desktop, setDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)')
    const on = () => setDesktop(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  return desktop ? <HorizontalExp /> : <VerticalExp />
}

function Header() {
  return (
    <div className="pf-wrap pf-exp-head">
      <Reveal><span className="pf-eyebrow">Le parcours</span></Reveal>
      <MaskText as="h2" className="pf-h2" text="Cinq ans, cinq terrains." />
      <Reveal delay={0.1}>
        <p className="pf-body pf-exp-sub">De l'immobilier au SaaS : comprendre le besoin, conclure, fidéliser.</p>
      </Reveal>
    </div>
  )
}

function Card({ exp, i }) {
  return (
    <article className="pf-exp-card pf-card">
      <div className="pf-exp-card-top">
        <span className="pf-exp-index pf-mono">{String(i + 1).padStart(2, '0')}</span>
        {exp.badge && <span className="pf-exp-badge">{exp.badge}</span>}
      </div>

      <div className="pf-exp-logo-wrap">
        {exp.logo ? (
          <img src={exp.logo} alt={exp.company} className="pf-exp-logo" loading="lazy" />
        ) : (
          <span className="pf-exp-logo-fallback pf-mono">{exp.company.charAt(0)}</span>
        )}
      </div>

      <span className="pf-mono pf-exp-period">{exp.period}</span>
      <h3 className="pf-exp-role">{exp.role}</h3>
      <span className="pf-exp-company">{exp.company} · {exp.location}</span>

      <p className="pf-exp-highlight">{exp.highlight}</p>

      <ul className="pf-exp-missions">
        {exp.missions.map((m, k) => (
          <li key={k}>{m}</li>
        ))}
      </ul>

      <div className="pf-exp-tags">
        {exp.tags.map((t) => (
          <span key={t} className="pf-tag">{t}</span>
        ))}
      </div>
    </article>
  )
}

function HorizontalExp() {
  const ref = useThemeSection('ivory')
  const trackRef = useRef(null)
  const [dist, setDist] = useState(0)

  useEffect(() => {
    const calc = () => {
      if (trackRef.current) setDist(Math.max(0, trackRef.current.scrollWidth - window.innerWidth))
    }
    calc()
    const t = setTimeout(calc, 400)
    window.addEventListener('resize', calc)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', calc)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0.08, 1], [0, -dist])
  const progress = useTransform(scrollYProgress, [0.08, 1], ['0%', '100%'])

  return (
    <section
      ref={ref}
      id="experience"
      data-theme="ivory"
      className="pf-section pf-exp"
      style={{ height: `calc(100vh + ${dist}px)`, padding: 0 }}
    >
      <div className="pf-exp-sticky">
        <Header />
        <motion.div ref={trackRef} className="pf-exp-track" style={{ x }}>
          {EXPERIENCE.map((exp, i) => (
            <Card key={exp.id} exp={exp} i={i} />
          ))}
          <div className="pf-exp-end">
            <span className="pf-mono">Et la suite<br />avec vous ?</span>
          </div>
        </motion.div>
        <div className="pf-exp-progress">
          <motion.div className="pf-exp-progress-fill" style={{ width: progress }} />
        </div>
      </div>
      <style>{CSS}</style>
    </section>
  )
}

function VerticalExp() {
  const ref = useThemeSection('ivory')
  return (
    <section ref={ref} id="experience" data-theme="ivory" className="pf-section">
      <Header />
      <div className="pf-wrap pf-exp-vstack">
        {EXPERIENCE.map((exp, i) => (
          <Card key={exp.id} exp={exp} i={i} />
        ))}
      </div>
      <style>{CSS}</style>
    </section>
  )
}

const CSS = `
.pf-exp-sticky {
  position: sticky; top: 0; height: 100vh; overflow: hidden;
  display: flex; flex-direction: column; justify-content: center;
  padding: clamp(4rem, 8vh, 6rem) 0 2rem;
}
.pf-exp-head { margin-bottom: clamp(1.5rem, 4vh, 2.5rem); padding-left: clamp(1.25rem, 5vw, 4rem); }
.pf-exp-head .pf-eyebrow { margin-bottom: 1rem; }
.pf-exp-sub { margin-top: 1rem; max-width: 44ch; }

.pf-exp-track { display: flex; gap: clamp(1rem, 2vw, 1.6rem); padding: 0 clamp(1.25rem, 5vw, 4rem); align-items: stretch; }
.pf-exp-card {
  flex: 0 0 auto; width: clamp(300px, 30vw, 420px);
  padding: clamp(1.5rem, 2.2vw, 2.2rem); display: flex; flex-direction: column;
}
.pf-exp-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.2rem; }
.pf-exp-index { font-size: 0.8rem; color: var(--muted); }
.pf-exp-badge {
  font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--ink); background: var(--brass); padding: 0.3rem 0.6rem; border-radius: 999px;
}
.pf-exp-logo-wrap {
  height: 84px; width: 100%; margin-bottom: 1.4rem;
  display: flex; align-items: center; justify-content: center;
  background: #fff; border: 1px solid var(--line); border-radius: 14px;
  padding: 1rem 1.4rem; box-shadow: 0 1px 2px rgba(21,18,14,0.04);
}
.pf-exp-logo { max-height: 100%; max-width: 100%; object-fit: contain; display: block; }
.pf-exp-logo-fallback {
  font-family: var(--font-display); font-weight: 460; font-size: 2rem; color: var(--brass);
}
.pf-exp-period { font-size: 0.7rem; color: var(--muted); letter-spacing: 0.05em; }
.pf-exp-role { font-size: clamp(1.3rem, 1.9vw, 1.7rem); margin: 0.4rem 0 0.2rem; }
.pf-exp-company { font-size: 0.85rem; color: var(--muted); }
.pf-exp-highlight {
  font-family: var(--font-display); font-style: italic; font-weight: 380;
  font-size: 1.05rem; line-height: 1.35; margin: 1.2rem 0; color: var(--fg);
}
.pf-exp-missions { list-style: none; padding: 0; margin: 0 0 1.4rem; display: flex; flex-direction: column; gap: 0.55rem; flex: 1; }
.pf-exp-missions li { position: relative; padding-left: 1.1rem; font-size: 0.88rem; color: var(--muted); line-height: 1.45; }
.pf-exp-missions li::before { content: ''; position: absolute; left: 0; top: 0.5em; width: 5px; height: 5px; background: var(--brass); transform: rotate(45deg); }
.pf-exp-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: auto; }
.pf-tag {
  font-family: var(--font-mono); font-size: 0.64rem; letter-spacing: 0.04em;
  color: var(--muted); border: 1px solid var(--line); padding: 0.3rem 0.6rem; border-radius: 999px;
}
.pf-exp-end {
  flex: 0 0 auto; width: 320px; display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display); font-size: 1.6rem; font-style: italic; color: var(--muted); text-align: center;
}

.pf-exp-progress { margin: 1.5rem clamp(1.25rem, 5vw, 4rem) 0; height: 1px; background: var(--line); }
.pf-exp-progress-fill { height: 100%; background: var(--brass); }

.pf-exp-vstack { display: flex; flex-direction: column; gap: 1.2rem; margin-top: 2rem; }
.pf-exp-vstack .pf-exp-card { width: 100%; }
`
