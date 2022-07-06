import { Box, Button, Divider } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import { EmptyState } from 'src/components/Base'

import CardNotification from './Card'
import { NotificationsMockedArray } from './Utils/mocked'
import messages from './messages'

const NotificationsList = () => {
  // Chama as Notifications do Recoil
  const [listLimit, setListLimit] = useState(2)
  const intl = useIntl()

  const ordainedNotificationsByReadStatus = NotificationsMockedArray.sort(function (x, y) {
    return x.isRead === y.isRead ? 0 : x.isRead ? 1 : -1
  })

  return (
    <Box>
      {NotificationsMockedArray.length > 0 ? (
        ordainedNotificationsByReadStatus.slice(0, listLimit).map((notification) => (
          <Box key={notification.id}>
            <CardNotification
              type={notification.type}
              timestamp={notification.timestamp}
              isRead={notification.isRead}
              {...notification.properties}
            />
            <Divider borderColor="gray.100" />
          </Box>
        ))
      ) : (
        <EmptyState
          maxW={320}
          py={12}
          gridGap={0}
          fontSize={14}
          imageKey="notifications-empty-state"
          labelMessage={messages.emptyStateLabel}
        />
      )}
      {listLimit < NotificationsMockedArray.length ? (
        <Button
          color="brand.500"
          _hover={{
            color: 'brand.300',
          }}
          fontSize={14}
          paddingY={8}
          fontWeight="medium"
          onClick={() => setListLimit(listLimit + 2)}
        >
          {intl.formatMessage(messages.loadMoreNotificationsButton)}
        </Button>
      ) : (
        <EmptyState
          maxW={320}
          pt={5}
          pb={10}
          gridGap={0}
          textWidth="260px"
          fontSize={14}
          imageKey="no-more-notifications"
          labelMessage={messages.noMoreNotificationsLabel}
        />
      )}
    </Box>
  )
}

export default NotificationsList
