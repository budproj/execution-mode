import { useContext } from 'react'

import { defaultProject } from '../../../components/Base/AmplitudeProvider/constants'
import { AmplitudeContext } from '../../../components/Base/AmplitudeProvider/context'

import { identifyFactory } from './identify-factory'
import { logEventFactory } from './log-event-factory'
import { AmplitudeUser, AmplitudeUserGroups } from './types'

type AmplitudeHook = {
  identify: (userID: string, userData: AmplitudeUser, userGroups?: AmplitudeUserGroups) => void
  logEvent: (eventType: string, eventProperties?: Record<string, any>) => void
}

export const useAmplitude = (project?: string): AmplitudeHook => {
  project ??= defaultProject

  const context = useContext(AmplitudeContext)
  const client = context[project]

  const identify = identifyFactory(client)
  const logEvent = logEventFactory(client)

  return {
    identify,
    logEvent,
  }
}
