import { EventType } from './event-type'
import { AnswerNowFormClickData } from './events/answer-now-form-click-data'
import { ArchiveColumnTask } from './events/archive-column-task.data'
import { ArchiveTaskData } from './events/archive-task.data'
import { ArchivedTasksButtonClick } from './events/archived-tasks-button-click.data'
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
import { DeleteColumnTask } from './events/delete-column-task.data'
import { DeleteTaskData } from './events/delete-task.data'
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
import { MainMenuTabsMyThingsClickData } from './events/main-menu-tabs-my-things-click.data'
import { MainMenuTabsPanelClickData } from './events/main-menu-tabs-panel-click.data'
import { MainMenuTabsTeamsClickData } from './events/main-menu-tabs-teams-click.data'
import { MegaMenuClickData } from './events/mega-menu-click.data'
import { MentionInRoutineAnswerClickData } from './events/mention-in-routine-click-data'
import { MetricTeamRowClickData } from './events/metric-team-row-click-data'
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
import { RankingClickData } from './events/ranking-click.data'
import { RetrospectiveTabClickData } from './events/retrospective-tab-click-data'
import { RoutineAnswerRowClickData } from './events/routine-answer-row-click-data'
import { SendAnswerFormClickData } from './events/send-answer-form-click-data'
import { StartAnswerFormClickData } from './events/start-answer-form-click-data'
import { TabNotificationClickData } from './events/tab-notification-click-data'
import { TabThisWeekClickData } from './events/tab-this-week-click-data'
import { TaskManagerCreateCommentData } from './events/task-management-create-comment-data'
import { TaskManagerCreateTaskClickData } from './events/task-management-create-task-data'
import { TaskManagerDeleteTaskClickData } from './events/task-management-delete-task-data'
import { TaskManagerUpdateTaskColumnData } from './events/task-management-update-task-column-data'
import { TaskManagerTabClickData } from './events/task-manager-tab-click.data'
import { TeamHighlightClickData } from './events/team-highlight-click-data'
import { ToggleRoutineReminderClickData } from './events/toggle-routine-reminder-click-data'
import { ToggledKeyResultCheckMarkEventData } from './events/toggled-key-result-check-mark'
import { ToggledPersonalTaskEventData } from './events/toggled-personal-task'
import { UnarchiveTaskData } from './events/unarchive-task.data'
import { UnarchivedTasksButtonClick } from './events/unarchived-tasks-button-click.data'
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
  [EventType.TASK_MANAGER_CREATE_TASK_CLICK]: TaskManagerCreateTaskClickData
  [EventType.TASK_MANAGER_DELETE_TASK_CLICK]: TaskManagerDeleteTaskClickData
  [EventType.TASK_MANAGER_UPDATE_TASK_COLUMN]: TaskManagerUpdateTaskColumnData
  [EventType.TASK_MANAGER_CREATE_COMMENT_CLICK]: TaskManagerCreateCommentData
  [EventType.TASK_MANAGER_TAB_CLICK]: TaskManagerTabClickData
  [EventType.RANKING_CLICK]: RankingClickData
  [EventType.MEGA_MENU_CLICK]: MegaMenuClickData
  [EventType.MAIN_MENU_TABS_PANEL_CLICK]: MainMenuTabsPanelClickData
  [EventType.MAIN_MENU_TABS_MY_THINGS_CLICK]: MainMenuTabsMyThingsClickData
  [EventType.MAIN_MENU_TABS_TEAMS_CLICK]: MainMenuTabsTeamsClickData
  [EventType.ARCHIVE_TASK]: ArchiveTaskData
  [EventType.UNARCHIVE_TASK]: UnarchiveTaskData
  [EventType.DELETE_TASK]: DeleteTaskData
  [EventType.ARCHIVED_TASKS_BUTTON_CLICK]: ArchivedTasksButtonClick
  [EventType.UNARCHIVED_TASKS_BUTTON_CLICK]: UnarchivedTasksButtonClick
  [EventType.ARCHIVE_COLUMN_TASK]: ArchiveColumnTask
  [EventType.DELETE_COLUMN_TASK]: DeleteColumnTask
}
