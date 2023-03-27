import { useQuery } from '@apollo/client'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { GetUserPrimaryCompanyQuery } from 'src/components/Report/CompanyProgressOverview/types'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { GraphQLConnection, GraphQLEdge } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily, krHealthStatusAtom } from 'src/state/recoil/key-result'
import { selectedDashboardTeamAtom } from 'src/state/recoil/team/selected-dashboard-team'

import { KeyResult } from '../../types'

import GET_KEY_RESULTS from './get-key-results.gql'

export type FetchMoreVariables = {
  limit: number
  offset: number
}
interface GetCompanyCycles {
  data: KeyResult[]
  loading: boolean
  called: boolean
  fetchMoreKeyResults: ({ limit, offset }: FetchMoreVariables) => Promise<void>
  refetch: any
}

export const useGetKeyResults = (isCompany?: boolean): GetCompanyCycles => {
  const [loadKRs] = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const krHealthStatus = useRecoilValue(krHealthStatusAtom)
  const selectedDashboardTeam = useRecoilValue(selectedDashboardTeamAtom)
  const [keyResults, setKeyResults] = useConnectionEdges<KeyResult>()
  const [isFetchMoreDataLoading, setIsFetchMoreDataLoading] = useState(false)

  const query = { limit: KRS_PER_PAGE, offset: 0 }

  if (krHealthStatus) {
    Object.assign(query, { confidence: krHealthStatus, teamId: selectedDashboardTeam?.id })
  }

  const { loading, called, fetchMore, refetch } = useQuery<GetUserPrimaryCompanyQuery>(
    GET_KEY_RESULTS,
    {
      variables: query,
      fetchPolicy: 'cache-and-network',
      onCompleted: (data) => {
        const companies = data.me?.companies?.edges?.map((edge) => edge.node) ?? []
        const keyResultsEdges = companies.map((company) => company?.keyResults?.edges ?? []).flat()

        if (keyResultsEdges.length > 0) setKeyResults(keyResultsEdges)
      },
    },
  )

  useEffect(() => {
    loadKRs(keyResults)
  }, [keyResults, loadKRs])

  const fetchMoreKeyResults = useCallback(
    async ({ limit, offset }: FetchMoreVariables) => {
      setIsFetchMoreDataLoading(true)
      const queryVariables = { limit, offset }

      if (krHealthStatus) {
        Object.assign(queryVariables, { confidence: krHealthStatus })
      }

      try {
        await fetchMore({
          variables: queryVariables,
          updateQuery: (previous, { fetchMoreResult }) => {
            if (!fetchMoreResult) return previous
            const oldCompanies = previous.me?.companies?.edges ?? []

            const newCompanies = fetchMoreResult.me?.companies?.edges ?? []

            const allEdgesTeams: Array<GraphQLEdge<Team>> = [...oldCompanies, ...newCompanies]

            const allCompanies: GraphQLConnection<Team> | undefined = {
              policy: fetchMoreResult.me.companies!.policy,
              pageInfo: fetchMoreResult.me.companies!.pageInfo,
              edges: allEdgesTeams,
            }

            const mergedOldAndNewResults: User = {
              ...fetchMoreResult.me,
              companies: allCompanies,
            }

            return {
              me: mergedOldAndNewResults,
            }
          },
        })
      } catch {
        console.log("It's not possible fetchMore data")
      } finally {
        setIsFetchMoreDataLoading(false)
      }
    },
    [fetchMore, krHealthStatus],
  )

  return {
    data: keyResults,
    loading: isFetchMoreDataLoading || loading,
    called,
    fetchMoreKeyResults,
    refetch,
  }
}
