import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'

import Overview from 'src/components/Report/Overview'
import { Team } from 'src/components/Team/types'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { teamAtomFamily } from 'src/state/recoil/team'

import queries from './queries.gql'
import { GetCompanyObjectivesQuery } from './types'

const ObjectivesOverview = () => {
  const { data, loading } = useQuery<GetCompanyObjectivesQuery>(queries.GET_COMPANY_OBJECTIVES)
  const loadTeam = useRecoilFamilyLoader<Team>(teamAtomFamily)
  const company = data?.companies?.[0]

  useEffect(() => {
    if (!loading && company) loadTeam(company)
  }, [company, loading, loadTeam])

  console.log(company, 'tag')

  return <Overview>Ok</Overview>
}

export default ObjectivesOverview
