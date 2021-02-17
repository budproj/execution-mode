import React from 'react'

import TeamsOverviewBodyTableLineTemplate from 'src/components/Report/TeamsOverview/Body/Table/LineTemplate'
import { Team } from 'src/components/Team/types'

import {
  TeamsOverviewBodyTableBodyColumnNameAndOrder,
  TeamsOverviewBodyTableBodyColumnProgress,
  TeamsOverviewBodyTableBodyColumnProgressIncrease,
} from './Columns'

export interface TeamsOverviewBodyTableBodyProperties {
  teamsRanking: Team[]
}

const TeamsOverviewBodyTableBody = ({ teamsRanking }: TeamsOverviewBodyTableBodyProperties) => (
  <>
    {teamsRanking.map((team, index) => (
      <TeamsOverviewBodyTableLineTemplate key={team?.id ?? Math.random()}>
        <TeamsOverviewBodyTableBodyColumnNameAndOrder team={team} order={index + 1} />
        <TeamsOverviewBodyTableBodyColumnProgress team={team} />
        <TeamsOverviewBodyTableBodyColumnProgressIncrease team={team} />
      </TeamsOverviewBodyTableLineTemplate>
    ))}
  </>
)

export default TeamsOverviewBodyTableBody
