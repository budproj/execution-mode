import { Box, IconButton, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import React from 'react'

import NotificationBellIcon from 'src/components/Icon/NotificationBell'
import NotificationsModal from 'src/components/Notifications/Modal'

const NotificationsButton = () => {
  const notificationCount = 4

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <IconButton
          aria-label="tas"
          h={8}
          minH={8}
          minW={8}
          icon={
            <>
              <NotificationBellIcon fill="gray.500" w={5} h="auto" desc="notifications" />{' '}
              {notificationCount > 0 && (
                <Box
                  as="span"
                  color="white"
                  position="absolute"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  top="1px"
                  right="-5px"
                  fontSize="10px"
                  fontWeight="bold"
                  bgColor="#FF616A"
                  border="1px solid white"
                  borderRadius="50%"
                  p="1px"
                  minW="16px"
                >
                  {notificationCount}
                </Box>
              )}
            </>
          }
          borderRadius="full"
          _hover={{
            bg: 'gray.50',
          }}
        />
      </PopoverTrigger>
      <PopoverContent mt={4} width={480} borderRadius={15}>
        <NotificationsModal />
      </PopoverContent>
    </Popover>
  )
}

export default NotificationsButton
