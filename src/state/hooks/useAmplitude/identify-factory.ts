import * as amplitude from '@amplitude/analytics-browser'

import { ensureInitialized } from './ensure-initialized'
import { AmplitudeUser, AmplitudeUserGroups } from './types'

export const identify = (
  userID: string,
  userData: AmplitudeUser,
  userGroups?: AmplitudeUserGroups,
): void => {
  ensureInitialized(userID)
  amplitude.setUserId(userID)

  const identify = new amplitude.Identify()
  identify
    .set('id', userData.id)
    .set('email', userData.email)
    .set('name', userData.name)
    .set('gender', userData.gender)
    .set('isTeamLeader', userData.isTeamLeader)
    .set('role', userData.role)
    .set('createdAt', userData.createdAt)

  amplitude.identify(identify)

  if (userGroups)
    Object.entries(userGroups).map(([type, values]) =>
      amplitude.groupIdentify(type, values, identify),
    )
}
