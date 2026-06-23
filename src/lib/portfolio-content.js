// Portfolio de Théo Benkirane — contenu centralisé
// Modifier ce fichier pour mettre à jour les textes sans toucher aux composants

// ── Navigation latérale (sections) ───────────────────────────────────────────
export const SECTIONS = [
  { id: 'hero',          label: 'Accueil' },
  { id: 'about',         label: 'Profil' },
  { id: 'experience',    label: 'Parcours' },
  { id: 'skills',        label: 'Compétences' },
  { id: 'projects',      label: 'Initiatives' },
  { id: 'results',       label: 'Résultats' },
  { id: 'compatibility', label: 'Compatibilité' },
  { id: 'contact',       label: 'Contact' },
]

// ── La partie d'échecs jouée au fil du scroll ────────────────────────────────
// Opera Game — Paul Morphy vs Duc de Brunswick & Comte Isouard, Paris 1858.
// Une miniature célèbre : développement rapide, sacrifices, mat en 17 coups.
// Chaque ply : { n: numéro du coup, san: notation, from, to, [castle] }
export const CHESS_GAME = [
  { n: 1,  san: 'e4',    from: 'e2', to: 'e4' },
  { n: 1,  san: 'e5',    from: 'e7', to: 'e5' },
  { n: 2,  san: 'Nf3',   from: 'g1', to: 'f3' },
  { n: 2,  san: 'd6',    from: 'd7', to: 'd6' },
  { n: 3,  san: 'd4',    from: 'd2', to: 'd4' },
  { n: 3,  san: 'Bg4',   from: 'c8', to: 'g4' },
  { n: 4,  san: 'dxe5',  from: 'd4', to: 'e5' },
  { n: 4,  san: 'Bxf3',  from: 'g4', to: 'f3' },
  { n: 5,  san: 'Qxf3',  from: 'd1', to: 'f3' },
  { n: 5,  san: 'dxe5',  from: 'd6', to: 'e5' },
  { n: 6,  san: 'Bc4',   from: 'f1', to: 'c4' },
  { n: 6,  san: 'Nf6',   from: 'g8', to: 'f6' },
  { n: 7,  san: 'Qb3',   from: 'f3', to: 'b3' },
  { n: 7,  san: 'Qe7',   from: 'd8', to: 'e7' },
  { n: 8,  san: 'Nc3',   from: 'b1', to: 'c3' },
  { n: 8,  san: 'c6',    from: 'c7', to: 'c6' },
  { n: 9,  san: 'Bg5',   from: 'c1', to: 'g5' },
  { n: 9,  san: 'b5',    from: 'b7', to: 'b5' },
  { n: 10, san: 'Nxb5',  from: 'c3', to: 'b5' },
  { n: 10, san: 'cxb5',  from: 'c6', to: 'b5' },
  { n: 11, san: 'Bxb5+', from: 'c4', to: 'b5' },
  { n: 11, san: 'Nbd7',  from: 'b8', to: 'd7' },
  { n: 12, san: 'O-O-O', from: 'e1', to: 'c1', castle: { from: 'a1', to: 'd1' } },
  { n: 12, san: 'Rd8',   from: 'a8', to: 'd8' },
  { n: 13, san: 'Rxd7',  from: 'd1', to: 'd7' },
  { n: 13, san: 'Rxd7',  from: 'd8', to: 'd7' },
  { n: 14, san: 'Rd1',   from: 'h1', to: 'd1' },
  { n: 14, san: 'Qe6',   from: 'e7', to: 'e6' },
  { n: 15, san: 'Bxd7+', from: 'b5', to: 'd7' },
  { n: 15, san: 'Nxd7',  from: 'f6', to: 'd7' },
  { n: 16, san: 'Qb8+',  from: 'b3', to: 'b8' },
  { n: 16, san: 'Nxb8',  from: 'd7', to: 'b8' },
  { n: 17, san: 'Rd8#',  from: 'd1', to: 'd8' },
]

export const CHESS_GAME_CREDIT = 'Opera Game · Morphy, 1858'

// ── Héros ─────────────────────────────────────────────────────────────────────
export const HERO = {
  name: 'Théo Benkirane',
  role: 'Account Manager · SaaS & LegalTech',
  headline: 'Je transforme des prospects en clients qui restent.',
  pitch: '5 ans sur le terrain commercial, top performer chez LegalPlace. J\'allie relation client, résultats chiffrés et maîtrise des outils IA pour faire grandir un portefeuille.',
  status: 'Disponible pour un CDI',
  facts: [
    { k: 'Top performer', v: 'LegalPlace' },
    { k: '200+', v: 'clients / mois onboardés' },
    { k: '150 à 250 %', v: 'des objectifs atteints' },
    { k: 'MBA 2026', v: 'Directeur Commercial' },
  ],
  cta: {
    cv: '/cv-theo-benkirane.pdf',
    linkedin: 'https://linkedin.com/in/theobenkirane',
    email: 'theo.benkirane@icloud.com',
  },
}

// ── Profil ────────────────────────────────────────────────────────────────────
export const ABOUT = {
  headline: 'Commercial de terrain, culture tech.',
  lead: 'Depuis 5 ans, je vends, je négocie et je fidélise. Ce qui me distingue aujourd\'hui : j\'intègre l\'IA et les outils digitaux à chaque étape de mon travail pour aller plus vite et viser plus haut.',
  paragraphs: [
    'Account Manager chez LegalPlace, j\'accompagne chaque jour des entrepreneurs, de la création de leur société jusqu\'à l\'obtention de leur Kbis. Mon approche combine écoute, analyse des besoins et vente de solutions à forte valeur.',
    'Je construis aussi mes propres outils (sites, automatisations, plateformes web). Cette double casquette commerciale et tech me permet de comprendre un produit SaaS de l\'intérieur et de parler le même langage que les équipes produit.',
  ],
  facts: [
    { label: 'Âge',       value: '24 ans' },
    { label: 'Basé à',    value: 'Montpellier' },
    { label: 'Mobilité',  value: 'Paris / IDF · Remote' },
    { label: 'Permis',    value: 'B & A2 · Véhiculé' },
  ],
  formation: [
    {
      degree: 'MBA Directeur Commercial',
      school: 'IDRAC Business School, Montpellier',
      period: '2024 → 2026',
      note: 'Diplôme octobre 2026',
    },
    {
      degree: 'Certification IAS Niveau III, Distribution d\'assurance',
      school: 'IFPASS',
      period: '2025',
    },
    {
      degree: 'Bachelor Business Developer',
      school: 'ICL, l\'école des Business Developers',
      period: '2023 → 2024',
    },
    {
      degree: 'BTS Professions Immobilières',
      school: 'CFA IGS Paris',
      period: '2020 → 2022',
    },
  ],
}

// ── Parcours ──────────────────────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    id: 'legalplace',
    role: 'Account Manager',
    company: 'LegalPlace',
    type: 'Alternance',
    location: 'Montpellier',
    period: 'Jan. 2025 → Aujourd\'hui',
    badge: 'Top performer',
    highlight: '200+ entrepreneurs accompagnés chaque mois, objectifs dépassés de 150 à 250 %.',
    missions: [
      'Onboarding et accompagnement des entrepreneurs, de la création de société à l\'obtention du Kbis',
      'Détection des besoins et vente de solutions (comptabilité, domiciliation, juridique)',
      'Animation de formations commerciales et encadrement d\'alternants',
      'Contribution à l\'optimisation du parcours client',
    ],
    tags: ['SaaS', 'LegalTech', 'Account Management'],
  },
  {
    id: 'andragogy',
    role: 'Business Developer',
    company: 'Andragogy',
    type: 'Alterance',
    location: 'Sète',
    period: 'Nov. 2024 → Jan. 2025',
    highlight: 'Ouverture de nouveaux comptes et structuration de la prospection multicanal.',
    missions: [
      'Prospection et ouverture de nouveaux comptes B2B',
      'Mise en place de stratégies de vente multicanal',
      'Fidélisation du portefeuille existant',
      'Participation au recrutement et au talent acquisition',
    ],
    tags: ['Business Development', 'B2B'],
  },
  {
    id: 'matchers',
    role: 'Sales Development Representative',
    company: 'Matchers',
    type: 'Alternance',
    location: 'Montpellier',
    period: 'Nov. 2023 → Sep. 2024',
    highlight: '200 appels par jour, 1 RDV qualifié sur 10. Objectifs atteints chaque mois.',
    missions: [
      'Prospection téléphonique à haut volume (200 appels par jour)',
      'Qualification de prospects et prise de RDV qualifiés',
      'Génération de leads pour les équipes commerciales',
    ],
    tags: ['Prospection', 'SDR'],
  },
  {
    id: 'groupagora',
    role: 'Chargé d\'affaires',
    company: 'Groupagora',
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
    type: 'Alternance',
    location: 'Région parisienne, puis Lattes',
    period: '2021 → 2023',
    highlight: 'Cycle de vente complet géré en autonomie, de l\'estimation à la signature.',
    missions: [
      'Estimation et commercialisation de biens immobiliers',
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
    highlight: true,
    items: [
      'Prompting & LLM (ChatGPT, Claude, Gemini)',
      'Automatisation de process commerciaux',
      'Analyse de données & reporting augmenté',
      'Développement web (HTML, CSS, React)',
    ],
  },
  {
    category: 'Outils',
    icon: '♝',
    items: [
      'Excel / Google Sheets (TCD, macros)',
      'CRM (HubSpot, Salesforce)',
      'Notion / Slack / Make',
      'Pack Google & Office',
    ],
  },
  {
    category: 'Soft skills',
    icon: '♛',
    items: [
      'Relationnel fort',
      'Pédagogie & accompagnement',
      'Résolution de problèmes',
      'Leadership',
    ],
  },
]

// ── Initiatives & side projects ──────────────────────────────────────────────
export const PROJECTS_INTRO = 'Ce que je construis en dehors du bureau. Une preuve concrète de ma culture produit, de mon autonomie et de ma capacité à passer de l\'idée au résultat.'

export const PROJECTS = [
  {
    id: 'bnk',
    name: 'BNK Conseil',
    tagline: 'Conseil en développement commercial, TPE & startups',
    description: 'Audit commercial, création de site et stratégie d\'acquisition. J\'accompagne des dirigeants dans leur croissance.',
    tags: ['Consulting', 'Acquisition', 'Web'],
    url: 'https://bnk-conseil.com',
    status: 'Actif',
  },
  {
    id: 'campusbridge',
    name: 'Campus Bridge',
    tagline: 'Plateforme alternants, écoles & entreprises',
    description: 'Un produit qui répond à un vrai besoin de matching sur le marché de l\'alternance.',
    tags: ['EdTech', 'Plateforme', 'Produit'],
    url: '#',
    status: 'En cours',
  },
  {
    id: 'tapetype',
    name: 'TapeType.fr',
    tagline: 'Entraînement à la frappe, gamifié',
    description: 'Un side project mené du concept au déploiement, avec classements et défis personnalisés.',
    tags: ['SaaS', 'Gamification', 'Web'],
    url: '#',
    status: 'En cours',
  },
]

// ── Résultats ─────────────────────────────────────────────────────────────────
export const STATS = [
  {
    value: 200,
    suffix: '+',
    label: 'Clients / mois',
    description: 'Entrepreneurs onboardés chez LegalPlace',
  },
  {
    value: 250,
    suffix: '%',
    label: 'Objectifs atteints',
    description: 'Entre 150 et 250 % chaque mois',
  },
  {
    value: 10,
    suffix: '%',
    label: 'Taux de conversion',
    description: '1 RDV qualifié sur 10 appels (Matchers)',
  },
]

export const STATS_NOTE = 'Top performer de l\'équipe depuis mon arrivée, avec des performances supérieures à la moyenne des collaborateurs en CDI.'

// ── Quiz de compatibilité ─────────────────────────────────────────────────────
export const QUIZ = {
  intro: 'Vous recrutez ? Répondez à 5 questions rapides pour mesurer notre niveau de compatibilité.',
  questions: [
    {
      id: 'role',
      q: 'Quel poste cherchez-vous à pourvoir ?',
      multi: false,
      options: [
        { label: 'Account Manager / CSM', score: 25 },
        { label: 'Business Developer / Sales', score: 25 },
        { label: 'Sales Ops / Revenue', score: 22 },
        { label: 'Autre profil commercial', score: 15 },
      ],
    },
    {
      id: 'sector',
      q: 'Dans quel secteur ?',
      multi: false,
      options: [
        { label: 'SaaS / Tech', score: 25 },
        { label: 'LegalTech / Juridique', score: 25 },
        { label: 'Services B2B', score: 18 },
        { label: 'Autre secteur', score: 12 },
      ],
    },
    {
      id: 'expect',
      q: 'Qu\'attendez-vous en priorité ? (plusieurs choix possibles)',
      multi: true,
      options: [
        { label: 'Performance chiffrée', score: 9 },
        { label: 'Relation client long terme', score: 9 },
        { label: 'Autonomie & initiative', score: 8 },
        { label: 'Maîtrise des outils & de l\'IA', score: 9 },
      ],
    },
    {
      id: 'contract',
      q: 'Quel type de contrat ?',
      multi: false,
      options: [
        { label: 'CDI', score: 25 },
        { label: 'Freelance / mission', score: 14 },
        { label: 'Alternance', score: 10 },
        { label: 'Stage', score: 6 },
      ],
    },
    {
      id: 'location',
      q: 'Où se situe le poste ?',
      multi: false,
      options: [
        { label: 'Paris / Île-de-France', score: 15 },
        { label: 'Montpellier', score: 15 },
        { label: 'Full remote', score: 14 },
        { label: 'Autre région', score: 8 },
      ],
    },
  ],
  // Score brut max : 25 + 25 + 25(plafond) + 25 + 15 = 115
  maxRaw: 115,
  results: [
    { min: 90, title: 'Coup gagnant.', message: 'On est clairement faits pour jouer dans la même équipe. Échangeons cette semaine.' },
    { min: 80, title: 'Très belle synergie.', message: 'Le profil colle parfaitement à votre besoin. Parlons-en vite.' },
    { min: 70, title: 'Bon match.', message: 'Il y a un vrai potentiel à construire ensemble. On en discute ?' },
    { min: 0,  title: 'À creuser.', message: 'Il y a sûrement une façon de collaborer. Lançons la conversation.' },
  ],
}

// ── Contact ───────────────────────────────────────────────────────────────────
export const CONTACT = {
  headline: 'À vous de jouer.',
  sub: 'Un poste à pourvoir, une question, ou simplement l\'envie d\'échanger ? Je réponds dans la journée.',
  email: 'theo.benkirane@icloud.com',
  phone: '07 83 29 84 21',
  linkedin: 'https://linkedin.com/in/theobenkirane',
  cv: '/cv-theo-benkirane.pdf',
  mobility: 'Paris / IDF · Montpellier · Remote',
  // Pour activer le formulaire : crée une clé gratuite sur https://web3forms.com
  // (associée à ton email) et colle-la ci-dessous.
  web3formsKey: 'a95c8130-7241-4683-accd-6553e4f19b6a',
}
