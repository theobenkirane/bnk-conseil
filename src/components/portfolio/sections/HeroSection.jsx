import { motion } from 'framer-motion'
import { HERO } from '../../../lib/portfolio-content'

// ── Back button ───────────────────────────────────────────────────────────────
function BackButton() {
  return (
    <motion.a
      href="/"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      style={{
        position: 'fixed',
        top: '1.25rem',
        left: '1.5rem',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '0.7rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        textDecoration: 'none',
        padding: '0.4rem 0.75rem',
        border: '1px solid var(--border)',
        borderRadius: '4px',
        background: 'rgba(248,245,240,0.9)',
        backdropFilter: 'blur(8px)',
        transition: 'color 0.2s, border-color 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--text)'
        e.currentTarget.style.borderColor = 'var(--text-muted)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--text-muted)'
        e.currentTarget.style.borderColor = 'var(--border)'
      }}
    >
      ← BNK Conseil
    </motion.a>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(6rem, 12vw, 9rem) clamp(1.5rem, 6vw, 5rem) clamp(4rem, 8vw, 6rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <BackButton />

      {/* Subtle chessboard grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.3,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 75% 60% at 35% 45%, transparent 35%, var(--bg) 100%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.85fr)',
          gap: 'clamp(2.5rem, 6vw, 5rem)',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
        className="hero-grid"
      >
        <style>{`
          @media (max-width: 880px) {
            .hero-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* Left — pitch */}
        <div>
          <motion.div
            {...fadeUp(0.05)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              marginBottom: '1.5rem',
              padding: '0.35rem 0.8rem',
              border: '1px solid var(--border)',
              borderRadius: '100px',
              background: 'var(--surface)',
            }}
          >
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: '#16A34A', boxShadow: '0 0 0 3px rgba(22,163,74,0.18)',
            }} />
            <span className="mono" style={{
              fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--text)', fontWeight: 600,
            }}>
              {HERO.status}
            </span>
          </motion.div>

          <motion.p
            {...fadeUp(0.12)}
            className="mono"
            style={{
              fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--signal)', marginBottom: '1rem', fontWeight: 600,
            }}
          >
            {HERO.name} · {HERO.role}
          </motion.p>

          <motion.h1
            {...fadeUp(0.2)}
            style={{
              fontSize: 'clamp(2.2rem, 5.2vw, 4.2rem)',
              fontWeight: 700,
              lineHeight: 1.04,
              marginBottom: '1.5rem',
              color: 'var(--text)',
              maxWidth: '14ch',
            }}
          >
            {HERO.headline}
          </motion.h1>

          <motion.p
            {...fadeUp(0.3)}
            style={{
              fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              marginBottom: '2.25rem',
              maxWidth: '52ch',
            }}
          >
            {HERO.pitch}
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.42)}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}
          >
            <a
              href="#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.85rem 1.6rem',
                background: 'var(--text)',
                color: 'var(--bg)',
                borderRadius: '6px',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.03em',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Me recruter →
            </a>
            <a
              href={HERO.cta.cv}
              download
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.85rem 1.6rem',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                borderRadius: '6px',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.8rem',
                letterSpacing: '0.03em',
                textDecoration: 'none',
                background: 'var(--surface)',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--text-muted)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              ↓ Mon CV
            </a>
            <a
              href={HERO.cta.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              LinkedIn ↗
            </a>
          </motion.div>
        </div>

        {/* Right — recruiter quick facts card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '1.75rem',
            boxShadow: '0 20px 60px rgba(28,25,23,0.10), 0 2px 8px rgba(28,25,23,0.05)',
          }}
        >
          <p className="mono" style={{
            fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--text-muted)', marginBottom: '1.25rem',
          }}>
            En bref
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {HERO.facts.map((f, i) => (
              <div
                key={f.k}
                style={{
                  display: 'flex', alignItems: 'baseline', gap: '0.9rem',
                  padding: '0.85rem 0',
                  borderBottom: i < HERO.facts.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                  fontWeight: 700,
                  color: 'var(--signal)',
                  lineHeight: 1,
                  minWidth: '5.5rem',
                }}>
                  {f.k}
                </span>
                <span style={{
                  fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.35,
                }}>
                  {f.v}
                </span>
              </div>
            ))}
          </div>

          <a
            href="#compatibility"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              marginTop: '1.5rem',
              padding: '0.75rem',
              borderRadius: '8px',
              background: 'var(--chess-dark)',
              color: 'var(--chess-light)',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.72rem',
              letterSpacing: '0.04em',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            ♟ Tester notre compatibilité
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '1.75rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '34px',
            background: 'linear-gradient(to bottom, var(--text-muted), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
