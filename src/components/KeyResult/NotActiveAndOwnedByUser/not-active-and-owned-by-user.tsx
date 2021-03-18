import { useLazyQuery } from '@apollo/client'
import filter from 'lodash/filter'
import flatten from 'lodash/flatten'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { Cycle } from 'src/components/Cycle/types'
import { cycleAtomFamily } from 'src/state/recoil/cycle'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import meAtom from 'src/state/recoil/user/me'

import { KeyResult } from '../types'

import queries from './queries.gql'

export interface GetKeyResultNotActiveAndOwnedByUserWithBindingQuery {
  cycles: Cycle[]
}

const KeyResultNotActiveAndOwnedByUser = () => {
  const userID = useRecoilValue(meAtom)
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

  useEffect(() => {
    if (userID) fetchUserActiveCycles()
  }, [userID, fetchUserActiveCycles])

  return <p>Ok</p>
}

export default KeyResultNotActiveAndOwnedByUser
