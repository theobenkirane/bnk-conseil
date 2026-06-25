import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import SEOHead from '../components/SEOHead'
import PortfolioShell from '../components/portfolio/PortfolioShell'
import Nav from '../components/portfolio/Nav'
import { IntroLoader } from '../components/portfolio/motion'
import HeroSection from '../components/portfolio/sections/HeroSection'
import AboutSection from '../components/portfolio/sections/AboutSection'
import ExperienceSection from '../components/portfolio/sections/ExperienceSection'
import SkillsSection from '../components/portfolio/sections/SkillsSection'
import ProjectsSection from '../components/portfolio/sections/ProjectsSection'
import ResultsSection from '../components/portfolio/sections/ResultsSection'
import CompatibilitySection from '../components/portfolio/sections/CompatibilitySection'
import ContactSection from '../components/portfolio/sections/ContactSection'

gsap.registerPlugin(ScrollTrigger)

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Théo Benkirane',
  jobTitle: 'Account Manager',
  description: 'Account Manager et stratège commercial, top performer chez LegalPlace, fondateur de BNK Conseil.',
  url: 'https://bnk-conseil.com/portfolio',
  email: 'theo.benkirane@icloud.com',
  sameAs: ['https://linkedin.com/in/theobenkirane'],
  worksFor: {
    '@type': 'Organization',
    name: 'LegalPlace',
  },
}

export default function Portfolio() {
  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [ready, setReady] = useState(prefersReduced)

  useEffect(() => {
    let lenis = null
    let rafCb = null

    if (!prefersReduced) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      lenis.on('scroll', ScrollTrigger.update)
      rafCb = (time) => lenis.raf(time * 1000)
      gsap.ticker.add(rafCb)
      gsap.ticker.lagSmoothing(0)
    }

    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    return () => {
      clearTimeout(timer)
      if (lenis) {
        lenis.destroy()
        if (rafCb) gsap.ticker.remove(rafCb)
      }
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [prefersReduced])

  return (
    <>
      <SEOHead
        title="Théo Benkirane — Account Manager & Stratège Commercial"
        description="Portfolio de Théo Benkirane, Account Manager chez LegalPlace. Top performer, culture tech et IA. Ouvert à un CDI sur des rôles Account Manager, Business Developer et Sales Ops en SaaS / LegalTech."
        canonical="https://bnk-conseil.com/portfolio"
        schema={SCHEMA}
      />

      {!prefersReduced && <IntroLoader onDone={() => setReady(true)} />}

      <PortfolioShell>
        <Nav ready={ready} />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ResultsSection />
        <CompatibilitySection />
        <ContactSection />
      </PortfolioShell>
    </>
  )
}
