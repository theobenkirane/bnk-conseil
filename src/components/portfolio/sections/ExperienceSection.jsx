import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EXPERIENCE } from '../../../lib/portfolio-content'

gsap.registerPlugin(ScrollTrigger)

function ExperienceCard({ exp, index }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: 'clamp(300px, 35vw, 480px)',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      {/* Numéro et badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span
          className="mono"
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
          }}
        >
          0{index + 1}
        </span>
        {exp.badge && (
          <span
            className="mono"
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--signal)',
              border: '1px solid var(--signal)',
              borderRadius: '3px',
              padding: '0.2rem 0.5rem',
            }}
          >
            {exp.badge}
          </span>
        )}
      </div>

      {/* Rôle + entreprise */}
      <div>
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: '0.3rem',
            lineHeight: 1.15,
          }}
        >
          {exp.role}
        </h3>
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--signal)',
            fontWeight: 500,
          }}
        >
          {exp.company}
        </p>
      </div>

      {/* Localisation + période */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <span
          className="mono"
          style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}
        >
          📍 {exp.location}
        </span>
        <span
          className="mono"
          style={{ fontSize: '0.7rem', color: 'var(--data)', letterSpacing: '0.06em' }}
        >
          {exp.period}
        </span>
      </div>

      {/* Séparateur */}
      <div style={{ height: '1px', background: 'var(--border)' }} />

      {/* Missions */}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {exp.missions.map((mission, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start',
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: 'var(--border)', flexShrink: 0, marginTop: '2px' }}>—</span>
            {mission}
          </li>
        ))}
      </ul>

      {/* Stat si présente */}
      {exp.stat && (
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border)',
          }}
        >
          <span
            className="mono"
            style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: 'var(--data)',
            }}
          >
            {exp.stat}
          </span>
        </div>
      )}
    </div>
  )
}

export default function ExperienceSection() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      // En mode réduit: layout vertical, pas de pin
      if (trackRef.current) {
        trackRef.current.style.flexDirection = 'column'
        trackRef.current.style.overflow = 'visible'
      }
      return
    }

    const ctx = gsap.context(() => {
      const track = trackRef.current
      if (!track) return

      // Distance de scroll horizontal = largeur totale du track - largeur du viewport
      const getScrollDistance = () => track.scrollWidth - window.innerWidth

      let st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${getScrollDistance()}`,
        pin: true,
        scrub: 1.2,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(track, { x: -getScrollDistance() * self.progress })
        },
      })

      return () => st.kill()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{ overflow: 'hidden' }}
    >
      <div
        style={{
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem) 0',
        }}
      >
        {/* Eyebrow */}
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
          Bb5 — Parcours
        </p>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '3rem',
          }}
        >
          L'expérience sur le terrain
        </h2>
      </div>

      {/* Track horizontal */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: '2rem',
          padding: '0 clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 7rem)',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {EXPERIENCE.map((exp, i) => (
          <ExperienceCard key={exp.id} exp={exp} index={i} />
        ))}

        {/* Padding final pour laisser de la respiration */}
        <div style={{ flexShrink: 0, width: 'clamp(1.5rem, 5vw, 4rem)' }} />
      </div>
    </section>
  )
}
