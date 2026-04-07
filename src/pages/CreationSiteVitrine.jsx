import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import SEOHead from '../components/SEOHead'
import FAQ from '../components/FAQ'

const CALENDLY_URL = 'https://calendly.com/conseil-bnk/30min'

const gradientText = {
  background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

// ─── Données ──────────────────────────────────────────────────────────────────

const secteurs = [
  {
    emoji: '🍽️',
    label: 'Restauration',
    description: "Menu en ligne, réservation, carte Google, photos pro. Un site qui donne envie de venir.",
  },
  {
    emoji: '🔧',
    label: 'Artisanat',
    description: "Galerie de réalisations, formulaire de devis, avis clients, référencement local.",
  },
  {
    emoji: '🎓',
    label: 'Formation & Coaching',
    description: "Page programme, témoignages, module de contact, tunnel vers inscription.",
  },
  {
    emoji: '🛍️',
    label: 'Commerce local',
    description: "Horaires, localisation, catalogue, promotions. Visible sur Google Maps.",
  },
  {
    emoji: '💼',
    label: 'Prestataires de services',
    description: "Crédibilité, portfolio, références clients, prise de rendez-vous en ligne.",
  },
]

const inclus = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Design sur-mesure',
    description: "Un design pensé pour votre secteur, vos couleurs et votre clientèle. Pas de template générique.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: 'SEO technique optimisé',
    description: "Balises meta, schema markup, sitemap, robots.txt, vitesse de chargement. Prêt pour Google dès le lancement.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: 'Mobile-first',
    description: "60% des recherches se font sur mobile. Votre site est conçu pour être parfait sur tous les écrans.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: 'Formulaire de contact',
    description: "Formulaire de prise de contact ou de devis intégré, relié à votre boîte mail.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
      </svg>
    ),
    title: 'Analytics & suivi',
    description: "Tableau de bord simple pour suivre vos visiteurs, vos sources de trafic et les pages les plus consultées.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'SEO local & Google Maps',
    description: "Fiche Google Business Profile créée et optimisée. Vous apparaissez dans les recherches locales de votre zone.",
  },
]

const pourquoi = [
  {
    stat: '97%',
    label: 'des internautes cherchent un commerce local en ligne avant de se déplacer',
  },
  {
    stat: '75%',
    label: "des clics Google vont aux 3 premiers résultats : un site optimisé est indispensable",
  },
  {
    stat: '2–4 sem.',
    label: "délai de livraison pour un site vitrine complet, de la maquette à la mise en ligne",
  },
]

const faqItems = [
  {
    question: "Combien coûte la création d'un site vitrine ?",
    answer: 'Nos sites vitrines démarrent à partir de 690 €. Le tarif varie selon le nombre de pages, les fonctionnalités souhaitées (galerie, réservation en ligne, e-shop…) et la complexité du design. Devis gratuit après un appel de 20 min.',
  },
  {
    question: 'Combien de temps pour livrer le site ?',
    answer: 'Entre 2 et 4 semaines selon la complexité. La maquette vous est présentée dans les 5 premiers jours ouvrés. Vous validez, on intègre, on met en ligne.',
  },
  {
    question: 'Est-ce que vous créez des sites pour tous les secteurs ?',
    answer: "Oui : restauration, artisanat, commerce local, formation, coaching, prestataires de services. Chaque secteur a ses codes visuels et ses attentes clients, on les connaît.",
  },
  {
    question: "Je n'ai pas de contenu (textes, photos). Vous pouvez aider ?",
    answer: "Absolument. On rédige vos textes SEO-optimisés et on peut vous orienter vers des banques d'images professionnelles ou des photographes partenaires. On s'adapte à ce que vous avez.",
  },
  {
    question: 'Le site sera-t-il trouvé sur Google ?',
    answer: "Oui, c'est une priorité. Chaque site est livré avec les fondations SEO en place : balises meta, schema, sitemap, vitesse optimisée, et fiche Google Business Profile. Les résultats SEO prennent 1 à 3 mois à se concrétiser.",
  },
]

// ─── Composant ────────────────────────────────────────────────────────────────

export default function CreationSiteVitrine() {
  return (
    <PageTransition>
      <SEOHead
        title="Création Site Vitrine Artisan & TPE | Site Web Pro | BNK Conseil"
        description="Création de site vitrine pour artisans, restaurateurs et TPE. Site pro, rapide, optimisé SEO local. Devis gratuit en 30 min. Livraison 2-4 semaines."
        canonical="https://bnk-conseil-1z3b.vercel.app/creation-site-vitrine"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': 'https://bnk-conseil-1z3b.vercel.app/creation-site-vitrine#webpage',
          url: 'https://bnk-conseil-1z3b.vercel.app/creation-site-vitrine',
          name: 'Création Site Vitrine TPE & Artisan - BNK Conseil',
          description: "Création de site vitrine pour artisans, restaurateurs et TPE. Site pro, rapide, optimisé SEO local.",
          inLanguage: 'fr-FR',
          isPartOf: { '@id': 'https://bnk-conseil-1z3b.vercel.app/#website' },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://bnk-conseil-1z3b.vercel.app/' },
              { '@type': 'ListItem', position: 2, name: 'Création Site Vitrine', item: 'https://bnk-conseil-1z3b.vercel.app/creation-site-vitrine' },
            ],
          },
        }}
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
              to="/offres"
              className="inline-flex items-center gap-2 text-violet-600 text-sm font-medium mb-6 hover:text-violet-700 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Toutes les offres
            </Link>
            <span className="block text-violet-600 text-sm font-semibold uppercase tracking-widest mb-4">Site web artisan · site vitrine TPE</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Création{' '}
              <span style={gradientText}>site vitrine</span>
              {' '}pour TPE, Artisans & Restaurateurs
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mb-8 leading-relaxed">
              Un site professionnel, rapide à livrer, optimisé pour Google et conçu pour convertir vos visiteurs en clients. Site vitrine pas cher TPE, devis gratuit en 20 min.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base transition-all duration-300 hover:shadow-xl hover:shadow-violet-300/50 hover:-translate-y-1"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
              >
                Demander un devis gratuit
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <p className="flex items-center text-gray-500 text-sm">
                ✓ Gratuit · ✓ Sans engagement · ✓ Réponse 24h
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Chiffres clés ──────────────────────────────────────────────── */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {pourquoi.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white border border-violet-100"
              >
                <div className="text-3xl font-black mb-2" style={gradientText}>{item.stat}</div>
                <p className="text-gray-500 text-sm leading-relaxed">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Secteurs couverts ──────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Secteurs{' '}
              <span style={gradientText}>couverts</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Chaque secteur a ses codes. On conçoit votre site en fonction de ce que vos clients cherchent vraiment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {secteurs.map((secteur, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-violet-300 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl" role="img" aria-label={secteur.label}>{secteur.emoji}</span>
                  <h3 className="text-gray-900 font-bold text-base">{secteur.label}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{secteur.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ce qui est inclus ──────────────────────────────────────────── */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #fdf4ff 100%)' }}>
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
              <span style={gradientText}>chaque site</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Pas de fonctionnalités inutiles. Tout ce qu'il faut, rien de plus.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {inclus.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex gap-4 p-5 rounded-2xl bg-white border border-violet-100 hover:border-violet-300 hover:shadow-sm transition-all duration-200"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-violet-600 flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(168,85,247,0.06))' }}
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

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #fce7f3 50%, #dbeafe 100%)' }}
      >
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Votre site vitrine,{' '}
              <span style={gradientText}>livré en 2 semaines</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
              20 minutes pour discuter de votre projet. On vous dit ce qu'on peut faire, en combien de temps, et pour quel budget.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-white text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-violet-400/40 hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
            >
              Demander un devis gratuit
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <p className="text-gray-500 text-sm mt-4">Gratuit · Sans engagement · Réponse sous 24h</p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
              Questions sur la création de site vitrine
            </h2>
          </motion.div>
          <FAQ items={faqItems} />
        </div>
      </section>

    </PageTransition>
  )
}
