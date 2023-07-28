import {
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Box,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'
import NotificationBellIcon from 'src/components/Icon/NotificationBell'
import NotificationsModal from 'src/components/Notifications/Modal'
import { NotificationBadge } from 'src/components/Notifications/NotificationBadge'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import { listNotificationsAtom, checkInNotificationCountAtom } from 'src/state/recoil/notifications'

import { myselfAtom } from '../../../state/recoil/shared/atoms'

import messages from './messages'

const NotificationsButton = () => {
  const intl = useIntl()

  const notifications = useRecoilValue(listNotificationsAtom)
  const checkInNotificationCount = useRecoilValue(checkInNotificationCountAtom)
  const { isOpen, onToggle, onClose } = useDisclosure()

  const notificationCount = [...notifications].filter((notification) => !notification.isRead).length
  const notificationCountTotal = notificationCount + checkInNotificationCount
  const isNotificationBadgeVisible = notificationCountTotal > 0

  const { dispatch } = useEvent(EventType.NOTIFICATION_BELL_CLICK)

  const myself = useRecoilValue(myselfAtom)

  return (
    <Popover placement="bottom" isOpen={isOpen} onClose={onClose}>
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
                      notificationCount={notificationCountTotal}
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
                onToggle()
                if (!isOpen) {
                  dispatch({ userId: myself?.id })
                }
              }}
            />
          </TooltipWithDelay>
        </Box>
      </PopoverTrigger>
      <PopoverContent mt={4} maxWidth={480} width="min-content" borderRadius={15} padding={0}>
        <NotificationsModal userId={myself?.id} isOpen={isOpen} />
      </PopoverContent>
    </Popover>
  )
}

export default NotificationsButton
