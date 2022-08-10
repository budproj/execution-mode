import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

interface UrlLocationContextData {
  hash: string
  updateHash: (newHash: string) => void
}

interface UrlLocationProviderData {
  children: JSX.Element
}

const UrlLocationContext = createContext<UrlLocationContextData>({} as UrlLocationContextData)

export const UrlLocationProvider = ({ children }: UrlLocationProviderData) => {
  const [hash, setHash] = useState(() => window.location.hash)

  const hashChangeHandler = useCallback(() => {
    setHash(window.location.hash)
  }, [])

  useEffect(() => {
    window.addEventListener('hashchange', hashChangeHandler)
    return () => {
      window.removeEventListener('hashchange', hashChangeHandler)
    }
  }, [])

  const updateHash = useCallback(
    (newHash: string) => {
      if (newHash !== hash) {
        window.location.hash = newHash
      }
    },
    [hash],
  )
  return (
    <UrlLocationContext.Provider value={{ hash: hash.replace('#', '').toLowerCase(), updateHash }}>
      {children}
    </UrlLocationContext.Provider>
  )
}

export function useHash(): UrlLocationContextData {
  const context = useContext(UrlLocationContext)

  if (!context) {
    throw new Error('useHash must be used within an UrlLocationProvider')
  }

  return context
}

export default useHash
