import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { User } from 'src/components/User/types'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'

import NotificationKeyResult from './NotificationKeyResult'
import messages from './messages'

interface CheckInNotificationsProperties {
  keyResultsWithNoCheckInThisWeek: KeyResult[]
  userId: User['id']
}

const CheckInNotifications = ({
  keyResultsWithNoCheckInThisWeek,
  userId,
}: CheckInNotificationsProperties) => {
  const intl = useIntl()

  const setOpenDrawer = useSetRecoilState(keyResultReadDrawerOpenedKeyResultID)

  return (
    <Box marginBottom={2}>
      <Text fontWeight="500" color="new-gray.800" pb={1} pt={7} textTransform="uppercase">
        {intl.formatMessage(messages.keyResultsTitle)}
      </Text>
      {keyResultsWithNoCheckInThisWeek.map((keyResult) => (
        <NotificationKeyResult
          key={keyResult.id}
          isKeyResultOutdated
          updateIconIsFilled={keyResult?.statuses?.isOutdated}
          keyResult={keyResult}
          handleClick={setOpenDrawer}
          userId={userId}
        />
      ))}
    </Box>
  )
}

export default CheckInNotifications
