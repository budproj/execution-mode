import React, { ReactElement } from 'react'
import { DropResult } from 'react-beautiful-dnd'

import { KeyResultListBodyStaticProperties } from 'src/components/KeyResult/List/Body/Static/static'
import { KeyResult } from 'src/components/KeyResult/types'

import DroppableBox from './droppable-box'
import KeyResultListDragAndDropLine from './line'

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
      <KeyResultListDragAndDropLine
        key={`KEY_RESULT_LIST_BODY_DRAG_AND_DROP_LINE_${keyResultID}`}
        keyResultID={keyResultID}
        index={index}
        {...rest}
      />
    ))}
  </DroppableBox>
)

export default KeyResultListBodyDragAndDrop
