import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'

import Overview from 'src/components/Report/Overview'
import { Team } from 'src/components/Team/types'
import { GraphQLConnection } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { teamAtomFamily } from 'src/state/recoil/team'

import TeamsOverviewBody from './Body'
import TeamsOverviewHeader from './Header'
import queries from './queries.gql'

export interface GetCompanyTeamsQuery {
  teams: GraphQLConnection<Team>
}

const TeamsOverview = () => {
  const { data, loading } = useQuery<GetCompanyTeamsQuery>(queries.GET_COMPANY_TEAMS, {
    fetchPolicy: 'network-only',
  })
  const [rankedTeams, setRankedTeamsEdges] = useConnectionEdges<Team>()

  const loadTeam = useRecoilFamilyLoader<Team>(teamAtomFamily)
  const company = data?.teams?.edges?.[0]?.node

  useEffect(() => {
    if (company) setRankedTeamsEdges(company?.rankedTeams?.edges)
  }, [company, setRankedTeamsEdges])

  useEffect(() => {
    if (!loading && company) loadTeam(company)
  }, [company, loading, loadTeam])

  return (
    <Overview>
      <TeamsOverviewHeader />
      <TeamsOverviewBody teamsRanking={rankedTeams} />
    </Overview>
  )
}

export default TeamsOverview
