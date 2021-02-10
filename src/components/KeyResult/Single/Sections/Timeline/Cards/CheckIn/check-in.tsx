import { useMutation } from '@apollo/client'
import { Box, Stat, Flex, StatLabel } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import KeyResultSectionTimelineCardBase from 'src/components/KeyResult/Single/Sections/Timeline/Cards/Base'
import { KeyResultCheckIn } from 'src/components/KeyResult/types'
import removeTimelineEntry from 'src/state/recoil/key-result/timeline/remove-entry'

import KeyResultSectionTimelineCardCheckInComment from './comment'
import KeyResultSectionTimelineCardCheckInHelpText from './help-text'
import messages from './messages'
import KeyResultSectionTimelineCardCheckInProgress from './progress'
import KeyResultSectionTimelineCardCheckInProgressBar from './progress-bar'
import queries from './queries.gql'
import KeyResultSectionTimelineCardCheckInRelativeConfidenceTag from './relative-confidence-tag'

export interface KeyResultSectionTimelineCardCheckInProperties {
  data?: Partial<KeyResultCheckIn>
}

const KeyResultSectionTimelineCardCheckIn = ({
  data,
}: KeyResultSectionTimelineCardCheckInProperties) => {
  const intl = useIntl()
  const removeEntryFromTimeline = useSetRecoilState(removeTimelineEntry(data?.keyResultId))
  const [deleteKeyResultCheckIn] = useMutation(queries.DELETE_KEY_RESULT_CHECK_IN, {
    onCompleted: () => removeEntryFromTimeline(data),
  })

  const handleDelete = async () => {
    await deleteKeyResultCheckIn({
      variables: {
        keyResultCheckInID: data?.id,
      },
    })
  }

  const confidenceDifference =
    data?.confidence && data?.parent ? data.confidence - data.parent.confidence : 0

  return (
    <Stat>
      <KeyResultSectionTimelineCardBase
        borderBottomRadius={0}
        policies={data?.policies}
        onDelete={handleDelete}
      >
        <Flex direction="column" gridGap={4}>
          <KeyResultSectionTimelineCardCheckInRelativeConfidenceTag
            confidence={data?.confidence}
            difference={confidenceDifference}
          />

          <Box>
            <StatLabel fontSize="md" fontWeight={500} color="gray.600">
              {intl.formatMessage(messages.title)}
            </StatLabel>

            <KeyResultSectionTimelineCardCheckInHelpText
              user={data?.user}
              createdAt={data?.createdAt}
            />
          </Box>

          <KeyResultSectionTimelineCardCheckInProgress
            relativePercentageProgress={data?.relativePercentageProgress}
            confidence={data?.confidence}
            parent={data?.parent}
          />

          {data?.comment && <KeyResultSectionTimelineCardCheckInComment comment={data.comment} />}
        </Flex>
      </KeyResultSectionTimelineCardBase>

      <KeyResultSectionTimelineCardCheckInProgressBar
        relativePercentageProgress={data?.relativePercentageProgress}
        confidence={data?.confidence}
      />
    </Stat>
  )
}

export default KeyResultSectionTimelineCardCheckIn
