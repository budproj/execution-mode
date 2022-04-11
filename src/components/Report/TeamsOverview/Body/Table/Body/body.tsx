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
}

const TeamsOverviewBodyTableBody = ({ teamsRanking }: TeamsOverviewBodyTableBodyProperties) => (
  <>
    {[...teamsRanking, ...teamsRanking, ...teamsRanking, ...teamsRanking].map((team, index) => (
      <TeamsOverviewBodyTableLineTemplate key={team?.id ?? Math.random()}>
        <TeamsOverviewBodyTableBodyPositionBadge order={index + 1} />
        <TeamsOverviewBodyTableBodyColumnProgress team={team} />
        <TeamsOverviewBodyTableBodyColumnProgressIncrease team={team} />
      </TeamsOverviewBodyTableLineTemplate>
    ))}
  </>
)

export default TeamsOverviewBodyTableBody
