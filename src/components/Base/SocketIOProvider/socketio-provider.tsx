import { useAuth0 } from '@auth0/auth0-react'
import React, { createContext, ReactElement, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Socket, io } from 'socket.io-client'

import { Notification } from 'src/components/Notifications/NotificationsList/types'
import getConfig from 'src/config'
import { listNotificationsAtom } from 'src/state/recoil/notifications'

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

// Const socket1 = socketIOClient(ENDPOINT)

const config = getConfig()

const SocketIOProvider = ({ children }: ChildrenProperty) => {
  const { getAccessTokenSilently } = useAuth0()
  const [notifications, setNotifications] = useRecoilState(listNotificationsAtom)

  // Const emitConnectedMessage = useCallback(async () => {
  //   const token = await getAccessTokenSilently(config.publicRuntimeConfig.auth0)
  //   return token
  // }, [getAccessTokenSilently])

  // const getToken = async () => {
  //   const token = await getAccessTokenSilently(config.publicRuntimeConfig.auth0)
  //   return token
  // }

  // const auth0UserToken = getToken()

  const socket = io(ENDPOINT, {
    extraHeaders: {
      Authorization: 'Promise.resolve(auth0UserToken)',
    },
  })

  const connectMessageSocket = () => {
    socket.emit('connected')
  }

  // UseEffect(() => {
  //   emitConnectedMessage()
  // }, [emitConnectedMessage])

  const newNotification = () => {
    socket.on('newNotification', (newNotify: Notification) => {
      setNotifications({ notifications: [newNotify, ...notifications.notifications] })
    })
  }

  useEffect(() => newNotification)
  return <SocketIOContext.Provider value={{ socket }}>{children}</SocketIOContext.Provider>
}

export default SocketIOProvider
