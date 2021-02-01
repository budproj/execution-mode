import { Divider, Flex, SkeletonText, StatHelpText } from '@chakra-ui/react'
import React from 'react'

import { KeyResultCheckIn } from 'src/components/KeyResult/types'

export interface KeyResultSectionTimelineCardCheckInCommentProperties {
  comment: KeyResultCheckIn['comment']
}

const KeyResultSectionTimelineCardCheckInComment = ({
  comment,
}: KeyResultSectionTimelineCardCheckInCommentProperties) => {
  const isLoaded = Boolean(comment)

  return (
    <Flex direction="column" gridGap={4}>
      <Divider />
      <SkeletonText isLoaded={isLoaded} noOfLines={4}>
        <StatHelpText color="gray.400">{comment}</StatHelpText>
      </SkeletonText>
    </Flex>
  )
}

export default KeyResultSectionTimelineCardCheckInComment
