import { Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import BoardWrapper from 'src/components/TaskManagement/Board/wrapper'
import { Team } from 'src/components/Team/types'
import { selectedTeamIdHighlight } from 'src/state/recoil/team/highlight/selected-team-id-highlight'

interface BoardTabContentProperties {
  teamId: Team['id']
  isLoading?: boolean
}

const TasksTabContent = ({ teamId, isLoading }: BoardTabContentProperties) => {
  const setSelectedTeamId = useSetRecoilState(selectedTeamIdHighlight)

  useEffect(() => {
    setSelectedTeamId(teamId)
  }, [setSelectedTeamId, teamId])

  return (
    <Stack direction="row" spacing={8} maxH="100%">
      <BoardWrapper teamId={teamId} />
    </Stack>
  )
}

export default TasksTabContent
