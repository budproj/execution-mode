import { AmplitudeClient } from 'amplitude-js'

import { ensureInitialized } from './ensure-initialized'

export const logEventFactory =
  (client?: AmplitudeClient) =>
  (eventType: string, eventProperties?: Record<string, any>): void => {
    if (!client) return

    ensureInitialized(client)
    client.logEvent(eventType, eventProperties)
  }
