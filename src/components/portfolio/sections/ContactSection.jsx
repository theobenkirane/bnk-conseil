import { motion } from 'framer-motion'
import { CONTACT } from '../../../lib/portfolio-content'

function ContactLink({ href, label, isExternal, icon }) {
  return (
    <motion.a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      whileHover={{ x: 6 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        color: 'var(--text)', textDecoration: 'none',
        padding: '1.1rem 0',
        borderBottom: '1px solid var(--border)',
        fontSize: '0.9rem',
        transition: 'color 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.color = 'var(--signal)'}
      onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
    >
      <span className="mono" style={{
        fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--text-muted)', width: '2.5rem', flexShrink: 0,
      }}>
        {icon}
      </span>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.88rem' }}>
        {label}
      </span>
      {isExternal && <span style={{ marginLeft: 'auto', opacity: 0.4, fontSize: '0.85rem' }}>↗</span>}
    </motion.a>
  )
}

export default function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--chess-dark)',
      }}
    >
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 5rem)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'start',
        }}>
          {/* Left */}
          <div>
            <p className="mono" style={{
              fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--signal)', marginBottom: '0.75rem',
            }}>
              ♔ — Échec et mat
            </p>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, lineHeight: 1.1,
              marginBottom: '1.5rem',
              color: 'var(--chess-light)',
            }}>
              {CONTACT.tagline}
            </h2>
            <p style={{
              color: 'rgba(240,230,206,0.55)', fontSize: '0.95rem',
              lineHeight: 1.75, marginBottom: '2rem',
            }}>
              Recrutement AM / Business Developer / Sales Ops, collaboration, conseil — je réponds dans la journée.
            </p>
            <p className="mono" style={{
              fontSize: '0.7rem', letterSpacing: '0.08em',
              color: 'rgba(240,230,206,0.4)',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <span style={{ color: 'var(--signal)' }}>◉</span>
              Mobilité : {CONTACT.mobility}
            </p>
          </div>

          {/* Right */}
          <div>
            {/* Liens avec theme inversé */}
            <div style={{ '--text': 'var(--chess-light)', '--text-muted': 'rgba(240,230,206,0.45)', '--border': 'rgba(240,230,206,0.12)', '--signal': '#E8483A' }}>
              <ContactLink href={`mailto:${CONTACT.email}`} label={CONTACT.email} icon="mail" />
              <ContactLink href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} label={CONTACT.phone} icon="tél" />
              <ContactLink href={CONTACT.linkedin} label="linkedin.com/in/theobenkirane" isExternal icon="in" />
            </div>

            <motion.a
              href={CONTACT.cv}
              download
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                marginTop: '2rem',
                padding: '0.9rem 1.75rem',
                background: 'var(--chess-light)',
                color: 'var(--chess-dark)',
                borderRadius: '6px',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.8rem', fontWeight: 600,
                letterSpacing: '0.04em', textDecoration: 'none',
              }}
            >
              ↓ Télécharger le CV
            </motion.a>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 'clamp(5rem, 10vw, 7rem)',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(240,230,206,0.12)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <span className="mono" style={{
            fontSize: '0.58rem', color: 'rgba(240,230,206,0.3)', letterSpacing: '0.1em',
          }}>
            THÉO BENKIRANE — {new Date().getFullYear()}
          </span>
          <span className="mono" style={{
            fontSize: '0.58rem', color: 'rgba(240,230,206,0.3)', letterSpacing: '0.1em',
          }}>
            1.e4 · Nf3 · Bb5 · O-O · Re1 · c3 · ♔
          </span>
        </div>
      </div>
    </section>
  )
}
