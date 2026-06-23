import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EXPERIENCE } from '../../../lib/portfolio-content'

gsap.registerPlugin(ScrollTrigger)

function ExperienceCard({ exp, index }) {
  return (
    <div style={{
      flexShrink: 0,
      width: 'clamp(300px, 38vw, 500px)',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '10px',
      padding: '2.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      boxShadow: '0 2px 12px rgba(28,25,23,0.05)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span className="mono" style={{
          fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--text-muted)', opacity: 0.6,
        }}>
          0{index + 1}
        </span>
        {exp.badge && (
          <span className="mono" style={{
            fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--signal)', border: '1px solid', borderColor: 'var(--signal)',
            borderRadius: '3px', padding: '0.2rem 0.5rem',
          }}>
            {exp.badge}
          </span>
        )}
      </div>

      {/* Role */}
      <div>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
          fontWeight: 700, color: 'var(--text)',
          marginBottom: '0.25rem', lineHeight: 1.15,
        }}>
          {exp.role}
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--signal)', fontWeight: 600 }}>
          {exp.company}
        </p>
      </div>

      {/* Meta */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
          {exp.location}
        </span>
        <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.05em', opacity: 0.7 }}>
          {exp.period}
        </span>
      </div>

      <div style={{ height: '1px', background: 'var(--border)' }} />

      {/* Missions */}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
        {exp.missions.map((m, i) => (
          <li key={i} style={{
            display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
            fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.55,
          }}>
            <span style={{ color: 'var(--border)', flexShrink: 0, marginTop: '2px', fontWeight: 700 }}>—</span>
            {m}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ExperienceSection() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const track = trackRef.current
      if (!track) return

      const getScrollDistance = () => track.scrollWidth - window.innerWidth

      ScrollTrigger.create({
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{ overflow: 'hidden', borderTop: '1px solid var(--border)' }}
    >
      {/* Header */}
      <div style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 5rem) 0' }}>
        <p className="mono" style={{
          fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--signal)', marginBottom: '0.75rem',
        }}>
          Bb5 — Parcours
        </p>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, lineHeight: 1.05,
          marginBottom: '3rem',
        }}>
          L'expérience sur le terrain
        </h2>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        style={{
          display: 'flex', gap: '1.5rem',
          padding: '0 clamp(1.5rem, 6vw, 5rem) clamp(4rem, 8vw, 7rem)',
          width: 'max-content', willChange: 'transform',
        }}
      >
        {EXPERIENCE.map((exp, i) => (
          <ExperienceCard key={exp.id} exp={exp} index={i} />
        ))}
        <div style={{ flexShrink: 0, width: 'clamp(1.5rem, 6vw, 5rem)' }} />
      </div>
    </section>
  )
}
