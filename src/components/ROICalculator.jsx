import { useState, useEffect } from 'react'
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

const SECTOR_DEFAULTS = {
  "Restauration": 80,
  "Artisanat": 350,
  "Commerce local": 60,
  "Formation / Coaching": 500,
  "Prestataire de services": 400,
  "Autre": 150,
}

const FORMULAS = [
  { label: "Essentiel", price: 690 },
  { label: "Pro", price: 990 },
]

const BADGE_CONFIG = [
  { max: 3, bg: 'bg-green-100', text: 'text-green-700', label: 'Rentabilité ultra-rapide 🚀' },
  { max: 6, bg: 'bg-blue-100', text: 'text-blue-700', label: 'Investissement rapide ✓' },
  { max: 12, bg: 'bg-orange-100', text: 'text-orange-700', label: 'Investissement raisonnable' },
]

export default function ROICalculator() {
  const [sector, setSector] = useState("Restauration")
  const [avgBasket, setAvgBasket] = useState(SECTOR_DEFAULTS["Restauration"])
  const [clientsPerMonth, setClientsPerMonth] = useState(3)
  const [formulaIdx, setFormulaIdx] = useState(0)

  // Préremplir le panier moyen au changement de secteur
  useEffect(() => {
    setAvgBasket(SECTOR_DEFAULTS[sector])
  }, [sector])

  const formula = FORMULAS[formulaIdx]
  const revenuePerMonth = clientsPerMonth * avgBasket
  const monthsToROI = revenuePerMonth > 0 ? Math.ceil(formula.price / revenuePerMonth) : 99
  const revenueYear1 = revenuePerMonth * 12
  const profitYear1 = revenueYear1 - formula.price

  const badge = BADGE_CONFIG.find((b) => monthsToROI <= b.max) || null
  const progressMax = 12
  const filledSegments = Math.min(monthsToROI, progressMax)

  return (
    <div className="bg-violet-50 border border-violet-100 rounded-2xl p-6 md:p-8 space-y-6">

      {/* Sélecteur de formule */}
      <div className="flex items-center justify-center gap-2">
        {FORMULAS.map((f, i) => (
          <button
            key={f.label}
            onClick={() => setFormulaIdx(i)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              formulaIdx === i
                ? 'text-white shadow-md shadow-violet-300/40'
                : 'bg-white border border-violet-200 text-gray-600 hover:border-violet-400'
            }`}
            style={formulaIdx === i ? { background: 'linear-gradient(135deg, #7C3AED, #A855F7)' } : {}}
          >
            {f.label} — {f.price}€
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
            Nouveaux clients/mois
          </label>
          <div className="space-y-1.5">
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
          key={`${revenuePerMonth}-${formula.price}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-violet-200 rounded-xl p-5 space-y-4"
        >
          {/* Chiffres clés */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">CA/mois</p>
              <p className="text-2xl font-black text-violet-700">+{revenuePerMonth.toLocaleString('fr-FR')}€</p>
            </div>
            <div className="text-center border-x border-gray-100">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Rentabilisé en</p>
              <p className="text-2xl font-black text-gray-900">
                {monthsToROI <= progressMax ? `${monthsToROI} mois` : '+12 mois'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Profit net an 1</p>
              <p className={`text-2xl font-black ${profitYear1 >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {profitYear1 >= 0 ? '+' : ''}{profitYear1.toLocaleString('fr-FR')}€
              </p>
            </div>
          </div>

          {/* Barre de progression ROI */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Aujourd'hui</span>
              <span>12 mois</span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: progressMax }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 flex-1 rounded-full transition-colors duration-300 ${
                    i < filledSegments
                      ? monthsToROI <= 3
                        ? 'bg-green-400'
                        : monthsToROI <= 6
                        ? 'bg-blue-400'
                        : 'bg-orange-400'
                      : 'bg-gray-100'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 text-center">
              {monthsToROI <= progressMax
                ? `Formule ${formula.label} (${formula.price}€) rentabilisée au mois ${monthsToROI}`
                : `Augmentez votre panier ou votre nombre de clients pour accélérer le ROI`}
            </p>
          </div>

          {/* Badge */}
          {badge && (
            <div className="flex justify-center">
              <span className={`inline-flex items-center gap-1.5 ${badge.bg} ${badge.text} text-xs font-semibold px-3 py-1 rounded-full`}>
                {badge.label}
              </span>
            </div>
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
