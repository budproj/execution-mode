import { useEffect, useState } from 'react'

declare global {
  interface Window {
    htmx: any
  }
}

const useHTMX = () => {
  const [htmxLoaded, setHTMXLoaded] = useState(false)

  useEffect(() => {
    if (window.htmx) {
      setHTMXLoaded(true)
      window.htmx.process(document.body)
    } else {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/htmx.org@1.6.1'
      script.addEventListener('load', () => {
        setHTMXLoaded(true)
        if (window.htmx) {
          window.htmx.process(document.body)
        }
      })

      document.body.append(script)
    }
  }, [])

  return htmxLoaded
}

export default useHTMX
