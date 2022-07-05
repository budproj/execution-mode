import { Avatar, AvatarBadge, Box, Checkbox, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import LastUpdateText from 'src/components/Base/LastUpdateText'
import CircleIcon from 'src/components/Icon/Circle'
import { NOTIFICATIONS_TYPE } from 'src/components/Notifications/constants'

import { NotificationsProperties } from '../../types'
import { BadgeAvatarIcon } from '../Avatar'

import messages from './messages'

export interface AssignedTaskProperties extends NotificationsProperties {
  task?: {
    id: string
    name: string
  }
}

const AssignedTask = ({ ...properties }: AssignedTaskProperties) => {
  const checkinDate = properties?.timestamp ? new Date(properties.timestamp) : undefined
  const intl = useIntl()
  return (
    <Box
      bg={properties.isRead ? undefined : 'new-gray.50'}
      paddingY={6}
      paddingX={2}
      maxW="100%"
      display="flex"
      position="relative"
      alignItems="flex-start"
      justifyContent="flex-start"
      gap={6}
    >
      <Avatar src={properties.sender?.picture}>
        <AvatarBadge boxSize="1.2em" border="none">
          <BadgeAvatarIcon desc="qsdas" typeNotification={NOTIFICATIONS_TYPE.ASSIGNED_TASK} />
        </AvatarBadge>
      </Avatar>
      <Flex flexDir="column" alignItems="flex-start" justifyContent="center" gap={3}>
        <Heading display="flex" width="100%" justifyContent="space-between" textAlign="left">
          <Box display="flex" alignItems="flex-start" justifyContent="center" flexDir="column">
            <Text fontSize={16} fontWeight="bold" color="new-gray.800">
              {properties.sender?.name}
            </Text>
            <Text fontSize={14} fontWeight="normal" color="new-gray.700">
              {intl.formatMessage(messages.describeNotification)}
            </Text>
          </Box>
        </Heading>
        <Flex alignItems="center" justifyContent="center" gap={2}>
          <Checkbox isDisabled isChecked={false} />
          <Text color="black.900" fontWeight="nomral" fontSize={14}>
            {properties.task?.name ?? ''}
          </Text>
        </Flex>
      </Flex>
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
    </Box>
  )
}

export default AssignedTask
