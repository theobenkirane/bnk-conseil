# BNK Home Liquid Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refondre la Home BNK (Hero liquid chrome WebGL, Services relayouté, Résultats lisibles) avec des primitives interactives signature, sans toucher au portfolio.

**Architecture:** On garde le shell Stellar (carte arrondie inset + Lenis + nav + overlays) et on enrichit. Nouveau dossier `src/components/stellar/` pour les primitives réutilisables (shader, curseur, bouton magnétique, reveal, divider). Couleurs centralisées en variables CSS. Vérification par build + lint + preview visuel (pas de suite de tests dans ce projet).

**Tech Stack:** React 19, Vite 8, Tailwind v4, Framer Motion, GSAP + ScrollTrigger, Lenis, WebGL brut (hero), lucide-react (icônes), @fontsource-variable/bricolage-grotesque.

## Global Constraints

- **Ne jamais toucher** `/portfolio` : `src/pages/Portfolio.jsx`, `src/components/portfolio/**`, `src/lib/portfolio-content.js`, et le branchement portfolio dans `AppLayout.jsx`.
- **Aucun tiret long (—)** dans tout texte FR visible. Utiliser virgule, point, ou reformuler.
- **prefers-reduced-motion** respecté partout : pas de shader animé (frame figée), pas de magnétisme, pas de tilt, reveals immédiats.
- **Pointeur grossier** (`@media (pointer: coarse)`) : pas de curseur custom, pas de tilt, pas de magnétisme.
- **Couleurs = variables CSS** définies dans `src/index.css`. Aucune nouvelle couleur en dur hors de ce fichier.
- **Smooth scroll Lenis** : tout ScrollTrigger utilise `scroller = useStellar().scrollRef.current`.
- **Vérif après chaque tâche** : `npm run build` (réussit) et `npm run lint` (réussit). Commits fréquents.
- Logo fourni : `public/logo.svg` (marque cavalier monochrome, recolorable) et `public/logo transparent.png` (lockup complet couleur).
- StatCards : **100% procédural**, aucune image.

---

### Task 1: Fondation — tokens couleur, police, utilitaires CSS

**Files:**
- Modify: `src/index.css`
- Modify: `src/main.jsx` (ajout import police)
- Modify: `package.json` (deps)

**Interfaces:**
- Produces: variables CSS `--c-dark --c-teal --c-teal-mid --c-chrome-lo --c-chrome-hi --c-bg --c-bg-services --c-bg-results --grad-display --clip-cta` ; classe `.font-firs` pointant Bricolage Grotesque ; classe utilitaire `.sheen` ; filtre SVG gooey id `liquid-goo` (déclaré en Task 6).

- [ ] **Step 1: Installer les dépendances**

Run:
```bash
npm install @fontsource-variable/bricolage-grotesque lucide-react
```
Expected: ajout aux dependencies, pas d'erreur.

- [ ] **Step 2: Importer la police dans `src/main.jsx`**

Ajouter en haut du fichier (avec les autres imports de style) :
```js
import '@fontsource-variable/bricolage-grotesque'
```

- [ ] **Step 3: Remplacer le bloc police + ajouter tokens dans `src/index.css`**

Remplacer les lignes 1-5 actuelles (le `@import url('https://db.onlinewebfonts.com/...TT+Firs+Neue')` et `.font-firs`) par :
```css
.font-firs {
  font-family: 'Bricolage Grotesque Variable', 'Inter', system-ui, sans-serif;
}
```

Puis, juste après `@import "tailwindcss";`, ajouter :
```css
:root {
  --c-dark: #154359;
  --c-teal: #066377;
  --c-teal-mid: #3B9BB3;
  --c-chrome-lo: #185B7B;
  --c-chrome-hi: #4BBDF0;
  --c-bg: #FAFBFF;
  --c-bg-services: #F0F0F0;
  --c-bg-results: #F0F5F7;
  --grad-display: linear-gradient(294deg, var(--c-chrome-lo) 20%, var(--c-chrome-hi));
  --clip-cta: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
}

/* Sheen liquide réutilisable (CTA, cartes) */
.sheen { position: relative; overflow: hidden; }
.sheen::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%);
  transform: translateX(-130%);
  transition: transform 0.7s ease;
  pointer-events: none;
}
.sheen:hover::after { transform: translateX(130%); }

@media (prefers-reduced-motion: reduce) {
  .sheen::after { transition: none; }
}
```

- [ ] **Step 4: Vérifier build + lint**

Run: `npm run build && npm run lint`
Expected: build et lint réussissent.

- [ ] **Step 5: Commit**

```bash
git add src/index.css src/main.jsx package.json package-lock.json
git commit -m "feat(home): tokens couleur CSS, police Bricolage Grotesque, utilitaire sheen"
```

---

### Task 2: Composant `Reveal` (révélation au scroll)

**Files:**
- Create: `src/components/stellar/Reveal.jsx`

**Interfaces:**
- Consumes: `useStellar()` de `src/contexts/StellarContext.jsx` (fournit `scrollRef`).
- Produces: `export default function Reveal({ children, variant = 'up', delay = 0, stagger = 0, className, as })` ; variants : `'up' | 'clip' | 'chars'`.

- [ ] **Step 1: Écrire le composant**

```jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStellar } from '../../contexts/StellarContext'

gsap.registerPlugin(ScrollTrigger)

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  stagger = 0,
  className = '',
  as: Tag = 'div',
}) {
  const ref = useRef(null)
  const { scrollRef } = useStellar()

  useEffect(() => {
    const el = ref.current
    const scroller = scrollRef?.current
    if (!el || !scroller) return
    if (prefersReduced()) {
      gsap.set(el, { opacity: 1, clearProps: 'all' })
      return
    }

    const ctx = gsap.context(() => {
      const targets =
        variant === 'chars'
          ? el.querySelectorAll('[data-reveal-word]')
          : el

      const from =
        variant === 'clip'
          ? { clipPath: 'inset(100% 0 0 0)', opacity: 1 }
          : variant === 'chars'
            ? { y: '110%', opacity: 0 }
            : { y: 40, opacity: 0 }

      const to =
        variant === 'clip'
          ? { clipPath: 'inset(0% 0 0 0)' }
          : variant === 'chars'
            ? { y: '0%', opacity: 1 }
            : { y: 0, opacity: 1 }

      gsap.fromTo(targets, from, {
        ...to,
        duration: 0.8,
        ease: 'power3.out',
        delay,
        stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [scrollRef, variant, delay, stagger])

  // Pour variant 'chars', découper le texte en mots masqués
  if (variant === 'chars' && typeof children === 'string') {
    return (
      <Tag ref={ref} className={className} aria-label={children}>
        {children.split(' ').map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            aria-hidden="true"
          >
            <span data-reveal-word className="inline-block">
              {word}&nbsp;
            </span>
          </span>
        ))}
      </Tag>
    )
  }

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
```

- [ ] **Step 2: Vérifier build + lint**

Run: `npm run build && npm run lint`
Expected: réussissent.

- [ ] **Step 3: Commit**

```bash
git add src/components/stellar/Reveal.jsx
git commit -m "feat(home): composant Reveal (scroll up/clip/chars, reduced-motion)"
```

---

### Task 3: Composant `MagneticButton`

**Files:**
- Create: `src/components/stellar/MagneticButton.jsx`

**Interfaces:**
- Produces: `export default function MagneticButton({ children, to, href, className, ...props })`. Rend un `<Link>` si `to`, sinon un `<a>` si `href`. Applique chamfer `--clip-cta`, fond `--c-teal`, classe `.sheen`, et magnétisme au survol. `data-cursor` posé pour le LiquidCursor.

- [ ] **Step 1: Écrire le composant**

```jsx
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const coarse = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches

export default function MagneticButton({
  children,
  to,
  href,
  className = '',
  ...props
}) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el || prefersReduced() || coarse()) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`
  }
  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0px, 0px)'
  }

  const base =
    'inline-flex items-center gap-2 text-white text-[11px] uppercase tracking-[0.14em] font-medium px-[18px] py-3 transition-transform duration-300 will-change-transform sheen'
  const style = {
    background: 'var(--c-teal)',
    clipPath: 'var(--clip-cta)',
  }

  const content = (
    <>
      {children}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 10L10 2M10 2H4M10 2V8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  )

  const shared = {
    ref,
    className: `${base} ${className}`,
    style,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    'data-cursor': 'lg',
    ...props,
  }

  if (to) return <Link to={to} {...shared}>{content}</Link>
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...shared}>
      {content}
    </a>
  )
}
```

- [ ] **Step 2: Vérifier build + lint**

Run: `npm run build && npm run lint`
Expected: réussissent.

- [ ] **Step 3: Commit**

```bash
git add src/components/stellar/MagneticButton.jsx
git commit -m "feat(home): MagneticButton (magnetisme + sheen + chamfer)"
```

---

### Task 4: Composant `LiquidCursor` + intégration overlay

**Files:**
- Create: `src/components/stellar/LiquidCursor.jsx`
- Modify: `src/layouts/AppLayout.jsx` (ajout aux overlays)

**Interfaces:**
- Consumes: rendu dans le frame du shell (overlay). Réagit aux éléments `a`, `button`, `[data-cursor]`.
- Produces: aucun export consommé ailleurs.

- [ ] **Step 1: Écrire le composant**

```jsx
import { useEffect, useRef } from 'react'

export default function LiquidCursor() {
  const dotRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduced || coarse) return

    const dot = dotRef.current
    if (!dot) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let x = mx
    let y = my
    let raf

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      const t = e.target
      const interactive = t.closest('a, button, [data-cursor]')
      dot.dataset.active = interactive ? 'true' : 'false'
    }

    const loop = () => {
      x += (mx - x) * 0.18
      y += (my - y) * 0.18
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="hidden md:block fixed top-0 left-0 z-[60] pointer-events-none rounded-full mix-blend-difference"
      style={{
        width: 18,
        height: 18,
        background: 'var(--c-chrome-hi)',
        transition: 'width 0.25s ease, height 0.25s ease, opacity 0.25s ease',
      }}
    />
  )
}
```

Note : le grossissement au survol se fait via un style conditionnel. Ajouter, dans le même fichier, juste avant le `return`, un petit effet inline géré par CSS variables n'est pas nécessaire. À la place, gérer la taille via un `useEffect` qui observe `data-active`. Implémentation simple : dans `onMove`, après avoir posé `dot.dataset.active`, faire :
```js
dot.style.width = interactive ? '46px' : '18px'
dot.style.height = interactive ? '46px' : '18px'
dot.style.opacity = interactive ? '0.6' : '1'
```
(Remplacer la ligne `dot.dataset.active = ...` par ce bloc.)

- [ ] **Step 2: Brancher dans `src/layouts/AppLayout.jsx`**

Ajouter l'import :
```jsx
import LiquidCursor from '../components/stellar/LiquidCursor'
```
Dans `BNKLayout`, ajouter `<LiquidCursor />` à la liste des overlays :
```jsx
overlays={
  <>
    <StellarNav />
    <PageIndicator scrollRef={scrollRef} />
    <ScrollHint scrollRef={scrollRef} />
    <LiquidCursor />
  </>
}
```

- [ ] **Step 3: Vérifier build + lint**

Run: `npm run build && npm run lint`
Expected: réussissent.

- [ ] **Step 4: Commit**

```bash
git add src/components/stellar/LiquidCursor.jsx src/layouts/AppLayout.jsx
git commit -m "feat(home): LiquidCursor custom (lerp, grossit sur interactifs)"
```

---

### Task 5: Composant `LiquidChrome` (shader hero)

**Files:**
- Create: `src/components/stellar/LiquidChrome.jsx`

**Interfaces:**
- Produces: `export default function LiquidChrome({ className })`. Rend un `<canvas>` plein cadre avec shader liquide teal animé. Fallback CSS si WebGL indispo. Frame unique si reduced-motion. Pause hors-écran / onglet caché.

- [ ] **Step 1: Écrire le composant**

```jsx
import { useEffect, useRef } from 'react'

const FRAG = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uPointer;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
  vec2 u=f*f*(3.-2.*f);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p){
  float v=0.0, a=0.5;
  for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = uv; p.x *= aspect;
  vec2 ptr = uPointer; ptr.x *= aspect;
  float t = uTime * 0.06;
  vec2 q = vec2(fbm(p*2.0 + t), fbm(p*2.0 - t + 5.2));
  vec2 r = vec2(
    fbm(p*2.0 + q*1.5 + t*1.3 + (p-ptr)*0.25),
    fbm(p*2.0 + q*1.5 - t*1.1)
  );
  float f = fbm(p*2.0 + r*2.0);
  float band = sin(f*10.0 + r.x*4.0)*0.5+0.5;
  band = pow(band, 1.5);
  vec3 lo = vec3(0.094,0.357,0.482);
  vec3 hi = vec3(0.294,0.741,0.941);
  vec3 light = vec3(0.98,0.99,1.0);
  vec3 col = mix(lo, hi, band);
  col = mix(col, light, smoothstep(0.6,1.0,f));
  float spec = smoothstep(0.85,1.0, fbm(p*3.0 - t*2.0 + r));
  col += spec*0.5;
  gl_FragColor = vec4(col,1.0);
}
`

const VERT = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos,0.0,1.0); }
`

export default function LiquidChrome({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: true, alpha: false })
    if (!gl) {
      canvas.style.background =
        'radial-gradient(120% 120% at 30% 20%, var(--c-chrome-hi), var(--c-chrome-lo) 60%, var(--c-dark))'
      return
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    )
    const aPos = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uRes = gl.getUniformLocation(prog, 'uResolution')
    const uPtr = gl.getUniformLocation(prog, 'uPointer')

    const pointer = { x: 0.5, y: 0.5 }
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const w = canvas.clientWidth * dpr
      const h = canvas.clientHeight * dpr
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
      gl.uniform2f(uRes, w, h)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = (e.clientX - r.left) / r.width
      pointer.y = 1.0 - (e.clientY - r.top) / r.height
    }
    window.addEventListener('mousemove', onMove)

    let raf
    let running = true
    const start = performance.now()
    const render = () => {
      if (!running) return
      const time = (performance.now() - start) / 1000
      gl.uniform1f(uTime, time)
      gl.uniform2f(uPtr, pointer.x, pointer.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (!reduced) raf = requestAnimationFrame(render)
    }
    render()

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!reduced) {
        running = true
        render()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  )
}
```

- [ ] **Step 2: Vérifier build + lint**

Run: `npm run build && npm run lint`
Expected: réussissent.

- [ ] **Step 3: Commit**

```bash
git add src/components/stellar/LiquidChrome.jsx
git commit -m "feat(home): LiquidChrome shader WebGL (fallback CSS, reduced-motion, pause hors-ecran)"
```

---

### Task 6: Composant `LiquidDivider` (raccord gooey entre sections)

**Files:**
- Create: `src/components/stellar/LiquidDivider.jsx`

**Interfaces:**
- Produces: `export default function LiquidDivider({ color, flip })`. `color` = couleur de la section suivante (ex `var(--c-bg-results)`). Pose un filtre SVG gooey `id="liquid-goo"` (une seule fois suffit ; le composant le redéclare de façon idempotente via id stable) et des blobs qui fondent le bord.

- [ ] **Step 1: Écrire le composant**

```jsx
export default function LiquidDivider({ color = 'var(--c-bg-results)', flip = false }) {
  return (
    <div
      className="relative w-full h-16 sm:h-24 pointer-events-none -mt-px"
      style={{ transform: flip ? 'scaleY(-1)' : 'none' }}
      aria-hidden="true"
    >
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="b" />
            <feColorMatrix
              in="b"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
            />
          </filter>
        </defs>
      </svg>
      <div
        className="absolute inset-0 flex justify-around items-end"
        style={{ filter: 'url(#liquid-goo)' }}
      >
        <span className="block w-1/3 h-full rounded-t-full" style={{ background: color }} />
        <span className="block w-1/2 h-3/4 rounded-t-full" style={{ background: color }} />
        <span className="block w-1/4 h-full rounded-t-full" style={{ background: color }} />
        <span className="absolute bottom-0 left-0 right-0 h-1/2" style={{ background: color }} />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Vérifier build + lint**

Run: `npm run build && npm run lint`
Expected: réussissent.

- [ ] **Step 3: Commit**

```bash
git add src/components/stellar/LiquidDivider.jsx
git commit -m "feat(home): LiquidDivider (raccord gooey entre sections)"
```

---

### Task 7: `StellarNav` — logo cavalier + tokens + CTA magnétique

**Files:**
- Modify: `src/components/StellarNav.jsx`

**Interfaces:**
- Consumes: `MagneticButton` (Task 3), `public/logo.svg`.
- Produces: nav avec marque cavalier recolorée + wordmark, liens en `var(--c-dark)`/gris, CTA via MagneticButton.

- [ ] **Step 1: Ajouter le logo et migrer les couleurs/CTA**

Importer en haut :
```jsx
import MagneticButton from './stellar/MagneticButton'
```

Dans le bloc nav desktop, avant la liste des liens, insérer la marque (recolorée via CSS mask sur le SVG monochrome) :
```jsx
<Link to="/" className="flex items-center gap-2 mr-2" data-cursor="lg">
  <span
    className="block w-6 h-6"
    style={{
      background: 'var(--c-dark)',
      WebkitMaskImage: 'url(/logo.svg)',
      maskImage: 'url(/logo.svg)',
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
    }}
    aria-hidden="true"
  />
  <span className="font-firs text-[15px] font-semibold tracking-tight" style={{ color: 'var(--c-dark)' }}>
    BNK <span className="font-sans font-normal text-[12px] opacity-70">Conseil</span>
  </span>
</Link>
```

Remplacer les couleurs en dur des liens : `color: location.pathname === path ? 'var(--c-dark)' : '#737373'`.

Remplacer le `<Link>` CTA desktop par :
```jsx
<MagneticButton to="/rdv" className="ml-2">Réserver un appel</MagneticButton>
```

Dans le menu mobile, remplacer les `#154359` par `var(--c-dark)` et le `#066377` par `var(--c-teal)`. La marque mobile peut réutiliser le même bloc masque.

- [ ] **Step 2: Vérifier build + lint**

Run: `npm run build && npm run lint`
Expected: réussissent.

- [ ] **Step 3: Vérif visuelle preview**

Démarrer le preview, ouvrir `/`, confirmer : marque cavalier visible en teal foncé dans la nav, CTA magnétique réagit au survol.

- [ ] **Step 4: Commit**

```bash
git add src/components/StellarNav.jsx
git commit -m "feat(nav): logo cavalier recolore, tokens couleur, CTA magnetique"
```

---

### Task 8: `NominationCard` — tilt 3D + sheen + texte stable

**Files:**
- Modify: `src/components/NominationCard.jsx`

**Interfaces:**
- Consumes: tokens CSS. Optionnel : prop `icon` (composant lucide).
- Produces: `export default function NominationCard({ title, subtitle, to, icon: Icon, className })` avec tilt au survol et sheen.

- [ ] **Step 1: Réécrire le composant**

```jsx
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
const coarse = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches

export default function NominationCard({ title, subtitle, to, icon: Icon, className = '' }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el || prefersReduced() || coarse()) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(700px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg) translateY(-2px)`
  }
  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)'
  }

  return (
    <Link
      to={to}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="lg"
      className={`sheen relative block h-[112px] w-full transition-transform duration-300 will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <polygon
          points="14,0 100,0 100,86 86,100 0,100 0,14"
          fill="rgba(255,255,255,0.6)"
          stroke="rgba(6,99,119,0.25)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="absolute inset-0 flex items-center gap-3 px-5">
        {Icon && (
          <span
            className="flex-none flex items-center justify-center w-9 h-9"
            style={{ background: 'var(--c-bg-results)', color: 'var(--c-teal)' }}
          >
            <Icon size={18} strokeWidth={1.75} />
          </span>
        )}
        <span className="min-w-0">
          <span className="block text-[14px] font-semibold leading-tight" style={{ color: 'var(--c-dark)' }}>
            {title}
          </span>
          <span className="block text-[12px] leading-tight opacity-75" style={{ color: 'var(--c-dark)' }}>
            {subtitle}
          </span>
        </span>
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Vérifier build + lint**

Run: `npm run build && npm run lint`
Expected: réussissent.

- [ ] **Step 3: Commit**

```bash
git add src/components/NominationCard.jsx
git commit -m "feat(home): NominationCard tilt 3D, sheen, icone, texte stable"
```

---

### Task 9: `StatCard` — duotone procédural + compteur animé

**Files:**
- Modify: `src/components/StatCard.jsx`

**Interfaces:**
- Consumes: `useStellar()` (scroller), tokens CSS.
- Produces: `export default function StatCard({ value, label, variant, className })`. `value` au format `'+40%'`, `'50+'`, `'30j'`. Plus de prop `image`. Compteur animé au scroll. Fond teal/chrome généré en CSS.

- [ ] **Step 1: Réécrire le composant**

```jsx
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStellar } from '../contexts/StellarContext'

gsap.registerPlugin(ScrollTrigger)

const clipPaths = {
  1: 'polygon(64px 0%, 100% 0%, 100% 100%, 14px 100%, 0% calc(100% - 14px), 0% 64px)',
  2: 'polygon(0% 0%, calc(100% - 64px) 0%, 100% 64px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0% 100%)',
  3: 'polygon(14px 0%, 100% 0%, 100% calc(100% - 64px), calc(100% - 64px) 100%, 14px 100%, 0% calc(100% - 14px), 0% 14px)',
}

const bgGradients = {
  1: 'radial-gradient(120% 120% at 20% 20%, var(--c-chrome-hi), var(--c-chrome-lo) 55%, var(--c-dark))',
  2: 'radial-gradient(120% 120% at 80% 30%, var(--c-teal-mid), var(--c-teal) 55%, var(--c-dark))',
  3: 'radial-gradient(120% 120% at 50% 80%, var(--c-chrome-hi), var(--c-chrome-lo) 50%, var(--c-dark))',
}

// Parse '+40%' -> { prefix:'+', num:40, suffix:'%' }
function parseValue(v) {
  const m = String(v).match(/^([^\d]*)(\d+)(.*)$/)
  if (!m) return { prefix: '', num: 0, suffix: v }
  return { prefix: m[1], num: parseInt(m[2], 10), suffix: m[3] }
}

export default function StatCard({ value, label, variant = 1, className = '' }) {
  const ref = useRef(null)
  const { scrollRef } = useStellar()
  const { prefix, num, suffix } = parseValue(value)
  const [display, setDisplay] = useState(0)
  const clipPath = clipPaths[variant] || clipPaths[1]

  useEffect(() => {
    const el = ref.current
    const scroller = scrollRef?.current
    if (!el || !scroller) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setDisplay(num)
      return
    }
    const counter = { v: 0 }
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        v: num,
        duration: 1.4,
        ease: 'power2.out',
        onUpdate: () => setDisplay(Math.round(counter.v)),
        scrollTrigger: { trigger: el, scroller, start: 'top 85%', toggleActions: 'play none none none' },
      })
    }, el)
    return () => ctx.revert()
  }, [scrollRef, num])

  return (
    <div ref={ref} className={`w-full h-[280px] sm:h-[340px] relative ${className}`} style={{ clipPath }}>
      <div className="absolute inset-0" style={{ background: bgGradients[variant] || bgGradients[1], clipPath }} />
      <div
        className="absolute inset-0"
        style={{ clipPath, background: 'linear-gradient(180deg, transparent 40%, rgba(21,67,89,0.55))' }}
      />
      <div className="absolute left-6 right-6 bottom-6 flex flex-col gap-2">
        <span className="font-firs text-[44px] sm:text-[60px] font-semibold leading-none text-white">
          {prefix}{display}{suffix}
        </span>
        <span className="text-[14px] leading-snug max-w-[14em] text-white/90">{label}</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Vérifier build + lint**

Run: `npm run build && npm run lint`
Expected: réussissent.

- [ ] **Step 3: Commit**

```bash
git add src/components/StatCard.jsx
git commit -m "feat(home): StatCard duotone procedural, compteur anime, sans image"
```

---

### Task 10: `Home.jsx` — refonte des 3 sections

**Files:**
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes: `LiquidChrome`, `Reveal`, `MagneticButton`, `LiquidDivider`, `NominationCard` (avec icônes lucide), `StatCard`, `useStellar`.

- [ ] **Step 1: Réécrire le fichier complet**

```jsx
import PageTransition from '../components/PageTransition'
import SEOHead from '../components/SEOHead'
import NominationCard from '../components/NominationCard'
import StatCard from '../components/StatCard'
import LiquidChrome from '../components/stellar/LiquidChrome'
import Reveal from '../components/stellar/Reveal'
import MagneticButton from '../components/stellar/MagneticButton'
import LiquidDivider from '../components/stellar/LiquidDivider'
import { motion } from 'framer-motion'
import { ClipboardCheck, Target, LineChart, Globe, MapPin, Cpu } from 'lucide-react'

const CALENDLY = 'https://calendly.com/conseil-bnk/30min'

const SERVICES = [
  { title: 'Audit Commercial', subtitle: 'Diagnostic complet', to: '/offres', icon: ClipboardCheck },
  { title: 'Stratégie', subtitle: 'Sur-mesure, sans template', to: '/offres', icon: Target },
  { title: 'Suivi et KPIs', subtitle: 'ROI mesurable', to: '/offres', icon: LineChart },
  { title: 'Création de Site', subtitle: 'À partir de 690 euros', to: '/creation-site-vitrine', icon: Globe },
  { title: 'SEO Local', subtitle: 'Visibilité Google', to: '/offres', icon: MapPin },
  { title: 'Digitalisation', subtitle: 'CRM et automation', to: '/offres', icon: Cpu },
]

export default function Home() {
  return (
    <PageTransition>
      <SEOHead
        title="BNK Conseil | Audit commercial & Digitalisation pour TPE"
        description="Audit commercial, création de site vitrine et digitalisation pour TPE et indépendants. Prenez RDV en 2 min."
        canonical="https://bnk-conseil.com"
        ogTitle="BNK Conseil : Audit commercial & Digitalisation pour TPE"
      />

      {/* SECTION 1 — HERO */}
      <section style={{ minHeight: 'calc(100vh - 40px)', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <LiquidChrome />
        </div>
        {/* voile radial pour contraste du texte */}
        <div
          className="absolute inset-0"
          style={{ zIndex: 1, background: 'radial-gradient(60% 50% at 50% 50%, rgba(255,255,255,0.35), transparent 70%)' }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6" style={{ zIndex: 30 }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[11px] uppercase tracking-[0.3em] font-medium mb-6" style={{ color: 'var(--c-dark)' }}
          >
            Conseil Commercial · Depuis 2022
          </motion.p>

          <h1 className="font-firs font-semibold tracking-[-0.04em] leading-[0.9] text-[52px] sm:text-[80px] lg:text-[104px] xl:text-[124px]" style={{ color: 'var(--c-dark)' }}>
            <Reveal variant="chars" as="span" className="block">BNK</Reveal>
            <Reveal variant="chars" as="span" className="block" delay={0.1}>Conseil</Reveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }}
            className="text-[12px] sm:text-[14px] uppercase tracking-[0.22em] font-medium max-w-lg leading-[1.8] mt-8 mb-8" style={{ color: 'var(--c-dark)' }}
          >
            Sites qui convertissent. Audit commercial. Résultats en 30 jours.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
            <MagneticButton href={CALENDLY}>Réserver un diagnostic gratuit</MagneticButton>
          </motion.div>
        </div>
      </section>

      <LiquidDivider color="var(--c-bg-services)" />

      {/* SECTION 2 — SERVICES */}
      <section style={{ background: 'var(--c-bg-services)' }} className="py-20 sm:py-28 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="text-[12px] tracking-[0.24em] uppercase font-medium mb-3" style={{ color: 'var(--c-teal)' }}>[ Services ]</p>
            <h2 className="font-firs text-[40px] sm:text-[54px] font-semibold uppercase tracking-tight mb-4" style={{ color: 'var(--c-dark)' }}>Services</h2>
            <p className="text-[15px] leading-relaxed max-w-xl mx-auto" style={{ color: 'var(--c-dark)' }}>
              Tout ce qu'il faut pour structurer votre commercial et lancer votre présence en ligne. Un seul interlocuteur, des résultats mesurables.
            </p>
          </Reveal>

          <Reveal stagger={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <NominationCard key={s.title} {...s} />
            ))}
          </Reveal>
        </div>
      </section>

      <LiquidDivider color="var(--c-bg-results)" />

      {/* SECTION 3 — RÉSULTATS */}
      <section style={{ background: 'var(--c-bg-results)' }} className="py-20 sm:py-28 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14" style={{ color: 'var(--c-dark)' }}>
            <Reveal>
              <h2 className="font-firs text-[36px] sm:text-[48px] lg:text-[54px] font-semibold uppercase tracking-tight leading-[0.95]">
                Résultats<br />Concrets
              </h2>
            </Reveal>
            <Reveal className="max-w-xl" delay={0.1}>
              <p className="text-[15px] leading-relaxed mb-4">
                BNK Conseil accompagne les TPE, artisans et indépendants pour structurer leur croissance commerciale et renforcer leur présence digitale.
              </p>
              <p className="text-[15px] leading-relaxed mb-6">
                Une approche terrain, des résultats mesurables, et des premiers effets visibles en 30 jours.
              </p>
              <MagneticButton href={CALENDLY}>Réserver un diagnostic gratuit</MagneticButton>
            </Reveal>
          </div>

          <Reveal stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <StatCard variant={1} value="+40%" label="de CA moyen sur 6 mois" />
            <StatCard variant={2} value="50+" label="missions TPE et indépendants" className="lg:mt-24" />
            <StatCard variant={3} value="30j" label="pour les premiers résultats" />
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
```

- [ ] **Step 2: Vérifier build + lint**

Run: `npm run build && npm run lint`
Expected: réussissent.

- [ ] **Step 3: Vérif visuelle preview**

Démarrer preview, ouvrir `/`. Confirmer :
- Hero : chrome teal animé en fond, titre "BNK / Conseil" révélé, CTA magnétique.
- Services : grille de 6 cartes lisibles à toutes largeurs (pas de texte écrasé), icônes visibles, tilt au survol.
- Résultats : 3 StatCards teal nettes, chiffres qui s'incrémentent au scroll.
- Raccords liquides entre sections.
- Curseur custom actif sur desktop.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat(home): refonte 3 sections (hero shader, services grille, resultats)"
```

---

### Task 11: Passe de vérification finale + mise à jour graphify

**Files:**
- Aucun fichier source nouveau (vérif + maintenance graphe).

- [ ] **Step 1: Build + lint complet**

Run: `npm run build && npm run lint`
Expected: réussissent sans erreur ni warning bloquant.

- [ ] **Step 2: Vérif reduced-motion**

Dans le preview, activer la préférence "réduire les animations" (DevTools > Rendering > prefers-reduced-motion: reduce) et recharger `/`. Confirmer : hero figé (pas d'animation), texte/CTA visibles immédiatement, compteurs affichent la valeur finale, aucune erreur console.

- [ ] **Step 3: Vérif portfolio intact**

Ouvrir `/portfolio`. Confirmer qu'il s'affiche normalement, sans shell BNK, sans curseur custom imposé, identique à avant.

- [ ] **Step 4: Mettre à jour le graphe graphify**

Run: `python -m graphify update .`
Expected: graphe mis à jour (AST only, sans coût API).

- [ ] **Step 5: Commit final**

```bash
git add graphify-out
git commit -m "chore: maj graphe graphify apres refonte Home"
```

---

## Self-Review

**Spec coverage :**
- Bug 1 (Services écrasé) → Task 10 (grille `max-w-6xl`, 6 cartes).
- Bug 2 (StatCards mix-blend) → Task 9 (procédural duotone).
- Bug 3 (Hero plat) → Task 5 + Task 10 (shader).
- Tokens centralisés → Task 1.
- Primitives : Reveal (T2), MagneticButton (T3), LiquidCursor (T4), LiquidChrome (T5), LiquidDivider (T6).
- Nav logo + tokens → Task 7.
- NominationCard tilt/sheen → Task 8.
- StatCard compteur → Task 9.
- Copy amélioré (sous-titre hero, intro services) → Task 10.
- Perf/a11y (reduced-motion, coarse, pause, fallback) → présent dans T2-T5, T8, T9 ; vérifié T11.
- Police robuste → Task 1.
- Portfolio intact → vérifié T11.

**Placeholder scan :** aucun TBD. Code complet dans chaque étape.

**Type consistency :** `useStellar().scrollRef` utilisé partout pareil. `MagneticButton({to|href})` cohérent entre T3, T7, T10. `StatCard({value,label,variant})` sans `image` cohérent T9/T10. `NominationCard({title,subtitle,to,icon})` cohérent T8/T10.
