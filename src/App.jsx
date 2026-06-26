import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import AppLayout from './layouts/AppLayout'
import Home from './pages/Home'
import { useStellar } from './contexts/StellarContext'

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
const Portfolio = lazy(() => import('./pages/Portfolio'))

// AnimatePresence requires location access via an inner component
function AnimatedRoutes() {
  const location = useLocation()
  const { scrollRef } = useStellar()

  useEffect(() => {
    if (scrollRef?.current) scrollRef.current.scrollTop = 0
  }, [location.pathname, scrollRef])

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
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppLayout>
          <AnimatedRoutes />
        </AppLayout>
      </BrowserRouter>
    </HelmetProvider>
  )
}
