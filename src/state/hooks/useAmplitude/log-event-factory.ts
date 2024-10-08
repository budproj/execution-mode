import * as amplitude from '@amplitude/analytics-browser'

import { ensureInitialized } from './ensure-initialized'

export type LogEventOptions = {
  feature?: string
}

export const logEvent = (
  eventType: string,
  eventProperties?: Record<string, any>,
  options: LogEventOptions = {},
): void => {
  ensureInitialized()
  amplitude.track(eventType, eventProperties)

  if (options.feature)
    handleFeatureUse(options.feature, { type: eventType, properties: eventProperties })
}

type HandleFeatureUseEventOriginOptions = {
  type: string
  properties?: Record<string, any>
}

const handleFeatureUse = (feature: string, eventOrigin: HandleFeatureUseEventOriginOptions) => {
  amplitude.track('UsedFeature', {
    ...eventOrigin.properties,
    eventOriginType: eventOrigin.type,
    feature,
  })
}
