import { useRef } from 'react'
import { Link } from 'react-router-dom'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
const coarse = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches

export default function NominationCard({ title, subtitle, to, icon: Icon, className = '' }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el || prefersReduced() || coarse()) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(700px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg) translateY(-2px)`
  }
  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)'
  }

  return (
    <Link
      to={to}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="lg"
      className={`sheen relative block h-[112px] w-full transition-transform duration-300 will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <polygon
          points="14,0 100,0 100,86 86,100 0,100 0,14"
          fill="rgba(255,255,255,0.94)"
          stroke="rgba(6,99,119,0.25)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="absolute inset-0 flex items-center gap-3 px-5">
        {Icon && (
          <span
            className="flex-none flex items-center justify-center w-9 h-9"
            style={{ background: 'var(--c-bg-results)', color: 'var(--c-teal)' }}
          >
            <Icon size={18} strokeWidth={1.75} />
          </span>
        )}
        <span className="min-w-0">
          <span className="block text-[14px] font-semibold leading-tight" style={{ color: 'var(--c-dark)' }}>
            {title}
          </span>
          <span className="block text-[12px] leading-tight opacity-75" style={{ color: 'var(--c-dark)' }}>
            {subtitle}
          </span>
        </span>
      </div>
    </Link>
  )
}
