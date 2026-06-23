import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HERO } from '../../../lib/portfolio-content'

gsap.registerPlugin(ScrollTrigger)

function ChessboardBg() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          repeating-conic-gradient(
            rgba(242,240,234,0.04) 0% 25%,
            transparent 0% 50%
          )
        `,
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  )
}

function AnimatedCounter({ target }) {
  const [value, setValue] = useState(0)
  const nodeRef = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setValue(target)
      return
    }

    const obj = { val: 0 }
    const tween = gsap.to(obj, {
      val: target,
      duration: 2,
      delay: 0.8,
      ease: 'power2.out',
      onUpdate: () => setValue(Math.round(obj.val)),
    })

    return () => tween.kill()
  }, [target])

  return <span ref={nodeRef}>{value}</span>
}

const stagger = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
}

export default function HeroSection() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !bgRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '6rem 2rem',
      }}
    >
      <div ref={bgRef} style={{ position: 'absolute', inset: 0 }}>
        <ChessboardBg />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, var(--bg) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '720px', width: '100%' }}>
        {/* Eyebrow notation */}
        <motion.p
          className="mono"
          variants={stagger}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--signal)',
            marginBottom: '1rem',
          }}
        >
          e4 — Ouverture
        </motion.p>

        {/* Nom */}
        <motion.h1
          variants={stagger}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: '1rem',
            color: 'var(--text)',
          }}
        >
          Théo Benkirane
        </motion.h1>

        {/* Titre */}
        <motion.p
          variants={stagger}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
            color: 'var(--text-muted)',
            fontWeight: 400,
            marginBottom: '2.5rem',
            lineHeight: 1.4,
          }}
        >
          Account Manager · Stratège commercial
        </motion.p>

        {/* Stat animée */}
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: '0.4rem',
            marginBottom: '3rem',
            padding: '0.75rem 1.25rem',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            background: 'var(--surface)',
          }}
        >
          <span
            className="mono"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 600,
              color: 'var(--data)',
              lineHeight: 1,
            }}
          >
            <AnimatedCounter target={HERO.upsellTarget} />%+
          </span>
          <span
            className="mono"
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {HERO.upsellLabel}
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}
        >
          <a
            href={HERO.cta.cv}
            download
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: 'var(--signal)',
              color: '#fff',
              borderRadius: '6px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            ↓ Télécharger le CV
          </a>
          <a
            href={HERO.cta.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              borderRadius: '6px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.8rem',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text-muted)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            LinkedIn ↗
          </a>
          <a
            href={`mailto:${HERO.cta.email}`}
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            {HERO.cta.email}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
        }}
        aria-hidden="true"
      >
        <span
          className="mono"
          style={{ fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{ width: '1px', height: '32px', background: 'var(--border)' }}
        />
      </motion.div>
    </section>
  )
}
