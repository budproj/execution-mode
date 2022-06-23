import { USERS_TABLE_COLUMN } from 'src/components/User/TableList/Body/Columns/constants'

export const BORDER_COLOR_DEFAULT = 'black.200'
export const GRID_TEMPLATE_COLUMNS =
  'minmax(0, 6fr) minmax(0, 4fr) minmax(0, 4fr) minmax(0, 3fr) minmax(0, 2fr)'
export const GRID_COLUMN_GAP = 45

export const COLUMNS_DEFAULT = [
  USERS_TABLE_COLUMN.NAME,
  USERS_TABLE_COLUMN.TEAMS,
  USERS_TABLE_COLUMN.ROLES,
  USERS_TABLE_COLUMN.STATE,
  USERS_TABLE_COLUMN.ACTIONS,
]

export enum USER_ROLES {
  DEFAULT = 'DEFAULT',
  EDITION = 'EDITION',
  ADMIN = 'ADMIN',
}
