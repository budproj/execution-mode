import { Stack, Text, Box, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { Accordion } from 'src/components/Base/Accordion'
import { KeyResultDynamicIcon } from 'src/components/KeyResult'
import { KeyResultChecklist } from 'src/components/KeyResult/Single/Sections/Checklist/checklist'
import { KeyResult } from 'src/components/KeyResult/types'
import { useGetNewTask } from 'src/components/TaskManagement/hooks/use-get-tasks-new'
//import { GraphQLEffect } from 'src/components/types'
//import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'

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
  /*onst [checklist, updateChecklistEdges] = useConnectionEdges<KeyResultCheckMark>()
  const canCreate = keyResult.checkList?.policy?.create === GraphQLEffect.ALLOW

  useEffect(() => {
    updateChecklistEdges(keyResult.checkList?.edges)
  }, [keyResult.checkList?.edges, updateChecklistEdges])*/

  const router = useRouter()
  const { id } = router.query


  const {
    data: tasks = [],
    refetch,
  } = useGetNewTask(id as string, keyResult.id ?? '')

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
          checkPolicy={false}
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
