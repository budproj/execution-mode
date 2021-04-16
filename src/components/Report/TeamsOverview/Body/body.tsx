import React from 'react'

import OverviewBodyBox from 'src/components/Report/Overview/OverviewBodyBox'
import { Team } from 'src/components/Team/types'
import { GraphQLEdge } from 'src/components/types'

import {
  TeamsOverviewBodyTableBody,
  TeamsOverviewBodyTableHead,
  TeamsOverviewBodyTableSkeleton,
} from './Table'

export interface TeamsOverviewBodyProperties {
  teamsRanking?: Array<GraphQLEdge<Team>>
}

const TeamsOverviewBody = ({ teamsRanking }: TeamsOverviewBodyProperties) => (
  <OverviewBodyBox p={0}>
    <TeamsOverviewBodyTableHead />
    {typeof teamsRanking === 'undefined' ? (
      <TeamsOverviewBodyTableSkeleton />
    ) : (
      <TeamsOverviewBodyTableBody teamsRanking={teamsRanking} />
    )}
  </OverviewBodyBox>
)

export default TeamsOverviewBody
