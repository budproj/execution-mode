import { CYCLE_LIST_COLUMN } from 'src/components/Cycle/List/Body/Columns/constants'

export const BORDER_COLOR_DEFAULT = 'black.200'
export const GRID_TEMPLATE_COLUMNS =
  'minmax(0, 3fr) minmax(0, 3fr) minmax(0, 3fr) minmax(0,3fr) minmax(0,3fr) minmax(0, 2fr)'
export const GRID_COLUMN_GAP = 45

export const COLUMNS_DEFAULT = [
  CYCLE_LIST_COLUMN.CYCLE,
  CYCLE_LIST_COLUMN.CADENCE_LEVEL,
  CYCLE_LIST_COLUMN.INITIAL_DATE,
  CYCLE_LIST_COLUMN.END_DATE,
  CYCLE_LIST_COLUMN.STATUS,
  CYCLE_LIST_COLUMN.ACTIONS,
]
