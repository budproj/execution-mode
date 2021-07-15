import { Heading, Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { SliderWithFilledTrack } from 'src/components/Base'
import PercentageMask from 'src/components/KeyResult/NumberMasks/Percentage'
import { KeyResultCheckIn } from 'src/components/KeyResult/types'
import useConfidenceTag from 'src/state/hooks/useConfidenceTag'

import messages from './messages'

export interface KeyResultSectionTimelineCardCheckInProgressBarInterface {
  progress?: KeyResultCheckIn['progress']
  confidence?: KeyResultCheckIn['confidence']
}

const KeyResultSectionTimelineCardCheckInProgressBar = ({
  progress,
  confidence,
}: KeyResultSectionTimelineCardCheckInProgressBarInterface) => {
  const [confidenceTag] = useConfidenceTag(confidence)
  const intl = useIntl()

  const isLoaded = Boolean(progress) || progress === 0

  return (
    <Stack spacing={2} pb={4}>
      <Heading
        as="h4"
        fontWeight={700}
        fontSize="xs"
        color="gray.300"
        textTransform="uppercase"
        pb={2}
      >
        {intl.formatMessage(messages.progressTitle)}
      </Heading>

      <Stack direction="row">
        <Skeleton isLoaded={isLoaded} borderRadius="full" flexGrow={1} display="flex">
          <SliderWithFilledTrack
            trackColor={confidenceTag.color.primary}
            value={progress}
            trackThickness={2}
            trackRadius={2}
            filledTrackRadius="full"
          />
        </Skeleton>

        <Skeleton noOfLines={1} isLoaded={isLoaded} color="gray.400" fontWeight={700}>
          <PercentageMask value={progress} displayType="text" />
        </Skeleton>
      </Stack>
    </Stack>
  )
}

export default KeyResultSectionTimelineCardCheckInProgressBar
