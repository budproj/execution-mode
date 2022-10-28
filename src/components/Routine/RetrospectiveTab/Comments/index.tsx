import { List, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { User } from 'src/components/User/types'
import { commentsAtom } from 'src/state/recoil/comments/comments'

import CommentCard from './CommentCard'
import RoutineCommentsEmptyState from './empty-state'
import messages from './messages'

type RoutineCommentsProperties = {
  answerOwner?: User['firstName']
}

const RoutineComments = ({ answerOwner }: RoutineCommentsProperties) => {
  const intl = useIntl()
  const comments = useRecoilValue(commentsAtom)

  return (
    <Stack pt={7} pb={5} px={10} spacing={6} w="full">
      <Text color="new=gray.900" fontSize={16} fontWeight="medium">
        {intl.formatMessage(messages.commentsSectionTitle)}
      </Text>
      <List>
        {comments.length > 0 ? (
          comments.map(({ id, userId, content, createdAt, entity }) => (
            <CommentCard
              key={id}
              id={id}
              userId={userId}
              comment={content}
              timestamp={createdAt}
              entity={entity}
            />
          ))
        ) : (
          <RoutineCommentsEmptyState answerOwner={answerOwner} />
        )}
      </List>
    </Stack>
  )
}

export default RoutineComments
