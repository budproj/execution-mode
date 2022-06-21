import { Box, PopoverBody, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'

const NotificationsModal = () => {
  const checkInsCount = 12
  const notificationsCount = 2

  return (
    <PopoverBody display="flex" alignItems="center" justifyContent="center">
      <Tabs isFitted colorScheme="facebook">
        <TabList display="flex" alignItems="center" justifyContent="center">
          <Tab
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            // _hover={{ color: undefined }}
            // _selected={{ color: 'brand.500', borderBottom: '2px solid #6F6EFF' }}
          >
            Notificações
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
          <Tab display="flex" alignItems="center" justifyContent="center" gap={2}>
            Check-in
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

        <TabPanels>
          <TabPanel width={420}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ea eveniet nobis
            tempora nulla. Ex perferendis, blanditiis quia eligendi nam error ea quod nobis aperiam
            repellendus ut ullam distinctio quis. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Laboriosam ea eveniet nobis tempora nulla. Ex perferendis, blanditiis quia
            eligendi nam error ea quod nobis aperiam repellendus ut ullam distinctio quis. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ea eveniet nobis tempora
            nulla. Ex perferendis, blanditiis quia eligendi nam error ea quod nobis aperiam
            repellendus ut ullam distinctio quis. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Laboriosam ea eveniet nobis tempora nulla. Ex perferendis, blanditiis quia
            eligendi nam error ea quod nobis aperiam repellendus ut ullam distinctio quis.
          </TabPanel>
          <TabPanel width={420}>{/* here: CheckIns-Notifications-Component */}</TabPanel>
        </TabPanels>
      </Tabs>
    </PopoverBody>
  )
}

export default NotificationsModal
