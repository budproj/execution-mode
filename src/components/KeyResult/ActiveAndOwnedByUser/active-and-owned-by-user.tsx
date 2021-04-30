import { useLazyQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/react'
import flatten from 'lodash/flatten'
import remove from 'lodash/remove'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { Cycle } from 'src/components/Cycle/types'
import { KeyResult } from 'src/components/KeyResult/types'
import { GraphQLConnection } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
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
  cycles: GraphQLConnection<Cycle>
}

const KeyResultActiveAndOwnedByUser = ({
  onLineClick,
}: KeyResultActiveAndOwnedByUserProperties) => {
  const userID = useRecoilValue(meAtom)
  const loadCycles = useRecoilFamilyLoader<Cycle>(cycleAtomFamily)
  const loadKeyResults = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const [cycles, setCycleEdges] = useConnectionEdges<Cycle>()
  const [keyResults, setKeyResultEdges] = useConnectionEdges<KeyResult>()

  const [
    fetchUserActiveCycles,
    { data, loading, called },
  ] = useLazyQuery<GetKeyResultActiveAndOwnedByUserWithBindingQuery>(
    queries.GET_USER_KEY_RESULTS_FROM_ACTIVE_CYCLES,
    {
      variables: {
        userID,
      },
    },
  )

  const isCyclesLoadedOnRecoil = data?.cycles?.edges.length === cycles.length
  const isLoaded = called && !loading && data && isCyclesLoadedOnRecoil

  useEffect(() => {
    if (userID) fetchUserActiveCycles()
  }, [userID, fetchUserActiveCycles])

  useEffect(() => {
    if (data) {
      const { edges: cycleEdges } = data.cycles
      const cycleNodes = cycleEdges.map((edge) => edge.node)

      const keyResultEdgesList = cycleNodes.map((cycle) => cycle.keyResults?.edges)
      const keyResultEdges = flatten(keyResultEdgesList)
      const nonNullKeyResultEdges = remove(keyResultEdges)

      setCycleEdges(cycleEdges)
      setKeyResultEdges(nonNullKeyResultEdges as any)
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
    <Stack direction="column" gridGap={8}>
      {isLoaded ? (
        <KeyResultActiveAndOwnedByUserCyclesList cycles={cycles} onLineClick={onLineClick} />
      ) : (
        <KeyResultActiveAndOwnedByUserSkeleton />
      )}
    </Stack>
  )
}

export default KeyResultActiveAndOwnedByUser
