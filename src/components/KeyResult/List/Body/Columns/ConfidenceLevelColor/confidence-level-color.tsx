import { Box } from '@chakra-ui/react'
import React, { ReactElement, useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'
import selectLatestCheckIn from 'src/state/recoil/key-result/check-in/latest'

export interface KeyResultListBodyColumnConfidenceLevelColorProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
}

const KeyResultListBodyColumnConfidenceLevelColor = ({
  id,
}: KeyResultListBodyColumnConfidenceLevelColorProperties): ReactElement => {
  const latestKeyResultCheckIn = useRecoilValue(selectLatestCheckIn(id))
  const [confidenceTag, setConfidence] = useConfidenceTag(latestKeyResultCheckIn?.confidence)

  useEffect(() => {
    if (latestKeyResultCheckIn?.confidence) setConfidence(latestKeyResultCheckIn?.confidence)
  }, [latestKeyResultCheckIn?.confidence, setConfidence])

  return (
    <KeyResultListBodyColumnBase p={0}>
      <Box borderRadius="full" maxW="5px" minH="60px" bg={confidenceTag.color.primary} />
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnConfidenceLevelColor
