import { Box, DrawerHeader, useTheme, Collapse } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { KeyResultSectionCheckIn } from 'src/components/KeyResult/Single/Sections'
import KeyResultSingleTitle from 'src/components/KeyResult/Single/Sections/Title'
import { KeyResult } from 'src/components/KeyResult/types'
import { authzPoliciesKeyResult } from 'src/state/recoil/authz/policies'
import { AUTHZ_POLICY } from 'src/state/recoil/authz/policies/constants'

export interface KeyResultDrawerHeaderProperties {
  keyResultID?: KeyResult['id']
  isScrolling?: boolean
}

const KeyResultDrawerHeader = ({ keyResultID, isScrolling }: KeyResultDrawerHeaderProperties) => {
  const keyResultPolicies = useRecoilValue(authzPoliciesKeyResult(keyResultID))
  const theme = useTheme()

  const policies = keyResultPolicies.childEntities.keyResultCheckIn
  const canUpdate = policies?.create === AUTHZ_POLICY.ALLOW

  return (
    <Box position="sticky" top={0} bg="white" zIndex={theme.zIndices.tooltip}>
      <DrawerHeader bg="blue.50" p={4} borderColor="gray.200" borderBottomWidth={1}>
        <KeyResultSingleTitle keyResultID={keyResultID} />
      </DrawerHeader>

      <Collapse in={!isScrolling && canUpdate}>
        <Box pb={2} pt={4} px={4}>
          <KeyResultSectionCheckIn keyResultID={keyResultID} />
        </Box>
      </Collapse>
    </Box>
  )
}

export default KeyResultDrawerHeader
