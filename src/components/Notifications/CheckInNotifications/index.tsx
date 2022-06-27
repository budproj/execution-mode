import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import NotificationKeyResult from './NotificationKeyResult'

const CheckInNotifications = () => {
  const intl = useIntl()

  return (
    <Box>
      <Box>
        <Text color="new-gray.600">PARA ESSA SEMANA</Text>
        <NotificationKeyResult isKeyResultOutdated />
        <NotificationKeyResult isKeyResultOutdated />
        <NotificationKeyResult isKeyResultOutdated />
        <NotificationKeyResult isKeyResultOutdated />
      </Box>
      <Box>
        <Text fontWeight="500" color="new-gray.600">
          CHECK-IN EM DIA
        </Text>
        <NotificationKeyResult />
        <NotificationKeyResult />
        <NotificationKeyResult />
        <NotificationKeyResult />
      </Box>
    </Box>
  )
}

export default CheckInNotifications
