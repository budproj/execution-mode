import { Box } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

export interface KeyResultListBodyColumnConfidenceLevelColorProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
}

const KeyResultListBodyColumnConfidenceLevelColor = ({
  id,
}: KeyResultListBodyColumnConfidenceLevelColorProperties): ReactElement => {
  const keyResult = useRecoilValue(keyResultAtomFamily(id))
  const [confidenceTag] = useConfidenceTag(keyResult?.currentConfidence)

  return (
    <KeyResultListBodyColumnBase p={0}>
      <Box borderRadius="full" maxW="5px" minH="60px" bg={confidenceTag.color.primary} />
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnConfidenceLevelColor
