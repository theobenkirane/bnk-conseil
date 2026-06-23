import { useEffect, useRef, useState } from 'react'
import { CHESS_MOVES } from '../../lib/portfolio-content'

export default function ChessNotationSidebar() {
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    const observers = CHESS_MOVES.map((move, i) => {
      const section = document.getElementById(move.sectionId)
      if (!section) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveIndex(i)
          })
        },
        { threshold: 0.25, rootMargin: '-10% 0px -55% 0px' }
      )
      observer.observe(section)
      return observer
    })

    return () => observers.forEach((obs) => obs && obs.disconnect())
  }, [])

  return (
    <aside
      className="portfolio-sidebar"
      style={{
        position: 'fixed',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        display: 'none',
        flexDirection: 'column',
        gap: '0.6rem',
        pointerEvents: 'none',
      }}
    >
      <style>{`
        @media (min-width: 1200px) {
          .portfolio-sidebar { display: flex !important; }
        }
      `}</style>

      {CHESS_MOVES.map((move, i) => {
        const isPast = i < activeIndex
        const isActive = i === activeIndex

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
              transition: 'opacity 0.3s',
              opacity: isActive ? 1 : isPast ? 0.5 : 0.25,
            }}
            aria-label={`Aller à ${move.label}`}
          >
            <span
              className="mono"
              style={{
                fontSize: '0.62rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                color: (isPast || isActive) ? 'var(--signal)' : 'var(--text-muted)',
                transition: 'color 0.3s',
                minWidth: '1.8rem',
                textAlign: 'right',
              }}
            >
              {move.move}
            </span>
            <span
              className="mono"
              style={{
                fontSize: '0.52rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--text)' : 'var(--text-muted)',
                transition: 'color 0.3s',
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
