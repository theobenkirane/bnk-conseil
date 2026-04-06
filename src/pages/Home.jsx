import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import AnimatedCounter from '../components/AnimatedCounter'
import SEOHead from '../components/SEOHead'

// ─── Données ──────────────────────────────────────────────────────────────────

const whyBNK = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Expertise terrain',
    description: 'Un consultant issu du terrain commercial, pas de la théorie. Votre réalité, on la connaît.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: 'ROI mesurable',
    description: 'Des objectifs clairs, des KPIs suivis, des résultats tangibles. Pas de consultant en mode touriste.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: 'Sur-mesure',
    description: "Chaque mission est adaptée à votre contexte. On ne sort pas de templates préformatés.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Rapidité',
    description: "Premiers résultats en 30 jours. On passe à l'action vite, sans attendre que les planètes s'alignent.",
  },
]

// Aperçu des 2 offres principales
const offerPreviews = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: 'Audit Commercial & Accompagnement',
    description: 'Diagnostic complet de votre organisation commerciale, co-construction de la stratégie et suivi des performances.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <polyline points="8 21 12 17 16 21" />
        <path d="M7 8h.01M11 8h6" />
        <path d="M7 12h.01M11 12h6" />
      </svg>
    ),
    title: 'Digitalisation & Visibilité',
    description: 'Création de site web, gestion des réseaux sociaux et mise en place des outils digitaux pour générer des leads.',
  },
]

// ─── Hook typewriter ───────────────────────────────────────────────────────────

function useTypewriter(text, speed = 60) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let i = 0
    setDisplayed('')
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return displayed
}

// ─── Composant ────────────────────────────────────────────────────────────────

export default function Home() {
  const tagline = useTypewriter('On booste votre moteur commercial.', 55)

  return (
    <PageTransition>
      <SEOHead
        title="Développement commercial TPE & Startups | BNK Conseil"
        description="BNK Conseil accompagne les TPE et startups à structurer leur croissance commerciale et leur présence digitale. Audit commercial, création de site web, réseaux sociaux. Résultats en 30 jours."
        canonical="https://bnk-conseil-1z3b.vercel.app"
        ogTitle="BNK Conseil — Développement commercial pour TPE et startups"
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #faf5ff 30%, #fce7f3 65%, #ede9fe 100%)' }}
      >
        {/* Orbes pastel animées */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-40"
            style={{ background: 'radial-gradient(circle, #c4b5fd, transparent)', filter: 'blur(80px)' }}
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-35"
            style={{ background: 'radial-gradient(circle, #fbcfe8, transparent)', filter: 'blur(80px)' }}
          />
          <motion.div
            animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, #bae6fd, transparent)', filter: 'blur(80px)' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-300 bg-white/70 text-violet-700 text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            Accompagnement commercial pour TPE et startups
          </motion.div>

          {/* H1 SEO — mot-clé principal, visible et accessible */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xl sm:text-2xl font-semibold text-violet-700 mb-3"
          >
            Développement commercial pour TPE et startups
          </motion.h1>

          {/* Tagline animée — sous-titre visuel */}
          <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6 text-gray-900 min-h-[1.2em]">
            {tagline}
            <span className="animate-pulse text-violet-500">|</span>
          </p>

          {/* Sous-titre descriptif */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            BNK Conseil accompagne les TPE et startups à structurer leur croissance commerciale et leur visibilité digitale. Concret, rapide, orienté résultats.
          </motion.p>

          {/* Boutons CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              to="/rdv"
              className="group px-8 py-4 rounded-xl font-bold text-white text-base transition-all duration-300 hover:shadow-xl hover:shadow-violet-300/50 hover:-translate-y-1 flex items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
            >
              Prendre un RDV
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              to="/offres"
              className="px-8 py-4 rounded-xl font-bold text-gray-700 text-base border border-gray-300 bg-white/70 hover:bg-white hover:border-violet-300 hover:text-violet-700 transition-all duration-300"
            >
              Découvrir nos offres
            </Link>
          </motion.div>

          {/* Chiffres clés */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {[
              { value: 40, suffix: '%', prefix: '+', label: 'de CA moyen', sublabel: 'de croissance moyenne sur 6 mois' },
              { value: 50, suffix: '+', prefix: '', label: 'missions réalisées', sublabel: 'TPE et startups' },
              { value: 3, suffix: ' ans', prefix: '', label: "d'expérience terrain", sublabel: 'opérationnel et terrain' },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 bg-white/80 border border-violet-100 text-center shadow-sm"
              >
                <div
                  className="text-3xl font-black mb-1"
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div className="text-gray-800 font-semibold text-sm">{stat.label}</div>
                <div className="text-gray-400 text-xs mt-0.5">{stat.sublabel}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Indicateur de scroll */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-violet-400"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </section>

      {/* ── Pourquoi BNK Conseil ──────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Pourquoi BNK Conseil ?</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4">
              Ce qui nous rend{' '}
              <span style={{
                background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>différents</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Pas un cabinet de conseil comme les autres. Un partenaire qui a fait le job, et qui vous aide à le faire mieux.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyBNK.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-white border border-gray-200 hover:border-violet-300 hover:shadow-md hover:shadow-violet-100/50 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-violet-600 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(168,85,247,0.06))' }}
                >
                  {item.icon}
                </div>
                <h3 className="text-gray-900 font-bold text-base mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Aperçu des offres ─────────────────────────────────── */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #fdf4ff 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Nos solutions</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4">
              Deux offres,{' '}
              <span style={{
                background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>un seul objectif</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Structurer votre croissance commerciale et renforcer votre présence digitale.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
            {offerPreviews.map((offer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group p-8 rounded-2xl bg-white border border-violet-100 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100/60 transition-all duration-300"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-violet-600 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(168,85,247,0.06))' }}
                >
                  {offer.icon}
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-3">{offer.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{offer.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-center"
          >
            <Link
              to="/offres"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-gray-700 text-base bg-white border border-gray-300 hover:bg-white hover:border-violet-300 hover:text-violet-700 transition-all duration-300 shadow-sm"
            >
              Voir le détail des offres
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CTA final ────────────────────────────────────────── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #fce7f3 50%, #dbeafe 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(168,85,247,0.25), transparent)' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Prêt à{' '}
              <span style={{
                background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>accélérer ?</span>
            </h2>
            <p className="text-gray-600 text-xl mb-10 max-w-2xl mx-auto">
              Un appel de 30 minutes pour comprendre vos enjeux. Pas de pitch commercial, juste une conversation honnête.
            </p>
            <Link
              to="/rdv"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-white text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-violet-400/40 hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
            >
              Prendre un RDV maintenant
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="text-gray-500 text-sm mt-4">Gratuit · Sans engagement · 30 min</p>
          </motion.div>
        </div>
      </section>

    </PageTransition>
  )
}
