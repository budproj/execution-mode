import { Flex, Skeleton } from '@chakra-ui/react'
import React from 'react'

import { SliderWithFilledTrack } from 'src/components/Base'
import { KeyResultCheckIn } from 'src/components/KeyResult/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'

export interface KeyResultSectionTimelineCardCheckInProgressBarInterface {
  progress?: KeyResultCheckIn['progress']
  confidence?: KeyResultCheckIn['confidence']
}

const KeyResultSectionTimelineCardCheckInProgressBar = ({
  progress,
  confidence,
}: KeyResultSectionTimelineCardCheckInProgressBarInterface) => {
  const [confidenceTag] = useConfidenceTag(confidence)

  const isLoaded = Boolean(progress) || progress === 0

  return (
    <Skeleton isLoaded={isLoaded} minH="12px" borderRadius="full" borderTopRadius={0}>
      <Flex>
        <SliderWithFilledTrack
          trackColor={confidenceTag.color.primary}
          value={progress}
          trackThickness={2}
          trackTopRadius={0}
        />
      </Flex>
    </Skeleton>
  )
}

export default KeyResultSectionTimelineCardCheckInProgressBar
