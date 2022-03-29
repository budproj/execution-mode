import { Stack, Text, Box, HStack, Divider } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import { KeyResultDynamicIcon } from 'src/components/KeyResult'
import { KeyResultChecklist } from 'src/components/KeyResult/Single/Sections/Checklist/checklist'
import { KeyResult, KeyResultCheckMark } from 'src/components/KeyResult/types'
import { GraphQLEffect } from 'src/components/types'
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
  const canCreate = keyResult.checkList?.policy?.create === GraphQLEffect.ALLOW

  useEffect(() => {
    updateChecklistEdges(keyResult.checkList?.edges)
  }, [keyResult.checkList?.edges, updateChecklistEdges])

  return (
    <Box>
      <HStack key={keyResult.id}>
        <KeyResultDynamicIcon title={keyResult.title} boxSize="30px" iconSize="16px" />
        <Text maxWidth="calc(100% - 50px)" fontWeight={600} pl="0.5rem">
          {keyResult.title}
        </Text>
      </HStack>
      <Box pl="3.2rem">
        <KeyResultChecklist
          keyResultID={keyResult.id}
          nodes={checklist}
          canCreate={canCreate}
          isEditable={false}
          onUpdate={onUpdate}
        />
      </Box>
    </Box>
  )
}

const Tasks = ({ items, onUpdate }: TasksProperties) => (
  <Stack align="stretch">
    {items.map((item, index) => (
      <Box key={item.id}>
        {index > 0 ? <Divider my={9} borderColor="new-gray.400" opacity="1" /> : undefined}
        <KeyResultTasks keyResult={item} onUpdate={onUpdate} />
      </Box>
    ))}
  </Stack>
)

export default Tasks
