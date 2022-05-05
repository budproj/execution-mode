import { useQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import { KeyResult } from 'src/components/KeyResult/types'
import { GraphQLConnection } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import KeyResultActiveAndOwnedByUserCyclesList from './cycle-lists'
import queries from './queries.gql'
import KeyResultActiveAndOwnedByUserSkeleton from './skeleton'

export interface KeyResultActiveAndOwnedByUserProperties {
  userID: string
  onLineClick?: (id: KeyResult['id']) => void
}

export interface GetKeyResultActiveAndOwnedByUserWithBindingQuery {
  user: {
    keyResults: GraphQLConnection<KeyResult>
  }
}

const KeyResultActiveAndOwnedByUser = ({
  onLineClick,
  userID,
}: KeyResultActiveAndOwnedByUserProperties) => {
  const [loadKeyResults] = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const [keyResults, setKeyResultEdges, _, isLoaded] = useConnectionEdges<KeyResult>()

  useQuery<GetKeyResultActiveAndOwnedByUserWithBindingQuery>(
    queries.GET_USER_KEY_RESULTS_FROM_ACTIVE_CYCLES,
    {
      variables: {
        userID,
      },
      onCompleted: (data) => {
        setKeyResultEdges(data.user.keyResults.edges)
      },
    },
  )

  useEffect(() => {
    if (isLoaded) loadKeyResults(keyResults)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyResults, isLoaded])

  return (
    <Stack direction="column" gridGap={8} pr={6}>
      {isLoaded ? (
        <KeyResultActiveAndOwnedByUserCyclesList
          keyResults={keyResults}
          onLineClick={onLineClick}
        />
      ) : (
        <KeyResultActiveAndOwnedByUserSkeleton />
      )}
    </Stack>
  )
}

export default KeyResultActiveAndOwnedByUser
