import { GridProps } from '@chakra-ui/react'
import React from 'react'

import { KeyResultListBodyColumn } from 'src/components/KeyResult/List/types'
import { KeyResult } from 'src/components/KeyResult/types'

export interface KeyResultListBodyStaticProperties {
  keyResultIDs: Array<KeyResult['id']>
  templateColumns: GridProps['templateColumns']
  borderColor: GridProps['borderColor']
  columns: KeyResultListBodyColumn[]
  onLineClick?: (id: KeyResult['id']) => void
}

const KeyResultListBodyStatic = () => <p>Ok</p>

export default KeyResultListBodyStatic
