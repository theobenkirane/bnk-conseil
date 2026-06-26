import { useRef } from 'react'
import { Link } from 'react-router-dom'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const coarse = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches

export default function MagneticButton({
  children,
  to,
  href,
  className = '',
  ...props
}) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el || prefersReduced() || coarse()) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`
  }
  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0px, 0px)'
  }

  const base =
    'inline-flex items-center gap-2 text-white text-[11px] uppercase tracking-[0.14em] font-medium px-[18px] py-3 transition-transform duration-300 will-change-transform sheen'
  const style = {
    background: 'var(--c-teal)',
    clipPath: 'var(--clip-cta)',
  }

  const content = (
    <>
      {children}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 10L10 2M10 2H4M10 2V8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  )

  const shared = {
    ref,
    className: `${base} ${className}`,
    style,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    'data-cursor': 'lg',
    ...props,
  }

  if (to) return <Link to={to} {...shared}>{content}</Link>
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...shared}>
      {content}
    </a>
  )
}
