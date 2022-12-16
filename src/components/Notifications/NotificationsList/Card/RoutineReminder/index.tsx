import { Box, Heading, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useIntl } from 'react-intl'

import { useRoutineTab } from 'src/components/Routine/hooks/getRoutineTab/'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'

import { Notification } from '../../types'
import BaseCardNotification from '../Base'

import messages from './messages'

const RoutineReminder = ({ properties, isRead, timestamp, type }: Notification) => {
  const intl = useIntl()
  const routineTabName = useRoutineTab()
  const router = useRouter()

  const { dispatch } = useEvent(EventType.NOTIFICATION_ROUTINE_REMINDER_CLICK)

  const handleRoutineClick = () => {
    setTimeout(() => {
      dispatch({})
    }, 500)
    if (properties.team?.id)
      router.push(`/explore/${properties.team.id}?activeTab=${routineTabName}`)
    else router.push('#')
  }

  return (
    <BaseCardNotification
      type={type}
      describeBadgeAvatarIcon={messages.calendarIconDescription}
      timestamp={timestamp}
      isRead={isRead}
      sender={properties.sender}
      handleClick={handleRoutineClick}
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
    </BaseCardNotification>
  )
}

export default RoutineReminder
