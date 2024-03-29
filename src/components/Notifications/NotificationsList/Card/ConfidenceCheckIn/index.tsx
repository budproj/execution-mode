import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { ArrowRightLong } from 'src/components/Icon'
import ConfidenceTag from 'src/components/KeyResult/ConfidenceTag'
import { NOTIFICATIONS_TYPE } from 'src/components/Notifications/constants'
import { ConfidenceMapper } from 'src/components/Report/BoardsOverview/KeyResultListing/types'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'

import { Notification } from '../../types'
import BaseCardNotification from '../Base'
import { KeyResultNotificationContent } from '../Base/KeyResult'

import messages from './messages'

const ConfidenceCheckin = ({ properties, isRead, timestamp }: Notification) => {
  const intl = useIntl()

  const setOpenDrawer = useSetRecoilState(keyResultReadDrawerOpenedKeyResultID)

  const openDrawer = () => setOpenDrawer(properties.keyResult?.id)

  const typeCheckinMessage = properties?.newConfidence
    ? intl.formatMessage(messages.wrapperMessage, {
        specific:
          properties.newConfidence === ConfidenceMapper.barrier
            ? intl.formatMessage(messages.barrierMediumMessage)
            : intl.formatMessage(messages.lowConfidenceMediumMessage),
      })
    : undefined

  return (
    <BaseCardNotification
      describeBadgeAvatarIcon={
        properties?.newConfidence === ConfidenceMapper.barrier
          ? messages.barrierMediumMessage
          : messages.lowConfidenceMediumMessage
      }
      timestamp={timestamp}
      isRead={isRead}
      sender={properties.sender}
      badgeIcon={
        properties?.newConfidence === ConfidenceMapper.barrier
          ? NOTIFICATIONS_TYPE.CONFIDENCE_BARRIER
          : NOTIFICATIONS_TYPE.LOW_CONFIDENCE
      }
      handleClick={openDrawer}
    >
      <Heading display="flex" width="100%" justifyContent="space-between" textAlign="left">
        <Box display="flex" alignItems="flex-start" justifyContent="center" flexDir="column">
          <Text fontSize={16} fontWeight="bold" color="new-gray.800">
            {properties?.sender?.name}
          </Text>
          <Text fontSize={14} fontWeight="normal" color="new-gray.700">
            {typeCheckinMessage}
          </Text>
        </Box>
      </Heading>
      <KeyResultNotificationContent keyResultTitle={properties.keyResult?.name} />
      <Box display="flex" alignItems="center" justifyContent="flex-start" gap={2}>
        <ConfidenceTag confidenceValue={properties?.previousConfidance} />
        <ArrowRightLong desc="arr" fill="new-gray.500" />
        <ConfidenceTag confidenceValue={properties?.newConfidence} />
      </Box>
    </BaseCardNotification>
  )
}

export default ConfidenceCheckin
