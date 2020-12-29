import { useQuery } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import React from 'react'

import CompanyProgressOverviewHeader from './Header'
import queries from './queries.gql'
import { GetUserPrimaryCompanyQuery } from './types'

const CompanyProgressOverview = () => {
  const { data, loading } = useQuery<GetUserPrimaryCompanyQuery>(queries.GET_USER_PRIMARY_COMPANY)
  const company = data?.me?.companies?.[0]

  return (
    <Box borderWidth="1px" borderColor="blue.100">
      <CompanyProgressOverviewHeader
        companyName={company?.name}
        companyGender={company?.gender}
        isLoading={loading}
      />
    </Box>
  )
}

export default CompanyProgressOverview
