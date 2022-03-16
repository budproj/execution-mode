import { Stack, Text, Box, HStack, Divider } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import { KeyResultDynamicIcon } from 'src/components/KeyResult'
import { KeyResultChecklist } from 'src/components/KeyResult/Single/Sections/Checklist/checklist'
import { KeyResult, KeyResultCheckMark } from 'src/components/KeyResult/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'

interface TasksProperties {
  items: Array<Partial<KeyResult>>
  onUpdate: () => void
}

interface KeyResultTasksProperties {
  keyResult: Partial<KeyResult>
  onUpdate: () => void
}

const KeyResultTasks = ({ keyResult, onUpdate }: KeyResultTasksProperties) => {
  const [checklist, updateChecklistEdges] = useConnectionEdges<KeyResultCheckMark>()

  useEffect(() => {
    updateChecklistEdges(keyResult.checkList?.edges)
  }, [keyResult.checkList?.edges, updateChecklistEdges])

  return (
    <Box>
      <HStack key={keyResult.id}>
        <KeyResultDynamicIcon title={keyResult.title} boxSize="40px" />
        <Text pl="0.5rem">{keyResult.title}</Text>
      </HStack>
      <Box pl="4rem">
        <KeyResultChecklist
          keyResultID={keyResult.id}
          nodes={checklist}
          canCreate={false}
          onUpdate={onUpdate}
        />
      </Box>
    </Box>
  )
}

const Tasks = ({ items, onUpdate }: TasksProperties) => (
  <Stack align="stretch">
    {items.map((item) => (
      <Box key={item.id}>
        <Divider my={9} />
        <KeyResultTasks keyResult={item} onUpdate={onUpdate} />
      </Box>
    ))}
  </Stack>
)

export default Tasks