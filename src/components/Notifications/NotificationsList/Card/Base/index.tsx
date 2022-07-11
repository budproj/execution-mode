import { Avatar, AvatarBadge, Box, Flex, Tooltip } from '@chakra-ui/react'
import fromUnixTime from 'date-fns/fromUnixTime'
import React from 'react'
import { MessageDescriptor, useIntl } from 'react-intl'

import LastUpdateText from 'src/components/Base/LastUpdateText'
import CircleIcon from 'src/components/Icon/Circle'
import { NOTIFICATIONS_TYPE } from 'src/components/Notifications/constants'

import { BadgeAvatarIcon } from './Avatar'

export interface BaseCardsNotifications {
  children?: React.ReactNode
  isRead: boolean
  timestamp: number
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
  timestamp,
  badgeIcon,
}: BaseCardsNotifications) => {
  const intl = useIntl()
  const formattedDateNotificationCheckIn = timestamp && fromUnixTime(timestamp)

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
      gap={6}
    >
      <Avatar src={sender?.picture}>
        <AvatarBadge boxSize="1.2em" border="none">
          <BadgeAvatarIcon
            desc={intl.formatMessage(describeBadgeAvatarIcon)}
            typeNotification={badgeIcon}
          />
        </AvatarBadge>
      </Avatar>
      <Flex flexDir="column" alignItems="flex-start" justifyContent="center" maxWidth={370} gap={3}>
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
        label={intl.formatDate(formattedDateNotificationCheckIn, {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      >
        <Box position="absolute" fontWeight="normal" right={2} top={5}>
          {formattedDateNotificationCheckIn && (
            <LastUpdateText
              cursor="default"
              date={formattedDateNotificationCheckIn}
              prefix={Date.now() > formattedDateNotificationCheckIn.getTime() ? '' : 'há'}
              fontSize={12}
              color="new-gray.500"
              textAlign="right"
            />
          )}
        </Box>
      </Tooltip>
    </Box>
  )
}

export default BaseCardNotification
