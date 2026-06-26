# BNK Conseil, Phase 1 : Upgrade Home liquid chrome + interactivité

**Date :** 2026-06-26
**Scope :** Home (Hero, Services, Résultats) + shell + design system + primitives interactives signature. Hors portfolio.
**Baseline :** ce document upgrade `2026-06-26-bnk-stellar-refonte-design.md`. Il garde le shell Stellar, la nav, l'indicateur et corrige/remplace ce qui rend mal.
**Stack :** React 19, Vite 8, Tailwind v4, Framer Motion, GSAP + ScrollTrigger, Lenis, + un mini moteur WebGL maison (sans dépendance lourde).

---

## 0. Objectif

Le rendu actuel est plat et bugué. Trois bugs visibles et un manque d'âme. Cette phase :
1. corrige les trois bugs,
2. remplace le hero vidéo par un fond liquid chrome teal en shader WebGL,
3. ajoute des primitives interactives signature (curseur, CTA magnétiques, reveals, transitions liquides),
4. centralise les couleurs en variables CSS.

Le portfolio (`/portfolio`) n'est pas touché. Les pages secondaires sont la Phase 2 (spec séparée).

---

## 1. Bugs à corriger

| # | Symptôme | Cause | Correction |
|---|----------|-------|------------|
| 1 | Section Services écrasée, texte qui wrap, colonnes minuscules | `max-w-5xl` trop étroit pour 3 colonnes (cartes + vidéo centre + cartes), centre en `flex-1`, `lg:mt-36` | Nouveau layout Services (voir §5) avec largeur élargie et grille respirante |
| 2 | StatCards illisibles, images délavées, texte qui chevauche | `mixBlendMode: 'plus-darker'` non standard | Retirer le mix-blend. Duotone teal propre via overlay gradient + image normale (voir §6) |
| 3 | Hero plat et délavé | Vidéo bureau générique + overlay sombre | Remplacer par fond shader liquid chrome (voir §4) |

---

## 2. Fondation : tokens couleur centralisés

Aujourd'hui les hex teal sont dispersés en dur dans une dizaine de fichiers (`#066377`, `#3B9BB3`, `#154359`, `#4BBDF0`, `#185B7B`, `rgba(6,99,119,...)`). On les centralise.

Dans `index.css`, sous `@import "tailwindcss";`, déclarer :

```css
:root {
  --c-dark: #154359;        /* texte titres */
  --c-teal: #066377;        /* primaire CTA */
  --c-teal-mid: #3B9BB3;    /* accent */
  --c-chrome-lo: #185B7B;   /* gradient bas */
  --c-chrome-hi: #4BBDF0;   /* gradient haut */
  --c-bg: #FAFBFF;
  --c-bg-services: #F0F0F0;
  --c-bg-results: #F0F5F7;
  --grad-display: linear-gradient(294deg, var(--c-chrome-lo) 20%, var(--c-chrome-hi));
  --clip-cta: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
}
```

Portée Phase 1 : remplacer les hex en dur par ces variables dans les fichiers touchés par cette phase (`Home.jsx`, `StellarNav.jsx`, `NominationCard.jsx`, `StatCard.jsx`, `PageIndicator.jsx`, `ScrollHint.jsx`, `index.css`). Les autres pages seront migrées en Phase 2. On ne casse rien : les valeurs sont identiques, on remplace juste la source.

---

## 3. Primitives interactives signature (nouveaux composants réutilisables)

Quatre primitives, créées une fois, utilisées sur la Home et réutilisables en Phase 2.

### 3.1 `LiquidCursor` (`src/components/stellar/LiquidCursor.jsx`)
- Curseur custom rendu dans un overlay du shell (`pointer-events-none`, z élevé).
- Un point teal qui suit la souris avec lissage (lerp via rAF ou `framer-motion` springs).
- Grossit et change d'opacité au survol des éléments interactifs (`a`, `button`, `[data-cursor]`).
- Désactivé si pointeur grossier (`@media (pointer: coarse)`) ou `prefers-reduced-motion`. Le curseur natif reste alors visible.
- Ne capture jamais les clics (`pointer-events-none`).

### 3.2 `MagneticButton` (`src/components/stellar/MagneticButton.jsx`)
- Wrapper autour d'un `<a>`/`<Link>` chamfré (`--clip-cta`).
- Au survol, le bouton est attiré vers le curseur (translation lissée, amplitude faible ~8 à 12px), revient à 0 au `mouseleave`.
- Balayage chrome (sheen) : un reflet diagonal qui traverse le bouton au survol (pseudo-élément animé en CSS).
- Respecte `prefers-reduced-motion` : pas de magnétisme, le sheen reste.
- Sert pour tous les CTA "Réserver".

### 3.3 `Reveal` (`src/components/stellar/Reveal.jsx`)
- Wrapper qui révèle son enfant à l'entrée dans le viewport via GSAP ScrollTrigger (scroller = le shell).
- Variantes par prop : `up` (translate + fade), `clip` (masque `inset`), `chars` (révélation mot par mot pour les gros titres).
- `once: true`. Respecte `prefers-reduced-motion` (apparition immédiate sans transform).

### 3.4 Transition liquide entre sections
- Un filtre SVG gooey (`feGaussianBlur` + `feColorMatrix`) défini une fois dans le shell, appliqué aux bords de section pour un raccord "fondu liquide" plutôt qu'une coupe nette.
- Implémenté comme un séparateur réutilisable `LiquidDivider` posé entre les sections, teinté avec la couleur de fond de la section suivante.
- Pure présentation, pas de JS lourd.

---

## 4. Hero : fond liquid chrome WebGL

Remplace entièrement la vidéo et l'overlay sombre actuels.

### Composant `LiquidChrome` (`src/components/stellar/LiquidChrome.jsx`)
- Canvas plein cadre, rendu par un mini-moteur WebGL maison (création de contexte, un quad plein écran, un fragment shader). Pas de Three.js, pas de react-three-fiber.
- Le fragment shader produit un aspect chrome liquide teal :
  - bruit fbm domain-warpé qui ondule lentement dans le temps (`uTime`),
  - bandes métalliques (le warp module une rampe de luminance) pour l'effet "chrome fondu",
  - palette mappée sur les tokens : creux `--c-chrome-lo`, crêtes `--c-chrome-hi`, fonds clairs proches de `--c-bg`,
  - reflet spéculaire mobile (highlight qui glisse) pour le côté métallique.
- Uniforms : `uTime`, `uResolution`, `uPointer` (la souris décale légèrement le warp pour un effet réactif subtil).
- Boucle d'animation via `requestAnimationFrame`, mise en pause quand l'onglet est caché (`visibilitychange`) et quand le hero sort du viewport.
- WebGL partout (choix utilisateur). Garde-fous :
  - si le contexte WebGL échoue à se créer, fallback sur un fond CSS (mesh gradient teal statique),
  - si `prefers-reduced-motion`, on rend une seule frame statique (pas d'animation).
- Gestion DPR plafonnée (`Math.min(devicePixelRatio, 2)`) et resize observer pour rester net sans surcharger.

### Contenu hero (au-dessus du canvas)
Conserve la structure et les animations d'entrée Framer Motion existantes, mais :
- couleur du titre adaptée pour rester lisible sur le chrome (le titre reste `--c-dark`, le shader garde des zones claires derrière le texte ; un voile radial très léger `rgba(255,255,255,0.0 -> 0.35)` centré derrière le bloc texte garantit le contraste sans masquer le chrome),
- eyebrow : `CONSEIL COMMERCIAL · DEPUIS 2022`,
- H1 : `BNK` / `Conseil` (display, tailles inchangées),
- sous-titre amélioré (voir §8 contenu),
- CTA via `MagneticButton`,
- "SCROLL TO DISCOVER" en bas (réutilise/aligne le `ScrollHint`).

Le titre H1 utilise `Reveal` variante `chars` pour une entrée premium.

---

## 5. Services : fix layout + cartes interactives

Section `bg var(--c-bg-services)`.

### Layout corrigé
- Conteneur élargi : `max-w-6xl` (au lieu de `max-w-5xl`), `px` généreux.
- Abandon de la composition 3 colonnes compressée. Nouvelle structure :
  - en-tête centré : kicker `[ SERVICES ]`, titre `Services` (display), courte phrase d'intro,
  - dessous, une grille de 6 cartes service `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5`, chaque carte respirante (hauteur confortable, pas de wrap forcé).
- Suppression de la vidéo centrale qui casse la grille. Pas de média en `flex-1`. Si un visuel est souhaité, ce sera une carte média à part entière dans la grille (même gabarit que les cartes service), jamais une colonne qui écrase les autres.

### `NominationCard` enrichie
- Garde la bordure SVG chamfrée (polygon teal).
- Ajout interactions :
  - hover 3D tilt léger (rotation selon la position du curseur dans la carte, amplitude faible, lissée), désactivé en reduced-motion / pointeur grossier,
  - balayage chrome (sheen) diagonal au survol,
  - le sous-titre/flèche se révèle ou se renforce au survol.
- Texte aligné proprement, titre et sous-titre sur des lignes stables (pas de wrap accidentel).
- Reste un `<Link>` vers la page du service.

### Animations d'entrée
- Cartes révélées en cascade via `Reveal` (stagger), au scroll, `once`.

---

## 6. Résultats : StatCards lisibles

Section `bg var(--c-bg-results)`.

### `StatCard` corrigée
- Supprimer `mixBlendMode: 'plus-darker'`.
- Image de fond rendue normalement (`bg-cover bg-center`), puis duotone teal propre :
  - overlay gradient teal semi-opaque (`--c-chrome-lo` vers transparent) garantissant le contraste du texte,
  - optionnel : `filter` léger (saturation/teinte) pour homogénéiser les photos vers le teal.
- Garde le chamfer (clip-path par variante) mais net, sans chevauchement de texte : positions de texte revues pour ne jamais sortir de la carte.
- Valeur en gros chiffre avec **compteur animé** au scroll (de 0 à la valeur), via ScrollTrigger. Le format (`+40%`, `50+`, `30j`) est géré par un suffixe/préfixe.
- Label court en dessous, `--c-dark`.

### Animations
- Reveal en cascade des cartes (`y` + légère profondeur), `once`.
- Le compteur démarre quand la carte entre dans le viewport.

---

## 7. Overlays (inchangés sur le principe, alignés tokens)
- `StellarNav` : conservée, hex remplacés par variables, CTA passe en `MagneticButton`.
- `PageIndicator` : conservé (01 — 03). Reste lisible via `mix-blend-mode: difference` au-dessus du chrome.
- `ScrollHint` : conservé, sert de "SCROLL TO DISCOVER".
- `LiquidCursor` ajouté à la liste des overlays dans `AppLayout`.

---

## 8. Contenu (amélioration des textes, style humain, sans tirets longs)

Réécrire les accroches pour donner envie, en gardant le sens. Phrases courtes, directes, sans jargon, sans tiret long.

- Eyebrow : `CONSEIL COMMERCIAL · DEPUIS 2022` (inchangé).
- Sous-titre hero (valeur par défaut retenue) : "Sites qui convertissent. Audit commercial. Résultats en 30 jours." Ajustable au moment de l'implémentation si tu préfères une autre formulation.
- Intro Services : une phrase qui pose la promesse.
- Les libellés de cartes et stats restent factuels.

Aucun tiret long (—) dans tout texte écrit ou modifié. Relecture obligatoire.

---

## 9. Composants créés / modifiés (Phase 1)

| Fichier | Action |
|---|---|
| `src/index.css` | Variables couleur, classe `.btn-liquid`/sheen, filtre gooey si global |
| `src/components/stellar/LiquidChrome.jsx` | Nouveau, shader hero |
| `src/components/stellar/LiquidCursor.jsx` | Nouveau, curseur custom |
| `src/components/stellar/MagneticButton.jsx` | Nouveau, CTA magnétique + sheen |
| `src/components/stellar/Reveal.jsx` | Nouveau, reveals scroll |
| `src/components/stellar/LiquidDivider.jsx` | Nouveau, séparateur liquide |
| `src/components/NominationCard.jsx` | Tilt + sheen + texte stable |
| `src/components/StatCard.jsx` | Retrait mix-blend, duotone, compteur |
| `src/pages/Home.jsx` | Hero shader, Services relayouté, Résultats |
| `src/layouts/AppLayout.jsx` | Ajout `LiquidCursor` aux overlays |
| `src/components/StellarNav.jsx` | Tokens + CTA magnétique |

---

## 10. Perf et accessibilité
- WebGL partout, mais : DPR plafonné, pause hors-écran/onglet caché, fallback CSS si contexte échoue.
- `prefers-reduced-motion` respecté partout (shader figé, pas de magnétisme, reveals immédiats, pas de tilt).
- Pointeur grossier : pas de curseur custom, pas de tilt, pas de magnétisme.
- Pas de nouvelle dépendance lourde. Le moteur WebGL est un petit composant maison.

---

## 11. Vérification (avant de déclarer terminé)
- `npm run build` passe.
- `npm run lint` passe.
- Vérif visuelle via preview : hero anime le chrome, Services lisible à toutes largeurs, StatCards nettes avec compteur, CTA magnétiques, curseur custom, reveals au scroll.
- Test reduced-motion : tout reste lisible et statique.
- Le portfolio (`/portfolio`) est intact.

---

## 12. Ce qui ne change pas (Phase 1)
- Routes, SEOHead, `availability.js`, `portfolio-content.js`.
- Pages secondaires (Phase 2).
- Tout `/portfolio`.
- Le shell Stellar, la nav, l'indicateur, le scroll Lenis (enrichis, pas remplacés).
