import { Flex, Heading, SkeletonText } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { KeyResultCheckIn } from 'src/components/KeyResult/types'
import { insertMentionInString } from 'src/components/Routine/RetrospectiveTab/Comments/CommentCard'

import messages from './messages'

export interface KeyResultSectionTimelineCardCheckInCommentProperties {
  comment: KeyResultCheckIn['comment']
}

const KeyResultSectionTimelineCardCheckInComment = ({
  comment,
}: KeyResultSectionTimelineCardCheckInCommentProperties) => {
  const intl = useIntl()
  const isLoaded = Boolean(comment)

  const formattedCommentText = useMemo(() => {
    if (comment) {
      return comment.split('\n').map((line) => (
        <span key={line} style={{ display: 'block' }}>
          {insertMentionInString(line)}
        </span>
      ))
    }
  }, [comment])

  return (
    <Flex direction="column" gridGap={2}>
      <Heading
        as="h4"
        fontSize="sm"
        color="new-gray.600"
        textTransform="uppercase"
        fontWeight={700}
      >
        {intl.formatMessage(messages.commentTitle)}
      </Heading>
      <SkeletonText isLoaded={isLoaded} noOfLines={4}>
        {formattedCommentText ?? ''}
      </SkeletonText>
    </Flex>
  )
}

export default KeyResultSectionTimelineCardCheckInComment
