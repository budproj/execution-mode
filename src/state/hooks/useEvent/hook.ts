import { useAmplitude } from '../useAmplitude/hook'

import { EventType } from './event-type'
import { DeletedKeyResultCheckMarkEventData } from './events/deleted-key-result-check-mark'
import { KeyResultCreateChecklistEventData } from './events/key-result-create-checklist'
import { KeyResultProgressChartViewEventData } from './events/key-result-progress-chart-view'
import { OpenedKeyResultChecklistEventData } from './events/opened-key-result-checklist'
import { OpenedKeyResultDrawerEventData } from './events/opened-key-result-drawer'
import { PageViewEventData } from './events/page-view'
import { ToggledKeyResultCheckMarkEventData } from './events/toggled-key-result-check-mark'
import { UpdatedKeyResultCheckMarkAssigneeEventData } from './events/updated-key-result-check-mark-assignee'
import { UpdatedKeyResultCheckMarkTitleEventData } from './events/updated-key-result-check-mark-title'

type Event = {
  [EventType.PAGE_VIEW]: PageViewEventData
  [EventType.KEY_RESULT_PROGRESS_CHART_VIEW]: KeyResultProgressChartViewEventData
  [EventType.KEY_RESULT_CREATE_CHECKLIST]: KeyResultCreateChecklistEventData
  [EventType.OPENED_KEY_RESULT_DRAWER]: OpenedKeyResultDrawerEventData
  [EventType.OPENED_KEY_RESULT_CHECKLIST]: OpenedKeyResultChecklistEventData
  [EventType.TOGGLED_KEY_RESULT_CHECK_MARK]: ToggledKeyResultCheckMarkEventData
  [EventType.UPDATED_KEY_RESULT_CHECK_MARK_TITLE]: UpdatedKeyResultCheckMarkTitleEventData
  [EventType.DELETED_KEY_RESULT_CHECK_MARK]: DeletedKeyResultCheckMarkEventData
  [EventType.UPDATED_KEY_RESULT_CHECK_MARK_ASSIGNEE]: UpdatedKeyResultCheckMarkAssigneeEventData
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
