import { Box, Flex, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { SliderWithFilledTrack } from 'src/components/Base'
import KeyResultSectionTimelineCardBase from 'src/components/KeyResult/Single/Sections/Timeline/Cards/Base'
import { KeyResultCheckIn } from 'src/components/KeyResult/types'
import { User } from 'src/components/User/types'
import confidenceTagSelector from 'src/state/recoil/key-result/selectors/confidence-tag'

export interface KeyResultSectionTimelineCardCheckInProperties {
  id?: KeyResultCheckIn['id']
  relativePercentageProgress?: KeyResultCheckIn['relativePercentageProgress']
  confidence?: KeyResultCheckIn['confidence']
  createdAt?: KeyResultCheckIn['createdAt']
  user?: User
  parent?: KeyResultCheckIn
}

const KeyResultSectionTimelineCardCheckIn = ({
  id,
  relativePercentageProgress,
  confidence,
}: KeyResultSectionTimelineCardCheckInProperties) => {
  const confidenceTag = useRecoilValue(confidenceTagSelector(confidence))

  return (
    <Box>
      <KeyResultSectionTimelineCardBase borderBottomRadius={0}>
        <p>{id}</p>
      </KeyResultSectionTimelineCardBase>

      <Skeleton
        isLoaded={Boolean(relativePercentageProgress)}
        minH="12px"
        borderRadius="full"
        borderTopRadius={0}
      >
        <Flex>
          <SliderWithFilledTrack
            trackColor={confidenceTag.color}
            value={relativePercentageProgress}
            trackThickness="12px"
            trackTopRadius={0}
          />
        </Flex>
      </Skeleton>
    </Box>
  )
}

export default KeyResultSectionTimelineCardCheckIn
