import { createContext, useContext, useRef } from 'react'

const defaultContext = {
  scrollRef: { current: null },
  lenisRef: { current: null },
}

const StellarContext = createContext(defaultContext)

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
  return useContext(StellarContext)
}
