import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ABOUT } from '../../../lib/portfolio-content'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.about-reveal').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.08,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 3rem)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Eyebrow */}
      <p
        className="about-reveal mono"
        style={{
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--signal)',
          marginBottom: '0.75rem',
        }}
      >
        Nf3 — Profil
      </p>

      <h2
        className="about-reveal"
        style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: '3.5rem',
          maxWidth: '600px',
        }}
      >
        Stratégie,<br />analyse, résultats.
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}
      >
        {/* Photo + bio */}
        <div>
          {/* Photo */}
          <div
            className="about-reveal"
            style={{
              width: '100%',
              maxWidth: '320px',
              aspectRatio: '3/4',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              marginBottom: '2rem',
              background: 'var(--surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="/theo.jpg"
              alt="Théo Benkirane — Account Manager"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement.innerHTML = `
                  <span style="font-family:'IBM Plex Mono',monospace;font-size:0.7rem;letter-spacing:0.1em;color:var(--text-muted);text-transform:uppercase;">Photo<br/>à venir</span>
                `
              }}
            />
          </div>

          {/* Paragraphes */}
          {ABOUT.intro.map((para, i) => (
            <p
              key={i}
              className="about-reveal"
              style={{
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                marginBottom: '1.25rem',
                fontSize: '0.95rem',
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Formation */}
        <div>
          <h3
            className="about-reveal mono"
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '1.5rem',
            }}
          >
            Formation
          </h3>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {ABOUT.formation.map((f, i) => (
              <li
                key={i}
                className="about-reveal"
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                  paddingBottom: '1.5rem',
                  borderBottom: i < ABOUT.formation.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <span style={{ color: 'var(--signal)', marginTop: '3px', flexShrink: 0, fontSize: '0.85rem' }}>♟</span>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                    {f.degree}
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {f.school}
                  </p>
                  <p
                    className="mono"
                    style={{ color: 'var(--data)', fontSize: '0.7rem', marginTop: '0.25rem', letterSpacing: '0.05em' }}
                  >
                    {f.period}
                    {f.note && (
                      <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem' }}>— {f.note}</span>
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
