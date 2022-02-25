import { FetchMoreQueryOptions, ApolloQueryResult } from '@apollo/client'
import { Flex, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { KeyResultSectionTimelineCardEmptyState } from 'src/components/KeyResult/Single/Sections/Timeline/Cards'
import { GetKeyResultTimelineWithIDQuery } from 'src/components/KeyResult/Single/Sections/Timeline/timeline'
import { KeyResult, KeyResultTimelineEntry } from 'src/components/KeyResult/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { keyResultTimelineIntlDeletedEntryType } from 'src/state/recoil/key-result/timeline'
import keyResultTimeline from 'src/state/recoil/key-result/timeline/selector'

import KeyResultSectionTimelineContentEntry from './entry'

export interface KeyResultSectionTimelineContentProperties {
  keyResultID: KeyResult['id']
  limit: number
  initialHasMore: boolean
  scrollTarget: string
  fetchMore: (
    options: FetchMoreQueryOptions<Record<string, any>, GetKeyResultTimelineWithIDQuery>,
  ) => Promise<ApolloQueryResult<GetKeyResultTimelineWithIDQuery>>
  onEntryDelete?: (entryType: string) => void
}

const KeyResultSectionTimelineContent = ({
  keyResultID,
  limit,
  initialHasMore,
  scrollTarget,
  fetchMore,
  onEntryDelete,
}: KeyResultSectionTimelineContentProperties) => {
  const [timelineConnection, setTimelineConnection] = useRecoilState(keyResultTimeline(keyResultID))
  const [timeline, setTimelineEdges] = useConnectionEdges<KeyResultTimelineEntry>()
  const [hasMore, setHasMore] = useState(initialHasMore)
  const setIntlDeletedEntryType = useSetRecoilState(
    keyResultTimelineIntlDeletedEntryType(keyResultID),
  )

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

  const handleEntryDelete = (entryType: string) => {
    setIntlDeletedEntryType(entryType)
    if (onEntryDelete) onEntryDelete(entryType)
  }

  useEffect(() => {
    if (timelineConnection) setTimelineEdges(timelineConnection.edges)
  }, [timelineConnection, setTimelineEdges])

  return timeline && timeline.length > 0 ? (
    <InfiniteScroll
      dataLength={timeline.length}
      next={handleInfiniteScroll}
      hasMore={hasMore}
      scrollableTarget={scrollTarget}
      style={{ overflow: 'visible' }}
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
            onEntryDelete={handleEntryDelete}
          />
        ))}
      </Flex>
    </InfiniteScroll>
  ) : (
    <KeyResultSectionTimelineCardEmptyState />
  )
}

export default KeyResultSectionTimelineContent
