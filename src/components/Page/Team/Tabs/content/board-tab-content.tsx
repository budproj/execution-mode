import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
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

import { BoardFilters } from '../BoardFilters'

import messages from './messages'

interface BoardTabContentProperties {
  readonly teamId: Team['id']
}

const TasksTabContent = ({ teamId }: BoardTabContentProperties) => {
  const setSelectedTeamId = useSetRecoilState(selectedTeamIdHighlight)

  const team = useRecoilValue(teamAtomFamily(teamId))
  const [searchTaskInput, setSearchTaskInput] = useState<string>()
  const [resetFilters, setResetFilters] = useState<boolean>(false)

  const intl = useIntl()
  const router = useRouter()

  useEffect(() => {
    if (
      router.query.key_result_id ||
      router.query.cy ||
      router.query.cy ||
      router.query.show_done
    ) {
      setResetFilters(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  useEffect(() => {
    setSelectedTeamId(teamId)
  }, [setSelectedTeamId, teamId])

  const onResetFilters = () => {
    router.query.key_result_id = undefined
    router.query.show_done = undefined
    router.query.cy = undefined
    router.push(router)
  }

  return (
    <Stack direction="column" spacing={8} maxH="100%">
      <HStack width="100%" alignItems="center" justifyContent="space-between">
        <Text color="new-gray.900" fontSize={24} fontWeight="bold">
          {intl.formatMessage(messages.boardTabHeaderTitle, { team: team?.name })}
        </Text>
        <HStack alignItems="center">
          {resetFilters && (
            <Text
              color="brand.500"
              fontSize="14px"
              fontWeight="500"
              margin="0 10px"
              onClick={() => onResetFilters()}
            >
              Limpar filtros
            </Text>
          )}
          <BoardFilters teamId={teamId} />
          <Box maxW={320} minW={320} w="100%">
            <SearchBar
              placeholder={intl.formatMessage(messages.searchTaskInput)}
              onSearch={setSearchTaskInput}
            />
          </Box>
        </HStack>
      </HStack>
      <BoardWrapper teamId={teamId} searchTaskInput={searchTaskInput} />
      <TaskInsertDrawer />
      <TaskDrawer teamId={teamId} />
    </Stack>
  )
}

export default TasksTabContent
