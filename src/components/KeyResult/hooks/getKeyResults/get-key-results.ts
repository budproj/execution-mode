import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { GetUserPrimaryCompanyQuery } from 'src/components/Report/CompanyProgressOverview/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily, krHealthStatusAtom } from 'src/state/recoil/key-result'
import { selectedDashboardTeamAtom } from 'src/state/recoil/team/selected-dashboard-team'

import { KeyResult } from '../../types'

import queries from './get-key-results.gql'

interface GetCompanyCycles {
  data: KeyResult[]
  loading: boolean
  called: boolean
}

export const useGetKeyResults = (isCompany?: boolean): GetCompanyCycles => {
  const [loadKRs] = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const krHealthStatus = useRecoilValue(krHealthStatusAtom)
  const selectedDashboardTeam = useRecoilValue(selectedDashboardTeamAtom)
  const [keyResults, setKeyResults] = useConnectionEdges<KeyResult>()

  const query = {}

  if (krHealthStatus) {
    Object.assign(query, { confidence: krHealthStatus, teamId: selectedDashboardTeam?.id })
  }

  const { loading, called } = useQuery<GetUserPrimaryCompanyQuery>(
    krHealthStatus && !isCompany ? queries.GET_KEY_RESULTS_FOR_MODAL : queries.GET_KEY_RESULTS,
    {
      variables: query,
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        if (krHealthStatus && !isCompany) {
          const keyResultsEdges = data.team?.keyResults?.edges ?? []
          if (keyResultsEdges.length > 0) setKeyResults(keyResultsEdges)
        }

        const companies = data.me?.companies?.edges?.map((edge) => edge.node) ?? []
        const keyResultsEdges = companies.map((company) => company?.keyResults?.edges ?? []).flat()

        if (keyResultsEdges.length > 0) setKeyResults(keyResultsEdges)
      },
    },
  )

  useEffect(() => {
    loadKRs(keyResults)
  }, [keyResults, loadKRs])

  return { data: keyResults, loading, called }
}
