import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import {
  KeyResultSectionCheckIn,
  KeyResultSectionComments,
  KeyResultSectionCycle,
  KeyResultSectionDescription,
  KeyResultSectionObjective,
  KeyResultSectionOwner,
} from 'src/components/KeyResult/Single/Sections'
import { KeyResult } from 'src/components/KeyResult/types'
import { USER_POLICY } from 'src/components/User/constants'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

export interface KeyResultDrawerBodyProperties {
  keyResultID: KeyResult['id']
}

const policiesSelector = buildPartialSelector<KeyResult['policies']>('policies')

const KeyResultDrawerBody = ({ keyResultID }: KeyResultDrawerBodyProperties) => {
  const policies = useRecoilValue(policiesSelector(keyResultID))

  const canUpdate = policies?.update === USER_POLICY.ALLOW

  return (
    <Flex gridGap={8} py={8} px={6} direction="column">
      <KeyResultSectionOwner keyResultID={keyResultID} />
      <KeyResultSectionObjective keyResultID={keyResultID} />
      <KeyResultSectionDescription keyResultID={keyResultID} />
      <KeyResultSectionCycle keyResultID={keyResultID} />
      {canUpdate && <KeyResultSectionCheckIn keyResultID={keyResultID} />}
      <KeyResultSectionComments keyResultID={keyResultID} />
    </Flex>
  )
}

export default KeyResultDrawerBody
