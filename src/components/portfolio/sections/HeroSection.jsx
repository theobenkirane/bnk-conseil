import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { HERO } from '../../../lib/portfolio-content'

// ── Chess board ──────────────────────────────────────────────────────────────
// Shows the Ruy Lopez position (after 1.e4 e5 2.Nf3 Nc6 3.Bb5)
const PIECES = {
  // White pieces
  wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
  // Black pieces
  bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
}

// Board state: row 0 = rank 8, col 0 = file a
const BOARD_INITIAL = [
  ['bR','bN','bB','bQ','bK','bB', null,'bR'],
  ['bP','bP','bP','bP', null,'bP','bP','bP'],
  [ null, null,'bN', null, null, null, null, null],
  [ null,'wB', null, null,'bP', null, null, null],
  [ null, null, null, null,'wP', null, null, null],
  [ null, null,'wN', null, null, null, null, null],
  ['wP','wP','wP','wP', null,'wP','wP','wP'],
  ['wR', null,'wB','wQ','wK', null, null,'wR'],
]

function MiniChessBoard() {
  const [revealed, setRevealed] = useState(false)
  const [hoveredSq, setHoveredSq] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 400)
    return () => clearTimeout(t)
  }, [])

  // Squares with pieces in Ruy Lopez position
  const highlightedSquares = new Set(['e4','e5','f3','c6','b5']) // key squares

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gridTemplateRows: 'repeat(8, 1fr)',
        width: '100%',
        maxWidth: '360px',
        aspectRatio: '1/1',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 24px 80px rgba(28,25,23,0.18), 0 4px 16px rgba(28,25,23,0.1)',
        border: '1px solid var(--border)',
      }}
      aria-label="Échiquier — ouverture Ruy Lopez (1.e4 e5 2.Nf3 Nc6 3.Bb5)"
      aria-hidden="true"
    >
      {BOARD_INITIAL.map((row, r) =>
        row.map((piece, c) => {
          const isLight = (r + c) % 2 === 0
          const file = String.fromCharCode(97 + c)
          const rank = 8 - r
          const sq = `${file}${rank}`
          const isHighlighted = highlightedSquares.has(sq)
          const isHovered = hoveredSq === sq
          const delay = revealed ? (r * 8 + c) * 0.018 : 0

          return (
            <div
              key={sq}
              onMouseEnter={() => setHoveredSq(sq)}
              onMouseLeave={() => setHoveredSq(null)}
              style={{
                background: isHovered
                  ? 'rgba(185,28,28,0.25)'
                  : isHighlighted
                    ? isLight ? 'rgba(185,28,28,0.15)' : 'rgba(185,28,28,0.25)'
                    : isLight ? 'var(--chess-light)' : 'var(--chess-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(14px, 3.5vw, 26px)',
                cursor: 'default',
                transition: 'background 0.15s',
                position: 'relative',
              }}
            >
              {piece && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={revealed ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay, duration: 0.3, ease: 'backOut' }}
                  style={{
                    color: piece.startsWith('w') ? '#F5EDD8' : '#1C1009',
                    textShadow: piece.startsWith('w')
                      ? '0 1px 3px rgba(0,0,0,0.5)'
                      : '0 1px 3px rgba(255,255,255,0.1)',
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                >
                  {PIECES[piece]}
                </motion.span>
              )}
              {/* Coordinate labels */}
              {c === 0 && (
                <span style={{
                  position: 'absolute', top: '2px', left: '2px',
                  fontSize: '7px', opacity: 0.4,
                  color: isLight ? 'var(--chess-dark)' : 'var(--chess-light)',
                  fontFamily: 'IBM Plex Mono',
                  lineHeight: 1,
                }}>{rank}</span>
              )}
              {r === 7 && (
                <span style={{
                  position: 'absolute', bottom: '2px', right: '3px',
                  fontSize: '7px', opacity: 0.4,
                  color: isLight ? 'var(--chess-dark)' : 'var(--chess-light)',
                  fontFamily: 'IBM Plex Mono',
                  lineHeight: 1,
                }}>{file}</span>
              )}
            </div>
          )
        })
      )}
    </div>
  )
}

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
      onMouseEnter={e => {
        e.currentTarget.style.color = 'var(--text)'
        e.currentTarget.style.borderColor = 'var(--text-muted)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'var(--text-muted)'
        e.currentTarget.style.borderColor = 'var(--border)'
      }}
    >
      ← BNK Conseil
    </motion.a>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

export default function HeroSection() {
  const sectionRef = useRef(null)

  return (
    <section
      id="hero"
      ref={sectionRef}
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

      {/* Subtle grid lines */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 30% 50%, transparent 30%, var(--bg) 100%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Left — text */}
        <div>
          <motion.p
            {...fadeUp(0.1)}
            className="mono"
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--signal)',
              marginBottom: '1.25rem',
            }}
          >
            1. e4 — Ouverture
          </motion.p>

          <motion.h1
            {...fadeUp(0.2)}
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
              fontWeight: 700,
              lineHeight: 1.0,
              marginBottom: '1rem',
              color: 'var(--text)',
            }}
          >
            Théo<br />Benkirane
          </motion.h1>

          <motion.p
            {...fadeUp(0.32)}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--text-muted)',
              fontWeight: 500,
              marginBottom: '0.5rem',
              lineHeight: 1.3,
            }}
          >
            Account Manager
          </motion.p>

          <motion.p
            {...fadeUp(0.4)}
            style={{
              fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
              color: 'var(--text-muted)',
              fontWeight: 400,
              marginBottom: '2.5rem',
              lineHeight: 1.5,
              maxWidth: '380px',
            }}
          >
            {HERO.tagline}
          </motion.p>

          {/* Tags */}
          <motion.div
            {...fadeUp(0.5)}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}
          >
            {['SaaS / LegalTech', 'IA & Outils digitaux', 'MBA 2026', 'Échecs & Stratégie'].map(tag => (
              <span
                key={tag}
                className="mono"
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.3rem 0.65rem',
                  border: '1px solid var(--border)',
                  borderRadius: '3px',
                  color: 'var(--text-muted)',
                  background: 'var(--surface)',
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.6)}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}
          >
            <a
              href={HERO.cta.cv}
              download
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'var(--text)',
                color: 'var(--bg)',
                borderRadius: '6px',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              ↓ CV
            </a>
            <a
              href={HERO.cta.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                borderRadius: '6px',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.78rem',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                background: 'var(--surface)',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text-muted)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              LinkedIn ↗
            </a>
            <a
              href={`mailto:${HERO.cta.email}`}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              {HERO.cta.email}
            </a>
          </motion.div>
        </div>

        {/* Right — chess board */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <MiniChessBoard />
          <p
            className="mono"
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              textAlign: 'center',
            }}
          >
            1. e4 e5  2. Nf3 Nc6  3. Bb5 — Ruy Lopez
          </p>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
        }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '36px',
            background: 'linear-gradient(to bottom, var(--text-muted), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
