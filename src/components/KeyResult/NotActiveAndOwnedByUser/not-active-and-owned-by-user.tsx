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
import { GraphQLConnection } from 'src/components/types'
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

const KeyResultNotActiveAndOwnedByUser = ({
  onLineClick,
}: KeyResultNotActiveAndOwnedByUserProperties) => {
  const userID = useRecoilValue(meAtom)
  const loadCycles = useRecoilFamilyLoader<Cycle>(cycleAtomFamily)
  const loadKeyResults = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const [cycles, setCycleEdges] = useConnectionEdges<Cycle>()
  const [keyResults, setKeyResultEdges] = useConnectionEdges<KeyResult>()

  const [
    filteredCycles,
    filters,
    { applyYearFilter, applyQuarterFilter, resetFilters, updateCycles },
  ] = useCycleFilters(userID)

  const [fetchUserActiveCycles, { data, loading, called }] =
    useLazyQuery<GetKeyResultNotActiveAndOwnedByUserWithBindingQuery>(
      queries.GET_USER_KEY_RESULTS_FROM_NOT_ACTIVE_CYCLES,
      {
        variables: {
          userID,
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
    if (data) {
      const { edges: queryEdges } = data.cycles

      const parentCycleEdges = uniqBy(
        flatten(
          queryEdges.map((edge) => ({
            node: edge.node?.parent,
          })),
        ),
        'node.id',
      )
      const cycleEdges = flatten([parentCycleEdges, queryEdges]).filter((edge) =>
        Boolean(edge.node),
      )
      const cycleNodes = cycleEdges.map((edge) => edge.node)

      const keyResultEdgesList = cycleNodes.map((cycle) => cycle?.keyResults?.edges)
      const keyResultEdges = flatten(keyResultEdgesList).filter((keyResult) => Boolean(keyResult))

      setCycleEdges(cycleEdges as any)
      setKeyResultEdges(keyResultEdges as any)
    }
  }, [data, setCycleEdges, setKeyResultEdges])

  useEffect(() => {
    updateCycles(cycles)
  }, [cycles, updateCycles])

  useEffect(() => {
    if (filteredCycles) {
      loadCycles(filteredCycles)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredCycles])

  useEffect(() => {
    if (keyResults) {
      loadKeyResults(keyResults)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyResults])

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
        {called && !loading ? (
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
