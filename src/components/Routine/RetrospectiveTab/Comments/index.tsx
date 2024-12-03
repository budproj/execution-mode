import { List, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { User } from 'src/components/User/types'

import { AnswerType } from '../retrospective-tab-content'

import CommentCard from './CommentCard'
import RoutineCommentsEmptyState from './empty-state'
import messages from './messages'
import { Comment } from './types'

type RoutineCommentsProperties = {
  answerId: AnswerType['id']
  answerOwner?: User['firstName']
  comments: Comment[]
}

const RoutineComments = ({ answerId, answerOwner, comments }: RoutineCommentsProperties) => {
  const intl = useIntl()

  return (
    <Stack pt={7} pb={5} px={10} spacing={6}>
      <Text color="new=gray.900" fontSize={16} fontWeight="medium">
        {intl.formatMessage(messages.commentsSectionTitle)}
      </Text>
      <List>
        {comments && comments.length > 0 ? (
          comments.map(({ id, userId, content, createdAt, entity, isDeleted }) => (
            <CommentCard
              key={id}
              answerId={answerId}
              id={id}
              userId={userId}
              comment={content}
              timestamp={createdAt}
              entity={entity}
              isDeleted={isDeleted}
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
