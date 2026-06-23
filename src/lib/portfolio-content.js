// Portfolio de Théo Benkirane — contenu centralisé
// Modifier ce fichier pour mettre à jour les textes sans toucher aux composants

export const CHESS_MOVES = [
  { move: 'e4',   label: 'Ouverture',   sectionId: 'hero' },
  { move: 'Nf3',  label: 'Profil',      sectionId: 'about' },
  { move: 'Bb5',  label: 'Parcours',    sectionId: 'experience' },
  { move: 'O-O',  label: 'Compétences', sectionId: 'skills' },
  { move: 'Re1',  label: 'Projets',     sectionId: 'projects' },
  { move: 'c3',   label: 'Résultats',   sectionId: 'results' },
  { move: '♔',    label: 'Contact',     sectionId: 'contact' },
]

export const HERO = {
  name: 'Théo Benkirane',
  title: 'Account Manager',
  subtitle: 'Stratège commercial & développeur de portefeuille',
  tagline: 'Relation client · Stratégie commerciale · IA & outils digitaux',
  cta: {
    cv: '/cv-theo-benkirane.pdf',
    linkedin: 'https://linkedin.com/in/theobenkirane',
    email: 'theo.benkirane@icloud.com',
  },
}

export const ABOUT = {
  intro: [
    'Joueur d\'échecs depuis l\'adolescence — chaque partie m\'a appris à anticiper, à construire une stratégie sur plusieurs coups et à prendre des décisions sous pression. J\'applique cette logique à la vente et au business.',
    'Account Manager chez LegalPlace, j\'accompagne chaque jour des entrepreneurs de la création jusqu\'à l\'obtention de leur Kbis. Mon approche combine relation humaine et analyse data pour identifier les vrais leviers de croissance.',
    'Ce qui me différencie : j\'utilise activement l\'IA (LLM, automatisation, analyse de données) dans mes méthodes de travail. Je construis des outils digitaux en parallèle de mon activité commerciale — Campus Bridge, TapeType, BNK Conseil. Le commercial du futur comprend la tech. Je m\'y prépare.',
  ],
  formation: [
    {
      degree: 'MBA Directeur Commercial',
      school: 'IDRAC Business School — Montpellier',
      period: '2024 — 2026',
      note: 'Diplôme octobre 2026',
    },
    {
      degree: 'Certification IAS Niveau III — Distribution d\'assurance',
      school: 'IFPASS',
      period: '2025',
    },
    {
      degree: 'Bachelor Business Developer',
      school: 'ICL — L\'école des Business Developers',
      period: '2023 — 2024',
    },
    {
      degree: 'Bachelor GESAI',
      school: 'ESPI Montpellier',
      period: '2022 — 2023',
    },
    {
      degree: 'BTS Professions Immobilières',
      school: 'CFA IGS Paris',
      period: '2020 — 2022',
    },
  ],
}

export const EXPERIENCE = [
  {
    id: 'legalplace',
    role: 'Account Manager',
    company: 'LegalPlace',
    location: 'Montpellier',
    period: 'Jan. 2025 — Aujourd\'hui',
    badge: '🏆 Top performer',
    missions: [
      'Onboarding d\'entrepreneurs — accompagnement de la création au Kbis',
      'Analyse des besoins et proposition de solutions (comptabilité, domiciliation, juridique)',
      'Animation de formations commerciales & team leader d\'alternants',
      'Contribution à l\'optimisation du parcours client',
    ],
    stat: null,
  },
  {
    id: 'andragogy',
    role: 'Business Developer',
    company: 'Andragogy',
    location: 'Sète',
    period: 'Nov. 2024 — Jan. 2025',
    badge: null,
    missions: [
      'Identification et prospection de nouveaux clients',
      'Élaboration de stratégies de vente multicanal',
      'Fidélisation du portefeuille existant',
      'Participation au recrutement et talent acquisition',
    ],
    stat: null,
  },
  {
    id: 'matchers',
    role: 'SDR',
    company: 'Matchers',
    location: 'Montpellier',
    period: 'Nov. 2023 — Sep. 2024',
    badge: null,
    missions: [
      '200 appels/jour — 1 RDV qualifié sur 10 appels',
      'Objectifs atteints chaque mois',
      'Qualification de prospects et génération de leads',
    ],
    stat: null,
  },
  {
    id: 'groupagora',
    role: 'Chargé d\'affaires',
    company: 'Groupagora',
    location: 'Pérols',
    period: 'Sep. — Nov. 2023',
    badge: null,
    missions: [
      'Recrutement et qualification de profils IT',
      'Prospection B2B et négociation commerciale',
    ],
    stat: null,
  },
  {
    id: 'stephaneplaza',
    role: 'Négociateur immobilier',
    company: 'Stéphane Plaza Immobilier',
    location: 'Saint-Gratien (95) → Lattes (34)',
    period: '2021 — 2023',
    badge: null,
    missions: [
      'Estimation et commercialisation de biens immobiliers',
      'Négociation et rédaction d\'actes (mandats, compromis)',
      'Prospection terrain et développement de portefeuille',
    ],
    stat: null,
  },
]

export const SKILLS = [
  {
    category: 'Développement commercial',
    icon: '♞',
    items: [
      'Gestion de portefeuille clients',
      'Détection & qualification des besoins',
      'Upsell / Cross-sell',
      'Négociation & closing',
    ],
  },
  {
    category: 'Analyse & Performance',
    icon: '♜',
    items: [
      'Analyse de données commerciales',
      'Suivi & optimisation des ventes',
      'Analyse de marché',
      'KPIs & reporting',
    ],
  },
  {
    category: 'IA & Tech',
    icon: '♕',
    items: [
      'Prompting & LLM (ChatGPT, Claude, Gemini)',
      'Automatisation de process commerciaux',
      'Analyse de données & reporting',
      'Développement web (HTML, CSS, React — notions)',
    ],
  },
  {
    category: 'Outils',
    icon: '♝',
    items: [
      'Excel / Google Sheets (tableaux croisés, macros)',
      'CRM (HubSpot, Salesforce)',
      'Notion / Slack / Make (Integromat)',
      'Pack Google & Office',
    ],
  },
  {
    category: 'Soft Skills',
    icon: '♛',
    items: [
      'Relationnel fort',
      'Pédagogie & accompagnement client',
      'Résolution de problèmes',
      'Leadership',
    ],
  },
]

export const PROJECTS = [
  {
    id: 'bnk',
    name: 'BNK Conseil',
    tagline: 'Conseil en développement commercial — TPE & startups',
    description: 'Audit commercial, création de site vitrine, stratégie réseaux sociaux. Accompagnement de dirigeants dans leur croissance.',
    tags: ['Consulting', 'Commercial', 'Digital'],
    url: 'https://bnk-conseil.com',
    status: 'Actif',
  },
  {
    id: 'campusbridge',
    name: 'Campus Bridge',
    tagline: 'Mise en relation alternants, écoles & entreprises',
    description: 'Plateforme facilitant le matching entre candidats en alternance, centres de formation et employeurs.',
    tags: ['EdTech', 'Plateforme', 'Alternance'],
    url: '#',
    status: 'En cours',
  },
  {
    id: 'tapetype',
    name: 'TapeType.fr',
    tagline: 'Améliorez votre vitesse de frappe',
    description: 'Plateforme web gamifiée pour s\'entraîner à la dactylographie, avec classements et défis personnalisés.',
    tags: ['SaaS', 'Gamification', 'Web'],
    url: '#',
    status: 'En cours',
  },
]

export const STATS = [
  {
    value: 200,
    suffix: '+',
    label: 'Clients / mois',
    description: 'Entrepreneurs onboardés chez LegalPlace',
    isText: false,
  },
  {
    value: 200,
    suffix: '%',
    label: 'Objectifs dépassés',
    description: 'Entre 150 et 250% chaque mois',
    isText: false,
  },
  {
    value: 10,
    suffix: '%',
    label: 'Taux de conversion',
    description: '1 RDV qualifié sur 10 appels (Matchers)',
    isText: false,
  },
]

export const CONTACT = {
  tagline: 'Parlons de votre prochain coup.',
  email: 'theo.benkirane@icloud.com',
  phone: '07 83 29 84 21',
  linkedin: 'https://linkedin.com/in/theobenkirane',
  cv: '/cv-theo-benkirane.pdf',
  mobility: 'IDF / Paris · Montpellier · Remote',
}
