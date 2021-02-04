import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'
import { keyResultTimelineFetched } from 'src/state/recoil/key-result/timeline'

import KeyResultSectionTimelineContent from './Content'
import KeyResultSectionTimelineSkeleton from './skeleton'

export interface KeyResultSectionTimelineProperties {
  keyResultID?: KeyResult['id']
}

const checkInsSelector = buildPartialSelector<KeyResult['keyResultCheckIns']>('keyResultCheckIns')

const KeyResultSectionTimeline = ({ keyResultID }: KeyResultSectionTimelineProperties) => {
  const checkIns = useRecoilValue(checkInsSelector(keyResultID))
  const isLoaded = useRecoilValue(keyResultTimelineFetched(keyResultID))

  return (
    <Flex direction="column" gridGap={6}>
      {isLoaded ? (
        <KeyResultSectionTimelineContent checkIns={checkIns} />
      ) : (
        <KeyResultSectionTimelineSkeleton />
      )}
    </Flex>
  )
}

export default KeyResultSectionTimeline
