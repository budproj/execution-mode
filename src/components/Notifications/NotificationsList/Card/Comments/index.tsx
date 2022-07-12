import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { NOTIFICATIONS_TYPE } from 'src/components/Notifications/constants'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'

import { Notification } from '../../types'
import BaseCardNotification from '../Base'
import { NotificationKeyResult } from '../Base/KeyResult'

import messages from './messages'

const CommentNotification = ({ properties, timestamp, isRead, type }: Notification) => {
  const intl = useIntl()

  const setOpenDrawer = useSetRecoilState(keyResultReadDrawerOpenedKeyResultID)

  const openDrawer = () => setOpenDrawer(properties.keyResult?.id)

  const typeCommentNotificationMessage =
    type === NOTIFICATIONS_TYPE.COMMENT_ON_MY_KR
      ? intl.formatMessage(messages.commentOnMyKrNotification)
      : intl.formatMessage(messages.taggedOnCommentNotification)

  return (
    <BaseCardNotification
      describeBadgeAvatarIcon={
        type === NOTIFICATIONS_TYPE.COMMENT_ON_MY_KR
          ? messages.commentOnMyKrNotification
          : messages.commentOnMyKrNotification
      }
      timestamp={timestamp}
      isRead={isRead}
      sender={properties.sender}
      badgeIcon={
        type === NOTIFICATIONS_TYPE.COMMENT_ON_MY_KR
          ? NOTIFICATIONS_TYPE.COMMENT_ON_MY_KR
          : NOTIFICATIONS_TYPE.TAGGED_COMMENT
      }
      handleClick={openDrawer}
    >
      <Heading display="flex" width="100%" justifyContent="space-between" textAlign="left">
        <Box display="flex" alignItems="flex-start" justifyContent="center" flexDir="column">
          <Text fontSize={16} fontWeight="bold" color="new-gray.800">
            {properties.sender.name}
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
