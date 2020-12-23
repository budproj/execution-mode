import { Box, GridProps } from '@chakra-ui/react'
import { uniqueId } from 'lodash'
import React from 'react'

import {
  KeyResultListBodyColumn,
  KeyResultListBodyProperties,
} from 'src/components/KeyResult/List/Body/Columns/types'
import { KeyResult } from 'src/components/KeyResult/types'

import KeyResultListBodyStaticEmptyState from './empty-state'
import KeyResultListBodyStaticLine from './line'

export interface KeyResultListBodyStaticProperties {
  listID: string
  keyResultIDs: Array<KeyResult['id']>
  templateColumns: GridProps['templateColumns']
  borderColor: GridProps['borderColor']
  columns: KeyResultListBodyColumn[]
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
      <KeyResultListBodyStaticEmptyState />
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
