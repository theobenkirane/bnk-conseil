import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import SEOHead from '../components/SEOHead'
import FAQ from '../components/FAQ'

const CALENDLY_URL = 'https://calendly.com/conseil-bnk/30min'

const gradientText = {
  background: 'linear-gradient(135deg, #066377, #3B9BB3)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

// ─── Données ──────────────────────────────────────────────────────────────────

const inclus = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: 'On dissèque votre pipeline',
    description: "On retrace chaque étape de votre vente pour repérer où ça coince et combien de clients vous laissez filer sans le savoir.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Des mots qui font signer',
    description: "Scripts d'appel, mails de prospection, pitchs : on écrit ou on remet d'aplomb tout ce qui vous fait perdre des clients à l'oral comme à l'écrit.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    title: 'Un CRM, pas une usine à gaz',
    description: "On installe un outil à votre taille pour suivre vos prospects et automatiser vos relances. Fini les relances oubliées et le post-it perdu.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: '3 à 5 chiffres à regarder, pas 50',
    description: "On choisit ensemble les rares indicateurs qui comptent vraiment, à checker chaque semaine. Vous pilotez votre boîte au lieu de la subir.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    title: "Un plan d'action, pas un PDF qui dort",
    description: "5 à 10 actions concrètes, classées par impact, avec qui fait quoi et pour quand. Vous savez exactement par où commencer lundi matin.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'On reste là chaque mois',
    description: "45 min par mois pour regarder les résultats en face, ajuster ce qui doit l'être et débloquer ce qui vous bloque. Pas de mission qu'on lâche après la facture.",
  },
]

const cibles = [
  { emoji: '🔧', label: 'Artisans et commerçants' },
  { emoji: '🍽️', label: 'Restaurateurs et hôteliers' },
  { emoji: '💼', label: 'Prestataires de services B2B' },
  { emoji: '🎓', label: 'Coachs et formateurs indépendants' },
  { emoji: '🏗️', label: 'TPE du BTP et de la rénovation' },
  { emoji: '📱', label: 'Startups early-stage' },
]

const resultats = [
  { value: '+40%', label: 'CA moyen', sublabel: "sur 6 mois d'accompagnement" },
  { value: '30j', label: 'Premiers résultats', sublabel: 'leads, RDV qualifiés, visibilité' },
  { value: '50+', label: 'Missions réalisées', sublabel: 'depuis 2022' },
]

const faqItems = [
  {
    question: 'Combien coûte un audit commercial ?',
    answer: 'Les missions démarrent à 390 €. Le tarif dépend de la durée et de ce qu\'il y a à débroussailler chez vous. Vous avez un devis clair après l\'appel découverte gratuit, sans surprise et sans ligne cachée.',
  },
  {
    question: "Combien de temps dure l'accompagnement commercial ?",
    answer: "De 1 à 12 mois, c'est vous qui voyez. La première phase (diagnostic + plan d'action) est bouclée en 1 à 2 semaines. Ensuite vous choisissez si on continue ensemble ou si vous prenez le relais en solo.",
  },
  {
    question: 'Vous travaillez avec tous les secteurs ?',
    answer: "Oui. Artisans, restaurateurs, prestataires, startups, formateurs indépendants… La méthode reste la même, mais on la colle à votre terrain et à vos clients à vous. Pas de recette toute faite.",
  },
  {
    question: "Je n'ai pas de process commercial du tout. C'est trop tôt pour moi ?",
    answer: "Au contraire, c'est le moment parfait. Une feuille blanche, c'est zéro mauvaise habitude à désapprendre. On construit propre du premier coup au lieu de réparer le bazar plus tard.",
  },
  {
    question: 'Quels résultats puis-je espérer ?',
    answer: 'En moyenne : +40% de chiffre d\'affaires sur 6 mois, 3× plus de rendez-vous qui valent le coup, et beaucoup moins de temps perdu à courir après des prospects qui ne signeront jamais. Après, je vous mens pas : ça dépend aussi de votre secteur et de ce que vous y mettez.',
  },
]

// ─── Composant ────────────────────────────────────────────────────────────────

export default function AuditCommercial() {
  return (
    <PageTransition>
      <SEOHead
        title="Audit Commercial TPE | Consultant Commercial Indépendant | BNK Conseil"
        description="Audit commercial pour TPE et indépendants. On trouve où partent vos clients, on structure votre process de vente, on suit les bons KPIs. RDV gratuit en 2 min."
        canonical="https://bnk-conseil.com/audit-commercial"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': 'https://bnk-conseil.com/audit-commercial#webpage',
          url: 'https://bnk-conseil.com/audit-commercial',
          name: 'Audit Commercial TPE - BNK Conseil',
          description: "Audit commercial et accompagnement pour TPE et indépendants. Consultant commercial dédié.",
          inLanguage: 'fr-FR',
          isPartOf: { '@id': 'https://bnk-conseil.com/#website' },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://bnk-conseil.com/' },
              { '@type': 'ListItem', position: 2, name: 'Audit Commercial', item: 'https://bnk-conseil.com/audit-commercial' },
            ],
          },
        }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="pt-32 pb-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.12) 60%, rgba(255,255,255,0) 100%)' }}
      >
        <div
          className="absolute top-0 left-1/4 w-96 h-72 opacity-40 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(196,181,253,0.6), transparent)', filter: 'blur(60px)' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/offres"
              className="inline-flex items-center gap-2 text-[#066377] text-sm font-medium mb-6 hover:text-[#154359] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Toutes les offres
            </Link>
            <span className="block text-[#066377] text-sm font-semibold uppercase tracking-widest mb-4">Audit commercial TPE</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Structurez votre{' '}
              <span style={gradientText}>process de vente</span>
              {' '}, consultant commercial indépendant
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mb-8 leading-relaxed">
              Vous vendez bien, mais en mode débrouille. On met de l'ordre : on regarde où partent vos clients, on construit un vrai process de vente, et on reste à vos côtés chaque mois. Du concret, pas du jargon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/rdv"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base transition-all duration-300 hover:shadow-xl hover:shadow-[#3B9BB3]/50 hover:-translate-y-1"
                style={{ background: 'linear-gradient(135deg, #066377, #3B9BB3)' }}
              >
                Réserver un diagnostic gratuit
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <p className="flex items-center text-gray-500 text-sm">
                ✓ Gratuit · ✓ Sans engagement · ✓ 20 min
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Garanties */}
      <section className="py-12 bg-white/45 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: '📊', title: 'Des chiffres, pas des promesses', desc: 'Objectifs posés dès le départ, suivis chaque mois. On mesure, vous voyez.' },
                { icon: '🤝', title: 'Un seul interlocuteur', desc: "Pas un standard ni un junior. Moi, qui connais votre métier et votre terrain." },
                { icon: '✅', title: 'Du résultat dès le 1er mois', desc: "Un plan clair et les premières améliorations visibles avant la fin du mois." },
              ].map((g) => (
                <div key={g.title} className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm flex gap-4 items-start">
                  <span className="text-2xl">{g.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm">{g.title}</h3>
                    <p className="text-gray-500 text-sm">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Résultats ──────────────────────────────────────────────────── */}
      <section className="py-12 bg-white/45 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {resultats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white border border-[#F0F0F0]"
              >
                <div className="text-4xl font-black mb-1" style={gradientText}>{stat.value}</div>
                <div className="text-gray-800 font-semibold text-sm">{stat.label}</div>
                <div className="text-gray-400 text-xs mt-0.5">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ce qui est inclus ──────────────────────────────────────────── */}
      <section className="py-20 bg-white/45 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Ce qui est inclus dans{' '}
              <span style={gradientText}>l'audit commercial</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Du premier coup d'oeil sur votre organisation au suivi des résultats. Rien laissé au hasard.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {inclus.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex gap-4 p-5 rounded-2xl bg-white border border-gray-200 hover:border-[#3B9BB3] hover:shadow-sm transition-all duration-200"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-[#066377] flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(6,99,119,0.1), rgba(6,99,119,0.06))' }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-gray-900 font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pour qui ? ─────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #F0F5F7 0%, #fdf4ff 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Améliorer son process de vente :{' '}
              <span style={gradientText}>pour qui ?</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Pensé pour les TPE et les indépendants. Pas pour les grands groupes avec un service commercial de 30 personnes.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {cibles.map((cible, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#F0F0F0]"
              >
                <span className="text-2xl" role="img" aria-label={cible.label}>{cible.emoji}</span>
                <span className="text-gray-700 text-sm font-medium">{cible.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #F0F5F7 0%, #fce7f3 50%, #dbeafe 100%)' }}
      >
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Prêt à structurer votre{' '}
              <span style={gradientText}>croissance commerciale ?</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
              20 minutes au téléphone, gratuit. On fait le point sur votre situation, et je vous dis cash ce qu'il y a à débloquer. Sans engagement.
            </p>
            <Link
              to="/rdv"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-white text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-[#066377]/40 hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg, #066377, #3B9BB3)' }}
            >
              Réserver mon diagnostic gratuit
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="text-gray-500 text-sm mt-4">Gratuit · Sans engagement · 20 min</p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white/45 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
              Questions sur l'audit commercial
            </h2>
          </motion.div>
          <FAQ items={faqItems} />
        </div>
      </section>

    </PageTransition>
  )
}
