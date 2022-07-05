import { Avatar, AvatarBadge, Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import LastUpdateText from 'src/components/Base/LastUpdateText'
import { ArrowRightLong } from 'src/components/Icon'
import CircleIcon from 'src/components/Icon/Circle'
import { KeyResultDynamicIcon } from 'src/components/KeyResult'
import ConfidenceTag from 'src/components/KeyResult/ConfidenceTag'
import { NOTIFICATIONS_TYPE } from 'src/components/Notifications/constants'
import { ConfidenceMapper } from 'src/components/Report/BoardsOverview/KeyResultListing/types'

import { NotificationsProperties } from '../../types'
import { BadgeAvatarIcon } from '../Avatar'

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
  const checkinDate = properties?.timestamp ? new Date(properties.timestamp) : undefined
  const typeCheckinMessage = properties.newConfidence
    ? intl.formatMessage(messages.wrapperMessage, {
        specific:
          properties.newConfidence === ConfidenceMapper.barrier
            ? messages.barrierMediumMessage.defaultMessage
            : messages.lowConfidenceMediumMessage.defaultMessage,
      })
    : undefined

  return (
    <Box
      bg={properties.isRead ? undefined : 'new-gray.50'}
      paddingY={6}
      paddingX={2}
      width="100%"
      display="flex"
      position="relative"
      alignItems="flex-start"
      justifyContent="flex-start"
      gap={6}
    >
      <Avatar src={properties.sender?.picture}>
        <AvatarBadge boxSize="1.2em" border="none">
          <BadgeAvatarIcon
            desc="qsdas"
            typeNotification={
              properties.newConfidence === ConfidenceMapper.barrier
                ? NOTIFICATIONS_TYPE.CONFIDENCE_BARRIER
                : NOTIFICATIONS_TYPE.LOW_CONFIDENCE
            }
          />
        </AvatarBadge>
      </Avatar>
      <Flex flexDir="column" alignItems="flex-start" justifyContent="center" gap={3}>
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
        <Flex alignItems="flex-start" justifyContent="center" gap={2}>
          <KeyResultDynamicIcon iconSize={5} boxSize={7} borderRadius={4} title="Message" />
          <Text color="new-gray.800" fontWeight="bold" fontSize={14}>
            {properties.keyResult?.name ?? ''}
          </Text>
        </Flex>
        <Box display="flex" alignItems="center" justifyContent="flex-start" gap={2}>
          <ConfidenceTag confidenceValue={properties.previousConfidance} />
          <ArrowRightLong desc="arr" fill="new-gray.500" />
          <ConfidenceTag confidenceValue={properties.newConfidence} />
        </Box>

        {!properties.isRead && (
          <CircleIcon
            position="absolute"
            desc="sa"
            fill="#6F6EFF"
            w={4}
            h={4}
            right={2}
            top="50%"
            transform="translate(0, -50%)"
          />
        )}
        <LastUpdateText
          date={checkinDate ?? new Date('2022-06-27')}
          prefix={Date.now() > new Date('2022-06-27').getTime() ? '' : 'há'}
          fontSize={12}
          position="absolute"
          fontWeight="normal"
          right={2}
          top={5}
          color="new-gray.500"
          textAlign="right"
        />
      </Flex>
    </Box>
  )
}

export default ConfidenceCheckin
