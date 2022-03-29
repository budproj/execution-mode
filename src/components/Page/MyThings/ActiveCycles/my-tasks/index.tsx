import { useQuery } from '@apollo/client'
import React from 'react'

import { KeyResult } from 'src/components/KeyResult/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import MyTasksEmptyState from './empty-state'
import queries from './queries.gql'
import { TaskSkeletons } from './skeletons'
import Tasks from './tasks'

const MyTasks = () => {
  const [loadKeyResults] = useRecoilFamilyLoader<KeyResult>(keyResultAtomFamily)
  const [keyResults, setKeyResults] = useConnectionEdges<KeyResult>()

  const { refetch, loading } = useQuery(queries.GET_KRS_WITH_MY_CHECKMARKS, {
    onCompleted: (data) => {
      setKeyResults(data.me.keyResults.edges)
      loadKeyResults(keyResults)
    },
  })

  if (loading) {
    return <TaskSkeletons isLoaded={!loading} />
  }

  return keyResults.length > 0 ? (
    <Tasks items={keyResults} onUpdate={refetch} />
  ) : (
    <MyTasksEmptyState />
  )
}

export default MyTasks
