import React from 'react'

import KeyResultBodyDragAndDrop from 'src/components/KeyResult/List/Body/DragAndDrop'
import KeyResultBodyStatic from 'src/components/KeyResult/List/Body/Static'
import { KeyResultListType } from 'src/components/KeyResult/List/types'

import { KeyResultListBodyDragAndDropProperties } from './DragAndDrop/drag-and-drop'
import { KeyResultListBodyStaticProperties } from './Static/static'

export interface KeyResultListBodyProperties
  extends KeyResultListBodyDragAndDropProperties,
    KeyResultListBodyStaticProperties {
  type: KeyResultListType
}

const KeyResultListBody = ({ type, ...rest }: KeyResultListBodyProperties) => {
  const bodyComponents = {
    [KeyResultListType.DND]: KeyResultBodyDragAndDrop,
    [KeyResultListType.STATIC]: KeyResultBodyStatic,
  }
  const BodyComponent = bodyComponents[type]

  return <BodyComponent {...rest} />
}

export default KeyResultListBody
