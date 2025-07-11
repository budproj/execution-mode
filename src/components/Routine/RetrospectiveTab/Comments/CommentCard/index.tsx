import { Flex, Text, VStack, Avatar, Button, HStack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useQueryClient } from '@tanstack/react-query'
import React, { useMemo, useContext, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import regexifyString from 'regexify-string'

import { ConfirmationDialog } from 'src/components/Base/Dialogs/Confirmation/Base/wrapper'
import LastUpdateText from 'src/components/Base/LastUpdateText'
import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { useGetUserDetails } from 'src/components/User/hooks'
import { User } from 'src/components/User/types'
import { commentInputInitialValue } from 'src/state/recoil/comments/input'
import { commentEntityToReply } from 'src/state/recoil/comments/reply-comment'
import meAtom from 'src/state/recoil/user/me'

import { COMMENT_DOMAIN } from '../../Answers/utils/constants'
import { AnswerType } from '../../types'
import { Comment } from '../types'

import messages from './messages'

interface CommentCard {
  answerId: AnswerType['id']
  userId: User['id']
  id: Comment['id']
  timestamp: Date
  comment: string
  entity: Comment['entity']
  isDeleted: Comment['isDeleted']
}

export const MarkedUser = ({ name }: { name?: string }) => (
  <Text as="span" color="brand.500" fontSize={14} fontWeight="bold">
    {name}
  </Text>
)

const StyledListItem = styled.span`
  display: block;
`

export const insertMentionInString = (comment: string) => {
  return regexifyString({
    pattern: /@\[[\w \u00C0-\u00FF-]+]\([\da-f-]+\)/g,
    decorator: (match) => {
      const regex = /@\[([\w \u00C0-\u00FF-]+)]\(([\da-f-]+)\)/
      const [_, username] = regex.exec(match) ?? [undefined, '', '']

      return <MarkedUser name={username} />
    },
    input: comment ?? '',
  })
}

const CommentCard = ({
  answerId,
  id,
  userId,
  timestamp,
  comment,
  entity,
  isDeleted,
}: CommentCard) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const { servicesPromise } = useContext(ServicesContext)
  const queryClient = useQueryClient()

  const origin_entity = `${COMMENT_DOMAIN.routine}:${answerId}`

  const logged_user = useRecoilValue(meAtom)

  const { data: user } = useGetUserDetails(userId)
  const setCommentInputValue = useSetRecoilState(commentInputInitialValue)
  const setCommentEntityToReply = useSetRecoilState(commentEntityToReply)

  const intl = useIntl()

  const timestampConverted = new Date(timestamp)

  const commentText = useMemo(() => {
    return comment
      .split('\n')
      .map((line) => <StyledListItem key={line}>{insertMentionInString(line)}</StyledListItem>)
  }, [comment])

  const entityToReply = `${entity}:${id}`

  const userToMark = `@[${user?.fullName ?? ''}](${user?.id ?? ''})`

  const handleClose = () => {
    if (isDialogOpen) setIsDialogOpen(false)
  }

  const handleDeleteComment = async () => {
    const { comments } = await servicesPromise
    await comments.delete<Comment[]>(`/comments/${id}`).catch((error) => {
      console.error(error)
      return { data: undefined }
    })
    queryClient.invalidateQueries({ queryKey: [`routines:getCommentsByEntity`] })
  }

  const handleReplyComment = () => {
    setCommentInputValue({ text: `${userToMark} ` })
    setCommentEntityToReply(entityToReply)
  }

  const isCommentOwner = userId === logged_user

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
        <Text wordBreak="break-word" fontSize={14} color={isDeleted ? 'gray.400' : 'new-gray.900'}>
          {isDeleted ? 'Comentario excluido' : commentText}
        </Text>
        {!isDeleted && (
          <Flex>
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
            {isCommentOwner && (
              <Button
                p={0}
                paddingLeft={3}
                color="brand.500"
                fontSize={14}
                fontWeight="normal"
                height="24px"
                onClick={() => setIsDialogOpen(true)}
              >
                {intl.formatMessage(messages.excludeCommentButton)}
              </Button>
            )}
            <ConfirmationDialog
              isOpen={isDialogOpen}
              headerImageURL="/images/bud-trash-bin.png"
              title={intl.formatMessage(messages.deleteDialogTitle)}
              onConfirm={handleDeleteComment}
              onClose={handleClose}
            />
          </Flex>
        )}
      </VStack>
    </HStack>
  )
}

export default CommentCard
