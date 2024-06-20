import { Avatar, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { HighPriorityIcon, VeryHighPriorityIcon } from 'src/components/Icon'
import CheckIcon from 'src/components/Icon/Check'
import ClockIcon from 'src/components/Icon/Clock'
import LowPriorityIcon from 'src/components/Icon/LowPriorityIcon'
import MediumPriorityIcon from 'src/components/Icon/MediumPriorityIcon'
import { User } from 'src/components/User/types'
import { TASK_STATUS } from 'src/services/task-management/task-management.service'
import selectUser from 'src/state/recoil/user/selector'

import { TaskPriority } from './kanban-task-card-root'

interface KanbanTaskCardMetadataProperties {
  readonly dueDate?: Date
  readonly ownerId?: User['id']
  readonly priority?: TaskPriority
  readonly status?: TASK_STATUS
  isActive?: boolean
  updatedAt?: Date
}

export const KanbanTaskCardMetadata = ({
  dueDate,
  ownerId,
  priority,
  status,
  isActive,
  updatedAt,
}: KanbanTaskCardMetadataProperties) => {
  const intl = useIntl()
  const user = useRecoilValue(selectUser(ownerId))

  const isOutdated = dueDate ? new Date(dueDate) < new Date() : false
  const isCompleted = status === TASK_STATUS.done

  return (
    <HStack justifyContent="space-between" w="100%">
      <DueDateWrapper isCompleted={isCompleted} isOutdated={isOutdated} isActive={isActive}>
        {intl.formatDate(isActive ? dueDate : updatedAt)}
      </DueDateWrapper>
      <Flex alignItems="center" gap={3}>
        {priority && isActive && <TaskPriorityIcon priority={priority} />}
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
  readonly priority: keyof typeof Icon
  isActive?: boolean
}

export const TaskPriorityIcon = ({ priority }: TaskPriorityProperties) => {
  const PriorityIcon = Icon[priority]

  return <PriorityIcon desc="sdsa" />
}

type DueDateWrapperProperties = {
  readonly isOutdated: boolean
  readonly isCompleted: boolean
  readonly children: React.ReactNode
  isActive?: boolean
}

const DueDateIcon = {
  completed: (
    <CheckIcon
      desc="Not outdated"
      width="16px"
      height="16px"
      borderRadius="5px"
      background="brand.300"
      fill="brand.600"
    />
  ),
  outdated: (
    <ClockIcon
      desc="Not outdated"
      width="18px"
      height="18px"
      fill="#FF616A"
      stroke="#FFF0F1"
      outsideStroke="none"
    />
  ),
  notOutdated: (
    <ClockIcon
      desc="Not outdated"
      width="18px"
      height="18px"
      fill="#CDD6ED"
      stroke="#525F7F"
      outsideStroke="none"
    />
  ),
}

export const DueDateWrapper = ({
  isOutdated,
  isCompleted,
  children,
  isActive,
}: DueDateWrapperProperties) => {
  const Icon = isCompleted
    ? DueDateIcon.completed
    : isOutdated
    ? DueDateIcon.outdated
    : DueDateIcon.notOutdated
  const color = isCompleted ? 'brand.500' : isOutdated ? 'red.500' : 'gray.400'

  return (
    <HStack alignItems="center" gap={1}>
      {isActive ? Icon : DueDateIcon.notOutdated}
      <Text fontSize={14} color={isActive ? color : 'gray'}>
        {children}
      </Text>
    </HStack>
  )
}
