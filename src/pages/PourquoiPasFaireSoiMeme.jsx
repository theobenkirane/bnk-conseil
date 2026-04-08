import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import SEOHead from '../components/SEOHead'

const gradientText = {
  background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// ─── Données ──────────────────────────────────────────────────────────────────

const comparatorCards = [
  {
    id: 'wix',
    title: 'Wix / Squarespace',
    headerClass: 'bg-gray-200',
    headerTextClass: 'text-gray-700',
    badge: null,
    price: '~1 080€',
    priceLabel: "d'abonnement sur 3 ans",
    time: '40 à 80h',
    criteria: [
      { label: 'SEO', icon: '⚠️', text: 'Limité' },
      { label: 'Design', icon: '❌', text: 'Générique' },
      { label: 'Support', icon: '❌', text: 'Bot email' },
      { label: 'Résultat', icon: '⚠️', text: 'Moyen' },
      { label: 'Personnalisation', icon: '❌', text: 'Templates figés' },
    ],
  },
  {
    id: 'ia',
    title: 'IA / No-code',
    headerStyle: { background: 'linear-gradient(135deg, #f97316, #fb923c)' },
    headerTextClass: 'text-white',
    badge: null,
    price: '~600 à 1 500€',
    priceLabel: 'sur 3 ans',
    time: '20 à 40h',
    criteria: [
      { label: 'SEO', icon: '❌', text: 'Générique' },
      { label: 'Design', icon: '⚠️', text: 'Passable' },
      { label: 'Support', icon: '❌', text: 'Aucun' },
      { label: 'Résultat', icon: '⚠️', text: 'Variable' },
      { label: 'Personnalisation', icon: '⚠️', text: 'Limitée' },
    ],
  },
  {
    id: 'bnk',
    title: 'BNK Conseil',
    headerStyle: { background: 'linear-gradient(135deg, #7C3AED, #A855F7)' },
    headerTextClass: 'text-white',
    badge: '✓ Recommandé',
    price: '690€',
    priceLabel: 'paiement unique',
    time: '0h',
    criteria: [
      { label: 'SEO', icon: '✅', text: 'Optimisé dès le départ' },
      { label: 'Design', icon: '✅', text: 'Sur-mesure' },
      { label: 'Support', icon: '✅', text: 'Humain dédié' },
      { label: 'Résultat', icon: '✅', text: 'Professionnel' },
      { label: 'Personnalisation', icon: '✅', text: '100% sur-mesure' },
    ],
  },
]

const idees = [
  {
    myth: "Wix c'est gratuit",
    reality:
      "Wix gratuit = publicités Wix sur votre site. La version pro coûte 17-35€/mois, soit 204-420€/an.",
  },
  {
    myth: 'Je peux le faire moi-même',
    reality:
      "Techniquement oui. Mais entre un site fonctionnel et un site qui convertit et se référence bien, il y a une vraie différence.",
  },
  {
    myth: "Le SEO c'est pareil partout",
    reality:
      "Les sites Wix et IA ont des limitations structurelles pour le SEO. Un site custom bien codé se référence bien mieux.",
  },
  {
    myth: "Je n'ai pas besoin d'un vrai site",
    reality:
      "96% des consommateurs vérifient un site avant d'acheter ou de contacter. Un site pro inspire confiance.",
  },
]

// ─── Composant ────────────────────────────────────────────────────────────────

export default function PourquoiPasFaireSoiMeme() {
  const [hourlyRate, setHourlyRate] = useState(30)

  return (
    <PageTransition>
      <SEOHead
        title="Wix vs Agence web : le vrai coût | BNK Conseil"
        description="Wix, Squarespace, IA… vraiment moins cher que de passer par un pro ? On a fait les calculs. Découvrez le coût réel du DIY vs un site professionnel."
        canonical="https://bnk-conseil-1z3b.vercel.app/pourquoi-pas-faire-soi-meme"
      />

      {/* ── Section 1 — Hero ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-28 pb-20 px-4"
        style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #faf5ff 40%, #dbeafe 100%)' }}
      >
        {/* Radial blob */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #c4b5fd 0%, transparent 70%)',
            transform: 'translate(30%, -30%)',
          }}
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              to="/creation-site-vitrine"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M19 12H5M5 12l7-7M5 12l7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Retour — Création de site vitrine
            </Link>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/80 border border-amber-200 rounded-full px-4 py-1.5 text-sm font-medium text-amber-700 mb-6"
          >
            🧮 Analyse coûts
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6"
          >
            Wix, Squarespace, IA…{' '}
            <span style={gradientText}>Vraiment moins cher</span>{' '}
            que de passer par un pro ?
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-gray-600 mb-10"
          >
            On a fait les calculs pour vous. La réponse va vous surprendre.
          </motion.p>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            <span className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm">
              ⏱ 40-80h perdues en moyenne
            </span>
            <span className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm">
              💸 1 800€ de manque à gagner
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2 — Comparateur visuel ───────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              La comparaison honnête
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 text-lg">
              Coûts réels calculés sur 3 ans d'utilisation
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {comparatorCards.map((card) => (
              <motion.div
                key={card.id}
                variants={fadeUp}
                className={`border rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col ${
                  card.id === 'bnk' ? 'border-violet-300 ring-2 ring-violet-200' : 'border-gray-100'
                }`}
              >
                {/* Header band */}
                <div
                  className={`px-6 py-4 relative ${card.headerClass ?? ''}`}
                  style={card.headerStyle ?? {}}
                >
                  <p className={`font-bold text-lg ${card.headerTextClass}`}>{card.title}</p>
                  {card.badge && (
                    <span className="absolute top-3 right-3 bg-white/20 border border-white/40 text-white text-xs font-semibold rounded-full px-3 py-1">
                      {card.badge}
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1 gap-5">
                  {/* Price */}
                  <div>
                    <p
                      className={`text-2xl font-black ${card.id === 'bnk' ? '' : 'text-gray-800'}`}
                      style={card.id === 'bnk' ? gradientText : {}}
                    >
                      {card.price}
                    </p>
                    <p className="text-sm text-gray-500">{card.priceLabel}</p>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="font-semibold">Temps investi :</span>
                    <span>{card.time}</span>
                  </div>

                  {/* Criteria */}
                  <ul className="space-y-2 flex-1">
                    {card.criteria.map((c) => (
                      <li key={c.label} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-0.5 shrink-0">{c.icon}</span>
                        <span>
                          <span className="font-medium">{c.label} :</span> {c.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA for BNK card */}
                  {card.id === 'bnk' && (
                    <Link
                      to="/tarifs"
                      className="mt-2 inline-flex justify-center items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-violet-300/50 hover:-translate-y-0.5"
                      style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                    >
                      Voir les tarifs
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 3 — Vrai coût du temps ──────────────────────────────── */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Votre temps, c'est de l'argent
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-6"
          >
            {/* Calculator */}
            <motion.div
              variants={fadeUp}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8"
            >
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Votre taux horaire estimé
              </label>
              <div className="flex items-center gap-3 mb-6">
                <input
                  type="number"
                  min={10}
                  max={200}
                  step={5}
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-28 border border-gray-200 rounded-xl px-4 py-3 text-lg font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
                <span className="text-gray-500 font-medium">€/h</span>
              </div>

              <div className="rounded-xl p-5" style={{ background: 'linear-gradient(135deg, #faf5ff, #ede9fe)' }}>
                <p className="text-lg font-bold text-violet-800">
                  En passant 60h sur Wix →{' '}
                  <span className="text-2xl" style={gradientText}>
                    {(hourlyRate * 60).toLocaleString('fr-FR')}€
                  </span>{' '}
                  de manque à gagner
                </p>
                <p className="text-sm text-violet-600 mt-2">
                  Sans compter le résultat souvent décevant et la frustration
                </p>
              </div>
            </motion.div>

            {/* Callout */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl p-6 border border-amber-200"
              style={{ background: 'linear-gradient(135deg, #fffbeb, #fef3c7)' }}
            >
              <p className="text-amber-800 font-medium leading-relaxed">
                💡 Un site créé en 60h de bricolage vs 2 semaines par un expert → le résultat ne sera pas le même.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 4 — Idées reçues ─────────────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-gray-900">
              Les idées reçues
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {idees.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="bg-red-50 border-b border-red-100 px-5 py-4">
                  <p className="font-semibold text-red-700 flex items-start gap-2">
                    <span>❌</span>
                    <span>"{item.myth}"</span>
                  </p>
                </div>
                <div className="bg-green-50 px-5 py-4">
                  <p className="text-green-800 text-sm leading-relaxed flex items-start gap-2">
                    <span className="mt-0.5 shrink-0">✅</span>
                    <span>{item.reality}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 5 — Pour qui est-ce adapté ? ────────────────────────── */}
      <section className="bg-violet-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Quand le DIY est acceptable
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 text-lg">
              Soyons honnêtes : le DIY a du sens dans certains cas
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {/* DIY column */}
            <motion.div
              variants={fadeUp}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm p-7"
            >
              <h3 className="font-black text-gray-800 text-lg mb-5 flex items-center gap-2">
                🛠 DIY adapté pour :
              </h3>
              <ul className="space-y-3">
                {[
                  'Blog personnel sans enjeu commercial',
                  'Portfolio étudiant ou amateur',
                  'Projet test / MVP rapide',
                  'Budget < 200€ et résultat non-critique',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-600 text-sm">
                    <span className="mt-0.5 text-gray-400 shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* BNK column */}
            <motion.div
              variants={fadeUp}
              className="border border-violet-200 rounded-2xl shadow-sm p-7"
              style={{ background: 'linear-gradient(135deg, #faf5ff, #ede9fe)' }}
            >
              <h3 className="font-black text-violet-800 text-lg mb-5 flex items-center gap-2">
                ✨ BNK adapté pour :
              </h3>
              <ul className="space-y-3">
                {[
                  'TPE, artisan, indépendant professionnel',
                  'Quand votre image de marque compte',
                  'Quand vous voulez être trouvé sur Google',
                  'Quand votre site doit convertir des visiteurs',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-violet-700 text-sm font-medium">
                    <span className="mt-0.5 shrink-0">✅</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 6 — CTA final ────────────────────────────────────────── */}
      <section
        className="py-24 px-4"
        style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #ede9fe 50%, #dbeafe 100%)' }}
      >
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-black text-gray-900 mb-4"
          >
            Investissez bien, une seule fois
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-600 text-lg mb-10">
            Pour le prix d'un abonnement Wix 3 ans, obtenez un site professionnel livré en 2 semaines.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              to="/tarifs"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-violet-300/50 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
            >
              Voir les tarifs
            </Link>
            <Link
              to="/apercu-site"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-violet-300 bg-white px-7 py-3.5 text-base font-semibold text-violet-700 transition-all duration-300 hover:bg-violet-50 hover:-translate-y-0.5"
            >
              Visualiser mon site gratuit
            </Link>
          </motion.div>

          <motion.p variants={fadeUp} className="text-sm text-gray-500">
            Devis gratuit · Sans engagement · Réponse sous 24h
          </motion.p>
        </motion.div>
      </section>
    </PageTransition>
  )
}
