import { Flex, Skeleton, StatArrow } from '@chakra-ui/react'
import React from 'react'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import ConfidenceTag from 'src/components/KeyResult/ConfidenceTag'
import { KeyResultCheckIn } from 'src/components/KeyResult/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'

export interface KeyResultSectionTimelineCardCheckInRelativeConfidenceTagProperties {
  confidence?: KeyResultCheckIn['confidence']
  difference?: number
}

const KeyResultSectionTimelineCardCheckInRelativeConfidenceTag = ({
  confidence,
  difference,
}: KeyResultSectionTimelineCardCheckInRelativeConfidenceTagProperties) => {
  const [confidenceTag] = useConfidenceTag(confidence)

  const isLoaded = Boolean(confidence)
  const arrowType = difference && difference > 0 ? 'increase' : 'decrease'

  return (
    <Flex alignItems="center" gridGap={2}>
      <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 150, 33)}>
        <ConfidenceTag confidenceValue={confidence} isGrayscale={difference === 0} />
      </Skeleton>

      {/* eslint-disable-next-line unicorn/no-null */}
      {difference ? <StatArrow type={arrowType} color={confidenceTag.color.primary} /> : null}
    </Flex>
  )
}

export default KeyResultSectionTimelineCardCheckInRelativeConfidenceTag
