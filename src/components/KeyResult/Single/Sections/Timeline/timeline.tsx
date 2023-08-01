import { useQuery } from '@apollo/client'
import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'

import { KeyResult, KeyResultTimelineEntry } from 'src/components/KeyResult/types'
import { GraphQLConnection } from 'src/components/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'

import KeyResultSectionTimelineContent from './Content'
import KeyResultSectionTimelineHeader from './Header/header'
import GET_KEY_RESULT_AND_RELATIONS from './queries.gql'

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
  const [timeline, setTimeline] = useRecoilState<
    GraphQLConnection<KeyResultTimelineEntry> | undefined
  >(timelineSelector(keyResultID))
  const resetTimeline = useResetRecoilState(timelineSelector(keyResultID))
  const hasTimeline = typeof timeline !== 'undefined'

  const handleQueryResult = (data: GetKeyResultTimelineWithIDQuery) => {
    const isInLimit =
      (data.keyResult.timeline && data.keyResult.timeline?.edges.length >= limit) ?? true

    if (data.keyResult.timeline) {
      setTimeline({
        ...data.keyResult.timeline,
        edges: [...(timeline?.edges ?? []), ...data.keyResult.timeline.edges],
      })
    }

    setHasMore(isInLimit)
  }

  const { fetchMore } = useQuery<GetKeyResultTimelineWithIDQuery>(GET_KEY_RESULT_AND_RELATIONS, {
    variables: {
      first: limit,
      id: keyResultID,
    },
    skip: hasTimeline,
    onCompleted: handleQueryResult,
    fetchPolicy: 'cache-and-network',
  })

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
  limit: 100,
}

export default KeyResultSectionTimeline
