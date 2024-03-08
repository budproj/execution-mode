
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSetRecoilState } from 'recoil'

import { NOTIFICATIONS_TYPE } from 'src/components/Notifications/constants'
import { taskDrawerIdAtom } from 'src/state/recoil/task-management/drawers/task-drawer/task-drawer-id'
import { taskDrawerAtom } from 'src/state/recoil/task-management/drawers/task-drawer/task-drawer'
import { Notification } from '../../types'
import BaseCardNotification from '../Base'

import messages from './messages'

const AssignedTaskInProject = ({ properties, timestamp, isRead }: Notification) => {
  const intl = useIntl()
  const { push } = useRouter()
  const setTaskDrawer = useSetRecoilState(taskDrawerAtom)
  const setTaskDrawerId = useSetRecoilState(taskDrawerIdAtom)
  const boardLink = properties?.teamId
    ? `explore/${properties?.teamId}?activeTab=tasks`
    : '#'

  return (
    <BaseCardNotification
      sender={properties.sender}
      describeBadgeAvatarIcon={messages.describeNotification}
      timestamp={timestamp}
      isRead={isRead}
      badgeIcon={NOTIFICATIONS_TYPE.ASSIGNED_TASK_IN_PROJECT}
      handleClick={() => {
        push(boardLink)
        setTaskDrawer(properties?.taskBoard)
        setTaskDrawerId(properties?.taskBoard?._id)
      }}
    >
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
        <Text color="black.900" fontWeight="nomral" fontSize={14}>
          {properties.task?.name}
        </Text>
      </Flex>
    </BaseCardNotification>
  )
}

export default AssignedTaskInProject
