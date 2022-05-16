import { Box, GridProps } from '@chakra-ui/react'
import styled from '@emotion/styled'
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

const StyledSpan = styled.span`
  display: inline-block;
  border-radius: 5px;
  background-color: #eef2fc;
  border: 1px solid #d9e2f6;
  padding: 0px 5px;
  line-height: 1rem;
  height: 23px;
  transform: translateY(-3px);
  margin: 0 3px;
`

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
        messageTranslationOptions={{ span: (string: string) => <StyledSpan>{string}</StyledSpan> }}
        maxWidth="320px"
        m="0 auto"
        imageKey="empty-krs"
      />
    </Box>
  )
}

export default KeyResultListBody
