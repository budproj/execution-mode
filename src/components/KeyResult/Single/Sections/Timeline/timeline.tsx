import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

import KeyResultSectionTimelineContent from './Content'
import KeyResultSectionTimelineSkeleton from './skeleton'

export interface KeyResultSectionTimelineProperties {
  keyResultID?: KeyResult['id']
}

const checkInsSelector = buildPartialSelector<KeyResult['keyResultCheckIns']>('keyResultCheckIns')

const KeyResultSectionTimeline = ({ keyResultID }: KeyResultSectionTimelineProperties) => {
  const checkIns = useRecoilValue(checkInsSelector(keyResultID))

  return (
    <Flex direction="column" gridGap={6}>
      {typeof checkIns === 'undefined' ? (
        <KeyResultSectionTimelineSkeleton />
      ) : (
        <KeyResultSectionTimelineContent checkIns={checkIns} />
      )}
    </Flex>
  )
}

export default KeyResultSectionTimeline
