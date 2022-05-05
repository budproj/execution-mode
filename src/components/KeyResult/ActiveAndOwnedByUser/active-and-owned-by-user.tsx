import { useQuery } from '@apollo/client'
import { Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import { KeyResult } from 'src/components/KeyResult/types'
import { User } from 'src/components/User/types'
import { GraphQLConnection } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import KeyResultActiveAndOwnedByUserCyclesList from './cycle-lists'
import queries from './queries.gql'
import KeyResultActiveAndOwnedByUserSkeleton from './skeleton'

export interface KeyResultActiveAndOwnedByUserProperties {
  userID: User['id']
  username?: User['firstName'] | undefined
  onLineClick?: (id: KeyResult['id']) => void
}

export interface GetKeyResultActiveAndOwnedByUserWithBindingQuery {
  user: {
    keyResults: GraphQLConnection<KeyResult>
  }
}

const KeyResultActiveAndOwnedByUser = ({
  userID,
  username,
  onLineClick,
}: KeyResultActiveAndOwnedByUserProperties) => {
  const [loadKeyResults] = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const [keyResults, setKeyResultEdges, _, isLoaded] = useConnectionEdges<KeyResult>()
  const stackJustify = keyResults && keyResults.length > 0 ? 'flex-start' : 'center'

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
  }, [keyResults, isLoaded, loadKeyResults])

  return (
    <Stack direction="column" gridGap={8} pr={6} height="100%" justifyContent={stackJustify}>
      {isLoaded ? (
        <KeyResultActiveAndOwnedByUserCyclesList
          keyResults={keyResults}
          username={username}
          onLineClick={onLineClick}
        />
      ) : (
        <KeyResultActiveAndOwnedByUserSkeleton />
      )}
    </Stack>
  )
}

export default KeyResultActiveAndOwnedByUser
