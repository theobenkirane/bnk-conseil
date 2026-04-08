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
      "headline": "Wix vs Agence web : lequel choisir pour sa TPE ?",
      "description": "Comparatif honnête Wix vs agence web pour une TPE. Coûts réels, SEO, design, support : on compare tout.",
      "url": "https://bnk-conseil.com/guide/wix-vs-agence-web",
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
          "name": "Wix peut-il vraiment bien se référencer sur Google ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Techniquement oui mais structurellement limité. Les sites Wix ont souvent du code inutile qui ralentit le chargement, ce qui pénalise le SEO."
          }
        },
        {
          "@type": "Question",
          "name": "Mon site Wix actuel peut-il être migré ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pas directement. Wix ne permet pas d'export du code. Mais votre contenu (textes, photos) peut être réutilisé dans un nouveau site."
          }
        }
      ]
    }
  ]
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const wixPros = [
  "Prise en main rapide (quelques heures pour un site de base)",
  "Pas besoin de développeur pour les mises à jour courantes",
  "Interface visuelle intuitive et drag-and-drop",
  "Nombreux templates disponibles dans tous les secteurs",
]

const wixCons = [
  "SEO structurellement limité (code lourd, peu de contrôle technique)",
  "Design générique reconnaissable comme \"site Wix\"",
  "Coût réel sous-estimé (abonnement + domaine = 200–400€/an)",
  "Votre site appartient à Wix (pas d'export de code possible)",
  "Support limité (base de connaissance, chatbot automatique)",
]

const agencePros = [
  "SEO optimisé dès le départ (structure technique, balises, performance)",
  "Design 100% sur-mesure (votre identité, pas un template)",
  "Vous possédez votre site et son code source",
  "Support humain pour les questions et modifications",
  "Résultat professionnel qui inspire confiance aux clients",
]

const comparisonRows = [
  {
    icon: '💰',
    criterion: 'Coût réel 3 ans',
    wix: { text: '612 – 1 260€ + votre temps', status: 'warning' },
    agence: { text: '690€ paiement unique', status: 'good' },
  },
  {
    icon: '🔍',
    criterion: 'SEO et visibilité',
    wix: { text: 'Limité structurellement', status: 'warning' },
    agence: { text: 'Optimisé dès le départ', status: 'good' },
  },
  {
    icon: '🎨',
    criterion: 'Qualité du design',
    wix: { text: 'Templates génériques', status: 'warning' },
    agence: { text: 'Sur-mesure unique', status: 'good' },
  },
  {
    icon: '🛠️',
    criterion: 'Support et maintenance',
    wix: { text: 'Bot / base de connaissance', status: 'bad' },
    agence: { text: 'Humain dédié', status: 'good' },
  },
  {
    icon: '⏱️',
    criterion: 'Votre temps investi',
    wix: { text: '40 – 80h de création', status: 'bad' },
    agence: { text: '0h', status: 'good' },
  },
]

const wixOkFor = [
  "Blog personnel, portfolio hobby sans enjeu commercial",
  "MVP ultra-rapide pour valider une idée à faible coût",
  "Projet avec budget < 100€ et sans enjeu de conversion",
]

const wixNotFor = [
  "Vitrine professionnelle d'une TPE ou d'un artisan",
  "Tout secteur où l'image compte (restaurant, coach, artisan)",
  "Quand vous voulez être trouvé sur Google localement",
  "Quand votre site doit convertir des visiteurs en clients",
]

const faqItems = [
  {
    question: "Wix peut-il vraiment bien se référencer sur Google ?",
    answer:
      "Techniquement oui mais structurellement limité. Les sites Wix ont souvent du code inutile qui ralentit le chargement, ce qui pénalise directement le SEO selon les Core Web Vitals de Google.",
  },
  {
    question: "Mon site Wix actuel peut-il être migré ?",
    answer:
      "Pas directement. Wix ne permet pas l'export du code source. Mais votre contenu (textes, photos, logo) peut être réutilisé intégralement dans un nouveau site professionnel.",
  },
  {
    question: "Combien de temps pour créer un site sur Wix soi-même ?",
    answer:
      "Comptez 20 à 80h selon votre expérience et le niveau de personnalisation visé. Un résultat vraiment professionnel demande du temps et des compétences en design et en SEO.",
  },
  {
    question: "Une agence peut-elle vraiment livrer en 2 semaines ?",
    answer:
      "Chez BNK Conseil, oui pour la formule Essentiel. On a un process rodé et une spécialisation TPE qui nous permet d'aller vite sans sacrifier la qualité du design ou du SEO.",
  },
]

const tocLinks = [
  { href: '#wix', label: 'Wix : avantages et limites' },
  { href: '#agence', label: 'Agence web : les vrais avantages' },
  { href: '#comparaison', label: 'Comparaison sur 5 critères' },
  { href: '#wix-adapte', label: 'Pour qui Wix est adapté' },
  { href: '#faq', label: 'Questions fréquentes' },
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ status, text }) {
  const styles = {
    good: 'bg-green-50 text-green-800 border border-green-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    bad: 'bg-red-50 text-red-800 border border-red-200',
  }
  const icons = { good: '✅', warning: '⚠️', bad: '❌' }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${styles[status]}`}>
      {icons[status]} {text}
    </span>
  )
}

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

export default function WixVsAgenceWeb() {
  return (
    <PageTransition>
      <SEOHead
        title="Wix vs Agence web : lequel choisir pour sa TPE ? | BNK Conseil"
        description="Comparatif honnête Wix vs agence web pour une TPE. Coûts réels, SEO, design, support : on compare tout. Guide 2025."
        canonical="https://bnk-conseil.com/guide/wix-vs-agence-web"
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
              <span className="text-gray-700 font-medium">Wix vs Agence web</span>
            </motion.nav>

            <div className="max-w-3xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-white/80 border border-violet-200 rounded-full px-4 py-1.5 text-sm font-medium text-violet-700 mb-6"
              >
                ⚖️ Comparatif
              </motion.div>

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4"
              >
                Wix vs Agence web :{' '}
                <span style={gradientText}>lequel choisir</span>{' '}
                pour votre TPE ?
              </motion.h1>

              {/* Reading time */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="flex items-center gap-2 text-sm text-gray-500 mb-6"
              >
                <span>⏱️ 5 min de lecture</span>
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
                Wix s'est imposé comme la solution no-code de référence. Mais pour une TPE qui a besoin
                d'un site qui génère des clients, est-ce vraiment le bon choix ?
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── 2-col layout ──────────────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="flex gap-12 items-start">

            {/* ── Article content ─────────────────────────────────────────── */}
            <article className="min-w-0 flex-1">

              {/* ── Section 1 : Wix ──────────────────────────────────────── */}
              <motion.section
                id="wix"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="mb-20 scroll-mt-24"
              >
                <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 mb-2">
                  Wix : les vrais avantages et limites
                </motion.h2>
                <motion.p variants={fadeUp} className="text-gray-500 text-base mb-8">
                  Soyons honnêtes : Wix a des qualités. Mais aussi des limites structurelles que peu d'articles mentionnent.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Avantages */}
                  <motion.div
                    variants={fadeUp}
                    className="bg-green-50 border border-green-200 rounded-2xl p-6"
                  >
                    <h3 className="font-semibold text-green-800 text-lg mb-4 flex items-center gap-2">
                      ✅ Avantages Wix
                    </h3>
                    <ul className="space-y-3">
                      {wixPros.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-green-800">
                          <span className="shrink-0 mt-0.5 text-green-500">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Limites */}
                  <motion.div
                    variants={fadeUp}
                    className="bg-red-50 border border-red-200 rounded-2xl p-6"
                  >
                    <h3 className="font-semibold text-red-800 text-lg mb-4 flex items-center gap-2">
                      ❌ Limites Wix
                    </h3>
                    <ul className="space-y-3">
                      {wixCons.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-red-800">
                          <span className="shrink-0 mt-0.5 text-red-400">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.section>

              {/* ── Section 2 : Agence ───────────────────────────────────── */}
              <motion.section
                id="agence"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="mb-20 scroll-mt-24"
              >
                <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 mb-2">
                  Agence web : les avantages réels
                </motion.h2>
                <motion.p variants={fadeUp} className="text-gray-500 text-base mb-8">
                  Ce que vous obtenez quand vous passez par une agence spécialisée TPE.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  className="rounded-2xl border border-violet-200 p-6 mb-6"
                  style={{ background: 'linear-gradient(135deg, #faf5ff, #ede9fe)' }}
                >
                  <ul className="space-y-4">
                    {agencePros.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-violet-800">
                        <span className="shrink-0 mt-0.5 text-violet-500 font-bold">✅</span>
                        <span className="text-base leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Key point callout */}
                <motion.div
                  variants={fadeUp}
                  className="rounded-2xl border-2 border-violet-300 p-5"
                  style={{ background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)' }}
                >
                  <p className="text-violet-900 font-bold text-base leading-relaxed">
                    💡 Point clé : un site d'agence spécialisée TPE ne coûte pas forcément plus cher
                    qu'un Wix sur 3 ans — et le résultat n'a rien à voir.
                  </p>
                </motion.div>
              </motion.section>

              {/* ── Section 3 : Comparaison ──────────────────────────────── */}
              <motion.section
                id="comparaison"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="mb-20 scroll-mt-24"
              >
                <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 mb-2">
                  Comparaison sur 5 critères clés
                </motion.h2>
                <motion.p variants={fadeUp} className="text-gray-500 text-base mb-8">
                  Une comparaison factuelle, sans langue de bois.
                </motion.p>

                <motion.div variants={stagger} className="space-y-4">
                  {comparisonRows.map((row, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
                    >
                      {/* Criterion header */}
                      <div className="bg-gray-50 border-b border-gray-100 px-6 py-3 flex items-center gap-2">
                        <span className="text-lg">{row.icon}</span>
                        <span className="font-bold text-gray-800 text-sm">{row.criterion}</span>
                      </div>

                      {/* Two columns */}
                      <div className="grid grid-cols-2 divide-x divide-gray-100">
                        <div className="p-5">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Wix</p>
                          <StatusBadge status={row.wix.status} text={row.wix.text} />
                        </div>
                        <div className="p-5">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Agence spécialisée</p>
                          <StatusBadge status={row.agence.status} text={row.agence.text} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>

              {/* ── Mid-article CTA ──────────────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-20 rounded-2xl border border-violet-200 p-8 text-center"
                style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)' }}
              >
                <p className="text-violet-900 font-bold text-xl mb-2">
                  Pas encore convaincu ?
                </p>
                <p className="text-violet-700 text-base mb-6">
                  Visualisez votre futur site gratuitement en 2 minutes.
                </p>
                <Link
                  to="/apercu-site"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-violet-300/50 hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                >
                  Voir un aperçu de mon site
                </Link>
              </motion.div>

              {/* ── Section 4 : Pour qui Wix est adapté ─────────────────── */}
              <motion.section
                id="wix-adapte"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="mb-20 scroll-mt-24"
              >
                <motion.h2 variants={fadeUp} className="text-2xl font-bold text-gray-900 mb-2">
                  Pour qui Wix est adapté
                </motion.h2>
                <motion.p variants={fadeUp} className="text-gray-500 text-base mb-8">
                  Wix n'est pas mauvais en soi. Il est juste inadapté à certains besoins.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Wix OK */}
                  <motion.div
                    variants={fadeUp}
                    className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
                  >
                    <h3 className="font-semibold text-gray-700 text-lg mb-4 flex items-center gap-2">
                      ✅ Wix OK pour :
                    </h3>
                    <ul className="space-y-3">
                      {wixOkFor.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                          <span className="shrink-0 mt-0.5 text-gray-400">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Wix insuffisant */}
                  <motion.div
                    variants={fadeUp}
                    className="border-2 border-violet-200 rounded-2xl p-6"
                    style={{ background: 'linear-gradient(135deg, #faf5ff, #ede9fe)' }}
                  >
                    <h3 className="font-semibold text-violet-800 text-lg mb-4 flex items-center gap-2">
                      ❌ Wix insuffisant pour :
                    </h3>
                    <ul className="space-y-3">
                      {wixNotFor.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-violet-700 font-medium">
                          <span className="shrink-0 mt-0.5">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
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
                  Ce que les TPE nous demandent le plus souvent.
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
                  Prêt à faire le bon choix ?
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  Un site professionnel livré en 2 semaines, à partir de 690€.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/tarifs"
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-violet-300/50 hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                  >
                    Voir les tarifs
                  </Link>
                  <Link
                    to="/pourquoi-pas-faire-soi-meme"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-violet-300 bg-white px-7 py-3.5 text-base font-semibold text-violet-700 transition-all duration-300 hover:bg-violet-50 hover:-translate-y-0.5"
                  >
                    Pourquoi pas faire soi-même ?
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
                    Convaincu par l'agence ?
                  </p>
                  <p className="text-sm text-violet-700 mb-5 leading-relaxed">
                    Obtenez un devis gratuit et personnalisé sous 24h.
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

                {/* Related guide */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                    Guide lié
                  </p>
                  <Link
                    to="/guide/combien-coute-un-site-vitrine"
                    className="flex items-start gap-3 group"
                  >
                    <span className="text-xl shrink-0">📖</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-violet-600 transition-colors leading-snug">
                        Combien coûte un site vitrine en 2025 ?
                      </p>
                      <p className="text-xs text-gray-500 mt-1">7 min · Guide complet</p>
                    </div>
                  </Link>
                </div>

              </div>
            </aside>

          </div>
        </div>

      </div>
    </PageTransition>
  )
}
