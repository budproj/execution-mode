import { RoutinesHighlightsTableCustomColumnProperties } from './Columns/Custom'
import { RoutinesHighlightsTableLastAccessColumnProperties } from './Columns/LastAccess'
import { RoutinesHighlightsTableLastRetrospectiveAnswerColumnProperties } from './Columns/LastRetrospectiveAnswer'
import { RoutinesHighlightsTableTeamColumnProperties } from './Columns/Team'
import { RoutinesHighlightsTableUserColumnProperties } from './Columns/User'

export type RoutineHightlightsTable = {
  user: RoutinesHighlightsTableUserColumnProperties
  team: RoutinesHighlightsTableTeamColumnProperties
  custom: RoutinesHighlightsTableCustomColumnProperties
  lastRetrospective: RoutinesHighlightsTableLastRetrospectiveAnswerColumnProperties
  lastAccess: RoutinesHighlightsTableLastAccessColumnProperties
}
