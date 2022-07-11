import { Box, Checkbox, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { NOTIFICATIONS_TYPE } from 'src/components/Notifications/constants'

import { Notification } from '../../types'
import BaseCardNotification from '../Base'

import messages from './messages'

const AssignedTask = ({ properties, timestamp, isRead }: Notification) => {
  const intl = useIntl()

  return (
    <BaseCardNotification
      sender={properties.sender}
      describeBadgeAvatarIcon={messages.describeNotification}
      timestamp={timestamp}
      isRead={isRead}
      badgeIcon={NOTIFICATIONS_TYPE.ASSIGNED_TASK}
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
      <Flex alignItems="center" justifyContent="center" gap={2}>
        <Checkbox isDisabled isChecked={false} />
        <Text color="black.900" fontWeight="nomral" fontSize={14}>
          {properties.task?.name}
        </Text>
      </Flex>
    </BaseCardNotification>
  )
}

export default AssignedTask
