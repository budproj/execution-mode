import { Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { commentsAtom } from 'src/state/recoil/comments/comments'

import CommentCard from './CommentCard'
import RoutineCommentsEmptyState from './empty-state'
import messages from './messages'

const RoutineComments = () => {
  const intl = useIntl()
  const comments = useRecoilValue(commentsAtom)

  return (
    <Stack pt={4} spacing={6} w="full">
      <Text color="new=gray.900" fontSize={16} fontWeight="medium">
        {intl.formatMessage(messages.commentsSectionTitle)}
      </Text>
      {comments.length > 0 ? (
        comments.map(({ id, userId, content, createdAt }) => (
          <CommentCard key={id} userId={userId} comment={content} timestamp={createdAt} />
        ))
      ) : (
        <RoutineCommentsEmptyState answerOwner="Ana" />
      )}
    </Stack>
  )
}

export default RoutineComments
