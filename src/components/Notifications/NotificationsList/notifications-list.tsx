import { Box, Divider } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { EmptyState } from 'src/components/Base'
import { SocketIOContext } from 'src/components/Base/SocketIOProvider/socketio-provider'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import { listNotificationsAtom } from 'src/state/recoil/notifications'

import CardNotification from './Card'
import messages from './messages'

const NotificationsList = () => {
  const [notifications, setNotifications] = useRecoilState(listNotificationsAtom)
  const { socket } = useContext(SocketIOContext)

  const { dispatch } = useEvent(EventType.NOTIFICATION_CARD_CLICK)

  const ordainedNotificationsByDate = [...notifications].sort(function (x, y) {
    return new Date(y.timestamp).getTime() - new Date(x.timestamp).getTime()
  })

  useEffect(() => {
    const hasUnreadNotification = notifications.some((notification) => !notification.isRead)

    if (socket && hasUnreadNotification) {
      socket.emit('readNotifications')
    }

    return () => {
      if (hasUnreadNotification) {
        setNotifications((previousNotifications) =>
          previousNotifications.map((notification) => {
            return { ...notification, isRead: true }
          }),
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  return (
    <Box>
      {notifications.length > 0 ? (
        ordainedNotificationsByDate.map((notification) => (
          <Box
            key={notification.messageId}
            onClick={() => dispatch({ notificationType: notification.type })}
          >
            <CardNotification
              recipientId={notification.recipientId}
              properties={notification.properties}
              type={notification.type}
              timestamp={notification.timestamp}
              isRead={notification.isRead}
              messageId={notification.messageId}
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
        <EmptyState
          maxW={180}
          pt={5}
          pb={10}
          gridGap={0}
          fontSize={14}
          imageKey="no-more-notifications"
          labelMessage={messages.noMoreNotificationsLabel}
        />
      )}
    </Box>
  )
}

export default NotificationsList
