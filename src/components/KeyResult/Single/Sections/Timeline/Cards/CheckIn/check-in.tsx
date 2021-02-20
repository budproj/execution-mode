import { useLazyQuery, useMutation } from '@apollo/client'
import { Box, Stat, Flex, StatLabel } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import KeyResultSectionTimelineCardBase from 'src/components/KeyResult/Single/Sections/Timeline/Cards/Base'
import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'
import selectLatestCheckIn from 'src/state/recoil/key-result/check-in/latest'
import removeTimelineEntry from 'src/state/recoil/key-result/timeline/remove-entry'

import KeyResultSectionTimelineCardCheckInComment from './comment'
import KeyResultSectionTimelineCardCheckInHelpText from './help-text'
import messages from './messages'
import KeyResultSectionTimelineCardCheckInProgress from './progress'
import KeyResultSectionTimelineCardCheckInProgressBar from './progress-bar'
import queries from './queries.gql'
import KeyResultSectionTimelineCardCheckInRelativeConfidenceTag from './relative-confidence-tag'
import KeyResultSectionTimelineCardCheckInValueIncrease from './value-increase'

export interface KeyResultSectionTimelineCardCheckInProperties {
  format?: KeyResult['format']
  data?: Partial<KeyResultCheckIn>
  onEntryDelete?: (entryType: string) => void
}

export interface GetKeyResultWithLatestCheckInQuery {
  keyResult: KeyResult
}

const KeyResultSectionTimelineCardCheckIn = ({
  format,
  data,
  onEntryDelete,
}: KeyResultSectionTimelineCardCheckInProperties) => {
  const intl = useIntl()
  const removeEntryFromTimeline = useSetRecoilState(removeTimelineEntry(data?.keyResultId))
  const setLatestCheckIn = useSetRecoilState(selectLatestCheckIn(data?.keyResultId))
  const [getKeyResultWithLatestCheckIn] = useLazyQuery<GetKeyResultWithLatestCheckInQuery>(
    queries.GET_KEY_RESULT_WITH_LATEST_CHECK_IN,
    {
      onCompleted: (queryResult) => {
        const latestCheckIn = queryResult.keyResult?.keyResultCheckIns?.[0]

        setLatestCheckIn(latestCheckIn)
        removeEntryFromTimeline(data)
      },
    },
  )
  const [deleteKeyResultCheckIn] = useMutation(queries.DELETE_KEY_RESULT_CHECK_IN, {
    onCompleted: () => {
      getKeyResultWithLatestCheckIn({
        variables: {
          keyResultID: data?.keyResultId,
        },
      })
    },
  })

  const handleDelete = async () => {
    await deleteKeyResultCheckIn({
      variables: {
        keyResultCheckInID: data?.id,
      },
    })

    if (onEntryDelete) onEntryDelete(intlCardType)
  }

  const intlCardType = intl.formatMessage(messages.cardType)
  const confidenceDifference =
    data?.confidence && data?.parent ? data.confidence - data.parent.confidence : 0

  return (
    <Stat>
      <KeyResultSectionTimelineCardBase
        borderBottomRadius={0}
        policies={data?.policies}
        intlCardType={intlCardType}
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
            progress={data?.progress}
            confidence={data?.confidence}
            parent={data?.parent}
          />

          {data?.valueIncrease !== 0 && (
            <KeyResultSectionTimelineCardCheckInValueIncrease
              format={format}
              value={data?.value}
              valueIncrease={data?.valueIncrease}
            />
          )}

          {data?.comment && <KeyResultSectionTimelineCardCheckInComment comment={data.comment} />}
        </Flex>
      </KeyResultSectionTimelineCardBase>

      <KeyResultSectionTimelineCardCheckInProgressBar
        progress={data?.progress}
        confidence={data?.confidence}
      />
    </Stat>
  )
}

export default KeyResultSectionTimelineCardCheckIn
