import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'

import Overview from 'src/components/Report/Overview'
import { Team } from 'src/components/Team/types'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { teamAtomFamily } from 'src/state/recoil/team'

import CompanyProgressOverviewBody from './Body/body'
import CompanyProgressOverviewHeader from './Header'
import queries from './queries.gql'
import { GetUserPrimaryCompanyQuery } from './types'

const CompanyProgressOverview = () => {
  const { data, loading } = useQuery<GetUserPrimaryCompanyQuery>(queries.GET_USER_PRIMARY_COMPANY, {
    fetchPolicy: 'cache-first',
  })
  const [loadTeam] = useRecoilFamilyLoader<Team>(teamAtomFamily)
  const company = data?.me?.companies?.edges?.[0]?.node

  useEffect(() => {
    if (!loading && company) loadTeam(company)
  }, [company, loading, loadTeam])

  return (
    <Overview>
      <CompanyProgressOverviewHeader companyID={company?.id} isLoading={loading} />
      <CompanyProgressOverviewBody companyID={company?.id} isLoading={loading} />
    </Overview>
  )
}

export default CompanyProgressOverview
