import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../../components/PageTransition'
import SEOHead from '../../components/SEOHead'

const gradientText = {
  background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const secteurs = [
  {
    emoji: '🍽️',
    label: 'Restaurant',
    description: "Menu en ligne, réservation, photos pro. Un site qui donne envie de venir.",
    link: '/creation-site-vitrine-restaurant',
  },
  {
    emoji: '🔨',
    label: 'Artisan',
    description: "Galerie de réalisations, formulaire de devis, avis clients, référencement local.",
    link: '/creation-site-vitrine-artisan',
  },
  {
    emoji: '🎯',
    label: 'Coach / Formateur',
    description: "Page programme, témoignages, module de contact, tunnel vers inscription.",
    link: '/creation-site-vitrine-coach',
  },
  {
    emoji: '🛍️',
    label: 'Commerce local',
    description: "Horaires, localisation, catalogue, promotions. Visible sur Google Maps.",
    link: '/creation-site-vitrine-commerce-local',
  },
]

const process = [
  {
    step: '01',
    title: '📞 Appel découverte',
    description: "20 min pour comprendre votre projet, vos objectifs et votre secteur. Gratuit, sans engagement.",
  },
  {
    step: '02',
    title: '📐 Maquette & validation',
    description: "On vous présente la structure et le design avant de coder. Vous validez avant qu'on démarre.",
  },
  {
    step: '03',
    title: '⚡ Développement',
    description: "On crée votre site sur mesure en 2 à 4 semaines. Vous suivez l'avancement.",
  },
  {
    step: '04',
    title: '🚀 Livraison & lancement',
    description: "On met en ligne, on configure votre hébergement et on vous forme à la gestion du site.",
  },
]

const garanties = [
  {
    icon: '✅',
    title: 'Livraison garantie en délai',
    description: "On respecte les délais convenus ou on vous rembourse. Pas de mauvaises surprises.",
  },
  {
    icon: '✅',
    title: '1 mois de retouches offertes',
    description: "Après la livraison, on ajuste ce que vous voulez pendant 30 jours. Inclus dans le prix.",
  },
  {
    icon: '✅',
    title: 'Hébergement 1 an inclus',
    description: "Domaine + hébergement compris la première année. On gère tout pour vous.",
  },
]

export default function SiteVitrineLyon() {
  return (
    <PageTransition>
      <SEOHead
        title="Création site vitrine à Lyon | BNK Conseil"
        description="Agence web à Lyon spécialisée TPE et artisans. Site vitrine professionnel livré en 2-4 semaines. SEO local, design sur-mesure. À partir de 690€."
        canonical="https://bnk-conseil-1z3b.vercel.app/creation-site-vitrine-lyon"
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
        <div
          className="absolute bottom-0 left-1/4 w-80 h-60 opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(167,139,250,0.5), transparent)', filter: 'blur(50px)' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/creation-site-vitrine"
              className="inline-flex items-center gap-2 text-violet-600 text-sm font-medium mb-6 hover:text-violet-700 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Création site vitrine
            </Link>

            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-violet-200 rounded-full px-4 py-2 text-sm font-semibold text-violet-700 mb-6">
              <span>📍</span>
              <span>Lyon &amp; agglomération</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Création site vitrine{' '}
              <span style={gradientText}>à Lyon</span>
            </h1>

            <p className="text-gray-600 text-xl max-w-2xl mb-8 leading-relaxed">
              "Vous êtes basé à Lyon ? On crée votre site vitrine professionnel, en visio ou en présentiel dans votre secteur."
            </p>

            <div className="flex flex-col gap-4">
              <Link
                to="/apercu-site"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base transition-all duration-300 hover:shadow-xl hover:shadow-violet-300/50 hover:-translate-y-0.5 self-start"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
              >
                Visualiser mon site gratuitement
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/rdv"
                className="inline-flex items-center gap-1.5 text-gray-500 text-sm font-medium hover:text-violet-600 transition-colors underline underline-offset-4 self-start"
              >
                Demander un devis gratuit
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              {["À partir de 690€", "Réponse sous 24h", "Lyon & agglomération"].map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center px-3 py-1.5 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-full text-xs font-medium text-gray-600"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Travail local ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              On travaille ensemble,{' '}
              <span style={gradientText}>comme vous voulez</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              À Lyon, on s'adapte à votre rythme et vos préférences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-8 border border-violet-100"
            style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #faf5ff 100%)' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-violet-100 shadow-sm">
                <div className="text-3xl mb-3">💻</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">"100% en visio"</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  "Échanges fluides via Google Meet ou Teams. Partagez vos écrans, validez en temps réel."
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-violet-100 shadow-sm">
                <div className="text-3xl mb-3">🤝</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">En présentiel</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  "On peut se retrouver dans votre commerce, votre bureau ou dans un espace de coworking lyonnais."
                </p>
              </div>
            </div>
            <p className="text-center text-gray-500 text-sm bg-white/60 rounded-lg px-4 py-3 border border-violet-50">
              "Nous accompagnons les TPE de Lyon, Villeurbanne, Bron, Vénissieux, Décines et toute l'agglomération."
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Secteurs locaux ───────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Votre secteur{' '}
              <span style={gradientText}>à Lyon</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              "Chaque métier a ses codes. On conçoit votre site en fonction de ce que vos clients lyonnais cherchent vraiment."
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {secteurs.map((secteur, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  to={secteur.link}
                  className="block p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-violet-200 transition-all duration-300 h-full"
                >
                  <div className="text-3xl mb-3" role="img" aria-label={secteur.label}>
                    {secteur.emoji}
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">{secteur.label}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{secteur.description}</p>
                  <span className="inline-flex items-center gap-1 mt-4 text-violet-600 text-xs font-semibold">
                    En savoir plus
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────────────────── */}
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
              Comment ça se{' '}
              <span style={gradientText}>passe ?</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Un process clair, de la prise de contact à la mise en ligne.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="text-xs font-black mb-3 w-8 h-8 rounded-lg flex items-center justify-center text-white"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                >
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tarifs ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
              Des tarifs{' '}
              <span style={gradientText}>transparents</span>
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
              <p className="text-2xl font-black text-gray-900 mb-2">
                À partir de{' '}
                <span style={gradientText}>690€</span>
              </p>
              <p className="text-gray-500 text-base mb-4">
                Paiement en 2 fois disponible · Livraison en 2 à 4 semaines
              </p>
              <Link
                to="/tarifs"
                className="inline-flex items-center gap-2 text-violet-600 font-semibold text-sm hover:text-violet-700 transition-colors underline underline-offset-4"
              >
                Voir le détail des tarifs
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <p className="text-gray-400 text-sm">Devis gratuit · Sans engagement · Réponse sous 24h</p>
          </motion.div>
        </div>
      </section>

      {/* ── Garanties ─────────────────────────────────────────────────── */}
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
              Nos{' '}
              <span style={gradientText}>garanties</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              On s'engage sur des résultats concrets.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {garanties.map((g, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="text-3xl mb-4">{g.icon}</div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{g.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{g.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ─────────────────────────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #fce7f3 50%, #dbeafe 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(196,181,253,0.5), transparent 70%)', filter: 'blur(40px)' }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Lancez votre site{' '}
              <span style={gradientText}>à Lyon</span>
            </h2>
            <p className="text-gray-600 text-xl mb-8 max-w-xl mx-auto">
              "Un projet à Lyon ? Parlons-en autour d'un appel de 20 minutes."
            </p>
            <Link
              to="/rdv"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-white text-lg transition-all duration-300 hover:shadow-xl hover:shadow-violet-300/50 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
            >
              Réserver mon appel gratuit
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="text-gray-500 text-sm mt-4">Gratuit · Sans engagement · Réponse sous 24h</p>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
