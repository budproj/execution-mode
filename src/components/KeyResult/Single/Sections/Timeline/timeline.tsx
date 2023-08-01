import { useQuery } from '@apollo/client'
import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

import KeyResultSectionTimelineContent from './Content'
import KeyResultSectionTimelineHeader from './Header/header'
import queries from './queries.gql'

export interface KeyResultSectionTimelineProperties {
  limit: number
  scrollTarget: string
  keyResultID?: KeyResult['id']
  newCheckInValue?: number
  isDraft?: boolean
  onEntryDelete?: (entryType: string) => void
}

export interface GetKeyResultTimelineWithIDQuery {
  keyResult: KeyResult
}

const timelineSelector = buildPartialSelector<KeyResult['timeline']>('timeline')

const KeyResultSectionTimeline = ({
  keyResultID,
  limit,
  scrollTarget,
  onEntryDelete,
  isDraft,
  newCheckInValue,
}: KeyResultSectionTimelineProperties) => {
  const [hasMore, setHasMore] = useState(false)
  const [timeline, setTimeline] = useRecoilState(timelineSelector(keyResultID))
  const resetTimeline = useResetRecoilState(timelineSelector(keyResultID))
  const hasTimeline = typeof timeline !== 'undefined'

  const handleQueryResult = (data: GetKeyResultTimelineWithIDQuery) => {
    const isInLimit =
      (data.keyResult.timeline && data.keyResult.timeline?.edges.length >= 10) ?? true

    setTimeline(data.keyResult.timeline)
    setHasMore(isInLimit)
  }

  const { fetchMore } = useQuery<GetKeyResultTimelineWithIDQuery>(
    queries.GET_KEY_RESULT_TIMELINE_WITH_ID,
    {
      variables: {
        first: limit,
        id: keyResultID,
      },
      skip: hasTimeline,
      onCompleted: handleQueryResult,
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-and-network',
    },
  )

  const handleTimelineReset = async () => {
    resetTimeline()

    const { data } = await fetchMore({
      variables: {
        first: limit,
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
    <Flex direction="column" gridGap={4}>
      {!isDraft && (
        <KeyResultSectionTimelineHeader
          keyResultID={keyResultID}
          newCheckInValue={newCheckInValue}
        />
      )}
      {keyResultID && hasTimeline ? (
        <KeyResultSectionTimelineContent
          keyResultID={keyResultID}
          limit={limit}
          initialHasMore={hasMore}
          fetchMore={fetchMore}
          scrollTarget={scrollTarget}
          onEntryDelete={handleEntryDelete}
        />
      ) : // eslint-disable-next-line unicorn/no-null
      null}
    </Flex>
  )
}

KeyResultSectionTimeline.defaultProps = {
  limit: 10,
}

export default KeyResultSectionTimeline
