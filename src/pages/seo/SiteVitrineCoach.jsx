import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../../components/PageTransition'
import SEOHead from '../../components/SEOHead'
import WebsitePreview from '../../components/WebsitePreview'

const SECTOR_KEY = 'Formation & Coaching'
const PREVIEW_HEIGHT = 960

const gradientText = {
  background: 'linear-gradient(135deg, #066377, #3B9BB3)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const benefits = [
  {
    emoji: '📚',
    title: 'Vos offres, claires net et précises',
    description: "Une page par programme : ce que ça change, pour qui, combien, et un bouton pour réserver. Le prospect comprend en 10 secondes au lieu de fermer l'onglet.",
  },
  {
    emoji: '⭐',
    title: 'La preuve par vos clients',
    description: "Vos avis et vos réussites bien en évidence. Rien ne convainc un futur client comme un ancien qui dit \"ça a marché\".",
  },
  {
    emoji: '📅',
    title: 'Votre agenda se remplit tout seul',
    description: "Calendly, Cal.com ou un formulaire : le prospect bloque son créneau pendant que vous êtes en séance. Fini les allers-retours par mail.",
  },
  {
    emoji: '🎓',
    title: 'CPF et Qualiopi mis en avant',
    description: "Vos formations sont éligibles ? On l'affiche clairement. C'est souvent ce détail qui fait passer du \"je réfléchis\" au \"je m'inscris\".",
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
    question: "Comment je présente mes différentes offres ?",
    answer: "Une page par offre, ou une page catalogue bien rangée si vous en avez beaucoup. L'idée : que le prospect trouve la sienne sans se perdre.",
  },
  {
    question: "On peut brancher un agenda de réservation ?",
    answer: "Oui. Calendly, Cal.com ou l'outil que vous utilisez déjà. Le client réserve, vous validez, c'est plié.",
  },
  {
    question: "Comment je récupère des témoignages ?",
    answer: "On crée la section qu'il faut et on vous donne le bon moment et la bonne phrase pour les demander à vos clients. Vous verrez, ils disent rarement non.",
  },
  {
    question: "Je peux afficher mon éligibilité CPF ?",
    answer: "Bien sûr, et bien en évidence. C'est un argument qui rassure et qui débloque pas mal d'inscriptions.",
  },
  {
    question: "Je débute et je n'ai pas encore de clients, je fais quoi ?",
    answer: "On vend votre méthode, vos résultats attendus et votre parcours. On n'a pas besoin de cent témoignages pour donner envie — il faut une page qui inspire confiance.",
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export default function SiteVitrineCoach() {
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
        title="Création site vitrine coach et formateur | BNK Conseil"
        description="Site vitrine pour coach ou formateur : présentation programme, témoignages, prise de RDV. À partir de 690€, livré en 2-4 semaines. Devis gratuit."
        canonical="https://bnk-conseil.com/creation-site-vitrine-coach"
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="pt-32 pb-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.12) 60%, rgba(255,255,255,0) 100%)' }}
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
              className="inline-flex items-center gap-2 text-[#066377] text-sm font-medium mb-6 hover:text-[#154359] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Création site vitrine
            </Link>

            <span className="inline-flex items-center gap-2 bg-white/70 border border-[#F0F0F0] text-[#154359] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              🎯 Coaching & Formation
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Site vitrine pour{' '}
              <span style={gradientText}>coach</span>
              {' '}et formateur  -  attirez vos clients idéaux
            </h1>

            <p className="text-gray-600 text-xl max-w-2xl mb-8 leading-relaxed">
              Vous transformez la vie des gens, mais votre site, lui, ne transforme personne. On présente vos programmes clairement, on met vos résultats en avant, et on remplit votre agenda pendant que vous coachez.
            </p>

            <div className="flex flex-col gap-4">
              <Link
                to="/apercu-site"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base transition-all duration-300 hover:shadow-xl hover:shadow-[#3B9BB3]/50 hover:-translate-y-0.5 self-start"
                style={{ background: 'linear-gradient(135deg, #066377, #3B9BB3)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <rect x="2" y="3" width="20" height="14" rx="2" /><polyline points="8 21 12 17 16 21" />
                </svg>
                Visualiser mon site coach
              </Link>
              <Link
                to="/rdv"
                className="inline-flex items-center gap-1.5 text-gray-500 text-sm font-medium hover:text-[#066377] transition-colors underline underline-offset-4 self-start"
              >
                Demander un devis gratuit →
              </Link>
              <p className="text-gray-400 text-xs">À partir de 690€ · Paiement en 2× · Livraison garantie</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Aperçu live ──────────────────────────────────────────────── */}
      <section className="py-20 bg-white/45 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Voilà ce que verrait votre prochain client
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
            <p className="text-gray-400 text-sm mb-2">Aperçu non-contractuel  -  personnalisable à 100%</p>
            <Link
              to="/apercu-site"
              className="text-[#066377] text-sm font-semibold hover:text-[#154359] transition-colors underline underline-offset-4"
            >
              Personnaliser l'aperçu →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Bénéfices ────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50/35 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Tout ce qu'il faut pour votre{' '}
              <span style={gradientText}>activité de coaching</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Pensé pour les coachs et formateurs : convaincre le prospect, lever ses doutes, et caler le rendez-vous.
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
      <section className="py-16 bg-white/45 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeUp}
            className="text-center p-10 rounded-2xl border border-[#F0F0F0]"
            style={{ background: 'linear-gradient(135deg, #F0F5F7 0%, #fdf4ff 100%)' }}
          >
            <p className="text-2xl font-black text-gray-900 mb-3">
              À partir de 690€ · Paiement en 2 fois · Livraison garantie 4 semaines
            </p>
            <Link
              to="/tarifs"
              className="text-[#066377] text-sm font-semibold hover:text-[#154359] transition-colors underline underline-offset-4"
            >
              Voir les tarifs détaillés →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Garanties ────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50/35 backdrop-blur-sm">
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
      <section className="py-20 bg-white/45 backdrop-blur-sm">
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
                    className={`w-4 h-4 text-[#066377] flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
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
        style={{ background: 'linear-gradient(135deg, #F0F5F7 0%, #fce7f3 50%, #dbeafe 100%)' }}
      >
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
              Lancez le site de votre{' '}
              <span style={gradientText}>activité de coaching</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
              20 minutes entre deux séances pour parler de votre projet. Devis gratuit, sans engagement, réponse sous 24h.
            </p>
            <Link
              to="/rdv"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-white text-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#3B9BB3]/50 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #066377, #3B9BB3)' }}
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
