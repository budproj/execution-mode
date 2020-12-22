import { Box, GridProps } from '@chakra-ui/react'
import React from 'react'

import {
  KeyResultListBodyColumn,
  KeyResultListBodyColumnsProperties,
} from 'src/components/KeyResult/List/Body/Columns/types'
import { KeyResult } from 'src/components/KeyResult/types'

import KeyResultListBodyStaticLine from './line'

export interface KeyResultListBodyStaticProperties {
  keyResultIDs: Array<KeyResult['id']>
  templateColumns: GridProps['templateColumns']
  borderColor: GridProps['borderColor']
  columns: KeyResultListBodyColumn[]
  columnsProperties: KeyResultListBodyColumnsProperties
  onLineClick?: (id: KeyResult['id']) => void
}

const KeyResultListBodyStatic = ({ keyResultIDs, ...rest }: KeyResultListBodyStaticProperties) => (
  <Box>
    {keyResultIDs.map((keyResultID: KeyResult['id']) => (
      <KeyResultListBodyStaticLine
        key={`KEY_RESULT_LIST_BODY_STATIC_LINE_${keyResultID}`}
        keyResultID={keyResultID}
        {...rest}
      />
    ))}
  </Box>
)

export default KeyResultListBodyStatic
