import { AmplitudeClient } from 'amplitude-js'

import getConfig from '../../../config'

const defaultAmplitudeSettings = {
  saveEvents: true,
  includeUtm: false,
  includeReferer: true,
  saveParamsReferrerOncePerSession: false,
}

export const ensureInitialized = (client: AmplitudeClient): void => {
  const { publicRuntimeConfig } = getConfig()
  const { apiKey } = publicRuntimeConfig.amplitude

  client.init(apiKey, undefined, defaultAmplitudeSettings)
}
