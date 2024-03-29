import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'
import regexifyString from 'regexify-string'

import { NOTIFICATIONS_TYPE } from 'src/components/Notifications/constants'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'

import { Notification } from '../../types'
import BaseCardNotification from '../Base'
import { KeyResultNotificationContent } from '../Base/KeyResult'

import messages from './messages'

const CommentNotification = ({ properties, timestamp, isRead, type }: Notification) => {
  const intl = useIntl()

  const setOpenDrawer = useSetRecoilState(keyResultReadDrawerOpenedKeyResultID)

  const openDrawer = () => setOpenDrawer(properties.keyResult?.id)

  const typeCommentNotificationMessage =
    type === NOTIFICATIONS_TYPE.COMMENT_ON_MY_KR
      ? intl.formatMessage(messages.commentOnMyKrNotification)
      : intl.formatMessage(messages.taggedOnCommentNotification)

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
        type === NOTIFICATIONS_TYPE.COMMENT_ON_MY_KR
          ? messages.commentOnMyKrNotification
          : messages.taggedOnCommentNotification
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
      <KeyResultNotificationContent keyResultTitle={properties.keyResult?.name} />
      <Text textAlign="left" fontSize={14} position="relative">
        {commentText}
      </Text>
    </BaseCardNotification>
  )
}

export default CommentNotification
