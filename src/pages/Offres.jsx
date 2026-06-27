import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import OfferCard from '../components/OfferCard'
import FAQ from '../components/FAQ'
import SEOHead from '../components/SEOHead'

const sectorPages = [
  { label: 'Restaurant', emoji: '🍽️', path: '/creation-site-vitrine-restaurant', desc: 'Le menu qui donne faim, les résa, et Google Maps qui vous trouve' },
  { label: 'Artisan', emoji: '🔧', path: '/creation-site-vitrine-artisan', desc: 'Devis en ligne, vos plus beaux chantiers, vos zones d\'intervention' },
  { label: 'Coach / Formation', emoji: '🎓', path: '/creation-site-vitrine-coach', desc: 'Vos programmes, les avis clients qui rassurent, le RDV en un clic' },
  { label: 'Commerce local', emoji: '🛍️', path: '/creation-site-vitrine-commerce-local', desc: 'Horaires à jour, catalogue, click & collect' },
]

const guidePages = [
  { label: 'Un site vitrine, ça coûte combien au juste ?', path: '/guide/combien-coute-un-site-vitrine', emoji: '💰' },
  { label: 'Wix ou agence web  -  on tranche', path: '/guide/wix-vs-agence-web', emoji: '⚖️' },
  { label: 'Le faire soi-même, vraiment ?', path: '/pourquoi-pas-faire-soi-meme', emoji: '🤔' },
]

const cityPages = [
  { label: 'Lyon', path: '/creation-site-vitrine-lyon' },
  { label: 'Paris', path: '/creation-site-vitrine-paris' },
  { label: 'Bordeaux', path: '/creation-site-vitrine-bordeaux' },
]

const fadeUpView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

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
    description: "On regarde tout : comment vous trouvez des clients, comment vous les convertissez, ce qui coince. Puis on remet la machine commerciale d'aplomb — et on reste à côté de vous le temps qu'il faut.",
    benefits: [
      'On dissèque votre façon de vendre, de A à Z',
      'On repère les leviers qui rapportent vraiment',
      "On construit votre stratégie à deux mains",
      "Un plan d'action avec des premiers résultats sous 30 jours",
      'Les chiffres suivis chaque mois, et on ajuste en route',
      'Une question ? Vous me joignez direct, autant que vous voulez',
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
    description: "Un site qui fait signer, pas fuir. Pour les TPE, artisans et restaurateurs. Beau, rapide, bien placé sur Google, livré en 2 à 4 semaines.",
    benefits: [
      'Un design taillé pour vous, nickel sur mobile comme sur grand écran',
      'Bien référencé pour que Google vous mette en avant',
      'Formulaire de contact et prise de RDV branchés direct',
      'Hébergement et nom de domaine offerts la 1ère année',
      'On vous montre comment modifier votre contenu vous-même',
      'On reste joignable 3 mois après la mise en ligne',
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
    answer: "On passe votre façon de vendre au crible : comment vous trouvez vos clients, comment vous les convertissez, et surtout où ça coince. On repère les leviers qui rapportent et on pose un plan d'action concret, avec des chiffres en face — pas du vent.",
  },
  {
    question: "Je suis seul dans ma boîte, c'est fait pour moi ?",
    answer: "C'est même pile pour ça que BNK Conseil existe. Vous n'allez pas embaucher un directeur commercial à plein temps ni vous payer une grosse agence. Je joue ce rôle quand vous en avez besoin, à votre rythme et dans votre budget.",
  },
  {
    question: "Combien de temps dure une mission ?",
    answer: "L'audit commercial, c'est de 1 à 12 mois selon ce qu'on creuse. Le site vitrine, 2 à 4 semaines. Dans tous les cas, on démarre par un appel de 30 minutes pour voir clair sur ce dont vous avez vraiment besoin.",
  },
  {
    question: "Est-ce que vous garantissez des résultats ?",
    answer: "Je ne vends pas de miracle, et méfiez-vous de ceux qui le font. Ce que je garantis : des objectifs clairs dès le départ, les chiffres suivis chaque mois, et un coup de fil franc si un truc ne marche pas. Mes clients voient les premiers effets en moins de 30 jours.",
  },
  {
    question: "Vous travaillez avec quels types d'entreprises ?",
    answer: "TPE, jeunes boîtes qui se lancent ou qui décollent, indépendants qui veulent enfin vendre pour de vrai. Le secteur n'a pas d'importance — je m'adapte à votre terrain.",
  },
]

export default function Offres() {
  return (
    <PageTransition>
      <SEOHead
        title="Nos Offres : Audit Commercial & Création Site Vitrine | BNK Conseil"
        description="Deux offres, zéro blabla : un audit commercial avec suivi des chiffres, et un site vitrine qui fait signer pour TPE, artisans et restaurateurs. Sur devis, résultats mesurables."
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
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.12) 60%, rgba(255,255,255,0) 100%)' }}
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
            <span className="text-[#066377] text-sm font-semibold uppercase tracking-widest">Ce que je fais</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mt-4 mb-6">
              Deux façons de vous faire{' '}
              <span style={{
                background: 'linear-gradient(135deg, #066377, #3B9BB3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>vendre plus</span>
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Un site qui fait signer, une organisation commerciale qui tourne. L'un, l'autre, ou les deux — à vous de voir.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grille des offres */}
      <section className="py-16 bg-white/45 backdrop-blur-sm">
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

      {/* Section Par secteur */}
      <section className="py-16 bg-gray-50/35 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUpView(0)} className="text-center mb-10">
            <span className="text-[#066377] text-sm font-semibold uppercase tracking-widest">Sites vitrines</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2 mb-3">Par secteur d'activité</h2>
            <p className="text-gray-500">Un site pensé pour votre métier — pas un template recopié 400 fois.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sectorPages.map((s, i) => (
              <motion.div key={s.path} {...fadeUpView(i * 0.08)}>
                <Link
                  to={s.path}
                  className="group flex flex-col bg-white rounded-2xl border border-gray-100 p-5 hover:border-[#3B9BB3] hover:shadow-md hover:shadow-[#F0F0F0]/50 transition-all duration-300"
                >
                  <span className="text-3xl mb-3">{s.emoji}</span>
                  <span className="font-bold text-gray-900 text-sm mb-1 group-hover:text-[#154359] transition-colors">{s.label}</span>
                  <span className="text-gray-500 text-xs leading-relaxed">{s.desc}</span>
                  <span className="mt-3 text-[#066377] text-xs font-semibold group-hover:translate-x-1 transition-transform inline-block">
                    Voir la page →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Villes */}
          <motion.div {...fadeUpView(0.3)} className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Villes :</span>
            {cityPages.map((c) => (
              <Link
                key={c.path}
                to={c.path}
                className="text-sm font-medium px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-[#066377] hover:text-[#154359] transition-colors"
              >
                {c.label}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section Guides */}
      <section className="py-16 bg-white/45 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUpView(0)} className="text-center mb-10">
            <span className="text-[#066377] text-sm font-semibold uppercase tracking-widest">Ressources</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">Guides gratuits</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {guidePages.map((g, i) => (
              <motion.div key={g.path} {...fadeUpView(i * 0.1)}>
                <Link
                  to={g.path}
                  className="group flex items-start gap-4 bg-[#F0F5F7] border border-[#F0F0F0] rounded-2xl p-5 hover:border-[#3B9BB3] hover:bg-[#F0F5F7]/80 transition-all duration-300"
                >
                  <span className="text-2xl flex-shrink-0">{g.emoji}</span>
                  <div>
                    <span className="font-semibold text-gray-800 text-sm leading-snug group-hover:text-[#154359] transition-colors block mb-1">
                      {g.label}
                    </span>
                    <span className="text-[#066377] text-xs font-semibold group-hover:translate-x-1 transition-transform inline-block">
                      Lire le guide →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Questions fréquentes */}
      <section className="py-20 bg-white/45 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-[#066377] text-sm font-semibold uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-gray-500 text-lg">
              Tout ce que vous vous demandez avant de décrocher votre téléphone.
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
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #F0F5F7 0%, #fdf4ff 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Vous hésitez entre les deux ?
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              30 minutes au téléphone, je comprends votre situation et je vous dis franchement ce qui vous servira le plus. Si c'est rien, je vous le dis aussi. Sans engagement.
            </p>
            <a
              href="/rdv"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base transition-all duration-300 hover:shadow-xl hover:shadow-[#3B9BB3]/40 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #066377, #3B9BB3)' }}
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
