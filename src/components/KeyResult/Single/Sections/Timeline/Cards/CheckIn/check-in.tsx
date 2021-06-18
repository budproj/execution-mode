import { useLazyQuery, useMutation } from '@apollo/client'
import { Box, Stat, Flex, StatLabel } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import KeyResultSectionTimelineCardBase from 'src/components/KeyResult/Single/Sections/Timeline/Cards/Base'
import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'
import keyResultAtomFamily from 'src/state/recoil/key-result/atom-family'
import selectLatestCheckIn from 'src/state/recoil/key-result/check-in/latest'
import removeTimelineEntry from 'src/state/recoil/key-result/timeline/remove-entry'

import KeyResultSectionTimelineCardCheckInComment from './comment'
import KeyResultSectionTimelineCardCheckInHelpText from './help-text'
import messages from './messages'
import KeyResultSectionTimelineCardCheckInProgressBar from './progress-bar'
import queries from './queries.gql'
import KeyResultSectionTimelineCardCheckInRelativeConfidenceTag from './relative-confidence-tag'
import { KeyResultSectionTimelineCardCheckInValue } from './value'
import KeyResultSectionTimelineCardCheckInValueIncrease from './value-increase'

export interface KeyResultSectionTimelineCardCheckInProperties {
  keyResultID: KeyResult['id']
  data?: Partial<KeyResultCheckIn>
  onEntryDelete?: (entryType: string) => void
}

export interface GetKeyResultWithLatestCheckInQuery {
  keyResult: KeyResult
}

const KeyResultSectionTimelineCardCheckIn = ({
  keyResultID,
  data,
  onEntryDelete,
}: KeyResultSectionTimelineCardCheckInProperties) => {
  const intl = useIntl()
  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))
  const removeEntryFromTimeline = useSetRecoilState(removeTimelineEntry(data?.keyResultId))
  const setLatestCheckIn = useSetRecoilState(selectLatestCheckIn(data?.keyResultId))
  const [getKeyResultWithLatestCheckIn] = useLazyQuery<GetKeyResultWithLatestCheckInQuery>(
    queries.GET_KEY_RESULT_WITH_LATEST_CHECK_IN,
    {
      onCompleted: (queryResult) => {
        const latestCheckIn = queryResult.keyResult?.keyResultCheckIns?.edges[0].node

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

  return (
    <Stat>
      <KeyResultSectionTimelineCardBase
        borderBottomRadius={0}
        policy={data?.policy}
        intlCardType={intlCardType}
        onDelete={handleDelete}
      >
        <Flex direction="column" gridGap={4}>
          <KeyResultSectionTimelineCardCheckInRelativeConfidenceTag
            currentConfidence={data?.confidence}
            parentConfidence={data?.parent?.confidence}
          />

          <Box>
            <StatLabel fontSize="lg" fontWeight={500} color="black.900">
              {intl.formatMessage(messages.title)}
            </StatLabel>

            <KeyResultSectionTimelineCardCheckInHelpText
              user={data?.user}
              createdAt={data?.createdAt}
            />
          </Box>

          <KeyResultSectionTimelineCardCheckInValue
            value={data?.value}
            confidence={data?.confidence}
            parent={data?.parent}
            format={keyResult?.format}
          />

          {data?.delta?.value !== 0 && (
            <KeyResultSectionTimelineCardCheckInValueIncrease
              progress={data?.progress}
              valueIncrease={data?.delta?.value}
              format={keyResult?.format}
              type={keyResult?.type}
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
