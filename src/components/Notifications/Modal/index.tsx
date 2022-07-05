import { useQuery } from '@apollo/client'
import { Divider, PopoverBody, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { isAfter, startOfWeek, isBefore } from 'date-fns'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { checkInNotificationCountAtom } from 'src/state/recoil/notifications'

import CheckInNotifications from '../CheckInNotifications'

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

const NotificationsModal = () => {
  const intl = useIntl()

  const checkInNotificationCount = useRecoilValue(checkInNotificationCountAtom)
  const setNotificationsCount = useSetRecoilState(checkInNotificationCountAtom)

  const notificationsCount = 0

  const [keyResults, setKeyResultEdges, _] = useConnectionEdges<KeyResult>()

  useQuery(queries.GET_KEYRESULTS_FOR_NOTIFICATIONS, {
    onCompleted: (data) => {
      setKeyResultEdges(data.me.keyResults.edges)
    },
  })

  const keyResultsWithNoCheckInThisWeek = keyResults?.filter((keyResult) => {
    if (!keyResult?.status?.latestCheckIn) {
      return true
    }

    const date = new Date(keyResult?.status?.latestCheckIn?.createdAt)
    const startOfTheWeek = startOfWeek(new Date(), { weekStartsOn: 1 })

    return isBefore(date, startOfTheWeek)
  })

  const keyResultsUpToDate = keyResults.filter((keyResult) => {
    if (!keyResult?.status?.latestCheckIn) {
      return false
    }

    const date = new Date(keyResult?.status?.latestCheckIn?.createdAt)
    const startOfTheWeek = startOfWeek(new Date(), { weekStartsOn: 1 })

    return isAfter(date, startOfTheWeek)
  })

  setNotificationsCount(keyResultsWithNoCheckInThisWeek.length)

  return (
    <PopoverBody padding={0} margin={0} borderRadius={15} minWidth="480px" maxHeight="100vh">
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
          {/* <StyledTab
            gap={2}
            color="new-gray.800"
            _selected={{ color: 'brand.500', borderColor: 'brand.500' }}
            paddingBottom="17px"
          >
            {intl.formatMessage(messages.notificationsTabOptions)}
            {notificationsCount > 0 && <NotificationBadge notificationCount={notificationsCount} />}
          </StyledTab> */}
          <StyledTab
            gap={2}
            color="new-gray.800"
            // _selected={{ color: 'brand.500', borderBottom: '2px solid #6F6EFF' }}
            paddingBottom="17px"
          >
            {intl.formatMessage(messages.checkInsTabOptions)}
            {/* {checkInNotificationCount > 0 && (
              <NotificationBadge notificationCount={checkInNotificationCount} />
            )} */}
          </StyledTab>
        </TabList>
        <Divider borderColor="gray.100" />

        <TabPanels p="0 10px 10px 10px">
          {/* <TabPanel textAlign="center"> here: Notifications-Component</TabPanel> */}
          <TabPanel>
            <CheckInNotifications
              keyResultsUpToDate={keyResultsUpToDate}
              keyResultsWithNoCheckInThisWeek={keyResultsWithNoCheckInThisWeek}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PopoverBody>
  )
}

export default NotificationsModal
