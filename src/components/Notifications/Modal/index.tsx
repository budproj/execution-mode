import { Divider, PopoverBody, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { SocketIOContext } from 'src/components/Base/SocketIOProvider/socketio-provider'
import { NotificationBadge } from 'src/components/Notifications/NotificationBadge'
import { listNotificationsAtom } from 'src/state/recoil/notifications'

import { NotificationsList } from '../NotificationsList'
import { Notification } from '../NotificationsList/types'

import messages from './messages'

const StyledTab = styled(Tab)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  border-bottom: 2px solid transparent;

  &:focus {
    box-shadow: none;
  }
`

const ScrollablePanel = styled(TabPanel)`
  width: 100%;
  height: 100%;
  padding: 0 12px;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    margin: 12px 0px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #b5c0db;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #d9e2f7;
  }
`

const NotificationsModal = () => {
  const intl = useIntl()
  const { socket } = useContext(SocketIOContext)
  const [{ notifications }, setNotifications] = useRecoilState(listNotificationsAtom)

  useEffect(() => {
    socket.on('newNotification', (newNotify: Notification) => {
      setNotifications({ notifications: [newNotify, ...notifications] })
    })
  }, [notifications, setNotifications, socket])

  const checkInsCount = 12
  const notificationsCount = [...notifications].length

  return (
    <PopoverBody padding={0} margin={0} borderRadius={15}>
      <Tabs isFitted isLazy variant="unstyled">
        <TabList display="flex" alignItems="center" pt={4} pl={12} pr={12}>
          <StyledTab
            gap={2}
            width="md"
            color="new-gray.800"
            _selected={{ color: 'brand.500', borderColor: 'brand.500' }}
          >
            {intl.formatMessage(messages.notificationsTabOptions)}
            {notificationsCount > 0 && <NotificationBadge notificationCount={notificationsCount} />}
          </StyledTab>
          <StyledTab
            gap={2}
            color="new-gray.800"
            borderBottom="2px solid transparent"
            _selected={{ color: 'brand.500', borderBottom: '2px solid #6F6EFF' }}
          >
            {intl.formatMessage(messages.checkInsTabOptions)}
            {checkInsCount && <NotificationBadge notificationCount={checkInsCount} />}
          </StyledTab>
        </TabList>
        <Divider borderColor="gray.100" />

        <TabPanels
          padding={0}
          margin={0}
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
        >
          <ScrollablePanel justifyContent="center" textAlign="center" maxH="70vh" width={480}>
            <NotificationsList />
          </ScrollablePanel>
          <TabPanel>{/* here: CheckIn-Notifications-Component */}</TabPanel>
        </TabPanels>
      </Tabs>
    </PopoverBody>
  )
}

export default NotificationsModal
