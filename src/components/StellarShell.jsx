import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { StellarProvider, useStellar } from '../contexts/StellarContext'

function ShellInner({ children, overlays, bannerActive }) {
  const { scrollRef, lenisRef } = useStellar()

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
        <div
          ref={scrollRef}
          className="absolute inset-0 overflow-y-auto overflow-x-hidden no-scrollbar"
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
    <StellarProvider>
      <ShellInner overlays={overlays} bannerActive={bannerActive}>
        {children}
      </ShellInner>
    </StellarProvider>
  )
}
