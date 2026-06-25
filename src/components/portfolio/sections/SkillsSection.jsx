import { Section } from '../theme'
import { Reveal, MaskText } from '../motion'
import { SKILLS } from '../../../lib/portfolio-content'

const TOOLS = [
  { src: '/portfolio/tool-claude.svg', name: 'Claude' },
  { src: '/portfolio/tool-openai.png', name: 'OpenAI' },
  { src: '/portfolio/tool-hubspot.png', name: 'HubSpot' },
  { src: '/portfolio/tool-salesforce.png', name: 'Salesforce' },
  { src: '/portfolio/tool-notion.png', name: 'Notion' },
  { src: '/portfolio/tool-slack.png', name: 'Slack' },
  { src: '/portfolio/tool-sheets.png', name: 'Google Sheets' },
  { src: '/portfolio/tool-office.png', name: 'Microsoft Office' },
]

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

        <div className="pf-tools-block">
          <Reveal><span className="pf-mono pf-tools-label">Au quotidien</span></Reveal>
          <div className="pf-tools" aria-hidden="true">
            <div className="pf-tools-track">
              {[...TOOLS, ...TOOLS].map((t, i) => (
                <div key={i} className="pf-tool">
                  <img src={t.src} alt={t.name} loading="lazy" />
                </div>
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

.pf-tools-block { margin-top: clamp(2.5rem, 6vh, 4rem); }
.pf-tools-label { display: block; text-align: center; font-size: 0.66rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-bottom: 1.3rem; }
.pf-tools {
  position: relative; overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}
.pf-tools-track { display: flex; gap: 1rem; width: max-content; animation: pf-tools-scroll 34s linear infinite; }
.pf-tools:hover .pf-tools-track { animation-play-state: paused; }
.pf-tool {
  flex: 0 0 auto; height: 66px; min-width: 158px;
  display: flex; align-items: center; justify-content: center; padding: 0 1.7rem;
  background: rgba(243,238,228,0.95); border: 1px solid rgba(243,238,228,0.12); border-radius: 14px;
}
.pf-tool img { max-height: 30px; max-width: 116px; object-fit: contain; display: block; }
@keyframes pf-tools-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

@media (max-width: 900px) {
  .pf-skills-head { grid-template-columns: 1fr; gap: 1.2rem; }
  .pf-skills-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 560px) {
  .pf-skills-grid { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .pf-tools-track { animation: none; flex-wrap: wrap; justify-content: center; width: 100%; }
}
`
