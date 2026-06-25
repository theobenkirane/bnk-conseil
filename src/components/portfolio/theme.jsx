// Système de thème dual « ivoire ⇄ encre » du portfolio.
// Une seule valeur continue (« tone » : 0 = ivoire, 1 = encre) est calculée à
// partir de la position de scroll. Elle interpole EN MÊME TEMPS le fond, la
// grille et la couleur du texte sur #portfolio-root — le texte reste donc
// toujours contrasté avec son fond, et la bascule se fait progressivement au
// fil du scroll (plus de saut brutal). Aucun symbole d'échecs : juste la dualité.

import { createContext, useContext, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export const COLORS = {
  ink: '#15120E',
  inkSoft: '#211B15',
  ivory: '#F3EEE4',
  ivorySoft: '#E8E1D2',
  brass: '#BE823A',
  brassBright: '#D89A4B',
}

// Les deux pôles, token par token : [r, g, b, a].
const TOKENS = {
  ivory: {
    fg: [21, 18, 14, 1],
    muted: [111, 101, 87, 1],
    line: [21, 18, 14, 0.12],
    hair: [21, 18, 14, 0.07],
    base: [243, 238, 228, 1],
    card: [21, 18, 14, 0.022],
    cardHover: [21, 18, 14, 0.045],
    bg: [243, 238, 228, 1],
    grid: [21, 18, 14, 0.055],
  },
  ink: {
    fg: [243, 238, 228, 1],
    muted: [176, 165, 148, 1],
    line: [243, 238, 228, 0.14],
    hair: [243, 238, 228, 0.07],
    base: [46, 36, 27, 1],
    card: [243, 238, 228, 0.04],
    cardHover: [243, 238, 228, 0.08],
    bg: [46, 36, 27, 1],
    grid: [243, 238, 228, 0.05],
  },
}

const VAR = {
  fg: '--fg',
  muted: '--muted',
  line: '--line',
  hair: '--hair',
  base: '--base',
  cardHover: '--card-hover',
  card: '--card',
  bg: '--pf-bg',
  grid: '--pf-grid',
}

const lerp = (a, b, t) => a + (b - a) * t
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)
const smooth = (t) => t * t * (3 - 2 * t)
const toneOf = (theme) => (theme === 'ink' ? 1 : 0)
const mix = (A, B, t) =>
  `rgba(${Math.round(lerp(A[0], B[0], t))},${Math.round(lerp(A[1], B[1], t))},${Math.round(
    lerp(A[2], B[2], t)
  )},${+lerp(A[3], B[3], t).toFixed(3)})`

const ThemeCtx = createContext(null)
export const useTheme = () => useContext(ThemeCtx)

export function ThemeProvider({ children }) {
  const registry = useRef([])

  const register = (entry) => {
    registry.current.push(entry)
    return () => {
      registry.current = registry.current.filter((e) => e !== entry)
    }
  }

  return <ThemeCtx.Provider value={{ registry, register }}>{children}</ThemeCtx.Provider>
}

// Calque de fond fixe + moteur de teinte piloté par le scroll.
export function Backdrop() {
  const ctx = useTheme()
  const { scrollY, scrollYProgress } = useScroll()
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const gridScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  useEffect(() => {
    if (!ctx) return
    const root = document.getElementById('portfolio-root')
    if (!root) return

    let entries = []

    const measure = () => {
      entries = ctx.registry.current
        .filter((e) => e.el)
        .map((e) => {
          const r = e.el.getBoundingClientRect()
          const top = r.top + window.scrollY
          return { top, bottom: top + r.height, theme: e.theme }
        })
        .sort((a, b) => a.top - b.top)
    }

    const apply = (tone) => {
      const t = clamp01(tone)
      for (const k in VAR) {
        root.style.setProperty(VAR[k], mix(TOKENS.ivory[k], TOKENS.ink[k], t))
      }
    }

    const compute = () => {
      if (!entries.length) return
      const center = window.scrollY + window.innerHeight * 0.5
      let tone = toneOf(entries[0].theme)
      for (let i = 0; i < entries.length - 1; i++) {
        const boundary = (entries[i].bottom + entries[i + 1].top) / 2
        const gap = entries[i + 1].top - entries[i].top
        const band = Math.min(window.innerHeight * 0.45, gap * 0.45) || 1
        const p = smooth(clamp01((center - (boundary - band)) / (2 * band)))
        tone = lerp(tone, toneOf(entries[i + 1].theme), p)
      }
      apply(tone)
    }

    const onScroll = () => compute()
    const onResize = () => {
      measure()
      compute()
    }

    measure()
    compute()

    const unsub = scrollY.on('change', onScroll)
    window.addEventListener('resize', onResize)
    // Re-mesure après que les hauteurs dynamiques (Parcours horizontal) se stabilisent.
    const t1 = setTimeout(onResize, 300)
    const t2 = setTimeout(onResize, 900)
    const ro = new ResizeObserver(onResize)
    ro.observe(document.body)

    return () => {
      unsub()
      window.removeEventListener('resize', onResize)
      clearTimeout(t1)
      clearTimeout(t2)
      ro.disconnect()
    }
  }, [ctx, scrollY])

  if (!ctx) return null

  return (
    <div className="pf-backdrop">
      <motion.div className="pf-grid" style={{ y: gridY, scale: gridScale }} />
      <div className="pf-vignette" />
      <div className="pf-grain" />
    </div>
  )
}

// Enregistre une section (élément + thème) auprès du moteur de teinte.
export function useThemeSection(theme) {
  const ref = useRef(null)
  const ctx = useTheme()

  useEffect(() => {
    if (!ctx || !ref.current) return
    const entry = { el: ref.current, theme }
    return ctx.register(entry)
  }, [ctx, theme])

  return ref
}

// Wrapper de section : enregistre la teinte et pose data-theme (indicatif).
export function Section({ theme = 'ivory', id, className = '', style, children }) {
  const ref = useThemeSection(theme)
  return (
    <section ref={ref} id={id} data-theme={theme} className={`pf-section ${className}`} style={style}>
      {children}
    </section>
  )
}
