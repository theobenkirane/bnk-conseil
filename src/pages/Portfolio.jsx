import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import SEOHead from '../components/SEOHead'
import PortfolioShell from '../components/portfolio/PortfolioShell'
import ChessNotationSidebar from '../components/portfolio/ChessNotationSidebar'
import ChessGame from '../components/portfolio/ChessGame'
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
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let lenis = null

    if (!prefersReduced) {
      // Initialise Lenis scroll inertiel
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      // Synchronise Lenis avec GSAP ticker
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)
    }

    // Refresh ScrollTrigger après montage (pour les dimensions correctes)
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    return () => {
      clearTimeout(timer)
      if (lenis) {
        lenis.destroy()
        gsap.ticker.remove((time) => lenis.raf(time * 1000))
      }
      // Nettoyer tous les ScrollTriggers de cette page
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <>
      <SEOHead
        title="Théo Benkirane — Account Manager & Stratège Commercial"
        description="Portfolio de Théo Benkirane, Account Manager chez LegalPlace. Top performer, culture tech et IA. Ouvert à un CDI sur des rôles Account Manager, Business Developer et Sales Ops en SaaS / LegalTech."
        canonical="https://bnk-conseil.com/portfolio"
        schema={SCHEMA}
      />

      <PortfolioShell>
        <ChessNotationSidebar />
        <ChessGame />
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
