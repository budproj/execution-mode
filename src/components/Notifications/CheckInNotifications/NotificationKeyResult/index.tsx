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

  const updateTextColor = keyResult?.status?.isOutdated ? 'red.500' : 'gray.300'

  return (
    <>
      <Divider />
      <Flex padding="18px 0px">
        <Box marginRight="20px">
          <KeyResultDynamicIcon borderRadius="8px" boxSize="40px" title={keyResult.title} />
        </Box>

        <Box flex="1">
          <Text fontWeight="500">{keyResult.title}</Text>
          <Flex alignItems="center">
            <UpdateIcon
              isOutdated={keyResult.status.latestCheckIn ? keyResult.status.isOutdated : true}
              updateTextColor={updateTextColor}
            />
            <LastUpdateText
              prefix={intl.formatMessage(messages.lastCheckInPrefix)}
              date={lastUpdateDate}
              color={updateTextColor}
            />
          </Flex>
        </Box>
        <Box>
          {isKeyResultOutdated && (
            <Button
              marginLeft={10}
              backgroundColor="brand.50"
              padding="10px 15px"
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
