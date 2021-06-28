import { AmplitudeClient } from 'amplitude-js'

import { ensureInitialized } from './ensure-initialized'
import { AmplitudeUser, AmplitudeUserGroups } from './types'

export const identifyFactory =
  (client?: AmplitudeClient) =>
  (userID: string, userData: AmplitudeUser, userGroups?: AmplitudeUserGroups): void => {
    if (!client) return

    ensureInitialized(client)

    client.setUserId(userID)
    client.setUserProperties(userData)

    if (userGroups)
      Object.entries(userGroups).map(([type, values]) => client.setGroup(type, values))
  }
