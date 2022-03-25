import { AmplitudeClient } from 'amplitude-js'

export const getNoSSRInstance = (project?: string): AmplitudeClient | undefined => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? undefined : amplitudeInstance(project)
}

const amplitudeInstance = (project?: string): AmplitudeClient => {
  // Since Amplitude does not provide a simple way to handle SSR, we need to dynamically
  // import it
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { default: amplitude } = require('amplitude-js')
  return amplitude.getInstance(project)
}
