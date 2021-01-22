import { uniqueId } from 'lodash'
import React, { ReactElement } from 'react'
import { DropResult } from 'react-beautiful-dnd'

import { KeyResultListBodyProperties } from 'src/components/KeyResult/List/Body/body'
import { KeyResult } from 'src/components/KeyResult/types'

import KeyResultListBodyDragAndDropDraggableLine from './draggable-line'
import DroppableContext from './droppable-context'

export interface KeyResultListBodyDragAndDropProperties extends KeyResultListBodyProperties {
  handleDragEnd: (result: DropResult) => void
  keyResultIDs: Array<KeyResult['id']>
}

const defaultHandleDragEnd = (_result: DropResult) => {
  throw new Error('You must implement a handleDragEnd function')
}

const KeyResultListBodyDragAndDrop = ({
  handleDragEnd,
  keyResultIDs,
  listID,
  ...rest
}: KeyResultListBodyDragAndDropProperties): ReactElement => (
  <DroppableContext onDragEnd={handleDragEnd}>
    {keyResultIDs.map((keyResultID: KeyResult['id'], index: number) => (
      <KeyResultListBodyDragAndDropDraggableLine
        key={`${listID ?? uniqueId()}_KEY_RESULT_LIST_BODY_DRAG_AND_DROP_LINE_${
          keyResultID ?? uniqueId()
        }`}
        keyResultID={keyResultID}
        keyResultIDs={keyResultIDs}
        handleDragEnd={handleDragEnd}
        index={index}
        listID={listID}
        {...rest}
      />
    ))}
  </DroppableContext>
)

KeyResultListBodyDragAndDrop.defaultProps = {
  handleDragEnd: defaultHandleDragEnd,
}

export default KeyResultListBodyDragAndDrop
