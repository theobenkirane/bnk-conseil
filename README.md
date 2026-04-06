# BNK Consulting — Site vitrine

Site vitrine en français pour BNK Consulting, cabinet d'accompagnement commercial pour startups et scale-ups.

## Stack technique

- **React 19** + **Vite 6**
- **TailwindCSS v4** (via `@tailwindcss/vite`)
- **React Router v7** (multi-page SPA)
- **Framer Motion** (animations de page et composants)
- **Calendly embed** (iframe sur la page /rdv)

## Lancer le projet

### Prérequis

- Node.js >= 18
- npm >= 9

### Installation

```bash
# Naviguer dans le dossier
cd bnk-consulting

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:5173`.

### Build de production

```bash
npm run build
```

Les fichiers compilés seront dans le dossier `dist/`.

### Prévisualiser le build

```bash
npm run preview
```

## Structure du projet

```
bnk-consulting/
├── src/
│   ├── components/
│   │   ├── Header.jsx               # Header sticky avec nav responsive + hamburger mobile
│   │   ├── Footer.jsx               # Footer avec liens sociaux
│   │   ├── AnimatedCounter.jsx      # Compteur animé au scroll (useInView)
│   │   ├── OfferCard.jsx            # Card d'offre réutilisable
│   │   ├── OfferModal.jsx           # Modal détail d'offre (Framer Motion)
│   │   ├── TestimonialCarousel.jsx  # Carousel témoignages avec auto-rotation
│   │   └── PageTransition.jsx       # Wrapper animation de transition de page
│   ├── pages/
│   │   ├── Home.jsx       # Page d'accueil (/)
│   │   ├── Offres.jsx     # Page offres (/offres)
│   │   ├── APropos.jsx    # Page à propos (/a-propos)
│   │   └── RDV.jsx        # Page prise de RDV (/rdv)
│   ├── App.jsx            # Router principal avec AnimatePresence
│   ├── main.jsx           # Point d'entrée React
│   └── index.css          # Styles globaux + import Tailwind v4
├── index.html             # HTML avec Google Fonts Inter
├── vite.config.js         # Config Vite + plugin Tailwind
├── tailwind.config.js     # Config Tailwind (couleurs, fonts)
└── README.md
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — hero avec typewriter, stats animées, "Pourquoi BNK", offres preview, témoignages carousel, CTA final |
| `/offres` | 4 offres détaillées en grid, avec modals et boutons "Réserver un appel" |
| `/a-propos` | Mission, valeurs (3), équipe fictive (3 profils), timeline milestones |
| `/rdv` | Calendly embed + formulaire de contact alternatif côte à côte |

## Palette de couleurs

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#7C3AED` | Violet principal |
| `primary-light` | `#A855F7` | Violet clair (gradients) |
| `accent` | `#F59E0B` | Ambre/or (prix, accents) |
| `dark` | `#0F0F0F` | Fond principal |
| `dark-2` | `#1A1A2E` | Fond sections alternées |

## Personnalisation

- **URL Calendly** : modifier `src="https://calendly.com/bnk-consulting"` dans `src/pages/RDV.jsx`
- **Contenu** : tout le contenu fictif est directement dans les fichiers de pages
- **Couleurs** : modifier `tailwind.config.js` pour ajuster la palette

## Déploiement

Compatible avec Vercel, Netlify, ou tout hébergeur statique.

```bash
npm run build
# Déployer le dossier dist/
```
