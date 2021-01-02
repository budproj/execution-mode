import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'

import { Company } from 'src/components/Company/types'
import Overview from 'src/components/Report/Overview'
import { companyAtomFamily } from 'src/state/recoil/company'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'

import queries from './queries.gql'
import { GetCompanyObjectivesQuery } from './types'

const ObjectivesOverview = () => {
  const { data, loading } = useQuery<GetCompanyObjectivesQuery>(queries.GET_COMPANY_OBJECTIVES)
  const loadCompany = useRecoilFamilyLoader<Company>(companyAtomFamily)
  const company = data?.companies?.[0]

  useEffect(() => {
    if (!loading && company) loadCompany(company)
  }, [company, loading, loadCompany])

  console.log(company, 'tag')

  return <Overview>Ok</Overview>
}

export default ObjectivesOverview
