import { EventType } from './event-type'
import { CreatedKeyResultCheckInData } from './events/created-key-result-check-in'
import { CreatedKeyResultCheckMarkEventData } from './events/created-key-result-check-mark'
import { CreatedKeyResultCommentData } from './events/created-key-result-comment'
import { CreatedPersonalTaskEventData } from './events/created-personal-task'
import { DeletedKeyResultCheckMarkEventData } from './events/deleted-key-result-check-mark'
import { DeletedPersonalTaskEventData } from './events/deleted-personal-task'
import { KeyResultCreateChecklistEventData } from './events/key-result-create-checklist'
import { KeyResultProgressChartViewEventData } from './events/key-result-progress-chart-view'
import { OpenedKeyResultChecklistEventData } from './events/opened-key-result-checklist'
import { OpenedKeyResultDrawerEventData } from './events/opened-key-result-drawer'
import { OpenedKeyResultReportConfidanceData } from './events/opened-key-result-report-confidance-data'
import { PageViewEventData } from './events/page-view'
import { ToggledKeyResultCheckMarkEventData } from './events/toggled-key-result-check-mark'
import { ToggledPersonalTaskEventData } from './events/toggled-personal-task'
import { UpdatedKeyResultCheckMarkAssigneeEventData } from './events/updated-key-result-check-mark-assignee'
import { UpdatedKeyResultCheckMarkTitleEventData } from './events/updated-key-result-check-mark-title'
import { UpdatedPersonalTaskTitleEventData } from './events/updated-personal-task-title'

export type Event = {
  [EventType.PAGE_VIEW]: PageViewEventData
  [EventType.KEY_RESULT_PROGRESS_CHART_VIEW]: KeyResultProgressChartViewEventData
  [EventType.KEY_RESULT_CREATE_CHECKLIST]: KeyResultCreateChecklistEventData
  [EventType.OPENED_KEY_RESULT_DRAWER]: OpenedKeyResultDrawerEventData
  [EventType.OPENED_KEY_RESULT_CHECKLIST]: OpenedKeyResultChecklistEventData
  [EventType.TOGGLED_KEY_RESULT_CHECK_MARK]: ToggledKeyResultCheckMarkEventData
  [EventType.UPDATED_KEY_RESULT_CHECK_MARK_TITLE]: UpdatedKeyResultCheckMarkTitleEventData
  [EventType.DELETED_KEY_RESULT_CHECK_MARK]: DeletedKeyResultCheckMarkEventData
  [EventType.UPDATED_KEY_RESULT_CHECK_MARK_ASSIGNEE]: UpdatedKeyResultCheckMarkAssigneeEventData
  [EventType.CREATED_KEY_RESULT_CHECK_MARK]: CreatedKeyResultCheckMarkEventData
  [EventType.CREATED_KEY_RESULT_CHECK_IN]: CreatedKeyResultCheckInData
  [EventType.CREATED_KEY_RESULT_COMMENT]: CreatedKeyResultCommentData
  [EventType.CREATED_PERSONAL_TASK]: CreatedPersonalTaskEventData
  [EventType.DELETED_PERSONAL_TASK]: DeletedPersonalTaskEventData
  [EventType.TOGGLED_PERSONAL_TASK]: ToggledPersonalTaskEventData
  [EventType.UPDATED_PERSONAL_TASK_TITLE]: UpdatedPersonalTaskTitleEventData
  [EventType.OPENED_KEY_RESULT_REPORT_CONFIDANCE]: OpenedKeyResultReportConfidanceData
}
