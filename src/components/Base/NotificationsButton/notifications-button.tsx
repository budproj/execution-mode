import { IconButton, Popover, PopoverContent, PopoverTrigger, Box } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import NotificationBellIcon from 'src/components/Icon/NotificationBell'
import NotificationsModal from 'src/components/Notifications/Modal'
import { NotificationBadge } from 'src/components/Notifications/NotificationBadge'
import { notificationCountAtom, checkInNotificationCountAtom } from 'src/state/recoil/notifications'

const NotificationsButton = () => {
  const notificationCount = useRecoilValue(notificationCountAtom)
  const checkInNotificationCount = useRecoilValue(checkInNotificationCountAtom)

  console.log({ notificationCount, checkInNotificationCount })

  console.log(notificationCount + checkInNotificationCount)

  const isNotificationBadgeVisible = notificationCount > 0 || checkInNotificationCount > 0

  return (
    <Popover placement="bottom">
      <TooltipWithDelay label="Notificações">
        <Box display="inline-block">
          <PopoverTrigger>
            <IconButton
              aria-label="tas"
              marginRight="5px"
              h={8}
              minH={8}
              minW={8}
              icon={
                <>
                  <NotificationBellIcon fill="gray.500" w={5} h="auto" desc="notifications" />{' '}
                  {isNotificationBadgeVisible && (
                    <NotificationBadge
                      hasBorder
                      notificationCount={notificationCount + checkInNotificationCount}
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
        </Box>
      </TooltipWithDelay>
      <PopoverContent mt={4} maxWidth={480} width="min-content" borderRadius={15} padding={0}>
        <NotificationsModal />
      </PopoverContent>
    </Popover>
  )
}

export default NotificationsButton
