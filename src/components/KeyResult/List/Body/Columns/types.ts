import { KeyResultListBodyColumnCycleProperties } from './Cycle/cycle'
import { KeyResultListBodyColumnOKRProperties } from './Okr/okr'
import { KeyResultListBodyColumnOwnerProperties } from './Owner/owner'
import { KeyResultListBodyColumnProgressProperties } from './Progress/progress'
import { KeyResultListBodyColumnStatusProperties } from './Status/status'
import { KeyResultListBodyColumnStatusColorProperties } from './StatusColor/status-color'
import { KeyResultListBodyColumnTitleProperties } from './Title/title'

export enum KeyResultListBodyColumn {
  TITLE = 'title',
  OKR = 'okr',
  STATUS = 'status',
  PROGRESS = 'progress',
  CYCLE = 'cycle',
  OWNER = 'owner',
  STATUS_COLOR = 'status-color',
}

export interface KeyResultListBodyProperties {
  [KeyResultListBodyColumn.TITLE]?: KeyResultListBodyColumnTitleProperties
  [KeyResultListBodyColumn.OKR]?: KeyResultListBodyColumnOKRProperties
  [KeyResultListBodyColumn.STATUS]?: KeyResultListBodyColumnStatusProperties
  [KeyResultListBodyColumn.PROGRESS]?: KeyResultListBodyColumnProgressProperties
  [KeyResultListBodyColumn.CYCLE]?: KeyResultListBodyColumnCycleProperties
  [KeyResultListBodyColumn.OWNER]?: KeyResultListBodyColumnOwnerProperties
  [KeyResultListBodyColumn.STATUS_COLOR]?: KeyResultListBodyColumnStatusColorProperties
}
