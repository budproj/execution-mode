import { Grid } from '@chakra-ui/react'
import uniqueId from 'lodash/uniqueId'
import React from 'react'

import {
  CyclesListBodyColumnCycle,
  CyclesListBodyColumnActions,
  CyclesListBodyColumnCadenceLevel,
  CyclesListBodyColumnDateStart,
  CyclesListBodyColumnEndDate,
} from 'src/components/Cycle/List/Body/Columns'
import { User } from 'src/components/User/types'

import { USERS_TABLE_COLUMN } from '../Columns/constants'

import { CyclesListBodyStaticProperties } from './static'

export interface CyclesListBodyStaticLineProperties extends CyclesListBodyStaticProperties {
  userID: User['id']
}

const CyclesListBodyStaticLine = ({
  listID,
  userID,
  borderColor,
  templateColumns,
  columnGap,
  columns,
  bodyProperties,
}: CyclesListBodyStaticLineProperties) => {
  const columnComponents = {
    [USERS_TABLE_COLUMN.NAME]: CyclesListBodyColumnCycle,
    [USERS_TABLE_COLUMN.TEAMS]: CyclesListBodyColumnCadenceLevel,
    [USERS_TABLE_COLUMN.ROLES]: CyclesListBodyColumnDateStart,
    [USERS_TABLE_COLUMN.STATE]: CyclesListBodyColumnEndDate,
    [USERS_TABLE_COLUMN.ACTIONS]: CyclesListBodyColumnActions,
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
            key={`${listID}_CYCLE_LIST_BODY_LINE_${userID ?? uniqueId()}_COLUMN_${column}`}
            id={userID}
            borderColor={borderColor}
            {...columnProperties}
          />
        )
      })}
    </Grid>
  )
}

export default CyclesListBodyStaticLine
