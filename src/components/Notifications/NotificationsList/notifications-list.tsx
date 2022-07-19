import { Box, Divider } from '@chakra-ui/react'
import React from 'react'

import { EmptyState } from 'src/components/Base'

import CardNotification from './Card'
import { NotificationsMockedArray } from './Utils/mocked'
import messages from './messages'

const NotificationsList = () => {
  const ordainedNotificationsByTimestamp = NotificationsMockedArray.sort(function (x, y) {
    return y.timestamp - x.timestamp
  })

  return (
    <Box>
      {NotificationsMockedArray.length > 0 ? (
        ordainedNotificationsByTimestamp.map((notification) => (
          <Box key={notification.id}>
            <CardNotification
              recipientId={notification.recipientId}
              properties={notification.properties}
              type={notification.type}
              timestamp={notification.timestamp}
              isRead={notification.isRead}
              id={notification.id}
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
      {NotificationsMockedArray.length > 0 && (
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
