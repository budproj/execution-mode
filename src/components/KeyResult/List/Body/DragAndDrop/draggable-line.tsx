import { GridProps } from '@chakra-ui/react'
import React from 'react'

import { KEY_RESULT_LIST_BODY_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'
import { KeyResultListBodyProperties } from 'src/components/KeyResult/List/Body/Columns/types'
import KeyResultListBodyStaticLine from 'src/components/KeyResult/List/Body/Static/line'
import { KeyResult } from 'src/components/KeyResult/types'

import DraggableGrid from './draggable-grid'

export interface KeyResultListBodyDragAndDropLineProperties {
  listID: string
  keyResultID: KeyResult['id']
  index: number
  templateColumns: GridProps['templateColumns']
  borderColor: GridProps['borderColor']
  columns: KEY_RESULT_LIST_BODY_COLUMN[]
  bodyProperties: KeyResultListBodyProperties
  onLineClick?: (id: KeyResult['id']) => void
}

const KeyResultListBodyDragAndDropLine = ({
  keyResultID,
  index,
  ...rest
}: KeyResultListBodyDragAndDropLineProperties) => (
  <DraggableGrid keyResultID={keyResultID} index={index}>
    <KeyResultListBodyStaticLine keyResultID={keyResultID} {...rest} />
  </DraggableGrid>
)

export default KeyResultListBodyDragAndDropLine
