import { Box, GridProps } from '@chakra-ui/react'
import React from 'react'
import { DropResult } from 'react-beautiful-dnd'

import { EmptyState } from 'src/components/Base'
import KeyResultBodyDragAndDrop from 'src/components/KeyResult/List/Body/DragAndDrop'
import KeyResultBodyStatic from 'src/components/KeyResult/List/Body/Static'
import { KEY_RESULT_LIST_TYPE } from 'src/components/KeyResult/List/constants'
import { KeyResult } from 'src/components/KeyResult/types'

import { KEY_RESULT_LIST_COLUMN } from './Columns/constants'
import { KeyResultListBodyColumnProperties } from './Columns/types'
import messages from './messages'

export interface KeyResultListBodyProperties {
  type: KEY_RESULT_LIST_TYPE
  listID: string
  columns: KEY_RESULT_LIST_COLUMN[]
  templateColumns: GridProps['templateColumns']
  columnGap: GridProps['gridColumnGap']
  borderColor: GridProps['borderColor']
  bodyProperties: KeyResultListBodyColumnProperties
  keyResultIDs?: Array<KeyResult['id']>
  onLineClick?: (id: KeyResult['id']) => void
  handleDragEnd?: (result: DropResult) => void
}

const KeyResultListBody = ({ type, keyResultIDs, ...rest }: KeyResultListBodyProperties) => {
  const bodyComponents = {
    [KEY_RESULT_LIST_TYPE.DND]: KeyResultBodyDragAndDrop,
    [KEY_RESULT_LIST_TYPE.STATIC]: KeyResultBodyStatic,
  }
  const BodyComponent = bodyComponents[type]

  return keyResultIDs && keyResultIDs.length > 0 ? (
    <BodyComponent keyResultIDs={keyResultIDs} type={type} {...rest} />
  ) : (
    <Box pt={20}>
      <EmptyState labelMessage={messages.emptyStateLabel} />
    </Box>
  )
}

export default KeyResultListBody
