import { Avatar, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { VeryHighPriorityIcon } from 'src/components/Icon'
import CheckIcon from 'src/components/Icon/Check'
import { User } from 'src/components/User/types'
import selectUser from 'src/state/recoil/user/selector'

interface KanbanTaskCardMetadataProperties {
  dueDate?: Date
  ownerId?: User['id']
  priority?: number
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
        <TaskPriority priority={priority ?? 1} />
        <Avatar name={user?.fullName} src={user?.picture} w={7} h={7} loading="lazy" />
      </Flex>
    </HStack>
  )
}

type TaskPriorityProperties = {
  priority: number
}

const TaskPriority = ({ priority }: TaskPriorityProperties) => {
  return <VeryHighPriorityIcon desc="sdsa" />
}
