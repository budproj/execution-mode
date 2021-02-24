import { Flex, Skeleton, SkeletonText } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import LastUpdateText from 'src/components/Base/LastUpdateText'
import ConfidenceTag from 'src/components/KeyResult/ConfidenceTag/confidence-tag'
import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import selectLatestCheckIn from 'src/state/recoil/key-result/check-in/latest'

export interface KeyResultListBodyColumnConfidenceLevelProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
  withLastUpdateInfo?: boolean
}

const KeyResultListBodyColumnConfidenceLevel = ({
  id,
  withLastUpdateInfo,
}: KeyResultListBodyColumnConfidenceLevelProperties): ReactElement => {
  const latestCheckIn = useRecoilValue(selectLatestCheckIn(id))
  const lastUpdateDate = latestCheckIn?.createdAt ? new Date(latestCheckIn.createdAt) : undefined

  const isKeyResultLoaded = Boolean(id)

  return (
    <KeyResultListBodyColumnBase>
      <Flex gridGap={2} flexDir="column">
        <Skeleton
          isLoaded={isKeyResultLoaded}
          fadeDuration={0}
          /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
        >
          <ConfidenceTag confidenceValue={latestCheckIn?.confidence} />
        </Skeleton>

        {withLastUpdateInfo && (
          <SkeletonText
            noOfLines={2}
            minW="100%"
            mt={isKeyResultLoaded ? 'inherit' : '4px'}
            isLoaded={isKeyResultLoaded}
          >
            <LastUpdateText
              date={lastUpdateDate}
              author={latestCheckIn?.user?.fullName}
              color="gray.300"
            />
          </SkeletonText>
        )}
      </Flex>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnConfidenceLevel
