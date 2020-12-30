import { KEY_RESULT_LIST_BODY_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'

export interface HeadProperties {
  hidden?: boolean
}

export interface KeyResultListColumnHeadProperties {
  [KEY_RESULT_LIST_BODY_COLUMN.TITLE]?: HeadProperties
  [KEY_RESULT_LIST_BODY_COLUMN.OKR]?: HeadProperties
  [KEY_RESULT_LIST_BODY_COLUMN.STATUS]?: HeadProperties
  [KEY_RESULT_LIST_BODY_COLUMN.PROGRESS]?: HeadProperties
  [KEY_RESULT_LIST_BODY_COLUMN.CYCLE]?: HeadProperties
  [KEY_RESULT_LIST_BODY_COLUMN.OWNER]?: HeadProperties
  [KEY_RESULT_LIST_BODY_COLUMN.STATUS_COLOR]?: HeadProperties
}
