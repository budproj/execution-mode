import { Stack, Text, Box, HStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { Accordion } from 'src/components/Base/Accordion'
import { KeyResultDynamicIcon } from 'src/components/KeyResult'
import { KeyResultChecklist } from 'src/components/KeyResult/Single/Sections/Checklist/checklist'
import { useTeamTasksData } from 'src/components/TaskManagement/hooks/new-task/use-get-team-tasks'
import { KeyResult } from 'src/services/okr/key-result/@types'

import messages from './messages'

interface TasksProperties {
  items: Array<Partial<KeyResult>>
  onUpdate: () => void
}

interface KeyResultTasksProperties {
  keyResult: Partial<KeyResult>
  createTaskLabel: string
  onUpdate: () => void
}

const KeyResultTasks = ({ keyResult, createTaskLabel, onUpdate }: KeyResultTasksProperties) => {
  const router = useRouter()
  const { id } = router.query
  const { data: tasks = [], refetch } = useTeamTasksData({
    teamId: id as string,
    kr: keyResult.id ?? '',
  })
  const hasItems = tasks.length > 0

  const canCreate = !hasItems

  useEffect(() => {
    if (keyResult.id) refetch()
  }, [keyResult.id, refetch])

  return (
    <Accordion
      textPadding="0"
      title={
        <HStack key={keyResult.id} py={3} textAlign="left">
          <KeyResultDynamicIcon title={keyResult.title} boxSize="30px" iconSize="16px" />
          <Text maxWidth="calc(100% - 50px)" fontWeight={600} pl="0.5rem">
            {keyResult.title}
          </Text>
        </HStack>
      }
    >
      <Box transform="translateY(-10px)" pl="2.2rem">
        <KeyResultChecklist
          isEditable
          keyResultID={keyResult.id}
          nodes={tasks}
          canCreate={canCreate}
          wrapperProps={{ pt: 0 }}
          createTaskLabel={createTaskLabel}
          onUpdate={onUpdate}
        />
      </Box>
    </Accordion>
  )
}

const Tasks = ({ items, onUpdate }: TasksProperties) => {
  const intl = useIntl()
  const createTaskLabel = intl.formatMessage(messages.createTaskLabel)
  return (
    <Stack align="stretch">
      {items.map((item) => (
        <KeyResultTasks
          key={item.id}
          keyResult={item}
          createTaskLabel={createTaskLabel}
          onUpdate={onUpdate}
        />
      ))}
    </Stack>
  )
}

export default Tasks
