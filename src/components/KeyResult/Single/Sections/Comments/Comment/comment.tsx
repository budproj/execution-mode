import { Box } from '@chakra-ui/react'
import React from 'react'
import { ProgressReport } from 'src/components/KeyResult/types'
import { User } from 'src/components/User/types'
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
  <Box borderWidth="1px" borderColor="gray.100" py="18px" px="25px">
    <KeyResultSectionCommentsCommentHead user={user} createdAt={createdAt} />
  </Box>
)

export default KeyResultSectionCommentsComment
