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

const secteurs = [
  {
    emoji: '🍽️',
    label: 'Restauration',
    description: "Menu en ligne, réservation, fiche Google, photos qui donnent faim. Un site qui fait venir au lieu de faire fuir.",
  },
  {
    emoji: '🔧',
    label: 'Artisanat',
    description: "Vos chantiers en photos, le formulaire de devis qui sonne tout seul, les avis clients en évidence. Visible dans votre coin sur Google.",
  },
  {
    emoji: '🎓',
    label: 'Formation & Coaching',
    description: "Votre programme clair, des témoignages qui rassurent, et un chemin direct vers l'inscription. Le visiteur comprend, puis il s'inscrit.",
  },
  {
    emoji: '🛍️',
    label: 'Commerce local',
    description: "Horaires, adresse, vitrine en ligne, promos du moment. Et surtout, vous apparaissez sur Google Maps quand on cherche à côté de chez vous.",
  },
  {
    emoji: '💼',
    label: 'Prestataires de services',
    description: "Vous inspirez confiance avant même de décrocher le téléphone : références clients, réalisations, et prise de rendez-vous en ligne.",
  },
  {
    emoji: '💻',
    label: 'Indépendants & Freelances',
    description: "Vos projets, vos tarifs, un contact direct. Un site à votre image qui bosse pour vous pendant que vous êtes en mission.",
  },
]

const inclus = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Un design à vous, pas un copier-coller',
    description: "On part de votre métier, vos couleurs, vos clients. Zéro template recyclé qu'on retrouve sur 400 autres sites.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: 'Prêt pour Google dès le jour 1',
    description: "Balises meta, schema, sitemap, robots.txt, vitesse de chargement : tout le travail technique est fait. Vous n'avez pas à comprendre ces mots, juste à en profiter.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: 'Impeccable sur téléphone',
    description: "6 visiteurs sur 10 vous trouvent depuis leur mobile, souvent debout dans la rue. Votre site est nickel sur petit écran, pas juste sur l'ordi du bureau.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: 'Un contact qui atterrit chez vous',
    description: "Formulaire de contact ou de devis branché direct sur votre boîte mail. Le client clique, vous recevez. Pas d'usine à gaz entre les deux.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
      </svg>
    ),
    title: 'Vous voyez ce qui se passe',
    description: "Un tableau de bord simple : combien de visiteurs, d'où ils viennent, quelles pages ils regardent. Pas besoin d'être expert pour le lire.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Trouvable dans votre quartier',
    description: "On crée et on règle votre fiche Google Business Profile. Quand quelqu'un cherche votre métier près de chez vous, c'est vous qui sortez.",
  },
]

const pourquoi = [
  {
    stat: '97%',
    label: 'des gens regardent un commerce en ligne avant de pousser la porte. Pas de site, pas de visite.',
  },
  {
    stat: '75%',
    label: "des clics Google partent dans les 3 premiers résultats. La page 2, personne n'y va jamais.",
  },
  {
    stat: '2–4 sem.',
    label: "et votre site est en ligne. De la maquette au lancement, sans vous faire poireauter six mois.",
  },
]

const faqItems = [
  {
    question: "Combien coûte la création d'un site vitrine ?",
    answer: 'Les sites vitrines démarrent à 690 €. Le tarif bouge selon le nombre de pages et ce que vous voulez dedans (galerie, réservation en ligne, e-shop…). Vous avez un devis clair après un appel de 20 min, sans surprise au moment de la facture.',
  },
  {
    question: 'Combien de temps pour livrer le site ?',
    answer: 'Entre 2 et 4 semaines selon ce qu\'il y a à faire. Vous voyez la maquette dans les 5 premiers jours ouvrés. Vous validez, on intègre, on met en ligne. Pas de chantier qui traîne pendant des mois.',
  },
  {
    question: 'Est-ce que vous créez des sites pour tous les secteurs ?',
    answer: "Oui : restauration, artisanat, commerce local, formation, coaching, prestataires de services. Chaque métier a ses codes et ce que les clients y cherchent. On les connaît, on ne fait pas le même site pour un resto et un plombier.",
  },
  {
    question: "Je n'ai pas de contenu (textes, photos). Vous pouvez aider ?",
    answer: "Pas de souci, c'est même fréquent. On écrit vos textes pensés pour Google, et pour les photos on vous oriente vers des banques d'images pro ou un photographe partenaire. Vous arrivez les mains vides, on remplit.",
  },
  {
    question: 'Le site sera-t-il trouvé sur Google ?',
    answer: "Oui, et c'est non négociable. Chaque site part avec les fondations SEO en place : balises meta, schema, sitemap, vitesse, et fiche Google Business Profile. Je vous mens pas : Google met 1 à 3 mois à vous remonter, ça ne se fait pas en une nuit.",
  },
  {
    question: 'Puis-je payer en plusieurs fois ?',
    answer: "Oui : 50% à la commande, 50% à la livraison. Et le 3 fois est possible sur devis. On trouve un rythme qui ne plombe pas votre trésorerie.",
  },
  {
    question: 'Quel est le prix exact de votre service ?',
    answer: "La formule Essentiel démarre à 690€ (3-4 pages), la formule Pro à 990€ (5-7 pages + blog). Le détail complet est sur la page tarifs, sans astérisque ni petites lignes.",
  },
]

// ─── Composant ────────────────────────────────────────────────────────────────

export default function CreationSiteVitrine() {
  return (
    <PageTransition>
      <SEOHead
        title="Création Site Vitrine TPE, Artisan & Indépendant | Site Web Pro | BNK Conseil"
        description="Création de site vitrine pour artisans, restaurateurs, indépendants et TPE. On transforme les sites qui font fuir en sites qui font signer. Site pro, optimisé SEO local. Devis gratuit. Livraison 2-4 semaines."
        canonical="https://bnk-conseil.com/creation-site-vitrine"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': 'https://bnk-conseil.com/creation-site-vitrine#webpage',
          url: 'https://bnk-conseil.com/creation-site-vitrine',
          name: 'Création Site Vitrine TPE & Artisan - BNK Conseil',
          description: "Création de site vitrine pour artisans, restaurateurs et TPE. Site pro, rapide, optimisé SEO local.",
          inLanguage: 'fr-FR',
          isPartOf: { '@id': 'https://bnk-conseil.com/#website' },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://bnk-conseil.com/' },
              { '@type': 'ListItem', position: 2, name: 'Création Site Vitrine', item: 'https://bnk-conseil.com/creation-site-vitrine' },
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
              className="inline-flex items-center gap-2 text-[#066377] text-sm font-medium mb-6 hover:text-[#154359] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Toutes les offres
            </Link>
            <span className="block text-[#066377] text-sm font-semibold uppercase tracking-widest mb-4">Site web artisan · site vitrine TPE</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Création{' '}
              <span style={gradientText}>site vitrine</span>
              {' '}pour TPE, Artisans, Restaurateurs & Indépendants
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mb-8 leading-relaxed">
              8 fois sur 10, le resto est top mais le site fait fuir. On répare ça : un site vitrine pro, livré vite, trouvé sur Google et fait pour transformer le visiteur en client. Devis gratuit en 20 min.
            </p>
            <div className="flex flex-col gap-4">
              <Link
                to="/apercu-site"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base transition-all duration-300 hover:shadow-xl hover:shadow-[#3B9BB3]/50 hover:-translate-y-1 self-start"
                style={{ background: 'linear-gradient(135deg, #066377, #3B9BB3)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <rect x="2" y="3" width="20" height="14" rx="2" /><polyline points="8 21 12 17 16 21" />
                </svg>
                Visualiser votre futur site gratuitement
              </Link>
              <Link
                to="/rdv"
                className="inline-flex items-center gap-1.5 text-gray-500 text-sm font-medium hover:text-[#066377] transition-colors underline underline-offset-4 self-start"
              >
                Demander un devis gratuit
              </Link>
              <p className="text-gray-400 text-xs">Devis gratuit · Sans engagement · Réponse sous 24h · Paiement en 2×</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Garanties */}
      <section className="py-12 bg-white/45 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: '⏱️', title: 'Le délai, on le tient', desc: 'On respecte la date annoncée, sinon on vous rembourse une partie. Promis, pas juste écrit.' },
                { icon: '🔧', title: '1 mois de retouches', desc: 'Vous changez d\'avis, on ajuste. Modifications illimitées pendant 1 mois après la mise en ligne.' },
                { icon: '🌐', title: 'Hébergement offert 1 an', desc: 'Nom de domaine et hébergement payés par nous la première année. Zéro frais caché au lancement.' },
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

      {/* ── Chiffres clés ──────────────────────────────────────────────── */}
      <section className="py-12 bg-white/45 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {pourquoi.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white border border-[#F0F0F0]"
              >
                <div className="text-3xl font-black mb-2" style={gradientText}>{item.stat}</div>
                <p className="text-gray-500 text-sm leading-relaxed">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Secteurs couverts ──────────────────────────────────────────── */}
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
              Secteurs{' '}
              <span style={gradientText}>couverts</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Chaque métier a ses codes. On bâtit votre site autour de ce que vos clients cherchent vraiment, pas de ce qui fait joli.
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
                className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-[#3B9BB3] hover:shadow-sm transition-all duration-200"
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
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #F0F5F7 0%, #fdf4ff 100%)' }}>
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
                className="flex gap-4 p-5 rounded-2xl bg-white border border-[#F0F0F0] hover:border-[#3B9BB3] hover:shadow-sm transition-all duration-200"
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
              Votre site vitrine,{' '}
              <span style={gradientText}>livré en 2 semaines</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
              20 minutes au téléphone sur votre projet. On vous dit cash ce qu'on peut faire, en combien de temps et pour quel budget. Pas de blabla, pas de jargon.
            </p>
            <Link
              to="/rdv"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-white text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-[#066377]/40 hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg, #066377, #3B9BB3)' }}
            >
              Demander un devis gratuit
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="text-gray-500 text-sm mt-4">Gratuit · Sans engagement · Réponse sous 24h</p>
          </motion.div>
        </div>
      </section>

      {/* Votre secteur */}
      <section className="py-12 bg-gray-50/35 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">{"Votre secteur d'activité"}</h2>
            <p className="text-gray-500 text-center mb-8">Un site vitrine taillé pour votre métier, pas un modèle passe-partout</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { emoji: '🍽️', label: 'Restaurant', path: '/creation-site-vitrine-restaurant' },
                { emoji: '🔨', label: 'Artisan', path: '/creation-site-vitrine-artisan' },
                { emoji: '🎯', label: 'Coach / Formateur', path: '/creation-site-vitrine-coach' },
                { emoji: '🛍️', label: 'Commerce local', path: '/creation-site-vitrine-commerce-local' },
              ].map((s) => (
                <Link key={s.path} to={s.path} className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-200 bg-white hover:border-[#3B9BB3] hover:shadow-md transition-all duration-200 text-center">
                  <span className="text-2xl">{s.emoji}</span>
                  <span className="text-sm font-medium text-gray-700">{s.label}</span>
                  <span className="text-xs text-[#066377] font-medium">{"Voir →"}</span>
                </Link>
              ))}
            </div>
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
              Questions sur la création de site vitrine
            </h2>
          </motion.div>
          <FAQ items={faqItems} />
        </div>
      </section>

    </PageTransition>
  )
}
