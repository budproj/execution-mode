import { Flex, Skeleton, SkeletonText } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import LastUpdateText from 'src/components/Base/LastUpdateText'
import ConfidenceTag from 'src/components/KeyResult/ConfidenceTag/confidence-tag'
import KeyResultListBodyColumnBase, {
  KeyResultListBodyColumnBaseProperties,
} from 'src/components/KeyResult/List/Body/Columns/Base'
import { KeyResult } from 'src/components/KeyResult/types'
import {
  selectCurrentConfidence,
  selectLatestConfidenceReport,
} from 'src/state/recoil/key-result/selectors'

export interface KeyResultListBodyColumnConfidenceLevelProperties
  extends KeyResultListBodyColumnBaseProperties {
  id?: KeyResult['id']
  withLastUpdateInfo?: boolean
}

const KeyResultListBodyColumnConfidenceLevel = ({
  id,
  withLastUpdateInfo,
}: KeyResultListBodyColumnConfidenceLevelProperties): ReactElement => {
  const currentConfidence = useRecoilValue(selectCurrentConfidence(id))
  const latestConfidenceReport = useRecoilValue(selectLatestConfidenceReport(id))
  const lastUpdateDate = latestConfidenceReport?.createdAt
    ? new Date(latestConfidenceReport.createdAt)
    : undefined

  const isKeyResultLoaded = Boolean(id)

  return (
    <KeyResultListBodyColumnBase>
      <Flex gridGap={2} flexDir="column">
        <Skeleton
          isLoaded={isKeyResultLoaded}
          fadeDuration={0}
          /* Using fadeDuration=0 as a workaround for this issue: https://github.com/chakra-ui/chakra-ui/issues/2644 */
        >
          <ConfidenceTag confidenceValue={currentConfidence} />
        </Skeleton>

        {withLastUpdateInfo && (
          <SkeletonText
            noOfLines={2}
            minW="100%"
            mt={isKeyResultLoaded ? 'inherit' : '4px'}
            isLoaded={isKeyResultLoaded}
            pl={8}
          >
            <LastUpdateText date={lastUpdateDate} author={latestConfidenceReport?.user?.fullName} />
          </SkeletonText>
        )}
      </Flex>
    </KeyResultListBodyColumnBase>
  )
}

export default KeyResultListBodyColumnConfidenceLevel
