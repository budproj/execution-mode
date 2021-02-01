import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import {
  KeyResultSectionCheckIn,
  KeyResultSectionTimeline,
} from 'src/components/KeyResult/Single/Sections'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultDrawerLoaded } from 'src/state/recoil/key-result/drawer'

export interface KeyResultDrawerBodyProperties {
  keyResultID: KeyResult['id']
}

const KeyResultDrawerBody = ({ keyResultID }: KeyResultDrawerBodyProperties) => {
  const isLoaded = useRecoilValue(keyResultDrawerLoaded)

  return (
    <Flex gridGap={8} py={8} px={6} direction="column">
      <KeyResultSectionCheckIn keyResultID={keyResultID} />
      <KeyResultSectionTimeline keyResultID={keyResultID} isLoading={!isLoaded} />
    </Flex>
  )
}

export default KeyResultDrawerBody
