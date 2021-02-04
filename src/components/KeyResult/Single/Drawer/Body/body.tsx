import { Flex } from '@chakra-ui/react'
import React from 'react'

import {
  KeyResultSectionCheckIn,
  KeyResultSectionTimeline,
} from 'src/components/KeyResult/Single/Sections'
import { KeyResult } from 'src/components/KeyResult/types'

export interface KeyResultDrawerBodyProperties {
  keyResultID: KeyResult['id']
}

const KeyResultDrawerBody = ({ keyResultID }: KeyResultDrawerBodyProperties) => (
  <Flex gridGap={8} py={8} px={6} direction="column">
    <KeyResultSectionCheckIn keyResultID={keyResultID} />
    <KeyResultSectionTimeline keyResultID={keyResultID} />
  </Flex>
)

export default KeyResultDrawerBody
