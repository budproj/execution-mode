import { Flex, Text, Box, Divider } from '@chakra-ui/react'
import { User } from '@sentry/nextjs'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { Button } from 'src/components/Base/Button'
import LastUpdateText from 'src/components/Base/LastUpdateText'
import KeyResultDynamicIcon from 'src/components/KeyResult/DynamicIcon'
import { UpdateIcon } from 'src/components/KeyResult/List/Body/Columns/KeyResult/update-icon'
import { KeyResult } from 'src/components/KeyResult/types'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'
import isCheckInModalOpenAtom from 'src/state/recoil/key-result/check-in/is-check-in-modal-open'
import { createdByCheckInNotificationAtom } from 'src/state/recoil/notifications'

import messages from './messages'

interface NotificationKeyResultProperties {
  isKeyResultOutdated?: boolean
  keyResult: KeyResult
  handleClick: (id: KeyResult['id']) => void
  userId: User['id']
}

const NotificationKeyResult = ({
  isKeyResultOutdated,
  keyResult,
  handleClick,
  userId,
}: NotificationKeyResultProperties) => {
  const intl = useIntl()
  const setIsCheckInModalOpen = useSetRecoilState(isCheckInModalOpenAtom)
  const setCreatedByNotification = useSetRecoilState(createdByCheckInNotificationAtom)
  const isCreated = useRecoilValue(createdByCheckInNotificationAtom)
  const lastUpdateDate = keyResult?.status?.latestCheckIn?.createdAt
    ? new Date(keyResult?.status?.latestCheckIn?.createdAt)
    : undefined

  const updateTextColor = keyResult?.status?.isOutdated ? 'red.500' : 'gray.300'

  const { dispatch } = useEvent(EventType.NOTIFICATION_CHECK_IN_CLICK)

  console.log(isCreated)

  return (
    <>
      <Divider borderColor="new-gray.400" />
      <Flex padding="18px 0px" alignItems="center">
        <Box marginRight="20px">
          <KeyResultDynamicIcon
            borderRadius="8px"
            boxSize="40px"
            iconSize="20px"
            title={keyResult.title}
          />
        </Box>

        <Box flex="1">
          <Text fontWeight="400" color="new-gray.900">
            {keyResult.title}
          </Text>
          <Flex alignItems="center">
            <UpdateIcon
              isOutdated={keyResult.status.latestCheckIn ? keyResult.status.isOutdated : true}
              updateTextColor={updateTextColor}
            />
            <LastUpdateText
              prefix={intl.formatMessage(messages.lastCheckInPrefix)}
              date={lastUpdateDate}
              color={updateTextColor}
              author={
                isKeyResultOutdated ? undefined : keyResult.status.latestCheckIn?.user.fullName
              }
            />
          </Flex>
        </Box>
        <Box>
          {isKeyResultOutdated && (
            <Button
              marginLeft={10}
              variant="solid"
              padding="7px 13px"
              fontSize={12}
              label={intl.formatMessage(messages.checkInButton)}
              onClick={() => {
                handleClick(keyResult.id)
                setIsCheckInModalOpen(true)
                setCreatedByNotification(true)
                dispatch({ userId })
              }}
            />
          )}
        </Box>
      </Flex>
    </>
  )
}

export default NotificationKeyResult
