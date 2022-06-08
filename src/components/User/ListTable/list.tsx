import { Box, BoxProps, GridProps } from '@chakra-ui/react'
import uniqueId from 'lodash/uniqueId'
import React, { ReactElement } from 'react'

import { CyclesListBodyColumnProperties } from 'src/components/Cycle/List/Body/Columns/types'
import { Cycle } from 'src/components/Cycle/types'

import { User } from '../types'

import CycleListBody from './Body'
import { USERS_TABLE_COLUMN } from './Body/Columns/constants'
import CycleListBodySkeleton from './Body/Skeleton'
import CycleListHead from './Head'
import { CycleListColumnHeadProperties } from './Head/types'
import {
  BORDER_COLOR_DEFAULT,
  COLUMNS_DEFAULT,
  GRID_COLUMN_GAP,
  GRID_TEMPLATE_COLUMNS,
} from './constants'
import UsersTableListHead from './Head/head'

export interface CycleListProperties extends BoxProps {
  id: string
  columns: USERS_TABLE_COLUMN[]
  bodyProperties: CyclesListBodyColumnProperties
  headProperties: CycleListColumnHeadProperties
  borderColor: GridProps['borderColor']
  templateColumns: GridProps['templateColumns']
  columnGap: GridProps['gridColumnGap']
  usersIDs?: Array<User['id']>
  onLineClick?: (id: Cycle['id']) => void
  isLoading?: boolean
}

const UsersTableList = ({
  id,
  usersIDs,
  onLineClick,
  borderColor,
  columns,
  bodyProperties,
  headProperties,
  templateColumns,
  columnGap,
  isLoading,
  ...rest
}: CycleListProperties): ReactElement => (
  <Box {...rest}>
    <UsersTableListHead
      columns={columns}
      templateColumns={templateColumns}
      columnGap={columnGap}
      headProperties={headProperties}
      borderColor={borderColor}
    />
    {isLoading ? (
      <CycleListBodySkeleton
        listID={id}
        templateColumns={templateColumns}
        columnGap={columnGap}
        columns={columns}
        borderColor={borderColor}
        bodyProperties={bodyProperties}
        cyclesIDs={[]}
      />
    ) : (
      <CycleListBody
        listID={id}
        columns={columns}
        templateColumns={templateColumns}
        columnGap={columnGap}
        bodyProperties={bodyProperties}
        borderColor={borderColor}
        usersIDs={usersIDs}
        onLineClick={onLineClick}
      />
    )}
  </Box>
)

CycleList.defaultProps = {
  borderColor: BORDER_COLOR_DEFAULT,
  templateColumns: GRID_TEMPLATE_COLUMNS,
  columnGap: GRID_COLUMN_GAP,
  columns: COLUMNS_DEFAULT,
  bodyProperties: {},
  headProperties: {},
  id: uniqueId(),
}

export default UsersTableList
