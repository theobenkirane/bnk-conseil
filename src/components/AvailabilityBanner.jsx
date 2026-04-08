import { Link } from 'react-router-dom'
import { AVAILABILITY } from '../config/availability'

export default function AvailabilityBanner() {
  if (!AVAILABILITY.active) return null
  return (
    <div
      className="fixed top-0 left-0 right-0 z-60 w-full flex items-center justify-center gap-3 px-4 py-2.5 text-white text-sm font-medium"
      style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
    >
      <span>{AVAILABILITY.message}</span>
      <Link
        to={AVAILABILITY.ctaLink}
        className="bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 rounded-full text-xs font-semibold"
      >
        {AVAILABILITY.cta} →
      </Link>
    </div>
  )
}
