// Système de thème dual « ivoire ⇄ encre » du portfolio.
// Une seule valeur continue (« tone » : 0 = ivoire, 1 = encre) est calculée à
// partir de la position de scroll. Elle interpole EN MÊME TEMPS le fond, la
// grille et la couleur du texte sur #portfolio-root — le texte reste donc
// toujours contrasté avec son fond, et la bascule se fait progressivement au
// fil du scroll (plus de saut brutal). Aucun symbole d'échecs : juste la dualité.

import { createContext, useContext, useEffect, useRef } from 'react'
import LiquidChrome from '../stellar/LiquidChrome'

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
    fg: [245, 240, 231, 1],
    muted: [205, 194, 177, 1],
    line: [243, 238, 228, 0.14],
    hair: [243, 238, 228, 0.07],
    base: [28, 20, 13, 1],
    card: [18, 12, 7, 0.74],
    cardHover: [30, 21, 13, 0.84],
    bg: [16, 11, 6, 1],
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

// Fond cinématique : métal liquide marron (façon accueil) + vignette + grain.
// Plus d'alternance ivoire/encre — toute la palette est verrouillée sur le
// thème sombre/marron pour un rendu continu et cohérent.
export function Backdrop() {
  const ctx = useTheme()

  useEffect(() => {
    const root = document.getElementById('portfolio-root')
    if (!root) return
    for (const k in VAR) {
      root.style.setProperty(VAR[k], mix(TOKENS.ink[k], TOKENS.ink[k], 0))
    }
  }, [])

  if (!ctx) return null

  return (
    <div className="pf-backdrop">
      <div className="pf-liquid" aria-hidden="true">
        <LiquidChrome variant="brown" />
      </div>
      <div className="pf-veil" />
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
