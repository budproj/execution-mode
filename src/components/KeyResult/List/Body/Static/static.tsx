import { Box } from '@chakra-ui/react'
import { uniqueId } from 'lodash'
import React from 'react'

import { KeyResultListBodyProperties } from 'src/components/KeyResult/List/Body/body'
import { KeyResult } from 'src/components/KeyResult/types'

import KeyResultListBodyStaticLine from './line'

export interface KeyResultListBodyStaticProperties extends KeyResultListBodyProperties {
  keyResultIDs: Array<KeyResult['id']>
}

const KeyResultListBodyStatic = ({
  keyResultIDs,
  listID,
  ...rest
}: KeyResultListBodyStaticProperties) => (
  <Box>
    {keyResultIDs.map((keyResultID: KeyResult['id']) => (
      <KeyResultListBodyStaticLine
        key={`${listID ?? uniqueId()}_KEY_RESULT_LIST_BODY_LINE_${keyResultID ?? uniqueId()}`}
        keyResultID={keyResultID}
        keyResultIDs={keyResultIDs}
        listID={listID}
        {...rest}
      />
    ))}
  </Box>
)

export default KeyResultListBodyStatic
