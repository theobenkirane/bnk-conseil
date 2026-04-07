import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import AnimatedCounter from '../components/AnimatedCounter'
import SEOHead from '../components/SEOHead'
import FAQ from '../components/FAQ'
import TestimonialCarousel from '../components/TestimonialCarousel'

// ─── Constantes ───────────────────────────────────────────────────────────────

const CALENDLY_URL = 'https://calendly.com/conseil-bnk/30min'

const gradientText = {
  background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

// ─── Données ──────────────────────────────────────────────────────────────────

const problemes = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Plus de leads qualifiés',
    description: 'Arrêtez de courir après des prospects non pertinents. On structure votre acquisition pour attirer des clients qui correspondent vraiment à votre offre.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
    title: 'Suivi commercial structuré',
    description: 'Fini les relances oubliées et les opportunités perdues. Un CRM simple et des scripts de suivi pour ne plus laisser passer aucune vente.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <rect x="2" y="3" width="20" height="14" rx="2" /><polyline points="8 21 12 17 16 21" />
        <path d="M7 8h.01M11 8h6M7 12h.01M11 12h6" />
      </svg>
    ),
    title: 'Un site qui convertit',
    description: "Votre site vitrine doit travailler pour vous 24h/24. On le conçoit pour transformer les visiteurs en prospects qualifiés, même pendant votre sommeil.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Process de vente clair',
    description: "De la prospection à la signature : un process défini, reproductible, adapté à votre secteur pour gagner plus en dépensant moins d'énergie.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Visibilité locale renforcée',
    description: "Être trouvé sur Google par les clients de votre zone. SEO local, Google Business Profile et contenus adaptés à votre marché de proximité.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: 'Croissance sans recruter',
    description: "Scaler sans embaucher, c'est possible. Automatisation, outils digitaux et stratégie : on fait travailler les bons leviers pour vous.",
  },
]

const pourQuiOui = [
  'TPE et PME de moins de 20 personnes',
  'Artisans et commerçants locaux',
  'Restaurateurs et hôteliers',
  'Prestataires de services B2B ou B2C',
  'Coachs et formateurs indépendants',
  'Startups early-stage cherchant à structurer leur vente',
]

const pourQuiNon = [
  'Grandes entreprises de plus de 50 personnes',
  'E-commerce pur sans ancrage local',
  "Ceux qui veulent des résultats sans s'impliquer",
  'Projets avec modèle économique non viable',
]

const whyBNK = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Expertise terrain',
    description: 'Un consultant issu du terrain commercial, pas de la théorie. Votre réalité, on la connaît.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
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

const offerPreviews = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: 'Audit Commercial & Accompagnement',
    description: 'Diagnostic complet de votre organisation commerciale, co-construction de la stratégie et suivi des performances.',
    link: '/audit-commercial',
    linkLabel: "Découvrir l'audit →",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <rect x="2" y="3" width="20" height="14" rx="2" /><polyline points="8 21 12 17 16 21" />
        <path d="M7 8h.01M11 8h6M7 12h.01M11 12h6" />
      </svg>
    ),
    title: 'Digitalisation & Visibilité',
    description: 'Création de site web, gestion des réseaux sociaux et mise en place des outils digitaux pour générer des leads.',
    link: '/creation-site-vitrine',
    linkLabel: 'Découvrir le site vitrine →',
  },
]

const methode = [
  {
    num: '01',
    title: 'Diagnostic gratuit',
    description: '20 minutes pour comprendre votre situation, vos objectifs et vos blocages. Aucune obligation, aucun pitch.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Stratégie sur-mesure',
    description: "Un plan d'action adapté à votre structure, votre secteur et vos ressources. Pas de copier-coller, pas de template.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Mise en place opérationnelle',
    description: 'On implémente ensemble : CRM, site web, scripts de vente, processus. Concret, rapide, efficace.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Suivi & optimisation',
    description: 'Reporting mensuel, ajustements en temps réel. On mesure ce qui marche et on amplifie les bons leviers.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
]

const casClients = [
  {
    emoji: '🔧',
    tag: 'Artisan plombier, Île-de-France',
    probleme: 'Aucune présence en ligne, dépendance totale au bouche-à-oreille, pas de site, pas de fiche Google.',
    actions: ['Création site vitrine optimisé SEO local', 'Fiche Google Business Profile', 'Scripts de relance devis'],
    resultat: '+35% de CA en 4 mois, 3× plus de demandes entrantes',
  },
  {
    emoji: '🎓',
    tag: 'Formatrice indépendante, Paris',
    probleme: 'Perte de temps en tâches admin, zéro prospect entrant, aucune visibilité sur LinkedIn.',
    actions: ['Automatisation emails et suivi prospects', 'Page LinkedIn optimisée', 'Tunnel de vente simple et efficace'],
    resultat: '−60% de temps admin, +12 prospects/mois en inbound',
  },
]

const faqItems = [
  {
    question: 'Combien coûte un audit commercial ?',
    answer: 'Nos missions démarrent à partir de 390 €. Le tarif varie selon la durée et la complexité de votre organisation commerciale. Nous établissons un devis personnalisé après un premier appel découverte gratuit de 20 minutes.',
  },
  {
    question: 'Je suis artisan, est-ce que ça me correspond ?',
    answer: "Absolument. Une grande partie de nos clients sont des artisans, restaurateurs et prestataires de services. Nos missions sont conçues pour les TPE et indépendants, quel que soit votre secteur d'activité.",
  },
  {
    question: 'Quels résultats puis-je attendre ?',
    answer: "En moyenne, nos clients constatent une croissance de +40% de leur chiffre d'affaires sur 6 mois. Les premiers résultats (leads, rendez-vous qualifiés, visibilité) sont généralement visibles dès les 30 premiers jours.",
  },
  {
    question: "Combien de temps dure l'accompagnement ?",
    answer: "L'accompagnement commercial dure de 1 à 12 mois selon vos objectifs. La création de site vitrine est réalisée en 2 à 4 semaines. Tout est adapté à votre rythme et vos ressources disponibles.",
  },
  {
    question: 'Est-ce que vous créez des sites pour tous les secteurs ?',
    answer: 'Oui. Nous créons des sites vitrines pour les restaurateurs, artisans, coachs, formateurs, commerces locaux et prestataires de services. Chaque site est conçu pour votre secteur et optimisé SEO local.',
  },
  {
    question: 'Puis-je scaler sans recruter ?',
    answer: "C'est justement notre approche. Nous mettons en place des processus, des outils et une stratégie qui vous permettent de croître sans forcément agrandir votre équipe. Automatisation, CRM, présence digitale : on fait travailler les outils à votre place.",
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

// ─── Composant ────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <PageTransition>
      <SEOHead
        title="BNK Conseil | Audit commercial & Digitalisation pour TPE"
        description="Audit commercial, création de site vitrine et digitalisation pour TPE et indépendants. Prenez RDV en 2 min."
        canonical="https://bnk-conseil-1z3b.vercel.app"
        ogTitle="BNK Conseil : Audit commercial & Digitalisation pour TPE"
        schema={faqSchema}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        id="hero"
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
            Accompagnement commercial pour TPE et indépendants
          </motion.div>

          {/* H1 principal */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6 text-gray-900"
          >
            Plus de rendez-vous qualifiés.{' '}
            <span style={gradientText}>Un process commercial qui tourne.</span>{' '}
            Un site qui convertit.
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Pour les TPE et indépendants qui veulent scaler sans recruter une équipe marketing.
          </motion.p>

          {/* Boutons CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 rounded-xl font-bold text-white text-base transition-all duration-300 hover:shadow-xl hover:shadow-violet-300/50 hover:-translate-y-1 flex items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
            >
              Réserver un diagnostic gratuit
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#offres"
              className="px-8 py-4 rounded-xl font-semibold text-gray-600 text-base hover:text-violet-700 transition-colors duration-200"
            >
              Voir les offres →
            </a>
          </motion.div>

          {/* Chiffres clés */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {[
              { value: 40, suffix: '%', prefix: '+', label: 'de CA moyen', sublabel: 'de croissance moyenne sur 6 mois' },
              { value: 50, suffix: '+', prefix: '', label: 'missions réalisées', sublabel: 'TPE et indépendants' },
              { value: 3, suffix: ' ans', prefix: '', label: "d'expérience terrain", sublabel: 'opérationnel et terrain' },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 bg-white/80 border border-violet-100 text-center shadow-sm"
              >
                <div className="text-3xl font-black mb-1" style={gradientText}>
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

      {/* ── Ce que vous allez améliorer - #problemes ─────────────────── */}
      <section id="problemes" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Résultats concrets</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4">
              Ce que vous allez{' '}
              <span style={gradientText}>améliorer</span>
              <br />
              <span className="text-2xl sm:text-3xl font-bold text-gray-500">audit commercial TPE</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Les 6 leviers sur lesquels on travaille pour faire passer votre business à la vitesse supérieure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {problemes.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
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

      {/* ── Pourquoi BNK Conseil ─────────────────────────────────────── */}
      <section id="pourquoi" className="py-24" style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #fdf4ff 100%)' }}>
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
              <span style={gradientText}>différents</span>
              {' '}, conseil commercial TPE
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

      {/* ── Pour qui ? - #pour-qui ──────────────────────────────────── */}
      <section id="pour-qui" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Digitalisation indépendant</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4">
              Pour qui ?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Soyons directs : on est fait pour certains profils et pas d'autres.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ✅ C'est pour vous */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl p-8 bg-white border border-green-200 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center text-green-600 font-bold text-lg">
                  ✓
                </div>
                <h3 className="text-gray-900 font-bold text-xl">C'est fait pour vous si…</h3>
              </div>
              <ul className="space-y-3">
                {pourQuiOui.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ❌ Ce n'est pas pour vous */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl p-8 bg-gray-50 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 font-bold text-lg">
                  ✕
                </div>
                <h3 className="text-gray-900 font-bold text-xl">Ce n'est pas pour vous si…</h3>
              </div>
              <ul className="space-y-3">
                {pourQuiNon.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-500 text-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Nos offres - #offres ────────────────────────────────────── */}
      <section id="offres" className="py-24" style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #fdf4ff 100%)' }}>
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
              Deux offres pour les TPE :{' '}
              <span style={gradientText}>un seul objectif</span>
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
                className="group p-8 rounded-2xl bg-white border border-violet-100 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100/60 transition-all duration-300 flex flex-col"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-violet-600 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(168,85,247,0.06))' }}
                >
                  {offer.icon}
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-3">{offer.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{offer.description}</p>
                <Link
                  to={offer.link}
                  className="mt-5 text-violet-600 text-sm font-semibold hover:text-violet-700 transition-colors"
                >
                  {offer.linkLabel}
                </Link>
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

      {/* ── Notre méthode - #methode ─────────────────────────────────── */}
      <section id="methode" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Comment ça marche</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4">
              Notre méthode de travail :{' '}
              <span style={gradientText}>digitalisation indépendant</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              4 étapes claires, du diagnostic au résultat. Pas de jargon, pas de théorie.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {methode.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-6 rounded-2xl bg-white border border-gray-200 hover:border-violet-300 hover:shadow-md hover:shadow-violet-100/50 transition-all duration-300"
              >
                {/* Numéro */}
                <div
                  className="text-5xl font-black mb-4 leading-none opacity-10 select-none"
                  style={gradientText}
                >
                  {step.num}
                </div>
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-violet-600"
                  style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(168,85,247,0.06))' }}
                >
                  {step.icon}
                </div>
                <h3 className="text-gray-900 font-bold text-base mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Preuves & Cas clients - #preuves ─────────────────────────── */}
      <section id="preuves" className="py-24" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f5f3ff 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Résultats clients</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4">
              Ils ont structuré leur{' '}
              <span style={gradientText}>croissance</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Des cas anonymisés, des résultats réels. Sans bullshit.
            </p>
          </motion.div>

          {/* Cas clients */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {casClients.map((cas, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="rounded-2xl p-8 bg-white border border-violet-100 shadow-sm"
              >
                {/* Tag secteur */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl" role="img" aria-label={cas.secteur}>{cas.emoji}</span>
                  <span className="text-violet-600 text-xs font-semibold uppercase tracking-wider">{cas.tag}</span>
                </div>

                {/* Problème */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Situation de départ</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{cas.probleme}</p>
                </div>

                {/* Actions */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Ce qu'on a mis en place</p>
                  <ul className="space-y-1.5">
                    {cas.actions.map((action, j) => (
                      <li key={j} className="flex items-start gap-2 text-gray-600 text-sm">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 text-violet-500 flex-shrink-0 mt-0.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Résultat */}
                <div className="rounded-xl px-4 py-3" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(168,85,247,0.05))' }}>
                  <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-0.5">Résultat</p>
                  <p className="text-gray-900 font-bold text-sm">{cas.resultat}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Témoignages */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TestimonialCarousel />
          </motion.div>
        </div>
      </section>

      {/* ── FAQ - #faq ───────────────────────────────────────────────── */}
      <section id="faq" className="py-24 bg-white">
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
              Questions fréquentes :{' '}
              <span style={gradientText}>audit commercial TPE</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Les réponses à ce que nos clients se demandent avant de nous contacter.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <FAQ items={faqItems} />
          </motion.div>
        </div>
      </section>

      {/* ── CTA final - #contact ─────────────────────────────────────── */}
      <section
        id="contact"
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
              <span style={gradientText}>accélérer ?</span>
            </h2>
            <p className="text-gray-600 text-xl mb-10 max-w-2xl mx-auto">
              Un appel de 20 minutes pour comprendre vos enjeux. Pas de pitch commercial, juste une conversation honnête.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-white text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-violet-400/40 hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
            >
              Réserver un diagnostic gratuit
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <p className="text-gray-500 text-sm mt-4">Gratuit · Sans engagement · 20 min</p>
          </motion.div>
        </div>
      </section>

    </PageTransition>
  )
}
