import { Box } from '@chakra-ui/react'
import React from 'react'

import TeamsOverviewBodyTableLineTemplate from 'src/components/Report/TeamsOverview/Body/Table/LineTemplate'
import { Team } from 'src/components/Team/types'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'

import {
  TeamsOverviewBodyTableBodyPositionBadge,
  TeamsOverviewBodyTableBodyColumnProgress,
  TeamsOverviewBodyTableBodyColumnProgressIncrease,
} from './Columns'

export interface TeamsOverviewBodyTableBodyProperties {
  teamsRanking: Team[]
  isGameficationDisabled?: boolean
}

const TeamsOverviewBodyTableBody = ({
  teamsRanking,
  isGameficationDisabled,
}: TeamsOverviewBodyTableBodyProperties) => {
  const { dispatch } = useEvent(EventType.RANKING_CLICK)

  return (
    <Box onClick={() => dispatch({})}>
      {teamsRanking.map((team, index) => (
        <TeamsOverviewBodyTableLineTemplate key={team?.id ?? Math.random()}>
          <TeamsOverviewBodyTableBodyPositionBadge
            order={index + 1}
            isGameficationDisabled={isGameficationDisabled}
          />
          <TeamsOverviewBodyTableBodyColumnProgress team={team} />
          <TeamsOverviewBodyTableBodyColumnProgressIncrease team={team} />
        </TeamsOverviewBodyTableLineTemplate>
      ))}
    </Box>
  )
}

export default TeamsOverviewBodyTableBody
