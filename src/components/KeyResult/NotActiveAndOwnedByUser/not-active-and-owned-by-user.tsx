import { useLazyQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/layout'
import filter from 'lodash/filter'
import flatten from 'lodash/flatten'
import uniqBy from 'lodash/uniqBy'
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

import { ResetButton } from 'src/components/Base'
import CycleFilter from 'src/components/Cycle/Filter'
import { Cycle } from 'src/components/Cycle/types'
import { KeyResult } from 'src/components/KeyResult/types'
import { GraphQLConnection } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { cycleAtomFamily } from 'src/state/recoil/cycle'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import filtersAtomFamily, {
  KEY_RESULT_FILTER_TYPE,
  KeyResultNotActiveAndOwnedByUserFilter,
} from 'src/state/recoil/key-result/filters'
import meAtom from 'src/state/recoil/user/me'

import KeyResultNotActiveAndOwnedByUserCyclesList from './cycle-lists'
import filterCycles from './filter-cycles'
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
  const [filters, setFilters] = useRecoilState<KeyResultNotActiveAndOwnedByUserFilter | undefined>(
    filtersAtomFamily(KEY_RESULT_FILTER_TYPE.NOT_ACTIVE_AND_OWNED_BY_USER),
  )
  const resetFilters = useResetRecoilState(
    filtersAtomFamily(KEY_RESULT_FILTER_TYPE.NOT_ACTIVE_AND_OWNED_BY_USER),
  )
  const loadCycles = useRecoilFamilyLoader<Cycle>(cycleAtomFamily)
  const loadKeyResults = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const [cycles, setCycleEdges] = useConnectionEdges<Cycle>()
  const [keyResults, setKeyResultEdges] = useConnectionEdges<KeyResult>()
  const [
    fetchUserActiveCycles,
    { data, loading, called },
  ] = useLazyQuery<GetKeyResultNotActiveAndOwnedByUserWithBindingQuery>(
    queries.GET_USER_KEY_RESULTS_FROM_NOT_ACTIVE_CYCLES,
    {
      variables: {
        userID,
      },
    },
  )

  const handleYearFilterUpdate = (yearCycleIDs: Array<Cycle['id']>) => {
    setFilters({
      yearCycleIDs,
      quarterCycleIDs: [],
    })
  }

  const handleQuarterFilterUpdate = (quarterCycleIDs: Array<Cycle['id']>) => {
    setFilters({
      quarterCycleIDs,
      yearCycleIDs: filters ? filters.yearCycleIDs : [],
    })
  }

  const yearlyCycles =
    cycles.length > 0
      ? uniqBy(filter(cycles.map((cycle) => cycle.parent)) as Cycle[], 'id')
      : undefined

  const filteredData = filterCycles(cycles, filters)

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
    if (cycles) {
      loadCycles(cycles)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycles])

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
          onYearFilter={handleYearFilterUpdate}
          onQuarterFilter={handleQuarterFilterUpdate}
        />
        <ResetButton onClick={resetFilters} />
      </Stack>

      <Stack direction="column" gridGap={8}>
        {called && !loading && filteredData ? (
          <KeyResultNotActiveAndOwnedByUserCyclesList
            cycles={filteredData}
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
