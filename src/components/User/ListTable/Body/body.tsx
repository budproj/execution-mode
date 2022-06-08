import { Box, GridProps } from '@chakra-ui/react'
import React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { MessageDescriptor } from 'react-intl'

import UsersTableListBodyStatic from 'src/components/User/ListTable/Body/Static'
import { Cycle } from 'src/components/Cycle/types'
import { User } from '../../types'

import { USERS_TABLE_COLUMN } from './Columns/constants'
import { CyclesListBodyColumnProperties } from './Columns/types'

export interface CyclesListBodyProperties {
  listID: string
  columns: USERS_TABLE_COLUMN[]
  templateColumns: GridProps['templateColumns']
  columnGap: GridProps['gridColumnGap']
  borderColor: GridProps['borderColor']
  bodyProperties: CyclesListBodyColumnProperties
  emptyStateMessage?: MessageDescriptor
  usersIDs?: Array<User['id']>
  onLineClick?: (id: Cycle['id']) => void
  handleDragEnd?: (result: DropResult) => void
}

const UsersTableListBody = ({ usersIDs, ...rest }: CyclesListBodyProperties) => {
  return usersIDs ? <UsersTableListBodyStatic cyclesIDs={usersIDs} {...rest} /> : <Box />
}

export default UsersTableListBody
