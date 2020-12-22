import { Box } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import confidenceTagSelector from 'src/state/recoil/key-result/selectors/confidence-tag'

export interface KeyResultListBodyColumnStatusColorProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
}

const KeyResultListBodyColumnStatusColor = ({
  id,
}: KeyResultListBodyColumnStatusColorProperties): ReactElement => {
  const keyResult = useRecoilValue(keyResultAtomFamily(id))
  const { color } = useRecoilValue(confidenceTagSelector(keyResult?.currentConfidence))

  return (
    <KeyResultListBodyColumnBase p={0}>
      <Box borderRadius="full" maxW="5px" minH="60px" bg={color} />
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnStatusColor
