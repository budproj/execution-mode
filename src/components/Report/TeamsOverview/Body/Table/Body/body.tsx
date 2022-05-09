import React from 'react'

import TeamsOverviewBodyTableLineTemplate from 'src/components/Report/TeamsOverview/Body/Table/LineTemplate'
import { Team } from 'src/components/Team/types'

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
}: TeamsOverviewBodyTableBodyProperties) => (
  <>
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
  </>
)

export default TeamsOverviewBodyTableBody
