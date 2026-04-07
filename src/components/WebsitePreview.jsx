// WebsitePreview.jsx
// Rendu statique 1280px — scale CSS depuis ApercuSite.jsx
// 3 layouts distincts : vitrine / portfolio / artisan
// 5 themes : colore / elegant / nature / warm / pro

export const THEMES = {
  colore: {
    name: "Colore",
    headerBg: "#ffffff",
    headerTextColor: "#1c1917",
    heroBg: "linear-gradient(135deg, #fff7f3 0%, #f0fdfa 50%, #ecfdf5 100%)",
    primary: "#F97316",
    primaryLight: "#fff7ed",
    accent: "#0D9488",
    btnStyle: {
      background: "linear-gradient(135deg, #F97316, #0D9488)",
      color: "#fff",
      borderRadius: "12px",
      padding: "12px 28px",
      fontWeight: 700,
      fontSize: "15px",
      border: "none",
      cursor: "default",
    },
    cardBg: "#fff",
    cardBorder: "#fed7aa",
    text: "#1c1917",
    subtext: "#6b7280",
    heroText: "#1c1917",
    heroSubtext: "#6b7280",
    footerBg: "#1c1917",
    footerText: "#9ca3af",
  },
  elegant: {
    name: "Elegant",
    headerBg: "#1e2d4f",
    headerTextColor: "#f8fafc",
    heroBg: "linear-gradient(135deg, #1e2d4f 0%, #2d3f6b 100%)",
    primary: "#c9a84c",
    primaryLight: "#fef9ed",
    accent: "#e8c76a",
    btnStyle: {
      background: "#c9a84c",
      color: "#1e2d4f",
      borderRadius: "8px",
      padding: "12px 28px",
      fontWeight: 700,
      fontSize: "15px",
      border: "none",
      cursor: "default",
    },
    cardBg: "#fff",
    cardBorder: "#f0e6c8",
    text: "#1e2d4f",
    subtext: "#64748b",
    heroText: "#f8fafc",
    heroSubtext: "#cbd5e1",
    footerBg: "#0f1a30",
    footerText: "#94a3b8",
  },
  nature: {
    name: "Nature",
    headerBg: "#ffffff",
    headerTextColor: "#14532d",
    heroBg: "linear-gradient(135deg, #dcfce7 0%, #d1fae5 50%, #ecfdf5 100%)",
    primary: "#16a34a",
    primaryLight: "#dcfce7",
    accent: "#22c55e",
    btnStyle: {
      background: "linear-gradient(135deg, #16a34a, #22c55e)",
      color: "#fff",
      borderRadius: "10px",
      padding: "12px 28px",
      fontWeight: 700,
      fontSize: "15px",
      border: "none",
      cursor: "default",
    },
    cardBg: "#fff",
    cardBorder: "#bbf7d0",
    text: "#14532d",
    subtext: "#6b7280",
    heroText: "#14532d",
    heroSubtext: "#6b7280",
    footerBg: "#14532d",
    footerText: "#86efac",
  },
  warm: {
    name: "Chaleureux",
    headerBg: "#fff7ed",
    headerTextColor: "#7c2d12",
    heroBg: "linear-gradient(135deg, #fff7ed 0%, #fed7aa 50%, #fde68a 100%)",
    primary: "#ea580c",
    primaryLight: "#fff7ed",
    accent: "#f97316",
    btnStyle: {
      background: "linear-gradient(135deg, #ea580c, #f97316)",
      color: "#fff",
      borderRadius: "10px",
      padding: "12px 28px",
      fontWeight: 700,
      fontSize: "15px",
      border: "none",
      cursor: "default",
    },
    cardBg: "#fff",
    cardBorder: "#fed7aa",
    text: "#7c2d12",
    subtext: "#78716c",
    heroText: "#7c2d12",
    heroSubtext: "#78716c",
    footerBg: "#7c2d12",
    footerText: "#fdba74",
  },
  pro: {
    name: "Professionnel",
    headerBg: "#ffffff",
    headerTextColor: "#1e3a5f",
    heroBg: "linear-gradient(135deg, #dbeafe 0%, #e0f2fe 50%, #f0f9ff 100%)",
    primary: "#2563eb",
    primaryLight: "#eff6ff",
    accent: "#3b82f6",
    btnStyle: {
      background: "linear-gradient(135deg, #2563eb, #3b82f6)",
      color: "#fff",
      borderRadius: "8px",
      padding: "12px 28px",
      fontWeight: 700,
      fontSize: "15px",
      border: "none",
      cursor: "default",
    },
    cardBg: "#fff",
    cardBorder: "#bfdbfe",
    text: "#1e3a5f",
    subtext: "#475569",
    heroText: "#1e3a5f",
    heroSubtext: "#475569",
    footerBg: "#1e3a5f",
    footerText: "#93c5fd",
  },
}

export const SECTORS = {
  "Restauration": {
    layoutType: "vitrine",
    emoji: "🍽️",
    heroTitle: (name, city) => name ? `${name}, votre table a ${city}` : `La meilleure table de ${city}`,
    heroSubtitle: "Cuisine authentique, produits locaux, ambiance chaleureuse. Venez partager un moment unique.",
    trustPills: ["Ouvert 7j/7", "Reservation en ligne", "Note 4.9/5 Google"],
    services: [
      { icon: "🍽️", title: "Notre carte", desc: "Menu renouvelé chaque saison, midi et soir. Produits frais et locaux." },
      { icon: "📅", title: "Reservation", desc: "Reservez votre table en ligne 7j/7, confirmation immediate." },
      { icon: "⭐", title: "Avis clients", desc: "4,9/5 sur Google avec plus de 300 avis verifies." },
    ],
    bookingLabel: "Reserver une table",
    navItems: ["Menu", "Reservation", "Galerie", "Contact"],
  },
  "Commerce local": {
    layoutType: "vitrine",
    emoji: "🛍️",
    heroTitle: (name, city) => name ? `${name}, votre boutique a ${city}` : `Votre boutique de quartier a ${city}`,
    heroSubtitle: "Decouvrez nos produits, horaires et promotions. Commerce de proximite depuis 2015.",
    trustPills: ["Lun-Sam 9h-19h", "Click & Collect", "Fidelite recompensee"],
    services: [
      { icon: "🛒", title: "Catalogue", desc: "Selection de produits locaux et de qualite, nouveautes chaque semaine." },
      { icon: "🕐", title: "Horaires", desc: "Ouvert du lundi au samedi avec des horaires etendus pour votre confort." },
      { icon: "🎁", title: "Fidelite", desc: "Programme de fidelite, offres exclusives et cartes cadeau disponibles." },
    ],
    bookingLabel: "Voir le catalogue",
    navItems: ["Catalogue", "Promotions", "Horaires", "Contact"],
  },
  "Sante & Bien-etre": {
    layoutType: "vitrine",
    emoji: "🌿",
    heroTitle: (name, city) => name ? `${name}, votre espace bien-etre a ${city}` : `Votre espace sante a ${city}`,
    heroSubtitle: "Prenez soin de vous avec des soins naturels et des praticiens certifies.",
    trustPills: ["RDV en ligne 24h/24", "Praticiens certifies", "Approche holistique"],
    services: [
      { icon: "🌿", title: "Nos soins", desc: "Massages, osteopathie, naturopathie et aromatherapie sur mesure." },
      { icon: "📅", title: "Rendez-vous", desc: "Reservation en ligne 24h/24 avec rappel SMS automatique." },
      { icon: "🎓", title: "Praticiens", desc: "Equipe certifiee, experience reconnue, approche globale et bienveillante." },
    ],
    bookingLabel: "Prendre rendez-vous",
    navItems: ["Soins", "Praticiens", "Tarifs", "Contact"],
  },
  "Independant & Freelance": {
    layoutType: "portfolio",
    emoji: "💻",
    heroTitle: (name, city) => name ? `${name}, freelance a ${city}` : `Freelance expert a ${city}`,
    heroSubtitle: "Developpeur, designer, consultant — collaborons ensemble sur vos projets.",
    skillTags: ["Web Design", "Developpement", "SEO", "React", "UI/UX"],
    projects: [
      { title: "Site e-commerce", tag: "E-commerce", color: "#F97316" },
      { title: "Application mobile", tag: "Mobile", color: "#0D9488" },
      { title: "Refonte identite", tag: "Branding", color: "#7C3AED" },
      { title: "Audit SEO complet", tag: "SEO", color: "#16a34a" },
    ],
    processSteps: ["Analyse", "Proposition", "Realisation", "Livraison"],
    stats: [{ val: "40+", label: "Projets livres" }, { val: "5 ans", label: "Expertise" }, { val: "98%", label: "Satisfaction" }],
    navItems: ["Portfolio", "Expertise", "Tarifs", "Contact"],
  },
  "Formation & Coaching": {
    layoutType: "portfolio",
    emoji: "🎓",
    heroTitle: (name, city) => name ? `${name} : developpez votre potentiel` : `Votre coach expert a ${city}`,
    heroSubtitle: "Formations certifiantes et coaching personnalise. Atteignez vos objectifs professionnels.",
    skillTags: ["CPF", "Qualiopi", "Presentiel", "En ligne", "Certifiant"],
    projects: [
      { title: "Leadership & Management", tag: "Management", color: "#2563eb" },
      { title: "Prise de parole", tag: "Communication", color: "#ea580c" },
      { title: "Bilan de competences", tag: "Coaching", color: "#16a34a" },
      { title: "Excel avance", tag: "Bureautique", color: "#c9a84c" },
    ],
    processSteps: ["Diagnostic", "Programme", "Formation", "Suivi"],
    stats: [{ val: "150+", label: "Apprenants" }, { val: "5 ans", label: "Expertise" }, { val: "97%", label: "Satisfaction" }],
    navItems: ["Formations", "Coaching", "Temoignages", "Contact"],
  },
  "Prestataire de services": {
    layoutType: "portfolio",
    emoji: "💼",
    heroTitle: (name, city) => name ? `${name}, expert a ${city}` : `Expert a votre service a ${city}`,
    heroSubtitle: "Solutions sur mesure pour les entreprises et particuliers. Resultats garantis.",
    skillTags: ["Strategie", "Operations", "RH", "Finance", "Marketing"],
    projects: [
      { title: "Audit organisationnel", tag: "Audit", color: "#2563eb" },
      { title: "Plan marketing 2025", tag: "Marketing", color: "#ea580c" },
      { title: "Recrutement cadres", tag: "RH", color: "#0D9488" },
      { title: "Optimisation couts", tag: "Finance", color: "#7C3AED" },
    ],
    processSteps: ["Audit", "Diagnostic", "Plan d'action", "Suivi"],
    stats: [{ val: "10+", label: "Ans d'experience" }, { val: "200+", label: "Clients" }, { val: "4.9", label: "Note moyenne" }],
    navItems: ["Services", "Methode", "References", "Contact"],
  },
  "Artisanat & Renovation": {
    layoutType: "artisan",
    emoji: "🔧",
    heroTitle: (name, city) => name ? `${name}, artisan de confiance a ${city}` : `Artisan de confiance a ${city}`,
    heroSubtitle: "Travaux de qualite, devis gratuit sous 24h. Certifie RGE, assurance decennale.",
    trustBadges: ["Certifie RGE", "Qualibat", "Assurance decennale", "+500 chantiers"],
    realisations: [
      { label: "Renovation complete", color: "#ea580c" },
      { label: "Cuisine sur mesure", color: "#0D9488" },
      { label: "Facade refaite", color: "#2563eb" },
    ],
    devisTypes: ["Renovation interieure", "Isolation / Combles", "Facade / Toiture", "Autre"],
    navItems: ["Services", "Realisations", "Devis", "Contact"],
  },
  "BTP & Construction": {
    layoutType: "artisan",
    emoji: "🏗️",
    heroTitle: (name, city) => name ? `${name}, votre partenaire construction a ${city}` : `Votre constructeur de confiance a ${city}`,
    heroSubtitle: "Gros oeuvre, second oeuvre, renovation. Delais respectes, budget maitrise.",
    trustBadges: ["Assurance decennale", "Qualibat Pro", "Garantie biennale", "+200 projets"],
    realisations: [
      { label: "Maison individuelle", color: "#2563eb" },
      { label: "Extension 40m2", color: "#16a34a" },
      { label: "Renovation gros oeuvre", color: "#ea580c" },
    ],
    devisTypes: ["Construction neuve", "Extension / Surelevation", "Renovation / Gros oeuvre", "Autre"],
    navItems: ["Realisations", "Services", "Devis", "Contact"],
  },
}

const DEFAULT_SECTOR = SECTORS["Prestataire de services"]

// ─── Composants partagés ────────────────────────────────────────────────────

function SharedHeader({ t, s, displayName }) {
  const isDarkHeader = t.headerBg !== "#ffffff" && t.headerBg !== "#fff7ed"
  const navColor = isDarkHeader ? "#94a3b8" : t.subtext
  const logoColor = isDarkHeader ? t.accent : t.primary
  const btnBg = isDarkHeader ? t.accent : t.primary
  const btnColor = isDarkHeader ? t.headerBg : "#fff"
  return (
    <header style={{ background: t.headerBg, borderBottom: isDarkHeader ? "none" : `1px solid ${t.cardBorder}`, padding: "0 64px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "24px" }}>{s.emoji}</span>
        <span style={{ fontSize: "20px", fontWeight: 900, color: logoColor, letterSpacing: "-0.5px" }}>{displayName}</span>
      </div>
      <nav style={{ display: "flex", gap: "32px" }}>
        {(s.navItems || []).map((item) => (
          <span key={item} style={{ fontSize: "14px", color: navColor, fontWeight: 500 }}>{item}</span>
        ))}
      </nav>
      <div style={{ background: btnBg, color: btnColor, borderRadius: "8px", padding: "8px 20px", fontSize: "13px", fontWeight: 700, cursor: "default" }}>
        {s.layoutType === "artisan" ? "Devis gratuit" : s.layoutType === "vitrine" ? "Reserver" : "Prendre RDV"}
      </div>
    </header>
  )
}

function SharedFooter({ t, s, displayName, displayCity }) {
  return (
    <footer style={{ background: t.footerBg, padding: "40px 64px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "20px" }}>{s.emoji}</span>
        <span style={{ fontSize: "18px", fontWeight: 800, color: "#fff" }}>{displayName}</span>
      </div>
      <div style={{ display: "flex", gap: "28px" }}>
        {(s.navItems || []).map((item) => (
          <span key={item} style={{ fontSize: "13px", color: t.footerText }}>{item}</span>
        ))}
      </div>
      <span style={{ fontSize: "13px", color: t.footerText }}>{displayName} · {displayCity} · © 2025</span>
    </footer>
  )
}

// ─── Layout A : Vitrine (Restaurant, Commerce, Sante) ───────────────────────

function LayoutVitrine({ t, s, displayName, displayCity, slogan, header, footer }) {
  const subtitle = slogan || s.heroSubtitle
  const sectorKey = Object.keys(SECTORS).find((k) => SECTORS[k] === s) || ""
  return (
    <div>
      {header}

      {/* HERO — centré */}
      <section style={{ background: t.heroBg, padding: "80px 64px 72px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.7)", border: `1px solid ${t.cardBorder}`, borderRadius: "999px", padding: "6px 16px", marginBottom: "28px" }}>
          <span style={{ fontSize: "16px" }}>{s.emoji}</span>
          <span style={{ fontSize: "12px", fontWeight: 700, color: t.primary, textTransform: "uppercase", letterSpacing: "2px" }}>{sectorKey}</span>
        </div>
        <h1 style={{ fontSize: "56px", fontWeight: 900, color: t.heroText, lineHeight: 1.1, marginBottom: "20px", maxWidth: "800px", margin: "0 auto 20px" }}>
          {s.heroTitle(displayName, displayCity)}
        </h1>
        <p style={{ fontSize: "19px", color: t.heroSubtext, lineHeight: 1.7, maxWidth: "560px", margin: "0 auto 36px" }}>
          {subtitle}
        </p>
        <div style={{ marginBottom: "40px" }}>
          <button style={{ ...t.btnStyle, fontSize: "16px", padding: "14px 36px" }}>
            {s.bookingLabel || "Prendre rendez-vous"}
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
          {(s.trustPills || []).map((pill) => (
            <span key={pill} style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.85)", border: `1px solid ${t.cardBorder}`, borderRadius: "999px", padding: "6px 14px", fontSize: "13px", fontWeight: 600, color: t.heroText }}>
              <span style={{ color: t.primary }}>✓</span> {pill}
            </span>
          ))}
        </div>
      </section>

      {/* SERVICES — blocs avec bordure gauche */}
      <section style={{ background: "#fff", padding: "72px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, color: t.primary, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px" }}>Nos services</p>
          <h2 style={{ fontSize: "36px", fontWeight: 900, color: t.text, lineHeight: 1.2 }}>Ce que nous proposons</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", maxWidth: "1152px", margin: "0 auto" }}>
          {s.services.map((svc) => (
            <div key={svc.title} style={{ background: t.primaryLight, borderLeft: `4px solid ${t.primary}`, borderRadius: "16px", padding: "32px 28px" }}>
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>{svc.icon}</div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: t.text, marginBottom: "10px" }}>{svc.title}</h3>
              <p style={{ fontSize: "15px", color: t.subtext, lineHeight: 1.65 }}>{svc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING BAND */}
      <section style={{ background: t.primary, padding: "64px", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px", fontWeight: 900, color: "#fff", marginBottom: "16px" }}>
          Prêts a vous accueillir
        </h2>
        <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.8)", marginBottom: "32px" }}>
          Disponible 7j/7 — Reponse rapide garantie
        </p>
        <button style={{ background: "#fff", color: t.primary, borderRadius: "12px", padding: "14px 36px", fontWeight: 800, fontSize: "16px", border: "none", cursor: "default" }}>
          {s.bookingLabel || "Reserver maintenant"}
        </button>
      </section>

      {footer}
    </div>
  )
}

// ─── Layout B : Portfolio (Freelance, Formation, Prestataire) ────────────────

function LayoutPortfolio({ t, s, displayName, displayCity, slogan, header, footer }) {
  const subtitle = slogan || s.heroSubtitle
  const tags = s.skillTags || []
  const projects = s.projects || []
  const processSteps = s.processSteps || ["Analyse", "Proposition", "Realisation", "Livraison"]
  const stats = s.stats || []
  return (
    <div>
      {header}

      {/* HERO — 2 colonnes */}
      <section style={{ background: t.heroBg, padding: "72px 64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: "64px", alignItems: "center", maxWidth: "1152px", margin: "0 auto" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              <span style={{ fontSize: "13px", fontWeight: 600, color: t.heroSubtext }}>Disponible pour de nouveaux projets</span>
            </div>
            <h1 style={{ fontSize: "44px", fontWeight: 900, color: t.heroText, lineHeight: 1.15, marginBottom: "18px" }}>
              {s.heroTitle(displayName, displayCity)}
            </h1>
            <p style={{ fontSize: "17px", color: t.heroSubtext, lineHeight: 1.7, marginBottom: "24px" }}>
              {subtitle}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
              {tags.map((tag) => (
                <span key={tag} style={{ background: "rgba(255,255,255,0.8)", border: `1.5px solid ${t.cardBorder}`, borderRadius: "999px", padding: "5px 14px", fontSize: "13px", fontWeight: 600, color: t.heroText }}>
                  {tag}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <button style={{ ...t.btnStyle }}>Voir mes projets</button>
              <span style={{ fontSize: "14px", color: t.heroSubtext, fontWeight: 600, textDecoration: "underline" }}>Me contacter</span>
            </div>
          </div>
          <div style={{ background: t.cardBg, border: `1.5px solid ${t.cardBorder}`, borderRadius: "20px", padding: "32px", textAlign: "center" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", margin: "0 auto 16px" }}>
              {s.emoji}
            </div>
            <div style={{ fontSize: "18px", fontWeight: 800, color: t.text, marginBottom: "4px" }}>{displayName}</div>
            <div style={{ fontSize: "13px", color: t.subtext, marginBottom: "20px" }}>{displayCity}</div>
            <div style={{ display: "flex", gap: "4px", justifyContent: "center", marginBottom: "24px" }}>
              {[1,2,3,4,5].map(i => <span key={i} style={{ color: "#f59e0b", fontSize: "18px" }}>★</span>)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", borderTop: `1px solid ${t.cardBorder}`, paddingTop: "20px" }}>
              {stats.map((st) => (
                <div key={st.label}>
                  <div style={{ fontSize: "22px", fontWeight: 900, color: t.primary }}>{st.val}</div>
                  <div style={{ fontSize: "11px", color: t.subtext, lineHeight: 1.4 }}>{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJETS — grille 2x2 */}
      <section style={{ background: "#f9fafb", padding: "72px 64px" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: t.primary, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px" }}>Mes projets</p>
            <h2 style={{ fontSize: "36px", fontWeight: 900, color: t.text }}>Realisations recentes</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {projects.map((proj) => (
              <div key={proj.title} style={{ background: t.cardBg, border: `1.5px solid ${t.cardBorder}`, borderRadius: "16px", overflow: "hidden" }}>
                <div style={{ height: "80px", background: proj.color, opacity: 0.85 }} />
                <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "17px", fontWeight: 800, color: t.text }}>{proj.title}</span>
                  <span style={{ background: proj.color + "22", color: proj.color, borderRadius: "999px", padding: "3px 12px", fontSize: "12px", fontWeight: 700 }}>{proj.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS — 4 etapes */}
      <section style={{ background: t.primaryLight, padding: "56px 64px" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "30px", fontWeight: 900, color: t.text }}>Ma methode de travail</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px" }}>
            {processSteps.map((step, i) => (
              <div key={step} style={{ textAlign: "center" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: t.primary, color: "#fff", fontSize: "20px", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                  {i + 1}
                </div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: t.text }}>{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM MOCKUP */}
      <section style={{ background: "#fff", padding: "72px 64px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", background: t.cardBg, border: `1.5px solid ${t.cardBorder}`, borderRadius: "20px", padding: "40px 44px" }}>
          <h2 style={{ fontSize: "26px", fontWeight: 900, color: t.text, marginBottom: "8px", textAlign: "center" }}>Parlons de votre projet</h2>
          <p style={{ fontSize: "14px", color: t.subtext, textAlign: "center", marginBottom: "28px" }}>Reponse garantie sous 24h</p>
          {["Votre nom", "Votre email"].map((placeholder) => (
            <div key={placeholder} style={{ marginBottom: "14px", background: "#f9fafb", border: `1.5px solid ${t.cardBorder}`, borderRadius: "10px", padding: "11px 16px", fontSize: "14px", color: "#9ca3af" }}>
              {placeholder}
            </div>
          ))}
          <div style={{ marginBottom: "14px", background: "#f9fafb", border: `1.5px solid ${t.cardBorder}`, borderRadius: "10px", padding: "12px 16px", fontSize: "14px", color: "#9ca3af", height: "72px" }}>
            Votre message
          </div>
          <button style={{ ...t.btnStyle, width: "100%", textAlign: "center", marginTop: "8px" }}>Envoyer mon message</button>
        </div>
      </section>

      {footer}
    </div>
  )
}

// ─── Layout C : Artisan (Artisanat, BTP) ────────────────────────────────────

function LayoutArtisan({ t, s, displayName, displayCity, slogan, header, footer }) {
  const subtitle = slogan || s.heroSubtitle
  const trustBadges = s.trustBadges || []
  const realisations = s.realisations || []
  return (
    <div>
      {header}

      {/* TRUST STRIP */}
      <div style={{ background: t.footerBg, padding: "0 64px", height: "52px", display: "flex", alignItems: "center", justifyContent: "center", gap: "48px" }}>
        {trustBadges.map((badge) => (
          <span key={badge} style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13px", fontWeight: 600, color: t.footerText }}>
            <span style={{ color: t.primary }}>✓</span> {badge}
          </span>
        ))}
      </div>

      {/* HERO — 2 colonnes */}
      <section style={{ background: t.heroBg, padding: "72px 64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "64px", alignItems: "center", maxWidth: "1152px", margin: "0 auto" }}>
          <div>
            <h1 style={{ fontSize: "48px", fontWeight: 900, color: t.heroText, lineHeight: 1.1, marginBottom: "20px" }}>
              {s.heroTitle(displayName, displayCity)}
            </h1>
            <p style={{ fontSize: "18px", color: t.heroSubtext, lineHeight: 1.7, marginBottom: "32px" }}>
              {subtitle}
            </p>
            <button style={{ ...t.btnStyle, fontSize: "16px", padding: "14px 36px", display: "inline-block", marginBottom: "12px" }}>
              Demander un devis gratuit
            </button>
            <p style={{ fontSize: "13px", color: t.heroSubtext }}>Reponse sous 24h · Deplacement gratuit · Sans engagement</p>
          </div>
          <div style={{ background: t.cardBg, border: `2px solid ${t.cardBorder}`, borderRadius: "20px", padding: "32px 28px" }}>
            <div style={{ fontSize: "15px", fontWeight: 800, color: t.text, marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "20px" }}>📋</span> Demandez un devis gratuit
            </div>
            {["Votre nom", "Votre telephone"].map((ph) => (
              <div key={ph} style={{ marginBottom: "12px", background: "#f9fafb", border: `1.5px solid ${t.cardBorder}`, borderRadius: "10px", padding: "11px 14px", fontSize: "13px", color: "#9ca3af" }}>
                {ph}
              </div>
            ))}
            <div style={{ marginBottom: "12px", background: "#f9fafb", border: `1.5px solid ${t.cardBorder}`, borderRadius: "10px", padding: "11px 14px", fontSize: "13px", color: "#9ca3af", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Type de travaux</span>
              <span style={{ color: "#d1d5db" }}>▼</span>
            </div>
            <button style={{ ...t.btnStyle, width: "100%", textAlign: "center", padding: "12px 20px" }}>
              Envoyer ma demande
            </button>
          </div>
        </div>
      </section>

      {/* REALISATIONS — mosaique */}
      <section style={{ background: "#fff", padding: "72px 64px" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontSize: "12px", fontWeight: 700, color: t.primary, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px" }}>Nos realisations</p>
            <h2 style={{ fontSize: "36px", fontWeight: 900, color: t.text }}>Nos chantiers recents</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", alignItems: "start" }}>
            {realisations.map((real, i) => (
              <div key={real.label} style={{ borderRadius: "16px", overflow: "hidden", height: `${i % 2 === 1 ? 160 : 220}px`, background: real.color, position: "relative", display: "flex", alignItems: "flex-end" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }} />
                <div style={{ position: "relative", padding: "20px", color: "#fff", fontWeight: 700, fontSize: "16px" }}>{real.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BADGES BAR */}
      <section style={{ background: t.primaryLight, padding: "40px 64px" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
          {trustBadges.map((badge) => (
            <div key={badge} style={{ background: t.cardBg, border: `2px solid ${t.cardBorder}`, borderRadius: "999px", padding: "10px 24px", fontSize: "14px", fontWeight: 700, color: t.text, display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: t.primary, fontSize: "16px" }}>🏅</span> {badge}
            </div>
          ))}
        </div>
      </section>

      {footer}
    </div>
  )
}

// ─── Dispatcher principal ───────────────────────────────────────────────────

export default function WebsitePreview({ name, sector, city, theme = "colore", slogan = "" }) {
  const t = THEMES[theme] || THEMES.colore
  const s = SECTORS[sector] || DEFAULT_SECTOR
  const displayName = name || "Votre Societe"
  const displayCity = city || "votre ville"
  const layoutType = s.layoutType || "portfolio"

  const headerEl = <SharedHeader t={t} s={s} displayName={displayName} />
  const footerEl = <SharedFooter t={t} s={s} displayName={displayName} displayCity={displayCity} />
  const layoutProps = { t, s, displayName, displayCity, slogan, header: headerEl, footer: footerEl }

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", width: "1280px", minHeight: "960px", background: "#f9fafb", color: t.text }}>
      {layoutType === "vitrine"   && <LayoutVitrine   {...layoutProps} />}
      {layoutType === "portfolio" && <LayoutPortfolio {...layoutProps} />}
      {layoutType === "artisan"   && <LayoutArtisan   {...layoutProps} />}
    </div>
  )
}
