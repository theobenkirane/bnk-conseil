import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

// ─── Formulaire de contact ────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    email: '',
    societe: '',
    message: '',
  })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulation d'envoi (pas de backend réel)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1200)
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-12 gap-4"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(168,85,247,0.1))' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-8 h-8 text-violet-500">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-gray-900 font-bold text-xl">Message envoyé !</h3>
        <p className="text-gray-500 text-sm max-w-xs">
          Merci ! Je reviendrai vers vous dans les 24 heures ouvrées.
        </p>
        <button
          onClick={() => { setSent(false); setForm({ prenom: '', nom: '', email: '', societe: '', message: '' }) }}
          className="text-violet-600 text-sm hover:text-violet-700 transition-colors mt-2 font-medium"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="prenom" className="block text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wider">
            Prénom *
          </label>
          <input
            id="prenom"
            name="prenom"
            type="text"
            required
            value={form.prenom}
            onChange={handleChange}
            placeholder="Jean"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200"
          />
        </div>
        <div>
          <label htmlFor="nom" className="block text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wider">
            Nom *
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            required
            value={form.nom}
            onChange={handleChange}
            placeholder="Dupont"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wider">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="jean.dupont@societe.fr"
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200"
        />
      </div>

      <div>
        <label htmlFor="societe" className="block text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wider">
          Société
        </label>
        <input
          id="societe"
          name="societe"
          type="text"
          value={form.societe}
          onChange={handleChange}
          placeholder="Ma Startup SAS"
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wider">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="Décrivez brièvement votre situation et ce que vous souhaitez améliorer..."
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:shadow-lg hover:shadow-violet-300/40 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeLinecap="round" />
            </svg>
            Envoi en cours...
          </>
        ) : (
          <>
            Envoyer le message
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </>
        )}
      </button>
    </form>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────

export default function RDV() {
  return (
    <PageTransition>

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
              }}>croissance.</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              30 minutes. Pas de pitch. Juste une conversation honnête sur vos enjeux et comment je peux vous aider.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-12 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* ── Colonne gauche : infos contact + formulaire ─── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Infos de contact */}
              <div className="space-y-4">
                <h2 className="text-gray-900 font-bold text-xl">Me contacter directement</h2>
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <div className="w-9 h-9 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-violet-500">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <a href="mailto:conseil.bnk@gmail.com" className="hover:text-violet-600 transition-colors">
                    conseil.bnk@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <div className="w-9 h-9 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-violet-500">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <a
                    href="https://www.linkedin.com/in/theobenkirane/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-violet-600 transition-colors"
                  >
                    linkedin.com/in/theobenkirane
                  </a>
                </div>
              </div>

              {/* Séparateur */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-start">
                  <span className="bg-white pr-4 text-gray-400 text-xs uppercase tracking-widest">
                    ou envoyez un message
                  </span>
                </div>
              </div>

              {/* Formulaire de contact */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <h3 className="text-gray-900 font-bold text-lg mb-6">Formulaire de contact</h3>
                <ContactForm />
              </div>
            </motion.div>

            {/* ── Colonne droite : Calendly ─── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-gray-900 font-bold text-xl mb-1">Réserver un créneau</h2>
                <p className="text-gray-500 text-sm">Sélectionnez un créneau qui vous convient. L'appel dure 30 minutes.</p>
              </div>

              <div className="rounded-2xl border border-violet-100 bg-white overflow-hidden shadow-sm">
                {/* En-tête Calendly */}
                <div
                  className="h-1"
                  style={{ background: 'linear-gradient(90deg, #7C3AED, #A855F7)' }}
                />
                <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(168,85,247,0.08))' }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-violet-500">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 text-sm font-semibold">BNK Conseil</p>
                    <p className="text-gray-400 text-xs">Appel découverte — 30 min</p>
                  </div>
                </div>

                {/* Iframe Calendly */}
                <iframe
                  src="https://calendly.com/conseil-bnk/30min"
                  width="100%"
                  height="650"
                  frameBorder="0"
                  title="Réserver un appel avec BNK Conseil"
                  style={{ display: 'block', background: '#FAFBFF' }}
                />
              </div>

              {/* Badges de confiance */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {['Gratuit & sans engagement', '30 minutes', 'Réponse sous 24h'].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 text-violet-500">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </PageTransition>
  )
}
