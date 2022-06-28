import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { KeyResult } from 'src/components/KeyResult/types'

import EmptyStateCheckInNotifications from './EmptyStateCheckInNotification'
import NotificationKeyResult from './NotificationKeyResult'

interface CheckInNotificationsProperties {
  keyResultsUpToDate: KeyResult[]
  keyResultsWithNoCheckInThisWeek: KeyResult[]
}

const CheckInNotifications = ({
  keyResultsUpToDate,
  keyResultsWithNoCheckInThisWeek,
}: CheckInNotificationsProperties) => {
  const intl = useIntl()

  return (
    <Box>
      {keyResultsUpToDate.length > 0 || keyResultsWithNoCheckInThisWeek.length > 0 ? (
        <>
          <Box>
            <Text color="new-gray.600">PARA ESSA SEMANA</Text>
            {keyResultsWithNoCheckInThisWeek.map((keyResult) => (
              <NotificationKeyResult key={keyResult.id} isKeyResultOutdated keyResult={keyResult} />
            ))}
          </Box>
          <Box>
            <Text fontWeight="500" color="new-gray.600">
              CHECK-IN EM DIA
            </Text>
            {keyResultsUpToDate.map((keyResult) => (
              <NotificationKeyResult
                key={keyResult.id}
                isKeyResultOutdated={false}
                keyResult={keyResult}
              />
            ))}
          </Box>
        </>
      ) : (
        <EmptyStateCheckInNotifications />
      )}
    </Box>
  )
}

export default CheckInNotifications
