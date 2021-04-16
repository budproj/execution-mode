import React from 'react'

import TeamsOverviewBodyTableLineTemplate from 'src/components/Report/TeamsOverview/Body/Table/LineTemplate'
import { Team } from 'src/components/Team/types'
import { GraphQLEdge } from 'src/components/types'

import {
  TeamsOverviewBodyTableBodyColumnNameAndOrder,
  TeamsOverviewBodyTableBodyColumnProgress,
  TeamsOverviewBodyTableBodyColumnProgressIncrease,
} from './Columns'

export interface TeamsOverviewBodyTableBodyProperties {
  teamsRanking: Array<GraphQLEdge<Team>>
}

const TeamsOverviewBodyTableBody = ({ teamsRanking }: TeamsOverviewBodyTableBodyProperties) => (
  <>
    {teamsRanking.map((edge, index) => (
      <TeamsOverviewBodyTableLineTemplate key={edge?.node?.id ?? Math.random()}>
        <TeamsOverviewBodyTableBodyColumnNameAndOrder team={edge?.node} order={index + 1} />
        <TeamsOverviewBodyTableBodyColumnProgress team={edge?.node} />
        <TeamsOverviewBodyTableBodyColumnProgressIncrease team={edge?.node} />
      </TeamsOverviewBodyTableLineTemplate>
    ))}
  </>
)

export default TeamsOverviewBodyTableBody
