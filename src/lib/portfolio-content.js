// Portfolio de Théo Benkirane — contenu centralisé.
// Modifier ce fichier pour mettre à jour les textes sans toucher aux composants.

// ── Navigation latérale (sections) ───────────────────────────────────────────
export const SECTIONS = [
  { id: 'hero',          label: 'Accueil' },
  { id: 'about',         label: 'Profil' },
  { id: 'experience',    label: 'Parcours' },
  { id: 'skills',        label: 'Compétences' },
  { id: 'projects',      label: 'Projets' },
  { id: 'results',       label: 'Résultats' },
  { id: 'compatibility', label: 'Compatibilité' },
  { id: 'contact',       label: 'Contact' },
]

// ── Héros ─────────────────────────────────────────────────────────────────────
export const HERO = {
  name: 'Théo Benkirane',
  role: 'Account Manager',
  domain: 'SaaS · Banque · Assurance · Conseil',
  headline: ['Transformer', 'des prospects', 'en clients', 'qui restent.'],
  pitch:
    "Cinq ans sur le terrain commercial, top performer chez LegalPlace. Je fais grandir des portefeuilles avec de la vraie relation client, des chiffres qui suivent, et les outils IA pour aller plus vite. Et je code mes propres produits à côté.",
  status: 'Disponible pour un CDI',
  facts: [
    { prefix: '', value: 200, suffix: '+', v: 'clients onboardés / mois' },
    { prefix: '150–', value: 250, suffix: ' %', v: 'des objectifs atteints' },
    { prefix: '+', value: 80, suffix: ' %', v: "taux d'upsell" },
    { prefix: '', value: 5, suffix: ' ans', v: "d'expérience terrain" },
  ],
  cta: {
    cv: '/Theo_Benkirane_CV_2026.pdf',
    linkedin: 'https://linkedin.com/in/theobenkirane',
    email: 'theo.benkirane@icloud.com',
  },
}

// ── Profil ────────────────────────────────────────────────────────────────────
export const ABOUT = {
  eyebrow: 'Le profil',
  headline: 'Commercial de terrain, culture tech.',
  lead: "Depuis cinq ans, je vends, je négocie et je fidélise. Ce qui change aujourd'hui : j'intègre l'IA et les outils digitaux à chaque étape pour aller plus vite et viser plus haut.",
  paragraphs: [
    "Account Manager chez LegalPlace, j'accompagne chaque jour des entrepreneurs, de la création de leur société jusqu'à l'obtention de leur Kbis. Écoute, analyse du besoin, vente de solutions à forte valeur : c'est ma routine, et elle est rentable.",
    "Je construis aussi mes propres outils : sites, automatisations, plateformes web. Cette double casquette, commerciale et tech, m'aide à comprendre un produit SaaS de l'intérieur et à parler le même langage que les équipes produit.",
  ],
  facts: [
    { label: 'Âge',      value: '24 ans' },
    { label: 'Basé à',   value: 'Montpellier' },
    { label: 'Mobilité', value: 'Paris · IDF · Remote' },
    { label: 'Permis',   value: 'B & A2 · Véhiculé' },
  ],
  formation: [
    { degree: 'MBA Directeur Commercial', school: 'IDRAC Business School · Montpellier', period: '2024 → 2026', note: 'Diplôme oct. 2026' },
    { degree: 'Certification IAS Niveau III', school: "Distribution d'assurance · IFPASS", period: '2025' },
    { degree: 'Bachelor Business Developer', school: 'ICL · Montpellier', period: '2023 → 2024' },
    { degree: 'BTS Professions Immobilières', school: 'CFA IGS · Paris', period: '2020 → 2022' },
  ],
}

// ── Parcours ──────────────────────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    id: 'legalplace',
    role: 'Account Manager',
    company: 'LegalPlace',
    logo: '/portfolio/legalplace-mark.png',
    type: 'Alternance',
    location: 'Montpellier',
    period: 'Jan. 2025 → Aujourd\'hui',
    badge: 'Top performer',
    highlight: "200+ entrepreneurs accompagnés chaque mois, objectifs dépassés de 150 à 250 %.",
    missions: [
      "Onboarding des entrepreneurs, de la création de société à l'obtention du Kbis",
      'Détection des besoins et vente de solutions (compta, domiciliation, juridique)',
      "Upsell supérieur à 80 % sur le portefeuille",
      "Animation de formations et encadrement d'alternants",
    ],
    tags: ['SaaS', 'LegalTech', 'Account Management'],
  },
  {
    id: 'andragogy',
    role: 'Business Developer',
    company: 'Andragogy',
    logo: '/portfolio/andragogy.jpg',
    type: 'Alternance',
    location: 'Sète',
    period: 'Nov. 2024 → Jan. 2025',
    highlight: 'Ouverture de nouveaux comptes et structuration de la prospection multicanal.',
    missions: [
      'Prospection et ouverture de nouveaux comptes B2B',
      'Stratégies de vente multicanal',
      'Fidélisation du portefeuille existant',
    ],
    tags: ['Business Development', 'B2B'],
  },
  {
    id: 'matchers',
    role: 'Sales Development Representative',
    company: 'Matchers',
    logo: '/portfolio/matchers.webp',
    type: 'Alternance',
    location: 'Montpellier',
    period: 'Nov. 2023 → Sep. 2024',
    highlight: '200 appels par jour, 1 RDV qualifié sur 10. Objectifs atteints chaque mois.',
    missions: [
      'Prospection téléphonique à haut volume (200 appels / jour)',
      'Qualification de prospects et prise de RDV qualifiés',
      'Génération de leads pour les équipes commerciales',
    ],
    tags: ['Prospection', 'SDR'],
  },
  {
    id: 'groupagora',
    role: "Chargé d'affaires",
    company: 'Groupagora',
    logo: '/portfolio/groupagora-mark.png',
    type: 'Alternance',
    location: 'Pérols',
    period: 'Sep. → Nov. 2023',
    highlight: 'Recrutement et placement de profils IT en environnement B2B exigeant.',
    missions: [
      'Sourcing et qualification de profils IT',
      'Prospection B2B et négociation commerciale',
    ],
    tags: ['Recrutement', 'IT'],
  },
  {
    id: 'stephaneplaza',
    role: 'Négociateur immobilier',
    company: 'Stéphane Plaza Immobilier',
    logo: '/portfolio/plaza.png',
    type: 'Alternance',
    location: 'Région parisienne, puis Lattes',
    period: '2021 → 2023',
    highlight: "Cycle de vente complet géré en autonomie, de l'estimation à la signature.",
    missions: [
      'Estimation et commercialisation de biens',
      'Négociation et rédaction des actes (mandats, compromis)',
      'Prospection terrain et développement de portefeuille',
    ],
    tags: ['Négociation', 'Terrain'],
  },
]

// ── Compétences ───────────────────────────────────────────────────────────────
export const SKILLS = [
  {
    category: 'Développement commercial',
    items: ['Gestion de portefeuille', 'Détection & qualification des besoins', 'Upsell / Cross-sell', 'Négociation & closing'],
  },
  {
    category: 'Analyse & Performance',
    items: ['Analyse de données commerciales', 'Suivi & optimisation des ventes', 'Analyse de marché', 'KPIs & reporting'],
  },
  {
    category: 'IA & Tech',
    highlight: true,
    items: ['Prompting & LLM (ChatGPT, Claude, Gemini)', 'Automatisation de process', 'Reporting augmenté', 'Développement web (HTML, CSS, React)'],
  },
  {
    category: 'Outils',
    items: ['Excel / Sheets (TCD, macros)', 'CRM (HubSpot, Salesforce)', 'Notion · Slack · Make', 'Pack Google & Office'],
  },
  {
    category: 'Soft skills',
    items: ['Relationnel fort', 'Pédagogie & accompagnement', 'Résolution de problèmes', 'Leadership'],
  },
]

// ── Projets ──────────────────────────────────────────────────────────────────
export const PROJECTS_INTRO =
  "Ce que je construis en dehors du bureau. La meilleure façon de montrer que je sais passer d'une idée à un produit qui tourne, en autonomie."

export const PROJECTS = [
  {
    id: 'bnk',
    index: '01',
    name: 'BNK Conseil',
    tagline: 'Conseil en développement commercial · TPE & startups',
    description: "Audit commercial, création de site et stratégie d'acquisition. J'accompagne des dirigeants dans leur croissance, de la première prise de contact au closing.",
    tags: ['Consulting', 'Acquisition', 'Web'],
    url: 'https://bnk-conseil.com',
    status: 'Actif',
    brand: '#BE823A',
    logo: null,
    screen: '/portfolio/bnk-screen.png',
  },
  {
    id: 'campusbridge',
    index: '02',
    name: 'Campus Bridge',
    tagline: 'Plateforme de matching · alternants × écoles × entreprises',
    description: "Un produit qui répond à un vrai besoin de mise en relation sur le marché de l'alternance. Plus de 1 000 étudiants déjà accompagnés.",
    tags: ['EdTech', 'Plateforme', 'Produit'],
    url: '#',
    status: 'En cours',
    brand: '#1F3A6B',
    accent: '#F2A04E',
    logo: '/portfolio/campusbridge-logo.png',
    screen: '/portfolio/campusbridge-screen.png',
  },
  {
    id: 'tapetype',
    index: '03',
    name: 'TapeType.fr',
    tagline: 'Entraînement à la frappe, gamifié',
    description: "Un side project mené du concept au déploiement : classements, défis personnalisés et progression mesurée.",
    tags: ['SaaS', 'Gamification', 'Web'],
    url: '#',
    status: 'En cours',
    brand: '#5B6CFF',
    logo: '/portfolio/tapetype-logo.png',
    screen: '/portfolio/tapetype-screen.png',
  },
]

// ── Résultats ─────────────────────────────────────────────────────────────────
export const STATS = [
  { value: 200, suffix: '+', label: 'Clients / mois', description: 'Entrepreneurs onboardés chez LegalPlace' },
  { value: 250, suffix: ' %', label: 'Objectifs atteints', description: 'Entre 150 et 250 % chaque mois' },
  { value: 80, suffix: ' %', label: "Taux d'upsell", description: 'Sur le portefeuille géré' },
  { value: 10, suffix: ' %', label: 'Taux de conversion', description: '1 RDV qualifié sur 10 appels (Matchers)' },
]

export const STATS_NOTE =
  "Top performer de l'équipe depuis mon arrivée, avec des performances au-dessus de la moyenne des collaborateurs en CDI."

// ── Quiz de compatibilité ─────────────────────────────────────────────────────
export const QUIZ = {
  eyebrow: 'Compatibilité',
  intro: 'Vous recrutez ? Cinq questions rapides pour mesurer à quel point nos besoins se rejoignent.',
  questions: [
    {
      id: 'role', q: 'Quel poste cherchez-vous à pourvoir ?', multi: false,
      options: [
        { label: 'Account Manager / CSM', score: 25 },
        { label: 'Business Developer / Sales', score: 25 },
        { label: 'Sales Ops / Revenue', score: 22 },
        { label: 'Autre profil commercial', score: 15 },
      ],
    },
    {
      id: 'sector', q: 'Dans quel secteur ?', multi: false,
      options: [
        { label: 'SaaS / Tech', score: 25 },
        { label: 'Banque / Assurance', score: 25 },
        { label: 'Services B2B', score: 18 },
        { label: 'Autre secteur', score: 12 },
      ],
    },
    {
      id: 'expect', q: 'Vos priorités ? (plusieurs choix possibles)', multi: true,
      options: [
        { label: 'Performance chiffrée', score: 9 },
        { label: 'Relation client long terme', score: 9 },
        { label: 'Autonomie & initiative', score: 8 },
        { label: "Maîtrise des outils & de l'IA", score: 9 },
      ],
    },
    {
      id: 'contract', q: 'Quel type de contrat ?', multi: false,
      options: [
        { label: 'CDI', score: 50 },
        { label: 'Freelance / mission', score: 5 },
        { label: 'Alternance', score: 0 },
        { label: 'Stage', score: 0 },
      ],
    },
    {
      id: 'location', q: 'Où se situe le poste ?', multi: false,
      options: [
        { label: 'Paris / Île-de-France', score: 15 },
        { label: 'Montpellier', score: 15 },
        { label: 'Full remote', score: 14 },
        { label: 'Autre région', score: 8 },
      ],
    },
  ],
  maxRaw: 115,
  results: [
    { min: 90, title: 'On est faits pour la même équipe.', message: 'Le profil colle vraiment à votre besoin. Échangeons cette semaine.' },
    { min: 80, title: 'Très belle synergie.', message: "Il y a un vrai match. Parlons-en vite." },
    { min: 70, title: 'Bon potentiel.', message: 'Il y a de quoi construire ensemble. On en discute ?' },
    { min: 0,  title: 'À creuser.', message: "Il y a sûrement une façon de collaborer. Lançons la conversation." },
  ],
}

// ── Contact ───────────────────────────────────────────────────────────────────
export const CONTACT = {
  eyebrow: 'Contact',
  headline: 'Discutons de la suite.',
  sub: "Un poste à pourvoir, une question, ou simplement l'envie d'échanger ? Je réponds dans la journée.",
  email: 'theo.benkirane@icloud.com',
  phone: '07 83 29 84 21',
  linkedin: 'https://linkedin.com/in/theobenkirane',
  cv: '/Theo_Benkirane_CV_2026.pdf',
  mobility: 'Paris · IDF · Montpellier · Remote',
  web3formsKey: 'a95c8130-7241-4683-accd-6553e4f19b6a',
}
