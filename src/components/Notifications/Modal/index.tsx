import { useQuery } from '@apollo/client'
import { Divider, PopoverBody, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { startOfWeek, isBefore } from 'date-fns'
import React, { useMemo, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { NotificationBadge } from 'src/components/Notifications/NotificationBadge'
import { usePendingRoutines } from 'src/components/Routine/hooks'
import { useGetGamificationDetails } from 'src/components/Team/hooks'
import { User } from 'src/components/User/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import { listNotificationsAtom, checkInNotificationCountAtom } from 'src/state/recoil/notifications'

import CheckInNotifications from '../CheckInNotifications'
import EmptyStateCheckInNotifications from '../CheckInNotifications/EmptyStateCheckInNotification'
import { NotificationsList } from '../NotificationsList'
import RoutineNotification from '../RoutineNotification'

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
  const { routines } = usePendingRoutines()
  const { dispatch: dispatchTabCheckInClick } = useEvent(EventType.TAB_THIS_WEEK_CLICK)
  const { dispatch: dispatchTabNotificationClick } = useEvent(EventType.TAB_NOTIFICATION_CLICK)

  const notifications = useRecoilValue(listNotificationsAtom)
  const [thisWeekNotificationCount, setCheckInNotificationsCount] = useRecoilState(
    checkInNotificationCountAtom,
  )

  const [keyResults, setKeyResultEdges] = useConnectionEdges<KeyResult>()

  const { refetch } = useQuery(queries.GET_KEYRESULTS_FOR_NOTIFICATIONS, {
    onCompleted: (data) => {
      const companyKeyResults = data.me.keyResults.edges.filter(
        (keyResult: { node: KeyResult }) => {
          return keyResult.node.teamId !== null
        },
      )
      setKeyResultEdges(companyKeyResults)
    },
  })

  useEffect(() => {
    const oneHourInMs = 60 * 60 * 1000
    const refetchInterval = setInterval(() => {
      refetch()
    }, oneHourInMs)

    return () => {
      clearInterval(refetchInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const checkinCount = keyResultsWithNoCheckInThisWeek.filter(
    (keyResult) => keyResult.status.isOutdated,
  ).length
  const notificationCount = [...notifications].filter((notification) => !notification.isRead).length
  const routinesCount = routines.length

  setCheckInNotificationsCount(checkinCount + routinesCount)

  const { isGameficationDisabled } = useGetGamificationDetails()

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
            {intl.formatMessage(messages.thisWeekTabOptions)}
            {checkinCount > 0 && (
              <NotificationBadge notificationCount={thisWeekNotificationCount} />
            )}
          </StyledTab>
        </TabList>
        <Divider borderColor="gray.100" />

        <TabPanels p="0 10px 8px 10px">
          <ScrollablePanel justifyContent="center" textAlign="center" maxH="70vh" width={480}>
            {isOpen && <NotificationsList />}
          </ScrollablePanel>
          <ScrollablePanel maxH="70vh" width={480}>
            {routines.length > 0 || keyResultsWithNoCheckInThisWeek.length > 0 ? (
              <>
                {!isGameficationDisabled && routines.length > 0 && (
                  <RoutineNotification routines={routines} />
                )}
                {keyResultsWithNoCheckInThisWeek.length > 0 && (
                  <CheckInNotifications
                    userId={userId}
                    keyResultsWithNoCheckInThisWeek={keyResultsWithNoCheckInThisWeek}
                  />
                )}
              </>
            ) : (
              <EmptyStateCheckInNotifications />
            )}
          </ScrollablePanel>
        </TabPanels>
      </Tabs>
    </PopoverBody>
  )
}

export default NotificationsModal
