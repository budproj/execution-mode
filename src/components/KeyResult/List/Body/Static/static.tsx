import { Box, GridProps } from '@chakra-ui/react'
import { uniqueId } from 'lodash'
import React from 'react'

import { EmptyState } from 'src/components/Base'
import { KEY_RESULT_LIST_BODY_COLUMN } from 'src/components/KeyResult/List/Body/Columns/constants'
import { KeyResultListBodyProperties } from 'src/components/KeyResult/List/Body/Columns/types'
import { KeyResult } from 'src/components/KeyResult/types'

import KeyResultListBodyStaticLine from './line'
import messages from './messages'

export interface KeyResultListBodyStaticProperties {
  listID: string
  keyResultIDs: Array<KeyResult['id']>
  templateColumns: GridProps['templateColumns']
  borderColor: GridProps['borderColor']
  columns: KEY_RESULT_LIST_BODY_COLUMN[]
  bodyProperties: KeyResultListBodyProperties
  onLineClick?: (id: KeyResult['id']) => void
}

const KeyResultListBodyStatic = ({
  keyResultIDs,
  listID,
  ...rest
}: KeyResultListBodyStaticProperties) => (
  <Box>
    {keyResultIDs.length === 0 ? (
      <EmptyState labelMessage={messages.emptyStateLabel} />
    ) : (
      keyResultIDs.map((keyResultID: KeyResult['id']) => (
        <KeyResultListBodyStaticLine
          key={`${listID ?? uniqueId()}_KEY_RESULT_LIST_BODY_LINE_${keyResultID ?? uniqueId()}`}
          keyResultID={keyResultID}
          listID={listID}
          {...rest}
        />
      ))
    )}
  </Box>
)

export default KeyResultListBodyStatic
