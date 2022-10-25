import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { IntlLink } from 'src/components/Base'

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
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      handleClick={() => {}}
    >
      <IntlLink
        href={properties.team?.id ? `/explore/${properties.team.id}?activeTab=retrospectiva` : '#'}
      >
        <Heading display="flex" width="100%" justifyContent="space-between" textAlign="left">
          <Box display="flex" alignItems="flex-start" justifyContent="center" flexDir="column">
            <Text fontSize={16} fontWeight="700" color="new-gray.800">
              {intl.formatMessage(messages.weekRetrospectiveRoutineTitle)}
            </Text>
            <Text fontSize={14} fontWeight="400" color="new-gray.700">
              {intl.formatMessage(messages.weekRetrospectiveRoutineSubtitle, {
                team: properties.team?.name,
              })}
            </Text>
          </Box>
        </Heading>
      </IntlLink>
    </BaseCardNotification>
  )
}

export default RoutineReminder
