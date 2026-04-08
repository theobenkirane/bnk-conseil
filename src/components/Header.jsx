import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { AVAILABILITY } from '../config/availability'

// Sous-liens du menu Offres
const offresSubLinks = [
  { label: 'Audit Commercial', path: '/audit-commercial' },
  { label: 'Création Site Vitrine', path: '/creation-site-vitrine' },
  { label: "Aperçu gratuit", path: '/apercu-site' },
]

const sectorLinks = [
  { label: 'Restaurant', path: '/creation-site-vitrine-restaurant' },
  { label: 'Artisan', path: '/creation-site-vitrine-artisan' },
  { label: 'Coach / Formation', path: '/creation-site-vitrine-coach' },
  { label: 'Commerce local', path: '/creation-site-vitrine-commerce-local' },
]

const cityLinks = [
  { label: 'Lyon', path: '/creation-site-vitrine-lyon' },
  { label: 'Paris', path: '/creation-site-vitrine-paris' },
  { label: 'Bordeaux', path: '/creation-site-vitrine-bordeaux' },
]

const navLinks = [
  { label: 'Accueil', path: '/' },
  { label: 'Offres', path: '/offres', sub: offresSubLinks },
  { label: 'Tarifs', path: '/tarifs' },
  { label: "À propos", path: '/a-propos' },
  { label: 'Contact', path: '/rdv' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [offresOpen, setOffresOpen] = useState(false)
  const [desktopDropdown, setDesktopDropdown] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const dropdownRef = useRef(null)

  const bannerActive = AVAILABILITY.active

  // Fond blanc + ombre au scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Ferme le menu mobile + dropdown au changement de page
  useEffect(() => {
    setMenuOpen(false)
    setOffresOpen(false)
    setDesktopDropdown(false)
  }, [location.pathname])

  // L'onglet "Offres" est actif si on est sur /offres, /audit-commercial ou /creation-site-vitrine
  const isOffresActive = [
    '/offres', '/audit-commercial', '/creation-site-vitrine',
    '/creation-site-vitrine-restaurant', '/creation-site-vitrine-artisan',
    '/creation-site-vitrine-coach', '/creation-site-vitrine-commerce-local',
    '/creation-site-vitrine-lyon', '/creation-site-vitrine-paris', '/creation-site-vitrine-bordeaux',
  ].includes(location.pathname)

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        bannerActive ? 'top-10' : 'top-0'
      } ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-violet-100 shadow-sm shadow-violet-100/50'
          : 'bg-white/70 backdrop-blur-md'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span
              className="text-2xl font-black tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              BNK
            </span>
            <span className="text-gray-500 text-sm font-semibold hidden sm:block">Conseil</span>
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.sub) {
                // Lien "Offres" avec dropdown
                return (
                  <div
                    key={link.path}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setDesktopDropdown(true)}
                    onMouseLeave={() => setDesktopDropdown(false)}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 relative ${
                        isOffresActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {link.label}
                      <motion.svg
                        animate={{ rotate: desktopDropdown ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-3.5 h-3.5"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </motion.svg>
                      {isOffresActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                          style={{ background: 'linear-gradient(90deg, #7C3AED, #A855F7)' }}
                        />
                      )}
                    </Link>

                    {/* Dropdown desktop enrichi */}
                    <AnimatePresence>
                      {desktopDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl border border-gray-100 shadow-lg shadow-violet-100/40 overflow-hidden"
                        >
                          <div className="p-1.5">
                            {/* Section Services */}
                            <p className="px-3 pt-2 pb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                              Services
                            </p>
                            {link.sub.map((sub) => (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                  location.pathname === sub.path
                                    ? 'bg-violet-50 text-violet-700'
                                    : 'text-gray-700 hover:bg-violet-50 hover:text-violet-700'
                                }`}
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                  style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                                />
                                {sub.label}
                              </Link>
                            ))}

                            {/* Séparateur */}
                            <div className="border-t border-gray-100 my-1.5" />

                            {/* Section Par secteur */}
                            <p className="px-3 pt-1 pb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                              Par secteur
                            </p>
                            {sectorLinks.map((sub) => (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  location.pathname === sub.path
                                    ? 'bg-violet-50 text-violet-700'
                                    : 'text-gray-600 hover:bg-violet-50 hover:text-violet-700'
                                }`}
                              >
                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gray-300" />
                                {sub.label}
                              </Link>
                            ))}

                            {/* Séparateur + villes */}
                            <div className="border-t border-gray-100 my-1.5" />
                            <div className="px-3 py-2 flex items-center gap-1.5 flex-wrap">
                              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mr-1">
                                Villes
                              </span>
                              {cityLinks.map((city) => (
                                <Link
                                  key={city.path}
                                  to={city.path}
                                  className={`text-xs font-medium px-2 py-0.5 rounded-full transition-colors ${
                                    location.pathname === city.path
                                      ? 'bg-violet-100 text-violet-700'
                                      : 'bg-gray-100 text-gray-600 hover:bg-violet-100 hover:text-violet-700'
                                  }`}
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
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-200 relative ${
                    location.pathname === link.path
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #7C3AED, #A855F7)' }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* CTA desktop */}
          <div className="hidden md:flex items-center">
            <Link
              to="/rdv"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-violet-300/40 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
            >
              Réserver un appel
            </Link>
          </div>

          {/* Bouton hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
            aria-label="Menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-0.5 bg-gray-700 rounded-full origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-0.5 bg-gray-700 rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-0.5 bg-gray-700 rounded-full origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-gray-100"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link, i) => {
                if (link.sub) {
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {/* Ligne principale "Offres" avec chevron */}
                      <button
                        onClick={() => setOffresOpen(!offresOpen)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          isOffresActive
                            ? 'bg-violet-50 text-violet-700 border border-violet-200'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Link to={link.path} onClick={(e) => e.stopPropagation()} className="flex-1 text-left">
                          {link.label}
                        </Link>
                        <motion.svg
                          animate={{ rotate: offresOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="w-4 h-4 ml-2 flex-shrink-0"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </motion.svg>
                      </button>

                      {/* Sous-liens mobiles */}
                      <AnimatePresence>
                        {offresOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden ml-4 mt-1 flex flex-col gap-1"
                          >
                            <p className="px-4 pt-2 pb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                              Services
                            </p>
                            {link.sub.map((sub) => (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                  location.pathname === sub.path
                                    ? 'bg-violet-50 text-violet-700'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                                }`}
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                  style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                                />
                                {sub.label}
                              </Link>
                            ))}
                            <p className="px-4 pt-2 pb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                              Par secteur
                            </p>
                            {sectorLinks.map((sub) => (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                                  location.pathname === sub.path
                                    ? 'bg-violet-50 text-violet-700'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                                }`}
                              >
                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gray-300" />
                                {sub.label}
                              </Link>
                            ))}
                            <div className="px-4 py-2 flex items-center gap-1.5 flex-wrap">
                              {cityLinks.map((city) => (
                                <Link
                                  key={city.path}
                                  to={city.path}
                                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-violet-100 hover:text-violet-700 transition-colors"
                                >
                                  {city.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                }

                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        location.pathname === link.path
                          ? 'bg-violet-50 text-violet-700 border border-violet-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-2"
              >
                <Link
                  to="/rdv"
                  className="block text-center px-4 py-3 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                >
                  Réserver un appel
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
