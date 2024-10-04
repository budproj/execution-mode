import { ensureInitialized } from './ensure-initialized'
import { identify } from './identify-factory'
import { logEvent, LogEventOptions } from './log-event-factory'
import { AmplitudeUser, AmplitudeUserGroups } from './types'

export type AmplitudeHook = {
  identify: (userID: string, userData: AmplitudeUser, userGroups?: AmplitudeUserGroups) => void
  logEvent: (
    eventType: string,
    eventProperties?: Record<string, any>,
    options?: LogEventOptions,
  ) => void
}

export const useAmplitude = (): AmplitudeHook => {
  ensureInitialized()

  return {
    identify,
    logEvent,
  }
}
