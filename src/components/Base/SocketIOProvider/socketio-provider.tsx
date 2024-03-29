import { useAuth0 } from '@auth0/auth0-react'
import React, { createContext, ReactElement, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Socket, io } from 'socket.io-client'

import { Notification } from 'src/components/Notifications/NotificationsList/types'
import getConfig from 'src/config'
import { listNotificationsAtom } from 'src/state/recoil/notifications'

interface SocketIOContextProperties {
  socket: Socket | undefined
}

export const SocketIOContext = createContext<SocketIOContextProperties>(
  {} as SocketIOContextProperties,
)

interface ChildrenProperty {
  children: ReactElement
}

const config = getConfig()

const SocketIOProvider = ({ children }: ChildrenProperty) => {
  const { getAccessTokenSilently } = useAuth0()
  const [socket, setSocket] = useState<Socket>()
  const [_, setNotifications] = useRecoilState(listNotificationsAtom)

  const connectWebsocket = async () => {
    const token = await getAccessTokenSilently(config.publicRuntimeConfig.auth0)
    const socket = io(config.publicRuntimeConfig.api.notifications, {
      auth: { token },
    })

    setSocket(socket)
  }

  useEffect(() => {
    connectWebsocket()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('newNotification', (newNotification: Notification) => {
        setNotifications((previousNotifications) => {
          const existentNotificationIndex = previousNotifications.findIndex(
            (notification) => notification.messageId === newNotification.messageId,
          )

          if (existentNotificationIndex !== -1) {
            return previousNotifications.map((notification, index) => {
              return index === existentNotificationIndex ? newNotification : notification
            })
          }

          return [newNotification, ...previousNotifications]
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  return <SocketIOContext.Provider value={{ socket }}>{children}</SocketIOContext.Provider>
}

export default SocketIOProvider
