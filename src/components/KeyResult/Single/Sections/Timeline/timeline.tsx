import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useRecoilValue } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'
import { keyResultTimelineFetched } from 'src/state/recoil/key-result/timeline'

import KeyResultSectionTimelineContent from './Content'
import messages from './messages'
import KeyResultSectionTimelineSkeleton from './skeleton'

export interface KeyResultSectionTimelineProperties {
  keyResultID?: KeyResult['id']
  scrollBarRef?: PerfectScrollbar | null
}

const timelineSelector = buildPartialSelector<KeyResult['timeline']>('timeline')

const KeyResultSectionTimeline = ({
  keyResultID,
  scrollBarRef,
}: KeyResultSectionTimelineProperties) => {
  const intl = useIntl()
  const timeline = useRecoilValue(timelineSelector(keyResultID))
  const isLoaded = useRecoilValue(keyResultTimelineFetched(keyResultID))

  if (isLoaded && scrollBarRef) scrollBarRef.updateScroll()

  return (
    <Flex direction="column" gridGap={4}>
      <Heading as="h3" fontSize="sm" fontWeight={500} color="gray.400">
        {intl.formatMessage(messages.title)}
      </Heading>
      {isLoaded ? (
        <KeyResultSectionTimelineContent entries={timeline} />
      ) : (
        <KeyResultSectionTimelineSkeleton />
      )}
    </Flex>
  )
}

export default KeyResultSectionTimeline
