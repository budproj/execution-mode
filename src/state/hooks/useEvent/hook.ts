import { useAmplitude } from '../useAmplitude/hook'

import { EventType } from './event-type'
import { KeyResultProgressChartViewEventData } from './events/key-result-progress-chart-view'
import { PageViewEventData } from './events/page-view'

type Event = {
  [EventType.PAGE_VIEW]: PageViewEventData
  [EventType.KEY_RESULT_PROGRESS_CHART_VIEW]: KeyResultProgressChartViewEventData
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
