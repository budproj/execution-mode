import { StatHelpText, Tag, Skeleton, StatArrow } from '@chakra-ui/react'
import React from 'react'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { KeyResultCheckIn } from 'src/components/KeyResult/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'

export interface KeyResultSectionTimelineCardCheckInConfidenceTagProperties {
  confidence?: KeyResultCheckIn['confidence']
  difference?: number
}

const KeyResultSectionTimelineCardCheckInConfidenceTag = ({
  confidence,
  difference,
}: KeyResultSectionTimelineCardCheckInConfidenceTagProperties) => {
  const [confidenceTag] = useConfidenceTag(confidence)

  const isLoaded = Boolean(confidence)
  const colorScheme = difference ? confidenceTag.colors.scheme : 'gray'
  const arrowType = difference && difference > 0 ? 'increase' : 'decrease'

  return (
    <StatHelpText display="flex" alignItems="center" gridGap={2}>
      <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 150, 33)}>
        <Tag size="lg" colorScheme={colorScheme} opacity={difference ? 1 : 0.3} px={5}>
          {confidenceTag.messages.long}
        </Tag>
      </Skeleton>

      {/* eslint-disable-next-line unicorn/no-null */}
      {difference ? <StatArrow type={arrowType} color={confidenceTag.colors.primary} /> : null}
    </StatHelpText>
  )
}

export default KeyResultSectionTimelineCardCheckInConfidenceTag
