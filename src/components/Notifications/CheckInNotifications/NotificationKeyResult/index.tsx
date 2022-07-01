import { Flex, Text, Box, Divider } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { Button } from 'src/components/Base/Button'
import LastUpdateText from 'src/components/Base/LastUpdateText'
import KeyResultDynamicIcon from 'src/components/KeyResult/DynamicIcon'
import { UpdateIcon } from 'src/components/KeyResult/List/Body/Columns/KeyResult/update-icon'
import { KeyResult } from 'src/components/KeyResult/types'

import messages from './messages'

interface NotificationKeyResultProperties {
  isKeyResultOutdated?: boolean
  keyResult: KeyResult
  handleClick: (id: KeyResult['id']) => void
}

const NotificationKeyResult = ({
  isKeyResultOutdated,
  keyResult,
  handleClick,
}: NotificationKeyResultProperties) => {
  const intl = useIntl()
  const lastUpdateDate = keyResult?.status?.latestCheckIn?.createdAt
    ? new Date(keyResult?.status?.latestCheckIn?.createdAt)
    : undefined

  const updateTextColor = keyResult?.status?.latestCheckIn
    ? keyResult?.status?.isOutdated
      ? 'red.500'
      : 'gray.300'
    : 'red.500'

  console.log({ keyResult })

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
          <Text fontWeight="500" color="new-gray.900">
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
              onClick={() => handleClick(keyResult.id)}
            />
          )}
        </Box>
      </Flex>
    </>
  )
}

export default NotificationKeyResult
