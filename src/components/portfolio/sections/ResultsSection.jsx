import { Section } from '../theme'
import { Reveal, MaskText, Counter } from '../motion'
import { STATS, STATS_NOTE } from '../../../lib/portfolio-content'

export default function ResultsSection() {
  return (
    <Section theme="ink" id="results">
      <div className="pf-wrap">
        <div className="pf-res-head">
          <Reveal><span className="pf-eyebrow">Résultats</span></Reveal>
          <MaskText as="h2" className="pf-h2 pf-res-title" text="Les chiffres parlent." />
        </div>

        <div className="pf-res-grid">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="pf-res-card">
                <span className="pf-res-value">
                  <Counter to={s.value} suffix={s.suffix} />
                </span>
                <span className="pf-res-label">{s.label}</span>
                <span className="pf-res-desc">{s.description}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="pf-res-note">
            <span className="pf-brass">—</span> {STATS_NOTE}
          </p>
        </Reveal>
      </div>

      <style>{CSS}</style>
    </Section>
  )
}

const CSS = `
.pf-res-head { margin-bottom: clamp(2rem, 5vh, 3.5rem); }
.pf-res-title { margin-top: 1rem; }
.pf-res-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
  background: var(--line); border: 1px solid var(--line); border-radius: 18px; overflow: hidden;
}
.pf-res-card {
  background: var(--base); padding: clamp(1.5rem, 2.5vw, 2.6rem) clamp(1.2rem, 2vw, 2rem);
  display: flex; flex-direction: column; gap: 0.5rem; min-height: 200px;
}
.pf-res-value {
  font-family: var(--font-display); font-weight: 440; letter-spacing: -0.04em; line-height: 0.9;
  font-size: clamp(2.8rem, 5.5vw, 4.6rem); color: var(--brass);
}
.pf-res-label { font-size: 1rem; font-weight: 500; margin-top: auto; }
.pf-res-desc { font-size: 0.82rem; color: var(--muted); line-height: 1.4; }
.pf-res-note {
  font-family: var(--font-display); font-style: italic; font-weight: 380;
  font-size: clamp(1.1rem, 2vw, 1.5rem); line-height: 1.45; margin-top: clamp(2rem, 5vh, 3rem);
  max-width: 60ch; color: var(--fg);
}

@media (max-width: 900px) { .pf-res-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 520px) { .pf-res-grid { grid-template-columns: 1fr; } }
`
