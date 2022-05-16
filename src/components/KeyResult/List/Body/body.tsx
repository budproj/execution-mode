import { Box, GridProps } from '@chakra-ui/react'
import React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { MessageDescriptor } from 'react-intl'

import { EmptyState } from 'src/components/Base'
import KeyResultBodyDragAndDrop from 'src/components/KeyResult/List/Body/DragAndDrop'
import KeyResultBodyStatic from 'src/components/KeyResult/List/Body/Static'
import { KEY_RESULT_LIST_TYPE } from 'src/components/KeyResult/List/constants'
import { KeyResult } from 'src/components/KeyResult/types'
import { ObjectiveMode } from 'src/state/recoil/objective/context'

import { KEY_RESULT_LIST_COLUMN } from './Columns/constants'
import { KeyResultListBodyColumnProperties } from './Columns/types'
import GuideListCreateOkr from './GuideListCreateOKR/guide-list-create-okr'
import messages from './messages'

export interface KeyResultListBodyProperties {
  type: KEY_RESULT_LIST_TYPE
  listID: string
  columns: KEY_RESULT_LIST_COLUMN[]
  templateColumns: GridProps['templateColumns']
  columnGap: GridProps['gridColumnGap']
  borderColor: GridProps['borderColor']
  bodyProperties: KeyResultListBodyColumnProperties
  emptyStateMessage?: MessageDescriptor
  keyResultIDs?: Array<KeyResult['id']>
  onLineClick?: (id: KeyResult['id']) => void
  handleDragEnd?: (result: DropResult) => void
  mode?: ObjectiveMode
}

const KeyResultListBody = ({
  type,
  keyResultIDs,
  emptyStateMessage,
  mode,
  ...rest
}: KeyResultListBodyProperties) => {
  const bodyComponents = {
    [KEY_RESULT_LIST_TYPE.DND]: KeyResultBodyDragAndDrop,
    [KEY_RESULT_LIST_TYPE.STATIC]: KeyResultBodyStatic,
  }
  const BodyComponent = bodyComponents[type]

  return mode === ObjectiveMode.EDIT ? (
    <GuideListCreateOkr />
  ) : keyResultIDs && keyResultIDs.length > 0 ? (
    <BodyComponent keyResultIDs={keyResultIDs} type={type} {...rest} />
  ) : (
    <Box py={20}>
      <EmptyState
        labelMessage={emptyStateMessage ?? messages.emptyStateLabel}
        imageKey="empty-krs"
      />
    </Box>
  )
}

export default KeyResultListBody
