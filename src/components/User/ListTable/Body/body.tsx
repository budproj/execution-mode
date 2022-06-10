import { Box, GridProps } from '@chakra-ui/react'
import React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { MessageDescriptor } from 'react-intl'

import UsersTableListBodyStatic from 'src/components/User/ListTable/Body/Static'

import { User } from '../../types'
import { userInfo } from '../list'

import { USERS_TABLE_COLUMN } from './Columns/constants'
import { UsersTableListBodyColumnProperties } from './Columns/types'

export interface UsersTableListBodyProperties {
  listID: string
  columns: USERS_TABLE_COLUMN[]
  usersInfo: userInfo[]
  templateColumns: GridProps['templateColumns']
  columnGap: GridProps['gridColumnGap']
  borderColor: GridProps['borderColor']
  bodyProperties: UsersTableListBodyColumnProperties
  emptyStateMessage?: MessageDescriptor
  onLineClick?: (id: User['id']) => void
  handleDragEnd?: (result: DropResult) => void
}

const UsersTableListBody = ({ usersInfo, ...rest }: UsersTableListBodyProperties) => {
  return usersInfo ? <UsersTableListBodyStatic usersInfo={usersInfo} {...rest} /> : <Box />
}

export default UsersTableListBody
