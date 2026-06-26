import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MagneticButton from './stellar/MagneticButton'

const NAV_LINKS = [
  { label: 'Accueil', path: '/' },
  { label: 'Offres', path: '/offres' },
  { label: 'Tarifs', path: '/tarifs' },
  { label: 'A propos', path: '/a-propos' },
  { label: 'Contact', path: '/rdv' },
]

export default function StellarNav() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeMobile = () => setMobileOpen(false)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMobileOpen(false), [location.pathname])

  const logoMark = (
    <span
      className="block w-6 h-6"
      style={{
        background: 'var(--c-dark)',
        WebkitMaskImage: 'url(/logo.svg)',
        maskImage: 'url(/logo.svg)',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
      aria-hidden="true"
    />
  )

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

        <Link to="/" className="flex items-center gap-2 mr-2" data-cursor="lg">
          {logoMark}
          <span className="font-firs text-[15px] font-semibold tracking-tight" style={{ color: 'var(--c-dark)' }}>
            BNK <span className="font-sans font-normal text-[12px] opacity-70">Conseil</span>
          </span>
        </Link>

        {NAV_LINKS.map(({ label, path }) => (
          <Link
            key={path}
            to={path}
            className="text-[11px] uppercase tracking-[0.14em] font-medium transition-colors"
            style={{ color: location.pathname === path ? 'var(--c-dark)' : '#737373' }}
          >
            {label}
          </Link>
        ))}

        <MagneticButton to="/rdv" className="ml-2">Réserver un appel</MagneticButton>
      </div>

      {/* Mobile hamburger */}
      <div className="md:hidden absolute top-4 right-4 z-50">
        <button
          onClick={() => setMobileOpen(o => !o)}
          className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-lg bg-white/80 backdrop-blur border border-white/20"
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 rounded-full transition-transform origin-center ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ background: 'var(--c-dark)' }} />
          <span className={`block w-5 h-0.5 rounded-full transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} style={{ background: 'var(--c-dark)' }} />
          <span className={`block w-5 h-0.5 rounded-full transition-transform origin-center ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: 'var(--c-dark)' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute inset-0 z-40 bg-white flex flex-col justify-center items-center gap-8">
          <Link to="/" className="flex items-center gap-2 mb-2" data-cursor="lg" onClick={closeMobile}>
            {logoMark}
            <span className="font-firs text-[15px] font-semibold tracking-tight" style={{ color: 'var(--c-dark)' }}>
              BNK <span className="font-sans font-normal text-[12px] opacity-70">Conseil</span>
            </span>
          </Link>
          {NAV_LINKS.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              onClick={closeMobile}
              className="font-firs text-3xl font-semibold uppercase tracking-tight"
              style={{ color: 'var(--c-dark)' }}
            >
              {label}
            </Link>
          ))}
          <MagneticButton to="/rdv" className="mt-4" onClick={closeMobile}>
            Réserver un appel
          </MagneticButton>
        </div>
      )}
    </>
  )
}
