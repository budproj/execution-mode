import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { Notification } from '../../types'
import BaseCardNotification from '../Base'

import messages from './messages'

const RoutineReminder = ({ properties, isRead, timestamp, type }: Notification) => {
  const intl = useIntl()

  return (
    <BaseCardNotification
      type={type}
      describeBadgeAvatarIcon={messages.calendarIconDescription}
      timestamp={timestamp}
      isRead={isRead}
      sender={properties.sender}
      handleClick={() => {
        console.log('teste')
      }}
    >
      <Heading display="flex" width="100%" justifyContent="space-between" textAlign="left">
        <Box display="flex" alignItems="flex-start" justifyContent="center" flexDir="column">
          <Text fontSize={16} fontWeight="700" color="new-gray.800">
            {intl.formatMessage(messages.weekRetrospectiveRoutineTitle)}
          </Text>
          <Text fontSize={14} fontWeight="400" color="new-gray.700">
            {intl.formatMessage(messages.weekRetrospectiveRoutineSubtitle)}{' '}
            {properties.routine?.teamName}
          </Text>
        </Box>
      </Heading>
    </BaseCardNotification>
  )
}

export default RoutineReminder
