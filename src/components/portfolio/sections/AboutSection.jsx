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
      gsap.utils.toArray('.about-reveal').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 0.65, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
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
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 5rem)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Eyebrow */}
        <p className="about-reveal mono" style={{
          fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--signal)', marginBottom: '0.75rem',
        }}>
          Nf3 — Profil
        </p>
        <h2 className="about-reveal" style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, lineHeight: 1.05,
          marginBottom: 'clamp(3rem, 6vw, 5rem)', maxWidth: '640px',
        }}>
          Commercial de terrain,<br />mindset tech.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'start',
        }}>
          {/* Photo + bio */}
          <div>
            <div className="about-reveal" style={{
              width: '100%', maxWidth: '300px', aspectRatio: '3/4',
              borderRadius: '6px', overflow: 'hidden',
              border: '1px solid var(--border)',
              marginBottom: '2rem',
              background: 'var(--surface-2)',
              boxShadow: '0 8px 32px rgba(28,25,23,0.08)',
            }}>
              <img
                src="/theo.jpg"
                alt="Théo Benkirane — Account Manager"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement.style.display = 'flex'
                  e.currentTarget.parentElement.style.alignItems = 'center'
                  e.currentTarget.parentElement.style.justifyContent = 'center'
                }}
              />
            </div>

            {ABOUT.intro.map((para, i) => (
              <p key={i} className="about-reveal" style={{
                color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '1.2rem',
                fontSize: '0.95rem',
              }}>
                {para}
              </p>
            ))}

            {/* AI highlight badge */}
            <div className="about-reveal" style={{
              marginTop: '1.5rem',
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.6rem 1rem',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              background: 'var(--surface)',
            }}>
              <span style={{ fontSize: '1rem' }}>⚡</span>
              <span className="mono" style={{
                fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}>
                Utilise l'IA dans sa pratique quotidienne
              </span>
            </div>
          </div>

          {/* Formation */}
          <div>
            <h3 className="about-reveal mono" style={{
              fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--text-muted)', marginBottom: '1.5rem',
            }}>
              Formation
            </h3>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0' }}>
              {ABOUT.formation.map((f, i) => (
                <li key={i} className="about-reveal" style={{
                  display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
                  paddingTop: i === 0 ? 0 : '1.25rem',
                  paddingBottom: '1.25rem',
                  borderBottom: i < ABOUT.formation.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <span style={{ color: 'var(--signal)', marginTop: '3px', flexShrink: 0, fontSize: '0.9rem' }}>♟</span>
                  <div>
                    <p style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.9rem', marginBottom: '0.15rem' }}>
                      {f.degree}
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '0.2rem' }}>
                      {f.school}
                    </p>
                    <p className="mono" style={{
                      color: 'var(--text-muted)', fontSize: '0.65rem',
                      letterSpacing: '0.06em', opacity: 0.7,
                    }}>
                      {f.period}
                      {f.note && <span style={{ marginLeft: '0.5rem', color: 'var(--signal)' }}>— {f.note}</span>}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
