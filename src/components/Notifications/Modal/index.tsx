import { useQuery } from '@apollo/client'
import { Divider, PopoverBody, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { isAfter, startOfWeek, isBefore } from 'date-fns'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { NotificationBadge } from 'src/components/Notifications/NotificationBadge'
import { User } from 'src/components/User/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import { listNotificationsAtom, checkInNotificationCountAtom } from 'src/state/recoil/notifications'

import CheckInNotifications from '../CheckInNotifications'
import { NotificationsList } from '../NotificationsList'

import messages from './messages'
import queries from './queries.gql'

const StyledTab = styled(Tab)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
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
interface NotificationsModalProperties {
  userId: User['id']
  isOpen: boolean
}

const NotificationsModal = ({ userId, isOpen }: NotificationsModalProperties) => {
  const intl = useIntl()
  const { dispatch: dispatchTabCheckInClick } = useEvent(EventType.TAB_CHECKIN_CLICK)
  const { dispatch: dispatchTabNotificationClick } = useEvent(EventType.TAB_NOTIFICATION_CLICK)

  const notifications = useRecoilValue(listNotificationsAtom)
  const setCheckInNotificationsCount = useSetRecoilState(checkInNotificationCountAtom)

  const [keyResults, setKeyResultEdges] = useConnectionEdges<KeyResult>()

  useQuery(queries.GET_KEYRESULTS_FOR_NOTIFICATIONS, {
    onCompleted: (data) => {
      const companyKeyResults = data.me.keyResults.edges.filter(
        (keyResult: { node: KeyResult }) => {
          return keyResult.node.teamId !== null
        },
      )
      setKeyResultEdges(companyKeyResults)
    },
  })

  const keyResultsWithNoCheckInThisWeek = useMemo(() => {
    return keyResults?.filter((keyResult) => {
      if (!keyResult?.status?.latestCheckIn) {
        return true
      }

      const date = new Date(keyResult?.status?.latestCheckIn?.createdAt)
      const startOfTheWeek = startOfWeek(new Date(), { weekStartsOn: 1 })

      return isBefore(date, startOfTheWeek)
    })
  }, [keyResults])

  const keyResultsUpToDate = useMemo(() => {
    return keyResults.filter((keyResult) => {
      if (!keyResult?.status?.latestCheckIn) {
        return false
      }

      const date = new Date(keyResult?.status?.latestCheckIn?.createdAt)
      const startOfTheWeek = startOfWeek(new Date(), { weekStartsOn: 1 })

      return isAfter(date, startOfTheWeek)
    })
  }, [keyResults])

  const checkinCount = keyResultsWithNoCheckInThisWeek.filter(
    (keyResult) => keyResult.status.isOutdated,
  ).length
  const notificationCount = [...notifications].filter((notification) => !notification.isRead).length

  setCheckInNotificationsCount(checkinCount)

  return (
    <PopoverBody padding={0} margin={0} borderRadius={15}>
      <Tabs
        isFitted
        isLazy
        variant="unstyled"
        boxShadow="0px 5px 30px 5px rgba(181, 192, 219, 0.3)"
        borderRadius={15}
      >
        <TabList
          display="flex"
          alignItems="center"
          pt={4}
          pl={12}
          pr={12}
          backgroundColor="black.50"
          borderRadius="15px 15px 0px 0px"
        >
          <StyledTab
            gap={2}
            width="md"
            color="new-gray.800"
            _selected={{ color: 'brand.500', borderColor: 'brand.500' }}
            paddingBottom="17px"
            onClick={() => dispatchTabNotificationClick({})}
          >
            {intl.formatMessage(messages.notificationsTabOptions)}
            {notificationCount > 0 && <NotificationBadge notificationCount={notificationCount} />}
          </StyledTab>
          <StyledTab
            gap={2}
            color="new-gray.800"
            _selected={{ color: 'brand.500', borderBottom: '2px solid #6F6EFF' }}
            paddingBottom="17px"
            onClick={() => dispatchTabCheckInClick({})}
          >
            {intl.formatMessage(messages.checkInsTabOptions)}
            {checkinCount > 0 && <NotificationBadge notificationCount={checkinCount} />}
          </StyledTab>
        </TabList>
        <Divider borderColor="gray.100" />

        <TabPanels p="0 10px 8px 10px">
          <ScrollablePanel justifyContent="center" textAlign="center" maxH="70vh" width={480}>
            {isOpen && <NotificationsList />}
          </ScrollablePanel>
          <ScrollablePanel maxH="70vh" width={480}>
            <CheckInNotifications
              userId={userId}
              keyResultsUpToDate={keyResultsUpToDate}
              keyResultsWithNoCheckInThisWeek={keyResultsWithNoCheckInThisWeek}
            />
          </ScrollablePanel>
        </TabPanels>
      </Tabs>
    </PopoverBody>
  )
}

export default NotificationsModal
