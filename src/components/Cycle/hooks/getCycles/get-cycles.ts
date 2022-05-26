import { useQuery } from '@apollo/client'
import { useEffect } from 'react'

import { GetUserPrimaryCompanyQuery } from 'src/components/Report/CompanyProgressOverview/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { cycleAtomFamily } from 'src/state/recoil/cycle'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'

import { Cycle } from '../../types'

import GET_CYCLES from './get-cycles.gql'

interface GetCompanyCycles {
  data: Cycle[]
  loading: boolean
  called: boolean
}

export const useGetCycle = (): GetCompanyCycles => {
  const [loadCycles] = useRecoilFamilyLoader<Cycle>(cycleAtomFamily)
  const [cycles, setCycles] = useConnectionEdges<Cycle>()

  const query = {}

  const { loading, called } = useQuery<GetUserPrimaryCompanyQuery>(GET_CYCLES, {
    variables: query,
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const companies = data.me?.companies?.edges?.map((edge) => edge.node) ?? []
      const cycles = companies.map((company) => company?.cycles?.edges ?? []).flat()

      if (cycles.length > 0) setCycles(cycles)
    },
  })

  useEffect(() => {
    loadCycles(cycles)
  }, [cycles, loadCycles])

  return { data: cycles, loading, called }
}
