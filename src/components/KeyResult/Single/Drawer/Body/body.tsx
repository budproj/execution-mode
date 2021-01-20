import { Flex } from '@chakra-ui/react'
import React from 'react'

import {
  KeyResultSectionCheckIn,
  KeyResultSectionComments,
  KeyResultSectionCycle,
  KeyResultSectionDescription,
  KeyResultSectionObjective,
  KeyResultSectionOwner,
} from 'src/components/KeyResult/Single/Sections'
import { KeyResult } from 'src/components/KeyResult/types'

export interface KeyResultDrawerBodyProperties {
  keyResultID: KeyResult['id']
}

const KeyResultDrawerBody = ({ keyResultID }: KeyResultDrawerBodyProperties) => (
  <Flex gridGap={8} py={8} px={6} direction="column">
    <KeyResultSectionOwner keyResultID={keyResultID} />
    <KeyResultSectionObjective keyResultID={keyResultID} />
    <KeyResultSectionDescription keyResultID={keyResultID} />
    <KeyResultSectionCycle keyResultID={keyResultID} />
    <KeyResultSectionCheckIn keyResultID={keyResultID} />
    <KeyResultSectionComments keyResultID={keyResultID} />
  </Flex>
)

export default KeyResultDrawerBody
