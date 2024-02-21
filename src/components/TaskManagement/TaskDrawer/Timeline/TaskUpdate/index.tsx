import { HStack, Divider, VStack, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import KeyResultSectionTimelineLine from 'src/components/KeyResult/Single/Sections/Timeline/Cards/Updates/line'
import { KeyResultPatchInterface } from 'src/components/KeyResult/types'
import { TaskUpdate } from 'src/services/task-management/task-management.service'
import selectUser from 'src/state/recoil/user/selector'

interface TaskUpdateComponentProperties {
  readonly taskUpdate: TaskUpdate
}

export const TaskUpdateComponent = ({ taskUpdate }: TaskUpdateComponentProperties) => {
  const user = useRecoilValue(selectUser(taskUpdate?.author?.identifier))
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
    taskUpdate?.patches && (
      <VStack gap={3}>
        {taskUpdate.patches.map((patche) => (
          <HStack key={patche.key} gap={2} w="100%">
            <Divider />
            <VStack>
              <KeyResultSectionTimelineLine
                patche={patche as unknown as KeyResultPatchInterface}
                userName={user?.fullName}
              />
              <Text lineHeight={1} fontSize={12} color="new-gray.700" noOfLines={1} w="max-content">
                {formattedDate}
              </Text>
            </VStack>
            <Divider />
          </HStack>
        ))}
      </VStack>
    )
  )
}
