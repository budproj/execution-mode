import { useQuery } from '@apollo/client'

import { Cycle } from 'src/components/Cycle/types'
import { GetUserPrimaryCompanyQuery } from 'src/components/Report/CompanyProgressOverview/types'

import GET_COMPANY_CYCLES from './get-company-cycles.gql'

interface GetCompanyCycles {
  data: Cycle[]
  loading: boolean
}

export const useGetCompanyCycles = (): GetCompanyCycles => {
  const { data, loading } = useQuery<GetUserPrimaryCompanyQuery>(GET_COMPANY_CYCLES, {
    fetchPolicy: 'cache-first',
  })

  const cyclesEdges = data?.me?.companies?.edges?.[0]?.node?.cycles?.edges ?? []
  const cycles = cyclesEdges.map(({ node }) => node)

  return { data: cycles, loading }
}
