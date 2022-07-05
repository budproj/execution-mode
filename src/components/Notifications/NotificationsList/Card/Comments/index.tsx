import { Avatar, AvatarBadge, Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import LastUpdateText from 'src/components/Base/LastUpdateText'
import CircleIcon from 'src/components/Icon/Circle'
import { KeyResultDynamicIcon } from 'src/components/KeyResult'
import { NOTIFICATIONS_TYPE } from 'src/components/Notifications/constants'

import { NotificationsProperties } from '../../types'
import { BadgeAvatarIcon } from '../Avatar'

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
  const checkinDate = properties?.timestamp ? new Date(properties.timestamp) : undefined
  const intl = useIntl()

  const typeCommentNotificationMessage =
    properties.type === NOTIFICATIONS_TYPE.COMMENT_ON_MY_KR
      ? intl.formatMessage(messages.commentOnMyKrNotification)
      : intl.formatMessage(messages.taggedOnCommentNotification)

  return (
    <Box
      bg={properties.isRead ? undefined : 'new-gray.50'}
      paddingY={6}
      paddingX={2}
      maxW="100%"
      display="flex"
      position="relative"
      alignItems="flex-start"
      justifyContent="flex-start"
      gap={6}
    >
      <Avatar src={properties.sender?.picture}>
        <AvatarBadge boxSize="1.2em" border="none">
          <BadgeAvatarIcon
            desc="qsdas"
            typeNotification={
              properties.type === NOTIFICATIONS_TYPE.COMMENT_ON_MY_KR
                ? NOTIFICATIONS_TYPE.COMMENT_ON_MY_KR
                : NOTIFICATIONS_TYPE.TAGGED_COMMENT
            }
          />
        </AvatarBadge>
      </Avatar>
      <Flex flexDir="column" alignItems="flex-start" justifyContent="center" gap={3}>
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
        <Flex alignItems="flex-start" justifyContent="center" gap={2}>
          <KeyResultDynamicIcon iconSize={5} boxSize={7} borderRadius={4} title="comment" />
          <Text color="new-gray.800" fontWeight="bold" fontSize={14}>
            {properties.keyResult?.name}
          </Text>
        </Flex>
        <Text textAlign="left" fontSize={14} color="#525F7F">
          {properties.comment?.content}
        </Text>
      </Flex>
      {!properties.isRead && (
        <CircleIcon
          position="absolute"
          desc="sa"
          fill="#6F6EFF"
          w={4}
          h={4}
          right={2}
          top="50%"
          transform="translate(0, -50%)"
        />
      )}
      <LastUpdateText
        date={checkinDate ?? new Date('2022-06-27')}
        prefix={Date.now() > new Date('2022-06-27').getTime() ? '' : 'há'}
        fontSize={12}
        position="absolute"
        fontWeight="normal"
        right={2}
        top={5}
        color="new-gray.500"
        textAlign="right"
      />
    </Box>
  )
}

export default CommentNotification
