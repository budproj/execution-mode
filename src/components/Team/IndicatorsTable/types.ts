import { UserChecklistProgressProperties } from './Columns/key-results-checklists'
import { KeyResultsOverviewColumnProperties } from './Columns/key-results-overview'
import { LastAccessColumnProperties } from './Columns/last-access'
import { LastRetrospectiveAnswerColumnProperties } from './Columns/last-retrospective-answer'

export type TeamIndicators = {
  userKeyResultsOverview: KeyResultsOverviewColumnProperties
  lastAccess: LastAccessColumnProperties
  checklist: UserChecklistProgressProperties
  lastRetrospectiveAnswer: LastRetrospectiveAnswerColumnProperties
}
