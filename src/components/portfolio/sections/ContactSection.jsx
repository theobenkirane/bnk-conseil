import { useState } from 'react'
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
        padding: '1rem 0',
        borderBottom: '1px solid var(--border)',
        fontSize: '0.9rem',
        transition: 'color 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--signal)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
    >
      <span className="mono" style={{
        fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--text-muted)', width: '2.5rem', flexShrink: 0,
      }}>
        {icon}
      </span>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.86rem' }}>
        {label}
      </span>
      {isExternal && <span style={{ marginLeft: 'auto', opacity: 0.4, fontSize: '0.85rem' }}>↗</span>}
    </motion.a>
  )
}

function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | ok | error
  const keyMissing = !CONTACT.web3formsKey || CONTACT.web3formsKey === 'VOTRE_CLE_WEB3FORMS'

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    // Fallback if no Web3Forms key configured yet: open the user's mail client.
    if (keyMissing) {
      const subject = encodeURIComponent(`Contact portfolio — ${data.name || ''}`)
      const body = encodeURIComponent(
        `Nom : ${data.name || ''}\nEntreprise : ${data.company || ''}\nEmail : ${data.email || ''}\n\n${data.message || ''}`
      )
      window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: CONTACT.web3formsKey,
          subject: `Nouveau message portfolio — ${data.name || ''}`,
          from_name: data.name,
          ...data,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setStatus('ok')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const fieldStyle = {
    width: '100%',
    padding: '0.8rem 1rem',
    borderRadius: '8px',
    border: '1px solid rgba(240,230,206,0.18)',
    background: 'rgba(240,230,206,0.05)',
    color: 'var(--chess-light)',
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
    fontSize: '0.9rem',
    outline: 'none',
  }

  if (status === 'ok') {
    return (
      <div style={{
        padding: '2rem', borderRadius: '12px',
        border: '1px solid rgba(240,230,206,0.18)',
        background: 'rgba(240,230,206,0.05)',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>♚</p>
        <p style={{ color: 'var(--chess-light)', fontWeight: 600, marginBottom: '0.3rem' }}>
          Message envoyé.
        </p>
        <p style={{ color: 'rgba(240,230,206,0.55)', fontSize: '0.88rem' }}>
          Je vous réponds dans la journée. À très vite.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }} className="cf-grid">
        <style>{`
          @media (max-width: 520px) { .cf-grid { grid-template-columns: 1fr !important; } }
          #portfolio-root form input::placeholder,
          #portfolio-root form textarea::placeholder { color: rgba(240,230,206,0.4); }
        `}</style>
        <input style={fieldStyle} name="name" placeholder="Votre nom" required />
        <input style={fieldStyle} name="company" placeholder="Entreprise" />
      </div>
      <input style={fieldStyle} type="email" name="email" placeholder="Email professionnel" required />
      <textarea
        style={{ ...fieldStyle, resize: 'vertical', minHeight: '110px' }}
        name="message"
        placeholder="Le poste, votre besoin, ou simplement un bonjour…"
        required
      />
      {/* honeypot */}
      <input type="checkbox" name="botcheck" tabIndex="-1" style={{ display: 'none' }} aria-hidden="true" />

      <button
        type="submit"
        disabled={status === 'sending'}
        style={{
          marginTop: '0.25rem',
          padding: '0.9rem 1.5rem',
          borderRadius: '8px',
          border: 'none',
          background: 'var(--chess-light)',
          color: 'var(--chess-dark)',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.03em',
          cursor: status === 'sending' ? 'default' : 'pointer',
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        {status === 'sending' ? 'Envoi…' : 'Réserver un échange →'}
      </button>

      {status === 'error' && (
        <p style={{ color: '#F87171', fontSize: '0.8rem', textAlign: 'center' }}>
          Une erreur est survenue. Écrivez-moi directement à {CONTACT.email}.
        </p>
      )}
      <p className="mono" style={{
        fontSize: '0.62rem', color: 'rgba(240,230,206,0.4)', textAlign: 'center', letterSpacing: '0.04em',
      }}>
        Réponse sous 24 h · Échange de 20 min sans engagement
      </p>
    </form>
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(3rem, 6vw, 5rem)',
          alignItems: 'start',
        }}>
          {/* Left */}
          <div>
            <p className="mono" style={{
              fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--signal)', marginBottom: '0.75rem',
            }}>
              ♚ Échec et mat
            </p>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontWeight: 700, lineHeight: 1.05,
              marginBottom: '1.25rem',
              color: 'var(--chess-light)',
            }}>
              {CONTACT.headline}
            </h2>
            <p style={{
              color: 'rgba(240,230,206,0.55)', fontSize: '0.98rem',
              lineHeight: 1.7, marginBottom: '2rem', maxWidth: '40ch',
            }}>
              {CONTACT.sub}
            </p>

            {/* Inverted theme for links */}
            <div style={{
              '--text': 'var(--chess-light)',
              '--text-muted': 'rgba(240,230,206,0.45)',
              '--border': 'rgba(240,230,206,0.12)',
              '--signal': '#E8483A',
            }}>
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
                padding: '0.85rem 1.6rem',
                border: '1px solid rgba(240,230,206,0.25)',
                color: 'var(--chess-light)',
                borderRadius: '6px',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.8rem', fontWeight: 600,
                letterSpacing: '0.03em', textDecoration: 'none',
              }}
            >
              ↓ Télécharger le CV
            </motion.a>

            <p className="mono" style={{
              marginTop: '2rem',
              fontSize: '0.7rem', letterSpacing: '0.06em',
              color: 'rgba(240,230,206,0.4)',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <span style={{ color: '#E8483A' }}>◉</span>
              Mobilité : {CONTACT.mobility}
            </p>
          </div>

          {/* Right — form */}
          <div style={{
            background: 'rgba(240,230,206,0.03)',
            border: '1px solid rgba(240,230,206,0.12)',
            borderRadius: '16px',
            padding: 'clamp(1.5rem, 4vw, 2.25rem)',
          }}>
            <p className="mono" style={{
              fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(240,230,206,0.5)', marginBottom: '1.25rem',
            }}>
              Prenons rendez-vous
            </p>
            <ContactForm />
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 'clamp(4rem, 8vw, 6rem)',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(240,230,206,0.12)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <span className="mono" style={{
            fontSize: '0.58rem', color: 'rgba(240,230,206,0.3)', letterSpacing: '0.1em',
          }}>
            THÉO BENKIRANE · {new Date().getFullYear()}
          </span>
          <span className="mono" style={{
            fontSize: '0.58rem', color: 'rgba(240,230,206,0.3)', letterSpacing: '0.1em',
          }}>
            1.e4 · Nf3 · d4 · O-O-O · Rd8#
          </span>
        </div>
      </div>
    </section>
  )
}
