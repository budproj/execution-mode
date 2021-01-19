import { Flex } from '@chakra-ui/react'
import React from 'react'

import { ProgressReport } from 'src/components/KeyResult/types'
import { User } from 'src/components/User/types'

import KeyResultSectionCommentsCommentBody from './Body'
import KeyResultSectionCommentsCommentHead from './Head'

export interface KeyResultSectionCommentsCommentProperties {
  user?: User
  createdAt?: ProgressReport['createdAt']
  comment?: ProgressReport['comment']
}

const KeyResultSectionCommentsComment = ({
  user,
  createdAt,
  comment,
}: KeyResultSectionCommentsCommentProperties) => (
  <Flex borderWidth="1px" borderColor="gray.100" py="18px" px="25px" gridGap={4} direction="column">
    <KeyResultSectionCommentsCommentHead user={user} createdAt={createdAt} />
    <KeyResultSectionCommentsCommentBody comment={comment} />
  </Flex>
)

export default KeyResultSectionCommentsComment
