// Aperçu live d'un site vitrine - 100% client-side, zéro coût API
// Props: { name, sector, city, theme }

// ─── Configs des thèmes ────────────────────────────────────────────────────────

const THEMES = {
  modern: {
    name: 'Moderne',
    headerBg: '#ffffff',
    heroBg: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 50%, #fce7f3 100%)',
    primary: '#7C3AED',
    primaryLight: '#ede9fe',
    accent: '#A855F7',
    btnStyle: { background: 'linear-gradient(135deg, #7C3AED, #A855F7)', color: '#fff', borderRadius: '12px', padding: '12px 28px', fontWeight: 700, fontSize: '15px', border: 'none', cursor: 'pointer' },
    cardBg: '#ffffff',
    cardBorder: '#e9d5ff',
    text: '#1a1a2e',
    subtext: '#6b7280',
    footerBg: '#1a1a2e',
    footerText: '#9ca3af',
  },
  elegant: {
    name: 'Élégant',
    headerBg: '#1e2d4f',
    heroBg: 'linear-gradient(135deg, #1e2d4f 0%, #2d3f6b 100%)',
    primary: '#c9a84c',
    primaryLight: '#fef9ed',
    accent: '#e8c76a',
    btnStyle: { background: '#c9a84c', color: '#1e2d4f', borderRadius: '8px', padding: '12px 28px', fontWeight: 700, fontSize: '15px', border: 'none', cursor: 'pointer' },
    cardBg: '#ffffff',
    cardBorder: '#f0e6c8',
    text: '#1e2d4f',
    subtext: '#64748b',
    footerBg: '#0f1a30',
    footerText: '#94a3b8',
  },
  nature: {
    name: 'Nature',
    headerBg: '#ffffff',
    heroBg: 'linear-gradient(135deg, #dcfce7 0%, #d1fae5 50%, #ecfdf5 100%)',
    primary: '#16a34a',
    primaryLight: '#dcfce7',
    accent: '#22c55e',
    btnStyle: { background: 'linear-gradient(135deg, #16a34a, #22c55e)', color: '#fff', borderRadius: '10px', padding: '12px 28px', fontWeight: 700, fontSize: '15px', border: 'none', cursor: 'pointer' },
    cardBg: '#ffffff',
    cardBorder: '#bbf7d0',
    text: '#14532d',
    subtext: '#6b7280',
    footerBg: '#14532d',
    footerText: '#86efac',
  },
  warm: {
    name: 'Chaleureux',
    headerBg: '#fff7ed',
    heroBg: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 50%, #fde68a 100%)',
    primary: '#ea580c',
    primaryLight: '#fff7ed',
    accent: '#f97316',
    btnStyle: { background: 'linear-gradient(135deg, #ea580c, #f97316)', color: '#fff', borderRadius: '10px', padding: '12px 28px', fontWeight: 700, fontSize: '15px', border: 'none', cursor: 'pointer' },
    cardBg: '#ffffff',
    cardBorder: '#fed7aa',
    text: '#7c2d12',
    subtext: '#78716c',
    footerBg: '#7c2d12',
    footerText: '#fdba74',
  },
  pro: {
    name: 'Professionnel',
    headerBg: '#ffffff',
    heroBg: 'linear-gradient(135deg, #dbeafe 0%, #e0f2fe 50%, #f0f9ff 100%)',
    primary: '#2563eb',
    primaryLight: '#eff6ff',
    accent: '#3b82f6',
    btnStyle: { background: 'linear-gradient(135deg, #2563eb, #3b82f6)', color: '#fff', borderRadius: '8px', padding: '12px 28px', fontWeight: 700, fontSize: '15px', border: 'none', cursor: 'pointer' },
    cardBg: '#ffffff',
    cardBorder: '#bfdbfe',
    text: '#1e3a5f',
    subtext: '#475569',
    footerBg: '#1e3a5f',
    footerText: '#93c5fd',
  },
}

// ─── Configs des secteurs ──────────────────────────────────────────────────────

const SECTORS = {
  'Restauration': {
    emoji: '🍽️',
    heroTitle: (name, city) => name ? `${name}, votre table à ${city || 'votre ville'}` : `La meilleure table de ${city || 'votre ville'}`,
    heroSubtitle: 'Cuisine authentique, produits locaux, ambiance chaleureuse. Venez partager un moment unique.',
    services: [
      { icon: '🍽️', title: 'Notre carte', desc: 'Menu renouvelé chaque saison, entrées, plats, desserts faits maison.' },
      { icon: '📅', title: 'Réservation', desc: 'Réservez votre table en ligne en quelques secondes, 7j/7.' },
      { icon: '⭐', title: 'Avis clients', desc: '4,8/5 sur Google. Plus de 300 avis vérifiés de nos clients satisfaits.' },
    ],
    aboutText: (name) => `${name || 'Notre restaurant'} vous accueille dans un cadre chaleureux pour une expérience culinaire mémorable. Produits frais, recettes maison, service attentionné.`,
    navItems: ['Menu', 'Réservation', 'Galerie', 'Contact'],
  },
  'Artisanat & Rénovation': {
    emoji: '🔧',
    heroTitle: (name, city) => name ? `${name}, artisan de confiance à ${city || 'votre ville'}` : `Artisan de confiance à ${city || 'votre ville'}`,
    heroSubtitle: 'Travaux de qualité, devis gratuit sous 24h. Certifié RGE, assurance décennale.',
    services: [
      { icon: '📋', title: 'Devis gratuit', desc: 'Demandez votre devis en ligne, réponse sous 24h, sans engagement.' },
      { icon: '🏆', title: 'Réalisations', desc: 'Galerie de nos chantiers : avant/après, photos pro, références clients.' },
      { icon: '✅', title: 'Garanties', desc: 'Assurance décennale, garantie biennale. Votre tranquillité d\'esprit.' },
    ],
    aboutText: (name) => `${name || 'Notre entreprise'} intervient sur tous types de travaux. Expertise locale, matériaux de qualité, équipe qualifiée à votre service.`,
    navItems: ['Services', 'Réalisations', 'Devis', 'Contact'],
  },
  'Formation & Coaching': {
    emoji: '🎓',
    heroTitle: (name, city) => name ? `${name} : développez votre potentiel` : `Votre coach expert à ${city || 'votre ville'}`,
    heroSubtitle: 'Formations certifiantes et coaching personnalisé. Atteignez vos objectifs professionnels.',
    services: [
      { icon: '📚', title: 'Nos programmes', desc: 'Formations en présentiel et distanciel, certifiées Qualiopi, finançables CPF.' },
      { icon: '🎯', title: 'Coaching 1:1', desc: 'Séances individuelles sur mesure pour atteindre vos objectifs rapidement.' },
      { icon: '💬', title: 'Témoignages', desc: 'Plus de 150 apprenants accompagnés. Taux de satisfaction : 97%.' },
    ],
    aboutText: (name) => `${name || 'Notre organisme'} accompagne les professionnels et entreprises dans leur montée en compétences depuis plus de 5 ans.`,
    navItems: ['Formations', 'Coaching', 'Témoignages', 'Contact'],
  },
  'Commerce local': {
    emoji: '🛍️',
    heroTitle: (name, city) => name ? `${name}, votre boutique à ${city || 'votre ville'}` : `Votre boutique de quartier à ${city || 'votre ville'}`,
    heroSubtitle: 'Découvrez nos produits, horaires et promotions. Commerce de proximité depuis 2015.',
    services: [
      { icon: '🛒', title: 'Catalogue', desc: 'Parcourez notre sélection de produits. Nouveautés chaque semaine.' },
      { icon: '🕐', title: 'Horaires', desc: 'Ouvert du lundi au samedi. Horaires étendus les jours fériés.' },
      { icon: '🎁', title: 'Fidélité', desc: 'Programme fidélité, offres exclusives, carte cadeau disponible.' },
    ],
    aboutText: (name) => `${name || 'Notre boutique'} vous propose une sélection soigneuse de produits locaux et de qualité, dans une ambiance conviviale.`,
    navItems: ['Catalogue', 'Promotions', 'Horaires', 'Contact'],
  },
  'Prestataire de services': {
    emoji: '💼',
    heroTitle: (name, city) => name ? `${name} — expert à ${city || 'votre service'}` : `Expert à votre service à ${city || 'votre ville'}`,
    heroSubtitle: 'Solutions sur mesure pour les entreprises et particuliers. Résultats garantis.',
    services: [
      { icon: '🔍', title: 'Expertise', desc: 'Plus de 10 ans d\'expérience dans notre domaine. Références disponibles.' },
      { icon: '📊', title: 'Notre méthode', desc: 'Audit, diagnostic, plan d\'action, suivi. Une approche structurée et efficace.' },
      { icon: '📈', title: 'Résultats', desc: 'KPIs mesurables, reporting mensuel, ajustements en temps réel.' },
    ],
    aboutText: (name) => `${name || 'Notre cabinet'} accompagne TPE, PME et indépendants avec des solutions opérationnelles adaptées à chaque situation.`,
    navItems: ['Services', 'Méthode', 'Références', 'Contact'],
  },
  'Indépendant & Freelance': {
    emoji: '💻',
    heroTitle: (name, city) => name ? `${name}, freelance à ${city || 'votre service'}` : `Freelance expert à ${city || 'votre ville'}`,
    heroSubtitle: 'Développeur, designer, consultant ou rédacteur — collaborons ensemble sur vos projets.',
    services: [
      { icon: '💼', title: 'Portfolio', desc: 'Découvrez mes derniers projets réalisés pour des clients variés.' },
      { icon: '⚡', title: 'Expertise', desc: 'Technologies maîtrisées, certifications, années d\'expérience terrain.' },
      { icon: '📞', title: 'Disponibilité', desc: 'Missions courtes ou longues. Tarifs journaliers ou forfait projet.' },
    ],
    aboutText: (name) => `${name || 'Freelance passionné'}, je mets mon expertise au service de vos projets avec rigueur, réactivité et créativité.`,
    navItems: ['Portfolio', 'Expertise', 'Tarifs', 'Contact'],
  },
  'Santé & Bien-être': {
    emoji: '🌿',
    heroTitle: (name, city) => name ? `${name} — votre espace bien-être à ${city || 'votre ville'}` : `Votre espace santé à ${city || 'votre ville'}`,
    heroSubtitle: 'Prenez soin de vous avec des soins naturels et des praticiens certifiés.',
    services: [
      { icon: '🌿', title: 'Nos soins', desc: 'Massages, ostéopathie, naturopathie, aromathérapie. Sur rendez-vous.' },
      { icon: '📅', title: 'Rendez-vous', desc: 'Réservation en ligne 24h/24. Rappel automatique par SMS.' },
      { icon: '🎓', title: 'Praticiens', desc: 'Équipe certifiée et formée en continu. Approche holistique.' },
    ],
    aboutText: (name) => `${name || 'Notre centre'} vous propose un accompagnement personnalisé pour votre santé et votre bien-être, dans un cadre apaisant.`,
    navItems: ['Soins', 'Praticiens', 'Tarifs', 'Contact'],
  },
  'BTP & Construction': {
    emoji: '🏗️',
    heroTitle: (name, city) => name ? `${name}, votre partenaire construction à ${city || 'votre ville'}` : `Votre constructeur de confiance à ${city || 'votre ville'}`,
    heroSubtitle: 'Gros œuvre, second œuvre, rénovation. Délais respectés, budget maîtrisé.',
    services: [
      { icon: '🏗️', title: 'Nos chantiers', desc: 'Maisons individuelles, extensions, rénovations complètes. Clé en main.' },
      { icon: '📋', title: 'Devis détaillé', desc: 'Visite gratuite, chiffrage précis, accompagnement administratif complet.' },
      { icon: '🛡️', title: 'Garanties', desc: 'Assurance décennale, dommages-ouvrage. Votre investissement protégé.' },
    ],
    aboutText: (name) => `${name || 'Notre entreprise'} réalise vos projets de construction et rénovation avec des matériaux de qualité et une équipe expérimentée.`,
    navItems: ['Réalisations', 'Services', 'Devis', 'Contact'],
  },
}

const DEFAULT_SECTOR = SECTORS['Prestataire de services']

// ─── Composant principal ───────────────────────────────────────────────────────

export default function WebsitePreview({ name, sector, city, theme = 'modern' }) {
  const t = THEMES[theme] || THEMES.modern
  const s = SECTORS[sector] || DEFAULT_SECTOR
  const displayName = name || 'Votre Société'
  const displayCity = city || 'votre ville'

  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        width: '1280px',
        minHeight: '900px',
        background: '#f9fafb',
        color: t.text,
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header style={{ background: t.headerBg, borderBottom: `1px solid ${t.cardBorder}`, padding: '0 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontWeight: 900, fontSize: '22px', color: t.primary }}>
            {s.emoji} {displayName}
          </div>
          <div style={{ display: 'flex', gap: '36px', fontSize: '15px', color: t.subtext, fontWeight: 500 }}>
            {s.navItems.map((item) => (
              <span key={item} style={{ cursor: 'default' }}>{item}</span>
            ))}
          </div>
          <div style={{ ...t.btnStyle, padding: '10px 22px', fontSize: '14px' }}>
            Nous contacter
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section style={{ background: t.heroBg, padding: '80px 48px 72px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: t.primary, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
              {s.emoji} {sector || 'Site web professionnel'}
            </div>
            <h1 style={{ fontSize: '44px', fontWeight: 900, lineHeight: 1.15, marginBottom: '20px', color: t.text }}>
              {s.heroTitle(name, city)}
            </h1>
            <p style={{ fontSize: '18px', color: t.subtext, lineHeight: 1.7, marginBottom: '36px', maxWidth: '500px' }}>
              {s.heroSubtitle}
            </p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={t.btnStyle}>
                Nous contacter
              </div>
              <span style={{ color: t.primary, fontWeight: 600, fontSize: '15px', cursor: 'default' }}>
                En savoir plus →
              </span>
            </div>
          </div>
          {/* Illustration hero */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
              width: '340px',
              height: '260px',
              background: t.cardBg,
              borderRadius: '20px',
              border: `2px solid ${t.cardBorder}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              boxShadow: `0 12px 40px rgba(0,0,0,0.08)`,
            }}>
              <div style={{ fontSize: '56px' }}>{s.emoji}</div>
              <div style={{ fontWeight: 800, fontSize: '18px', color: t.text }}>{displayName}</div>
              <div style={{ fontSize: '13px', color: t.subtext }}>{displayCity}</div>
              <div style={{ width: '80px', height: '4px', background: `linear-gradient(90deg, ${t.primary}, ${t.accent})`, borderRadius: '2px', marginTop: '4px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────────────────── */}
      <section style={{ padding: '72px 48px', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: t.primary, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
              Nos services
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: 900, color: t.text, marginBottom: '12px' }}>
              Ce que nous proposons
            </h2>
            <p style={{ color: t.subtext, fontSize: '17px', maxWidth: '500px', margin: '0 auto' }}>
              Des solutions adaptées à vos besoins, avec un accompagnement personnalisé.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {s.services.map((svc, i) => (
              <div key={i} style={{
                background: t.cardBg,
                border: `1.5px solid ${t.cardBorder}`,
                borderRadius: '16px',
                padding: '32px 28px',
                transition: 'all 0.2s',
              }}>
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{svc.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: t.text, marginBottom: '10px' }}>{svc.title}</h3>
                <p style={{ fontSize: '15px', color: t.subtext, lineHeight: 1.65 }}>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── À propos ───────────────────────────────────────────────────────── */}
      <section style={{ padding: '72px 48px', background: t.primaryLight }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: t.primary, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
              À propos
            </div>
            <h2 style={{ fontSize: '34px', fontWeight: 900, color: t.text, marginBottom: '16px' }}>
              Qui sommes-nous ?
            </h2>
            <p style={{ fontSize: '17px', color: t.subtext, lineHeight: 1.75, marginBottom: '28px' }}>
              {s.aboutText(name)}
            </p>
            <div style={{ display: 'flex', gap: '40px' }}>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: t.primary }}>10+</div>
                <div style={{ fontSize: '13px', color: t.subtext, fontWeight: 500 }}>Ans d'expérience</div>
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: t.primary }}>200+</div>
                <div style={{ fontSize: '13px', color: t.subtext, fontWeight: 500 }}>Clients satisfaits</div>
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: t.primary }}>4.9★</div>
                <div style={{ fontSize: '13px', color: t.subtext, fontWeight: 500 }}>Note moyenne</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '300px',
              height: '240px',
              background: t.cardBg,
              borderRadius: '20px',
              border: `2px solid ${t.cardBorder}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: `0 8px 30px rgba(0,0,0,0.06)`,
            }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' }}>
                😊
              </div>
              <div style={{ fontWeight: 700, fontSize: '16px', color: t.text }}>{displayName}</div>
              <div style={{ fontSize: '13px', color: t.subtext }}>{displayCity}</div>
              <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#fbbf24', fontSize: '16px' }}>★</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section style={{ padding: '72px 48px', background: t.heroBg, textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 900, color: t.text, marginBottom: '16px' }}>
            Prêt à nous contacter ?
          </h2>
          <p style={{ color: t.subtext, fontSize: '17px', marginBottom: '32px', lineHeight: 1.7 }}>
            Contactez-nous pour discuter de votre projet. Réponse sous 24h.
          </p>
          <div style={t.btnStyle}>
            Prendre rendez-vous
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer style={{ background: t.footerBg, padding: '40px 48px', color: t.footerText }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: '18px', color: '#fff' }}>
            {s.emoji} {displayName}
          </div>
          <div style={{ fontSize: '14px', display: 'flex', gap: '32px' }}>
            {s.navItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div style={{ fontSize: '13px' }}>
            © 2025 {displayName} · {displayCity}
          </div>
        </div>
      </footer>
    </div>
  )
}

// Exporte aussi les configs pour l'utiliser dans le formulaire
export { THEMES, SECTORS }
