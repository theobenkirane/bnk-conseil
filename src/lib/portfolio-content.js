// Portfolio de Théo Benkirane — contenu centralisé
// Modifier ce fichier pour mettre à jour les textes sans toucher aux composants

export const CHESS_MOVES = [
  { move: 'e4',   label: 'Ouverture',  sectionId: 'hero' },
  { move: 'Nf3',  label: 'Profil',     sectionId: 'about' },
  { move: 'Bb5',  label: 'Parcours',   sectionId: 'experience' },
  { move: 'O-O',  label: 'Compétences',sectionId: 'skills' },
  { move: 'Re1',  label: 'Projets',    sectionId: 'projects' },
  { move: 'c3',   label: 'Résultats',  sectionId: 'results' },
  { move: '♚',    label: 'Contact',    sectionId: 'contact' },
]

export const HERO = {
  name: 'Théo Benkirane',
  title: 'Account Manager — Stratège commercial',
  tagline: 'Analyse de marché, upsell, closing.',
  upsellTarget: 80,
  upsellLabel: '% taux d\'upsell',
  cta: {
    cv: '/cv-theo-benkirane.pdf',
    linkedin: 'https://linkedin.com/in/theobenkirane',
    email: 'theo.benkirane@icloud.com',
  },
}

export const ABOUT = {
  intro: [
    'Joueur d\'échecs depuis l\'adolescence, j\'aborde chaque vente comme une partie : anticiper les objections, construire la confiance, trouver le coup décisif.',
    'Account Manager chez LegalPlace, je m\'occupe de l\'onboarding d\'entrepreneurs et de la proposition de solutions adaptées à leurs besoins réels — comptabilité, domiciliation, statut juridique.',
    'En parallèle, je développe BNK Conseil, un cabinet de conseil en développement commercial pour TPE et startups, et j\'explore activement l\'IA, le machine learning et la création de produits digitaux.',
  ],
  formation: [
    {
      degree: 'MBA Directeur Commercial',
      school: 'IDRAC Montpellier',
      period: '2024 — 2026',
      note: 'Diplôme prévu octobre 2026',
    },
    {
      degree: 'Certification IAS Niveau III — Distribution d\'assurance',
      school: 'IFPASS',
      period: '2023',
    },
    {
      degree: 'Bachelor Business Developer',
      school: 'ICL Montpellier',
      period: '2022 — 2023',
    },
    {
      degree: 'Bachelor GESAI',
      school: 'ESPI Montpellier',
      period: '2021 — 2022',
    },
    {
      degree: 'BTS Professions Immobilières',
      school: 'CFA IGS Paris',
      period: '2020 — 2021',
    },
  ],
}

export const EXPERIENCE = [
  {
    id: 'legalplace',
    role: 'Account Manager',
    company: 'LegalPlace',
    location: 'Montpellier',
    period: 'Déc. 2024 — Aujourd\'hui',
    badge: 'Top performer',
    missions: [
      'Onboarding d\'entrepreneurs (de la création à la réception du Kbis)',
      'Analyse des besoins et proposition de solutions (comptabilité, domiciliation, juridique)',
      'Amélioration des méthodes de vente internes',
      'Animation de formations commerciales',
      'Team leader d\'une équipe d\'alternants',
    ],
    stat: '80 %+ d\'upsell',
  },
  {
    id: 'matchers',
    role: 'SDR',
    company: 'Matchers',
    location: 'Montpellier',
    period: '2024',
    missions: [
      'Prospection téléphonique',
      'Qualification de leads entrants et sortants',
      'Prise de rendez-vous pour les closers',
    ],
  },
  {
    id: 'groupagora',
    role: 'Chargé d\'affaires',
    company: 'Groupagora',
    location: 'Pérols',
    period: '2023',
    missions: [
      'Recrutement et qualification de profils IT',
      'Prospection B2B et développement portefeuille',
      'Négociation commerciale',
    ],
  },
  {
    id: 'stephaneplaza',
    role: 'Négociateur immobilier',
    company: 'Stéphane Plaza Immobilier',
    location: 'Enghien-les-Bains (95) → Montpellier',
    period: '2020 — 2023',
    missions: [
      'Estimation et commercialisation de biens',
      'Négociation et rédaction d\'actes',
      'Prospection terrain',
    ],
  },
]

export const SKILLS = [
  {
    category: 'Développement commercial',
    icon: '♞',
    items: [
      'Gestion de portefeuille clients',
      'Détection et qualification des besoins',
      'Upsell / Cross-sell',
      'Négociation et closing',
      'Account Management',
    ],
  },
  {
    category: 'Analyse & Performance',
    icon: '♜',
    items: [
      'Analyse de données commerciales',
      'Suivi et optimisation des ventes',
      'Analyse de marché',
      'KPIs & reporting',
    ],
  },
  {
    category: 'Outils',
    icon: '♝',
    items: [
      'Excel / Google Sheets (tableaux croisés, macros)',
      'CRM (HubSpot, Salesforce)',
      'Notion / Slack',
      'Pack Google & Office',
    ],
  },
  {
    category: 'Soft Skills',
    icon: '♛',
    items: [
      'Relationnel fort',
      'Pédagogie et accompagnement client',
      'Résolution de problèmes',
      'Orientation résultats',
      'Leadership',
    ],
  },
]

export const PROJECTS = [
  {
    id: 'bnk',
    name: 'BNK Conseil',
    tagline: 'Conseil en développement commercial pour TPE & startups',
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
    status: 'En développement',
  },
  {
    id: 'tapetype',
    name: 'TapeType.fr',
    tagline: 'Améliorez votre vitesse de frappe',
    description: 'Plateforme web gamifiée pour s\'entraîner à la dactylographie, avec classements et défis personnalisés.',
    tags: ['SaaS', 'Gamification', 'Web'],
    url: '#',
    status: 'En développement',
  },
]

export const STATS = [
  {
    value: 80,
    suffix: '%+',
    label: 'Taux d\'upsell',
    description: 'Depuis l\'arrivée chez LegalPlace',
  },
  {
    value: null,
    suffix: '',
    label: 'Top Performer',
    description: 'Classement équipe depuis déc. 2024',
    isText: true,
  },
  {
    value: null,
    suffix: '',
    label: 'Au-dessus de la moyenne CDI',
    description: 'Performances vs collaborateurs permanents',
    isText: true,
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
