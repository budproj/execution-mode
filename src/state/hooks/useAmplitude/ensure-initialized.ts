import * as amplitude from '@amplitude/analytics-browser'

import getConfig from '../../../config'

const defaultAmplitudeSettings = {
  attribution: {
    trackNewCampaigns: true,
  },
}

export const ensureInitialized = (userId?: string): void => {
  const { publicRuntimeConfig } = getConfig()
  const { apiKey } = publicRuntimeConfig.amplitude

  amplitude.init(apiKey, userId, defaultAmplitudeSettings)
}
