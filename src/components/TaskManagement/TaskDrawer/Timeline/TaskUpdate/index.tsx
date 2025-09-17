import { HStack, Divider, VStack, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import KeyResultSectionTimelineLine from 'src/components/KeyResult/Single/Sections/Timeline/Cards/Updates/line'
import { KeyResultPatchInterface } from 'src/components/KeyResult/types'
import { TaskHistory } from 'src/services/task-management/@types/task-history.type'

interface TaskUpdateComponentProperties {
  readonly taskUpdate: TaskHistory
}

export const TaskUpdateComponent = ({ taskUpdate }: TaskUpdateComponentProperties) => {
  const intl = useIntl()

  const timestampConverted = taskUpdate?.createdAt ? new Date(taskUpdate.createdAt) : new Date()

  const formattedDate = intl.formatDate(timestampConverted, {
    month: 'short',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
  })

  return (
    taskUpdate && (
      <VStack gap={3}>
        <HStack key={taskUpdate.id} gap={2} w="100%">
          <Divider />
          <VStack>
            <KeyResultSectionTimelineLine
              patche={{ key: taskUpdate.id, value: taskUpdate.newState } as KeyResultPatchInterface}
              userName={taskUpdate?.author.fullName}
            />
            <Text lineHeight={1} fontSize={12} color="new-gray.700" noOfLines={1} w="max-content">
              {formattedDate}
            </Text>
          </VStack>
          <Divider />
        </HStack>
      </VStack>
    )
  )
}
