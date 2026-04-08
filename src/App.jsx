import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import Header from './components/Header'
import Footer from './components/Footer'
import AvailabilityBanner from './components/AvailabilityBanner'
import { AVAILABILITY } from './config/availability'
import Home from './pages/Home'

const Offres = lazy(() => import('./pages/Offres'))
const APropos = lazy(() => import('./pages/APropos'))
const RDV = lazy(() => import('./pages/RDV'))
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'))
const PolitiqueConfidentialite = lazy(() => import('./pages/PolitiqueConfidentialite'))
const AuditCommercial = lazy(() => import('./pages/AuditCommercial'))
const CreationSiteVitrine = lazy(() => import('./pages/CreationSiteVitrine'))
const ApercuSite = lazy(() => import('./pages/ApercuSite'))
const PourquoiPasFaireSoiMeme = lazy(() => import('./pages/PourquoiPasFaireSoiMeme'))
const Tarifs = lazy(() => import('./pages/Tarifs'))
const SiteVitrineRestaurant = lazy(() => import('./pages/seo/SiteVitrineRestaurant'))
const SiteVitrineArtisan = lazy(() => import('./pages/seo/SiteVitrineArtisan'))
const SiteVitrineCoach = lazy(() => import('./pages/seo/SiteVitrineCoach'))
const SiteVitrineCommerce = lazy(() => import('./pages/seo/SiteVitrineCommerce'))
const SiteVitrineLyon = lazy(() => import('./pages/seo/SiteVitrineLyon'))
const SiteVitrineParis = lazy(() => import('./pages/seo/SiteVitrineParis'))
const SiteVitrineBordeaux = lazy(() => import('./pages/seo/SiteVitrineBordeaux'))
const CombienCouteUnSiteVitrine = lazy(() => import('./pages/guides/CombienCouteUnSiteVitrine'))
const WixVsAgenceWeb = lazy(() => import('./pages/guides/WixVsAgenceWeb'))
const Commander = lazy(() => import('./pages/Commander'))

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
          <Route path="/apercu-site" element={<ApercuSite />} />
          <Route path="/pourquoi-pas-faire-soi-meme" element={<PourquoiPasFaireSoiMeme />} />
          <Route path="/tarifs" element={<Tarifs />} />
          <Route path="/creation-site-vitrine-restaurant" element={<SiteVitrineRestaurant />} />
          <Route path="/creation-site-vitrine-artisan" element={<SiteVitrineArtisan />} />
          <Route path="/creation-site-vitrine-coach" element={<SiteVitrineCoach />} />
          <Route path="/creation-site-vitrine-commerce-local" element={<SiteVitrineCommerce />} />
          <Route path="/creation-site-vitrine-lyon" element={<SiteVitrineLyon />} />
          <Route path="/creation-site-vitrine-paris" element={<SiteVitrineParis />} />
          <Route path="/creation-site-vitrine-bordeaux" element={<SiteVitrineBordeaux />} />
          <Route path="/guide/combien-coute-un-site-vitrine" element={<CombienCouteUnSiteVitrine />} />
          <Route path="/guide/wix-vs-agence-web" element={<WixVsAgenceWeb />} />
          <Route path="/commander" element={<Commander />} />
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
          <AvailabilityBanner />
          <Header />
          <main style={{ paddingTop: AVAILABILITY.active ? '40px' : '0' }}>
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  )
}
