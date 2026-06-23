import { motion } from 'framer-motion'
import { CONTACT } from '../../../lib/portfolio-content'

function ContactLink({ href, label, isExternal, download }) {
  return (
    <motion.a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      download={download || undefined}
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        color: 'var(--text-muted)',
        textDecoration: 'none',
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '0.9rem',
        letterSpacing: '0.03em',
        padding: '0.75rem 0',
        borderBottom: '1px solid var(--border)',
        transition: 'color 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
    >
      <span style={{ color: 'var(--signal)', fontSize: '0.7rem' }}>→</span>
      {label}
    </motion.a>
  )
}

export default function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 3rem)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}
      >
        {/* Titre */}
        <div>
          <p
            className="mono"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--signal)',
              marginBottom: '0.75rem',
            }}
          >
            ♚ — Échec et mat
          </p>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}
          >
            {CONTACT.tagline}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            Recrutement, collaboration, conseil ou simple échange — répondez ou posez les pièces.
          </p>
          <p
            className="mono"
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.06em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ color: 'var(--data)' }}>◉</span>
            Mobilité : {CONTACT.mobility}
          </p>
        </div>

        {/* Liens de contact */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ContactLink
              href={`mailto:${CONTACT.email}`}
              label={CONTACT.email}
            />
            <ContactLink
              href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
              label={CONTACT.phone}
            />
            <ContactLink
              href={CONTACT.linkedin}
              label="linkedin.com/in/theobenkirane"
              isExternal
            />
          </div>

          {/* CTA CV */}
          <motion.a
            href={CONTACT.cv}
            download
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              marginTop: '2rem',
              padding: '0.9rem 1.75rem',
              background: 'var(--signal)',
              color: '#fff',
              borderRadius: '6px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textDecoration: 'none',
            }}
          >
            ↓ Télécharger le CV
          </motion.a>
        </div>
      </div>

      {/* Footer du portfolio */}
      <div
        style={{
          marginTop: 'clamp(4rem, 8vw, 6rem)',
          paddingTop: '2rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <span
          className="mono"
          style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}
        >
          THÉO BENKIRANE — {new Date().getFullYear()}
        </span>
        <span
          className="mono"
          style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}
        >
          1. e4 · Nf3 · Bb5 · O-O · Re1 · c3 · ♚
        </span>
      </div>
    </section>
  )
}
