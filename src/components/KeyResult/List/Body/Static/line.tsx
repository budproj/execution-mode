import { Grid, GridProps } from '@chakra-ui/react'
import uniqueId from 'lodash/uniqueId'
import React from 'react'

import {
  KeyResultListBodyColumnCycle,
  KeyResultListBodyColumnOkr,
  KeyResultListBodyColumnOwner,
  KeyResultListBodyColumnProgress,
  KeyResultListBodyColumnStatus,
  KeyResultListBodyColumnStatusColor,
  KeyResultListBodyColumnTitle,
} from 'src/components/KeyResult/List/Body/Columns'
import { KEY_RESULT_LIST_BODY_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'
import { KeyResultListBodyProperties } from 'src/components/KeyResult/List/Body/Columns/types'
import { KeyResult } from 'src/components/KeyResult/types'

export interface KeyResultListBodyStaticLineProperties {
  listID: string
  templateColumns: GridProps['templateColumns']
  borderColor: GridProps['borderColor']
  columns: KEY_RESULT_LIST_BODY_COLUMN[]
  bodyProperties: KeyResultListBodyProperties
  onLineClick?: (id: KeyResult['id']) => void
  keyResultID?: KeyResult['id']
}

const KeyResultListBodyStaticLine = ({
  listID,
  keyResultID,
  onLineClick,
  templateColumns,
  borderColor,
  columns,
  bodyProperties,
}: KeyResultListBodyStaticLineProperties) => {
  const handleLineClick = () => {
    if (onLineClick && keyResultID) onLineClick(keyResultID)
  }

  const columnComponents = {
    [KEY_RESULT_LIST_BODY_COLUMN.KEY_RESULT]: KeyResultListBodyColumnTitle,
    [KEY_RESULT_LIST_BODY_COLUMN.OBJECTIVE]: KeyResultListBodyColumnOkr,
    [KEY_RESULT_LIST_BODY_COLUMN.CONFIDENCE_LEVEL]: KeyResultListBodyColumnStatus,
    [KEY_RESULT_LIST_BODY_COLUMN.PROGRESS]: KeyResultListBodyColumnProgress,
    [KEY_RESULT_LIST_BODY_COLUMN.CYCLE]: KeyResultListBodyColumnCycle,
    [KEY_RESULT_LIST_BODY_COLUMN.OWNER]: KeyResultListBodyColumnOwner,
    [KEY_RESULT_LIST_BODY_COLUMN.CONFIDENCE_LEVEL_COLOR]: KeyResultListBodyColumnStatusColor,
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
      cursor={onLineClick ? 'pointer' : 'auto'}
      _hover={onLineClick ? { background: 'blue.50' } : {}}
      onClick={handleLineClick}
    >
      {columns.map((column) => {
        const ColumnComponent = columnComponents[column]
        const columnProperties = bodyProperties[column]

        return (
          <ColumnComponent
            key={`${listID}_KEY_RESULT_LIST_BODY_LINE_${
              keyResultID ?? uniqueId()
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
