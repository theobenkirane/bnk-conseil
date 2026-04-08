import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import SEOHead from '../components/SEOHead'
import ROICalculator from '../components/ROICalculator'

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

// ─── Data ─────────────────────────────────────────────────────────────────────

const packages = [
  {
    name: "Essentiel",
    price: "690€",
    priceNote: "paiement unique",
    popular: false,
    dark: false,
    features: [
      { label: "3-4 pages", ok: true },
      { label: "SEO de base", ok: true },
      { label: "Blog", ok: false },
      { label: "Livraison en 2 semaines", ok: true },
      { label: "2 semaines de retouches", ok: true },
      { label: "Support email", ok: true },
    ],
  },
  {
    name: "Pro",
    price: "990€",
    priceNote: "paiement unique",
    popular: true,
    dark: false,
    features: [
      { label: "5-7 pages", ok: true },
      { label: "SEO avancé", ok: true },
      { label: "Blog inclus", ok: true },
      { label: "Livraison en 3 semaines", ok: true },
      { label: "1 mois de retouches", ok: true },
      { label: "Support prioritaire", ok: true },
    ],
  },
  {
    name: "Sur-mesure",
    price: "Sur devis",
    priceNote: "selon cahier des charges",
    popular: false,
    dark: true,
    features: [
      { label: "Pages illimitées", ok: true },
      { label: "SEO premium", ok: true },
      { label: "Blog inclus", ok: true },
      { label: "Livraison en 4 semaines", ok: true },
      { label: "3 mois de retouches", ok: true },
      { label: "Support dédié", ok: true },
    ],
  },
]

const guarantees = [
  {
    icon: "⏱️",
    title: "Livraison garantie",
    desc: "Si le délai est dépassé, vous bénéficiez d'un remboursement partiel. Essentiel : 2 semaines, Pro : 3 semaines. On tient nos engagements.",
  },
  {
    icon: "🔧",
    title: "1 mois de retouches",
    desc: "Après la livraison, vous disposez d'une période de modifications illimitées pour affiner chaque détail jusqu'à ce que vous soyez 100% satisfait.",
  },
  {
    icon: "🌐",
    title: "Hébergement 1 an inclus",
    desc: "Nom de domaine et hébergement offerts la première année. Votre site est en ligne immédiatement, sans frais cachés ni surprises.",
  },
]

const faqItems = [
  {
    q: "Puis-je payer en plusieurs fois ?",
    a: "Oui, le paiement en 2× est disponible : 50% à la commande, 50% à la livraison. La possibilité de payer en 3× est aussi envisageable, sur devis.",
  },
  {
    q: "Qu'est-ce qui est inclus dans le prix ?",
    a: "Design sur-mesure, développement complet, SEO de base, intégration de vos contenus (textes, images), hébergement 1 an et nom de domaine. Tout est inclus, sans supplément.",
  },
  {
    q: "Combien de temps dure la réalisation ?",
    a: "Entre 2 et 4 semaines selon la formule choisie, à partir de la validation du cahier des charges. Un planning clair vous est communiqué dès le démarrage.",
  },
  {
    q: "Puis-je faire des modifications après la livraison ?",
    a: "Oui, la période de retouches est incluse dans chaque formule. Au-delà, une maintenance est disponible à partir de 49€/mois selon vos besoins.",
  },
  {
    q: "Et si j'ai besoin de plus de pages plus tard ?",
    a: "Une refonte partielle ou l'ajout de pages est tout à fait possible. Le tarif est établi sur devis selon le volume et la complexité des ajouts souhaités.",
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function CheckIcon({ ok, dark }) {
  if (ok) {
    return (
      <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${dark ? 'bg-white/20' : 'bg-violet-100'}`}>
        <svg viewBox="0 0 12 12" fill="none" className={`w-2.5 h-2.5 ${dark ? 'text-white' : 'text-violet-600'}`}>
          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    )
  }
  return (
    <span className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center bg-gray-100">
      <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5 text-gray-400">
        <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  )
}

function PackageCard({ pkg, delay }) {
  const isDark = pkg.dark
  const isPro = pkg.popular

  return (
    <motion.div
      {...fadeUpView(delay)}
      className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
        isPro
          ? 'shadow-xl shadow-violet-400/30'
          : isDark
          ? 'shadow-lg shadow-gray-900/20'
          : 'shadow-sm hover:shadow-violet-100/60 border border-gray-100'
      }`}
      style={
        isPro
          ? { background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }
          : isDark
          ? { background: '#0F172A' }
          : { background: '#ffffff' }
      }
    >
      {/* Badge "Plus populaire" */}
      {isPro && (
        <div className="absolute -top-0 left-1/2 -translate-x-1/2 z-10">
          <span className="bg-white text-violet-700 text-xs font-bold px-3 py-1 rounded-b-xl shadow-md shadow-violet-200/50 flex items-center gap-1">
            ⭐ Plus populaire
          </span>
        </div>
      )}

      {/* Content */}
      <div className={`flex flex-col flex-1 px-6 pt-8 pb-6 ${isPro ? 'pt-10' : ''}`}>
        {/* Name + price */}
        <div className="mb-6">
          <h3 className={`text-lg font-bold mb-3 ${isPro || isDark ? 'text-white' : 'text-gray-500'}`}>
            {pkg.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <p className={`text-4xl font-black ${isPro || isDark ? 'text-white' : 'text-gray-900'}`}>
              {pkg.price}
            </p>
          </div>
          <p className={`text-xs mt-1 ${isPro ? 'text-white/60' : isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {pkg.priceNote}
            {!isDark && (
              <span className={`ml-2 font-medium ${isPro ? 'text-white/80' : 'text-violet-600'}`}>
                · Paiement en 2×
              </span>
            )}
          </p>
        </div>

        {/* Features */}
        <div className="flex-1 space-y-3 mb-6">
          {pkg.features.map((f) => (
            <div key={f.label} className="flex items-center gap-2.5 text-sm">
              <CheckIcon ok={f.ok} dark={isPro || isDark} />
              <span className={
                f.ok
                  ? isPro || isDark ? 'text-white/90' : 'text-gray-700'
                  : 'text-gray-400'
              }>
                {f.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/rdv"
          className={`block w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
            isPro
              ? 'bg-white text-violet-700 hover:bg-white/90 hover:shadow-lg'
              : isDark
              ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
              : 'text-white hover:shadow-lg hover:shadow-violet-300/50'
          }`}
          style={!isPro && !isDark ? { background: 'linear-gradient(135deg, #7C3AED, #A855F7)' } : {}}
        >
          Choisir {pkg.name} →
        </Link>
      </div>
    </motion.div>
  )
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="space-y-3">
      {faqItems.map((item, i) => (
        <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left text-gray-800 font-semibold text-sm hover:bg-gray-50 transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span>{item.q}</span>
            <motion.span
              animate={{ rotate: openIndex === i ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-violet-600 text-lg leading-none ml-3 flex-shrink-0"
            >
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Tarifs() {
  return (
    <PageTransition>
      <SEOHead
        title="Tarifs création site vitrine | BNK Conseil"
        description="Découvrez nos tarifs transparents pour la création de site vitrine. À partir de 690€, paiement en 2×, livraison garantie en 4 semaines. Devis gratuit."
        canonical="https://bnk-conseil.com/tarifs"
      />

      {/* ── Section 1 : Hero ──────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-20 pb-16 px-4"
        style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #faf5ff 40%, #fce7f3 100%)' }}
      >
        {/* Blob decoration */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-full opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          <motion.div {...fadeUp(0)}>
            <span className="uppercase tracking-widest text-xs font-semibold text-gray-600 bg-white/70 border border-gray-200 px-3 py-1.5 rounded-full inline-block">
              💰 Tarifs transparents
            </span>
          </motion.div>

          <motion.h1 {...fadeUp(0.1)} className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            Un investissement maîtrisé,{' '}
            <span style={gradientText}>des résultats mesurables</span>
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="text-lg text-gray-600 max-w-xl mx-auto">
            Moins cher qu'un employé, plus efficace qu'un outil no-code. Paiement en 2× disponible.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-wrap items-center justify-center gap-3">
            {["À partir de 690€", "Paiement en 2×", "Livraison garantie"].map((pill) => (
              <span
                key={pill}
                className="bg-white/80 border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2 rounded-full shadow-sm"
              >
                {pill}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 2 : Packages ──────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-10">
          <motion.div {...fadeUpView(0)} className="text-center space-y-3">
            <span className="uppercase tracking-widest text-xs font-semibold text-gray-600">Nos formules</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Choisissez votre formule</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} delay={0.1 + i * 0.1} />
            ))}
          </div>

          <motion.p {...fadeUpView(0.4)} className="text-center text-sm text-gray-500">
            Paiement en 2× disponible · Livraison garantie · Devis gratuit sous 24h
          </motion.p>

          <motion.div {...fadeUpView(0.5)} className="text-center">
            <Link
              to="/commander"
              className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 text-sm font-semibold transition-colors"
            >
              Ou commander directement avec -30%
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Section 3 : ROI Calculator ────────────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          <motion.div {...fadeUpView(0)} className="text-center space-y-3">
            <span className="uppercase tracking-widest text-xs font-semibold text-gray-600">Simulation</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Calculez votre retour sur investissement
            </h2>
            <p className="text-gray-600">
              Estimez en quelques secondes la rentabilité de votre site.
            </p>
          </motion.div>

          <motion.div {...fadeUpView(0.15)}>
            <ROICalculator />
          </motion.div>
        </div>
      </section>

      {/* ── Section 4 : Garanties ─────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4 border-t border-gray-100">
        <div className="max-w-5xl mx-auto space-y-10">
          <motion.div {...fadeUpView(0)} className="text-center space-y-3">
            <span className="uppercase tracking-widest text-xs font-semibold text-gray-600">Engagements</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Nos garanties</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guarantees.map((g, i) => (
              <motion.div
                key={g.title}
                {...fadeUpView(0.1 + i * 0.1)}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 space-y-3"
              >
                <span className="text-3xl">{g.icon}</span>
                <h3 className="font-black text-gray-900 text-lg">{g.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{g.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5 : Coût réel ─────────────────────────────────────────── */}
      <section className="bg-violet-50 py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <motion.div {...fadeUpView(0)} className="text-center space-y-3">
            <span className="uppercase tracking-widest text-xs font-semibold text-gray-600">Comparaison</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Le vrai coût de faire soi-même
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Wix / Squarespace */}
            <motion.div
              {...fadeUpView(0.1)}
              className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">😓</span>
                <h3 className="font-black text-gray-900 text-lg">Wix / Squarespace</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <span>~1 080€ d'abonnement sur 3 ans (30€/mois)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <span>40 à 80h de votre temps à apprendre et construire</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <span>Résultat générique, peu différenciant face aux concurrents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <span>SEO limité, performances souvent médiocres</span>
                </li>
              </ul>
              <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm font-semibold text-red-700">
                Coût total estimé : 1 080€ + votre temps
              </div>
            </motion.div>

            {/* BNK Essentiel */}
            <motion.div
              {...fadeUpView(0.2)}
              className="bg-white border-2 border-violet-300 rounded-2xl p-6 space-y-4 ring-2 ring-violet-100"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                <h3 className="font-black text-gray-900 text-lg">BNK Essentiel</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>690€ paiement unique, hébergement 1 an inclus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>0h de votre temps — on s'occupe de tout</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Design professionnel et sur-mesure pour votre activité</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>SEO optimisé dès le départ, livraison en 2 semaines</span>
                </li>
              </ul>
              <div className="bg-violet-50 border border-violet-200 rounded-xl px-4 py-3 text-sm font-semibold text-violet-700">
                Coût total : 690€ une seule fois
              </div>
            </motion.div>
          </div>

          {/* Highlight */}
          <motion.div
            {...fadeUpView(0.25)}
            className="bg-yellow-50 border border-yellow-200 rounded-2xl px-6 py-5 text-center"
          >
            <p className="text-gray-800 font-semibold text-sm md:text-base">
              💡 Votre temps a de la valeur. Si vous facturez 30€/h, 60h sur Wix = 1 800€ de manque à gagner.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div {...fadeUpView(0.3)} className="text-center">
            <Link
              to="/rdv"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold hover:shadow-xl hover:shadow-violet-300/50 hover:-translate-y-0.5 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
            >
              Libérez votre temps → Demander un devis
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Section 6 : FAQ ───────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          <motion.div {...fadeUpView(0)} className="text-center space-y-3">
            <span className="uppercase tracking-widest text-xs font-semibold text-gray-600">Questions fréquentes</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">FAQ</h2>
          </motion.div>

          <motion.div {...fadeUpView(0.1)}>
            <FAQAccordion />
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4"
        style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #faf5ff 100%)' }}
      >
        <motion.div {...fadeUpView(0)} className="max-w-xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">
            Prêt à lancer votre site ?
          </h2>

          <Link
            to="/rdv"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white text-base font-semibold hover:shadow-xl hover:shadow-violet-300/50 hover:-translate-y-0.5 transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
          >
            Réserver mon appel gratuit
          </Link>

          <p className="text-sm text-gray-500">
            Devis gratuit · Sans engagement · Réponse sous 24h
          </p>
        </motion.div>
      </section>
    </PageTransition>
  )
}
