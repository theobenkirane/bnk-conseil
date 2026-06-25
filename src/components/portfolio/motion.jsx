// Primitives de motion du portfolio : reveals, texte masqué ligne par ligne,
// boutons magnétiques, curseur custom, loader d'intro, compteurs animés.
// Toutes respectent prefers-reduced-motion.

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  animate,
  useReducedMotion,
} from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

// ── Reveal : fondu + montée au scroll ────────────────────────────────────────
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })
  const M = motion[as] || motion.div

  return (
    <M
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </M>
  )
}

// ── MaskText : chaque mot monte derrière un masque, en cascade ───────────────
export function MaskText({ text, className = '', delay = 0, stagger = 0.045, as = 'h2' }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const words = String(text).split(' ')
  const Tag = motion[as] || motion.h2

  if (reduce) {
    const Plain = as
    return <Plain ref={ref} className={className}>{text}</Plain>
  }

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="pf-mask" aria-hidden="true">
          <motion.span
            className="pf-mask-inner"
            initial={{ y: '110%' }}
            animate={inView ? { y: '0%' } : undefined}
            transition={{ duration: 0.85, ease: EASE, delay: delay + i * stagger }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  )
}

// ── MagneticButton : suit légèrement le curseur au survol ────────────────────
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })

  function onMove(e) {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: 'inline-flex' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  )
}

// ── Curseur custom : point + anneau, grossit sur [data-cursor] ───────────────
export function Cursor() {
  const reduce = useReducedMotion()
  const [hidden, setHidden] = useState(true)
  const [active, setActive] = useState(false)
  const rx = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40 })
  const ry = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40 })
  const dx = useSpring(useMotionValue(-100), { stiffness: 900, damping: 50 })
  const dy = useSpring(useMotionValue(-100), { stiffness: 900, damping: 50 })

  useEffect(() => {
    if (reduce) return
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    setHidden(false)

    function move(e) {
      rx.set(e.clientX)
      ry.set(e.clientY)
      dx.set(e.clientX)
      dy.set(e.clientY)
      const t = e.target
      setActive(!!(t && t.closest && t.closest('a, button, [data-cursor]')))
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [reduce, rx, ry, dx, dy])

  if (hidden) return null

  return (
    <>
      <motion.div
        className="pf-cursor-ring"
        style={{ left: rx, top: ry }}
        animate={{ scale: active ? 1.9 : 1, opacity: active ? 0.5 : 1 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div className="pf-cursor-dot" style={{ left: dx, top: dy }} />
    </>
  )
}

// ── IntroLoader : compteur 0→100 puis volet qui se relève ────────────────────
export function IntroLoader({ onDone }) {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (reduce) {
      onDone?.()
      return
    }
    const controls = animate(0, 100, {
      duration: 1.9,
      ease: [0.7, 0, 0.2, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setLeaving(true),
    })
    return () => controls.stop()
  }, [reduce, onDone])

  if (reduce) return null

  return (
    <motion.div
      className="pf-loader"
      initial={{ y: 0 }}
      animate={leaving ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: leaving ? 0.25 : 0 }}
      onAnimationComplete={() => leaving && onDone?.()}
    >
      <div className="pf-loader-inner">
        <span className="pf-loader-label">Théo Benkirane</span>
        <span className="pf-loader-count">{String(count).padStart(3, '0')}</span>
        <div className="pf-loader-bar">
          <motion.div
            className="pf-loader-fill"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 100 }}
            transition={{ ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  )
}

// ── Counter : nombre qui s'incrémente quand visible ──────────────────────────
export function Counter({ to, suffix = '', prefix = '', duration = 1.8 }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const [val, setVal] = useState(reduce ? to : 0)

  useEffect(() => {
    if (reduce || !inView) return
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, duration, reduce])

  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  )
}
