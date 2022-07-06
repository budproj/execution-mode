import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { NOTIFICATIONS_TYPE } from 'src/components/Notifications/constants'

import { NotificationsProperties } from '../../types'
import BaseCardNotification from '../Base'
import { NotificationKeyResult } from '../Base/KeyResult'

import messages from './messages'

export interface SupportTeamProperties extends NotificationsProperties {
  keyResult?: {
    id: string
    name: string
  }
}

const SupportTeam = ({ ...properties }: SupportTeamProperties) => {
  const intl = useIntl()
  return (
    <BaseCardNotification
      describeBadgeAvatarIcon={messages.describeNotification}
      timestamp={properties.timestamp}
      isRead={properties.isRead}
      sender={properties.sender}
      badgeIcon={NOTIFICATIONS_TYPE.ADD_SUPPORT_TEAM}
    >
      <Heading display="flex" width="100%" justifyContent="space-between" textAlign="left">
        <Box display="flex" alignItems="flex-start" justifyContent="center" flexDir="column">
          <Text fontSize={16} fontWeight="bold" color="new-gray.800">
            {properties.sender?.name}
          </Text>
          <Text fontSize={14} fontWeight="normal" color="new-gray.700">
            {intl.formatMessage(messages.describeNotification)}
          </Text>
        </Box>
      </Heading>
      <NotificationKeyResult keyResult={properties.keyResult?.name} />
    </BaseCardNotification>
  )
}

export default SupportTeam
