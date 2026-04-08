import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const SECTORS = [
  "Restauration",
  "Artisanat",
  "Commerce local",
  "Formation / Coaching",
  "Prestataire de services",
  "Autre",
]

export default function ROICalculator() {
  const [sector, setSector] = useState("Restauration")
  const [avgBasket, setAvgBasket] = useState(80)
  const [clientsPerMonth, setClientsPerMonth] = useState(3)

  const revenuePerMonth = clientsPerMonth * avgBasket
  const monthsToROI = Math.ceil(690 / revenuePerMonth)

  return (
    <div className="bg-violet-50 border border-violet-100 rounded-2xl p-6 md:p-8 space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sector */}
        <div className="space-y-2">
          <label className="uppercase tracking-widest text-xs font-semibold text-gray-600">
            Secteur
          </label>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="w-full border border-violet-200 rounded-xl px-3 py-2.5 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            {SECTORS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Average basket */}
        <div className="space-y-2">
          <label className="uppercase tracking-widest text-xs font-semibold text-gray-600">
            Panier moyen (€)
          </label>
          <input
            type="number"
            min={1}
            value={avgBasket}
            onChange={(e) => setAvgBasket(Math.max(1, Number(e.target.value)))}
            className="w-full border border-violet-200 rounded-xl px-3 py-2.5 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
        </div>

        {/* Clients per month */}
        <div className="space-y-2">
          <label className="uppercase tracking-widest text-xs font-semibold text-gray-600">
            Nouveaux clients/mois via le site
          </label>
          <div className="space-y-1">
            <input
              type="range"
              min={1}
              max={15}
              value={clientsPerMonth}
              onChange={(e) => setClientsPerMonth(Number(e.target.value))}
              className="w-full accent-violet-600"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1</span>
              <span className="font-semibold text-violet-700">{clientsPerMonth} client{clientsPerMonth > 1 ? 's' : ''}</span>
              <span>15</span>
            </div>
          </div>
        </div>
      </div>

      {/* Result */}
      <AnimatePresence mode="wait">
        <motion.div
          key={revenuePerMonth}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-violet-200 rounded-xl p-5 space-y-3"
        >
          <div className="space-y-2">
            <p className="text-gray-800 font-semibold text-base">
              → <span className="text-violet-700">+{revenuePerMonth.toLocaleString('fr-FR')}€</span> de CA/mois grâce à votre site
            </p>
            <p className="text-gray-800 font-semibold text-base">
              → Site rentabilisé en <span className="text-violet-700">{monthsToROI} mois</span>
            </p>
          </div>

          {monthsToROI <= 3 && (
            <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
              Rentabilité ultra-rapide 🚀
            </span>
          )}
          {monthsToROI > 3 && monthsToROI <= 6 && (
            <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
              Investissement rapide ✓
            </span>
          )}
        </motion.div>
      </AnimatePresence>

      {/* CTA */}
      <div className="text-center">
        <Link
          to="/rdv"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold hover:shadow-xl hover:shadow-violet-300/50 hover:-translate-y-0.5 transition-all duration-300"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
        >
          Obtenir ce résultat → Réserver mon appel gratuit
        </Link>
      </div>
    </div>
  )
}
