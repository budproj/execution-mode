import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'

import EmptyStateCheckInNotifications from './EmptyStateCheckInNotification'
import NotificationKeyResult from './NotificationKeyResult'
import messages from './messages'

interface CheckInNotificationsProperties {
  keyResultsUpToDate: KeyResult[]
  keyResultsWithNoCheckInThisWeek: KeyResult[]
}

const CheckInNotifications = ({
  keyResultsUpToDate,
  keyResultsWithNoCheckInThisWeek,
}: CheckInNotificationsProperties) => {
  const intl = useIntl()

  const setOpenDrawer = useSetRecoilState(keyResultReadDrawerOpenedKeyResultID)

  return (
    <Box>
      {keyResultsUpToDate.length > 0 || keyResultsWithNoCheckInThisWeek.length > 0 ? (
        <>
          <Box>
            {keyResultsWithNoCheckInThisWeek.length > 0 && (
              <Text fontWeight="500" color="new-gray.600">
                {intl.formatMessage(messages.forThisWeekTitle)}
              </Text>
            )}
            {keyResultsWithNoCheckInThisWeek.map((keyResult) => (
              <NotificationKeyResult
                key={keyResult.id}
                isKeyResultOutdated
                keyResult={keyResult}
                handleClick={setOpenDrawer}
              />
            ))}
          </Box>
          <Box>
            {keyResultsUpToDate.length > 0 && (
              <Text fontWeight="500" color="new-gray.600">
                {intl.formatMessage(messages.upToDateTitle)}
              </Text>
            )}
            {keyResultsUpToDate.map((keyResult) => (
              <NotificationKeyResult
                key={keyResult.id}
                isKeyResultOutdated={false}
                keyResult={keyResult}
                handleClick={setOpenDrawer}
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
