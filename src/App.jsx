import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

const Offres = lazy(() => import('./pages/Offres'))
const APropos = lazy(() => import('./pages/APropos'))
const RDV = lazy(() => import('./pages/RDV'))
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'))
const PolitiqueConfidentialite = lazy(() => import('./pages/PolitiqueConfidentialite'))
const AuditCommercial = lazy(() => import('./pages/AuditCommercial'))
const CreationSiteVitrine = lazy(() => import('./pages/CreationSiteVitrine'))

// AnimatePresence nécessite l'accès à location via un composant interne
function AnimatedRoutes() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/offres" element={<Offres />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/rdv" element={<RDV />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/audit-commercial" element={<AuditCommercial />} />
          <Route path="/creation-site-vitrine" element={<CreationSiteVitrine />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#FAFBFF] text-gray-900" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          <Header />
          <main>
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  )
}
