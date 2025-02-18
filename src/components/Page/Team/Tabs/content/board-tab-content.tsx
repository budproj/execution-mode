import { Box, HStack, MenuItemOption, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { SelectMenu } from 'src/components/Base'
import { SearchBar } from 'src/components/Base/SearchBar/wrapper'
import { useTeamCycleData } from 'src/components/Cycle/hooks/use-get-team-cycle'
import { useTeamKRData } from 'src/components/KeyResult/hooks/use-get-team-key-result'
import BoardWrapper from 'src/components/TaskManagement/Board/wrapper'
import { TaskInsertDrawer } from 'src/components/TaskManagement/InsertDrawer/wrapper'
import { TaskDrawer } from 'src/components/TaskManagement/TaskDrawer'
import { Team } from 'src/components/Team/types'
import { CycleCadence } from 'src/services/okr/cycle/@types'
import { teamAtomFamily } from 'src/state/recoil/team'
import { selectedTeamIdHighlight } from 'src/state/recoil/team/highlight/selected-team-id-highlight'

import messages from './messages'

interface BoardTabContentProperties {
  readonly teamId: Team['id']
}

const TasksTabContent = ({ teamId }: BoardTabContentProperties) => {
  const router = useRouter()

  const setSelectedTeamId = useSetRecoilState(selectedTeamIdHighlight)

  const team = useRecoilValue(teamAtomFamily(teamId))
  const [searchTaskInput, setSearchTaskInput] = useState<string>()
  const { data: KeyResultData, isFetching: krFetching } = useTeamKRData(teamId, '0')

  const intl = useIntl()

  useEffect(() => {
    setSelectedTeamId(teamId)
  }, [setSelectedTeamId, teamId])

  const handleQuery = (key: string) => (newValue: string | string[]) => {
    if (newValue !== 'none') {
      router.query[key] = newValue
      router.push(router)
      return true
    }

    router.query[key] = undefined
    router.push(router)
    return true
  }

  const krSelected = (): string | undefined => {
    const key = router.query.kr ? router.query.kr : undefined
    if (key) {
      const selectedKr = KeyResultData?.find((kr) => kr.id === key)
      return selectedKr ? selectedKr.title : undefined
    }

    return key
  }

  const cycleSelected = (): string | undefined => {
    const key = router.query.cycle ? router.query.cycle : undefined
    if (key) {
      return Array.isArray(key) ? undefined : CycleCadence[key as keyof typeof CycleCadence]
    }
  }

  return (
    <Stack direction="column" spacing={8} maxH="100%">
      <HStack width="100%" alignItems="center" justifyContent="space-between">
        <Text color="new-gray.900" fontSize={24} fontWeight="bold">
          {intl.formatMessage(messages.boardTabHeaderTitle, { team: team?.name })}
        </Text>
        <HStack alignItems="center">
          <SelectMenu
            closeOnSelect
            valueLabel={cycleSelected()}
            width={320}
            borderWidth={1}
            borderColor="new-gray.400"
            fill="new-gray.600"
            height="32px"
            isDisabled={false}
            placeholder="Filtrar por ciclo"
            onChange={handleQuery('cycle')}
          >
            <MenuItemOption value="none">Selecionar</MenuItemOption>
            {Object.entries(CycleCadence).map(([key, value]) => (
              <MenuItemOption key={key} value={key}>
                {value}
              </MenuItemOption>
            ))}
          </SelectMenu>
          <SelectMenu
            closeOnSelect
            valueLabel={krSelected()}
            width={320}
            borderWidth={1}
            borderColor="new-gray.400"
            fill="new-gray.600"
            height="32px"
            isDisabled={krFetching}
            placeholder="Filtrar por KR"
            onChange={handleQuery('kr')}
          >
            <MenuItemOption value="none">Selecionar</MenuItemOption>
            {KeyResultData?.map((keyResult) => (
              <MenuItemOption key={keyResult.id} value={keyResult.id}>
                {keyResult.title}
              </MenuItemOption>
            ))}
          </SelectMenu>
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
