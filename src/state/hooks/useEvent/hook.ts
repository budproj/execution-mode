import { useAmplitude } from '../useAmplitude/hook'

import { EventType } from './event-type'
import { PageViewEventData } from './events/page-view'

type Event = {
  [EventType.PAGE_VIEW]: PageViewEventData
}

interface EventHook<E extends keyof Event> {
  dispatch: (eventData: Event[E]) => void
}

export const useEvent = (eventType: EventType, project?: string): EventHook<typeof eventType> => {
  const { logEvent } = useAmplitude(project)

  const dispatch = (event: Event[typeof eventType]) => {
    logEvent(eventType, event)
  }

  return {
    dispatch,
  }
}
