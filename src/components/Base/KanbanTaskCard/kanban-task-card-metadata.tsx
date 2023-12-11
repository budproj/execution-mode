import { Avatar, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { HighPriorityIcon, VeryHighPriorityIcon } from 'src/components/Icon'
import CheckIcon from 'src/components/Icon/Check'
import LowPriorityIcon from 'src/components/Icon/LowPriorityIcon'
import MediumPriorityIcon from 'src/components/Icon/MediumPriorityIcon'
import { User } from 'src/components/User/types'
import selectUser from 'src/state/recoil/user/selector'

import { TaskPriotiry } from './kanban-task-card-root'

interface KanbanTaskCardMetadataProperties {
  dueDate?: Date
  ownerId?: User['id']
  priority?: TaskPriotiry
}

export const KanbanTaskCardMetadata = ({
  dueDate,
  ownerId,
  priority,
}: KanbanTaskCardMetadataProperties) => {
  const intl = useIntl()
  const user = useRecoilValue(selectUser(ownerId))

  return (
    <HStack justifyContent="space-between" w="100%">
      <Flex alignItems="center" gap={2}>
        <CheckIcon
          width="16px"
          height="16px"
          borderRadius="5px"
          background="brand.300"
          fill="brand.600"
          desc=""
        />
        <Text fontSize={14} color="brand.500">
          {intl.formatDate(dueDate)}
        </Text>
      </Flex>
      <Flex alignItems="center" gap={3}>
        {priority && <TaskPriority priority={priority} />}
        <Avatar name={user?.fullName} src={user?.picture} w={7} h={7} loading="lazy" />
      </Flex>
    </HStack>
  )
}

const Icon = {
  1: LowPriorityIcon,
  2: MediumPriorityIcon,
  3: HighPriorityIcon,
  4: VeryHighPriorityIcon,
}

type TaskPriorityProperties = {
  priority: keyof typeof Icon
}

const TaskPriority = ({ priority }: TaskPriorityProperties) => {
  const PriorityIcon = Icon[priority]

  return <PriorityIcon desc="sdsa" />
}
