import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Carte d'offre réutilisable - page Offres et aperçu Home
export default function OfferCard({ offer, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-[#3B9BB3] hover:shadow-lg hover:shadow-[#F0F0F0]/60 transition-all duration-300"
    >
      {/* Barre de couleur en haut */}
      <div
        className="h-1 w-full opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ background: 'linear-gradient(90deg, #066377, #3B9BB3)' }}
      />

      <div className="flex flex-col flex-1 p-6 sm:p-8">
        {/* Icone + Titre */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
            style={{ background: 'linear-gradient(135deg, rgba(6,99,119,0.12), rgba(6,99,119,0.08))' }}
          >
            <span className="text-[#066377]">{offer.icon}</span>
          </div>
          <div>
            <h3 className="text-gray-900 font-bold text-lg leading-tight">{offer.title}</h3>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <span className="text-xs text-[#066377] bg-[#F0F5F7] border border-white px-2 py-0.5 rounded-full font-medium">
                {offer.duration}
              </span>
              {offer.price && (
                <span className="text-xs text-amber-600 font-semibold">{offer.price}</span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-5">{offer.description}</p>

        {/* Liste des bénéfices */}
        <ul className="space-y-2 mb-6 flex-1">
          {offer.benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-[#066377] flex-shrink-0 mt-0.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {benefit}
            </li>
          ))}
        </ul>

        {/* Boutons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-auto">
          {offer.link && (
            <Link
              to={offer.link}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-[#066377] border border-white bg-[#F0F5F7] hover:bg-[#F0F0F0] hover:text-[#154359] transition-all duration-200 text-center"
            >
              En savoir plus
            </Link>
          )}
          <Link
            to="/rdv"
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white text-center transition-all duration-300 hover:shadow-lg hover:shadow-[#3B9BB3]/40 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #066377, #3B9BB3)' }}
          >
            Réserver un appel
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
