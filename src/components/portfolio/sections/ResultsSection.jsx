import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STATS, STATS_NOTE } from '../../../lib/portfolio-content'

gsap.registerPlugin(ScrollTrigger)

function StatBlock({ stat, index }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const triggered = useRef(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 82%',
        once: true,
        onEnter: () => {
          if (triggered.current) return
          triggered.current = true
          if (prefersReduced) { setValue(stat.value); return }
          const obj = { val: 0 }
          gsap.to(obj, {
            val: stat.value,
            duration: 1.6,
            ease: 'power3.out',
            delay: index * 0.15,
            onUpdate: () => setValue(Math.round(obj.val)),
          })
        },
      })
    })

    return () => ctx.revert()
  }, [stat.value, index])

  return (
    <div
      ref={ref}
      style={{
        flex: '1 1 180px',
        padding: 'clamp(2.5rem, 4vw, 3.5rem) clamp(1.5rem, 3vw, 2.5rem)',
        borderRight: index < STATS.length - 1 ? '1px solid var(--border)' : 'none',
        display: 'flex', flexDirection: 'column', gap: '0.4rem',
      }}
    >
      <div className="mono" style={{
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontWeight: 600,
        color: 'var(--text)',
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}>
        {value}{stat.suffix}
      </div>
      <div className="mono" style={{
        fontSize: '0.65rem', letterSpacing: '0.14em',
        textTransform: 'uppercase', color: 'var(--signal)',
        marginTop: '0.25rem',
      }}>
        {stat.label}
      </div>
      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
        {stat.description}
      </div>
    </div>
  )
}

export default function ResultsSection() {
  return (
    <section
      id="results"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '0 clamp(1.5rem, 6vw, 5rem)',
      }}>
        <div style={{ padding: 'clamp(4rem, 8vw, 7rem) 0 2.5rem' }}>
          <p className="mono" style={{
            fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--signal)', marginBottom: '0.75rem',
          }}>
            Résultats
          </p>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontWeight: 700, lineHeight: 1.05,
            maxWidth: '14ch',
          }}>
            Les chiffres parlent.
          </h2>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          borderTop: '1px solid var(--border)',
          paddingBottom: 'clamp(4rem, 8vw, 7rem)',
        }}>
          {STATS.map((s, i) => <StatBlock key={i} stat={s} index={i} />)}
        </div>

        {/* Note contextuelle */}
        <p className="mono" style={{
          fontSize: '0.62rem', letterSpacing: '0.08em',
          color: 'var(--text-muted)', opacity: 0.6,
          borderTop: '1px solid var(--border)',
          paddingTop: '1.5rem', paddingBottom: 'clamp(4rem, 8vw, 7rem)',
        }}>
          {STATS_NOTE}
        </p>
      </div>
    </section>
  )
}
