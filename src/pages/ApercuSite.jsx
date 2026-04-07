import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import SEOHead from '../components/SEOHead'
import WebsitePreview, { THEMES, SECTORS } from '../components/WebsitePreview'

const SECTOR_LIST = Object.keys(SECTORS)
const THEME_LIST = Object.entries(THEMES).map(([id, t]) => ({ id, ...t }))

const PREVIEW_CONTENT_HEIGHT = 960

const gradientText = {
  background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const THEME_COLORS = {
  colore:  { dot: 'linear-gradient(135deg, #F97316, #0D9488)', label: 'Color\u00e9' },
  elegant: { dot: 'linear-gradient(135deg, #1e2d4f, #c9a84c)', label: '\u00c9l\u00e9gant' },
  nature:  { dot: 'linear-gradient(135deg, #16a34a, #22c55e)', label: 'Nature' },
  warm:    { dot: 'linear-gradient(135deg, #ea580c, #fbbf24)', label: 'Chaleureux' },
  pro:     { dot: 'linear-gradient(135deg, #2563eb, #60a5fa)', label: 'Professionnel' },
}

export default function ApercuSite() {
  const [form, setForm] = useState({
    name: '',
    sector: SECTOR_LIST[0],
    city: '',
    slogan: '',
    theme: 'colore',
  })

  const previewContainerRef = useRef(null)
  const [scale, setScale] = useState(null)

  useEffect(() => {
    const el = previewContainerRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width
      if (w > 0) setScale(w / 1280)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <PageTransition>
      <SEOHead
        title="Aperçu de votre futur site vitrine | BNK Conseil"
        description="Visualisez gratuitement à quoi ressemblerait votre site vitrine. Choisissez votre secteur, votre thème et obtenez un aperçu instantané. Zéro engagement."
        canonical="https://bnk-conseil-1z3b.vercel.app/apercu-site"
      />

      {/* En-tête */}
      <section
        className="pt-32 pb-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #faf5ff 40%, #fce7f3 100%)' }}
      >
        <div
          className="absolute top-0 left-1/3 w-96 h-72 opacity-40 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(196,181,253,0.6), transparent)', filter: 'blur(60px)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/creation-site-vitrine"
              className="inline-flex items-center gap-2 text-violet-600 text-sm font-medium mb-6 hover:text-violet-700 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Création site vitrine
            </Link>
            <span className="block text-violet-600 text-sm font-semibold uppercase tracking-widest mb-4">Outil gratuit</span>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mt-2 mb-4 leading-tight">
              Visualisez votre{' '}
              <span style={gradientText}>futur site web</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Renseignez les infos de votre société et obtenez un aperçu instantané de ce que pourrait être votre site. Gratuit, sans engagement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Corps principal : formulaire + preview */}
      <section className="py-12 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 items-start">

            {/* Colonne gauche : Formulaire */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="xl:sticky xl:top-24"
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Personnalisez votre aperçu</h2>
                  <p className="text-gray-500 text-sm">Les modifications s'appliquent en temps réel.</p>
                </div>

                {/* Nom de la société */}
                <div>
                  <label className="block text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    Nom de votre société
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Ex : Boulangerie Martin"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200"
                  />
                </div>

                {/* Secteur d'activité */}
                <div>
                  <label className="block text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    Secteur d'activité
                  </label>
                  <div className="relative">
                    <select
                      value={form.sector}
                      onChange={(e) => handleChange('sector', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm appearance-none focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200 cursor-pointer"
                    >
                      {SECTOR_LIST.map((s) => (
                        <option key={s} value={s}>{SECTORS[s].emoji} {s}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-400">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Ville */}
                <div>
                  <label className="block text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    Ville
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="Ex : Lyon, Paris, Bordeaux"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200"
                  />
                </div>

                {/* Slogan */}
                <div>
                  <label className="block text-gray-600 text-xs font-semibold mb-1.5 uppercase tracking-wider">
                    Slogan{' '}
                    <span className="text-gray-400 font-normal normal-case tracking-normal">(optionnel)</span>
                  </label>
                  <input
                    type="text"
                    value={form.slogan}
                    onChange={(e) => handleChange('slogan', e.target.value)}
                    placeholder="Ex : Artisan de confiance depuis 1998"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200"
                  />
                </div>

                {/* Thème visuel */}
                <div>
                  <label className="block text-gray-600 text-xs font-semibold mb-3 uppercase tracking-wider">
                    Thème visuel
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {THEME_LIST.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleChange('theme', t.id)}
                        className="flex flex-col items-center gap-2 p-2.5 rounded-xl border-2 transition-all duration-200"
                        style={{
                          borderColor: form.theme === t.id ? '#7C3AED' : '#e5e7eb',
                          background: form.theme === t.id ? '#f5f3ff' : '#fafafa',
                        }}
                        title={THEME_COLORS[t.id]?.label}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex-shrink-0"
                          style={{ background: THEME_COLORS[t.id]?.dot }}
                        />
                        <span className="text-xs font-medium text-gray-600 leading-tight text-center">
                          {THEME_COLORS[t.id]?.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-gray-500 text-sm mb-4">
                    Ce design vous convient ? Obtenons votre vrai site en 2 à 4 semaines.
                  </p>
                  <Link
                    to="/rdv"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white text-base transition-all duration-300 hover:shadow-xl hover:shadow-violet-300/50 hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                  >
                    Obtenir mon vrai site
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <p className="text-center text-gray-400 text-xs mt-2">Devis gratuit · Sans engagement · Réponse sous 24h</p>
                </div>
              </div>
            </motion.div>

            {/* Colonne droite : Preview live */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                {/* Barre navigateur fictive */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 border-b border-gray-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-3 h-6 bg-white rounded-md border border-gray-200 flex items-center px-3">
                    <span className="text-gray-400 text-xs truncate">
                      www.{(form.name || 'votre-site').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.fr
                    </span>
                  </div>
                  <div className="flex gap-1 opacity-40">
                    <div className="w-4 h-4 bg-gray-400 rounded-sm" />
                    <div className="w-4 h-4 bg-gray-400 rounded-sm" />
                  </div>
                </div>

                {/* Zone preview scalée — responsive via ResizeObserver */}
                <div
                  ref={previewContainerRef}
                  className="relative overflow-hidden bg-gray-50"
                  style={{ height: scale ? `${scale * PREVIEW_CONTENT_HEIGHT}px` : '480px' }}
                >
                  <div
                    style={{
                      width: '1280px',
                      transformOrigin: 'top left',
                      transform: `scale(${scale ?? 0.5})`,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    }}
                  >
                    <WebsitePreview
                      name={form.name}
                      sector={form.sector}
                      city={form.city}
                      theme={form.theme}
                      slogan={form.slogan}
                    />
                  </div>
                </div>

                {/* Label aperçu */}
                <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">
                    Aperçu non-contractuel — personnalisable à 100%
                  </span>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: '#f5f3ff', color: '#7C3AED' }}
                  >
                    {THEME_COLORS[form.theme]?.label}
                  </span>
                </div>
              </div>

              {/* Note reassurance */}
              <div className="mt-4 rounded-xl border border-violet-100 bg-violet-50 px-5 py-4 flex flex-wrap gap-x-6 gap-y-2">
                {['Design entièrement sur-mesure', 'Votre contenu réel intégré', 'Optimisé SEO dès le départ'].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-violet-700 text-sm font-medium">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 flex-shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </PageTransition>
  )
}
