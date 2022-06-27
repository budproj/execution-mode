import { IconButton, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import React from 'react'

import NotificationBellIcon from 'src/components/Icon/NotificationBell'
import NotificationsModal from 'src/components/Notifications/Modal'
import { NotificationBadge } from 'src/components/Notifications/NotificationBadge'

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
                <NotificationBadge
                  hasBorder
                  notificationCount={notificationCount}
                  position="absolute"
                  top="2px"
                  right="-6px"
                />
              )}
            </>
          }
          borderRadius="full"
          _hover={{
            bg: 'gray.50',
          }}
        />
      </PopoverTrigger>
      <PopoverContent mt={4} maxWidth={480} width="min-content" borderRadius={15} padding={0}>
        <NotificationsModal />
      </PopoverContent>
    </Popover>
  )
}

export default NotificationsButton
