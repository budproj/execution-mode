import { Grid } from '@chakra-ui/react'
import uniqueId from 'lodash/uniqueId'
import React from 'react'

import {
  CyclesListBodyColumnCycle,
  CyclesListBodyColumnActions,
  CyclesListBodyColumnCadenceLevel,
  CyclesListBodyColumnDateStart,
  CyclesListBodyColumnEndDate,
  CyclesListBodyColumnStatus,
} from 'src/components/Cycle/List/Body/Columns'
import { CYCLE_LIST_COLUMN } from 'src/components/Cycle/List/Body/Columns/constants'
import { Cycle } from 'src/components/Cycle/types'

import { CyclesListBodyStaticProperties } from './static'

export interface CyclesListBodyStaticLineProperties extends CyclesListBodyStaticProperties {
  cycleID: Cycle['id']
}

const CyclesListBodyStaticLine = ({
  listID,
  cycleID,
  borderColor,
  templateColumns,
  columnGap,
  columns,
  bodyProperties,
}: CyclesListBodyStaticLineProperties) => {
  const columnComponents = {
    [CYCLE_LIST_COLUMN.CYCLE]: CyclesListBodyColumnCycle,
    [CYCLE_LIST_COLUMN.CADENCE_LEVEL]: CyclesListBodyColumnCadenceLevel,
    [CYCLE_LIST_COLUMN.INITIAL_DATE]: CyclesListBodyColumnDateStart,
    [CYCLE_LIST_COLUMN.END_DATE]: CyclesListBodyColumnEndDate,
    [CYCLE_LIST_COLUMN.ACTIONS]: CyclesListBodyColumnActions,
    [CYCLE_LIST_COLUMN.STATUS]: CyclesListBodyColumnStatus,
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
    >
      {columns.map((column) => {
        const ColumnComponent = columnComponents[column]
        const columnProperties = bodyProperties[column]

        return (
          <ColumnComponent
            key={`${listID}_CYCLE_LIST_BODY_LINE_${cycleID ?? uniqueId()}_COLUMN_${column}`}
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
