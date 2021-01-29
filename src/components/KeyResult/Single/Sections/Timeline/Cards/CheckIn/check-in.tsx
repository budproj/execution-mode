import { Box, Stat, StatLabel } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import KeyResultSectionTimelineCardBase from 'src/components/KeyResult/Single/Sections/Timeline/Cards/Base'
import { KeyResultCheckIn } from 'src/components/KeyResult/types'
import { User } from 'src/components/User/types'

import KeyResultSectionTimelineCardCheckInConfidenceTag from './confidence-tag'
import KeyResultSectionTimelineCardCheckInHelpText from './help-text'
import messages from './messages'
import KeyResultSectionTimelineCardCheckInProgressBar from './progress-bar'

export interface KeyResultSectionTimelineCardCheckInProperties {
  relativePercentageProgress?: KeyResultCheckIn['relativePercentageProgress']
  confidence?: KeyResultCheckIn['confidence']
  createdAt?: KeyResultCheckIn['createdAt']
  user?: User
  parent?: KeyResultCheckIn
}

const KeyResultSectionTimelineCardCheckIn = ({
  relativePercentageProgress,
  confidence,
  createdAt,
  user,
  parent,
}: KeyResultSectionTimelineCardCheckInProperties) => {
  const intl = useIntl()

  const confidenceDifference = confidence && parent?.confidence && confidence - parent.confidence

  return (
    <Box>
      <KeyResultSectionTimelineCardBase borderBottomRadius={0}>
        <Stat>
          <KeyResultSectionTimelineCardCheckInConfidenceTag
            confidence={confidence}
            difference={confidenceDifference}
          />

          <StatLabel fontSize="27px" fontWeight={400}>
            {intl.formatMessage(messages.title)}
          </StatLabel>

          <KeyResultSectionTimelineCardCheckInHelpText user={user} createdAt={createdAt} />
        </Stat>
      </KeyResultSectionTimelineCardBase>

      <KeyResultSectionTimelineCardCheckInProgressBar
        relativePercentageProgress={relativePercentageProgress}
        confidence={confidence}
      />
    </Box>
  )
}

export default KeyResultSectionTimelineCardCheckIn
