import { useEffect, useRef, useState } from 'react'
import { SECTIONS } from '../../lib/portfolio-content'

export default function ChessNotationSidebar() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const observers = SECTIONS.map((section, i) => {
      const el = document.getElementById(section.id)
      if (!el) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveIndex(i)
          })
        },
        { threshold: 0.25, rootMargin: '-10% 0px -55% 0px' }
      )
      observer.observe(el)
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
        gap: '0.7rem',
        pointerEvents: 'none',
      }}
    >
      <style>{`
        @media (min-width: 1200px) {
          .portfolio-sidebar { display: flex !important; }
        }
      `}</style>

      {SECTIONS.map((section, i) => {
        const isActive = i === activeIndex

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            style={{
              pointerEvents: 'all',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              textDecoration: 'none',
              transition: 'opacity 0.3s',
              opacity: isActive ? 1 : 0.4,
            }}
            aria-label={`Aller à ${section.label}`}
          >
            <span
              style={{
                width: isActive ? '1.6rem' : '0.8rem',
                height: '2px',
                background: isActive ? 'var(--signal)' : 'var(--text-muted)',
                borderRadius: '2px',
                transition: 'width 0.3s, background 0.3s',
                flexShrink: 0,
              }}
            />
            <span
              className="mono"
              style={{
                fontSize: '0.55rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--text)' : 'var(--text-muted)',
                transition: 'color 0.3s',
              }}
            >
              {section.label}
            </span>
          </a>
        )
      })}
    </aside>
  )
}
