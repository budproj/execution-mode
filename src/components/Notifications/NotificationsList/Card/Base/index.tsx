import { Avatar, AvatarBadge, Box, Flex, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { MessageDescriptor, useIntl } from 'react-intl'

import LastUpdateText from 'src/components/Base/LastUpdateText'
import CircleIcon from 'src/components/Icon/Circle'
import { KeyResult } from 'src/components/KeyResult/types'
import { NOTIFICATIONS_TYPE } from 'src/components/Notifications/constants'

import { BadgeAvatarIcon } from './Avatar'

export interface BaseCardsNotifications {
  children?: React.ReactNode
  isRead: boolean
  handleClick: (id?: KeyResult['id']) => void
  timestamp: Date
  describeBadgeAvatarIcon: MessageDescriptor
  badgeIcon: NOTIFICATIONS_TYPE
  sender: {
    id: string
    name: string
    picture: string
  }
}

const BaseCardNotification = ({
  isRead,
  children,
  describeBadgeAvatarIcon,
  sender,
  handleClick,
  timestamp,
  badgeIcon,
}: BaseCardsNotifications) => {
  const intl = useIntl()

  return (
    <Box
      bg={isRead ? undefined : 'new-gray.50'}
      paddingY={6}
      paddingX={2}
      maxW="100%"
      display="flex"
      position="relative"
      alignItems="flex-start"
      justifyContent="flex-start"
      cursor="pointer"
      _hover={{
        bg: 'new-gray.100',
      }}
      gap={6}
      onClick={() => handleClick()}
    >
      <Avatar src={sender?.picture}>
        <AvatarBadge boxSize="1.2em" border="none">
          <BadgeAvatarIcon
            desc={intl.formatMessage(describeBadgeAvatarIcon)}
            typeNotification={badgeIcon}
          />
        </AvatarBadge>
      </Avatar>
      <Flex
        flexDir="column"
        alignItems="flex-start"
        justifyContent="center"
        maxWidth={isRead ? '100%' : 330}
        gap={3}
      >
        {children}
      </Flex>
      {!isRead && (
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

      <Tooltip
        placement="top-start"
        label={intl.formatDate(timestamp, {
          month: 'short',
          day: 'numeric',
          weekday: 'long',
          hour: 'numeric',
          minute: 'numeric',
        })}
      >
        <Box position="absolute" fontWeight="normal" right={2} top={5}>
          <LastUpdateText
            cursor="default"
            date={timestamp}
            prefix={Date.now() > timestamp.getTime() ? '' : 'há'}
            fontSize={12}
            color="new-gray.600"
            textAlign="right"
          />
        </Box>
      </Tooltip>
    </Box>
  )
}

export default BaseCardNotification
