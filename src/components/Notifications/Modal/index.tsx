import { useQuery } from '@apollo/client'
import { Divider, PopoverBody, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { isAfter, startOfWeek, isBefore } from 'date-fns'
import React from 'react'
import { useIntl } from 'react-intl'

import { KeyResult } from 'src/components/KeyResult/types'
import { NotificationBadge } from 'src/components/Notifications/NotificationBadge'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'

import CheckInNotifications from '../CheckInNotifications'

import messages from './messages'
import queries from './queries.gql'

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

const NotificationsModal = () => {
  const intl = useIntl()

  const notificationsCount = 2

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

  const checkInsCount = keyResultsWithNoCheckInThisWeek.length

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
            {notificationsCount && <NotificationBadge notificationCount={notificationsCount} />}
          </StyledTab>
          <StyledTab
            gap={2}
            color="new-gray.800"
            borderBottom="2px solid transparent"
            _selected={{ color: 'brand.500', borderBottom: '2px solid #6F6EFF' }}
          >
            {intl.formatMessage(messages.checkInsTabOptions)}
            {checkInsCount > 0 && <NotificationBadge notificationCount={checkInsCount} />}
          </StyledTab>
        </TabList>
        <Divider borderColor="gray.100" />

        <TabPanels p="0 10px 10px 10px">
          <TabPanel textAlign="center">{/* here: Notifications-Component */}</TabPanel>
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
