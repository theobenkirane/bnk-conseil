import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import SEOHead from '../components/SEOHead'

const CALENDLY_URL = 'https://calendly.com/conseil-bnk/30min'

const SECTEURS = [
  'Restauration',
  'Artisanat',
  'Commerce local',
  'Formation / Coaching',
  'Prestataire de services',
  'Autre',
]

// Widget Calendly chargé dynamiquement (sans dépendance npm)
function CalendlyInline({ url }) {
  useEffect(() => {
    if (!document.getElementById('calendly-script')) {
      const script = document.createElement('script')
      script.id = 'calendly-script'
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  return (
    <div
      className="calendly-inline-widget w-full rounded-2xl overflow-hidden border border-violet-100"
      data-url={url}
      style={{ minWidth: '320px', height: '700px' }}
    />
  )
}

// Formulaire pré-qualification
function PreQualForm() {
  const [form, setForm] = useState({ secteur: '', objectif: '', blocage: '' })
  const [showCalendly, setShowCalendly] = useState(false)
  const calendlyRef = useRef(null)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const isReady = form.secteur !== '' && form.objectif.trim() !== '' && form.blocage.trim() !== ''

  const handleConfirm = () => {
    setShowCalendly(true)
    // Scroll vers le widget après un léger délai pour laisser le DOM se mettre à jour
    setTimeout(() => {
      calendlyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <div className="space-y-5">
      {/* Secteur */}
      <div>
        <label htmlFor="secteur" className="block text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wider">
          Votre secteur d'activité *
        </label>
        <div className="relative">
          <select
            id="secteur"
            name="secteur"
            required
            value={form.secteur}
            onChange={handleChange}
            disabled={showCalendly}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm appearance-none focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200 cursor-pointer disabled:opacity-60"
          >
            <option value="">Sélectionnez votre secteur...</option>
            {SECTEURS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-400">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      {/* Objectif */}
      <div>
        <label htmlFor="objectif" className="block text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wider">
          Votre objectif principal *
        </label>
        <input
          id="objectif"
          name="objectif"
          type="text"
          required
          value={form.objectif}
          onChange={handleChange}
          disabled={showCalendly}
          placeholder="Ex : générer plus de leads qualifiés"
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200 disabled:opacity-60"
        />
      </div>

      {/* Blocage */}
      <div>
        <label htmlFor="blocage" className="block text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wider">
          Votre principal blocage aujourd'hui *
        </label>
        <input
          id="blocage"
          name="blocage"
          type="text"
          required
          value={form.blocage}
          onChange={handleChange}
          disabled={showCalendly}
          placeholder="Ex : peu de visibilité en ligne, pas de process de vente"
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200 disabled:opacity-60"
        />
      </div>

      {/* Encadré de réassurance */}
      <div className="rounded-xl border border-violet-200 bg-violet-50 px-5 py-4">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {['Appel sans engagement', '20 minutes', 'Réponse sous 24h'].map((item) => (
            <div key={item} className="flex items-center gap-1.5 text-violet-700 text-sm font-medium">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 flex-shrink-0">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* CTA principal - masqué une fois Calendly affiché */}
      <AnimatePresence>
        {!showCalendly && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={handleConfirm}
              disabled={!isReady}
              className="group w-full py-4 rounded-xl font-bold text-white text-base transition-all duration-300 hover:shadow-xl hover:shadow-violet-300/50 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
              title={!isReady ? "Remplissez les 3 champs pour accéder à la réservation" : ''}
            >
              Réserver mon diagnostic gratuit
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {!isReady && (
              <p className="text-center text-gray-400 text-xs mt-2">
                Remplissez les 3 champs ci-dessus pour accéder au calendrier de réservation.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email secondaire */}
      <p className="text-center text-gray-500 text-sm">
        ou écrivez directement à{' '}
        <a
          href="mailto:conseil.bnk@gmail.com"
          className="text-violet-600 hover:text-violet-700 transition-colors font-medium"
        >
          conseil.bnk@gmail.com
        </a>
      </p>

      {/* Widget Calendly inline */}
      <AnimatePresence>
        {showCalendly && (
          <motion.div
            ref={calendlyRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="pt-2"
          >
            <div className="mb-4 text-center">
              <p className="text-gray-700 font-semibold text-sm">Choisissez votre créneau ci-dessous</p>
              <p className="text-gray-400 text-xs mt-1">Appel de 20 min, sans engagement.</p>
            </div>
            <CalendlyInline url={CALENDLY_URL} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Composant principal
export default function RDV() {
  return (
    <PageTransition>
      <SEOHead
        title="Réserver un diagnostic gratuit | BNK Conseil"
        description="Réservez votre appel découverte gratuit de 20 minutes avec BNK Conseil. Audit commercial, création site vitrine TPE. Sans engagement, réponse sous 24h."
        canonical="https://bnk-conseil.com/rdv"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://bnk-conseil.com/rdv#webpage",
          "url": "https://bnk-conseil.com/rdv",
          "name": "Réserver un diagnostic - BNK Conseil",
          "description": "Réservez un appel découverte gratuit de 20 minutes avec Théo Benkirane pour discuter de votre croissance commerciale et digitale. Sans engagement.",
          "inLanguage": "fr-FR",
          "isPartOf": { "@id": "https://bnk-conseil.com/#website" },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://bnk-conseil.com/" },
              { "@type": "ListItem", "position": 2, "name": "Réserver un diagnostic", "item": "https://bnk-conseil.com/rdv" }
            ]
          }
        }}
      />

      {/* En-tête de page */}
      <section
        className="pt-32 pb-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #faf5ff 40%, #fce7f3 100%)' }}
      >
        <div
          className="absolute top-0 left-1/3 w-96 h-72 opacity-40 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(196,181,253,0.6), transparent)', filter: 'blur(60px)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Passons à l'action</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mt-4 mb-4 leading-tight">
              Parlons de votre{' '}
              <span style={{
                background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>croissance</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Quelques secondes pour mieux vous connaître, puis réservez votre créneau directement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Formulaire pré-qualification */}
      <section className="py-16 pb-24 bg-white">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {/* Disponibilité */}
            <div className="mb-6 p-4 rounded-xl border border-violet-200 bg-violet-50 flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-600"></span>
              </span>
              <p className="text-violet-700 text-sm font-medium">
                🟢 2 créneaux disponibles en avril — Réservez rapidement
              </p>
            </div>

            {/* Titre section */}
            <div className="text-center mb-8">
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
                style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(168,85,247,0.08))' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7 text-violet-600">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Avant de réserver, dites-nous en un peu plus
              </h2>
              <p className="text-gray-500 text-sm">
                3 questions rapides pour que notre échange soit le plus utile possible.
              </p>
            </div>

            {/* Formulaire */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <PreQualForm />
            </div>
          </motion.div>
        </div>
      </section>

    </PageTransition>
  )
}
