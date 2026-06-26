import { Link } from 'react-router-dom'
import { AVAILABILITY } from '../config/availability'

export default function AvailabilityBanner() {
  if (!AVAILABILITY.active) return null
  return (
    <div
      className="fixed top-0 left-0 right-0 z-60 w-full flex items-center justify-center gap-3 px-4 py-2 text-[12.5px] font-medium tracking-tight"
      style={{ background: 'var(--c-dark)', color: 'rgba(255,255,255,0.92)' }}
    >
      <span className="flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: 'var(--c-chrome-hi)', boxShadow: '0 0 8px var(--c-chrome-hi)' }} />
        {AVAILABILITY.message}
      </span>
      <Link
        to={AVAILABILITY.ctaLink}
        className="hover:opacity-80 transition-opacity px-3 py-0.5 rounded-full text-[11px] font-semibold"
        style={{ background: 'rgba(255,255,255,0.12)', color: 'var(--c-chrome-hi)' }}
      >
        {AVAILABILITY.cta} →
      </Link>
    </div>
  )
}
