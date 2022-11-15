import { useCallback } from 'react'

function useLocalStorage<T>() {
  const register = useCallback((key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [])

  const get = useCallback((key: string) => {
    if (typeof window !== 'undefined') {
      const value = localStorage.getItem(key)
      if (!value) {
        console.warn(`Local Storage is not storing any value referring to key: ${key}`)
        return
      }

      return JSON.parse(value)
    }
  }, [])

  const clear = useCallback((key: string) => {
    const value = localStorage.getItem(key)
    if (!value) {
      console.warn(`Local Storage is not storing any value referring to key: ${key}`)
      return
    }

    localStorage.removeItem(key)
  }, [])

  return {
    register,
    get,
    clear,
  }
}

export default useLocalStorage
