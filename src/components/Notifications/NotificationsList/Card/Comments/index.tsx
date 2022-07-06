import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { NOTIFICATIONS_TYPE } from 'src/components/Notifications/constants'

import { NotificationsProperties } from '../../types'
import BaseCardNotification from '../Base'
import { NotificationKeyResult } from '../Base/KeyResult'

import messages from './messages'

export interface CommentNotificationProperties extends NotificationsProperties {
  keyResult?: {
    id: string
    name: string
  }
  comment?: {
    id: string
    content: string
  }
}

const CommentNotification = ({ ...properties }: CommentNotificationProperties) => {
  const intl = useIntl()

  const typeCommentNotificationMessage =
    properties.type === NOTIFICATIONS_TYPE.COMMENT_ON_MY_KR
      ? intl.formatMessage(messages.commentOnMyKrNotification)
      : intl.formatMessage(messages.taggedOnCommentNotification)

  return (
    <BaseCardNotification
      describeBadgeAvatarIcon={
        properties.type === NOTIFICATIONS_TYPE.COMMENT_ON_MY_KR
          ? messages.commentOnMyKrNotification
          : messages.commentOnMyKrNotification
      }
      timestamp={properties.timestamp}
      isRead={properties.isRead}
      sender={properties.sender}
      badgeIcon={
        properties.type === NOTIFICATIONS_TYPE.COMMENT_ON_MY_KR
          ? NOTIFICATIONS_TYPE.COMMENT_ON_MY_KR
          : NOTIFICATIONS_TYPE.TAGGED_COMMENT
      }
    >
      <Heading display="flex" width="100%" justifyContent="space-between" textAlign="left">
        <Box display="flex" alignItems="flex-start" justifyContent="center" flexDir="column">
          <Text fontSize={16} fontWeight="bold" color="new-gray.800">
            {properties.sender?.name}
          </Text>
          <Text fontSize={14} fontWeight="normal" color="new-gray.700">
            {typeCommentNotificationMessage}
          </Text>
        </Box>
      </Heading>
      <NotificationKeyResult keyResult={properties.keyResult?.name} />
      <Text textAlign="left" fontSize={14} color="#525F7F">
        {properties.comment?.content}
      </Text>
    </BaseCardNotification>
  )
}

export default CommentNotification
