import { EventType } from './event-type'
import { AnswerNowFormClickData } from './events/answer-now-form-click-data'
import { ChangeTimePeriodClickData } from './events/change-time-period-click-data'
import { CommentInRoutineAnswerClickData } from './events/comment-in-routine-click-data'
import { CreateDraftFeedbackAnswerClickData } from './events/create-draft-feedback-answer-click-data'
import { CreateDraftFeedbackClickData } from './events/create-draft-feedback-click-data'
import { CreateDraftKeyResultClickData } from './events/create-draft-key-result-click-data'
import { CreateDraftObjectiveClickData } from './events/create-draft-objective-click-data'
import { CreatedKeyResultData } from './events/create-key-result-data'
import { CreatedObjectiveData } from './events/create-objective-data'
import { CreatedKeyResultCheckInData } from './events/created-key-result-check-in'
import { CreatedKeyResultCheckMarkEventData } from './events/created-key-result-check-mark'
import { CreatedKeyResultCommentData } from './events/created-key-result-comment'
import { CreatedPersonalTaskEventData } from './events/created-personal-task'
import { DeletedKeyResultCheckMarkEventData } from './events/deleted-key-result-check-mark'
import { DeletedPersonalTaskEventData } from './events/deleted-personal-task'
import { GenerateKeyResultSummarizeClickData } from './events/generate-key-result-summarize-click-data'
import { IndicatorAccordionButtonClickData } from './events/indicator-accordion-button-click-data'
import { IndicatorCheckListClickData } from './events/indicator-check-list-click-data'
import { IndicatorProgressClickData } from './events/indicator-progress-click-data'
import { IndicatorReportDownloadClickData } from './events/indicator-report-download-click-data'
import { IndicatorRoutineClickData } from './events/indicator-routine-click-data'
import { KeyResultCreateChecklistEventData } from './events/key-result-create-checklist'
import { KeyResultProgressChartViewEventData } from './events/key-result-progress-chart-view'
import { LearnMoreBannerNoticesClickData } from './events/learn-more-banner-notices-click-data'
import { MentionInRoutineAnswerClickData } from './events/mention-in-routine-click-data'
import { MetricTeamRowClickData } from './events/metric-team-row-click-data'
import { MissionControlTaskClickData } from './events/mission-control-task-click.data'
import { NotificationBellData } from './events/notification-bell-data'
import { NotificationCardClickData } from './events/notification-card-click-data'
import { NotificationCheckInClickData } from './events/notification-check-in-click-data'
import { NotificationRoutineClickData } from './events/notification-routine-click-data'
import { NotificationRoutineReminderClickData } from './events/notification-routine-reminder-click-data'
import { OpenedKeyResultChecklistEventData } from './events/opened-key-result-checklist'
import { OpenedKeyResultDrawerEventData } from './events/opened-key-result-drawer'
import { OpenedKeyResultReportConfidanceData } from './events/opened-key-result-report-confidance-data'
import { PageViewEventData } from './events/page-view'
import { PublishOkrClickData } from './events/publish-okr-click-data'
import { RetrospectiveTabClickData } from './events/retrospective-tab-click-data'
import { RoutineAnswerRowClickData } from './events/routine-answer-row-click-data'
import { SendAnswerFormClickData } from './events/send-answer-form-click-data'
import { StartAnswerFormClickData } from './events/start-answer-form-click-data'
import { TabNotificationClickData } from './events/tab-notification-click-data'
import { TabThisWeekClickData } from './events/tab-this-week-click-data'
import { TaskManagerCreateTaskClickData } from './events/task-management-create-task-data'
import { TaskManagerDeleteTaskClickData } from './events/task-management-delete-task-data'
import { TaskManagerUpdateTaskColumnData } from './events/task-management-update-task-column-data'
import { TeamHighlightClickData } from './events/team-highlight-click-data'
import { ToggleRoutineReminderClickData } from './events/toggle-routine-reminder-click-data'
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
  [EventType.CREATED_OBJECTIVE]: CreatedObjectiveData
  [EventType.CREATED_KEY_RESULT]: CreatedKeyResultData
  [EventType.NOTIFICATION_BELL_CLICK]: NotificationBellData
  [EventType.NOTIFICATION_CHECK_IN_CLICK]: NotificationCheckInClickData
  [EventType.NOTIFICATION_CARD_CLICK]: NotificationCardClickData
  [EventType.TAB_THIS_WEEK_CLICK]: TabThisWeekClickData
  [EventType.TAB_NOTIFICATION_CLICK]: TabNotificationClickData
  [EventType.NOTIFICATION_ROUTINE_CLICK]: NotificationRoutineClickData
  [EventType.NOTIFICATION_ROUTINE_REMINDER_CLICK]: NotificationRoutineReminderClickData
  [EventType.START_ANSWER_FORM_CLICK]: StartAnswerFormClickData
  [EventType.SEND_ANSWER_FORM_CLICK]: SendAnswerFormClickData
  [EventType.RETROSPECTIVE_TAB_CLICK]: RetrospectiveTabClickData
  [EventType.CHANGE_TIME_PERIOD_CLICK]: ChangeTimePeriodClickData
  [EventType.ROUTINE_ANSWER_ROW_CLICK]: RoutineAnswerRowClickData
  [EventType.TOGGLE_ROUTINE_REMINDER_CLICK]: ToggleRoutineReminderClickData
  [EventType.ANSWER_NOW_FORM_CLICK]: AnswerNowFormClickData
  [EventType.COMMENT_IN_ROUTINE_ANSWER_CLICK]: CommentInRoutineAnswerClickData
  [EventType.MENTION_IN_ROUTINE_ANSWER_CLICK]: MentionInRoutineAnswerClickData
  [EventType.METRIC_TEAM_ROW_CLICK]: MetricTeamRowClickData
  [EventType.LEARN_MORE_BANNER_NOTICES_CLICK]: LearnMoreBannerNoticesClickData
  [EventType.FEELING_HIGHLIGHT_CLICK]: TeamHighlightClickData
  [EventType.PRODUCTIVITY_HIGHLIGHT_CLICK]: TeamHighlightClickData
  [EventType.ROADBLOCK_HIGHLIGHT_CLICK]: TeamHighlightClickData
  [EventType.CHECKIN_HIGHLIGHT_CLICK]: TeamHighlightClickData
  [EventType.CONFIDENCE_HIGHLIGHT_CLICK]: TeamHighlightClickData
  [EventType.KRMEMBERS_HIGHLIGHT_CLICK]: TeamHighlightClickData
  [EventType.BARRIER_HIGHLIGHT_CLICK]: TeamHighlightClickData
  [EventType.INDICATORS_ACCORDION_BUTTON_CLICK]: IndicatorAccordionButtonClickData
  [EventType.INDICATORS_CHECKLIST_CLICK]: IndicatorCheckListClickData
  [EventType.INDICATORS_PROGRESS_CLICK]: IndicatorProgressClickData
  [EventType.INDICATORS_ROUTINE_CLICK]: IndicatorRoutineClickData
  [EventType.INDICATORS_REPORT_DOWNLOAD_CLICK]: IndicatorReportDownloadClickData
  [EventType.CREATE_DRAFT_OBJECTIVE_CLICK]: CreateDraftObjectiveClickData
  [EventType.CREATE_DRAFT_KEY_RESULT_CLICK]: CreateDraftKeyResultClickData
  [EventType.CREATE_DRAFT_FEEDBACK_CLICK]: CreateDraftFeedbackClickData
  [EventType.CREATE_DRAFT_FEEDBACK_ANSWER_CLICK]: CreateDraftFeedbackAnswerClickData
  [EventType.PUBLISH_OKR_CLICK]: PublishOkrClickData
  [EventType.GENERATE_KEY_RESULT_SUMMARIZE_CLICK]: GenerateKeyResultSummarizeClickData
  [EventType.MISSION_CONTROL_TASK_CLICK]: MissionControlTaskClickData
  [EventType.TASK_MANAGER_CREATE_TASK_CLICK]: TaskManagerCreateTaskClickData
  [EventType.TASK_MANAGER_DELETE_TASK_CLICK]: TaskManagerDeleteTaskClickData
  [EventType.TASK_MANAGER_UPDATE_TASK_COLUMN]: TaskManagerUpdateTaskColumnData
}
