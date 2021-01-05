import { KeyResultListBodyColumnCycleProperties } from './Cycle/cycle'
import { KeyResultListBodyColumnOKRProperties } from './Okr/okr'
import { KeyResultListBodyColumnOwnerProperties } from './Owner/owner'
import { KeyResultListBodyColumnProgressProperties } from './Progress/progress'
import { KeyResultListBodyColumnStatusProperties } from './Status/status'
import { KeyResultListBodyColumnStatusColorProperties } from './StatusColor/status-color'
import { KeyResultListBodyColumnTitleProperties } from './Title/title'
import { KEY_RESULT_LIST_BODY_COLUMN } from './constants'

export interface KeyResultListBodyProperties {
  [KEY_RESULT_LIST_BODY_COLUMN.KEY_RESULT]?: KeyResultListBodyColumnTitleProperties
  [KEY_RESULT_LIST_BODY_COLUMN.OBJECTIVE]?: KeyResultListBodyColumnOKRProperties
  [KEY_RESULT_LIST_BODY_COLUMN.CONFIDENCE_LEVEL]?: KeyResultListBodyColumnStatusProperties
  [KEY_RESULT_LIST_BODY_COLUMN.PROGRESS]?: KeyResultListBodyColumnProgressProperties
  [KEY_RESULT_LIST_BODY_COLUMN.CYCLE]?: KeyResultListBodyColumnCycleProperties
  [KEY_RESULT_LIST_BODY_COLUMN.OWNER]?: KeyResultListBodyColumnOwnerProperties
  [KEY_RESULT_LIST_BODY_COLUMN.CONFIDENCE_LEVEL_COLOR]?: KeyResultListBodyColumnStatusColorProperties
}
