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
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
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
        <p className="about-reveal mono" style={{
          fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--signal)', marginBottom: '0.75rem',
        }}>
          Profil
        </p>
        <h2 className="about-reveal" style={{
          fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontWeight: 700, lineHeight: 1.05,
          marginBottom: '1.5rem', maxWidth: '14ch',
        }}>
          {ABOUT.headline}
        </h2>
        <p className="about-reveal" style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
          color: 'var(--text)', lineHeight: 1.6, maxWidth: '60ch',
          marginBottom: 'clamp(3rem, 6vw, 4.5rem)',
        }}>
          {ABOUT.lead}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(220px, 0.8fr) minmax(0, 1.2fr)',
          gap: 'clamp(2.5rem, 6vw, 5rem)',
          alignItems: 'start',
        }}
          className="about-grid"
        >
          <style>{`
            @media (max-width: 820px) {
              .about-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Left — photo + quick facts */}
          <div>
            <div className="about-reveal" style={{
              width: '100%', maxWidth: '300px', aspectRatio: '3/4',
              borderRadius: '10px', overflow: 'hidden',
              border: '1px solid var(--border)',
              marginBottom: '1.5rem',
              background: 'var(--surface-2)',
              boxShadow: '0 12px 40px rgba(28,25,23,0.12)',
            }}>
              <img
                src="/theo.jpg"
                alt="Théo Benkirane, Account Manager"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <dl className="about-reveal" style={{
              margin: 0,
              border: '1px solid var(--border)',
              borderRadius: '10px',
              background: 'var(--surface)',
              overflow: 'hidden',
              maxWidth: '300px',
            }}>
              {ABOUT.facts.map((f, i) => (
                <div key={f.label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.7rem 1rem',
                  borderBottom: i < ABOUT.facts.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <dt className="mono" style={{
                    fontSize: '0.62rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                  }}>
                    {f.label}
                  </dt>
                  <dd style={{ margin: 0, fontSize: '0.82rem', fontWeight: 600, color: 'var(--text)' }}>
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right — bio + formation */}
          <div>
            {ABOUT.paragraphs.map((para, i) => (
              <p key={i} className="about-reveal" style={{
                color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '1.2rem',
                fontSize: '0.98rem', maxWidth: '60ch',
              }}>
                {para}
              </p>
            ))}

            <div className="about-reveal" style={{
              margin: '1.5rem 0 2.5rem',
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.6rem 1rem',
              border: '1px solid var(--signal)',
              borderRadius: '100px',
              background: 'rgba(185,28,28,0.05)',
            }}>
              <span style={{ fontSize: '1rem' }}>⚡</span>
              <span className="mono" style={{
                fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'var(--signal)', fontWeight: 600,
              }}>
                L'IA intégrée à ma pratique quotidienne
              </span>
            </div>

            <h3 className="about-reveal mono" style={{
              fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--text-muted)', marginBottom: '1rem',
            }}>
              Formation
            </h3>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {ABOUT.formation.map((f, i) => (
                <li key={i} className="about-reveal" style={{
                  display: 'flex', gap: '1rem', alignItems: 'baseline',
                  paddingTop: i === 0 ? 0 : '1rem',
                  paddingBottom: '1rem',
                  borderBottom: i < ABOUT.formation.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <span className="mono" style={{
                    fontSize: '0.62rem', color: 'var(--text-muted)', opacity: 0.7,
                    whiteSpace: 'nowrap', minWidth: '5.5rem',
                  }}>
                    {f.period}
                  </span>
                  <div>
                    <p style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.92rem', marginBottom: '0.1rem' }}>
                      {f.degree}
                      {f.note && (
                        <span className="mono" style={{
                          marginLeft: '0.6rem', fontSize: '0.6rem', color: 'var(--signal)',
                          letterSpacing: '0.04em', textTransform: 'uppercase',
                        }}>
                          {f.note}
                        </span>
                      )}
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                      {f.school}
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
