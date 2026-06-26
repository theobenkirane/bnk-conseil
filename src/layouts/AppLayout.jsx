import { useLocation } from 'react-router-dom'
import { StellarProvider, useStellar } from '../contexts/StellarContext'
import StellarShell from '../components/StellarShell'
import StellarNav from '../components/StellarNav'
import PageIndicator from '../components/PageIndicator'
import ScrollHint from '../components/ScrollHint'
import AvailabilityBanner from '../components/AvailabilityBanner'
import { AVAILABILITY } from '../config/availability'

function BNKLayout({ children }) {
  const { scrollRef } = useStellar()
  return (
    <StellarShell
      bannerActive={AVAILABILITY.active}
      overlays={
        <>
          <StellarNav />
          <PageIndicator scrollRef={scrollRef} />
          <ScrollHint scrollRef={scrollRef} />
        </>
      }
    >
      {children}
    </StellarShell>
  )
}

export default function AppLayout({ children }) {
  const location = useLocation()
  const isPortfolio = location.pathname === '/portfolio'

  if (isPortfolio) return <>{children}</>

  return (
    <StellarProvider>
      {AVAILABILITY.active && <AvailabilityBanner />}
      <BNKLayout>{children}</BNKLayout>
    </StellarProvider>
  )
}
