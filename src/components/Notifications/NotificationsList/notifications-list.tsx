import { Box, Button, Divider } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { EmptyState } from 'src/components/Base'
import { listNotificationsAtom } from 'src/state/recoil/notifications'

import CardNotification from './Card'
import messages from './messages'

const NotificationsList = () => {
  const [listLimit, setListLimit] = useState(5)
  const [{ notifications }] = useRecoilState(listNotificationsAtom)
  const intl = useIntl()

  // Const ordainedNotificationsByTimestamp = notifications.sort(function (x, y) {
  //   return y.timestamp.getTime() - x.timestamp.getTime()
  // })

  return (
    <Box>
      {notifications.length > 0 ? (
        notifications.slice(0, listLimit).map((notification) => (
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
      {notifications.length > 0 && (
        <Box>
          {listLimit < notifications.length ? (
            <Button
              color="brand.500"
              _hover={{
                color: 'brand.300',
              }}
              fontSize={14}
              py={8}
              pt={10}
              fontWeight="medium"
              onClick={() => setListLimit(listLimit + 5)}
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
      )}
    </Box>
  )
}

export default NotificationsList
