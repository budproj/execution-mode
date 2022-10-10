import { Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import CommentCard from './CommentCard'
import RoutineCommentsEmptyState from './empty-state'
import messages from './messages'

type Comment = {
  id: string
  user: {
    fullName: string
    picture: string
  }
  comment: string
  timestamp: Date
}

const commentsMocked: Comment[] = [
  {
    id: '67f37794-c0b9-4278-a4fc-499b4d806a77',
    user: {
      fullName: 'Ana Amaral',
      picture: 'https://i.pinimg.com/originals/72/c3/3b/72c33b5df086100cfcd1c29aa02020b6.png',
    },
    comment:
      'Lucas, posso te ajudar a dividir algumas das tarefas da Fabia! @[Marco](9ce87eda-64d1-4bfb-80a5-aa7811a04ea9), tudo bem por você? ',
    timestamp: new Date(2022, 9, 6),
  },
]

const RoutineComments = () => {
  const intl = useIntl()

  return (
    <Stack pt={4} spacing={6} w="full">
      <Text color="new=gray.900" fontSize={16} fontWeight="medium">
        {intl.formatMessage(messages.commentsSectionTitle)}
      </Text>
      {commentsMocked.length > 0 ? (
        commentsMocked.map(({ id, user, comment, timestamp }) => (
          <CommentCard
            key={id}
            username={user.fullName}
            comment={comment}
            picture={user.picture}
            timestamp={timestamp}
          />
        ))
      ) : (
        <RoutineCommentsEmptyState answerOwner="Ana" />
      )}
    </Stack>
  )
}

export default RoutineComments
