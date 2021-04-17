import { FetchMoreQueryOptions, ApolloQueryResult } from '@apollo/client'
import { Flex, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useRecoilState } from 'recoil'

import { KeyResultSectionTimelineCardEmptyState } from 'src/components/KeyResult/Single/Sections/Timeline/Cards'
import { PERFECT_SCROLLBAR_ID } from 'src/components/KeyResult/Single/Sections/Timeline/constants'
import { GetKeyResultTimelineWithIDQuery } from 'src/components/KeyResult/Single/Sections/Timeline/timeline'
import { KeyResult, KeyResultTimelineEntry } from 'src/components/KeyResult/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import keyResultTimeline from 'src/state/recoil/key-result/timeline/selector'

import KeyResultSectionTimelineContentEntry from './entry'

export interface KeyResultSectionTimelineContentProperties {
  keyResultID: KeyResult['id']
  limit: number
  initialHasMore: boolean
  fetchMore: <K extends string>(
    options: FetchMoreQueryOptions<Record<string, any>, K, GetKeyResultTimelineWithIDQuery>,
  ) => Promise<ApolloQueryResult<GetKeyResultTimelineWithIDQuery>>
  onEntryDelete?: (entryType: string) => void
}

const KeyResultSectionTimelineContent = ({
  keyResultID,
  limit,
  initialHasMore,
  fetchMore,
  onEntryDelete,
}: KeyResultSectionTimelineContentProperties) => {
  const [timelineConnection, setTimelineConnection] = useRecoilState(keyResultTimeline(keyResultID))
  const [timeline, setTimelineEdges] = useConnectionEdges<KeyResultTimelineEntry>()
  const [hasMore, setHasMore] = useState(initialHasMore)

  const handleInfiniteScroll = async () => {
    const queryResult = await fetchMore({
      variables: {
        first: limit,
        id: keyResultID,
        after: timelineConnection?.pageInfo.endCursor,
      },
    })
    const nextPage = queryResult.data.keyResult.timeline

    setTimelineConnection(nextPage)
    if (nextPage && nextPage.edges.length < limit) setHasMore(false)
  }

  useEffect(() => {
    if (timelineConnection) setTimelineEdges(timelineConnection.edges)
  }, [timelineConnection, setTimelineEdges])

  return timeline && timeline.length > 0 ? (
    <InfiniteScroll
      dataLength={timeline.length}
      next={handleInfiniteScroll}
      hasMore={hasMore}
      scrollableTarget={PERFECT_SCROLLBAR_ID}
      style={{ overflowX: 'hidden' }}
      loader={
        <Flex direction="column" alignItems="center" p={4}>
          <Spinner size="lg" color="brand.400" />
        </Flex>
      }
    >
      <Flex direction="column" gridGap={4}>
        {timeline.map((entry) => (
          <KeyResultSectionTimelineContentEntry
            key={entry.id}
            keyResultID={keyResultID}
            typename={entry.__typename}
            data={entry}
            onEntryDelete={onEntryDelete}
          />
        ))}
      </Flex>
    </InfiniteScroll>
  ) : (
    <KeyResultSectionTimelineCardEmptyState />
  )
}

export default KeyResultSectionTimelineContent
