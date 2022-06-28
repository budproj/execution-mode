import { Box, GridProps } from '@chakra-ui/react'
import React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { MessageDescriptor } from 'react-intl'

import UsersTableListBodyStatic from 'src/components/User/TableList/Body/Static'

import { User } from '../../types'

import { USERS_TABLE_COLUMN } from './Columns/constants'
import { UsersTableListBodyColumnProperties } from './Columns/types'

export interface UsersTableListBodyProperties {
  listID: string
  columns: USERS_TABLE_COLUMN[]
  usersIds: Array<User['id']>
  canEdit: boolean
  templateColumns: GridProps['templateColumns']
  columnGap: GridProps['gridColumnGap']
  borderColor: GridProps['borderColor']
  bodyProperties: UsersTableListBodyColumnProperties
  emptyStateMessage?: MessageDescriptor
  onLineClick?: (id: User['id']) => void
  handleDragEnd?: (result: DropResult) => void
}

const UsersTableListBody = ({ usersIds, ...rest }: UsersTableListBodyProperties) => {
  return usersIds ? <UsersTableListBodyStatic usersIds={usersIds} {...rest} /> : <Box />
}

export default UsersTableListBody
