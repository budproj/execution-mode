import { useLazyQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/react'
import flatten from 'lodash/flatten'
import uniqBy from 'lodash/uniqBy'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { Cycle } from 'src/components/Cycle/types'
import { KeyResult } from 'src/components/KeyResult/types'
import { GraphQLConnection, GraphQLEdge } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { cycleAtomFamily } from 'src/state/recoil/cycle'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import { useCycleFilters } from '../../../state/hooks/useCycleFilters/hook'
import { myselfAtom } from '../../../state/recoil/shared/atoms'

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
  const myself = useRecoilValue(myselfAtom)

  const [loadCycles, { isLoaded: isLoadedOnRecoil }] = useRecoilFamilyLoader<Cycle>(cycleAtomFamily)
  const [loadKeyResults] = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)

  const [cycles, setCycleEdges, __, isCycleConnectionLoaded] = useConnectionEdges<Cycle>()
  const [keyResults, setKeyResultEdges, ___, isKeyResultConnectionLoaded] =
    useConnectionEdges<KeyResult>()

  const [filteredCycles, _, { updateCycles, isLoaded }] = useCycleFilters(myself?.id)

  const [fetchUserActiveCycles] = useLazyQuery<GetKeyResultNotActiveAndOwnedByUserWithBindingQuery>(
    queries.GET_USER_KEY_RESULTS_FROM_NOT_ACTIVE_CYCLES,
    {
      fetchPolicy: 'cache-first',
      variables: {
        userID: myself?.id,
      },
      onCompleted: (data) => {
        const flattenedCycleEdges = flattenCycleEdges(data.cycles.edges)
        const flattenedKeyResultEdges = flattenKeyResultEdges(flattenedCycleEdges)

        setCycleEdges(flattenedCycleEdges)
        setKeyResultEdges(flattenedKeyResultEdges)
      },
    },
  )

  useEffect(() => {
    if (myself?.id) fetchUserActiveCycles()
  }, [myself?.id, fetchUserActiveCycles])

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
