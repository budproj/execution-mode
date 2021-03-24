import { Box } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { KeyResultSectionAddComment } from 'src/components/KeyResult/Single/Sections'
import { KeyResult } from 'src/components/KeyResult/types'
import { authzPoliciesKeyResult } from 'src/state/recoil/authz/policies'
import { AUTHZ_POLICY } from 'src/state/recoil/authz/policies/constants'

export interface KeyResultDrawerFooterProperties {
  keyResultID?: KeyResult['id']
}

const KeyResultDrawerFooter = ({ keyResultID }: KeyResultDrawerFooterProperties) => {
  const keyResultPolicies = useRecoilValue(authzPoliciesKeyResult(keyResultID))

  const commentPolicies = keyResultPolicies.childEntities.keyResultComment
  const canCreate = commentPolicies?.create === AUTHZ_POLICY.ALLOW

  return canCreate ? (
    <Box p={4} boxShadow="md">
      <KeyResultSectionAddComment keyResultID={keyResultID} />
    </Box>
  ) : // eslint-disable-next-line unicorn/no-null
  null
}

export default KeyResultDrawerFooter
