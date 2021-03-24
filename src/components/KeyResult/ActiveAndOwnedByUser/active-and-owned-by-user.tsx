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

import KeyResultActiveAndOwnedByUserCyclesList from './cycle-lists'
import queries from './queries.gql'
import KeyResultActiveAndOwnedByUserSkeleton from './skeleton'

export interface KeyResultActiveAndOwnedByUserProperties {
  onLineClick?: (id: KeyResult['id']) => void
}

export interface GetKeyResultActiveAndOwnedByUserWithBindingQuery {
  cycles: Array<{
    id: Cycle['id']
    keyResults: Cycle['keyResults']
  }>
}

const KeyResultActiveAndOwnedByUser = ({
  onLineClick,
}: KeyResultActiveAndOwnedByUserProperties) => {
  const userID = useRecoilValue(meAtom)
  const loadCycles = useRecoilFamilyLoader<Cycle>(cycleAtomFamily)
  const loadKeyResults = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const [
    fetchUserActiveCycles,
    { data, loading, called },
  ] = useLazyQuery<GetKeyResultActiveAndOwnedByUserWithBindingQuery>(
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
        <KeyResultActiveAndOwnedByUserCyclesList cycles={data.cycles} onLineClick={onLineClick} />
      ) : (
        <KeyResultActiveAndOwnedByUserSkeleton />
      )}
    </Stack>
  )
}

export default KeyResultActiveAndOwnedByUser
