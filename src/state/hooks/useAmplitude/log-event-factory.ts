import { AmplitudeClient } from 'amplitude-js'

import { ensureInitialized } from './ensure-initialized'

export type LogEventOptions = {
  feature?: string
}

export const logEventFactory =
  (client?: AmplitudeClient) =>
  (
    eventType: string,
    eventProperties?: Record<string, any>,
    options: LogEventOptions = {},
  ): void => {
    if (!client) return

    ensureInitialized(client)
    client.logEvent(eventType, eventProperties)

    if (options.feature) handleFeatureUse(options.feature, client, eventProperties)
  }

const handleFeatureUse = (
  feature: string,
  client: AmplitudeClient,
  eventProperties?: Record<string, any>,
) => {
  client.logEvent('UsedFeature', {
    ...eventProperties,
    feature,
  })
}
