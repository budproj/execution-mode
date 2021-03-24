import { Text, Skeleton } from '@chakra-ui/react'
import React, { ReactElement, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'
import selectLatestCheckIn from 'src/state/recoil/key-result/check-in/latest'

export interface KeyResultListBodyColumnPercentualProgressProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
  isDisabled?: boolean
}

const KeyResultListBodyColumnPercentualProgress = ({
  id,
  isDisabled,
}: KeyResultListBodyColumnPercentualProgressProperties): ReactElement => {
  const latestKeyResultCheckIn = useRecoilValue(selectLatestCheckIn(id))
  const [confidenceTag, setConfidence] = useConfidenceTag(latestKeyResultCheckIn?.confidence)
  const intl = useIntl()

  const progress = latestKeyResultCheckIn?.progress ?? 0
  const isLoaded = Boolean(latestKeyResultCheckIn)

  useEffect(() => {
    if (latestKeyResultCheckIn?.confidence) setConfidence(latestKeyResultCheckIn?.confidence)
  }, [latestKeyResultCheckIn?.confidence, setConfidence])

  return (
    <KeyResultListBodyColumnBase>
      <Skeleton isLoaded={isLoaded}>
        <Text
          fontSize="md"
          color={isDisabled ? 'gray.400' : confidenceTag.color.primary}
          fontWeight={500}
        >
          {intl.formatNumber(progress / 100, { style: 'percent' })}
        </Text>
      </Skeleton>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnPercentualProgress
