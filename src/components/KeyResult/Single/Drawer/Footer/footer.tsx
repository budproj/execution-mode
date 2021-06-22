import { Box } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { KeyResultSectionAddComment } from 'src/components/KeyResult/Single/Sections'
import { KeyResult } from 'src/components/KeyResult/types'
import { GraphQLEffect } from 'src/components/types'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

export interface KeyResultDrawerFooterProperties {
  keyResultID?: KeyResult['id']
}

const KeyResultDrawerFooter = ({ keyResultID }: KeyResultDrawerFooterProperties) => {
  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))

  const commentPolicy = keyResult?.keyResultComments?.policy
  const canCreate = commentPolicy?.create === GraphQLEffect.ALLOW && keyResult?.status?.isActive

  return canCreate ? (
    <Box p={4} boxShadow="with-stroke.light" borderColor="new-gray.200" borderTopWidth={1}>
      <KeyResultSectionAddComment keyResultID={keyResultID} />
    </Box>
  ) : // eslint-disable-next-line unicorn/no-null
  null
}

export default KeyResultDrawerFooter
