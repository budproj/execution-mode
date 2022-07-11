import { useAuth0 } from '@auth0/auth0-react'
import React, { createContext, ReactElement, useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import socketIOClient, { Socket } from 'socket.io-client'

import { Notification } from 'src/components/Notifications/NotificationsList/types'
import getConfig from 'src/config'
import { listNotificationsAtom } from 'src/state/recoil/notifications'

// TODO: remove temporary url
const ENDPOINT = 'http://localhost:8000'

interface SocketIOContextProperties {
  socket: Socket
}

export const SocketIOContext = createContext<SocketIOContextProperties>(
  {} as SocketIOContextProperties,
)

interface ChildrenProperty {
  children: ReactElement
}

const socket = socketIOClient(ENDPOINT)
const connectMessageSocket = (userToken: string) => {
  socket.emit('connected', userToken)
}

const config = getConfig()

const SocketIOProvider = ({ children }: ChildrenProperty) => {
  const { getAccessTokenSilently } = useAuth0()
  const [notifications, setNotifications] = useRecoilState(listNotificationsAtom)

  const emitConnectedMessage = useCallback(async () => {
    const token = await getAccessTokenSilently(config.publicRuntimeConfig.auth0)
    connectMessageSocket(token)
  }, [getAccessTokenSilently])

  useEffect(() => {
    emitConnectedMessage()
  }, [emitConnectedMessage])

  const newNotification = () => {
    socket.on('newNotification', (newNotify: Notification) => {
      setNotifications({ notifications: [newNotify, ...notifications.notifications] })
    })
  }

  useEffect(() => newNotification)
  return <SocketIOContext.Provider value={{ socket }}>{children}</SocketIOContext.Provider>
}

export default SocketIOProvider
