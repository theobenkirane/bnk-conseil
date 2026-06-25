import { Section } from '../theme'
import { Reveal, MaskText } from '../motion'
import { SKILLS } from '../../../lib/portfolio-content'

export default function SkillsSection() {
  return (
    <Section theme="ink" id="skills">
      <div className="pf-wrap">
        <div className="pf-skills-head">
          <div>
            <Reveal><span className="pf-eyebrow">Compétences</span></Reveal>
            <MaskText as="h2" className="pf-h2 pf-skills-title" text="La boîte à outils." />
          </div>
          <Reveal delay={0.1}>
            <p className="pf-body pf-skills-intro">
              Cinq familles de compétences, une charnière : la tech et l'IA qui démultiplient tout le reste.
            </p>
          </Reveal>
        </div>

        <div className="pf-skills-grid">
          {SKILLS.map((s, i) => (
            <Reveal key={s.category} delay={i * 0.07}>
              <div className={`pf-skill pf-card ${s.highlight ? 'is-highlight' : ''}`} data-cursor>
                <div className="pf-skill-top">
                  <span className="pf-mono pf-skill-num">{String(i + 1).padStart(2, '0')}</span>
                  {s.highlight && <span className="pf-skill-star">★</span>}
                </div>
                <h3 className="pf-skill-cat">{s.category}</h3>
                <ul className="pf-skill-items">
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{CSS}</style>
    </Section>
  )
}

const CSS = `
.pf-skills-head {
  display: grid; grid-template-columns: 1fr 1fr; gap: clamp(1.5rem, 4vw, 4rem);
  align-items: end; margin-bottom: clamp(2rem, 5vh, 3.5rem);
}
.pf-skills-title { margin-top: 1rem; }
.pf-skills-intro { max-width: 40ch; padding-bottom: 0.4rem; }

.pf-skills-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(0.9rem, 1.5vw, 1.3rem);
}
.pf-skill {
  padding: clamp(1.4rem, 2vw, 2rem); display: flex; flex-direction: column; min-height: 230px;
}
.pf-skill.is-highlight {
  grid-column: span 1; background: var(--brass); border-color: var(--brass); color: var(--ink);
}
.pf-skill.is-highlight .pf-skill-num, .pf-skill.is-highlight .pf-skill-items li { color: rgba(21,18,14,0.78); }
.pf-skill.is-highlight .pf-skill-items li::before { background: var(--ink); }
.pf-skill-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.4rem; }
.pf-skill-num { font-size: 0.75rem; color: var(--muted); }
.pf-skill-star { color: var(--ink); font-size: 0.9rem; }
.pf-skill-cat { font-size: clamp(1.15rem, 1.6vw, 1.45rem); margin-bottom: 1.1rem; }
.pf-skill-items { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.pf-skill-items li { position: relative; padding-left: 1rem; font-size: 0.86rem; color: var(--muted); line-height: 1.4; }
.pf-skill-items li::before { content: ''; position: absolute; left: 0; top: 0.5em; width: 4px; height: 4px; background: var(--brass); transform: rotate(45deg); }

@media (max-width: 900px) {
  .pf-skills-head { grid-template-columns: 1fr; gap: 1.2rem; }
  .pf-skills-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 560px) {
  .pf-skills-grid { grid-template-columns: 1fr; }
}
`
