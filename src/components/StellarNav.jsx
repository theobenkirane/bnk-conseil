import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Accueil', path: '/' },
  { label: 'Offres', path: '/offres' },
  { label: 'Tarifs', path: '/tarifs' },
  { label: 'A propos', path: '/a-propos' },
  { label: 'Contact', path: '/rdv' },
]

const CTA_CLIP = 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'

export default function StellarNav() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => setMobileOpen(false), [location.pathname])

  return (
    <>
      {/* Desktop nav */}
      <div
        className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 z-40 items-center bg-white px-6 lg:px-10 py-4 gap-6 lg:gap-10"
        style={{ borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}
      >
        {/* Coins inverses decoratifs */}
        <span
          className="absolute -left-6 bottom-0 w-6 h-7 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 0 100%, transparent 24px, white 25px)' }}
        />
        <span
          className="absolute -right-6 bottom-0 w-6 h-7 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 100% 100%, transparent 24px, white 25px)' }}
        />

        {NAV_LINKS.map(({ label, path }) => (
          <Link
            key={path}
            to={path}
            className="text-[11px] uppercase tracking-[0.14em] font-medium transition-colors"
            style={{ color: location.pathname === path ? '#154359' : '#737373' }}
          >
            {label}
          </Link>
        ))}

        <Link
          to="/rdv"
          className="flex items-center gap-1.5 text-white text-[10px] uppercase tracking-[0.14em] font-medium px-[18px] py-3 transition-[filter] hover:brightness-125 ml-2"
          style={{ background: '#066377', clipPath: CTA_CLIP }}
        >
          Réserver un appel
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </Link>
      </div>

      {/* Mobile hamburger */}
      <div className="md:hidden absolute top-4 right-4 z-50">
        <button
          onClick={() => setMobileOpen(o => !o)}
          className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-lg bg-white/80 backdrop-blur border border-white/20"
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 bg-[#154359] rounded-full transition-transform origin-center ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[#154359] rounded-full transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[#154359] rounded-full transition-transform origin-center ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute inset-0 z-40 bg-white flex flex-col justify-center items-center gap-8">
          {NAV_LINKS.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className="font-firs text-3xl font-semibold uppercase tracking-tight"
              style={{ color: '#154359' }}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/rdv"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 text-white text-sm uppercase tracking-[0.14em] font-medium px-6 py-3 mt-4 transition-[filter] hover:brightness-125"
            style={{ background: '#066377', clipPath: CTA_CLIP }}
          >
            Réserver un appel
          </Link>
        </div>
      )}
    </>
  )
}
