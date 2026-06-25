import { useState } from 'react'
import { Section } from '../theme'
import { Reveal, MaskText, Magnetic } from '../motion'
import { CONTACT } from '../../../lib/portfolio-content'

export default function ContactSection() {
  const [state, setState] = useState('idle') // idle | sending | ok | error

  async function onSubmit(e) {
    e.preventDefault()
    setState('sending')
    const data = new FormData(e.target)
    data.append('access_key', CONTACT.web3formsKey)
    data.append('subject', 'Nouveau message — Portfolio Théo Benkirane')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const json = await res.json()
      setState(json.success ? 'ok' : 'error')
      if (json.success) e.target.reset()
    } catch {
      setState('error')
    }
  }

  return (
    <Section theme="ink" id="contact" className="pf-contact">
      <div className="pf-wrap">
        <div className="pf-contact-grid">
          <div className="pf-contact-left">
            <Reveal><span className="pf-eyebrow">{CONTACT.eyebrow}</span></Reveal>
            <MaskText as="h2" className="pf-display pf-contact-title" text={CONTACT.headline} />
            <Reveal delay={0.1}>
              <p className="pf-lead pf-contact-sub">{CONTACT.sub}</p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="pf-contact-links">
                <a className="pf-contact-link" href={`mailto:${CONTACT.email}`} data-cursor>
                  <span className="pf-mono pf-contact-link-l">Email</span>
                  <span className="pf-contact-link-v">{CONTACT.email}</span>
                </a>
                <a className="pf-contact-link" href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} data-cursor>
                  <span className="pf-mono pf-contact-link-l">Téléphone</span>
                  <span className="pf-contact-link-v">{CONTACT.phone}</span>
                </a>
                <a className="pf-contact-link" href={CONTACT.linkedin} target="_blank" rel="noreferrer" data-cursor>
                  <span className="pf-mono pf-contact-link-l">LinkedIn</span>
                  <span className="pf-contact-link-v">/theobenkirane ↗</span>
                </a>
                <a className="pf-contact-link" href={CONTACT.cv} target="_blank" rel="noreferrer" data-cursor>
                  <span className="pf-mono pf-contact-link-l">CV</span>
                  <span className="pf-contact-link-v">Télécharger le PDF ↓</span>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="pf-contact-right">
            <form className="pf-form pf-card" onSubmit={onSubmit}>
              <div className="pf-field">
                <label htmlFor="cf-name">Nom</label>
                <input id="cf-name" name="name" type="text" required placeholder="Votre nom" />
              </div>
              <div className="pf-field">
                <label htmlFor="cf-email">Email</label>
                <input id="cf-email" name="email" type="email" required placeholder="vous@entreprise.com" />
              </div>
              <div className="pf-field">
                <label htmlFor="cf-msg">Message</label>
                <textarea id="cf-msg" name="message" rows={4} required placeholder="Le poste, le contexte, vos questions…" />
              </div>
              <Magnetic strength={0.2}>
                <button className="pf-btn-brass" type="submit" disabled={state === 'sending'} data-cursor>
                  {state === 'sending' ? 'Envoi…' : 'Envoyer'} <span className="pf-arrow">↗</span>
                </button>
              </Magnetic>
              {state === 'ok' && <p className="pf-form-msg is-ok">Message envoyé. Je reviens vers vous très vite.</p>}
              {state === 'error' && <p className="pf-form-msg is-err">Une erreur est survenue. Écrivez-moi directement par email.</p>}
            </form>
          </Reveal>
        </div>

        <div className="pf-footer">
          <span className="pf-mono">© {new Date().getFullYear()} Théo Benkirane</span>
          <span className="pf-mono pf-footer-mob">{CONTACT.mobility}</span>
          <button className="pf-mono pf-footer-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-cursor>
            Haut de page ↑
          </button>
        </div>
      </div>

      <style>{CSS}</style>
    </Section>
  )
}

const CSS = `
.pf-contact { padding-bottom: clamp(2rem, 4vh, 3rem); }
.pf-contact-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: clamp(2rem, 5vw, 5rem); align-items: start; }
.pf-contact-title { margin: 1.2rem 0; }
.pf-contact-sub { margin-bottom: clamp(2rem, 4vh, 2.6rem); }
.pf-contact-links { display: flex; flex-direction: column; }
.pf-contact-link {
  display: flex; justify-content: space-between; align-items: center; gap: 1rem;
  padding: 1.1rem 0; border-top: 1px solid var(--line); text-decoration: none; color: var(--fg);
  transition: padding 0.35s var(--ease, ease), color 0.3s ease;
}
.pf-contact-link:last-child { border-bottom: 1px solid var(--line); }
.pf-contact-link:hover { padding-left: 0.6rem; color: var(--brass); }
.pf-contact-link-l { font-size: 0.66rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
.pf-contact-link-v { font-size: 1.02rem; font-weight: 480; }

.pf-form { padding: clamp(1.5rem, 3vw, 2.4rem); display: flex; flex-direction: column; gap: 1.1rem; }
.pf-field { display: flex; flex-direction: column; gap: 0.45rem; }
.pf-field label { font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
.pf-field input, .pf-field textarea {
  background: transparent; border: 1px solid var(--line); border-radius: 10px;
  padding: 0.85rem 1rem; color: var(--fg); font-family: var(--font-body); font-size: 0.95rem;
  transition: border-color 0.3s ease; resize: vertical;
}
.pf-field input::placeholder, .pf-field textarea::placeholder { color: var(--muted); opacity: 0.6; }
.pf-field input:focus, .pf-field textarea:focus { outline: none; border-color: var(--brass); }
.pf-form .pf-btn-brass { margin-top: 0.3rem; }
.pf-form-msg { font-size: 0.85rem; font-family: var(--font-mono); }
.pf-form-msg.is-ok { color: #4ADE80; }
.pf-form-msg.is-err { color: #F87171; }

.pf-footer {
  display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;
  margin-top: clamp(3rem, 7vh, 5rem); padding-top: 1.5rem; border-top: 1px solid var(--line);
  font-size: 0.7rem; color: var(--muted);
}
.pf-footer-top { background: none; border: 0; color: var(--muted); cursor: pointer; font-size: 0.7rem; transition: color 0.3s ease; }
.pf-footer-top:hover { color: var(--brass); }

@media (max-width: 860px) {
  .pf-contact-grid { grid-template-columns: 1fr; }
  .pf-footer-mob { display: none; }
}
`
