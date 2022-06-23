import { Divider, PopoverBody, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { NotificationBadge } from 'src/components/Notifications/NotificationBadge'

import messages from './messages'

const NotificationsModal = () => {
  const intl = useIntl()

  const checkInsCount = 12
  const notificationsCount = 2

  return (
    <PopoverBody padding={0} margin={0} borderRadius={15}>
      <Tabs isFitted isLazy variant="unstyled">
        <TabList display="flex" alignItems="center" pt={4} pl={12} pr={12}>
          <Tab
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            width="md"
            fontSize={16}
            fontWeight="medium"
            color="new-gray.800"
            borderBottom="2px solid transparent"
            _focus={{ outline: 0 }}
            _selected={{ color: 'brand.500', borderBottom: '2px solid #6F6EFF' }}
          >
            {intl.formatMessage(messages.notificationsTabOptions)}
            {notificationsCount && <NotificationBadge notificationCount={notificationsCount} />}
          </Tab>
          <Tab
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            fontSize={16}
            width="max-content"
            fontWeight="medium"
            color="new-gray.800"
            borderBottom="2px solid transparent"
            _focus={{ outline: 0 }}
            _selected={{ color: 'brand.500', borderBottom: '2px solid #6F6EFF' }}
          >
            {intl.formatMessage(messages.checkInsTabOptions)}
            {checkInsCount && <NotificationBadge notificationCount={checkInsCount} />}
          </Tab>
        </TabList>
        <Divider borderColor="gray.100" />

        <TabPanels p="0 10px 10px 10px">
          <TabPanel textAlign="center">{/* here: Notifications-Component */}</TabPanel>
          <TabPanel>{/* here: CheckIn-Notifications-Component */}</TabPanel>
        </TabPanels>
      </Tabs>
    </PopoverBody>
  )
}

export default NotificationsModal
