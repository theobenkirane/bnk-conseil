import { Section } from '../theme'
import { Reveal, MaskText, Magnetic } from '../motion'
import { PROJECTS, PROJECTS_INTRO } from '../../../lib/portfolio-content'

export default function ProjectsSection() {
  return (
    <Section theme="ivory" id="projects">
      <div className="pf-wrap">
        <div className="pf-proj-head">
          <div>
            <Reveal><span className="pf-eyebrow">Projets</span></Reveal>
            <MaskText as="h2" className="pf-h2 pf-proj-title" text="Ce que je construis." />
          </div>
          <Reveal delay={0.1}>
            <p className="pf-body pf-proj-intro">{PROJECTS_INTRO}</p>
          </Reveal>
        </div>

        <div className="pf-proj-list">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <a
                className="pf-proj"
                href={p.url}
                target={p.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                data-cursor
                style={{ '--brand': p.brand, '--accent': p.accent || p.brand }}
              >
                <div className="pf-proj-visual">
                  {p.logo ? (
                    <img src={p.logo} alt={p.name} className="pf-proj-logo" loading="lazy" />
                  ) : (
                    <span className="pf-proj-mono">{p.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}</span>
                  )}
                  <span className="pf-proj-glow" />
                </div>

                <div className="pf-proj-body">
                  <div className="pf-proj-row">
                    <span className="pf-mono pf-proj-index">{p.index}</span>
                    <span className={`pf-proj-status ${p.status === 'Actif' ? 'is-live' : ''}`}>{p.status}</span>
                  </div>
                  <h3 className="pf-proj-name">{p.name}</h3>
                  <span className="pf-proj-tagline pf-mono">{p.tagline}</span>
                  <p className="pf-proj-desc pf-body">{p.description}</p>
                  <div className="pf-proj-foot">
                    <div className="pf-proj-tags">
                      {p.tags.map((t) => <span key={t} className="pf-tag">{t}</span>)}
                    </div>
                    <span className="pf-proj-cta">Voir <span className="pf-arrow">↗</span></span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="pf-proj-more">
            <Magnetic>
              <a className="pf-btn-ghost" href="https://bnk-conseil.com" target="_blank" rel="noreferrer" data-cursor>
                Voir BNK Conseil en ligne <span className="pf-arrow">↗</span>
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>

      <style>{CSS}</style>
    </Section>
  )
}

const CSS = `
.pf-proj-head {
  display: grid; grid-template-columns: 1fr 1fr; gap: clamp(1.5rem, 4vw, 4rem);
  align-items: end; margin-bottom: clamp(2rem, 5vh, 3.5rem);
}
.pf-proj-title { margin-top: 1rem; }
.pf-proj-intro { max-width: 42ch; padding-bottom: 0.4rem; }

.pf-proj-list { display: flex; flex-direction: column; gap: clamp(1rem, 2vw, 1.5rem); }
.pf-proj {
  display: grid; grid-template-columns: 0.8fr 1.2fr; gap: clamp(1rem, 2.5vw, 2.5rem);
  align-items: stretch; text-decoration: none; color: var(--fg);
  border: 1px solid var(--line); border-radius: 20px; overflow: hidden;
  background: var(--card); transition: border-color 0.4s ease, transform 0.5s var(--ease, ease), background 0.4s ease;
}
.pf-proj:hover { border-color: var(--brand); transform: translateY(-4px); }

.pf-proj-visual {
  position: relative; min-height: 220px; display: flex; align-items: center; justify-content: center;
  background:
    radial-gradient(120% 120% at 30% 20%, color-mix(in srgb, var(--brand) 22%, transparent), transparent 70%),
    color-mix(in srgb, var(--brand) 8%, var(--base));
  border-right: 1px solid var(--line); overflow: hidden;
}
.pf-proj-logo { max-width: 62%; max-height: 58%; object-fit: contain; position: relative; z-index: 1; }
.pf-proj-mono {
  font-family: var(--font-display); font-size: clamp(3rem, 6vw, 5rem); font-weight: 460;
  color: var(--brand); letter-spacing: -0.04em; position: relative; z-index: 1;
}
.pf-proj-glow {
  position: absolute; width: 60%; height: 60%; border-radius: 50%;
  background: var(--accent); filter: blur(70px); opacity: 0.18;
  top: -10%; right: -10%; transition: opacity 0.5s ease;
}
.pf-proj:hover .pf-proj-glow { opacity: 0.34; }

.pf-proj-body { padding: clamp(1.5rem, 2.5vw, 2.4rem); display: flex; flex-direction: column; }
.pf-proj-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
.pf-proj-index { font-size: 0.78rem; color: var(--muted); }
.pf-proj-status {
  font-family: var(--font-mono); font-size: 0.64rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--muted); border: 1px solid var(--line); padding: 0.3rem 0.65rem; border-radius: 999px;
  display: inline-flex; align-items: center; gap: 0.4rem;
}
.pf-proj-status.is-live { color: var(--brass); border-color: color-mix(in srgb, var(--brass) 40%, transparent); }
.pf-proj-status.is-live::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #4ADE80; }
.pf-proj-name { font-size: clamp(1.6rem, 3vw, 2.4rem); margin-bottom: 0.4rem; }
.pf-proj-tagline { font-size: 0.74rem; color: var(--brass); letter-spacing: 0.03em; }
.pf-proj-desc { margin: 1rem 0 1.5rem; max-width: 50ch; }
.pf-proj-foot { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: auto; flex-wrap: wrap; }
.pf-proj-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.pf-proj-cta {
  font-family: var(--font-mono); font-size: 0.8rem; color: var(--fg);
  display: inline-flex; align-items: center; gap: 0.4rem; white-space: nowrap;
}
.pf-proj:hover .pf-proj-cta { color: var(--brand); }

.pf-proj-more { margin-top: clamp(2rem, 5vh, 3rem); display: flex; justify-content: center; }

@media (max-width: 820px) {
  .pf-proj-head { grid-template-columns: 1fr; gap: 1.2rem; }
  .pf-proj { grid-template-columns: 1fr; }
  .pf-proj-visual { min-height: 160px; border-right: 0; border-bottom: 1px solid var(--line); }
}
`
