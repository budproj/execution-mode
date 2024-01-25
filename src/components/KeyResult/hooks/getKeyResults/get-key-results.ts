import { ApolloQueryResult, OperationVariables, useQuery } from '@apollo/client'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { GetUserPrimaryCompanyQuery } from 'src/components/Report/CompanyProgressOverview/types'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { GraphQLConnection, GraphQLEdge } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily, krHealthStatusAtom } from 'src/state/recoil/key-result'
import loadedKeyResults from 'src/state/recoil/key-result/pagination/fetch-more-key-results'
import paginationKRs from 'src/state/recoil/key-result/pagination/limit-offset'
import listKeyResultsPageInfo from 'src/state/recoil/key-result/pagination/load-key-results-page-info'
import { selectedDashboardTeamAtom } from 'src/state/recoil/team/selected-dashboard-team'

import { KeyResult } from '../../types'

import queries from './get-key-results.gql'

export type FetchMoreVariables = {
  limit: number
  offset: number
}
interface GetCompanyCycles {
  loading: boolean
  called: boolean
  fetchMoreKeyResults: ({ limit, offset }: FetchMoreVariables) => Promise<void>
  refetch: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<GetUserPrimaryCompanyQuery>>
}

export const useGetKeyResults = (isCompany?: boolean): GetCompanyCycles => {
  const [loadKRs] = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const krHealthStatus = useRecoilValue(krHealthStatusAtom)
  const selectedDashboardTeam = useRecoilValue(selectedDashboardTeamAtom)
  const [keyResults, setKeyResults] = useConnectionEdges<KeyResult>()
  const [isFetchMoreDataLoading, setIsFetchMoreDataLoading] = useState(false)
  const [loadedKRs, setLoadKeyResults] = useRecoilState(loadedKeyResults)
  const paginationVariables = useRecoilValue(paginationKRs)
  const setListKeyResultsPageInfo = useSetRecoilState(listKeyResultsPageInfo)

  const query = { ...paginationVariables }

  if (krHealthStatus) {
    Object.assign(query, { confidence: krHealthStatus, teamId: selectedDashboardTeam?.id })
  }

  const { loading, called, fetchMore, refetch } = useQuery<GetUserPrimaryCompanyQuery>(
    krHealthStatus && !isCompany
      ? queries.GET_KEY_RESULTS_FOR_MODAL
      : queries.PAGINATION_GET_KEY_RESULTS,
    {
      variables: query,
      fetchPolicy: 'cache-and-network',
      refetchWritePolicy: 'overwrite',
      onCompleted: (data) => {
        const pageInfo = data.me?.companies?.edges?.[0]?.node?.keyResults?.pageInfo
        if (pageInfo?.hasNextPage)
          setListKeyResultsPageInfo({
            hasNextPage: pageInfo.hasNextPage,
            endCursor: '',
          })

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
            if (!fetchMoreResult.me) return previous
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

  useEffect(() => {
    let notIncludedKeyResults: KeyResult[] = []
    for (const kr of keyResults) {
      if (!loadedKRs.some((loadedKR) => loadedKR.id === kr.id)) {
        notIncludedKeyResults.push(kr)
      }
    }

    if (notIncludedKeyResults.length > 0 && keyResults.length > 0) {
      setLoadKeyResults((previous) => [...previous, ...notIncludedKeyResults])
    }

    return () => {
      notIncludedKeyResults = []
    }
  }, [keyResults, loadedKRs, setLoadKeyResults])

  return {
    loading: isFetchMoreDataLoading || loading,
    called,
    fetchMoreKeyResults,
    refetch,
  }
}
