import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import SEOHead from '../components/SEOHead'

const gradientText = {
  background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
})

const fadeUpView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

const FORMULAS = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    originalPrice: 690,
    discountedPrice: 483,
    features: ['3-4 pages sur-mesure', 'SEO de base inclus', 'Livraison en 2 semaines'],
    popular: false,
    dark: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    originalPrice: 990,
    discountedPrice: 693,
    features: ['5-7 pages + blog', 'SEO avancé', 'Livraison en 3 semaines'],
    popular: true,
    dark: false,
  },
  {
    id: 'sur-mesure',
    name: 'Sur-mesure',
    originalPrice: null,
    discountedPrice: null,
    features: ['Pages illimitées', 'SEO premium', 'Délai selon cahier des charges'],
    popular: false,
    dark: true,
  },
]

function CheckIcon({ dark }) {
  return (
    <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${dark ? 'bg-white/20' : 'bg-violet-100'}`}>
      <svg viewBox="0 0 12 12" fill="none" className={`w-2.5 h-2.5 ${dark ? 'text-white' : 'text-violet-600'}`}>
        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

export default function Commander() {
  const [selectedFormula, setSelectedFormula] = useState('essentiel')
  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const isReady = form.prenom.trim() !== '' && form.nom.trim() !== '' && form.email.trim() !== ''

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isReady) return
    setSubmitted(true)
  }

  const selectedData = FORMULAS.find((f) => f.id === selectedFormula)

  return (
    <PageTransition>
      <SEOHead
        title="Commander votre site vitrine -30% | BNK Conseil"
        description="Commandez directement votre site vitrine avec -30% de réduction. Essentiel à 483€, Pro à 693€. RDV express inclus, livraison garantie. Paiement sécurisé."
        canonical="https://bnk-conseil.com/commander"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://bnk-conseil.com/commander#webpage",
          "url": "https://bnk-conseil.com/commander",
          "name": "Commander - BNK Conseil",
          "description": "Commandez votre site vitrine directement avec -30% garanti et RDV express inclus.",
          "inLanguage": "fr-FR",
          "isPartOf": { "@id": "https://bnk-conseil.com/#website" },
        }}
      />

      {/* Hero */}
      <section
        className="pt-32 pb-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #faf5ff 40%, #fce7f3 100%)' }}
      >
        <div
          className="absolute top-0 left-1/3 w-96 h-72 opacity-40 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(196,181,253,0.6), transparent)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-72 h-72 opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(251,207,232,0.7), transparent)', filter: 'blur(60px)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp(0)}>
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Offre directe</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mt-4 mb-4 leading-tight">
              Commandez directement{' '}
              <span style={gradientText}>-30% garanti</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
              Choisissez votre formule, remplissez le formulaire. On vous contacte sous 24h pour démarrer.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {['RDV express offert', 'Paiement sécurisé', 'Livraison garantie'].map((pill) => (
                <span
                  key={pill}
                  className="bg-white/80 border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2 rounded-full shadow-sm"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sélection de formule */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUpView(0)} className="text-center mb-10">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Étape 1</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">Choisissez votre formule</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FORMULAS.map((f, i) => {
              const isSelected = selectedFormula === f.id
              const isPro = f.popular
              const isDark = f.dark
              const isSurMesure = f.id === 'sur-mesure'

              if (isSurMesure) {
                return (
                  <motion.div key={f.id} {...fadeUpView(0.1 + i * 0.1)}>
                    <Link
                      to="/rdv"
                      className="flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl p-6"
                      style={{ background: '#0F172A' }}
                    >
                      <div className="mb-4">
                        <p className="text-gray-400 text-sm font-semibold mb-2">{f.name}</p>
                        <p className="text-white text-3xl font-black">Sur devis</p>
                        <p className="text-gray-500 text-xs mt-1">selon cahier des charges</p>
                      </div>
                      <div className="flex-1 space-y-3 mb-6">
                        {f.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-2.5 text-sm">
                            <CheckIcon dark />
                            <span className="text-white/80">{feat}</span>
                          </div>
                        ))}
                      </div>
                      <div className="block w-full text-center py-3 rounded-xl text-sm font-semibold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-200">
                        Nous contacter →
                      </div>
                    </Link>
                  </motion.div>
                )
              }

              return (
                <motion.div key={f.id} {...fadeUpView(0.1 + i * 0.1)}>
                  <button
                    onClick={() => setSelectedFormula(f.id)}
                    className={`relative flex flex-col w-full h-full text-left rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] p-6 ${
                      isPro
                        ? 'shadow-xl shadow-violet-400/30'
                        : 'border-2 shadow-sm'
                    } ${
                      isSelected && !isPro ? 'border-violet-500 shadow-violet-200/60 shadow-lg' : !isPro ? 'border-gray-100' : ''
                    }`}
                    style={
                      isPro
                        ? { background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }
                        : { background: '#ffffff' }
                    }
                  >
                    {isPro && (
                      <div className="absolute -top-0 left-1/2 -translate-x-1/2">
                        <span className="bg-white text-violet-700 text-xs font-bold px-3 py-1 rounded-b-xl shadow-md shadow-violet-200/50 flex items-center gap-1">
                          ⭐ Plus populaire
                        </span>
                      </div>
                    )}
                    {isSelected && !isPro && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-violet-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          Sélectionné
                        </span>
                      </div>
                    )}

                    <div className={`mb-4 ${isPro ? 'mt-4' : ''}`}>
                      <p className={`text-sm font-semibold mb-2 ${isPro ? 'text-white/70' : 'text-gray-500'}`}>{f.name}</p>
                      <div className="flex items-baseline gap-2">
                        <p className={`text-3xl font-black ${isPro ? 'text-white' : 'text-gray-900'}`}>
                          {f.discountedPrice}€
                        </p>
                        <p className={`text-sm line-through ${isPro ? 'text-white/50' : 'text-gray-400'}`}>
                          {f.originalPrice}€
                        </p>
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${isPro ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'}`}>
                          -30%
                        </span>
                      </div>
                      <p className={`text-xs mt-1 ${isPro ? 'text-white/50' : 'text-gray-400'}`}>
                        paiement en 2× disponible
                      </p>
                    </div>

                    <div className="flex-1 space-y-3 mb-4">
                      {f.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2.5 text-sm">
                          <CheckIcon dark={isPro} />
                          <span className={isPro ? 'text-white/90' : 'text-gray-700'}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                </motion.div>
              )
            })}
          </div>

          <motion.p {...fadeUpView(0.4)} className="text-center text-sm text-gray-500 mt-6">
            Pas sûr de votre choix ?{' '}
            <Link to="/rdv" className="text-violet-600 hover:text-violet-700 font-medium transition-colors">
              Prenez un appel gratuit de 20 min →
            </Link>
          </motion.p>
        </div>
      </section>

      {/* Formulaire de commande */}
      <section className="py-16 bg-white">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUpView(0)} className="text-center mb-8">
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Étape 2</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">Vos coordonnées</h2>
          </motion.div>

          <motion.div {...fadeUpView(0.1)}>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center space-y-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mx-auto">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-green-600">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900">Commande reçue !</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Merci <strong>{form.prenom}</strong>. Votre commande pour la formule{' '}
                  <strong>{selectedData?.name}</strong> est enregistrée.
                  Nous vous contactons sous 24h pour convenir du RDV express de démarrage.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-violet-300/50"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                >
                  Retour à l'accueil
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-5"
              >
                {/* Formule choisie (lecture seule) */}
                <div className="rounded-xl border border-violet-200 bg-violet-50 px-5 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-violet-700 text-xs font-semibold uppercase tracking-widest mb-0.5">Formule choisie</p>
                    <p className="text-gray-900 font-bold text-sm">
                      {selectedData?.name}
                      {selectedData?.discountedPrice && (
                        <span className="ml-2 text-violet-600">{selectedData.discountedPrice}€</span>
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-violet-600 text-xs font-medium hover:text-violet-700 transition-colors"
                  >
                    Modifier
                  </button>
                </div>

                {/* Prénom + Nom */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      name="prenom"
                      required
                      value={form.prenom}
                      onChange={handleChange}
                      placeholder="Jean"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="nom"
                      required
                      value={form.nom}
                      onChange={handleChange}
                      placeholder="Dupont"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jean@monentreprise.fr"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200"
                  />
                </div>

                {/* Téléphone (optionnel) */}
                <div>
                  <label className="block text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    Téléphone{' '}
                    <span className="text-gray-400 font-normal normal-case tracking-normal">(optionnel)</span>
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={form.telephone}
                    onChange={handleChange}
                    placeholder="06 12 34 56 78"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200"
                  />
                </div>

                {/* Message (optionnel) */}
                <div>
                  <label className="block text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    Message{' '}
                    <span className="text-gray-400 font-normal normal-case tracking-normal">(optionnel)</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Précisez votre secteur, vos besoins ou posez vos questions..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200 resize-none"
                  />
                </div>

                {/* Info */}
                <div className="rounded-xl border border-blue-100 bg-blue-50 px-5 py-3 text-sm text-blue-700">
                  Votre commande est validée sous 24h. Nous vous contacterons pour convenir d'un RDV express de démarrage.
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!isReady}
                  className="group w-full py-4 rounded-xl font-bold text-white text-base transition-all duration-300 hover:shadow-xl hover:shadow-violet-300/50 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                >
                  Confirmer ma commande
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>

                {!isReady && (
                  <p className="text-center text-gray-400 text-xs">
                    Remplissez prénom, nom et email pour confirmer.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Réassurance */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🛡️', title: 'Satisfaction garantie', desc: 'Modifications illimitées incluses jusqu\'à ce que vous soyez 100% satisfait.' },
              { icon: '⚡', title: 'RDV express sous 48h', desc: 'Dès votre commande reçue, on vous contacte pour démarrer rapidement.' },
              { icon: '💳', title: 'Paiement en 2× possible', desc: '50% à la commande, 50% à la livraison. Sans frais supplémentaires.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUpView(0.1 + i * 0.1)}
                className="bg-white border border-gray-100 rounded-2xl p-6 text-center space-y-3 shadow-sm"
              >
                <span className="text-3xl block">{item.icon}</span>
                <h3 className="font-black text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </PageTransition>
  )
}
