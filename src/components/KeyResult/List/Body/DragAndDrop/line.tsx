import { GridProps } from '@chakra-ui/react'
import React from 'react'

import {
  KeyResultListBodyColumnCycle,
  KeyResultListBodyColumnOkr,
  KeyResultListBodyColumnOwner,
  KeyResultListBodyColumnProgress,
  KeyResultListBodyColumnStatus,
  KeyResultListBodyColumnTitle,
} from 'src/components/KeyResult/List/Body/Columns'
import { KeyResultListBodyColumn } from 'src/components/KeyResult/List/types'
import { KeyResult } from 'src/components/KeyResult/types'

import DraggableGrid from './draggable-grid'

export interface KeyResultListBodyDragAndDropLineProperties {
  keyResultID: KeyResult['id']
  index: number
  templateColumns: GridProps['templateColumns']
  borderColor: GridProps['borderColor']
  columns: KeyResultListBodyColumn[]
  onLineClick?: (id: KeyResult['id']) => void
}

const KeyResultListDragAndDropLine = ({
  keyResultID,
  index,
  onLineClick,
  templateColumns,
  borderColor,
  columns,
}: KeyResultListBodyDragAndDropLineProperties) => {
  const handleLineClick = () => {
    if (onLineClick) onLineClick(keyResultID)
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
    <DraggableGrid
      keyResultID={keyResultID}
      templateColumns={templateColumns}
      border={0}
      borderBottomWidth={1}
      index={index}
      alignItems="center"
      borderColor="transparent"
      borderBottomColor={borderColor}
      borderStyle="solid"
      _hover={{ background: 'blue.50' }}
      cursor={onLineClick ? 'pointer' : 'auto'}
      onClick={handleLineClick}
    >
      {columns.map((column) => {
        const ColumnComponent = columnComponents[column]

        return (
          <ColumnComponent
            key={`KEY_RESULT_LIST_BODY_DRAG_AND_DROP_LINE_${keyResultID}_COLUMN_${column}`}
            id={keyResultID}
            borderColor={borderColor}
          />
        )
      })}
    </DraggableGrid>
  )
}

export default KeyResultListDragAndDropLine
