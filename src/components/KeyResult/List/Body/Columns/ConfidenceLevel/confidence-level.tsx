import { Flex, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import ConfidenceTag from 'src/components/KeyResult/ConfidenceTag/confidence-tag'
import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import selectLatestCheckIn from 'src/state/recoil/key-result/check-in/latest'

export interface KeyResultListBodyColumnConfidenceLevelProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
}

const KeyResultListBodyColumnConfidenceLevel = ({
  id,
}: KeyResultListBodyColumnConfidenceLevelProperties): ReactElement => {
  const latestCheckIn = useRecoilValue(selectLatestCheckIn(id))
  const isKeyResultLoaded = Boolean(id)

  return (
    <KeyResultListBodyColumnBase>
      <Flex gridGap={2} flexDir="column">
        <Skeleton isLoaded={isKeyResultLoaded}>
          <ConfidenceTag showTooltip confidenceValue={latestCheckIn?.confidence} />
        </Skeleton>
      </Flex>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnConfidenceLevel
