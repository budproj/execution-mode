import { Flex, Skeleton, StatArrow, Box } from '@chakra-ui/react'
import React from 'react'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import RichTooltip from 'src/components/Base/RichTooltip'
import ConfidenceTag from 'src/components/KeyResult/ConfidenceTag'
import { KeyResultCheckIn } from 'src/components/KeyResult/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'

import KeyResultSectionTimelineCardCheckInConfidenceIconRichTooltip from './RichTooltips/ConfidenceIcon'

export interface KeyResultSectionTimelineCardCheckInRelativeConfidenceTagProperties {
  parentConfidence: KeyResultCheckIn['confidence']
  currentConfidence?: KeyResultCheckIn['confidence']
}

const KeyResultSectionTimelineCardCheckInRelativeConfidenceTag = ({
  currentConfidence,
  parentConfidence,
}: KeyResultSectionTimelineCardCheckInRelativeConfidenceTagProperties) => {
  const [confidenceTag] = useConfidenceTag(currentConfidence)

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const isLoaded = Boolean(currentConfidence || currentConfidence === 0)
  const difference = (currentConfidence ?? 100) - parentConfidence
  const arrowType = difference && difference > 0 ? 'increase' : 'decrease'

  return (
    <Flex alignItems="center" gridGap={2}>
      <Skeleton
        isLoaded={isLoaded}
        cursor="help"
        {...buildSkeletonMinSize(isLoaded, 150, 33, { loadedWidth: 'auto' })}
      >
        <ConfidenceTag showTooltip confidenceValue={currentConfidence} />
      </Skeleton>

      {difference !== 0 && (
        <RichTooltip
          tooltip={
            <KeyResultSectionTimelineCardCheckInConfidenceIconRichTooltip
              currentConfidence={currentConfidence}
              parentConfidence={parentConfidence}
            />
          }
        >
          <Box cursor="help">
            <StatArrow type={arrowType} color={confidenceTag.color.primary} />
          </Box>
        </RichTooltip>
      )}
    </Flex>
  )
}

KeyResultSectionTimelineCardCheckInRelativeConfidenceTag.defaultProps = {
  parentConfidence: 100,
}

export default KeyResultSectionTimelineCardCheckInRelativeConfidenceTag
