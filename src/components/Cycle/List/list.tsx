import { Box, BoxProps, GridProps } from '@chakra-ui/react'
import uniqueId from 'lodash/uniqueId'
import React, { ReactElement } from 'react'
import { DropResult } from 'react-beautiful-dnd'

import { CYCLE_LIST_COLUMN } from 'src/components/Cycle/List/Body/Columns/constants'
import { CyclesListBodyColumnProperties } from 'src/components/Cycle/List/Body/Columns/types'
import { Cycle } from 'src/components/Cycle/types'

import CycleListBody from './Body'
import CycleListBodySkeleton from './Body/Skeleton'
import CycleListHead from './Head'
import { CycleListColumnHeadProperties } from './Head/types'
import {
  BORDER_COLOR_DEFAULT,
  COLUMNS_DEFAULT,
  GRID_COLUMN_GAP,
  GRID_TEMPLATE_COLUMNS,
  CYCLE_LIST_TYPE,
} from './constants'

export interface CycleListProperties extends BoxProps {
  id: string
  columns: CYCLE_LIST_COLUMN[]
  bodyProperties: CyclesListBodyColumnProperties
  headProperties: CycleListColumnHeadProperties
  borderColor: GridProps['borderColor']
  type: CYCLE_LIST_TYPE
  templateColumns: GridProps['templateColumns']
  columnGap: GridProps['gridColumnGap']
  cycleIDs?: Array<Cycle['id']>
  onLineClick?: (id: Cycle['id']) => void
  onLineDragEnd?: (result: DropResult) => void
  isLoading?: boolean
}

const CycleList = ({
  id,
  cycleIDs,
  onLineClick,
  onLineDragEnd,
  type,
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
    <CycleListHead
      columns={columns}
      templateColumns={templateColumns}
      columnGap={columnGap}
      headProperties={headProperties}
      borderColor={borderColor}
    />
    {isLoading ? (
      <CycleListBodySkeleton
        listID={id}
        type={type}
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
        type={type}
        columns={columns}
        templateColumns={templateColumns}
        columnGap={columnGap}
        bodyProperties={bodyProperties}
        borderColor={borderColor}
        cyclesIDs={cycleIDs}
        handleDragEnd={onLineDragEnd}
        onLineClick={onLineClick}
      />
    )}
  </Box>
)

CycleList.defaultProps = {
  type: 'static',
  borderColor: BORDER_COLOR_DEFAULT,
  templateColumns: GRID_TEMPLATE_COLUMNS,
  columnGap: GRID_COLUMN_GAP,
  columns: COLUMNS_DEFAULT,
  bodyProperties: {},
  headProperties: {},
  id: uniqueId(),
}

export default CycleList
