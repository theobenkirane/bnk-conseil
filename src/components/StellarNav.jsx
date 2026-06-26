import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import MagneticButton from './stellar/MagneticButton'

const OFFRES_SUB = [
  { label: 'Audit Commercial', path: '/audit-commercial' },
  { label: 'Création Site Vitrine', path: '/creation-site-vitrine' },
  { label: 'Aperçu gratuit', path: '/apercu-site' },
]

const SECTOR_LINKS = [
  { label: 'Restaurant', path: '/creation-site-vitrine-restaurant' },
  { label: 'Artisan', path: '/creation-site-vitrine-artisan' },
  { label: 'Coach / Formation', path: '/creation-site-vitrine-coach' },
  { label: 'Commerce local', path: '/creation-site-vitrine-commerce-local' },
]

const CITY_LINKS = [
  { label: 'Lyon', path: '/creation-site-vitrine-lyon' },
  { label: 'Paris', path: '/creation-site-vitrine-paris' },
  { label: 'Bordeaux', path: '/creation-site-vitrine-bordeaux' },
]

const OFFRES_PATHS = [
  '/offres',
  ...OFFRES_SUB.map((l) => l.path),
  ...SECTOR_LINKS.map((l) => l.path),
  ...CITY_LINKS.map((l) => l.path),
]

const NAV_LINKS = [
  { label: 'Accueil', path: '/' },
  { label: 'Offres', path: '/offres', dropdown: true },
  { label: 'Tarifs', path: '/tarifs' },
  { label: 'A propos', path: '/a-propos' },
  { label: 'Contact', path: '/rdv' },
]

export default function StellarNav() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [offresOpen, setOffresOpen] = useState(false)
  const [mobileOffres, setMobileOffres] = useState(false)
  const closeMobile = () => setMobileOpen(false)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setMobileOpen(false)
    setOffresOpen(false)
  }, [location.pathname])

  const isOffresActive = OFFRES_PATHS.includes(location.pathname)

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
      {/* Desktop nav — pilule flottante détachée */}
      <div className="hidden md:flex absolute top-4 lg:top-5 left-1/2 -translate-x-1/2 z-40 justify-center w-full px-4 pointer-events-none">
        <nav
          className="pointer-events-auto flex items-center gap-5 lg:gap-7 bg-white/85 backdrop-blur-md rounded-full pl-5 pr-2.5 py-2.5 border border-black/5"
          style={{ boxShadow: '0 12px 40px -12px rgba(21,67,89,0.28)' }}
        >
          <Link to="/" className="flex items-center gap-2 mr-1" data-cursor="lg">
            {logoMark}
            <span className="font-firs text-[15px] font-semibold tracking-tight" style={{ color: 'var(--c-dark)' }}>
              BNK <span className="font-sans font-normal text-[12px] opacity-70">Conseil</span>
            </span>
          </Link>

          {NAV_LINKS.map(({ label, path, dropdown }) => {
            if (dropdown) {
              return (
                <div
                  key={path}
                  className="relative"
                  onMouseEnter={() => setOffresOpen(true)}
                  onMouseLeave={() => setOffresOpen(false)}
                >
                  <Link
                    to={path}
                    className="flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] font-medium transition-colors"
                    style={{ color: isOffresActive ? 'var(--c-dark)' : 'var(--c-mid)' }}
                  >
                    {label}
                    <ChevronDown
                      size={13}
                      strokeWidth={2.2}
                      className="transition-transform duration-200"
                      style={{ transform: offresOpen ? 'rotate(180deg)' : 'none' }}
                    />
                  </Link>

                  <AnimatePresence>
                    {offresOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-72"
                      >
                        <div
                          className="bg-white rounded-2xl border border-black/5 overflow-hidden p-2"
                          style={{ boxShadow: '0 20px 50px -16px rgba(21,67,89,0.35)' }}
                        >
                          <p className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--c-mid)' }}>
                            Services
                          </p>
                          {OFFRES_SUB.map((sub) => (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-[var(--c-bg-results)]"
                              style={{ color: location.pathname === sub.path ? 'var(--c-teal)' : 'var(--c-dark)' }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--grad-display)' }} />
                              {sub.label}
                            </Link>
                          ))}

                          <div className="border-t border-black/5 my-1.5" />
                          <p className="px-3 pt-1 pb-1 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--c-mid)' }}>
                            Par secteur
                          </p>
                          {SECTOR_LINKS.map((sub) => (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-[var(--c-bg-results)]"
                              style={{ color: location.pathname === sub.path ? 'var(--c-teal)' : 'var(--c-dark)' }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--c-teal-mid)', opacity: 0.5 }} />
                              {sub.label}
                            </Link>
                          ))}

                          <div className="border-t border-black/5 my-1.5" />
                          <div className="px-3 py-2 flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-semibold uppercase tracking-widest mr-1" style={{ color: 'var(--c-mid)' }}>
                              Villes
                            </span>
                            {CITY_LINKS.map((city) => (
                              <Link
                                key={city.path}
                                to={city.path}
                                className="text-xs font-medium px-2.5 py-0.5 rounded-full transition-colors"
                                style={{
                                  background: location.pathname === city.path ? 'var(--c-bg-results)' : 'var(--c-bg-services)',
                                  color: location.pathname === city.path ? 'var(--c-teal)' : 'var(--c-dark)',
                                }}
                              >
                                {city.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            }

            return (
              <Link
                key={path}
                to={path}
                className="text-[11px] uppercase tracking-[0.14em] font-medium transition-colors"
                style={{ color: location.pathname === path ? 'var(--c-dark)' : 'var(--c-mid)' }}
              >
                {label}
              </Link>
            )
          })}

          <MagneticButton to="/rdv" className="ml-1">Réserver un appel</MagneticButton>
        </nav>
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
        <div className="md:hidden absolute inset-0 z-40 bg-white flex flex-col justify-center items-center gap-7 overflow-y-auto py-20">
          <Link to="/" className="flex items-center gap-2 mb-2" data-cursor="lg" onClick={closeMobile}>
            {logoMark}
            <span className="font-firs text-[15px] font-semibold tracking-tight" style={{ color: 'var(--c-dark)' }}>
              BNK <span className="font-sans font-normal text-[12px] opacity-70">Conseil</span>
            </span>
          </Link>
          {NAV_LINKS.map(({ label, path, dropdown }) => {
            if (dropdown) {
              return (
                <div key={path} className="flex flex-col items-center gap-3">
                  <button
                    onClick={() => setMobileOffres(o => !o)}
                    className="flex items-center gap-1.5 font-firs text-3xl font-semibold uppercase tracking-tight"
                    style={{ color: 'var(--c-dark)' }}
                  >
                    {label}
                    <ChevronDown size={22} strokeWidth={2.2} style={{ transform: mobileOffres ? 'rotate(180deg)' : 'none' }} />
                  </button>
                  {mobileOffres && (
                    <div className="flex flex-col items-center gap-2.5">
                      {OFFRES_SUB.map((sub) => (
                        <Link key={sub.path} to={sub.path} onClick={closeMobile} className="text-sm font-medium" style={{ color: 'var(--c-teal)' }}>
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            return (
              <Link
                key={path}
                to={path}
                onClick={closeMobile}
                className="font-firs text-3xl font-semibold uppercase tracking-tight"
                style={{ color: 'var(--c-dark)' }}
              >
                {label}
              </Link>
            )
          })}
          <MagneticButton to="/rdv" className="mt-4" onClick={closeMobile}>
            Réserver un appel
          </MagneticButton>
        </div>
      )}
    </>
  )
}
