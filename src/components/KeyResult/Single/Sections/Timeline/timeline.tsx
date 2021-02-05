import { Flex } from '@chakra-ui/react'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useRecoilValue } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'
import { keyResultTimelineFetched } from 'src/state/recoil/key-result/timeline'

import KeyResultSectionTimelineContent from './Content'
import KeyResultSectionTimelineSkeleton from './skeleton'

export interface KeyResultSectionTimelineProperties {
  keyResultID?: KeyResult['id']
  scrollBarRef?: PerfectScrollbar | null
}

const checkInsSelector = buildPartialSelector<KeyResult['keyResultCheckIns']>('keyResultCheckIns')

const KeyResultSectionTimeline = ({
  keyResultID,
  scrollBarRef,
}: KeyResultSectionTimelineProperties) => {
  const checkIns = useRecoilValue(checkInsSelector(keyResultID))
  const isLoaded = useRecoilValue(keyResultTimelineFetched(keyResultID))

  if (isLoaded && scrollBarRef) scrollBarRef.updateScroll()

  return (
    <Flex direction="column" gridGap={4}>
      {isLoaded ? (
        <KeyResultSectionTimelineContent checkIns={checkIns} />
      ) : (
        <KeyResultSectionTimelineSkeleton />
      )}
    </Flex>
  )
}

export default KeyResultSectionTimeline
