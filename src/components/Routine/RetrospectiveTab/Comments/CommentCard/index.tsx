import { Flex, Text, VStack, Avatar, Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'
import regexifyString from 'regexify-string'

import LastUpdateText from 'src/components/Base/LastUpdateText'
import { useGetUserDetails } from 'src/components/User/hooks'
import { User } from 'src/components/User/types'
import { commentInputInitialValue } from 'src/state/recoil/comments/input'
import { commentEntityToReply } from 'src/state/recoil/comments/reply-comment'

import { Comment } from '../types'

import messages from './messages'

interface CommentCard {
  userId: User['id']
  id: Comment['id']
  timestamp: Date
  comment: string
  entity: Comment['entity']
}

export const MarkedUser = ({ name }: { name?: string }) => (
  <Text as="span" color="brand.500" fontSize={14} fontWeight="bold">
    {name}
  </Text>
)

const CommentCard = ({ id, userId, timestamp, comment, entity }: CommentCard) => {
  const { data: user } = useGetUserDetails(userId)
  const setCommentInputValue = useSetRecoilState(commentInputInitialValue)
  const setCommentEntityToReply = useSetRecoilState(commentEntityToReply)

  const intl = useIntl()

  const timestampConverted = new Date(timestamp)

  const commentText = regexifyString({
    pattern: /@\[[\w \u00C0-\u00FF-]+]\([\da-f-]+\)/g,
    decorator: (match) => {
      const regex = /@\[([\w \u00C0-\u00FF-]+)]\(([\da-f-]+)\)/
      const [_, username] = regex.exec(match) ?? [undefined, '', '']

      return <MarkedUser name={username} />
    },
    input: comment ?? '',
  })

  const entityToReply = `${entity}:${id}`

  const userToMark = `@[${user?.fullName ?? ''}](${user?.id ?? ''})`

  const handleReplyComment = () => {
    setCommentInputValue({ text: `${userToMark} ` })
    setCommentEntityToReply(entityToReply)
  }

  return (
    <HStack spacing={4} my={1} alignItems="flex-start" justifyContent="flex-start" width="full">
      <Avatar width="45px" height="45px" src={user?.picture} />
      <VStack spacing={1} align="flex-start">
        <Flex textAlign="left" gap={3} w="full" alignItems="center">
          <Text color="black.900" fontWeight="medium" fontSize={14}>
            {user?.fullName}
          </Text>
          <LastUpdateText
            cursor="default"
            date={timestampConverted}
            prefix={Date.now() > timestampConverted.getTime() ? '' : 'há'}
            fontSize={12}
            color="new-gray.600"
            textAlign="right"
          />
        </Flex>
        <Text fontSize={14} color="new-gray.900">
          {commentText}
        </Text>
        <Button
          p={0}
          color="brand.500"
          fontSize={14}
          fontWeight="normal"
          height="24px"
          onClick={handleReplyComment}
        >
          {intl.formatMessage(messages.replyCommentButton)}
        </Button>
      </VStack>
    </HStack>
  )
}

export default CommentCard
