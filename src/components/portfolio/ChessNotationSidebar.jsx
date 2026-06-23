import { useEffect, useRef, useState } from 'react'
import { CHESS_MOVES } from '../../lib/portfolio-content'

export default function ChessNotationSidebar() {
  const [activeIndex, setActiveIndex] = useState(-1)
  const observersRef = useRef([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const observers = CHESS_MOVES.map((move, i) => {
      const section = document.getElementById(move.sectionId)
      if (!section) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(i)
            }
          })
        },
        { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' }
      )
      observer.observe(section)
      return observer
    })

    observersRef.current = observers

    return () => {
      observers.forEach((obs) => obs && obs.disconnect())
    }
  }, [])

  return (
    <aside
      style={{
        position: 'fixed',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        display: 'none',
        flexDirection: 'column',
        gap: '0.75rem',
        pointerEvents: 'none',
      }}
      className="portfolio-sidebar"
    >
      <style>{`
        @media (min-width: 1024px) {
          .portfolio-sidebar { display: flex !important; }
        }
      `}</style>
      {CHESS_MOVES.map((move, i) => {
        const isPast = i < activeIndex
        const isActive = i === activeIndex
        const color = (isPast || isActive) ? 'var(--signal)' : 'var(--text-muted)'
        return (
          <a
            key={move.sectionId}
            href={`#${move.sectionId}`}
            style={{
              pointerEvents: 'all',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              color,
            }}
            aria-label={`Aller à la section ${move.label}`}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                color: 'inherit',
                transition: 'color 0.3s ease',
              }}
            >
              {move.move}
            </span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.55rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'inherit',
                transition: 'color 0.3s ease, opacity 0.3s ease',
                opacity: isActive ? 1 : (isPast ? 0.7 : 0.4),
              }}
            >
              {move.label}
            </span>
          </a>
        )
      })}
    </aside>
  )
}
