import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { ArrowRightLong } from 'src/components/Icon'
import ConfidenceTag from 'src/components/KeyResult/ConfidenceTag'
import { NOTIFICATIONS_TYPE } from 'src/components/Notifications/constants'
import { ConfidenceMapper } from 'src/components/Report/BoardsOverview/KeyResultListing/types'

import { NotificationsProperties } from '../../types'
import BaseCardNotification from '../Base'
import { NotificationKeyResult } from '../Base/KeyResult'

import messages from './messages'

export interface ConfidenceCheckinProperties extends NotificationsProperties {
  keyResult?: {
    id: string
    name: string
  }
  previousConfidance?: number
  newConfidence?: number
}

const ConfidenceCheckin = ({ ...properties }: ConfidenceCheckinProperties) => {
  const intl = useIntl()
  const typeCheckinMessage = properties.newConfidence
    ? intl.formatMessage(messages.wrapperMessage, {
        specific:
          properties.newConfidence === ConfidenceMapper.barrier
            ? messages.barrierMediumMessage.defaultMessage
            : messages.lowConfidenceMediumMessage.defaultMessage,
      })
    : undefined

  return (
    <BaseCardNotification
      describeBadgeAvatarIcon={
        properties.newConfidence === ConfidenceMapper.barrier
          ? messages.barrierMediumMessage
          : messages.lowConfidenceMediumMessage
      }
      timestamp={properties.timestamp}
      isRead={properties.isRead}
      sender={properties.sender}
      badgeIcon={
        properties.newConfidence === ConfidenceMapper.barrier
          ? NOTIFICATIONS_TYPE.CONFIDENCE_BARRIER
          : NOTIFICATIONS_TYPE.LOW_CONFIDENCE
      }
    >
      <Heading display="flex" width="100%" justifyContent="space-between" textAlign="left">
        <Box display="flex" alignItems="flex-start" justifyContent="center" flexDir="column">
          <Text fontSize={16} fontWeight="bold" color="new-gray.800">
            {properties.sender?.name}
          </Text>
          <Text fontSize={14} fontWeight="normal" color="new-gray.700">
            {typeCheckinMessage}
          </Text>
        </Box>
      </Heading>
      <NotificationKeyResult keyResult={properties.keyResult?.name} />
      <Box display="flex" alignItems="center" justifyContent="flex-start" gap={2}>
        <ConfidenceTag confidenceValue={properties.previousConfidance} />
        <ArrowRightLong desc="arr" fill="new-gray.500" />
        <ConfidenceTag confidenceValue={properties.newConfidence} />
      </Box>
    </BaseCardNotification>
  )
}

export default ConfidenceCheckin
