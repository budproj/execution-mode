import { Grid } from '@chakra-ui/react'
import remove from 'lodash/remove'
import uniqueId from 'lodash/uniqueId'
import React from 'react'

import {
  CyclesListBodyColumnCycle,
  CyclesListBodyColumnActions,
  CyclesListBodyColumnCadenceLevel,
  CyclesListBodyColumnInitialDate,
  CyclesListBodyColumnEndDate,
  CyclesListBodyColumnStatus,
} from 'src/components/Cycle/List/Body/Columns'
import { CYCLE_LIST_COLUMN } from 'src/components/Cycle/List/Body/Columns/constants'
import { Cycle } from 'src/components/Cycle/types'

import { CyclesListBodyStaticProperties } from './static'

export interface CyclesListBodyStaticLineProperties extends CyclesListBodyStaticProperties {
  cycleID?: Cycle['id']
}

const CyclesListBodyStaticLine = ({
  listID,
  cycleID,
  onLineClick,
  borderColor,
  templateColumns,
  columnGap,
  columns,
  bodyProperties,
}: CyclesListBodyStaticLineProperties) => {
  const handleLineClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLDivElement
    const actions = remove([
      target.getAttribute('data-action'),
      target.parentElement?.getAttribute('data-action'),
    ])
    const allowLineClick = actions.length === 0

    if (onLineClick && cycleID && allowLineClick) onLineClick(cycleID)
  }

  const columnComponents = {
    [CYCLE_LIST_COLUMN.CYCLE]: CyclesListBodyColumnCycle,
    [CYCLE_LIST_COLUMN.CADENCE_LEVEL]: CyclesListBodyColumnCadenceLevel,
    [CYCLE_LIST_COLUMN.INITIAL_DATE]: CyclesListBodyColumnInitialDate,
    [CYCLE_LIST_COLUMN.END_DATE]: CyclesListBodyColumnEndDate,
    [CYCLE_LIST_COLUMN.ACTIONS]: CyclesListBodyColumnActions,
    [CYCLE_LIST_COLUMN.STATUS]: CyclesListBodyColumnStatus,
  }
  console.log({ columns })

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
      onMouseDown={handleLineClick}
    >
      {columns.map((column) => {
        const ColumnComponent = columnComponents[column]
        const columnProperties = bodyProperties[column]
        console.log({ column })

        return (
          <ColumnComponent
            key={`${listID}_CYCLE_LIST_BODY_LINE_${cycleID ?? uniqueId()}_COLUMN_${column}`}
            status
            id={cycleID}
            borderColor={borderColor}
            {...columnProperties}
          />
        )
      })}
    </Grid>
  )
}

export default CyclesListBodyStaticLine
