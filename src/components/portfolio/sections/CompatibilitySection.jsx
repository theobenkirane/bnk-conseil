import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QUIZ } from '../../../lib/portfolio-content'

// A single-question expectation cap so the multi-select can't dominate the score.
const EXPECT_CAP = 25

function scoreToPercent(answers) {
  let raw = 0
  for (const q of QUIZ.questions) {
    const picked = answers[q.id]
    if (!picked) continue
    if (q.multi) {
      const sum = picked.reduce((acc, idx) => acc + q.options[idx].score, 0)
      raw += Math.min(EXPECT_CAP, sum)
    } else {
      raw += q.options[picked].score
    }
  }
  // Map raw (0..maxRaw) onto a friendly 60..99 range.
  const pct = 60 + (raw / QUIZ.maxRaw) * 39
  return Math.max(60, Math.min(99, Math.round(pct)))
}

function resultFor(pct) {
  return QUIZ.results.find((r) => pct >= r.min) || QUIZ.results[QUIZ.results.length - 1]
}

function OptionButton({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        textAlign: 'left',
        padding: '0.85rem 1.1rem',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: selected ? 'var(--signal)' : 'var(--border)',
        background: selected ? 'rgba(185,28,28,0.06)' : 'var(--surface)',
        color: 'var(--text)',
        fontSize: '0.9rem',
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: '0.7rem',
        transition: 'border-color 0.15s, background 0.15s',
      }}
      onMouseEnter={(e) => { if (!selected) e.currentTarget.style.borderColor = 'var(--text-muted)' }}
      onMouseLeave={(e) => { if (!selected) e.currentTarget.style.borderColor = 'var(--border)' }}
    >
      <span style={{
        width: '16px', height: '16px', flexShrink: 0,
        borderRadius: '4px',
        border: '1px solid', borderColor: selected ? 'var(--signal)' : 'var(--border)',
        background: selected ? 'var(--signal)' : 'transparent',
        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.7rem', lineHeight: 1,
      }}>
        {selected ? '✓' : ''}
      </span>
      {label}
    </button>
  )
}

function Gauge({ pct }) {
  const r = 52
  const c = 2 * Math.PI * r
  return (
    <div style={{ position: 'relative', width: '140px', height: '140px' }}>
      <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="var(--border)" strokeWidth="10" />
        <motion.circle
          cx="70" cy="70" r={r} fill="none"
          stroke="var(--signal)" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * pct) / 100 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '2rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1,
        }}>
          {pct}%
        </span>
        <span className="mono" style={{
          fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--text-muted)', marginTop: '0.25rem',
        }}>
          Compatibilité
        </span>
      </div>
    </div>
  )
}

export default function CompatibilitySection() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [done, setDone] = useState(false)

  const total = QUIZ.questions.length
  const q = QUIZ.questions[step]
  const current = answers[q?.id]
  const canNext = q?.multi ? Array.isArray(current) && current.length > 0 : current !== undefined

  const pct = useMemo(() => scoreToPercent(answers), [answers])
  const result = resultFor(pct)

  const select = (idx) => {
    setAnswers((prev) => {
      if (q.multi) {
        const arr = Array.isArray(prev[q.id]) ? [...prev[q.id]] : []
        const at = arr.indexOf(idx)
        if (at >= 0) arr.splice(at, 1)
        else arr.push(idx)
        return { ...prev, [q.id]: arr }
      }
      return { ...prev, [q.id]: idx }
    })
  }

  const next = () => {
    if (step < total - 1) setStep(step + 1)
    else setDone(true)
  }
  const back = () => setStep(Math.max(0, step - 1))
  const restart = () => { setAnswers({}); setStep(0); setDone(false) }

  return (
    <section
      id="compatibility"
      style={{
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 5rem)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <p className="mono" style={{
          fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--signal)', marginBottom: '0.75rem', textAlign: 'center',
        }}>
          Compatibilité
        </p>
        <h2 style={{
          fontSize: 'clamp(1.9rem, 4vw, 3.2rem)', fontWeight: 700, lineHeight: 1.07,
          marginBottom: '0.9rem', textAlign: 'center',
        }}>
          Sommes-nous faits pour jouer ensemble ?
        </h2>
        <p style={{
          fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.6,
          textAlign: 'center', maxWidth: '46ch', margin: '0 auto clamp(2.5rem, 5vw, 3.5rem)',
        }}>
          {QUIZ.intro}
        </p>

        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          boxShadow: '0 16px 50px rgba(28,25,23,0.08)',
          minHeight: '340px',
          display: 'flex', flexDirection: 'column',
        }}>
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
              >
                {/* Progress */}
                <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1.5rem' }}>
                  {QUIZ.questions.map((_, i) => (
                    <div key={i} style={{
                      flex: 1, height: '3px', borderRadius: '2px',
                      background: i <= step ? 'var(--signal)' : 'var(--border)',
                      transition: 'background 0.3s',
                    }} />
                  ))}
                </div>

                <span className="mono" style={{
                  fontSize: '0.62rem', letterSpacing: '0.08em',
                  color: 'var(--text-muted)', marginBottom: '0.5rem',
                }}>
                  Question {step + 1} / {total}
                </span>
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)', fontWeight: 600,
                  color: 'var(--text)', lineHeight: 1.25, marginBottom: '1.5rem',
                }}>
                  {q.q}
                </h3>

                <div style={{ display: 'grid', gap: '0.6rem', marginBottom: '1.75rem' }}>
                  {q.options.map((opt, idx) => (
                    <OptionButton
                      key={opt.label}
                      label={opt.label}
                      selected={q.multi ? (current || []).includes(idx) : current === idx}
                      onClick={() => select(idx)}
                    />
                  ))}
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={back}
                    disabled={step === 0}
                    style={{
                      background: 'none', border: 'none', cursor: step === 0 ? 'default' : 'pointer',
                      fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem',
                      color: 'var(--text-muted)', opacity: step === 0 ? 0.3 : 1,
                    }}
                  >
                    ← Retour
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    disabled={!canNext}
                    style={{
                      padding: '0.7rem 1.5rem', borderRadius: '6px', border: 'none',
                      background: canNext ? 'var(--text)' : 'var(--border)',
                      color: canNext ? 'var(--bg)' : 'var(--text-muted)',
                      fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.78rem', fontWeight: 600,
                      letterSpacing: '0.03em', cursor: canNext ? 'pointer' : 'default',
                      transition: 'opacity 0.2s',
                    }}
                  >
                    {step < total - 1 ? 'Suivant →' : 'Voir le score'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '1.25rem',
                }}
              >
                <Gauge pct={pct} />
                <div>
                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700,
                    color: 'var(--signal)', marginBottom: '0.5rem',
                  }}>
                    {result.title}
                  </h3>
                  <p style={{
                    fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.6,
                    maxWidth: '40ch', margin: '0 auto',
                  }}>
                    {result.message}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <a
                    href="#contact"
                    style={{
                      padding: '0.8rem 1.6rem', borderRadius: '6px',
                      background: 'var(--text)', color: 'var(--bg)',
                      fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.78rem', fontWeight: 600,
                      letterSpacing: '0.03em', textDecoration: 'none',
                    }}
                  >
                    Prendre contact →
                  </a>
                  <button
                    type="button"
                    onClick={restart}
                    style={{
                      padding: '0.8rem 1.6rem', borderRadius: '6px',
                      border: '1px solid var(--border)', background: 'var(--surface)',
                      color: 'var(--text)', cursor: 'pointer',
                      fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.78rem',
                      letterSpacing: '0.03em',
                    }}
                  >
                    Recommencer
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
