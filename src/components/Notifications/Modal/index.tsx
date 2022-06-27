import { Divider, PopoverBody, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { useIntl } from 'react-intl'

import { NotificationBadge } from 'src/components/Notifications/NotificationBadge'

import CheckInNotifications from '../CheckInNotifications'

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

const NotificationsModal = () => {
  const intl = useIntl()

  const checkInsCount = 12
  const notificationsCount = 2

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
            {checkInsCount && <NotificationBadge notificationCount={checkInsCount} />}
          </StyledTab>
        </TabList>
        <Divider borderColor="gray.100" />

        <TabPanels p="0 10px 10px 10px">
          <TabPanel textAlign="center">{/* here: Notifications-Component */}</TabPanel>
          <TabPanel>
            <CheckInNotifications />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PopoverBody>
  )
}

export default NotificationsModal
