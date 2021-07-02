import { useLazyQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/layout'
import filter from 'lodash/filter'
import flatten from 'lodash/flatten'
import uniqBy from 'lodash/uniqBy'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { ResetButton } from 'src/components/Base'
import CycleFilter from 'src/components/Cycle/Filter'
import { Cycle } from 'src/components/Cycle/types'
import { KeyResult } from 'src/components/KeyResult/types'
import { GraphQLConnection, GraphQLEdge } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { cycleAtomFamily } from 'src/state/recoil/cycle'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import meAtom from 'src/state/recoil/user/me'

import { useCycleFilters } from '../../../state/hooks/useCycleFilters/hook'

import KeyResultNotActiveAndOwnedByUserCyclesList from './cycle-lists'
import queries from './queries.gql'
import KeyResultNotActiveAndOwnedByUserSkeleton from './skeleton'

export interface KeyResultNotActiveAndOwnedByUserProperties {
  onLineClick?: (id: KeyResult['id']) => void
}

export interface GetKeyResultNotActiveAndOwnedByUserWithBindingQuery {
  cycles: GraphQLConnection<Cycle>
}

const flattenCycleEdges = (rawEdges: Array<GraphQLEdge<Cycle>>): Array<GraphQLEdge<Cycle>> => {
  const parentCycleEdges = uniqBy(
    flatten(
      rawEdges.map((edge) => ({
        node: edge.node?.parent,
      })),
    ),
    'node.id',
  )

  return flatten([parentCycleEdges, rawEdges]).filter((edge): edge is GraphQLEdge<Cycle> =>
    Boolean(edge.node),
  )
}

const flattenKeyResultEdges = (
  cycleEdges: Array<GraphQLEdge<Cycle>>,
): Array<GraphQLEdge<KeyResult>> => {
  const keyResultEdges = cycleEdges.map((edge) => edge.node.keyResults?.edges)

  return flatten(keyResultEdges).filter((edge): edge is GraphQLEdge<KeyResult> =>
    Boolean(edge?.node),
  )
}

const KeyResultNotActiveAndOwnedByUser = ({
  onLineClick,
}: KeyResultNotActiveAndOwnedByUserProperties) => {
  const userID = useRecoilValue(meAtom)

  const [loadCycles, { isLoaded: isLoadedOnRecoil }] = useRecoilFamilyLoader<Cycle>(cycleAtomFamily)
  const [loadKeyResults] = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)

  const [cycles, setCycleEdges, _, isCycleConnectionLoaded] = useConnectionEdges<Cycle>()
  const [keyResults, setKeyResultEdges, __, isKeyResultConnectionLoaded] =
    useConnectionEdges<KeyResult>()

  const [
    filteredCycles,
    filters,
    { applyYearFilter, applyQuarterFilter, resetFilters, updateCycles, isLoaded },
  ] = useCycleFilters(userID)

  const [fetchUserActiveCycles] = useLazyQuery<GetKeyResultNotActiveAndOwnedByUserWithBindingQuery>(
    queries.GET_USER_KEY_RESULTS_FROM_NOT_ACTIVE_CYCLES,
    {
      fetchPolicy: 'no-cache',
      variables: {
        userID,
      },
      onCompleted: (data) => {
        const flattenedCycleEdges = flattenCycleEdges(data.cycles.edges)
        const flattenedKeyResultEdges = flattenKeyResultEdges(flattenedCycleEdges)

        setCycleEdges(flattenedCycleEdges)
        setKeyResultEdges(flattenedKeyResultEdges)
      },
    },
  )

  const yearlyCycles =
    cycles.length > 0
      ? uniqBy(filter(cycles.map((cycle) => cycle.parent)) as Cycle[], 'id')
      : undefined

  useEffect(() => {
    if (userID) fetchUserActiveCycles()
  }, [userID, fetchUserActiveCycles])

  useEffect(() => {
    if (isCycleConnectionLoaded) loadCycles(cycles)
  }, [cycles, isCycleConnectionLoaded, loadCycles])

  useEffect(() => {
    if (isKeyResultConnectionLoaded) loadKeyResults(keyResults)
  }, [keyResults, isKeyResultConnectionLoaded, loadKeyResults])

  useEffect(() => {
    if (isLoadedOnRecoil) updateCycles(cycles)
  }, [cycles, isLoadedOnRecoil, updateCycles])

  return (
    <Stack direction="column" spacing={8}>
      <Stack direction="row" alignItems="center" spacing={4}>
        <CycleFilter
          activeFilters={filters}
          yearOptions={yearlyCycles}
          onYearFilter={applyYearFilter}
          onQuarterFilter={applyQuarterFilter}
        />
        <ResetButton onClick={resetFilters} />
      </Stack>

      <Stack direction="column" gridGap={8}>
        {isLoaded ? (
          <KeyResultNotActiveAndOwnedByUserCyclesList
            cycles={filteredCycles}
            onLineClick={onLineClick}
          />
        ) : (
          <KeyResultNotActiveAndOwnedByUserSkeleton />
        )}
      </Stack>
    </Stack>
  )
}

export default KeyResultNotActiveAndOwnedByUser
