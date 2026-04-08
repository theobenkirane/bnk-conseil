import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../../components/PageTransition'
import SEOHead from '../../components/SEOHead'
import WebsitePreview from '../../components/WebsitePreview'

const SECTOR_KEY = 'Artisanat & Renovation'
const PREVIEW_HEIGHT = 960

const gradientText = {
  background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const benefits = [
  {
    emoji: '🏗️',
    title: 'Galerie de réalisations',
    description: "Mettez en avant vos chantiers avec photos avant/après. Votre meilleur argument commercial.",
  },
  {
    emoji: '📋',
    title: 'Formulaire de devis',
    description: "Un formulaire intelligent pour qualifier vos prospects avant le premier contact.",
  },
  {
    emoji: '🏆',
    title: 'Vos certifications',
    description: "RGE, Qualibat, assurance décennale : affichez vos certifications pour rassurer immédiatement.",
  },
  {
    emoji: '📍',
    title: "Zone d'intervention",
    description: "Carte de votre zone géographique + communes couvertes pour cibler le bon trafic local.",
  },
]

const guarantees = [
  {
    text: 'Livraison en 2 à 4 semaines ou remboursement',
  },
  {
    text: '1 mois de retouches offertes après livraison',
  },
  {
    text: 'Hébergement 1 an inclus (domaine + hébergement)',
  },
]

const faqData = [
  {
    question: "Comment montrer mes réalisations ?",
    answer: "Via une galerie photo optimisée. On s'occupe de l'intégration de vos photos existantes.",
  },
  {
    question: "Mon site sera-t-il sur Google pour mon métier + ma ville ?",
    answer: "Oui, c'est le coeur de notre stratégie SEO locale pour les artisans.",
  },
  {
    question: "Puis-je ajouter mes certifications RGE/Qualibat ?",
    answer: "Bien sûr, elles seront mises en avant dès la page d'accueil pour rassurer.",
  },
  {
    question: "Le formulaire de devis peut-il qualifier les prospects ?",
    answer: "Oui, on configure des champs sur-mesure (type de travaux, surface, délai) pour pré-qualifier.",
  },
  {
    question: "Et si j'ai peu de photos de réalisations ?",
    answer: "On travaille avec ce que vous avez. Même 5-6 bonnes photos suffisent pour un excellent résultat.",
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export default function SiteVitrineArtisan() {
  const [openFaq, setOpenFaq] = useState(null)
  const previewRef = useRef(null)
  const [scale, setScale] = useState(null)

  useEffect(() => {
    const el = previewRef.current
    if (!el) return
    const obs = new ResizeObserver(([e]) => {
      const w = e.contentRect.width
      if (w > 0) setScale(w / 1280)
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <PageTransition>
      <SEOHead
        title="Création site vitrine artisan | BNK Conseil"
        description="Site vitrine pour artisan : galerie de réalisations, devis en ligne, certifications. Livré en 2-4 semaines à partir de 690€. Devis gratuit sous 24h."
        canonical="https://bnk-conseil-1z3b.vercel.app/creation-site-vitrine-artisan"
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="pt-32 pb-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #faf5ff 40%, #fce7f3 100%)' }}
      >
        <div
          className="absolute top-0 right-1/4 w-96 h-72 opacity-40 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(196,181,253,0.6), transparent)', filter: 'blur(60px)' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/creation-site-vitrine"
              className="inline-flex items-center gap-2 text-violet-600 text-sm font-medium mb-6 hover:text-violet-700 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Création site vitrine
            </Link>

            <span className="inline-flex items-center gap-2 bg-white/70 border border-violet-100 text-violet-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              🔨 Artisanat
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Site vitrine pour{' '}
              <span style={gradientText}>artisan</span>
              {' '}— valorisez votre savoir-faire
            </h1>

            <p className="text-gray-600 text-xl max-w-2xl mb-8 leading-relaxed">
              Montrez vos réalisations, générez des demandes de devis, rassurez vos futurs clients.
            </p>

            <div className="flex flex-col gap-4">
              <Link
                to="/apercu-site"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base transition-all duration-300 hover:shadow-xl hover:shadow-violet-300/50 hover:-translate-y-0.5 self-start"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <rect x="2" y="3" width="20" height="14" rx="2" /><polyline points="8 21 12 17 16 21" />
                </svg>
                Visualiser mon site artisan
              </Link>
              <Link
                to="/rdv"
                className="inline-flex items-center gap-1.5 text-gray-500 text-sm font-medium hover:text-violet-600 transition-colors underline underline-offset-4 self-start"
              >
                Demander un devis gratuit →
              </Link>
              <p className="text-gray-400 text-xs">À partir de 690€ · Paiement en 2× · Livraison garantie</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Aperçu live ──────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Voici à quoi pourrait ressembler votre site
            </h2>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
            <div
              ref={previewRef}
              className="relative overflow-hidden rounded-xl border border-gray-200 shadow-lg bg-gray-50"
              style={{ height: scale ? `${scale * PREVIEW_HEIGHT}px` : '320px' }}
            >
              <div
                style={{
                  width: '1280px',
                  transformOrigin: 'top left',
                  transform: `scale(${scale ?? 0.25})`,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                <WebsitePreview name="Votre établissement" sector={SECTOR_KEY} city="votre ville" theme="colore" />
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="text-center mt-6">
            <p className="text-gray-400 text-sm mb-2">Aperçu non-contractuel — personnalisable à 100%</p>
            <Link
              to="/apercu-site"
              className="text-violet-600 text-sm font-semibold hover:text-violet-700 transition-colors underline underline-offset-4"
            >
              Personnaliser l'aperçu →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Bénéfices ────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Tout ce qu'il faut pour votre{' '}
              <span style={gradientText}>activité artisanale</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Des fonctionnalités pensées pour les artisans, pour convaincre et convertir.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="text-gray-900 font-bold text-base mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tarif ────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeUp}
            className="text-center p-10 rounded-2xl border border-violet-100"
            style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #fdf4ff 100%)' }}
          >
            <p className="text-2xl font-black text-gray-900 mb-3">
              À partir de 690€ · Paiement en 2 fois · Livraison garantie 4 semaines
            </p>
            <Link
              to="/tarifs"
              className="text-violet-600 text-sm font-semibold hover:text-violet-700 transition-colors underline underline-offset-4"
            >
              Voir les tarifs détaillés →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Garanties ────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Nos <span style={gradientText}>garanties</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {guarantees.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-3 p-6 border border-gray-100 rounded-2xl shadow-sm bg-white"
              >
                <span className="text-green-500 text-xl flex-shrink-0">✅</span>
                <p className="text-gray-700 text-sm font-medium leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
              Questions fréquentes
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqData.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-900 font-semibold text-sm">{item.question}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`w-4 h-4 text-violet-500 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 bg-white">
                    <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ────────────────────────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #fce7f3 50%, #dbeafe 100%)' }}
      >
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
              Lancez le site de votre{' '}
              <span style={gradientText}>activité artisanale</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
              20 minutes pour discuter de votre projet. Devis gratuit, sans engagement, réponse sous 24h.
            </p>
            <Link
              to="/rdv"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-white text-lg transition-all duration-300 hover:shadow-xl hover:shadow-violet-300/50 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
            >
              Demander un devis gratuit
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="text-gray-500 text-sm mt-4">Gratuit · Sans engagement · Réponse sous 24h</p>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
