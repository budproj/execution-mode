import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { GetUserPrimaryCompanyQuery } from 'src/components/Report/CompanyProgressOverview/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily, krHealthStatusAtom } from 'src/state/recoil/key-result'
import { selectedDashboardTeamAtom } from 'src/state/recoil/team/selected-dashboard-team'

import { KeyResult } from '../../types'

interface GetCompanyCycles {
  data: KeyResult[]
  loading: boolean
  called: boolean
  fetchMore: any
  refetch: any
}

export const useGetKeyResults = (isCompany?: boolean): GetCompanyCycles => {
  const [loadKRs] = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const krHealthStatus = useRecoilValue(krHealthStatusAtom)
  const selectedDashboardTeam = useRecoilValue(selectedDashboardTeamAtom)
  const [keyResults, setKeyResults] = useConnectionEdges<KeyResult>()

  const query = { limit: 2, offset: 0 }

  if (krHealthStatus) {
    Object.assign(query, { confidence: krHealthStatus, teamId: selectedDashboardTeam?.id })
  }

  console.log('query', query)
  const { loading, called, fetchMore, refetch } = useQuery<GetUserPrimaryCompanyQuery>(
    GET_KEY_RESULTS,
    {
      variables: query,
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
      onCompleted: (data) => {
        console.log('onCompleted', data)
        const companies = data.me?.companies?.edges?.map((edge) => edge.node) ?? []
        const keyResultsEdges = companies.map((company) => company?.keyResults?.edges ?? []).flat()

        if (keyResultsEdges.length > 0) setKeyResults(keyResultsEdges)
      },
    },
  )

  useEffect(() => {
    console.log('loadKRs', keyResults)
    loadKRs(keyResults)
  }, [keyResults, loadKRs])

  const _fetchMore = (...arguments_: any[]) => {
    console.log('fetchMore', arguments_)
    fetchMore(...arguments_)
  }

  return { data: keyResults, loading, called, fetchMore: _fetchMore, refetch }
}
