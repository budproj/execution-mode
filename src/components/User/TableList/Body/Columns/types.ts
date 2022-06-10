import { UsersTableListBodyColumnActionsProperties } from './Actions/actions'
import { UsersTableListBodyColumnNameProperties } from './Name/name'
import { UsersTableListBodyColumnRoleProperties } from './Role/role'
import { UsersTableListBodyColumnStateProperties } from './State/state'
import { UsersTableListBodyColumnTeamsProperties } from './Teams/teams'
import { USERS_TABLE_COLUMN } from './constants'

export interface UsersTableListBodyColumnProperties {
  [USERS_TABLE_COLUMN.NAME]?: UsersTableListBodyColumnNameProperties
  [USERS_TABLE_COLUMN.TEAMS]?: UsersTableListBodyColumnTeamsProperties
  [USERS_TABLE_COLUMN.ROLES]?: UsersTableListBodyColumnRoleProperties
  [USERS_TABLE_COLUMN.STATE]?: UsersTableListBodyColumnStateProperties
  [USERS_TABLE_COLUMN.ACTIONS]?: UsersTableListBodyColumnActionsProperties
}
