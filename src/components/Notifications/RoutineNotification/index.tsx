import { Text, Box } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import RoutineComponent from './RoutineComponent'
import messages from './messages'

interface RoutineNotificationProperties {
  routines: Array<{
    id: string
    name: string
    isOutdated: boolean
    status: {
      latestCheckIn: string
    }
  }>
}

const RoutineNotification = ({ routines }: RoutineNotificationProperties) => {
  const intl = useIntl()

  return (
    <Box>
      <Text fontWeight="500" color="new-gray.800" pb={1} pt={7} textTransform="uppercase">
        {intl.formatMessage(messages.routineTitle)}
      </Text>
      {routines.map((routine) => (
        <RoutineComponent key={routine.id} routine={routine} />
      ))}
    </Box>
  )
}

export default RoutineNotification
