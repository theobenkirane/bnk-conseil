import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageTransition from '../components/PageTransition'
import SEOHead from '../components/SEOHead'
import { useStellar } from '../contexts/StellarContext'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const { scrollRef } = useStellar()
  const videoRef = useRef(null)

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
    </PageTransition>
  )
}
