# BNK Conseil — Refonte Stellar Launch

**Date :** 2026-06-26  
**Scope :** Site BNK Conseil complet (toutes routes sauf `/portfolio`)  
**Référence :** Plugin open-design `stellar-launch` (Launchex Awards)  
**Stack :** React 19 + Vite 8 + TailwindCSS v4 + Framer Motion + GSAP + Lenis

---

## 1. Identité visuelle

### Palette (remplace violet #7C3AED)

| Token | Valeur |
|---|---|
| `--color-dark` | `#154359` |
| `--color-teal` | `#066377` |
| `--color-bg-services` | `#F0F0F0` |
| `--color-bg-results` | `#F0F5F7` |
| `--color-shell` | `#ffffff` |
| Gradient display | `linear-gradient(294deg, #185B7B 20%, #4BBDF0)` |
| Nomination stroke | `rgba(6, 99, 119, 0.25)` |

### Typographie

- **Display / headings / stats :** TT Firs Neue — chargé via `@import url('https://db.onlinewebfonts.com/c/69f2576e7ca287875bf8d089130e292c?family=TT+Firs+Neue')` dans `index.css`
- **Corps / labels / nav :** Inter (déjà dans le projet via `@fontsource-variable`)
- Classe utilitaire : `.font-firs { font-family: 'TT Firs Neue', 'Inter', system-ui, sans-serif; }`

### Chamfers (clip-path)

Tous les éléments interactifs (CTA, cartes nominatif, liens arrow) utilisent `clip-path: polygon()` pixel-exact. Zéro `border-radius` sur les éléments chamfrés.

- **CTA :** `polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)`
- **Arrow box 32×32 :** `polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)`
- **Nomination card SVG border :** `polygon(14,0 100,0 100,86 86,100 0,100 0,14)` viewBox 0 0 100 100

---

## 2. Shell global

Appliqué à **toutes les pages BNK** via le composant `AppLayout` (sauf `/portfolio`).

```
<div class="shell">          h-screen bg-white p-3 sm:p-5
  <div class="frame">        relative w-full h-full overflow-hidden
                             rounded-[28px] sm:rounded-[36px] bg-white
    <div class="scroll">     absolute inset-0 overflow-y-auto overflow-x-hidden
                             no-scrollbar
      {children}             ← contenu de chaque page
    </div>

    {/* Overlays persistants — outside scroll, inside frame */}
    <StellarNav />           ← nav flottante centrée
    <PageIndicator />        ← bottom-right 01–03 (Home) ou sans numéro
    <ScrollHint />           ← bottom-left "Faites défiler"
  </div>
</div>
```

**CSS utilitaire :**
```css
.no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }
```

### Smooth scroll

Lenis initialisé une seule fois dans `App.jsx` et intégré au RAF de GSAP :
```js
const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

---

## 3. Navigation persistante (`StellarNav`)

- Position : `absolute top-0 left-1/2 -translate-x-1/2 z-40`
- Display : `hidden md:flex`
- Style : fond blanc, `border-bottom-left-radius: 28px; border-bottom-right-radius: 28px`, padding `16px 24px` (→ `16px 40px` lg)
- Coins inversés décoratifs : deux `<span>` gauche/droite avec `radial-gradient` mask
- Liens : Accueil · Offres · Tarifs · À propos · Contact — `11px, uppercase, tracking-[0.14em], font-medium, #262626`
- CTA : `"Réserver un appel"` — chamfré teal `#066377`, blanc, `hover:brightness(1.25)`
- Mobile : hamburger minimaliste, menu overlay dans le frame

**Remplace** le composant `Header.jsx` actuel.

---

## 4. Page Home — 3 sections

### Section 1 — Hero

- `min-height: calc(100vh - 40px)`, `position: relative; overflow: hidden`
- Fond : `<video autoplay loop muted playsinline object-cover z-0>` — vidéo stock business (URL à définir, ou placeholder Pexels/Mixkit)
- Overlay gradient `z-1` : `linear-gradient(to bottom, rgba(0,0,0,0.10), transparent 50%, rgba(0,0,0,0.20))`

**Top bar z-20 (mobile, dans le scroll)** :
- Logo gauche : "BNK" (TT Firs Neue, blanc) + "Conseil" (Inter, blanc, opacity 0.9)
- CTA droite : chamfré teal, "Réserver" mobile / "Réserver un diagnostic" desktop

**Centre z-10** :
```
Eyebrow : CONSEIL COMMERCIAL · DEPUIS 2022
          11px, uppercase, tracking-[0.3em], blanc, opacity-90

H1 :      BNK
          Conseil
          TT Firs Neue, font-normal, tracking-[-0.04em], leading-[0.9]
          48px / 76px (sm) / 100px (lg) / 120px (xl)
          couleur : #154359

Sub :     AUDIT COMMERCIAL. CRÉATION SITE. RÉSULTATS EN 30 JOURS.
          12px/14px, uppercase, tracking-[0.22em], font-medium
          max-w-md, leading-[1.8], opacity-90, mt-8, #154359

CTA :     Réserver un diagnostic gratuit  ↗
          chamfré #066377, blanc, padding 12px 18px, 11px uppercase
```

**Animations entrée (Framer Motion, stagger) :**
1. Eyebrow : `opacity 0→1, y 20→0`, delay 0.1s
2. H1 (chaque ligne) : `opacity 0→1, y 30→0`, delay 0.25s / 0.4s
3. Sub : `opacity 0→1, y 20→0`, delay 0.55s
4. CTA : `opacity 0→1, y 20→0`, delay 0.7s

**Scroll animation (GSAP ScrollTrigger) :**
- Parallaxe vidéo : `scale 1 → 1.08` sur scroll (scrub: 1)

---

### Section 2 — Services `(bg #F0F0F0)`

Padding `py-20 sm:py-28 px-6 sm:px-10`. `max-w-5xl mx-auto`.

**Layout 3 colonnes (lg), stacked mobile (centre en premier) :**

**Colonne centre :**
- Kicker : `[services]` — 12px, tracking-[0.24em], uppercase, `#154359`
- Titre : `Services` — TT Firs Neue, 44px/54px, font-semibold, uppercase, `#154359`
- Vidéo carrée (mt-6) : 220px/380px/460px, `object-cover`, stock business
- `autoplay loop muted playsinline`

**Colonne gauche (mt-36 lg) — 3 NominationCards :**
1. "Audit Commercial" / "Diagnostic complet"
2. "Stratégie" / "Sur-mesure, sans template"
3. "Suivi & KPIs" / "ROI mesurable"

**Colonne droite (mt-36 lg) — 3 NominationCards :**
1. "Création de Site" / "À partir de 690 €"
2. "SEO Local" / "Visibilité Google"
3. "Digitalisation" / "CRM & automation"

**NominationCard :**
- `<Link>` vers la page du service correspondant
- `max-w-[20em] h-[5em] hover:-translate-y-0.5 transition`
- Border SVG chamfré (polygon, stroke teal 0.25 opacity)
- Texte centré : titre 13px font-semibold, sous-titre 12px opacity-80, `#154359`

**Animations (GSAP ScrollTrigger) :**
- Cards gauche : `x: -60 → 0`, stagger 0.1s, scrub false, once
- Cards droite : `x: +60 → 0`, stagger 0.1s
- Vidéo centrale : clip-path reveal `inset(100% → 0%)`, delay 0.2s

**Bottom fade :** `linear-gradient(to bottom, rgba(240,245,247,0) 0%, rgba(240,245,247,0.7) 60%, #F0F5F7 100%)`, h-40 sm:h-56, absolute bottom-0, z-10

---

### Section 3 — Résultats `(bg #F0F5F7)`

Padding `py-20 sm:py-28 px-6 sm:px-10`. `max-w-7xl mx-auto`.

**Top row (flex-col mobile / flex-row lg) — couleur `#154359` :**

Gauche :
```
Résultats
Concrets
```
TT Firs Neue, 36px/48px/54px, font-semibold, uppercase, tracking-tight, leading-[0.95]

Droite (max-w-xl) :
- Paragraphe : "BNK Conseil accompagne les TPE, artisans et indépendants pour structurer leur croissance commerciale et renforcer leur présence digitale."
- Paragraphe 2 : "Une approche terrain, des résultats mesurables, et des premiers effets visibles en 30 jours."
- Lien Calendly chamfré avec `ArrowUpRight` : "Réserver un diagnostic gratuit" → `https://calendly.com/conseil-bnk/30min`

**Stats grid (mt-14) — 1 col / 2 col md / 3 col lg, gap-5 :**

| Card | Valeur | Description | Image (stock) |
|---|---|---|---|
| Card 1 | `+40%` | de CA moyen sur 6 mois | business/growth |
| Card 2 (lg:mt-24) | `50+` | missions TPE & indépendants | collaboration |
| Card 3 | `30j` | pour les premiers résultats | action/speed |

**StatCard :**
- Outer : `w-full h-[280px] sm:h-[340px]`, `background: rgba(255,255,255,0.8)`, `padding: 1.5px`, `clip-path` appliqué
- Inner : `w-full h-full overflow-hidden bg-cover bg-center`, `mix-blend-mode: plus-darker`, même clip-path
- Text overlay (absolute) : valeur TT Firs Neue 36px/52px gradient text, description 14px `#154359`

Clip-paths (identiques Stellar) :
- Card 1 : `polygon(64px 0, calc(100% - 14px) 0, ..., 0 64px)` — text `left-6 right-6 bottom-6`
- Card 2 : `polygon(0 14px, ..., 0 calc(100% - 64px))` — text `left-6 bottom-20`
- Card 3 : `polygon(0 14px, ..., calc(100% - 64px) 100%, ...)` — text `left-6 right-28 bottom-6`

**Animations (GSAP ScrollTrigger) :**
- Stats : counter animé `0 → valeur` au scroll, ease `power2.out`
- Cards : `y: 40 → 0`, `rotateY: 4 → 0`, stagger 0.15s, `transformPerspective: 1000`

**Bottom fade :** idem section 2

---

## 5. Overlays persistants (Home)

### PageIndicator (bottom-right)
- `pointer-events-none absolute bottom-4 sm:bottom-6 right-4 sm:right-8 z-40`
- Format : `01 — 03`, flex, gap-3, `text-white/80`, 10px, font-medium, uppercase, `tracking-[0.18em]`, `mix-blend-mode: difference`
- Ligne : `w-8 h-px bg-white/40`
- JS : Lenis `on('scroll')` → map progress 0-1 sur 1-3, `Math.round`

### ScrollHint (bottom-left)
- Même position, côté gauche
- Texte : "Faites défiler"
- `opacity: 1 → 0` après 20% de scroll (Framer Motion `useScroll` + `useTransform`)

---

## 6. Pages secondaires

Toutes les pages BNK (Offres, AuditCommercial, CreationSiteVitrine, Tarifs, APropos, RDV, Commander, ApercuSite, pages SEO/guides) héritent :
- Du **shell** (wrapper arrondi + scroll intérieur)
- De la **StellarNav** (overlay persistant)
- Des **tokens couleur** (remplace tout le violet)
- De la **typographie** TT Firs Neue pour les H1/H2, Inter pour le corps
- Des **chamfers** sur CTA et cards

Elles n'ont pas le système de 3 sections Stellar ni les overlays PageIndicator/ScrollHint — structure de page standard avec animations scroll sobres (Framer Motion `whileInView`).

---

## 7. Composants à créer / modifier

| Composant | Action |
|---|---|
| `AppLayout.jsx` | Ajouter shell + frame + scroll wrapper; intégrer Lenis GSAP |
| `StellarNav.jsx` | Nouveau — remplace `Header.jsx` |
| `NominationCard.jsx` | Nouveau — card angulaire SVG border |
| `StatCard.jsx` | Nouveau — stat card mix-blend-mode plus-darker |
| `PageIndicator.jsx` | Nouveau — overlay scroll progress |
| `ScrollHint.jsx` | Nouveau — overlay "Faites défiler" |
| `Home.jsx` | Refonte complète — 3 sections Stellar |
| `index.css` | Ajouter @import TT Firs Neue, .font-firs, .no-scrollbar |
| Toutes pages BNK | Appliquer tokens couleur + fonts |

`Header.jsx` est retiré du rendu (remplacé par `StellarNav`). L'`AvailabilityBanner` est conservé si `AVAILABILITY.active`.

---

## 8. Assets vidéo

Deux vidéos nécessaires :
- **Hero :** vidéo portrait/paysage professionnelle — recommandé Mixkit ou Pexels (bureau, consulting, dynamisme)
- **Services :** vidéo carrée ou proche — même source

À définir avant implémentation. Les URLs sont passées comme constantes dans `Home.jsx`.

---

## 9. Ce qui ne change pas

- Architecture React Router (routes identiques)
- SEOHead pattern
- Contenu des pages SEO/guides (structure conservée, tokens appliqués)
- Tout ce qui est sous `/portfolio`
- `src/config/availability.js`
- `src/lib/portfolio-content.js`
