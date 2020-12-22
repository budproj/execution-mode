import { GridProps } from '@chakra-ui/react'
import React from 'react'

import {
  KeyResultListBodyColumn,
  KeyResultListBodyProperties,
} from 'src/components/KeyResult/List/Body/Columns/types'
import KeyResultListBodyStaticLine from 'src/components/KeyResult/List/Body/Static/line'
import { KeyResult } from 'src/components/KeyResult/types'

import DraggableGrid from './draggable-grid'

export interface KeyResultListBodyDragAndDropLineProperties {
  keyResultID: KeyResult['id']
  index: number
  templateColumns: GridProps['templateColumns']
  borderColor: GridProps['borderColor']
  columns: KeyResultListBodyColumn[]
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
