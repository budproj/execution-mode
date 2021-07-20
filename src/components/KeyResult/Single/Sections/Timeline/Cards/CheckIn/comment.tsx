import { Flex, Heading, SkeletonText, StatHelpText } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { ExpandableText } from 'src/components/Base'
import { KeyResultCheckIn } from 'src/components/KeyResult/types'

import messages from './messages'

export interface KeyResultSectionTimelineCardCheckInCommentProperties {
  comment: KeyResultCheckIn['comment']
}

const KeyResultSectionTimelineCardCheckInComment = ({
  comment,
}: KeyResultSectionTimelineCardCheckInCommentProperties) => {
  const intl = useIntl()
  const isLoaded = Boolean(comment)

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
        <StatHelpText color="gray.500" mb={0}>
          <ExpandableText
            text={comment ?? ''}
            fontSize="md"
            color="new-gray.900"
            maxCollapsedLength={150}
          />
        </StatHelpText>
      </SkeletonText>
    </Flex>
  )
}

export default KeyResultSectionTimelineCardCheckInComment
