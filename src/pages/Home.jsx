import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import SEOHead from '../components/SEOHead'
import NominationCard from '../components/NominationCard'
import LiquidChrome from '../components/stellar/LiquidChrome'
import Reveal from '../components/stellar/Reveal'
import MagneticButton from '../components/stellar/MagneticButton'
import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars -- used via motion.p / motion.div JSX dot notation
import { ClipboardCheck, Target, LineChart, Globe, MapPin, Cpu } from 'lucide-react'

const CALENDLY = 'https://calendly.com/conseil-bnk/30min'

const SERVICES = [
  { title: 'Audit Commercial', subtitle: 'Diagnostic complet', to: '/offres', icon: ClipboardCheck },
  { title: 'Stratégie', subtitle: 'Sur-mesure, sans template', to: '/offres', icon: Target },
  { title: 'Suivi et KPIs', subtitle: 'ROI mesurable', to: '/offres', icon: LineChart },
  { title: 'Création de Site', subtitle: 'À partir de 690 euros', to: '/creation-site-vitrine', icon: Globe },
  { title: 'SEO Local', subtitle: 'Visibilité Google', to: '/offres', icon: MapPin },
  { title: 'Digitalisation', subtitle: 'CRM et automation', to: '/offres', icon: Cpu },
]

const PRICING = [
  {
    name: 'Essentiel',
    price: '690',
    note: 'paiement unique',
    desc: 'Site vitrine 3-4 pages, SEO de base, hébergement 1 an inclus.',
    features: ['Livré en 2 semaines', 'Design sur-mesure', 'Optimisé mobile'],
    cta: 'Commander',
    to: '/commander',
    featured: false,
  },
  {
    name: 'Pro',
    price: '990',
    note: 'le plus choisi',
    desc: 'Site 5-7 pages, SEO avancé, blog inclus, support prioritaire.',
    features: ['Livré en 3 semaines', 'SEO avancé + blog', 'Support prioritaire'],
    cta: 'Commander',
    to: '/commander',
    featured: true,
  },
  {
    name: 'Sur-mesure',
    price: 'Devis',
    note: 'projet ambitieux',
    desc: 'Pages illimitées, SEO premium, accompagnement dédié.',
    features: ['Cahier des charges', 'SEO premium', 'Suivi dédié'],
    cta: 'Réserver un appel',
    to: '/rdv',
    featured: false,
  },
]

export default function Home() {
  return (
    <PageTransition>
      <SEOHead
        title="BNK Conseil | Audit commercial & Digitalisation pour TPE"
        description="Audit commercial, création de site vitrine et digitalisation pour TPE et indépendants. Prenez RDV en 2 min."
        canonical="https://bnk-conseil.com"
        ogTitle="BNK Conseil : Audit commercial & Digitalisation pour TPE"
      />

      <div className="relative" style={{ background: '#06141b' }}>
        {/* Fond métal liquide — fixe sur toute la page */}
        <div className="sticky top-0 h-screen w-full -mb-[100vh] z-0 pointer-events-none" aria-hidden="true">
          <LiquidChrome />
        </div>
        {/* Voile sombre global (lisibilité du texte clair) */}
        <div
          className="sticky top-0 h-screen w-full -mb-[100vh] z-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'linear-gradient(180deg, rgba(3,16,24,0.30) 0%, rgba(3,16,24,0.55) 100%)' }}
        />

        <div className="relative z-10">
          {/* SECTION 1 — HERO */}
          <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[11px] uppercase tracking-[0.3em] font-medium mb-6" style={{ color: 'var(--c-chrome-hi)' }}
            >
              Conseil Commercial · Depuis 2025
            </motion.p>

            <h1 className="font-firs font-semibold tracking-[-0.04em] leading-[0.9] text-[52px] sm:text-[80px] lg:text-[104px] xl:text-[124px]" style={{ color: '#ffffffb0', textShadow: '0 4px 40px rgba(3,16,24,0.55)' }}>
              <Reveal variant="chars" as="span" className="block">Votre site web dès</Reveal>
            </h1>

            <h1 className="font-firs font-semibold tracking-[-0.04em] leading-[0.9] text-[52px] sm:text-[80px] lg:text-[104px] xl:text-[124px]" style={{ color: '#ffffff', textShadow: '0 4px 40px rgba(3,16,24,0.55)' }}>
              <Reveal variant="chars" as="span" className="block" delay={0.1}>690€</Reveal>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }}
              className="text-[12px] sm:text-[14px] uppercase tracking-[0.22em] font-medium max-w-lg leading-[1.8] mt-8 mb-8" style={{ color: 'rgb(255, 255, 255)' }}
            >
              Site vitrine. Audit commercial. Résultats en 30 jours.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
              <MagneticButton href={CALENDLY}>On en discute ? C'est GRATUIT !</MagneticButton>
            </motion.div>
          </section>

          {/* SECTION 2 — TARIFS / CONVERSION */}
          <section className="py-20 sm:py-28 px-6 sm:px-10">
            <div className="max-w-6xl mx-auto">
              <Reveal className="text-center mb-14 max-w-2xl mx-auto">
                <p className="text-[12px] tracking-[0.24em] uppercase font-medium mb-3" style={{ color: 'var(--c-chrome-hi)' }}>[ Tarifs ]</p>
                <h2 className="font-firs text-[40px] sm:text-[56px] font-semibold uppercase tracking-tight leading-[0.95] mb-4" style={{ color: '#FFFFFF', textShadow: '0 2px 30px rgba(3,16,24,0.5)' }}>
                  Un site qui<br />vous correspond
                </h2>
                <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  Prix fixe. Paiement en 2×, hébergement 1 an offert, livraison garantie. Vos premiers résultats en 30 jours.
                </p>
              </Reveal>

              <Reveal stagger={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {PRICING.map((p) => (
                  <div
                    key={p.name}
                    className="relative flex flex-col rounded-3xl p-7 sm:p-8 transition-transform duration-300 hover:-translate-y-1.5"
                    style={
                      p.featured
                        ? { background: 'linear-gradient(160deg, var(--c-teal) 0%, var(--c-dark) 100%)', boxShadow: '0 24px 60px -20px rgba(6,99,119,0.55)' }
                        : { background: 'rgba(255,255,255,0.96)', border: '1px solid rgba(255,255,255,0.18)', boxShadow: '0 20px 50px -24px rgba(3,16,24,0.6)' }
                    }
                  >
                    {p.featured && (
                      <span className="absolute top-6 right-6 text-[10px] tracking-[0.18em] uppercase font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.18)', color: '#FFFFFF' }}>
                        Populaire
                      </span>
                    )}

                    <p className="text-[13px] uppercase tracking-[0.18em] font-semibold mb-4" style={{ color: p.featured ? 'rgba(255,255,255,0.75)' : 'var(--c-teal)' }}>
                      {p.name}
                    </p>

                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-firs font-semibold tracking-tight text-[56px] leading-none" style={{ color: p.featured ? '#FFFFFF' : 'var(--c-dark)' }}>
                        {p.price === 'Devis' ? 'Sur devis' : <>{p.price}<span className="text-[28px]">€</span></>}
                      </span>
                    </div>
                    <p className="text-[12px] mb-6" style={{ color: p.featured ? 'rgba(255,255,255,0.6)' : 'rgba(21,67,89,0.55)' }}>{p.note}</p>

                    <p className="text-[14px] leading-relaxed mb-6" style={{ color: p.featured ? 'rgba(255,255,255,0.85)' : 'rgba(21,67,89,0.75)' }}>
                      {p.desc}
                    </p>

                    <ul className="space-y-2.5 mb-8 flex-1">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-[14px]" style={{ color: p.featured ? 'rgba(255,255,255,0.9)' : 'var(--c-dark)' }}>
                          <span className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: p.featured ? 'rgba(255,255,255,0.2)' : 'var(--c-bg-results)' }}>
                            <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
                              <path d="M2 6l3 3 5-5" stroke={p.featured ? '#FFFFFF' : 'var(--c-teal)'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={p.to}
                      className="block w-full text-center py-3.5 rounded-xl text-[14px] font-semibold transition-all duration-300 hover:-translate-y-0.5"
                      style={
                        p.featured
                          ? { background: '#FFFFFF', color: 'var(--c-dark)' }
                          : { background: 'linear-gradient(135deg, var(--c-teal), var(--c-teal-mid))', color: '#FFFFFF' }
                      }
                    >
                      {p.cta} →
                    </Link>
                  </div>
                ))}
              </Reveal>

              <Reveal className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12" delay={0.1}>
                <MagneticButton href={CALENDLY}>Réserver un diagnostic gratuit</MagneticButton>
                <Link to="/tarifs" className="text-[14px] font-semibold underline-offset-4 hover:underline" style={{ color: 'var(--c-chrome-hi)' }}>
                  Voir le détail des formules →
                </Link>
              </Reveal>
            </div>
          </section>

          {/* SECTION 3 — SERVICES */}
          <section className="py-20 sm:py-28 px-6 sm:px-10">
            <div className="max-w-6xl mx-auto">
              <Reveal className="text-center mb-14">
                <p className="text-[12px] tracking-[0.24em] uppercase font-medium mb-3" style={{ color: 'var(--c-chrome-hi)' }}>[ Services ]</p>
                <h2 className="font-firs text-[40px] sm:text-[54px] font-semibold uppercase tracking-tight mb-4" style={{ color: '#FFFFFF', textShadow: '0 2px 30px rgba(3,16,24,0.5)' }}>Ce qu'on fait pour vous</h2>
                <p className="text-[15px] leading-relaxed max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  Tout ce qu'il faut pour structurer votre partie commercial et lancer votre présence en ligne. Un seul interlocuteur, des résultats mesurables.
                </p>
              </Reveal>

              <Reveal stagger={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {SERVICES.map((s) => (
                  <NominationCard key={s.title} {...s} />
                ))}
              </Reveal>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  )
}
