import { Flex, Skeleton } from '@chakra-ui/react'
import React from 'react'

import { SliderWithFilledTrack } from 'src/components/Base'
import { KeyResultCheckIn } from 'src/components/KeyResult/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'

export interface KeyResultSectionTimelineCardCheckInProgressBarInterface {
  relativePercentageProgress?: KeyResultCheckIn['relativePercentageProgress']
  confidence?: KeyResultCheckIn['confidence']
}

const KeyResultSectionTimelineCardCheckInProgressBar = ({
  relativePercentageProgress,
  confidence,
}: KeyResultSectionTimelineCardCheckInProgressBarInterface) => {
  const [confidenceTag] = useConfidenceTag(confidence)

  const isLoaded = Boolean(relativePercentageProgress) && Boolean(confidence)

  return (
    <Skeleton isLoaded={isLoaded} minH="12px" borderRadius="full" borderTopRadius={0}>
      <Flex>
        <SliderWithFilledTrack
          trackColor={confidenceTag.colors.primary}
          value={relativePercentageProgress}
          trackThickness="12px"
          trackTopRadius={0}
        />
      </Flex>
    </Skeleton>
  )
}

export default KeyResultSectionTimelineCardCheckInProgressBar
