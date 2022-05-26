import { Grid } from '@chakra-ui/react'
import remove from 'lodash/remove'
import uniqueId from 'lodash/uniqueId'
import React from 'react'

import {
  CyclesListBodyColumnCyclesSkeleton,
  CyclesListBodyColumnStatusSkeleton,
  CyclesListBodyColumnDateStartSkeleton,
  CyclesListBodyColumnDateEndSkeleton,
  CyclesListBodyColumnCadenceLevelSkeleton,
  CyclesListBodyColumnActionsSkeleton,
} from 'src/components/Cycle/List/Body/Columns'
import { CYCLE_LIST_COLUMN } from 'src/components/Cycle/List/Body/Columns/constants'
import { Cycle } from 'src/components/Cycle/types'

import { CyclesListBodyStaticProperties } from './static'

export interface CyclesListBodyStaticSkeletonLineProperties extends CyclesListBodyStaticProperties {
  cyclesID?: Cycle['id']
}

const CyclesListBodyStaticSkeletonLine = ({
  listID,
  cyclesID,
  onLineClick,
  borderColor,
  templateColumns,
  columnGap,
  columns,
  bodyProperties,
}: CyclesListBodyStaticSkeletonLineProperties) => {
  const handleLineClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLDivElement
    const actions = remove([
      target.getAttribute('data-action'),
      target.parentElement?.getAttribute('data-action'),
    ])
    const allowLineClick = actions.length === 0

    if (onLineClick && cyclesID && allowLineClick) onLineClick(cyclesID)
  }

  const columnComponents = {
    [CYCLE_LIST_COLUMN.CYCLE]: CyclesListBodyColumnCyclesSkeleton,
    [CYCLE_LIST_COLUMN.STATUS]: CyclesListBodyColumnStatusSkeleton,
    [CYCLE_LIST_COLUMN.CADENCE_LEVEL]: CyclesListBodyColumnCadenceLevelSkeleton,
    [CYCLE_LIST_COLUMN.INITIAL_DATE]: CyclesListBodyColumnDateStartSkeleton,
    [CYCLE_LIST_COLUMN.END_DATE]: CyclesListBodyColumnDateEndSkeleton,
    [CYCLE_LIST_COLUMN.ACTIONS]: CyclesListBodyColumnActionsSkeleton,
  }

  return (
    <Grid
      templateColumns={templateColumns}
      gridColumnGap={columnGap}
      border={0}
      borderBottomWidth={1}
      alignItems="center"
      borderColor="transparent"
      borderBottomColor={borderColor}
      borderStyle="solid"
      cursor={onLineClick ? 'pointer' : 'auto'}
      _hover={onLineClick ? { background: 'black.50' } : {}}
      _last={{
        borderColor: 'transparent',
      }}
      onMouseDown={handleLineClick}
    >
      {columns.map((column) => {
        const ColumnComponent = columnComponents[column]
        const columnProperties = bodyProperties[column]

        return (
          <ColumnComponent
            key={`${listID}_CYCLE_LIST_BODY_LINE_${cyclesID ?? uniqueId()}_COLUMN_${column}`}
            id={cyclesID}
            borderColor={borderColor}
            {...columnProperties}
          />
        )
      })}
    </Grid>
  )
}

export default CyclesListBodyStaticSkeletonLine
