import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useStellar } from '../contexts/StellarContext'
import LiquidChrome from './stellar/LiquidChrome'

// Teinte du fond liquide selon la page (couleurs en rapport avec l'activité)
function tintForPath(path) {
  if (path.startsWith('/creation-site-vitrine') || path === '/apercu-site' || path === '/commander') return 'blue'
  if (path === '/a-propos') return 'violet'
  if (path.startsWith('/guide') || path === '/pourquoi-pas-faire-soi-meme') return 'amber'
  // audit, offres, tarifs, rdv, mentions, etc.
  return 'teal'
}

function ShellInner({ children, overlays, bannerActive }) {
  const { scrollRef, lenisRef } = useStellar()
  const { pathname } = useLocation()
  // L'accueil dessine son propre liquide sombre ; les autres pages ont un voile clair teinté.
  const isHome = pathname === '/'
  const variant = tintForPath(pathname)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const lenis = new Lenis({ wrapper: el })
    lenisRef.current = lenis

    ScrollTrigger.defaults({ scroller: el })
    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
      ScrollTrigger.defaults({ scroller: window })
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const shellH = bannerActive ? 'h-[calc(100vh-40px)]' : 'h-screen'

  return (
    <div className={`${shellH} bg-white p-3 sm:p-5`}>
      <div className="relative w-full h-full overflow-hidden rounded-[28px] sm:rounded-[36px] bg-white">
        {/* Fond métal liquide teinté (sauf accueil, qui gère le sien) */}
        {!isHome && (
          <>
            <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
              <LiquidChrome variant={variant} />
            </div>
            {/* Voile clair pour garder les pages lisibles */}
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              aria-hidden="true"
              style={{ background: 'rgba(250,251,255,0.40)' }}
            />
          </>
        )}
        <div
          ref={scrollRef}
          className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden no-scrollbar"
        >
          {children}
        </div>
        {overlays}
      </div>
    </div>
  )
}

export default function StellarShell({ children, overlays, bannerActive = false }) {
  return (
    <ShellInner overlays={overlays} bannerActive={bannerActive}>
      {children}
    </ShellInner>
  )
}
