import {
  Box,
  Divider,
  PopoverBody,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

const NotificationsModal = () => {
  const intl = useIntl()

  const checkInsCount = 12
  const notificationsCount = 2

  return (
    <PopoverBody padding={0} margin={0}>
      <Tabs isFitted isLazy width="md" colorScheme="purple">
        <TabList display="flex" alignItems="center" width="md" pt={4} pl={12} pr={12}>
          <Tab
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            _hover={{ color: undefined }}
            _selected={{ color: 'brand.500', borderBottom: '2px solid #6F6EFF' }}
          >
            {intl.formatMessage(messages.notificationsTabOptions)}
            {notificationsCount && (
              <Box
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="12px"
                fontWeight="bold"
                bgColor="#FF616A"
                borderRadius="50%"
                width={4}
                height={4}
              >
                {notificationsCount}
              </Box>
            )}
          </Tab>
          <Tab
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            _selected={{ color: 'brand.500', borderBottom: '2px solid #6F6EFF' }}
          >
            {intl.formatMessage(messages.checkInsTabOptions)}
            {checkInsCount && (
              <Box
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="12px"
                fontWeight="bold"
                bgColor="#FF616A"
                borderRadius="50%"
                width={4}
                height={4}
              >
                {checkInsCount}
              </Box>
            )}
          </Tab>
        </TabList>
        <Divider width="max" />

        <TabPanels>
          <TabPanel>{/* here: Notifications-Component */}</TabPanel>
          <TabPanel>{/* here: CheckIn-Notifications-Component */}</TabPanel>
        </TabPanels>
      </Tabs>
    </PopoverBody>
  )
}

export default NotificationsModal
