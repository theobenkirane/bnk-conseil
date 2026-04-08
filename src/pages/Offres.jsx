import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import OfferCard from '../components/OfferCard'
import FAQ from '../components/FAQ'
import SEOHead from '../components/SEOHead'

// Les 2 offres principales
const offers = [
  {
    id: 'audit',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: 'Audit Commercial & Accompagnement',
    description: "Un diagnostic complet de votre organisation commerciale, suivi d'un accompagnement stratégique pour structurer et accélérer votre croissance.",
    benefits: [
      'Analyse complète du processus de vente',
      'Identification des leviers de croissance prioritaires',
      "Co-construction de la stratégie commerciale",
      "Plan d'action avec résultats attendus sous 30 jours",
      'Suivi mensuel des KPIs et ajustements en temps réel',
      'Accès direct et illimité pour toutes vos questions',
    ],
    duration: '1 mois à 12 mois',
    price: 'À partir de 390€',
    link: '/audit-commercial',
  },
  {
    id: 'site-vitrine',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <polyline points="8 21 12 17 16 21" />
        <path d="M7 8h.01M11 8h6" />
        <path d="M7 12h.01M11 12h6" />
      </svg>
    ),
    title: 'Création Site Vitrine',
    description: "Création de site web professionnel pour TPE, artisans et restaurateurs. Design moderne, SEO optimisé, livré en 2 à 4 semaines.",
    benefits: [
      'Design sur-mesure et responsive (mobile, tablette, desktop)',
      'Optimisation SEO pour être trouvé sur Google',
      'Formulaire de contact et prise de rendez-vous intégrés',
      'Hébergement et nom de domaine inclus la 1ère année',
      'Formation à la mise à jour du contenu',
      'Support technique inclus 3 mois après livraison',
    ],
    duration: '2 à 4 semaines',
    price: 'À partir de 690€',
    link: '/creation-site-vitrine',
  },
]

// Questions fréquentes
const faqItems = [
  {
    question: "C'est quoi exactement un audit commercial ?",
    answer: "Un audit commercial, c'est un diagnostic complet de votre organisation de vente : comment vous trouvez des clients, comment vous les convertissez, ce qui bloque. On identifie les leviers prioritaires et on construit ensemble un plan d'action concret avec des objectifs chiffrés.",
  },
  {
    question: "Je suis seul dans ma boîte, c'est fait pour moi ?",
    answer: "C'est exactement pour ça que BNK Conseil existe. Les TPE et solopreneurs n'ont pas les ressources pour recruter un directeur commercial ou une agence digitale. On joue ce rôle de manière flexible et opérationnelle, selon votre rythme et votre budget.",
  },
  {
    question: "Combien de temps dure une mission ?",
    answer: "L'audit commercial dure de 1 à 12 mois selon la profondeur de l'accompagnement. La création de site vitrine prend 2 à 4 semaines selon le scope. On démarre toujours par un appel découverte de 30 minutes pour cadrer précisément ce dont vous avez besoin.",
  },
  {
    question: "Est-ce que vous garantissez des résultats ?",
    answer: "On ne vend pas de miracles. Ce qu'on garantit : des objectifs clairs dès le départ, un suivi mensuel des KPIs, et une communication directe si quelque chose ne fonctionne pas. Nos clients voient les premiers résultats en moins de 30 jours.",
  },
  {
    question: "Vous travaillez avec quels types d'entreprises ?",
    answer: "TPE, startups en phase de lancement ou de croissance, indépendants qui veulent professionnaliser leur développement commercial. Peu importe le secteur, notre approche s'adapte à votre contexte.",
  },
]

export default function Offres() {
  return (
    <PageTransition>
      <SEOHead
        title="Nos Offres : Audit Commercial & Création Site Vitrine | BNK Conseil"
        description="Deux offres pour structurer votre croissance : audit commercial avec suivi KPI, et création de site vitrine pour TPE, artisans et restaurateurs. Sur devis, résultats mesurables."
        canonical="https://bnk-conseil.com/offres"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://bnk-conseil.com/offres#webpage",
          "url": "https://bnk-conseil.com/offres",
          "name": "Nos Offres - BNK Conseil",
          "description": "Deux offres complémentaires pour structurer votre croissance commerciale et renforcer votre visibilité digitale.",
          "inLanguage": "fr-FR",
          "isPartOf": { "@id": "https://bnk-conseil.com/#website" },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://bnk-conseil.com/" },
              { "@type": "ListItem", "position": 2, "name": "Nos Offres", "item": "https://bnk-conseil.com/offres" }
            ]
          }
        }}
      />

      {/* En-tête de page */}
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
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Ce que l'on fait</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mt-4 mb-6">
              Nos offres d'accompagnement{' '}
              <span style={{
                background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>commercial et digital</span>
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Deux solutions complémentaires pour structurer votre croissance commerciale et renforcer votre visibilité en ligne.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grille des offres */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {offers.map((offer, i) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Questions fréquentes */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-gray-500 text-lg">
              Tout ce que vous voulez savoir avant de nous contacter.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <FAQ items={faqItems} />
          </motion.div>
        </div>
      </section>

      {/* Bandeau CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #fdf4ff 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Pas certain de quelle offre vous convient ?
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              On fait un appel de 30 minutes, on comprend votre situation, et on vous recommande la meilleure approche. Sans engagement.
            </p>
            <a
              href="/rdv"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base transition-all duration-300 hover:shadow-xl hover:shadow-violet-300/40 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
            >
              Discutons-en gratuitement
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

    </PageTransition>
  )
}
