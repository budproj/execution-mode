import { KeyResultListBodyColumn } from 'src/components/KeyResult/List/Body/Columns/types'

export interface HeadProperties {
  hidden?: boolean
}

export interface KeyResultListColumnHeadProperties {
  [KeyResultListBodyColumn.TITLE]?: HeadProperties
  [KeyResultListBodyColumn.OKR]?: HeadProperties
  [KeyResultListBodyColumn.STATUS]?: HeadProperties
  [KeyResultListBodyColumn.PROGRESS]?: HeadProperties
  [KeyResultListBodyColumn.CYCLE]?: HeadProperties
  [KeyResultListBodyColumn.OWNER]?: HeadProperties
  [KeyResultListBodyColumn.STATUS_COLOR]?: HeadProperties
}
