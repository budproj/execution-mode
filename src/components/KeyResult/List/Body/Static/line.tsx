import { Grid, GridProps } from '@chakra-ui/react'
import React from 'react'

import {
  KeyResultListBodyColumnCycle,
  KeyResultListBodyColumnOkr,
  KeyResultListBodyColumnOwner,
  KeyResultListBodyColumnProgress,
  KeyResultListBodyColumnStatus,
  KeyResultListBodyColumnTitle,
} from 'src/components/KeyResult/List/Body/Columns'
import {
  KeyResultListBodyColumn,
  KeyResultListBodyColumnsProperties,
} from 'src/components/KeyResult/List/Body/Columns/types'
import { KeyResult } from 'src/components/KeyResult/types'

export interface KeyResultListBodyStaticLineProperties {
  templateColumns: GridProps['templateColumns']
  borderColor: GridProps['borderColor']
  columns: KeyResultListBodyColumn[]
  columnsProperties: KeyResultListBodyColumnsProperties
  onLineClick?: (id: KeyResult['id']) => void
  keyResultID?: KeyResult['id']
}

const KeyResultListBodyStaticLine = ({
  keyResultID,
  onLineClick,
  templateColumns,
  borderColor,
  columns,
  columnsProperties,
}: KeyResultListBodyStaticLineProperties) => {
  const handleLineClick = () => {
    if (onLineClick && keyResultID) onLineClick(keyResultID)
  }

  const columnComponents = {
    [KeyResultListBodyColumn.TITLE]: KeyResultListBodyColumnTitle,
    [KeyResultListBodyColumn.OKR]: KeyResultListBodyColumnOkr,
    [KeyResultListBodyColumn.STATUS]: KeyResultListBodyColumnStatus,
    [KeyResultListBodyColumn.PROGRESS]: KeyResultListBodyColumnProgress,
    [KeyResultListBodyColumn.CYCLE]: KeyResultListBodyColumnCycle,
    [KeyResultListBodyColumn.OWNER]: KeyResultListBodyColumnOwner,
  }

  return (
    <Grid
      templateColumns={templateColumns}
      border={0}
      borderBottomWidth={1}
      alignItems="center"
      borderColor="transparent"
      borderBottomColor={borderColor}
      borderStyle="solid"
      _hover={onLineClick ? { background: 'blue.50' } : {}}
      cursor={onLineClick ? 'pointer' : 'auto'}
      onClick={handleLineClick}
    >
      {columns.map((column) => {
        const ColumnComponent = columnComponents[column]
        const columnProperties = columnsProperties[column]

        return (
          <ColumnComponent
            key={`KEY_RESULT_LIST_BODY_STATIC_LINE_${
              keyResultID ?? Math.random()
            }_COLUMN_${column}`}
            id={keyResultID}
            borderColor={borderColor}
            {...columnProperties}
          />
        )
      })}
    </Grid>
  )
}

export default KeyResultListBodyStaticLine
