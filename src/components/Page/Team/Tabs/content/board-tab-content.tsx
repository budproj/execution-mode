import { Stack, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import BoardWrapper from 'src/components/TaskManagement/Board/wrapper'
import { Team } from 'src/components/Team/types'
import { teamAtomFamily } from 'src/state/recoil/team'
import { selectedTeamIdHighlight } from 'src/state/recoil/team/highlight/selected-team-id-highlight'

import messages from './messages'

interface BoardTabContentProperties {
  teamId: Team['id']
  isLoading?: boolean
}

const TasksTabContent = ({ teamId, isLoading }: BoardTabContentProperties) => {
  const setSelectedTeamId = useSetRecoilState(selectedTeamIdHighlight)
  const team = useRecoilValue(teamAtomFamily(teamId))
  const intl = useIntl()
  // TODO: remove this
  console.log({ isLoading })

  useEffect(() => {
    setSelectedTeamId(teamId)
  }, [setSelectedTeamId, teamId])

  return (
    <Stack direction="column" spacing={8} maxH="100%">
      <Text color="new-gray.900" fontSize={24} fontWeight="bold">
        {intl.formatMessage(messages.boardTabHeaderTitle, { team: team?.name })}
      </Text>
      <BoardWrapper teamId={teamId} />
    </Stack>
  )
}

export default TasksTabContent
