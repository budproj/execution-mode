import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'

import Overview from 'src/components/Report/Overview'
import { Team } from 'src/components/Team/types'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { teamAtomFamily } from 'src/state/recoil/team'

import ObjectivesOverviewBody from './Body'
import ObjectivesOverviewHeader from './Header'
import queries from './queries.gql'
import { GetCompanyObjectivesQuery } from './types'

const ObjectivesOverview = () => {
  const { data, loading } = useQuery<GetCompanyObjectivesQuery>(queries.GET_COMPANY_OBJECTIVES, {
    fetchPolicy: 'network-only',
  })
  const loadTeam = useRecoilFamilyLoader<Team>(teamAtomFamily)
  const company = data?.teams?.[0]

  const objectives = company?.objectives

  useEffect(() => {
    if (!loading && company) loadTeam(company)
  }, [company, loading, loadTeam])

  return (
    <Overview>
      <ObjectivesOverviewHeader />
      <ObjectivesOverviewBody objectives={objectives} />
    </Overview>
  )
}

export default ObjectivesOverview
