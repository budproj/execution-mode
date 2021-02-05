import { Box, Flex, StatLabel } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import KeyResultSectionTimelineCardBase from 'src/components/KeyResult/Single/Sections/Timeline/Cards/Base'
import { KeyResultCheckIn } from 'src/components/KeyResult/types'
import { User } from 'src/components/User/types'

import KeyResultSectionTimelineCardCheckInComment from './comment'
import KeyResultSectionTimelineCardCheckInHelpText from './help-text'
import messages from './messages'
import KeyResultSectionTimelineCardCheckInProgress from './progress'
import KeyResultSectionTimelineCardCheckInProgressBar from './progress-bar'
import KeyResultSectionTimelineCardCheckInRelativeConfidenceTag from './relative-confidence-tag'

export interface KeyResultSectionTimelineCardCheckInProperties {
  relativePercentageProgress?: KeyResultCheckIn['relativePercentageProgress']
  confidence?: KeyResultCheckIn['confidence']
  comment?: KeyResultCheckIn['comment']
  createdAt?: KeyResultCheckIn['createdAt']
  user?: User
  parent?: KeyResultCheckIn | null
}

const KeyResultSectionTimelineCardCheckIn = ({
  relativePercentageProgress,
  confidence,
  comment,
  createdAt,
  user,
  parent,
}: KeyResultSectionTimelineCardCheckInProperties) => {
  const intl = useIntl()

  const confidenceDifference = confidence && parent ? confidence - parent.confidence : 0

  return (
    <Box>
      <KeyResultSectionTimelineCardBase borderBottomRadius={0}>
        <Flex direction="column" gridGap={4}>
          <KeyResultSectionTimelineCardCheckInRelativeConfidenceTag
            confidence={confidence}
            difference={confidenceDifference}
          />

          <Box>
            <StatLabel fontSize="md" fontWeight={500} color="gray.600">
              {intl.formatMessage(messages.title)}
            </StatLabel>

            <KeyResultSectionTimelineCardCheckInHelpText user={user} createdAt={createdAt} />
          </Box>

          <KeyResultSectionTimelineCardCheckInProgress
            relativePercentageProgress={relativePercentageProgress}
            confidence={confidence}
            parent={parent}
          />

          {comment && <KeyResultSectionTimelineCardCheckInComment comment={comment} />}
        </Flex>
      </KeyResultSectionTimelineCardBase>

      <KeyResultSectionTimelineCardCheckInProgressBar
        relativePercentageProgress={relativePercentageProgress}
        confidence={confidence}
      />
    </Box>
  )
}

export default KeyResultSectionTimelineCardCheckIn
