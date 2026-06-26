import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageTransition from '../components/PageTransition'
import SEOHead from '../components/SEOHead'
import NominationCard from '../components/NominationCard'
import { useStellar } from '../contexts/StellarContext'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const { scrollRef } = useStellar()
  const videoRef = useRef(null)
  const leftColRef = useRef(null)
  const rightColRef = useRef(null)
  const videoRef2 = useRef(null)

  useEffect(() => {
    if (!videoRef.current || !scrollRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(videoRef.current, {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: videoRef.current,
          scroller: scrollRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    })
    return () => ctx.revert()
  }, [scrollRef])

  useEffect(() => {
    if (!scrollRef.current) return
    const ctx = gsap.context(() => {
      // Left cards slide in from left
      if (leftColRef.current) {
        gsap.fromTo(leftColRef.current.children,
          { x: -60, opacity: 0 },
          {
            x: 0, opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: leftColRef.current,
              scroller: scrollRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        )
      }
      // Right cards slide in from right
      if (rightColRef.current) {
        gsap.fromTo(rightColRef.current.children,
          { x: 60, opacity: 0 },
          {
            x: 0, opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rightColRef.current,
              scroller: scrollRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        )
      }
      // Center video clip-path reveal
      if (videoRef2.current) {
        gsap.fromTo(videoRef2.current,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2,
            scrollTrigger: {
              trigger: videoRef2.current,
              scroller: scrollRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        )
      }
    })
    return () => ctx.revert()
  }, [scrollRef])

  return (
    <PageTransition>
      <SEOHead
        title="BNK Conseil | Audit commercial & Digitalisation pour TPE"
        description="Audit commercial, création de site vitrine et digitalisation pour TPE et indépendants. Prenez RDV en 2 min."
        canonical="https://bnk-conseil.com"
        ogTitle="BNK Conseil : Audit commercial & Digitalisation pour TPE"
      />

      <section style={{ minHeight: 'calc(100vh - 40px)', position: 'relative', overflow: 'hidden' }}>
        {/* Video background z-0 */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
          ref={videoRef}
          src="https://cdn.mixkit.co/videos/preview/mixkit-team-meeting-in-a-modern-office-4809-large.mp4"
        />

        {/* Gradient overlay z-1 */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.10), transparent 50%, rgba(0,0,0,0.20))',
          }}
        />

        {/* Mobile top bar - hidden on md+, z-20 */}
        <div
          className="absolute top-0 left-0 right-0 flex md:hidden items-center justify-between px-5 pt-5"
          style={{ zIndex: 20 }}
        >
          <span className="font-firs text-white text-xl font-semibold">
            BNK{' '}
            <span className="font-sans font-normal opacity-90 text-base">Conseil</span>
          </span>
          <a
            href="https://calendly.com/conseil-bnk/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-[11px] uppercase tracking-[0.14em] font-medium px-4 py-2 bg-[#066377]"
            style={{
              clipPath:
                'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
            }}
          >
            Réserver
          </a>
        </div>

        {/* Hero content centered, z-30 */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          style={{ zIndex: 30 }}
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[11px] uppercase tracking-[0.3em] text-white/90 font-medium mb-6"
          >
            Conseil Commercial · Depuis 2022
          </motion.p>

          {/* H1 line 1 */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-firs font-normal tracking-[-0.04em] leading-[0.9] text-[48px] sm:text-[76px] lg:text-[100px] xl:text-[120px] text-[#154359]"
            >
              BNK
            </motion.h1>
          </div>

          {/* H1 line 2 */}
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="font-firs font-normal tracking-[-0.04em] leading-[0.9] text-[48px] sm:text-[76px] lg:text-[100px] xl:text-[120px] text-[#154359]"
            >
              Conseil
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-[12px] sm:text-[14px] uppercase tracking-[0.22em] font-medium max-w-md leading-[1.8] text-[#154359]/90 mb-8"
          >
            Audit commercial. Création site. Résultats en 30 jours.
          </motion.p>

          {/* CTA */}
          <motion.a
            href="https://calendly.com/conseil-bnk/30min"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="inline-flex items-center gap-2 text-white text-[11px] uppercase tracking-[0.14em] font-medium px-[18px] py-3 bg-[#066377]"
            style={{
              clipPath:
                'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
            }}
          >
            Réserver un diagnostic gratuit
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 10L10 2M10 2H4M10 2V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        </div>
      </section>

      <section style={{ background: '#F0F0F0', position: 'relative' }} className="py-20 sm:py-28 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto">
          {/* 3-column grid: left cards | center | right cards */}
          {/* Mobile: center column first (order-first), stacked */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-6 items-start">

            {/* Left column - 3 NominationCards */}
            <div ref={leftColRef} className="flex flex-col gap-4 lg:mt-36 order-2 lg:order-1 w-full lg:w-auto">
              <NominationCard title="Audit Commercial" subtitle="Diagnostic complet" to="/offres" />
              <NominationCard title="Strategie" subtitle="Sur-mesure, sans template" to="/offres" />
              <NominationCard title="Suivi et KPIs" subtitle="ROI mesurable" to="/offres" />
            </div>

            {/* Center column */}
            <div className="flex flex-col items-center order-1 lg:order-2 flex-1 min-w-0">
              <p className="text-[12px] tracking-[0.24em] uppercase text-[#154359] font-medium mb-2">[services]</p>
              <h2 className="font-firs text-[44px] sm:text-[54px] font-semibold uppercase text-[#154359] tracking-tight mb-6 text-center">Services</h2>
              <div ref={videoRef2} className="w-full overflow-hidden" style={{ maxWidth: 460 }}>
                <video
                  autoPlay loop muted playsInline
                  className="w-full object-cover"
                  style={{ height: 220, maxHeight: 460 }}
                  src="https://cdn.mixkit.co/videos/preview/mixkit-business-team-working-in-an-office-4815-large.mp4"
                />
              </div>
            </div>

            {/* Right column - 3 NominationCards */}
            <div ref={rightColRef} className="flex flex-col gap-4 lg:mt-36 order-3 w-full lg:w-auto">
              <NominationCard title="Creation de Site" subtitle="A partir de 690 euros" to="/creation-site-vitrine" />
              <NominationCard title="SEO Local" subtitle="Visibilite Google" to="/offres" />
              <NominationCard title="Digitalisation" subtitle="CRM et automation" to="/offres" />
            </div>

          </div>
        </div>

        {/* Bottom fade into Section 3 */}
        <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-56 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(240,245,247,0) 0%, rgba(240,245,247,0.7) 60%, #F0F5F7 100%)', zIndex: 10 }} />
      </section>
    </PageTransition>
  )
}
