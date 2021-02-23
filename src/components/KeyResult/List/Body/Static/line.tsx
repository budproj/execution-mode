import { Grid } from '@chakra-ui/react'
import remove from 'lodash/remove'
import uniqueId from 'lodash/uniqueId'
import React from 'react'

import {
  KeyResultListBodyColumnCycle,
  KeyResultListBodyColumnObjective,
  KeyResultListBodyColumnOwner,
  KeyResultListBodyColumnProgress,
  KeyResultListBodyColumnConfidenceLevel,
  KeyResultListBodyColumnConfidenceLevelColor,
  KeyResultListBodyColumnKeyResult,
  KeyResultListBodyColumnPercentualProgress,
} from 'src/components/KeyResult/List/Body/Columns'
import { KEY_RESULT_LIST_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'
import { KeyResult } from 'src/components/KeyResult/types'

import { KeyResultListBodyStaticProperties } from './static'

export interface KeyResultListBodyStaticLineProperties extends KeyResultListBodyStaticProperties {
  keyResultID?: KeyResult['id']
}

const KeyResultListBodyStaticLine = ({
  listID,
  keyResultID,
  onLineClick,
  borderColor,
  templateColumns,
  columnGap,
  columns,
  bodyProperties,
}: KeyResultListBodyStaticLineProperties) => {
  const handleLineClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLDivElement
    const actions = remove([
      target.getAttribute('data-action'),
      target.parentElement?.getAttribute('data-action'),
    ])
    const allowLineClick = actions.length === 0

    if (onLineClick && keyResultID && allowLineClick) onLineClick(keyResultID)
  }

  const columnComponents = {
    [KEY_RESULT_LIST_COLUMN.KEY_RESULT]: KeyResultListBodyColumnKeyResult,
    [KEY_RESULT_LIST_COLUMN.OBJECTIVE]: KeyResultListBodyColumnObjective,
    [KEY_RESULT_LIST_COLUMN.CONFIDENCE_LEVEL]: KeyResultListBodyColumnConfidenceLevel,
    [KEY_RESULT_LIST_COLUMN.PROGRESS]: KeyResultListBodyColumnProgress,
    [KEY_RESULT_LIST_COLUMN.CYCLE]: KeyResultListBodyColumnCycle,
    [KEY_RESULT_LIST_COLUMN.OWNER]: KeyResultListBodyColumnOwner,
    [KEY_RESULT_LIST_COLUMN.CONFIDENCE_LEVEL_COLOR]: KeyResultListBodyColumnConfidenceLevelColor,
    [KEY_RESULT_LIST_COLUMN.PERCENTUAL_PROGRESS]: KeyResultListBodyColumnPercentualProgress,
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
      _hover={onLineClick ? { background: 'gray.50' } : {}}
      onMouseDown={handleLineClick}
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
