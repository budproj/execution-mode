import { Stack, Container, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Team } from 'src/components/Team/types'
import { TASK_STATUS as ColumnType } from 'src/services/task-management/task-management.service'

import Column from './components/column'

type BoardWrapperProperties = {
  teamId: Team['id']
}

const BoardWrapper = ({ teamId }: BoardWrapperProperties) => {
  console.log({ teamId })

  return (
    <Stack w="100%">
      <DndProvider backend={HTML5Backend}>
        <Container maxWidth="100%">
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 16, md: 6 }}>
            <Column column={ColumnType.PENDING} teamId={teamId} />
            <Column column={ColumnType.TO_DO} teamId={teamId} />
            <Column column={ColumnType.DOING} teamId={teamId} />
            <Column column={ColumnType.DONE} teamId={teamId} />
          </SimpleGrid>
        </Container>
      </DndProvider>
    </Stack>
  )
}

export default BoardWrapper
