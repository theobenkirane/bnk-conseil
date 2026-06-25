import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Section } from '../theme'
import { Reveal, MaskText } from '../motion'
import { ABOUT } from '../../../lib/portfolio-content'

export default function AboutSection() {
  const imgRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <Section theme="ink" id="about">
      <div className="pf-wrap">
        <Reveal>
          <span className="pf-eyebrow">{ABOUT.eyebrow}</span>
        </Reveal>

        <div className="pf-about-head">
          <MaskText as="h2" className="pf-h2" text={ABOUT.headline} />
          <Reveal delay={0.1} className="pf-about-lead-wrap">
            <p className="pf-lead">{ABOUT.lead}</p>
          </Reveal>
        </div>

        <div className="pf-hr pf-about-rule" />

        <div className="pf-about-grid">
          <div className="pf-about-col">
            {ABOUT.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="pf-body pf-about-para">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.15}>
              <div className="pf-about-facts">
                {ABOUT.facts.map((f) => (
                  <div key={f.label} className="pf-about-fact">
                    <span className="pf-mono pf-about-fact-l">{f.label}</span>
                    <span className="pf-about-fact-v">{f.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="pf-about-side">
            <Reveal>
              <div className="pf-about-photo" ref={imgRef}>
                <motion.img src="/portfolio/theo-full.jpg" alt="Théo Benkirane" style={{ y: imgY }} loading="lazy" />
              </div>
            </Reveal>

            <div className="pf-about-edu">
              <Reveal>
                <span className="pf-mono pf-about-edu-title">Formation</span>
              </Reveal>
              {ABOUT.formation.map((f, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="pf-edu-item">
                    <div className="pf-edu-top">
                      <span className="pf-edu-degree">{f.degree}</span>
                      <span className="pf-mono pf-edu-period">{f.period}</span>
                    </div>
                    <span className="pf-edu-school">{f.school}{f.note ? ` · ${f.note}` : ''}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{CSS}</style>
    </Section>
  )
}

const CSS = `
.pf-about-head {
  display: grid; grid-template-columns: 1fr 1fr; gap: clamp(1.5rem, 4vw, 4rem);
  align-items: end; margin-top: clamp(1.5rem, 3vh, 2.5rem);
}
.pf-about-lead-wrap { padding-bottom: 0.5rem; }
.pf-about-rule { margin: clamp(2rem, 5vh, 3.5rem) 0; }
.pf-about-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: clamp(2rem, 5vw, 5rem); }
.pf-about-col { display: flex; flex-direction: column; gap: 1.3rem; }
.pf-about-para { max-width: 52ch; }
.pf-about-facts {
  display: grid; grid-template-columns: 1fr 1fr; gap: 1px;
  background: var(--line); border: 1px solid var(--line); border-radius: 14px; overflow: hidden;
  margin-top: 1rem;
}
.pf-about-fact { background: var(--base); padding: 1.1rem 1.25rem; display: flex; flex-direction: column; gap: 0.35rem; }
.pf-about-fact-l { font-size: 0.66rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
.pf-about-fact-v { font-size: 1.05rem; font-weight: 500; }

.pf-about-side { display: flex; flex-direction: column; gap: clamp(1.5rem, 3vh, 2.2rem); }
.pf-about-photo {
  width: 100%; aspect-ratio: 4 / 5; border-radius: 16px; overflow: hidden; border: 1px solid var(--line);
}
.pf-about-photo img { width: 100%; height: 115%; object-fit: cover; display: block; }
.pf-about-edu { display: flex; flex-direction: column; gap: 0.9rem; }
.pf-about-edu-title { font-size: 0.66rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--brass); }
.pf-edu-item { display: flex; flex-direction: column; gap: 0.2rem; padding-bottom: 0.9rem; border-bottom: 1px solid var(--hair); }
.pf-edu-top { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; }
.pf-edu-degree { font-weight: 500; font-size: 0.98rem; }
.pf-edu-period { font-size: 0.7rem; color: var(--muted); white-space: nowrap; }
.pf-edu-school { font-size: 0.85rem; color: var(--muted); }

@media (max-width: 900px) {
  .pf-about-head { grid-template-columns: 1fr; gap: 1.5rem; }
  .pf-about-grid { grid-template-columns: 1fr; }
}
`
