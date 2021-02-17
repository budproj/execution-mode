import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'

import Overview from 'src/components/Report/Overview'
import { Team } from 'src/components/Team/types'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { teamAtomFamily } from 'src/state/recoil/team'

import TeamsOverviewBody from './Body'
import TeamsOverviewHeader from './Header'
import queries from './queries.gql'

export interface GetCompanyTeamsQuery {
  teams: Partial<Team[]>
}

const TeamsOverview = () => {
  const { data, loading } = useQuery<GetCompanyTeamsQuery>(queries.GET_COMPANY_TEAMS, {
    fetchPolicy: 'network-only',
  })
  const loadTeam = useRecoilFamilyLoader<Team>(teamAtomFamily)
  const company = data?.teams?.[0]

  useEffect(() => {
    if (!loading && company) loadTeam(company)
  }, [company, loading, loadTeam])

  return (
    <Overview>
      <TeamsOverviewHeader />
      <TeamsOverviewBody teamsRanking={company?.teamsRanking} />
    </Overview>
  )
}

export default TeamsOverview
