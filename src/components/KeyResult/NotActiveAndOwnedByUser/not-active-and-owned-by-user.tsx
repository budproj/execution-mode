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
import { cycleAtomFamily } from 'src/state/recoil/cycle'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import filtersAtomFamily, {
  KEY_RESULT_FILTER_TYPE,
  KeyResultNotActiveAndOwnedByUserFilter,
} from 'src/state/recoil/key-result/filters'
import meAtom from 'src/state/recoil/user/me'

import { KeyResult } from '../types'

import queries from './queries.gql'

export interface KeyResultNotActiveAndOwnedByUserProperties {
  onLineClick?: (id: KeyResult['id']) => void
}

export interface GetKeyResultNotActiveAndOwnedByUserWithBindingQuery {
  cycles: Cycle[]
}

const KeyResultNotActiveAndOwnedByUser = (
  _properties: KeyResultNotActiveAndOwnedByUserProperties,
) => {
  const userID = useRecoilValue(meAtom)
  const [filters, setFilters] = useRecoilState<KeyResultNotActiveAndOwnedByUserFilter | undefined>(
    filtersAtomFamily(KEY_RESULT_FILTER_TYPE.NOT_ACTIVE_AND_OWNED_BY_USER),
  )
  const resetFilters = useResetRecoilState(
    filtersAtomFamily(KEY_RESULT_FILTER_TYPE.NOT_ACTIVE_AND_OWNED_BY_USER),
  )
  const loadCycles = useRecoilFamilyLoader<Cycle>(cycleAtomFamily)
  const loadKeyResults = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const [
    fetchUserActiveCycles,
    { data, loading, called },
  ] = useLazyQuery<GetKeyResultNotActiveAndOwnedByUserWithBindingQuery>(
    queries.GET_USER_KEY_RESULTS_FROM_NOT_ACTIVE_CYCLES,
    {
      variables: {
        userID,
      },
      onCompleted: (data) => {
        const childCycles = flatten(data.cycles.map((cycle) => cycle?.cycles))
        const cycles = filter(flatten([data.cycles, childCycles]))
        const keyResults = flatten(cycles.map((cycle) => cycle?.keyResults))

        loadCycles(cycles)
        loadKeyResults(keyResults)
      },
    },
  )

  const handleYearFilterUpdate = (yearCycleIDs: Array<Cycle['id']>) => {
    setFilters({
      yearCycleIDs,
      quarterCycleIDs: filters ? filters.quarterCycleIDs : [],
    })
  }

  const handleQuarterFilterUpdate = (quarterCycleIDs: Array<Cycle['id']>) => {
    setFilters({
      quarterCycleIDs,
      yearCycleIDs: filters ? filters.yearCycleIDs : [],
    })
  }

  const yearlyCycles =
    data && uniqBy(filter(data.cycles.map((cycle) => cycle.parent)) as Cycle[], 'id')

  useEffect(() => {
    if (userID) fetchUserActiveCycles()
  }, [userID, fetchUserActiveCycles])

  useEffect(() => {
    console.log(data, 'tag')
  }, [data])

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

      <p>KRs</p>
    </Stack>
  )
}

export default KeyResultNotActiveAndOwnedByUser
