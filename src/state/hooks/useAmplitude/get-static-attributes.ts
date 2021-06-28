import { AmplitudeClient } from 'amplitude-js'

import { ensureInitialized } from './ensure-initialized'
import { AmplitudeStaticAttributes } from './types'

export const getStaticAttributes = (client?: AmplitudeClient): AmplitudeStaticAttributes => {
  if (!client) return {}

  ensureInitialized(client)

  return {
    sessionID: client.getSessionId(),
    deviceID: client.options.deviceId,
  }
}
