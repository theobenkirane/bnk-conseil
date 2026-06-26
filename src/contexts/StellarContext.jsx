import { createContext, useContext, useRef } from 'react'

const StellarContext = createContext(null)

export function StellarProvider({ children }) {
  const scrollRef = useRef(null)
  const lenisRef = useRef(null)
  return (
    <StellarContext.Provider value={{ scrollRef, lenisRef }}>
      {children}
    </StellarContext.Provider>
  )
}

export function useStellar() {
  const ctx = useContext(StellarContext)
  if (!ctx) throw new Error('useStellar must be inside StellarProvider')
  return ctx
}
