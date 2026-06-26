# BNK Conseil — Refonte Stellar Launch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refondre intégralement le site BNK Conseil avec l'esthétique Stellar Launch : shell arrondi inset, typographie TT Firs Neue, palette teal (#154359/#066377), chamfers clip-path, animations fluides Lenis + GSAP + Framer Motion.

**Architecture:** `StellarShell` remplace `AppLayout` comme wrapper global — il crée le cadre arrondi avec scroll intérieur Lenis, expose `scrollRef` via `StellarContext` pour les GSAP ScrollTrigger des pages enfants. `StellarNav` est un overlay persistant (absolute, outside scroll, inside frame). La Home est reconstruite en 3 sections Stellar. Les pages secondaires reçoivent les tokens visuels.

**Tech Stack:** React 19, Vite 8, TailwindCSS v4, Framer Motion 12, GSAP 3 + @gsap/react + ScrollTrigger, Lenis 1.3. Icônes en SVG inline (pas de lucide-react).

## Global Constraints

- Ne **jamais** toucher `/portfolio` ni `src/components/portfolio/`
- Palette exclusive : `#154359` (dark), `#066377` (teal) — supprimer tout `#7C3AED` / `#A855F7`
- Font display : TT Firs Neue via classe `.font-firs` définie dans `index.css`
- Chamfers : `clip-path: polygon()` uniquement, en `style={}` inline — jamais `border-radius` sur éléments chamfrés
- Lenis : appliqué à l'élément `.scroll` (element-level, pas `window`)
- ScrollTrigger : `scroller: scrollRef.current` récupéré via `useStellar()` dans chaque composant animé
- GSAP : `ScrollTrigger` enregistré **une seule fois** dans `App.jsx`
- AvailabilityBanner : au-dessus du shell — shell passe en `h-[calc(100vh-40px)]` si active
- Routes et URLs inchangées ; `CALENDLY_URL` constant reste `https://calendly.com/conseil-bnk/30min`

---

## File Map

**Créer :**
- `src/contexts/StellarContext.jsx`
- `src/components/StellarShell.jsx`
- `src/components/StellarNav.jsx`
- `src/components/NominationCard.jsx`
- `src/components/StatCard.jsx`
- `src/components/PageIndicator.jsx`
- `src/components/ScrollHint.jsx`

**Modifier :**
- `src/index.css`
- `src/App.jsx`
- `src/components/AppLayout.jsx`
- `src/pages/Home.jsx`
- `src/components/Footer.jsx`
- `src/components/FAQ.jsx`
- `src/components/TestimonialCarousel.jsx`
- `src/components/AvailabilityBanner.jsx`
- `src/components/AnimatedCounter.jsx`
- `src/components/ROICalculator.jsx`
- `src/components/OfferCard.jsx`
- `src/components/OfferModal.jsx`
- `src/components/WebsitePreview.jsx`
- `src/pages/Offres.jsx`
- `src/pages/AuditCommercial.jsx`
- `src/pages/CreationSiteVitrine.jsx`
- `src/pages/Tarifs.jsx`
- `src/pages/APropos.jsx`
- `src/pages/RDV.jsx`
- `src/pages/Commander.jsx`
- `src/pages/ApercuSite.jsx`
- `src/pages/PourquoiPasFaireSoiMeme.jsx`
- `src/pages/seo/*.jsx` (7 fichiers)
- `src/pages/guides/*.jsx` (2 fichiers)

---

### Task 1: CSS Foundations

**Files:**
- Modify: `src/index.css`

- [ ] **Ajouter au début de `src/index.css`, avant toute directive `@tailwind` ou `@import` Tailwind :**

```css
@import url('https://db.onlinewebfonts.com/c/69f2576e7ca287875bf8d089130e292c?family=TT+Firs+Neue');

.font-firs {
  font-family: 'TT Firs Neue', 'Inter', system-ui, sans-serif;
}

.no-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
```

- [ ] **Vérifier :** `npm run dev` → ouvrir le navigateur → inspecter l'onglet Network : la font `TT+Firs+Neue` doit se charger (status 200). Pas d'erreur console.

- [ ] **Vérifier visuellement :** Créer temporairement un `<h1 className="font-firs text-4xl">Test</h1>` dans `Home.jsx`, vérifier que la police est distincte d'Inter, puis supprimer le test.

- [ ] **Commit :**
```bash
git add src/index.css
git commit -m "feat: Stellar CSS foundations — TT Firs Neue, no-scrollbar"
```

---

### Task 2: StellarContext

**Files:**
- Create: `src/contexts/StellarContext.jsx`

**Interfaces:**
- Produces: `StellarProvider`, `useStellar()` → `{ scrollRef: RefObject<HTMLDivElement>, lenisRef: RefObject<Lenis> }`

- [ ] **Créer `src/contexts/StellarContext.jsx` :**

```jsx
import { createContext, useContext, useRef } from 'react'

const StellarContext = createContext(null)

export function StellarProvider({ children }) {
  const scrollRef = useRef(null)
  const lenisRef = useRef(null)
  return (
    <StellarContext.Provider value={{ scrollRef, lenisRef }}>
      {children}
    </StellarContext.Provider>
  )
}

export function useStellar() {
  const ctx = useContext(StellarContext)
  if (!ctx) throw new Error('useStellar must be inside StellarProvider')
  return ctx
}
```

- [ ] **Commit :**
```bash
git add src/contexts/StellarContext.jsx
git commit -m "feat: StellarContext — scrollRef/lenisRef shared via context"
```

---

### Task 3: StellarShell

**Files:**
- Create: `src/components/StellarShell.jsx`

**Interfaces:**
- Consumes: `StellarProvider`, `useStellar()`
- Produces: `<StellarShell bannerActive={bool} overlays={ReactNode}>{children}</StellarShell>`
  - `children` → rendus dans `.scroll` (le div scrollable Lenis)
  - `overlays` → rendus dans `.frame` outside `.scroll` (nav, indicators)

- [ ] **Créer `src/components/StellarShell.jsx` :**

```jsx
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
```

- [ ] **Vérifier :** `npm run build` — doit passer sans erreur TypeScript/lint.

- [ ] **Commit :**
```bash
git add src/components/StellarShell.jsx
git commit -m "feat: StellarShell — inset frame, Lenis element scroll, GSAP defaults"
```

---

### Task 4: StellarNav

**Files:**
- Create: `src/components/StellarNav.jsx`

**Interfaces:**
- Produces: `<StellarNav />` — se place dans le `.frame` via le prop `overlays` de StellarShell

- [ ] **Créer `src/components/StellarNav.jsx` :**

```jsx
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Accueil', path: '/' },
  { label: 'Offres', path: '/offres' },
  { label: 'Tarifs', path: '/tarifs' },
  { label: 'À propos', path: '/a-propos' },
  { label: 'Contact', path: '/rdv' },
]

const CTA_CLIP = 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
const ARROW_CLIP = 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)'

export default function StellarNav() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => setMobileOpen(false), [location.pathname])

  return (
    <>
      {/* Desktop nav — hidden on mobile */}
      <div className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 z-40 items-center bg-white px-6 lg:px-10 py-4 gap-6 lg:gap-10"
        style={{ borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}
      >
        {/* Inverted corners */}
        <span className="absolute -left-6 bottom-0 w-6 h-7 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 0 100%, transparent 24px, white 25px)' }} />
        <span className="absolute -right-6 bottom-0 w-6 h-7 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 100% 100%, transparent 24px, white 25px)' }} />

        {NAV_LINKS.map(({ label, path }) => (
          <Link
            key={path}
            to={path}
            className="text-[11px] uppercase tracking-[0.14em] font-medium transition-colors"
            style={{ color: location.pathname === path ? '#154359' : '#737373' }}
            onMouseEnter={e => e.currentTarget.style.color = '#154359'}
            onMouseLeave={e => e.currentTarget.style.color = location.pathname === path ? '#154359' : '#737373'}
          >
            {label}
          </Link>
        ))}

        <Link
          to="/rdv"
          className="flex items-center gap-1.5 text-white text-[10px] uppercase tracking-[0.14em] font-medium px-[18px] py-3 transition-[filter] hover:brightness-125 ml-2"
          style={{ background: '#066377', clipPath: CTA_CLIP }}
        >
          Réserver un appel
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </Link>
      </div>

      {/* Mobile hamburger */}
      <div className="md:hidden absolute top-4 right-4 z-50">
        <button
          onClick={() => setMobileOpen(o => !o)}
          className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-lg bg-white/80 backdrop-blur border border-white/20"
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 bg-[#154359] rounded-full transition-transform origin-center ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[#154359] rounded-full transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[#154359] rounded-full transition-transform origin-center ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="md:hidden absolute inset-0 z-40 bg-white flex flex-col justify-center items-center gap-8">
          {NAV_LINKS.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className="font-firs text-3xl font-semibold uppercase tracking-tight"
              style={{ color: '#154359' }}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/rdv"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 text-white text-sm uppercase tracking-[0.14em] font-medium px-6 py-3 mt-4 transition-[filter] hover:brightness-125"
            style={{ background: '#066377', clipPath: CTA_CLIP }}
          >
            Réserver un appel
          </Link>
        </div>
      )}
    </>
  )
}
```

- [ ] **Vérifier :** `npm run build` sans erreur.

- [ ] **Commit :**
```bash
git add src/components/StellarNav.jsx
git commit -m "feat: StellarNav — floating centered nav + mobile overlay"
```

---

### Task 5: NominationCard

**Files:**
- Create: `src/components/NominationCard.jsx`

**Interfaces:**
- Produces: `<NominationCard title="string" subtitle="string" to="string" />`

- [ ] **Créer `src/components/NominationCard.jsx` :**

```jsx
import { Link } from 'react-router-dom'

export default function NominationCard({ title, subtitle, to = '#' }) {
  return (
    <Link
      to={to}
      className="relative flex items-center justify-center max-w-[20em] h-[5em] transition-transform duration-200 hover:-translate-y-0.5"
    >
      {/* SVG chamfered border */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <polygon
          points="14,0 100,0 100,86 86,100 0,100 0,14"
          stroke="rgba(6, 99, 119, 0.25)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          fill="none"
        />
      </svg>
      {/* Text */}
      <div className="text-center px-4">
        <p className="text-[13px] font-semibold" style={{ color: '#154359' }}>{title}</p>
        <p className="text-[12px] font-normal opacity-80 mt-0.5" style={{ color: '#154359' }}>{subtitle}</p>
      </div>
    </Link>
  )
}
```

- [ ] **Test visuel rapide :** Ajouter temporairement `<NominationCard title="Audit Commercial" subtitle="Diagnostic complet" />` dans Home.jsx, vérifier rendu (border angulaire SVG visible, texte centré), puis supprimer.

- [ ] **Commit :**
```bash
git add src/components/NominationCard.jsx
git commit -m "feat: NominationCard — chamfered SVG border card"
```

---

### Task 6: StatCard

**Files:**
- Create: `src/components/StatCard.jsx`

**Interfaces:**
- Produces: `<StatCard value="string" description="string" imageUrl="string" clipPath="string" className="string" />`

- [ ] **Créer `src/components/StatCard.jsx` :**

```jsx
const GRADIENT_TEXT = {
  background: 'linear-gradient(294deg, #185B7B 20%, #4BBDF0)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

export default function StatCard({ value, description, imageUrl, clipPath, textPosition = {}, className = '' }) {
  return (
    <div
      className={`w-full relative ${className}`}
      style={{
        height: undefined,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '1.5px',
        clipPath,
      }}
    >
      {/* Image with mix-blend-mode: plus-darker */}
      <div
        className="w-full h-full overflow-hidden"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'plus-darker',
          clipPath,
        }}
      />
      {/* Text overlay */}
      <div className="absolute" style={{ ...textPosition }}>
        <p
          className="font-firs font-semibold uppercase text-[36px] sm:text-[52px] leading-none"
          style={GRADIENT_TEXT}
        >
          {value}
        </p>
        <p
          className="text-[14px] leading-[1.4] mt-3"
          style={{ color: '#154359', maxWidth: '66%' }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Commit :**
```bash
git add src/components/StatCard.jsx
git commit -m "feat: StatCard — mix-blend-mode plus-darker stat card"
```

---

### Task 7: PageIndicator + ScrollHint

**Files:**
- Create: `src/components/PageIndicator.jsx`
- Create: `src/components/ScrollHint.jsx`

**Interfaces:**
- `<PageIndicator total={3} />` — lit le scroll de `scrollRef` via `useStellar()`
- `<ScrollHint />` — disparaît après 20% de scroll

- [ ] **Créer `src/components/PageIndicator.jsx` :**

```jsx
import { useEffect, useState } from 'react'
import { useStellar } from '../contexts/StellarContext'

export default function PageIndicator({ total = 3 }) {
  const { scrollRef } = useStellar()
  const [current, setCurrent] = useState(1)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el
      const ratio = scrollTop / (scrollHeight - clientHeight)
      setCurrent(Math.min(total, Math.max(1, Math.round(ratio * (total - 1)) + 1)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [scrollRef, total])

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <div
      className="pointer-events-none absolute bottom-4 sm:bottom-6 right-4 sm:right-8 z-40 flex items-center gap-3"
      style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.18em', mixBlendMode: 'difference' }}
    >
      <span>{pad(current)}</span>
      <span className="w-8 h-px" style={{ background: 'rgba(255,255,255,0.4)' }} />
      <span>{pad(total)}</span>
    </div>
  )
}
```

- [ ] **Créer `src/components/ScrollHint.jsx` :**

```jsx
import { useEffect, useState } from 'react'
import { useStellar } from '../contexts/StellarContext'

export default function ScrollHint() {
  const { scrollRef } = useStellar()
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el
      const ratio = scrollTop / (scrollHeight - clientHeight)
      setOpacity(Math.max(0, 1 - ratio / 0.2))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [scrollRef])

  return (
    <div
      className="pointer-events-none absolute bottom-4 sm:bottom-6 left-4 sm:left-8 z-40"
      style={{
        color: 'rgba(255,255,255,0.8)',
        fontSize: 10,
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.18em',
        mixBlendMode: 'difference',
        opacity,
        transition: 'opacity 0.2s',
      }}
    >
      Faites défiler
    </div>
  )
}
```

- [ ] **Commit :**
```bash
git add src/components/PageIndicator.jsx src/components/ScrollHint.jsx
git commit -m "feat: PageIndicator + ScrollHint overlays"
```

---

### Task 8: AppLayout Refactor

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/AppLayout.jsx`

**Goal:** Brancher StellarShell + StellarNav + overlays dans AppLayout. Enregistrer ScrollTrigger dans App.

- [ ] **Dans `src/App.jsx`, ajouter l'import et l'enregistrement GSAP en haut du fichier (avant le return) :**

```jsx
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
```

Le reste de `App.jsx` reste identique.

- [ ] **Remplacer tout le contenu de `src/components/AppLayout.jsx` par :**

```jsx
import { useLocation } from 'react-router-dom'
import StellarShell from './StellarShell'
import StellarNav from './StellarNav'
import PageIndicator from './PageIndicator'
import ScrollHint from './ScrollHint'
import AvailabilityBanner from './AvailabilityBanner'
import Footer from './Footer'
import { AVAILABILITY } from '../config/availability'

export default function AppLayout({ children }) {
  const location = useLocation()
  const isPortfolio = location.pathname === '/portfolio'
  const isHome = location.pathname === '/'

  if (isPortfolio) return <>{children}</>

  const overlays = (
    <>
      <StellarNav />
      {isHome && <PageIndicator total={3} />}
      {isHome && <ScrollHint />}
    </>
  )

  return (
    <>
      {AVAILABILITY.active && <AvailabilityBanner />}
      <StellarShell bannerActive={AVAILABILITY.active} overlays={overlays}>
        {children}
        {!isHome && <Footer />}
      </StellarShell>
    </>
  )
}
```

- [ ] **Vérifier :** `npm run dev` → naviguer sur `/` et `/offres`. Sur `/`, le shell arrondi doit être visible avec la nav flottante. Sur `/offres`, le footer doit toujours apparaître. La page portfolio (`/portfolio`) ne doit pas être affectée.

- [ ] **Vérifier responsive :** réduire la fenêtre à mobile → le hamburger doit apparaître en haut à droite du shell.

- [ ] **Commit :**
```bash
git add src/App.jsx src/components/AppLayout.jsx
git commit -m "feat: AppLayout — StellarShell + StellarNav + overlays branché"
```

---

### Task 9: Home — Section Hero

**Files:**
- Modify: `src/pages/Home.jsx` (réécriture complète — commencer par cette section)

**Interfaces:**
- Consumes: `useStellar()` pour GSAP ScrollTrigger parallax vidéo

**Vidéo hero :** `https://videos.pexels.com/video-files/3194524/3194524-uhd_2560_1440_25fps.mp4`  
(Fallback si indisponible : n'importe quelle vidéo `.mp4` libre de droits, bureau/consulting)

- [ ] **Remplacer `src/pages/Home.jsx` par la version ci-dessous — section Hero uniquement pour valider :**

```jsx
import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEOHead from '../components/SEOHead'
import { useStellar } from '../contexts/StellarContext'

const CALENDLY_URL = 'https://calendly.com/conseil-bnk/30min'
const HERO_VIDEO = 'https://videos.pexels.com/video-files/3194524/3194524-uhd_2560_1440_25fps.mp4'
const SERVICES_VIDEO = 'https://videos.pexels.com/video-files/6692884/6692884-uhd_2560_1440_25fps.mp4'
const CTA_CLIP = 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
const GRADIENT_TEXT = {
  background: 'linear-gradient(294deg, #185B7B 20%, #4BBDF0)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.15 } } },
  item: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  },
}

export default function Home() {
  const { scrollRef } = useStellar()
  const videoRef = useRef(null)
  const heroRef = useRef(null)

  // GSAP parallax sur la vidéo hero
  useEffect(() => {
    if (!videoRef.current || !heroRef.current || !scrollRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(videoRef.current, {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          scroller: scrollRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    })
    return () => ctx.revert()
  }, [scrollRef])

  return (
    <>
      <SEOHead
        title="BNK Conseil | Audit commercial & Digitalisation pour TPE"
        description="Audit commercial, création de site vitrine et digitalisation pour TPE et indépendants. Prenez RDV en 2 min."
        canonical="https://bnk-conseil.com"
        ogTitle="BNK Conseil : Audit commercial & Digitalisation pour TPE"
      />

      {/* ── SECTION 1 : HERO ─────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ minHeight: 'calc(100vh - 40px)' }}
      >
        {/* Vidéo background */}
        <video
          ref={videoRef}
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.10), transparent 50%, rgba(0,0,0,0.20))',
            zIndex: 1,
          }}
        />

        {/* Contenu centré */}
        <div
          className="relative flex flex-col items-center justify-center text-center px-6 pt-32 sm:pt-40 pb-24"
          style={{ zIndex: 10, minHeight: 'calc(100vh - 40px)', color: '#154359' }}
        >
          <motion.div
            variants={stagger.container}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center gap-0"
          >
            {/* Eyebrow */}
            <motion.p
              variants={stagger.item}
              className="text-[11px] sm:text-[12px] uppercase font-medium mb-6 opacity-90"
              style={{ letterSpacing: '0.3em', color: '#154359' }}
            >
              Conseil commercial · Depuis 2022
            </motion.p>

            {/* H1 */}
            <motion.h1
              variants={stagger.item}
              className="font-firs font-normal leading-[0.9] mb-0"
              style={{
                fontSize: 'clamp(48px, 8vw, 120px)',
                letterSpacing: '-0.04em',
                color: '#154359',
              }}
            >
              BNK
              <br />
              Conseil
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={stagger.item}
              className="text-[12px] sm:text-[14px] uppercase font-medium max-w-md leading-[1.8] opacity-90 mt-8"
              style={{ letterSpacing: '0.22em', color: '#154359' }}
            >
              Audit commercial. Création site. Résultats en 30 jours.
            </motion.p>

            {/* CTA */}
            <motion.div variants={stagger.item} className="mt-10">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white text-[10px] sm:text-[11px] uppercase font-medium px-[18px] py-3 transition-[filter] hover:brightness-125 group"
                style={{ background: '#066377', clipPath: CTA_CLIP, letterSpacing: '0.14em' }}
              >
                Réserver un diagnostic gratuit
                <svg
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sections 2 et 3 à venir */}
    </>
  )
}
```

- [ ] **Vérifier :** `npm run dev` → `/` — vidéo en fond, texte BNK Conseil géant, animations stagger entrée, parallax au scroll. Nav flottante visible en desktop.

- [ ] **Commit :**
```bash
git add src/pages/Home.jsx
git commit -m "feat: Home Hero — video bg, TT Firs Neue, Framer Motion stagger, GSAP parallax"
```

---

### Task 10: Home — Section Services

**Files:**
- Modify: `src/pages/Home.jsx` — ajouter section 2 après la section Hero

**Données services :**

```js
const SERVICES_LEFT = [
  { title: 'Audit Commercial', subtitle: 'Diagnostic complet', to: '/audit-commercial' },
  { title: 'Stratégie', subtitle: 'Sur-mesure, sans template', to: '/audit-commercial' },
  { title: 'Suivi & KPIs', subtitle: 'ROI mesurable', to: '/audit-commercial' },
]
const SERVICES_RIGHT = [
  { title: 'Création de Site', subtitle: 'À partir de 690 €', to: '/creation-site-vitrine' },
  { title: 'SEO Local', subtitle: 'Visibilité Google', to: '/creation-site-vitrine' },
  { title: 'Digitalisation', subtitle: 'CRM & automation', to: '/creation-site-vitrine' },
]
```

- [ ] **Ajouter les imports en haut de Home.jsx :**

```jsx
import NominationCard from '../components/NominationCard'
```

- [ ] **Ajouter les constantes après les imports :**

```jsx
const SERVICES_LEFT = [
  { title: 'Audit Commercial', subtitle: 'Diagnostic complet', to: '/audit-commercial' },
  { title: 'Stratégie', subtitle: 'Sur-mesure, sans template', to: '/audit-commercial' },
  { title: 'Suivi & KPIs', subtitle: 'ROI mesurable', to: '/audit-commercial' },
]
const SERVICES_RIGHT = [
  { title: 'Création de Site', subtitle: 'À partir de 690 €', to: '/creation-site-vitrine' },
  { title: 'SEO Local', subtitle: 'Visibilité Google', to: '/creation-site-vitrine' },
  { title: 'Digitalisation', subtitle: 'CRM & automation', to: '/creation-site-vitrine' },
]
```

- [ ] **Ajouter un ref section et un effet GSAP pour les cards :**

```jsx
// Dans Home(), après videoRef et heroRef :
const servicesRef = useRef(null)
const leftCardsRef = useRef([])
const rightCardsRef = useRef([])

useEffect(() => {
  if (!servicesRef.current || !scrollRef.current) return
  const ctx = gsap.context(() => {
    // Cards gauche : entrent depuis la gauche
    gsap.from(leftCardsRef.current, {
      x: -60, opacity: 0, stagger: 0.1, duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: servicesRef.current,
        scroller: scrollRef.current,
        start: 'top 80%',
      },
    })
    // Cards droite : entrent depuis la droite
    gsap.from(rightCardsRef.current, {
      x: 60, opacity: 0, stagger: 0.1, duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: servicesRef.current,
        scroller: scrollRef.current,
        start: 'top 80%',
      },
    })
  })
  return () => ctx.revert()
}, [scrollRef])
```

- [ ] **Ajouter la Section 2 dans le JSX, juste après la section Hero :**

```jsx
{/* ── SECTION 2 : SERVICES ─────────────────────────────── */}
<section
  ref={servicesRef}
  className="relative overflow-hidden py-20 sm:py-28 px-6 sm:px-10"
  style={{ background: '#F0F0F0' }}
>
  <div className="max-w-5xl mx-auto">

    {/* 3 colonnes — stacked mobile, grid lg */}
    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-10 lg:gap-12">

      {/* Colonne gauche */}
      <div className="flex flex-col gap-6 lg:mt-36 order-2 lg:order-1 items-center lg:items-start">
        {SERVICES_LEFT.map((s, i) => (
          <div key={s.title} ref={el => leftCardsRef.current[i] = el}>
            <NominationCard title={s.title} subtitle={s.subtitle} to={s.to} />
          </div>
        ))}
      </div>

      {/* Colonne centre */}
      <div className="flex flex-col items-center order-1 lg:order-2">
        <p className="text-[12px] uppercase tracking-[0.24em] mb-3" style={{ color: '#154359' }}>
          [services]
        </p>
        <h2
          className="font-firs font-semibold uppercase tracking-tight mb-6 sm:mb-8 text-center"
          style={{ fontSize: 'clamp(44px, 5vw, 54px)', color: '#154359' }}
        >
          Services
        </h2>
        <video
          src={SERVICES_VIDEO}
          autoPlay loop muted playsInline
          className="w-full object-cover"
          style={{ width: 'clamp(220px, 40vw, 460px)', height: 'clamp(220px, 40vw, 460px)' }}
        />
      </div>

      {/* Colonne droite */}
      <div className="flex flex-col gap-6 lg:mt-36 order-3 items-center lg:items-end">
        {SERVICES_RIGHT.map((s, i) => (
          <div key={s.title} ref={el => rightCardsRef.current[i] = el}>
            <NominationCard title={s.title} subtitle={s.subtitle} to={s.to} />
          </div>
        ))}
      </div>

    </div>
  </div>

  {/* Bottom fade */}
  <div
    className="pointer-events-none absolute bottom-0 left-0 w-full h-40 sm:h-56"
    style={{
      background: 'linear-gradient(to bottom, rgba(240,245,247,0) 0%, rgba(240,245,247,0.7) 60%, #F0F5F7 100%)',
      zIndex: 10,
    }}
  />
</section>
```

- [ ] **Vérifier :** scroll jusqu'à la section Services → les cards gauche/droite doivent glisser depuis leur côté respectif au scroll. Vidéo carrée centrée visible.

- [ ] **Commit :**
```bash
git add src/pages/Home.jsx
git commit -m "feat: Home Services — 3-col nominations + GSAP scroll-in"
```

---

### Task 11: Home — Section Résultats + Home complète

**Files:**
- Modify: `src/pages/Home.jsx` — ajouter section 3, GSAP counter, imports StatCard

**Clip-paths des 3 stat cards (copier exactement) :**
```js
const STAT_CLIPS = [
  'polygon(64px 0, calc(100% - 14px) 0, calc(100% - 4px) 4px, 100% 14px, 100% calc(100% - 14px), calc(100% - 4px) calc(100% - 4px), calc(100% - 14px) 100%, 14px 100%, 4px calc(100% - 4px), 0 calc(100% - 14px), 0 64px)',
  'polygon(0 14px, 4px 4px, 14px 0, calc(100% - 64px) 0, 100% 64px, 100% calc(100% - 14px), calc(100% - 4px) calc(100% - 4px), calc(100% - 14px) 100%, 64px 100%, 0 calc(100% - 64px))',
  'polygon(0 14px, 4px 4px, 14px 0, calc(100% - 64px) 0, 100% 64px, 100% calc(100% - 64px), calc(100% - 64px) 100%, 14px 100%, 4px calc(100% - 4px), 0 calc(100% - 14px))',
]
```

**Images stock (Pexels, libres de droits) :**
```js
const STAT_IMAGES = [
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1280',
  'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1280',
  'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1280',
]
```

- [ ] **Ajouter import StatCard en haut de Home.jsx :**

```jsx
import StatCard from '../components/StatCard'
```

- [ ] **Ajouter les constantes STAT_CLIPS, STAT_IMAGES, et les données stats dans Home.jsx :**

```jsx
const STAT_CLIPS = [
  'polygon(64px 0, calc(100% - 14px) 0, calc(100% - 4px) 4px, 100% 14px, 100% calc(100% - 14px), calc(100% - 4px) calc(100% - 4px), calc(100% - 14px) 100%, 14px 100%, 4px calc(100% - 4px), 0 calc(100% - 14px), 0 64px)',
  'polygon(0 14px, 4px 4px, 14px 0, calc(100% - 64px) 0, 100% 64px, 100% calc(100% - 14px), calc(100% - 4px) calc(100% - 4px), calc(100% - 14px) 100%, 64px 100%, 0 calc(100% - 64px))',
  'polygon(0 14px, 4px 4px, 14px 0, calc(100% - 64px) 0, 100% 64px, 100% calc(100% - 64px), calc(100% - 64px) 100%, 14px 100%, 4px calc(100% - 4px), 0 calc(100% - 14px))',
]
const STAT_IMAGES = [
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1280',
  'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1280',
  'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1280',
]
const STATS = [
  { value: '+40%', description: 'de CA moyen sur 6 mois', textPos: { left: 24, right: 24, bottom: 24 } },
  { value: '50+', description: 'missions TPE & indépendants', textPos: { left: 24, bottom: 80 } },
  { value: '30j', description: 'pour les premiers résultats', textPos: { left: 24, right: 112, bottom: 24 } },
]
```

- [ ] **Ajouter refs et effet GSAP counter dans Home() :**

```jsx
const resultsRef = useRef(null)
const statCardsRef = useRef([])

useEffect(() => {
  if (!resultsRef.current || !scrollRef.current) return
  const ctx = gsap.context(() => {
    gsap.from(statCardsRef.current, {
      y: 40,
      opacity: 0,
      rotateY: 4,
      transformPerspective: 1000,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: resultsRef.current,
        scroller: scrollRef.current,
        start: 'top 75%',
      },
    })
  })
  return () => ctx.revert()
}, [scrollRef])
```

- [ ] **Ajouter la Section 3 dans le JSX, après la section Services :**

```jsx
{/* ── SECTION 3 : RÉSULTATS ───────────────────────────── */}
<section
  ref={resultsRef}
  className="relative overflow-hidden py-20 sm:py-28 px-6 sm:px-10"
  style={{ background: '#F0F5F7' }}
>
  <div className="max-w-7xl mx-auto">

    {/* Top row */}
    <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-16 mb-14" style={{ color: '#154359' }}>
      <div>
        <h2
          className="font-firs font-semibold uppercase tracking-tight leading-[0.95]"
          style={{ fontSize: 'clamp(36px, 4vw, 54px)' }}
        >
          Résultats
          <br />
          Concrets
        </h2>
      </div>
      <div className="max-w-xl">
        <p className="text-[17px] sm:text-[18px] leading-[1.5] mb-4">
          BNK Conseil accompagne les TPE, artisans et indépendants pour structurer leur croissance commerciale et renforcer leur présence digitale.
        </p>
        <p className="text-[17px] sm:text-[18px] leading-[1.5] mb-6">
          Une approche terrain, des résultats mesurables, et des premiers effets visibles en 30 jours.
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-[14px] font-medium transition-transform hover:-translate-y-0.5"
          style={{ color: '#154359' }}
        >
          Réserver un diagnostic gratuit
          <span
            className="w-8 h-8 flex items-center justify-center border border-current transition-transform hover:-translate-y-0.5"
            style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </span>
        </a>
      </div>
    </div>

    {/* Stats grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {STATS.map((stat, i) => (
        <div
          key={i}
          ref={el => statCardsRef.current[i] = el}
          className={i === 1 ? 'lg:mt-24' : ''}
        >
          <StatCard
            value={stat.value}
            description={stat.description}
            imageUrl={STAT_IMAGES[i]}
            clipPath={STAT_CLIPS[i]}
            textPosition={{ position: 'absolute', ...stat.textPos }}
            className="h-[280px] sm:h-[340px]"
          />
        </div>
      ))}
    </div>

  </div>

  {/* Bottom fade */}
  <div
    className="pointer-events-none absolute bottom-0 left-0 w-full h-40 sm:h-56"
    style={{
      background: 'linear-gradient(to bottom, rgba(240,245,247,0) 0%, rgba(240,245,247,0.7) 60%, #F0F5F7 100%)',
      zIndex: 10,
    }}
  />
</section>
```

- [ ] **Vérifier :** scroll complet Home `/` → 3 sections fluides. Parallax hero, cards Services glissent, stat cards entrent avec rotation 3D. Page indicator 01→02→03 se met à jour. ScrollHint disparaît. Lenis smooth scroll actif.

- [ ] **Vérifier mobile :** responsive OK, vidéo hero plein écran, hamburger nav fonctionnel.

- [ ] **Commit :**
```bash
git add src/pages/Home.jsx
git commit -m "feat: Home Results — stat cards plus-darker + GSAP 3D stagger"
```

---

### Task 12: Secondary Pages — Token Update

**Files:** Tous les fichiers listés dans le File Map (hors Home.jsx déjà fait)

**Goal :** Remplacer la palette violet par les tokens Stellar dans tous les composants et pages secondaires.

**Règles de remplacement :**

| Rechercher | Remplacer par |
|---|---|
| `#7C3AED` | `#066377` |
| `#A855F7` | `#154359` |
| `violet-600` | utiliser `style={{ color: '#066377' }}` |
| `violet-700` | utiliser `style={{ color: '#154359' }}` |
| `violet-300` | `teal-300` ou `style` inline |
| `from-violet-*` / `to-purple-*` | supprimer les gradients Tailwind, utiliser `style={}` |
| `bg-violet-*` | `style={{ background: '#066377' }}` ou `#154359` |
| `border-violet-*` | `style={{ borderColor: 'rgba(6,99,119,0.25)' }}` |
| `text-violet-*` | `style={{ color: '#066377' }}` |
| `gradientText` (inline object) | `{ background: 'linear-gradient(294deg, #185B7B 20%, #4BBDF0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }` |
| `shadow-violet-*` | supprimer ou remplacer par `shadow-[#154359]/20` |
| H1 / H2 sans `.font-firs` | ajouter `className="font-firs ..."` |

**Procédure pour chaque fichier :**

- [ ] **`src/components/Footer.jsx` :** remplacer couleurs violet → teal. H1/H2 → `.font-firs`. `npm run dev` → vérifier rendu sur `/offres`.

- [ ] **`src/components/FAQ.jsx` :** remplacer `#7C3AED` / violet classes → teal.

- [ ] **`src/components/TestimonialCarousel.jsx` :** même remplacement.

- [ ] **`src/components/AvailabilityBanner.jsx` :** remplacer couleurs.

- [ ] **`src/components/AnimatedCounter.jsx` :** remplacer couleurs si présentes.

- [ ] **`src/components/ROICalculator.jsx` :** remplacer couleurs.

- [ ] **`src/components/OfferCard.jsx` :** remplacer couleurs, H titres → `.font-firs`.

- [ ] **`src/components/OfferModal.jsx` :** remplacer couleurs.

- [ ] **`src/components/WebsitePreview.jsx` :** remplacer couleurs.

- [ ] **`src/pages/Offres.jsx` :** remplacer couleurs + H1/H2 → `.font-firs`.

- [ ] **`src/pages/AuditCommercial.jsx` :** idem.

- [ ] **`src/pages/CreationSiteVitrine.jsx` :** idem.

- [ ] **`src/pages/Tarifs.jsx` :** idem.

- [ ] **`src/pages/APropos.jsx` :** idem.

- [ ] **`src/pages/RDV.jsx` :** idem.

- [ ] **`src/pages/Commander.jsx` :** idem.

- [ ] **`src/pages/ApercuSite.jsx` :** idem.

- [ ] **`src/pages/PourquoiPasFaireSoiMeme.jsx` :** idem.

- [ ] **`src/pages/seo/*.jsx` (7 fichiers) :** remplacement couleurs + font.

- [ ] **`src/pages/guides/*.jsx` (2 fichiers) :** idem.

- [ ] **Vérifier :** `npm run lint` — zéro erreur. Naviguer sur `/offres`, `/tarifs`, `/a-propos`, `/audit-commercial` → plus aucun violet visible, palette teal/navy cohérente, headings en TT Firs Neue.

- [ ] **Vérifier `/portfolio` :** doit être inchangé (pas de shell, pas de StellarNav).

- [ ] **Build final :**
```bash
npm run build
```
Doit passer sans erreur.

- [ ] **Commit :**
```bash
git add src/components/ src/pages/
git commit -m "feat: secondary pages — Stellar palette + TT Firs Neue token update"
```

---

## Checklist finale

- [ ] Home `/` : 3 sections Stellar, vidéo hero, nav flottante, page indicator 01→03, scroll smooth
- [ ] Shell arrondi visible sur toutes les pages BNK (padding + rounded frame)
- [ ] StellarNav fonctionne desktop + mobile sur toutes les routes
- [ ] `/portfolio` non modifié
- [ ] Plus aucun violet (#7C3AED/#A855F7) dans le codebase BNK
- [ ] TT Firs Neue sur tous les H1/H2
- [ ] `npm run build` sans erreur
- [ ] `npm run lint` sans erreur
