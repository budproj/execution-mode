import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'
import regexifyString from 'regexify-string'

import { NOTIFICATIONS_TYPE } from 'src/components/Notifications/constants'

import { Notification } from '../../types'
import BaseCardNotification from '../Base'
import { TaskNotificationContent } from '../Base/Task'

import messages from './messages'
import { taskDrawerIdAtom } from 'src/state/recoil/task-management/drawers/task-drawer/task-drawer-id'
import { taskDrawerAtom } from 'src/state/recoil/task-management/drawers/task-drawer/task-drawer'

const CommentOnTaskInProject = ({ properties, timestamp, isRead, type }: Notification) => {
  const intl = useIntl()
  const { push } = useRouter()
  const setTaskDrawer = useSetRecoilState(taskDrawerAtom)
  const setTaskDrawerId = useSetRecoilState(taskDrawerIdAtom)
  const boardLink = properties?.teamId
    ? `explore/${properties?.teamId}?activeTab=tasks`
    : '#'

  const typeCommentNotificationInTaskMessage =
    type === NOTIFICATIONS_TYPE.COMMENT_ON_TASK
      ? intl.formatMessage(messages.commentOnMyTaskNotification)
      : intl.formatMessage(messages.taggedOnCommentInTaskNotification)

  const commentText = regexifyString({
    pattern: /@\[[\w \u00C0-\u00FF-]+]\([\da-f-]+\)/g,
    decorator: (match) => {
      const regex = /@\[([\w \u00C0-\u00FF-]+)]\(([\da-f-]+)\)/
      const [_, name] = regex.exec(match) ?? [undefined, '', '']

      return (
        <Text as="span" color="brand.500" cursor="pointer">
          {name}
        </Text>
      )
    },
    input: properties.comment?.content ?? '',
  })

  return (
    <BaseCardNotification
      describeBadgeAvatarIcon={
        type === NOTIFICATIONS_TYPE.COMMENT_ON_TASK
          ? messages.commentOnMyTaskNotification
          : messages.taggedOnCommentInTaskNotification
      }
      timestamp={timestamp}
      isRead={isRead}
      sender={properties.sender}
      badgeIcon={
        type === NOTIFICATIONS_TYPE.COMMENT_ON_TASK
          ? NOTIFICATIONS_TYPE.COMMENT_ON_TASK
          : NOTIFICATIONS_TYPE.TAGGED_ON_TASK_IN_PROJECT
      }
      handleClick={ () => {
        push(boardLink)
        setTaskDrawer(properties?.taskBoard)
        setTaskDrawerId(properties?.taskBoard?._id)}
      }
    >
      <Heading display="flex" width="100%" justifyContent="space-between" textAlign="left">
        <Box display="flex" alignItems="flex-start" justifyContent="center" flexDir="column">
          <Text fontSize={16} fontWeight="bold" color="new-gray.800">
            {properties.sender.name}
          </Text>
          <Text fontSize={14} fontWeight="normal" color="new-gray.700">
            {typeCommentNotificationInTaskMessage}
          </Text>
        </Box>
      </Heading>
      <TaskNotificationContent TaskTitle={properties.keyResult?.name} />
      <Text textAlign="left" fontSize={14} position="relative">
        {commentText}
      </Text>
    </BaseCardNotification>
  )
}

export default CommentOnTaskInProject
