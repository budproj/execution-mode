import { KeyResultListBodyColumnCycleProperties } from './Cycle/cycle'
import { KeyResultListBodyColumnOKRProperties } from './Okr/okr'
import { KeyResultListBodyColumnOwnerProperties } from './Owner/owner'
import { KeyResultListBodyColumnProgressProperties } from './Progress/progress'
import { KeyResultListBodyColumnStatusProperties } from './Status'
import { KeyResultListBodyColumnTitleProperties } from './Title/title'

export enum KeyResultListBodyColumn {
  TITLE = 'title',
  OKR = 'okr',
  STATUS = 'status',
  PROGRESS = 'progress',
  CYCLE = 'cycle',
  OWNER = 'owner',
}

export interface KeyResultListBodyColumnsProperties {
  [KeyResultListBodyColumn.TITLE]?: KeyResultListBodyColumnTitleProperties
  [KeyResultListBodyColumn.OKR]?: KeyResultListBodyColumnOKRProperties
  [KeyResultListBodyColumn.STATUS]?: KeyResultListBodyColumnStatusProperties
  [KeyResultListBodyColumn.PROGRESS]?: KeyResultListBodyColumnProgressProperties
  [KeyResultListBodyColumn.CYCLE]?: KeyResultListBodyColumnCycleProperties
  [KeyResultListBodyColumn.OWNER]?: KeyResultListBodyColumnOwnerProperties
}
