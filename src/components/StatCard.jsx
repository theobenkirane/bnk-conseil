import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStellar } from '../contexts/StellarContext'

gsap.registerPlugin(ScrollTrigger)

const clipPaths = {
  1: 'polygon(64px 0%, 100% 0%, 100% 100%, 14px 100%, 0% calc(100% - 14px), 0% 64px)',
  2: 'polygon(0% 0%, calc(100% - 64px) 0%, 100% 64px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0% 100%)',
  3: 'polygon(14px 0%, 100% 0%, 100% calc(100% - 64px), calc(100% - 64px) 100%, 14px 100%, 0% calc(100% - 14px), 0% 14px)',
}

const bgGradients = {
  1: 'radial-gradient(120% 120% at 20% 20%, var(--c-chrome-hi), var(--c-chrome-lo) 55%, var(--c-dark))',
  2: 'radial-gradient(120% 120% at 80% 30%, var(--c-teal-mid), var(--c-teal) 55%, var(--c-dark))',
  3: 'radial-gradient(120% 120% at 50% 80%, var(--c-chrome-hi), var(--c-chrome-lo) 50%, var(--c-dark))',
}

// Parse '+40%' -> { prefix:'+', num:40, suffix:'%' }
function parseValue(v) {
  const m = String(v).match(/^([^\d]*)(\d+)(.*)$/)
  if (!m) return { prefix: '', num: 0, suffix: v }
  return { prefix: m[1], num: parseInt(m[2], 10), suffix: m[3] }
}

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function StatCard({ value, label, variant = 1, className = '' }) {
  const ref = useRef(null)
  const { scrollRef } = useStellar()
  const { prefix, num, suffix } = parseValue(value)
  const [display, setDisplay] = useState(() => (prefersReducedMotion ? num : 0))
  const clipPath = clipPaths[variant] || clipPaths[1]

  useEffect(() => {
    if (prefersReducedMotion) return
    const el = ref.current
    const scroller = scrollRef?.current
    if (!el || !scroller) return
    const counter = { v: 0 }
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        v: num,
        duration: 1.4,
        ease: 'power2.out',
        onUpdate: () => setDisplay(Math.round(counter.v)),
        scrollTrigger: { trigger: el, scroller, start: 'top 85%', toggleActions: 'play none none none' },
      })
    }, el)
    return () => ctx.revert()
  }, [scrollRef, num])

  return (
    <div ref={ref} className={`w-full h-[280px] sm:h-[340px] relative ${className}`} style={{ clipPath }}>
      <div className="absolute inset-0" style={{ background: bgGradients[variant] || bgGradients[1], clipPath }} />
      <div
        className="absolute inset-0"
        style={{ clipPath, background: 'linear-gradient(180deg, transparent 40%, rgba(21,67,89,0.55))' }}
      />
      <div className="absolute left-6 right-6 bottom-6 flex flex-col gap-2">
        <span className="font-firs text-[44px] sm:text-[60px] font-semibold leading-none text-white">
          {prefix}{display}{suffix}
        </span>
        <span className="text-[14px] leading-snug max-w-[14em] text-white/90">{label}</span>
      </div>
    </div>
  )
}
