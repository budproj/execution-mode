import React from 'react'

import KeyResultBodyDragAndDrop from 'src/components/KeyResult/List/Body/DragAndDrop'
import KeyResultBodyStatic from 'src/components/KeyResult/List/Body/Static'
import { KEY_RESULT_LIST_TYPE } from 'src/components/KeyResult/List/constants'

import { KeyResultListBodyDragAndDropProperties } from './DragAndDrop/drag-and-drop'
import { KeyResultListBodyStaticProperties } from './Static/static'

export interface KeyResultListBodyProperties
  extends KeyResultListBodyDragAndDropProperties,
    KeyResultListBodyStaticProperties {
  type: KEY_RESULT_LIST_TYPE
}

const KeyResultListBody = ({ type, ...rest }: KeyResultListBodyProperties) => {
  const bodyComponents = {
    [KEY_RESULT_LIST_TYPE.DND]: KeyResultBodyDragAndDrop,
    [KEY_RESULT_LIST_TYPE.STATIC]: KeyResultBodyStatic,
  }
  const BodyComponent = bodyComponents[type]

  return <BodyComponent {...rest} />
}

export default KeyResultListBody
