import { FlexboxProps } from '@chakra-ui/react'

import { USERS_TABLE_COLUMN } from '../Body/Columns/constants'

export interface HeadProperties {
  hidden?: boolean
  justifySelf?: FlexboxProps['justifySelf']
}

export interface UsersTableListColumnHeadProperties {
  [USERS_TABLE_COLUMN.NAME]?: HeadProperties
  [USERS_TABLE_COLUMN.TEAMS]?: HeadProperties
  [USERS_TABLE_COLUMN.ROLES]?: HeadProperties
  [USERS_TABLE_COLUMN.STATE]?: HeadProperties
  [USERS_TABLE_COLUMN.ACTIONS]?: HeadProperties
}
