import { uniqueId } from 'lodash'
import React, { ReactElement } from 'react'
import { DropResult } from 'react-beautiful-dnd'

import { KeyResultListBodyStaticProperties } from 'src/components/KeyResult/List/Body/Static/static'
import { KeyResult } from 'src/components/KeyResult/types'

import KeyResultListBodyStaticEmptyState from '../Static/empty-state'

import KeyResultListBodyDragAndDropDraggableLine from './draggable-line'
import DroppableBox from './droppable-box'

export interface KeyResultListBodyDragAndDropProperties extends KeyResultListBodyStaticProperties {
  handleDragEnd: (result: DropResult) => void
}

const KeyResultListBodyDragAndDrop = ({
  handleDragEnd,
  keyResultIDs,
  listID,
  ...rest
}: KeyResultListBodyDragAndDropProperties): ReactElement => (
  <DroppableBox onDragEnd={handleDragEnd}>
    {keyResultIDs.length === 0 ? (
      <KeyResultListBodyStaticEmptyState />
    ) : (
      keyResultIDs.map((keyResultID: KeyResult['id'], index: number) => (
        <KeyResultListBodyDragAndDropDraggableLine
          key={`${listID ?? uniqueId()}_KEY_RESULT_LIST_BODY_DRAG_AND_DROP_LINE_${
            keyResultID ?? uniqueId()
          }`}
          keyResultID={keyResultID}
          index={index}
          listID={listID}
          {...rest}
        />
      ))
    )}
  </DroppableBox>
)

export default KeyResultListBodyDragAndDrop
