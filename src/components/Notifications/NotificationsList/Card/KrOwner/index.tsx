import { Box, Flex, Heading, Tag, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { KeyResultDynamicIcon } from 'src/components/KeyResult'
import { KEY_RESULT_MODE } from 'src/components/KeyResult/constants'
import { NOTIFICATIONS_TYPE } from 'src/components/Notifications/constants'

import { Notification } from '../../types'
import BaseCardNotification from '../Base'

import messages from './messages'

const KrOwner = ({ properties, timestamp, isRead }: Notification) => {
  const intl = useIntl()

  return (
    <BaseCardNotification
      sender={properties.sender}
      timestamp={timestamp}
      isRead={isRead}
      type={NOTIFICATIONS_TYPE.KR_OWNER}
      describeBadgeAvatarIcon={messages.describeNotificationFirstPart}
    >
      <Heading display="flex" width="100%" justifyContent="space-between" textAlign="left">
        <Box display="flex" alignItems="flex-start" justifyContent="center" flexDir="column">
          <Text
            display="inline-block"
            fontSize="14px"
            fontWeight="400"
            color="new-gray.900"
            maxW="250px"
          >
            {intl.formatMessage(messages.describeNotificationFirstPart)}
            <Text
              textDecoration="underline"
              fontWeight="bold"
              textUnderlineOffset={2}
              display="inline-block"
            >
              {intl.formatMessage(messages.describeNotificationSecondPart)}
            </Text>
            {intl.formatMessage(messages.describeNotificationThirdPart)}
          </Text>
          <Tag marginTop="5px" bg="new-gray.100" color="new-gray.600">
            {properties?.keyResult?.mode}
          </Tag>

          <Flex marginTop="8px">
            <KeyResultDynamicIcon
              mode={
                properties?.keyResult?.mode.toLowerCase() === KEY_RESULT_MODE.DRAFT.toLowerCase()
                  ? KEY_RESULT_MODE.DRAFT
                  : KEY_RESULT_MODE.PUBLISHED
              }
              boxSize="30px"
              iconSize="20px"
              title="Desenvolver iniciativas para aumentar o volume de leads no topo de funil em 30%"
            />
            <Text marginLeft="8px" fontWeight={700} fontSize={14} color="new-gray.800">
              {properties?.keyResult?.name}
            </Text>
          </Flex>
        </Box>
      </Heading>
    </BaseCardNotification>
  )
}

export default KrOwner
