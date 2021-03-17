import { useLazyQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/react'
import flatten from 'lodash/flatten'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { Cycle } from 'src/components/Cycle/types'
import { KeyResult } from 'src/components/KeyResult/types'
import { cycleAtomFamily } from 'src/state/recoil/cycle'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import meAtom from 'src/state/recoil/user/me'

import KeyResultOwnedByUserCyclesList from './cycle-lists'
import queries from './queries.gql'
import KeyResultOwnedByUserSkeleton from './skeleton'

export interface KeyResultOwnedByUserProperties {
  onLineClick?: (id: KeyResult['id']) => void
}

export interface GetKeyResultOwnedByUserWithBindingQuery {
  cycles: Array<{
    id: Cycle['id']
    keyResults: Cycle['keyResults']
  }>
}

const KeyResultOwnedByUser = ({ onLineClick }: KeyResultOwnedByUserProperties) => {
  const userID = useRecoilValue(meAtom)
  const loadCycles = useRecoilFamilyLoader<Cycle>(cycleAtomFamily)
  const loadKeyResults = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const [
    fetchUserActiveCycles,
    { data, loading, called },
  ] = useLazyQuery<GetKeyResultOwnedByUserWithBindingQuery>(
    queries.GET_USER_KEY_RESULTS_FROM_ACTIVE_CYCLES,
    {
      variables: {
        userID,
      },
      onCompleted: (data) => {
        const keyResults = flatten(data.cycles.map((cycle) => cycle.keyResults))

        loadCycles(data.cycles)
        loadKeyResults(keyResults)
      },
    },
  )

  useEffect(() => {
    if (userID) fetchUserActiveCycles()
  }, [userID, fetchUserActiveCycles])

  return (
    <Stack direction="column" gridGap={8}>
      {called && !loading && data ? (
        <KeyResultOwnedByUserCyclesList cycles={data.cycles} onLineClick={onLineClick} />
      ) : (
        <KeyResultOwnedByUserSkeleton />
      )}
    </Stack>
  )
}

export default KeyResultOwnedByUser
