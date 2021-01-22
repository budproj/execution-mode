import { KEY_RESULT_LIST_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'

export const BORDER_COLOR_DEFAULT = 'gray.100'
export const GRID_TEMPLATE_COLUMNS =
  'minmax(0, 5fr) minmax(0, 4fr) minmax(0, 4fr) minmax(0, 3fr) minmax(0, 3fr) minmax(0, 1.5fr)'
export const GRID_COLUMN_GAP = 6

export const COLUMNS_DEFAULT = [
  KEY_RESULT_LIST_COLUMN.KEY_RESULT,
  KEY_RESULT_LIST_COLUMN.OBJECTIVE,
  KEY_RESULT_LIST_COLUMN.CONFIDENCE_LEVEL,
  KEY_RESULT_LIST_COLUMN.PROGRESS,
  KEY_RESULT_LIST_COLUMN.CYCLE,
  KEY_RESULT_LIST_COLUMN.OWNER,
]

export enum KEY_RESULT_LIST_TYPE {
  DND = 'dragAndDrop',
  STATIC = 'static',
}
