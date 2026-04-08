import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

// ─── Données ──────────────────────────────────────────────────────────────────

const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: 'Je parle votre langage',
    description: "Je suis passé par la prospection, le closing, la gestion de portefeuille et l'optimisation de process — je parle le même langage que vous.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Des résultats, pas des livrables',
    description: "Je ne vends pas des prestations, je construis des résultats mesurables.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: 'Chaque client est un cas unique',
    description: "Pas de copier-coller, pas de solution standard.",
  },
]

const timeline = [
  {
    year: 'Déb.',
    title: 'Immobilier — apprendre la vente sur le terrain',
    description: "Mon premier terrain d'apprentissage : la vente immobilière. Prospection, négociation, gestion de clients exigeants. C'est là que j'ai compris que la méthode fait tout.",
  },
  {
    year: 'Puis',
    title: 'Recrutement B2B et prospection commerciale',
    description: "Recrutement B2B, prospection outbound, closing. J'ai appris à identifier un besoin, construire une relation de confiance et conclure — sur des cycles courts comme longs.",
  },
  {
    year: 'Auj.',
    title: 'Account Manager chez LegalPlace',
    description: "J'accompagne des entrepreneurs dans la structuration et le lancement de leur activité. Chaque jour, je vois des indépendants avec un vrai potentiel — mais sans méthode ni visibilité.",
  },
  {
    year: 'BNK',
    title: 'BNK Conseil — la conviction qui devient une offre',
    description: "Aider les TPE à mieux vendre et leur donner une présence digitale qui travaille pour eux. Parce qu'un beau site sans stratégie ne convertit pas, et une bonne équipe sans visibilité plafonne vite.",
  },
]

// ─── Composant ────────────────────────────────────────────────────────────────

export default function APropos() {
  return (
    <PageTransition>
      <SEOHead
        title="À propos : Théo Benkirane, Fondateur BNK Conseil"
        description="Consultant terrain spécialisé dans la performance commerciale et la digitalisation des TPE et startups. Opérationnel, direct, orienté résultats."
        canonical="https://bnk-conseil.com/a-propos"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://bnk-conseil.com/a-propos#webpage",
          "url": "https://bnk-conseil.com/a-propos",
          "name": "À propos - Théo Benkirane & BNK Conseil",
          "description": "Découvrez qui est Théo Benkirane, fondateur de BNK Conseil, et la mission de l'entreprise : accompagner les TPE et startups dans leur croissance commerciale et digitale depuis 2022.",
          "inLanguage": "fr-FR",
          "isPartOf": { "@id": "https://bnk-conseil.com/#website" },
          "about": { "@id": "https://bnk-conseil.com/#theo-benkirane" },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://bnk-conseil.com/" },
              { "@type": "ListItem", "position": 2, "name": "À propos", "item": "https://bnk-conseil.com/a-propos" }
            ]
          }
        }}
      />

      {/* ── Hero - fond pastel ────────────────────────────────── */}
      <section
        className="pt-32 pb-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #bfdbfe 0%, #f9fafb 35%, #fce7f3 65%, #d1fae5 100%)' }}
      >
        <div
          className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-40 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #c4b5fd, transparent)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute bottom-0 right-10 w-80 h-80 rounded-full opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #fbcfe8, transparent)', filter: 'blur(70px)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Texte */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-violet-700 text-sm font-bold uppercase tracking-widest">Qui je suis</span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mt-4 mb-6 leading-tight">
                BNK Conseil, c'est une conviction{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>qui se construit depuis 5 ans.</span>
              </h1>
              <p className="text-gray-700 text-xl leading-relaxed mb-5">
                Il y a 5 ans, j'ai eu une conviction simple : les TPE et les indépendants méritent le même niveau d'accompagnement commercial et digital que les grandes structures. Pas des templates génériques. Pas des agences qui livrent et disparaissent. Un vrai partenaire, qui comprend leur réalité terrain.
              </p>
              <p className="text-gray-500 text-base leading-relaxed">
                Aujourd'hui, je développe BNK Conseil pour en faire exactement ça.
              </p>
            </motion.div>

            {/* Carte fondateur */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div
                className="relative p-1 rounded-3xl"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7, #fbcfe8)' }}
              >
                <div className="bg-white rounded-[22px] p-8 text-center max-w-xs w-full">
                  {/* Photo */}
                  <div className="relative inline-block mb-5">
                    <img
                      src="/theo.jpg"
                      alt="Théo Benkirane, fondateur de BNK Conseil"
                      width={112}
                      height={112}
                      className="w-28 h-28 rounded-full object-cover object-top border-4 border-white shadow-xl"
                      onError={(e) => {
                        e.target.src = 'https://i.pravatar.cc/150?img=11'
                      }}
                    />
                    <span
                      className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  </div>

                  <h2 className="text-gray-900 font-black text-xl">Théo Benkirane</h2>
                  <p
                    className="text-sm font-semibold mt-1 mb-3"
                    style={{
                      background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Fondateur & Consultant
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">
                    Spécialiste de la performance commerciale et de la digitalisation pour TPE et startups. Opérationnel, direct, orienté résultats.
                  </p>

                  <a
                    href="https://www.linkedin.com/in/theobenkirane/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-violet-300/40 hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    Mon LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Valeurs ───────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Ma différence</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4">
              Ce qui me{' '}
              <span style={{
                background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>différencie</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-violet-300 hover:shadow-md hover:shadow-violet-100/50 text-center group transition-all duration-300"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 text-violet-600 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(168,85,247,0.06))' }}
                >
                  {value.icon}
                </div>
                <h3 className="text-gray-900 font-bold text-xl mb-3">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────── */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #fdf4ff 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-violet-600 text-sm font-semibold uppercase tracking-widest">Mon parcours</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mt-3">
              De la vente terrain au conseil
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
              Je m'appelle Théo Benkirane. Mon parcours, c'est la vente et le terrain — l'immobilier d'abord, puis le recrutement B2B, la prospection commerciale, et aujourd'hui Account Manager chez LegalPlace où j'accompagne des entrepreneurs dans la structuration et le lancement de leur activité.
            </p>
            <p className="text-gray-500 text-base max-w-2xl mx-auto mt-3">
              Ce que j'ai appris au fil de ces expériences : la majorité des TPE ont un vrai potentiel commercial — mais elles manquent de méthode, de visibilité en ligne, ou des deux à la fois. C'est exactement le problème que BNK Conseil adresse.
            </p>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Ligne verticale */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px hidden sm:block"
              style={{ background: 'linear-gradient(180deg, transparent, #A855F7, #7C3AED, transparent)' }}
            />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="sm:pl-16 relative"
                >
                  {/* Point année */}
                  <div
                    className="hidden sm:flex absolute left-0 top-1 w-12 h-12 rounded-full items-center justify-center text-xs font-bold text-white shadow-md"
                    style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                  >
                    {item.year.slice(2)}
                  </div>

                  <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200 hover:border-violet-200 hover:shadow-sm transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-sm font-bold sm:hidden"
                        style={{
                          background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {item.year}
                      </span>
                      <h3 className="text-gray-900 font-bold">{item.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #fce7f3 50%, #dbeafe 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(168,85,247,0.2), transparent)' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Vous êtes indépendant, artisan, restaurateur, ou dirigeant d'une petite structure ?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              On peut en parler. Pas de jargon, pas de promesses vagues — juste un échange direct pour voir si je peux vous aider à passer un cap.
            </p>
            <Link
              to="/rdv"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base transition-all duration-300 hover:shadow-xl hover:shadow-violet-300/40 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
            >
              Prendre contact
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

    </PageTransition>
  )
}
