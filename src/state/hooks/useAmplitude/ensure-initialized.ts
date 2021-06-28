import { AmplitudeClient } from 'amplitude-js'

import getConfig from '../../../config'

export const ensureInitialized = (client: AmplitudeClient): void => {
  const { publicRuntimeConfig } = getConfig()
  const { apiKey } = publicRuntimeConfig.amplitude

  client.init(apiKey)
}
