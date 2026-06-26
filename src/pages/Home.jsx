import PageTransition from '../components/PageTransition'
import SEOHead from '../components/SEOHead'
import NominationCard from '../components/NominationCard'
import StatCard from '../components/StatCard'
import LiquidChrome from '../components/stellar/LiquidChrome'
import Reveal from '../components/stellar/Reveal'
import MagneticButton from '../components/stellar/MagneticButton'
import LiquidDivider from '../components/stellar/LiquidDivider'
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

export default function Home() {
  return (
    <PageTransition>
      <SEOHead
        title="BNK Conseil | Audit commercial & Digitalisation pour TPE"
        description="Audit commercial, création de site vitrine et digitalisation pour TPE et indépendants. Prenez RDV en 2 min."
        canonical="https://bnk-conseil.com"
        ogTitle="BNK Conseil : Audit commercial & Digitalisation pour TPE"
      />

      {/* SECTION 1 — HERO */}
      <section style={{ minHeight: 'calc(100vh - 40px)', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <LiquidChrome />
        </div>
        {/* voile radial pour contraste du texte */}
        <div
          className="absolute inset-0"
          style={{ zIndex: 1, background: 'radial-gradient(60% 50% at 50% 50%, rgba(255,255,255,0.35), transparent 70%)' }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6" style={{ zIndex: 30 }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[11px] uppercase tracking-[0.3em] font-medium mb-6" style={{ color: 'var(--c-dark)' }}
          >
            Conseil Commercial · Depuis 2022
          </motion.p>

          <h1 className="font-firs font-semibold tracking-[-0.04em] leading-[0.9] text-[52px] sm:text-[80px] lg:text-[104px] xl:text-[124px]" style={{ color: 'var(--c-dark)' }}>
            <Reveal variant="chars" as="span" className="block">BNK</Reveal>
            <Reveal variant="chars" as="span" className="block" delay={0.1}>Conseil</Reveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }}
            className="text-[12px] sm:text-[14px] uppercase tracking-[0.22em] font-medium max-w-lg leading-[1.8] mt-8 mb-8" style={{ color: 'var(--c-dark)' }}
          >
            Sites qui convertissent. Audit commercial. Résultats en 30 jours.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
            <MagneticButton href={CALENDLY}>Réserver un diagnostic gratuit</MagneticButton>
          </motion.div>
        </div>
      </section>

      <LiquidDivider color="var(--c-bg-services)" />

      {/* SECTION 2 — SERVICES */}
      <section style={{ background: 'var(--c-bg-services)' }} className="py-20 sm:py-28 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="text-[12px] tracking-[0.24em] uppercase font-medium mb-3" style={{ color: 'var(--c-teal)' }}>[ Services ]</p>
            <h2 className="font-firs text-[40px] sm:text-[54px] font-semibold uppercase tracking-tight mb-4" style={{ color: 'var(--c-dark)' }}>Services</h2>
            <p className="text-[15px] leading-relaxed max-w-xl mx-auto" style={{ color: 'var(--c-dark)' }}>
              Tout ce qu'il faut pour structurer votre commercial et lancer votre présence en ligne. Un seul interlocuteur, des résultats mesurables.
            </p>
          </Reveal>

          <Reveal stagger={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <NominationCard key={s.title} {...s} />
            ))}
          </Reveal>
        </div>
      </section>

      <LiquidDivider color="var(--c-bg-results)" />

      {/* SECTION 3 — RÉSULTATS */}
      <section style={{ background: 'var(--c-bg-results)' }} className="py-20 sm:py-28 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14" style={{ color: 'var(--c-dark)' }}>
            <Reveal>
              <h2 className="font-firs text-[36px] sm:text-[48px] lg:text-[54px] font-semibold uppercase tracking-tight leading-[0.95]">
                Résultats<br />Concrets
              </h2>
            </Reveal>
            <Reveal className="max-w-xl" delay={0.1}>
              <p className="text-[15px] leading-relaxed mb-4">
                BNK Conseil accompagne les TPE, artisans et indépendants pour structurer leur croissance commerciale et renforcer leur présence digitale.
              </p>
              <p className="text-[15px] leading-relaxed mb-6">
                Une approche terrain, des résultats mesurables, et des premiers effets visibles en 30 jours.
              </p>
              <MagneticButton href={CALENDLY}>Réserver un diagnostic gratuit</MagneticButton>
            </Reveal>
          </div>

          <Reveal stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <StatCard variant={1} value="+40%" label="de CA moyen sur 6 mois" />
            <StatCard variant={2} value="50+" label="missions TPE et indépendants" className="lg:mt-24" />
            <StatCard variant={3} value="30j" label="pour les premiers résultats" />
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
