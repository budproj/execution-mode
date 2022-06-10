import { Box, BoxProps, GridProps } from '@chakra-ui/react'
import uniqueId from 'lodash/uniqueId'
import React, { ReactElement } from 'react'

import { UsersTableListBodyColumnProperties } from 'src/components/User/TableList/Body/Columns/types'

import { User } from '../types'

import { USERS_TABLE_COLUMN } from './Body/Columns/constants'
import UsersTableListBodySkeleton from './Body/Skeleton/body'
import UsersTableListBody from './Body/body'
import UsersTableListHead from './Head/head'
import { UsersTableListColumnHeadProperties } from './Head/types'
import {
  BORDER_COLOR_DEFAULT,
  COLUMNS_DEFAULT,
  GRID_COLUMN_GAP,
  GRID_TEMPLATE_COLUMNS,
} from './constants'

export type userInfo = {
  id: User['id']
  isActive?: boolean
}

export interface UsersTableListProperties extends BoxProps {
  id: string
  columns: USERS_TABLE_COLUMN[]
  bodyProperties: UsersTableListBodyColumnProperties
  headProperties: UsersTableListColumnHeadProperties
  borderColor: GridProps['borderColor']
  templateColumns: GridProps['templateColumns']
  columnGap: GridProps['gridColumnGap']
  usersInfo: userInfo[]
  onLineClick?: (id: User['id']) => void
  isLoading?: boolean
}

const UsersTableList = ({
  id,
  onLineClick,
  borderColor,
  columns,
  bodyProperties,
  headProperties,
  templateColumns,
  columnGap,
  usersInfo,
  isLoading,
  ...rest
}: UsersTableListProperties): ReactElement => (
  <Box {...rest}>
    <UsersTableListHead
      columns={columns}
      templateColumns={templateColumns}
      columnGap={columnGap}
      headProperties={headProperties}
      borderColor={borderColor}
    />
    {isLoading ? (
      <UsersTableListBodySkeleton
        listID={id}
        templateColumns={templateColumns}
        columnGap={columnGap}
        columns={columns}
        borderColor={borderColor}
        bodyProperties={bodyProperties}
        usersInfo={usersInfo}
      />
    ) : (
      <UsersTableListBody
        listID={id}
        columns={columns}
        templateColumns={templateColumns}
        columnGap={columnGap}
        bodyProperties={bodyProperties}
        borderColor={borderColor}
        usersInfo={usersInfo}
        onLineClick={onLineClick}
      />
    )}
  </Box>
)

UsersTableList.defaultProps = {
  borderColor: BORDER_COLOR_DEFAULT,
  templateColumns: GRID_TEMPLATE_COLUMNS,
  columnGap: GRID_COLUMN_GAP,
  columns: COLUMNS_DEFAULT,
  bodyProperties: {},
  headProperties: {},
  id: uniqueId(),
}

export default UsersTableList
