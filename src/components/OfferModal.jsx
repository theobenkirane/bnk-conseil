import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

// Modal détail d'une offre
export default function OfferModal({ offer, onClose }) {
  // Fermeture à la touche Echap
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!offer) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Fond flouté */}
        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" />

        {/* Contenu du modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full max-w-lg bg-white border border-violet-100 rounded-2xl overflow-hidden shadow-2xl shadow-violet-200/30"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Barre dégradée en haut */}
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #7C3AED, #A855F7)' }} />

          <div className="p-6 sm:p-8">
            {/* En-tête */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(168,85,247,0.08))' }}
                >
                  <span className="text-violet-600">{offer.icon}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{offer.title}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-violet-600 font-medium bg-violet-50 px-2 py-0.5 rounded-full border border-violet-200">
                      {offer.duration}
                    </span>
                    {offer.price && (
                      <span className="text-xs text-amber-600 font-semibold">{offer.price}</span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{offer.longDescription}</p>

            {/* Bénéfices */}
            <div className="mb-6">
              <h3 className="text-gray-800 font-semibold text-sm mb-3 uppercase tracking-wider">Ce qui est inclus</h3>
              <ul className="space-y-2.5">
                {offer.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <Link
              to="/rdv"
              onClick={onClose}
              className="block w-full text-center py-3 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:shadow-lg hover:shadow-violet-300/40 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
            >
              Réserver un appel gratuit
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
