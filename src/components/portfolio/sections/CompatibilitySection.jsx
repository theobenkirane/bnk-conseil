import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from '../theme'
import { Reveal, MaskText, Counter, Magnetic } from '../motion'
import { QUIZ } from '../../../lib/portfolio-content'

export default function CompatibilitySection() {
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [done, setDone] = useState(false)

  const q = QUIZ.questions[step]
  const total = QUIZ.questions.length

  const score = useMemo(() => {
    let raw = 0
    QUIZ.questions.forEach((qq) => {
      const a = answers[qq.id]
      if (a == null) return
      if (qq.multi) {
        const sum = a.reduce((acc, idx) => acc + qq.options[idx].score, 0)
        raw += Math.min(sum, 25)
      } else {
        raw += qq.options[a].score
      }
    })
    return Math.round((raw / QUIZ.maxRaw) * 100)
  }, [answers])

  const result = useMemo(() => QUIZ.results.find((r) => score >= r.min), [score])

  function choose(idx) {
    if (q.multi) {
      const cur = answers[q.id] || []
      const next = cur.includes(idx) ? cur.filter((x) => x !== idx) : [...cur, idx]
      setAnswers({ ...answers, [q.id]: next })
    } else {
      setAnswers({ ...answers, [q.id]: idx })
      setTimeout(next, 280)
    }
  }

  function next() {
    if (step < total - 1) setStep(step + 1)
    else setDone(true)
  }

  function reset() {
    setAnswers({}); setStep(0); setDone(false); setStarted(false)
  }

  const selected = answers[q?.id]
  const canNext = q?.multi ? selected && selected.length > 0 : selected != null

  return (
    <Section theme="ivory" id="compatibility">
      <div className="pf-wrap pf-wrap-narrow">
        <div className="pf-quiz-head">
          <Reveal><span className="pf-eyebrow">{QUIZ.eyebrow}</span></Reveal>
          <MaskText as="h2" className="pf-h2 pf-quiz-title" text="On est faits pour bosser ensemble ?" />
        </div>

        <div className="pf-quiz-panel pf-card">
          <AnimatePresence mode="wait">
            {!started && !done && (
              <motion.div key="intro" className="pf-quiz-state pf-quiz-center" {...fade}>
                <p className="pf-lead pf-quiz-intro">{QUIZ.intro}</p>
                <Magnetic>
                  <button className="pf-btn-brass" onClick={() => setStarted(true)} data-cursor>
                    Lancer le test <span className="pf-arrow">→</span>
                  </button>
                </Magnetic>
              </motion.div>
            )}

            {started && !done && (
              <motion.div key={`q-${step}`} className="pf-quiz-state" {...fade}>
                <div className="pf-quiz-meta">
                  <span className="pf-mono">{String(step + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
                  <div className="pf-quiz-bar"><div className="pf-quiz-bar-fill" style={{ width: `${((step + 1) / total) * 100}%` }} /></div>
                </div>
                <h3 className="pf-quiz-q">{q.q}</h3>
                <div className="pf-quiz-options">
                  {q.options.map((o, idx) => {
                    const isSel = q.multi ? (selected || []).includes(idx) : selected === idx
                    return (
                      <button key={idx} className={`pf-quiz-opt ${isSel ? 'is-sel' : ''}`} onClick={() => choose(idx)} data-cursor>
                        <span className="pf-quiz-opt-mark" />
                        {o.label}
                      </button>
                    )
                  })}
                </div>
                {q.multi && (
                  <div className="pf-quiz-actions">
                    <button className="pf-btn-brass" disabled={!canNext} onClick={next} data-cursor>
                      Continuer <span className="pf-arrow">→</span>
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {done && (
              <motion.div key="result" className="pf-quiz-state pf-quiz-result" {...fade}>
                <span className="pf-mono pf-quiz-score-label">Compatibilité</span>
                <span className="pf-quiz-score"><Counter to={score} suffix=" %" /></span>
                <h3 className="pf-quiz-rtitle">{result.title}</h3>
                <p className="pf-body pf-quiz-rmsg">{result.message}</p>
                <div className="pf-quiz-ractions">
                  <Magnetic>
                    <a className="pf-btn-brass" href="#contact" data-cursor>Me contacter <span className="pf-arrow">↗</span></a>
                  </Magnetic>
                  <button className="pf-btn-ghost" onClick={reset} data-cursor>Recommencer</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{CSS}</style>
    </Section>
  )
}

const fade = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
}

const CSS = `
.pf-quiz-head { text-align: center; margin-bottom: clamp(2rem, 5vh, 3rem); }
.pf-quiz-head .pf-eyebrow { justify-content: center; }
.pf-quiz-title { margin-top: 1rem; }
.pf-quiz-panel { padding: clamp(1.8rem, 4vw, 3.2rem); min-height: 380px; display: flex; align-items: center; }
.pf-quiz-state { width: 100%; }

.pf-quiz-center { text-align: center; }
.pf-quiz-intro { margin: 0 auto 1.8rem; max-width: 40ch; }

.pf-quiz-meta { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.6rem; color: var(--muted); font-size: 0.72rem; }
.pf-quiz-bar { flex: 1; height: 2px; background: var(--line); border-radius: 2px; overflow: hidden; }
.pf-quiz-bar-fill { height: 100%; background: var(--brass); transition: width 0.5s var(--ease, ease); }
.pf-quiz-q { font-size: clamp(1.3rem, 2.5vw, 1.9rem); margin-bottom: 1.6rem; }
.pf-quiz-options { display: grid; gap: 0.7rem; }
.pf-quiz-opt {
  display: flex; align-items: center; gap: 0.9rem; text-align: left;
  padding: 1rem 1.2rem; border: 1px solid var(--line); border-radius: 12px;
  background: transparent; color: var(--fg); cursor: pointer; font-size: 0.98rem;
  font-family: var(--font-body); transition: border-color 0.3s ease, background 0.3s ease;
}
.pf-quiz-opt:hover { border-color: var(--brass); }
.pf-quiz-opt-mark { width: 16px; height: 16px; border: 1px solid var(--line); border-radius: 50%; flex: none; transition: all 0.3s ease; }
.pf-quiz-opt.is-sel { border-color: var(--brass); background: color-mix(in srgb, var(--brass) 8%, transparent); }
.pf-quiz-opt.is-sel .pf-quiz-opt-mark { background: var(--brass); border-color: var(--brass); box-shadow: inset 0 0 0 3px var(--base); }
.pf-quiz-actions { margin-top: 1.6rem; display: flex; justify-content: flex-end; }
.pf-btn-brass:disabled { opacity: 0.4; cursor: not-allowed; }

.pf-quiz-result { text-align: center; }
.pf-quiz-score-label { font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }
.pf-quiz-score {
  display: block; font-family: var(--font-display); font-weight: 440; letter-spacing: -0.04em;
  font-size: clamp(4rem, 12vw, 8rem); line-height: 0.9; color: var(--brass); margin: 0.4rem 0 0.6rem;
}
.pf-quiz-rtitle { font-size: clamp(1.4rem, 3vw, 2.2rem); margin-bottom: 0.8rem; }
.pf-quiz-rmsg { max-width: 42ch; margin: 0 auto 2rem; }
.pf-quiz-ractions { display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap; }
`
