import { UserCheckinOccurrencesProperties } from './Columns/key-results-checkins'
import { UserChecklistProgressProperties } from './Columns/key-results-checklists'
import { KeyResultsOverviewColumnProperties } from './Columns/key-results-overview'
import { LastAccessColumnProperties } from './Columns/last-access'
import { LastRetrospectiveAnswerColumnProperties } from './Columns/last-retrospective-answer'

export type TeamIndicators = {
  userKeyResultsOverview: KeyResultsOverviewColumnProperties
  lastAccess: LastAccessColumnProperties
  checkin: UserCheckinOccurrencesProperties
  checklist: UserChecklistProgressProperties
  lastRetrospectiveAnswer: LastRetrospectiveAnswerColumnProperties
}
