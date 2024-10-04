import { useAmplitude } from '../useAmplitude/hook'

import { Event } from './event'
import { EventType } from './event-type'
import { Feature } from './feature'

interface EventHook<E extends keyof Event> {
  dispatch: (eventData: Event[E]) => void
}

type EventHookOptions = {
  project?: string
  feature?: Feature
}

export const useEvent = (
  eventType: EventType,
  options: EventHookOptions = {},
): EventHook<typeof eventType> => {
  const { logEvent } = useAmplitude()

  const dispatch = (event: Event[typeof eventType]) => {
    logEvent(eventType, event, options)
  }

  return {
    dispatch,
  }
}
