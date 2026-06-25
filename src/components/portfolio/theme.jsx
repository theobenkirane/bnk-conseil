// Système de thème dual « ivoire ⇄ encre » du portfolio.
// Le thème bascule au scroll quand une section traverse le centre du viewport :
// un calque de fond fixe (couleur + grille 8×8) se fond en douceur, et chaque
// section hérite d'un --fg contrasté. Aucun symbole d'échecs : juste la dualité.

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react'
import {
  motion,
  animate,
  useMotionValue,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion'

export const COLORS = {
  ink: '#15120E',
  inkSoft: '#211B15',
  ivory: '#F3EEE4',
  ivorySoft: '#E8E1D2',
  brass: '#BE823A',
  brassBright: '#D89A4B',
}

const BG = { ivory: COLORS.ivory, ink: COLORS.ink }
const GRID = { ivory: 'rgba(21,18,14,0.055)', ink: 'rgba(243,238,228,0.05)' }

const ThemeCtx = createContext(null)
export const useTheme = () => useContext(ThemeCtx)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('ivory')
  const bg = useMotionValue(BG.ivory)
  const grid = useMotionValue(GRID.ivory)

  useEffect(() => {
    const a = animate(bg, BG[theme], { duration: 0.9, ease: [0.65, 0, 0.35, 1] })
    const b = animate(grid, GRID[theme], { duration: 0.9, ease: [0.65, 0, 0.35, 1] })
    return () => {
      a.stop()
      b.stop()
    }
  }, [theme, bg, grid])

  return (
    <ThemeCtx.Provider value={{ theme, setTheme, bg, grid }}>
      {children}
    </ThemeCtx.Provider>
  )
}

// Calque de fond fixe : couleur animée + grille 8 colonnes en parallaxe + grain.
export function Backdrop() {
  const ctx = useTheme()
  const { scrollYProgress } = useScroll()
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const gridScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  if (!ctx) return null

  return (
    <motion.div className="pf-backdrop" style={{ backgroundColor: ctx.bg }}>
      <motion.div
        className="pf-grid"
        style={{ '--grid': ctx.grid, y: gridY, scale: gridScale }}
      />
      <div className="pf-vignette" />
      <div className="pf-grain" />
    </motion.div>
  )
}

// Déclare le thème d'une section : déclenché quand elle franchit le centre.
export function useThemeSection(theme) {
  const ref = useRef(null)
  const ctx = useTheme()
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })

  useEffect(() => {
    if (inView && ctx) ctx.setTheme(theme)
  }, [inView, theme, ctx])

  return ref
}

// Wrapper de section : applique data-theme (pilote --fg via CSS) et reporte
// le thème au calque de fond pour la bascule cinématique.
export function Section({ theme = 'ivory', id, className = '', style, children }) {
  const ref = useThemeSection(theme)
  return (
    <section
      ref={ref}
      id={id}
      data-theme={theme}
      className={`pf-section ${className}`}
      style={style}
    >
      {children}
    </section>
  )
}
