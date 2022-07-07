import { IconButton, Popover, PopoverContent, PopoverTrigger, Box } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import NotificationBellIcon from 'src/components/Icon/NotificationBell'
import NotificationsModal from 'src/components/Notifications/Modal'
import { NotificationBadge } from 'src/components/Notifications/NotificationBadge'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import { notificationCountAtom, checkInNotificationCountAtom } from 'src/state/recoil/notifications'
import meAtom from 'src/state/recoil/user/me'

import messages from './messages'

const NotificationsButton = () => {
  const intl = useIntl()

  const notificationCount = useRecoilValue(notificationCountAtom)
  const checkInNotificationCount = useRecoilValue(checkInNotificationCountAtom)

  const isNotificationBadgeVisible = notificationCount > 0 || checkInNotificationCount > 0

  const { dispatch } = useEvent(EventType.NOTIFIFICATION_BELL_CLICK)

  const userID = useRecoilValue(meAtom)

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Box display="inline-block">
          <TooltipWithDelay label={intl.formatMessage(messages.notificationBellTooltip)}>
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
              onClick={() => {
                dispatch({ userId: userID })
              }}
            />
          </TooltipWithDelay>
        </Box>
      </PopoverTrigger>
      <PopoverContent mt={4} maxWidth={480} width="min-content" borderRadius={15} padding={0}>
        <NotificationsModal userId={userID} />
      </PopoverContent>
    </Popover>
  )
}

export default NotificationsButton
