import React from 'react'

import KeyResultListBodyStaticLine from 'src/components/KeyResult/List/Body/Static/line'
import { KeyResult } from 'src/components/KeyResult/types'

import { KeyResultListBodyDragAndDropProperties } from './drag-and-drop'
import DraggableGrid from './draggable-grid'

export interface KeyResultListBodyDragAndDropLineProperties
  extends KeyResultListBodyDragAndDropProperties {
  keyResultID: KeyResult['id']
  index: number
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
