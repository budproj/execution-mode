import React, { ReactElement } from 'react'
import { DropResult } from 'react-beautiful-dnd'

import { KeyResultListBodyStaticProperties } from 'src/components/KeyResult/List/Body/Static/static'
import { KeyResult } from 'src/components/KeyResult/types'

import KeyResultListBodyDragAndDropDraggableLine from './draggable-line'
import DroppableBox from './droppable-box'

export interface KeyResultListBodyDragAndDropProperties extends KeyResultListBodyStaticProperties {
  handleDragEnd: (result: DropResult) => void
}

const KeyResultListBodyDragAndDrop = ({
  handleDragEnd,
  keyResultIDs,
  ...rest
}: KeyResultListBodyDragAndDropProperties): ReactElement => (
  <DroppableBox onDragEnd={handleDragEnd}>
    {keyResultIDs.map((keyResultID: KeyResult['id'], index: number) => (
      <KeyResultListBodyDragAndDropDraggableLine
        key={`KEY_RESULT_LIST_BODY_DRAG_AND_DROP_LINE_${keyResultID}`}
        keyResultID={keyResultID}
        index={index}
        {...rest}
      />
    ))}
  </DroppableBox>
)

export default KeyResultListBodyDragAndDrop
