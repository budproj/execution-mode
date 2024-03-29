import { Box, Button, HStack, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { SearchBar } from 'src/components/Base/SearchBar/wrapper'
import BoardWrapper from 'src/components/TaskManagement/Board/wrapper'
import { TaskInsertDrawer } from 'src/components/TaskManagement/InsertDrawer/wrapper'
import { TaskDrawer } from 'src/components/TaskManagement/TaskDrawer'
import { Team } from 'src/components/Team/types'
import { teamAtomFamily } from 'src/state/recoil/team'
import { selectedTeamIdHighlight } from 'src/state/recoil/team/highlight/selected-team-id-highlight'

import messages from './messages'

interface BoardTabContentProperties {
  readonly teamId: Team['id']
  readonly isLoading?: boolean
}

const TasksTabContent = ({ teamId, isLoading }: BoardTabContentProperties) => {
  const setSelectedTeamId = useSetRecoilState(selectedTeamIdHighlight)
  const team = useRecoilValue(teamAtomFamily(teamId))
  const [searchTaskInput, setSearchTaskInput] = useState<string>()

  const intl = useIntl()
  // TODO: remove this
  console.log({ isLoading })

  useEffect(() => {
    setSelectedTeamId(teamId)
  }, [setSelectedTeamId, teamId])

  return (
    <Stack direction="column" spacing={8} maxH="100%">
      <HStack width="100%" alignItems="center" justifyContent="space-between">
        <Text color="new-gray.900" fontSize={24} fontWeight="bold">
          {intl.formatMessage(messages.boardTabHeaderTitle, { team: team?.name })}
        </Text>
        <HStack alignItems="center">
          <Box maxW={320} w="100%">
            <SearchBar
              placeholder={intl.formatMessage(messages.searchTaskInput)}
              onSearch={setSearchTaskInput}
            />
          </Box>
          <a
            href="https://bit.ly/sugestoestmanager"
            target="_blank"
            style={{ textDecoration: 'none' }}
            rel="noreferrer"
          >
            <Button
              bg="#525F7F"
              color="black.50"
              _hover={{ background: 'brand.400', color: 'black.50' }}
              paddingY={2}
            >
              Dar sugestão
            </Button>
          </a>
        </HStack>
      </HStack>
      <BoardWrapper teamId={teamId} searchTaskInput={searchTaskInput} />
      <TaskInsertDrawer />
      <TaskDrawer teamId={teamId} />
    </Stack>
  )
}

export default TasksTabContent
