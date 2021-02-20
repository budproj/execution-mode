import { Divider, Flex, Heading, SkeletonText, StatHelpText } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { ExpandableText } from 'src/components/Base'
import { KeyResultCheckIn } from 'src/components/KeyResult/types'

import { BORDER_COLOR } from './constants'
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
    <Flex direction="column" gridGap={4}>
      <Divider borderColor={BORDER_COLOR} />
      <Heading as="h4" fontSize="xs" color="gray.200" textTransform="uppercase">
        {intl.formatMessage(messages.commentTitle)}
      </Heading>
      <SkeletonText isLoaded={isLoaded} noOfLines={4}>
        <StatHelpText color="gray.700">
          <ExpandableText text={comment ?? ''} fontSize="sm" />
        </StatHelpText>
      </SkeletonText>
    </Flex>
  )
}

export default KeyResultSectionTimelineCardCheckInComment
