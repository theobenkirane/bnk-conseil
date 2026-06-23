import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STATS } from '../../../lib/portfolio-content'

gsap.registerPlugin(ScrollTrigger)

function NumericStat({ stat }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const triggered = useRef(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          if (triggered.current) return
          triggered.current = true
          if (prefersReduced) {
            setValue(stat.value)
            return
          }
          const obj = { val: 0 }
          gsap.to(obj, {
            val: stat.value,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => setValue(Math.round(obj.val)),
          })
        },
      })
    })

    return () => ctx.revert()
  }, [stat.value])

  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 4vw, 3rem)',
        flex: '1 1 200px',
      }}
    >
      <div
        className="mono"
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 600,
          color: 'var(--data)',
          lineHeight: 1,
          marginBottom: '0.5rem',
        }}
      >
        {value}{stat.suffix}
      </div>
      <div
        className="mono"
        style={{
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text)',
          marginBottom: '0.4rem',
        }}
      >
        {stat.label}
      </div>
      <div
        style={{
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
        }}
      >
        {stat.description}
      </div>
    </div>
  )
}

function TextStat({ stat }) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 4vw, 3rem)',
        flex: '1 1 200px',
      }}
    >
      <div
        className="mono"
        style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
          fontWeight: 600,
          color: 'var(--data)',
          lineHeight: 1.2,
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em',
        }}
      >
        {stat.label}
      </div>
      <div
        style={{
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
        }}
      >
        {stat.description}
      </div>
    </div>
  )
}

export default function ResultsSection() {
  return (
    <section
      id="results"
      style={{ background: 'var(--surface)', padding: '0 clamp(1.5rem, 5vw, 3rem)' }}
    >
      {/* Eyebrow */}
      <div style={{ paddingTop: 'clamp(4rem, 8vw, 7rem)', paddingBottom: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
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
          c3 — Résultats
        </p>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          Les chiffres parlent
        </h2>
      </div>

      {/* Stats band */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          borderTop: '1px solid var(--border)',
          paddingBottom: 'clamp(4rem, 8vw, 7rem)',
        }}
      >
        {STATS.map((stat, i) => {
          const isNotLast = i < STATS.length - 1
          return (
            <div
              key={i}
              style={{
                flex: '1 1 200px',
                borderRight: isNotLast ? '1px solid var(--border)' : 'none',
              }}
            >
              {stat.isText ? <TextStat stat={stat} /> : <NumericStat stat={stat} />}
            </div>
          )
        })}
      </div>
    </section>
  )
}
