import { Flex, Heading, Spinner } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useRecoilValue } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'
import { keyResultTimelineFetched } from 'src/state/recoil/key-result/timeline'

import KeyResultSectionTimelineContent from './Content'
import messages from './messages'
import KeyResultSectionTimelineSkeleton from './skeleton'

export interface KeyResultSectionTimelineProperties {
  keyResultID?: KeyResult['id']
  scrollBarRef?: PerfectScrollbar | null
  isLoading?: boolean
}

const timelineSelector = buildPartialSelector<KeyResult['timeline']>('timeline')

const KeyResultSectionTimeline = ({
  keyResultID,
  scrollBarRef,
  isLoading,
}: KeyResultSectionTimelineProperties) => {
  const intl = useIntl()
  const timeline = useRecoilValue(timelineSelector(keyResultID))
  const isFetched = useRecoilValue(keyResultTimelineFetched(keyResultID))

  if (isFetched && scrollBarRef) scrollBarRef.updateScroll()

  return (
    <Flex direction="column" gridGap={4}>
      <Heading as="h3" fontSize="sm" fontWeight={500} color="gray.400">
        {intl.formatMessage(messages.title)}
      </Heading>
      {isFetched ? (
        <KeyResultSectionTimelineContent entries={timeline} />
      ) : (
        <KeyResultSectionTimelineSkeleton />
      )}
      {isLoading && (
        <Flex direction="column" alignItems="center" py={4}>
          <Spinner size="lg" color="brand.400" />
        </Flex>
      )}
    </Flex>
  )
}

export default KeyResultSectionTimeline
