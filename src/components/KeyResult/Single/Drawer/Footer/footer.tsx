import { Box, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'

import { KeyResultSectionAddComment } from 'src/components/KeyResult/Single/Sections'
import { COMMENT_TYPE, KEY_RESULT_MODE } from 'src/components/KeyResult/constants'
import { KeyResult } from 'src/components/KeyResult/types'
import { GraphQLEffect } from 'src/components/types'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import FeedbackOptions from './FeedbackOptions'

export interface KeyResultDrawerFooterProperties {
  keyResultID?: KeyResult['id']
}

const KeyResultDrawerFooter = ({ keyResultID }: KeyResultDrawerFooterProperties) => {
  const keyResult = useRecoilValue(keyResultAtomFamily(keyResultID))

  const commentPolicy = keyResult?.keyResultComments?.policy
  const canCreate = commentPolicy?.create === GraphQLEffect.ALLOW && keyResult?.status?.isActive
  const isDraft = keyResult?.mode === KEY_RESULT_MODE.DRAFT
  const [selectedValue, setSelectedValue] = useState<COMMENT_TYPE | undefined>(() =>
    isDraft ? COMMENT_TYPE.PRAISAL : undefined,
  )

  return canCreate ? (
    <Flex alignItems="center" px={4} gap={1}>
      <Box
        boxShadow="with-stroke.light"
        borderColor="new-gray.200"
        borderTopWidth={1}
        py={4}
        width="100%"
        position="relative"
      >
        <KeyResultSectionAddComment keyResultID={keyResultID} type={selectedValue} />
      </Box>
      {isDraft ? (
        <FeedbackOptions
          selectedValue={selectedValue ?? COMMENT_TYPE.PRAISAL}
          setFeedbackOption={setSelectedValue}
        />
      ) : undefined}
    </Flex>
  ) : // eslint-disable-next-line unicorn/no-null
  null
}

export default KeyResultDrawerFooter
