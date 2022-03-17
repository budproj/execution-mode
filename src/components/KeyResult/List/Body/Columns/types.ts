import { KeyResultListBodyColumnActionsProperties } from './Actions/actions'
import { KeyResultListBodyColumnConfidenceLevelProperties } from './ConfidenceLevel/confidence-level'
import { KeyResultListBodyColumnConfidenceLevelColorProperties } from './ConfidenceLevelColor/confidence-level-color'
import { KeyResultListBodyColumnCycleProperties } from './Cycle/cycle'
import { KeyResultListBodyColumnKeyResultProperties } from './KeyResult/key-result'
import { KeyResultListBodyColumnObjectiveProperties } from './Objective/objective'
import { KeyResultListBodyColumnOwnerProperties } from './Owner/owner'
import { KeyResultListBodyColumnProgressProperties } from './Progress/progress'
import { KEY_RESULT_LIST_COLUMN } from './constants'

export interface KeyResultListBodyColumnProperties {
  [KEY_RESULT_LIST_COLUMN.KEY_RESULT]?: KeyResultListBodyColumnKeyResultProperties
  [KEY_RESULT_LIST_COLUMN.OBJECTIVE]?: KeyResultListBodyColumnObjectiveProperties
  [KEY_RESULT_LIST_COLUMN.CONFIDENCE_LEVEL]?: KeyResultListBodyColumnConfidenceLevelProperties
  [KEY_RESULT_LIST_COLUMN.PROGRESS]?: KeyResultListBodyColumnProgressProperties
  [KEY_RESULT_LIST_COLUMN.CYCLE]?: KeyResultListBodyColumnCycleProperties
  [KEY_RESULT_LIST_COLUMN.OWNER]?: KeyResultListBodyColumnOwnerProperties
  [KEY_RESULT_LIST_COLUMN.CONFIDENCE_LEVEL_COLOR]?: KeyResultListBodyColumnConfidenceLevelColorProperties
  [KEY_RESULT_LIST_COLUMN.ACTIONS]?: KeyResultListBodyColumnActionsProperties
}
