import { useQuery } from '@apollo/client'
import { Flex, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useRecoilState, useResetRecoilState } from 'recoil'

import { KeyResult, KeyResultTimelineEntry } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

import KeyResultSectionTimelineContent from './Content'
import { PERFECT_SCROLLBAR_ID } from './constants'
import messages from './messages'
import queries from './queries.gql'
import KeyResultSectionTimelineSkeleton from './skeleton'

export interface KeyResultSectionTimelineProperties {
  limit: number
  keyResultID?: KeyResult['id']
  onScrollY?: () => void
  onScrollYReachStart?: () => void
  onEntryDelete?: (entryType: string) => void
}

export interface GetKeyResultTimelineWithIDQuery {
  keyResult: {
    id: KeyResult['id']
    timeline: KeyResultTimelineEntry[]
  }
}

const timelineSelector = buildPartialSelector<KeyResult['timeline']>('timeline')

const KeyResultSectionTimeline = ({
  keyResultID,
  limit,
  onScrollY,
  onScrollYReachStart,
  onEntryDelete,
}: KeyResultSectionTimelineProperties) => {
  const [hasMore, setHasMore] = useState(false)
  const intl = useIntl()
  const [timeline, setTimeline] = useRecoilState(timelineSelector(keyResultID))
  const resetTimeline = useResetRecoilState(timelineSelector(keyResultID))
  const hasTimeline = typeof timeline !== 'undefined'

  const handleQueryResult = (data: GetKeyResultTimelineWithIDQuery) => {
    const isInLimit = data.keyResult.timeline.length >= 10

    setTimeline(data.keyResult.timeline)
    setHasMore(isInLimit)
  }

  const { fetchMore } = useQuery<GetKeyResultTimelineWithIDQuery>(
    queries.GET_KEY_RESULT_TIMELINE_WITH_ID,
    {
      variables: {
        limit,
        id: keyResultID,
      },
      skip: hasTimeline,
      onCompleted: handleQueryResult,
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first',
    },
  )

  const handleTimelineReset = async () => {
    resetTimeline()

    const { data } = await fetchMore({
      variables: {
        limit,
        id: keyResultID,
      },
    })
    setTimeline(data.keyResult.timeline)
  }

  const handleEntryDelete = async (entryType: string) => {
    await handleTimelineReset()
    if (onEntryDelete) onEntryDelete(entryType)
  }

  return (
    <PerfectScrollbar
      id={PERFECT_SCROLLBAR_ID}
      options={{ suppressScrollX: true }}
      onScrollY={onScrollY}
      onYReachStart={onScrollYReachStart}
    >
      <Flex direction="column" gridGap={4} p={4}>
        <Heading as="h3" fontSize="sm" fontWeight={500} color="uniqueGray.300">
          {intl.formatMessage(messages.title)}
        </Heading>
        {keyResultID && hasTimeline ? (
          <KeyResultSectionTimelineContent
            keyResultID={keyResultID}
            limit={limit}
            initialHasMore={hasMore}
            fetchMore={fetchMore}
            onEntryDelete={handleEntryDelete}
          />
        ) : (
          <KeyResultSectionTimelineSkeleton />
        )}
      </Flex>
    </PerfectScrollbar>
  )
}

KeyResultSectionTimeline.defaultProps = {
  limit: 10,
}

export default KeyResultSectionTimeline
