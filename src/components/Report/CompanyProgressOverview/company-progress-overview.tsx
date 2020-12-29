import { useQuery } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import { Company } from 'src/components/Company/types'
import { companyAtomFamily } from 'src/state/recoil/company'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'

import CompanyProgressOverviewBody from './Body/body'
import CompanyProgressOverviewHeader from './Header'
import queries from './queries.gql'
import { GetUserPrimaryCompanyQuery } from './types'

const CompanyProgressOverview = () => {
  const { data, loading } = useQuery<GetUserPrimaryCompanyQuery>(queries.GET_USER_PRIMARY_COMPANY)
  const loadCompany = useRecoilFamilyLoader<Company>(companyAtomFamily)
  const company = data?.me?.companies?.[0]

  useEffect(() => {
    if (!loading && company) loadCompany(company)
  }, [company, loading, loadCompany])

  return (
    <Box borderWidth="1px" borderColor="blue.100">
      <CompanyProgressOverviewHeader companyID={company?.id} isLoading={loading} />
      <CompanyProgressOverviewBody />
    </Box>
  )
}

export default CompanyProgressOverview
