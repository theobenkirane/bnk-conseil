import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../../components/PageTransition'
import SEOHead from '../../components/SEOHead'

// ─── Styles ───────────────────────────────────────────────────────────────────

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

// ─── Schema ───────────────────────────────────────────────────────────────────

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Combien coûte un site vitrine en 2025 ?",
      "description": "Guide complet sur le prix d'un site vitrine : options, comparatif, ce qui influence le tarif.",
      "url": "https://bnk-conseil-1z3b.vercel.app/guide/combien-coute-un-site-vitrine",
      "author": { "@type": "Person", "name": "Théo Benkirane" },
      "publisher": { "@type": "Organization", "name": "BNK Conseil" },
      "datePublished": "2025-04-01",
      "dateModified": "2025-04-08"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quel est le prix moyen d'un site vitrine ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Un site vitrine coûte entre 500€ et 3 000€ selon le prestataire et les fonctionnalités. Chez BNK Conseil, les tarifs débutent à 690€ pour une formule complète."
          }
        },
        {
          "@type": "Question",
          "name": "Wix est-il vraiment gratuit ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Non. La version gratuite de Wix affiche des publicités Wix sur votre site. La version pro coûte entre 17€ et 35€ par mois, soit 204€ à 420€ par an."
          }
        }
      ]
    }
  ]
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const priceCategories = [
  {
    id: 'diy',
    title: 'DIY (Wix, Squarespace)',
    price: '0€ à 400€/an',
    desc: 'Simple mais limité en SEO et personnalisation',
    icon: '🛠️',
    highlight: false,
    badgeText: null,
    borderClass: 'border-gray-200',
    bgClass: 'bg-white',
    priceColor: 'text-gray-800',
  },
  {
    id: 'freelance',
    title: 'Freelance débutant',
    price: '300€ à 800€',
    desc: "Variable selon l'expérience, peu de garanties",
    icon: '👤',
    highlight: false,
    badgeText: null,
    borderClass: 'border-gray-200',
    bgClass: 'bg-white',
    priceColor: 'text-gray-800',
  },
  {
    id: 'agence-tpe',
    title: 'Agence spécialisée TPE',
    price: '690€ à 1 500€',
    desc: 'Rapport qualité/prix optimal, spécialistes secteur',
    icon: '🏆',
    highlight: true,
    badgeText: '✅ Recommandé',
    borderClass: 'border-violet-300',
    bgClass: '',
    priceColor: '',
  },
  {
    id: 'grande-agence',
    title: 'Grande agence web',
    price: '2 000€ à 10 000€+',
    desc: 'Qualité mais budget hors de portée pour TPE',
    icon: '🏢',
    highlight: false,
    badgeText: null,
    borderClass: 'border-gray-200',
    bgClass: 'bg-white',
    priceColor: 'text-gray-800',
  },
]

const factors = [
  {
    icon: '📄',
    title: 'Nombre de pages',
    desc: '3 pages vs 10 pages = délai et coût différents',
  },
  {
    icon: '🎨',
    title: 'Niveau de personnalisation',
    desc: 'Template modifié vs design 100% sur-mesure',
  },
  {
    icon: '🔍',
    title: 'SEO',
    desc: 'SEO de base vs stratégie locale avancée',
  },
  {
    icon: '⚙️',
    title: 'Fonctionnalités',
    desc: 'Formulaire simple vs réservation en ligne, blog, catalogue',
  },
  {
    icon: '🌐',
    title: 'Hébergement',
    desc: "Certains prestataires incluent l'hébergement, d'autres non",
  },
  {
    icon: '🔧',
    title: 'Maintenance',
    desc: 'Site livré seul vs contrat de maintenance mensuel',
  },
]

const costCards = [
  {
    id: 'wix',
    title: 'Wix Pro',
    lines: [
      '17€/mois × 36 mois = 612€',
      '+ Domaine 12€/an × 3 = 36€',
      '+ Votre temps : 40 à 80h',
    ],
    total: '~648€ + votre temps',
    borderClass: 'border-gray-200',
    bgClass: 'bg-white',
    totalColor: 'text-gray-800',
    headerGrad: false,
  },
  {
    id: 'wordpress',
    title: 'WordPress seul',
    lines: [
      'Hébergement 10€/mois × 36 = 360€',
      '+ Développeur 500 à 1 500€',
      '+ Votre temps de gestion',
    ],
    total: '860€ à 1 860€',
    borderClass: 'border-amber-200',
    bgClass: 'bg-amber-50',
    totalColor: 'text-amber-800',
    headerGrad: false,
  },
  {
    id: 'bnk',
    title: 'BNK Conseil Essentiel',
    lines: [
      '690€ paiement unique',
      '+ Hébergement inclus 1 an',
      '+ 0h de votre temps',
    ],
    total: '690€ la première année',
    borderClass: 'border-violet-300',
    bgClass: '',
    totalColor: '',
    headerGrad: true,
  },
]

const budgetOptions = [
  {
    budget: 'Budget < 200€',
    choice: 'Wix gratuit ou Squarespace',
    note: 'Attention au SEO',
    recommended: false,
    icon: '⚠️',
  },
  {
    budget: 'Budget 200 – 500€',
    choice: 'Freelance',
    note: 'Vérifiez les références',
    recommended: false,
    icon: '👀',
  },
  {
    budget: 'Budget 500 – 1 500€ · TPE/artisan',
    choice: 'Agence spécialisée TPE',
    note: 'Meilleur rapport qualité/prix pour votre activité',
    recommended: true,
    icon: '✅',
  },
  {
    budget: 'Budget > 2 000€',
    choice: 'Grande agence web',
    note: 'Si vous avez des besoins très spécifiques',
    recommended: false,
    icon: '🏢',
  },
]

const faqItems = [
  {
    question: "Quel est le prix moyen d'un site vitrine en 2025 ?",
    answer:
      "Entre 500€ et 1 500€ pour une TPE chez un prestataire sérieux. Les offres sous 300€ sont souvent des templates peu personnalisés.",
  },
  {
    question: "Peut-on avoir un site vitrine professionnel pour moins de 1 000€ ?",
    answer:
      "Oui, c'est notre coeur de métier. La formule Essentiel à 690€ inclut design sur-mesure, SEO, hébergement 1 an.",
  },
  {
    question: "Le prix inclut-il l'hébergement ?",
    answer:
      "Pas toujours. Chez BNK Conseil, l'hébergement et le nom de domaine sont inclus la première année.",
  },
  {
    question: "Wix est-il une alternative sérieuse ?",
    answer:
      "Pour un blog perso ou un portfolio amateur, oui. Pour une vitrine professionnelle TPE, non : le SEO est limité et le design générique.",
  },
  {
    question: "Comment comparer les devis d'agences ?",
    answer:
      "Vérifiez ce qui est inclus : hébergement, SEO, retouches, maintenance. Un devis à 500€ sans hébergement peut revenir plus cher qu'un à 800€ tout inclus.",
  },
]

const tocLinks = [
  { href: '#categories', label: 'Les grandes catégories de prix' },
  { href: '#facteurs', label: 'Ce qui influence le prix' },
  { href: '#cout-reel', label: 'Le vrai coût sur 3 ans' },
  { href: '#recommandation', label: 'Quelle option choisir ?' },
  { href: '#faq', label: 'Questions fréquentes' },
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 text-base">{question}</span>
        <span
          className="shrink-0 text-violet-600 transition-transform duration-300"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 bg-white">
          <p className="text-gray-700 text-base leading-relaxed border-t border-gray-100 pt-4">{answer}</p>
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CombienCouteUnSiteVitrine() {
  return (
    <PageTransition>
      <SEOHead
        title="Combien coûte un site vitrine en 2025 ? | BNK Conseil"
        description="Prix, options, ce qui influence le tarif : tout ce que vous devez savoir avant de commander un site vitrine. Comparatif complet Wix, WordPress, agence, freelance."
        canonical="https://bnk-conseil-1z3b.vercel.app/guide/combien-coute-un-site-vitrine"
        schema={schema}
      />

      <div className="min-h-screen bg-[#FAFBFF]">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden pt-28 pb-16 px-4"
          style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #ede9fe 40%, #dbeafe 100%)' }}
        >
          <div
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #c4b5fd 0%, transparent 70%)',
              transform: 'translate(30%, -30%)',
            }}
          />

          <div className="relative max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 text-sm text-gray-500 mb-8"
              aria-label="Fil d'Ariane"
            >
              <Link to="/" className="hover:text-violet-600 transition-colors">Accueil</Link>
              <span>/</span>
              <span className="text-gray-400">Guides</span>
              <span>/</span>
              <span className="text-gray-700 font-medium">Combien coûte un site vitrine</span>
            </motion.nav>

            <div className="max-w-3xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-white/80 border border-violet-200 rounded-full px-4 py-1.5 text-sm font-medium text-violet-700 mb-6"
              >
                📖 Guide complet
              </motion.div>

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4"
              >
                Combien coûte un site vitrine{' '}
                <span style={gradientText}>en 2025 ?</span>
              </motion.h1>

              {/* Reading time */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="flex items-center gap-2 text-sm text-gray-500 mb-6"
              >
                <span>⏱️ 7 min de lecture</span>
                <span className="text-gray-300">·</span>
                <span>Mis à jour avril 2025</span>
              </motion.div>

              {/* Intro */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl text-gray-700 leading-relaxed"
              >
                Le prix d'un site vitrine varie de 0€ à 10 000€+. Un écart qui sème la confusion chez la plupart des TPE.
                La réalité ? Le bon choix dépend de votre budget, de vos objectifs et de ce que chaque prestataire inclut vraiment.
                Ce guide vous donne les clés pour comparer sans vous faire avoir.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── 2-col layout ──────────────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="flex gap-12 items-start">

            {/* ── Article content ─────────────────────────────────────────── */}
            <article className="min-w-0 flex-1">

              {/* ── Section 1 : Catégories de prix ─────────────────────── */}
              <motion.section
                id="categories"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="mb-20 scroll-mt-24"
              >
                <motion.h2
                  variants={fadeUp}
                  className="text-2xl font-bold text-gray-900 mb-2"
                >
                  Les grandes catégories de prix
                </motion.h2>
                <motion.p variants={fadeUp} className="text-gray-500 text-base mb-8">
                  Voici les 4 options qui s'offrent à une TPE, avec leurs fourchettes réelles.
                </motion.p>

                <motion.div
                  variants={stagger}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                >
                  {priceCategories.map((cat) => (
                    <motion.div
                      key={cat.id}
                      variants={fadeUp}
                      className={`relative rounded-2xl border-2 p-6 ${cat.borderClass} ${cat.highlight ? 'ring-2 ring-violet-200' : ''}`}
                      style={
                        cat.highlight
                          ? { background: 'linear-gradient(135deg, #faf5ff, #ede9fe)' }
                          : {}
                      }
                    >
                      {cat.badgeText && (
                        <span
                          className="absolute top-4 right-4 text-xs font-semibold text-white px-3 py-1 rounded-full"
                          style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                        >
                          {cat.badgeText}
                        </span>
                      )}
                      <div className="text-2xl mb-3">{cat.icon}</div>
                      <h3 className={`font-semibold text-lg mb-1 ${cat.highlight ? 'text-violet-900' : 'text-gray-900'}`}>
                        {cat.title}
                      </h3>
                      <p
                        className={`text-xl font-black mb-2 ${cat.highlight ? '' : cat.priceColor}`}
                        style={cat.highlight ? gradientText : {}}
                      >
                        {cat.price}
                      </p>
                      <p className={`text-sm leading-relaxed ${cat.highlight ? 'text-violet-700' : 'text-gray-600'}`}>
                        {cat.desc}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>

              {/* ── Section 2 : Facteurs ─────────────────────────────────── */}
              <motion.section
                id="facteurs"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="mb-20 scroll-mt-24"
              >
                <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 mb-2">
                  Ce qui influence le prix
                </motion.h2>
                <motion.p variants={fadeUp} className="text-gray-500 text-base mb-8">
                  Six facteurs expliquent pourquoi deux devis peuvent varier du simple au triple.
                </motion.p>

                <motion.div
                  variants={stagger}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {factors.map((f, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex gap-4"
                    >
                      <span className="text-2xl shrink-0 mt-0.5">{f.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-base mb-1">{f.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>

              {/* ── Section 3 : Vrai coût sur 3 ans ─────────────────────── */}
              <motion.section
                id="cout-reel"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="mb-16 scroll-mt-24"
              >
                <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 mb-2">
                  Le vrai coût sur 3 ans
                </motion.h2>
                <motion.p variants={fadeUp} className="text-gray-500 text-base mb-8">
                  Les chiffres qui changent tout quand on calcule le coût total de possession.
                </motion.p>

                <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  {costCards.map((card) => (
                    <motion.div
                      key={card.id}
                      variants={fadeUp}
                      className={`rounded-2xl border-2 overflow-hidden ${card.borderClass} ${card.id === 'bnk' ? 'ring-2 ring-violet-200' : ''}`}
                    >
                      {/* Header */}
                      <div
                        className={`px-5 py-4 ${card.headerGrad ? '' : card.bgClass}`}
                        style={card.headerGrad ? { background: 'linear-gradient(135deg, #7C3AED, #A855F7)' } : {}}
                      >
                        <p className={`font-bold text-base ${card.headerGrad ? 'text-white' : 'text-gray-800'}`}>
                          {card.title}
                        </p>
                      </div>

                      {/* Body */}
                      <div className={`p-5 ${card.bgClass}`}>
                        <ul className="space-y-2 mb-4">
                          {card.lines.map((line, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="text-gray-400 shrink-0 mt-0.5">•</span>
                              {line}
                            </li>
                          ))}
                        </ul>
                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Total estimé</p>
                          <p
                            className={`font-black text-lg ${card.id === 'bnk' ? '' : card.totalColor}`}
                            style={card.id === 'bnk' ? gradientText : {}}
                          >
                            {card.total}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Callout */}
                <motion.div
                  variants={fadeUp}
                  className="rounded-2xl border-2 border-violet-200 p-6"
                  style={{ background: 'linear-gradient(135deg, #faf5ff, #ede9fe)' }}
                >
                  <p className="text-violet-800 font-medium leading-relaxed">
                    💡 Un site BNK Conseil est rentabilisé dès que vous gagnez 2 nouveaux clients grâce à lui.
                    Pour un restaurant avec un panier moyen de 40€/personne, c'est souvent le mois 1.
                  </p>
                </motion.div>
              </motion.section>

              {/* ── CTA mid-article ──────────────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-20 rounded-2xl border border-violet-200 p-8 text-center"
                style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)' }}
              >
                <p className="text-violet-900 font-bold text-xl mb-2">Obtenez un devis transparent en 24h</p>
                <p className="text-violet-700 text-base mb-6">
                  Sans engagement · Réponse garantie sous 24h
                </p>
                <Link
                  to="/tarifs"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-violet-300/50 hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                >
                  Voir les tarifs
                </Link>
              </motion.div>

              {/* ── Section 4 : Recommandation ───────────────────────────── */}
              <motion.section
                id="recommandation"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="mb-20 scroll-mt-24"
              >
                <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 mb-2">
                  Pour une TPE, quelle option choisir ?
                </motion.h2>
                <motion.p variants={fadeUp} className="text-gray-500 text-base mb-8">
                  Guide de décision selon votre budget.
                </motion.p>

                <motion.div variants={stagger} className="space-y-4">
                  {budgetOptions.map((opt, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      className={`rounded-2xl border-2 p-5 flex gap-4 items-start ${
                        opt.recommended
                          ? 'border-violet-300 ring-2 ring-violet-100'
                          : 'border-gray-200 bg-white'
                      }`}
                      style={opt.recommended ? { background: 'linear-gradient(135deg, #faf5ff, #ede9fe)' } : {}}
                    >
                      <span className="text-xl shrink-0 mt-0.5">{opt.icon}</span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          <span className="font-bold text-gray-800 text-sm">{opt.budget}</span>
                          {opt.recommended && (
                            <span
                              className="text-xs font-semibold text-white px-3 py-0.5 rounded-full"
                              style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                            >
                              ✅ Notre recommandation
                            </span>
                          )}
                        </div>
                        <p className={`font-semibold text-base mb-1 ${opt.recommended ? 'text-violet-900' : 'text-gray-900'}`}>
                          {opt.choice}
                        </p>
                        <p className={`text-sm ${opt.recommended ? 'text-violet-700' : 'text-gray-500'}`}>
                          {opt.note}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>

              {/* ── Section 5 : FAQ ──────────────────────────────────────── */}
              <motion.section
                id="faq"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="mb-20 scroll-mt-24"
              >
                <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 mb-2">
                  Questions fréquentes
                </motion.h2>
                <motion.p variants={fadeUp} className="text-gray-500 text-base mb-8">
                  Les réponses aux questions que tout le monde se pose.
                </motion.p>

                <motion.div variants={stagger} className="space-y-3">
                  {faqItems.map((item, i) => (
                    <motion.div key={i} variants={fadeUp}>
                      <AccordionItem question={item.question} answer={item.answer} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>

              {/* ── CTA final ────────────────────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="rounded-2xl p-10 text-center"
                style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #ede9fe 50%, #dbeafe 100%)' }}
              >
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
                  Vous savez maintenant ce que vaut un site vitrine.
                </h2>
                <p className="text-gray-600 text-lg mb-8">Passons à la pratique.</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                    Visualiser mon site
                  </Link>
                </div>
              </motion.div>

            </article>

            {/* ── Sticky sidebar ──────────────────────────────────────────── */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 space-y-5">

                {/* Table of contents */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                    Sommaire
                  </p>
                  <nav className="space-y-2" aria-label="Table des matières">
                    {tocLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="block text-sm text-gray-600 hover:text-violet-600 hover:translate-x-1 transition-all duration-200 py-0.5"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* CTA card */}
                <div
                  className="rounded-2xl border border-violet-200 p-6 text-center"
                  style={{ background: 'linear-gradient(135deg, #faf5ff, #ede9fe)' }}
                >
                  <p className="font-bold text-violet-900 text-base mb-2">
                    Vous avez votre réponse ?
                  </p>
                  <p className="text-sm text-violet-700 mb-5 leading-relaxed">
                    Obtenez un devis gratuit et personnalisé.
                  </p>
                  <Link
                    to="/rdv"
                    className="block text-center rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-violet-300/50 hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                  >
                    Obtenez un devis gratuit
                  </Link>
                  <p className="text-xs text-violet-500 mt-3">Réponse sous 24h · Sans engagement</p>
                </div>

              </div>
            </aside>

          </div>
        </div>

      </div>
    </PageTransition>
  )
}
