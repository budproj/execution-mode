import { useQuery } from '@apollo/client'
import React, { createContext, ReactElement, useEffect, useMemo } from 'react'
import { useSetRecoilState } from 'recoil'

import PageLoading from 'src/components/Base/PageLoading'

import { myselfAtom } from './atoms'
import queries from './queries.gql'
import { MyselfResult } from './types'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SharedContextProperties {}

export const SharedContext = createContext<SharedContextProperties>({})

interface ChildrenProperty {
  children: ReactElement
}

// TODO: handle profile changes (refetch)
export default ({ children }: ChildrenProperty) => {
  const [loading, setLoading] = React.useState(true)
  const setMyself = useSetRecoilState(myselfAtom)

  const { loading: loadingMyself } = useQuery<MyselfResult>(queries.GET_MYSELF, {
    onCompleted: (data) => {
      setMyself(data.me)
    },
  })

  // TODO: placeholder for future use
  // const { loading: loadingUsers } = useGetUsers()
  const { loading: loadingUsers } = { loading: true }

  // TODO: placeholder for future use
  const { loading: loadingTeams } = { loading: true }

  // TODO: load team tree
  // const { loading: loadingTeams } = useQuery(queries.GET_TEAMS, {
  //   onCompleted: (data) => {
  //
  //   }
  // }

  useEffect(() => {
    setLoading([loadingMyself, loadingUsers, loadingTeams].every(Boolean))
  }, [loadingMyself, loadingUsers, loadingTeams])

  return useMemo(
    () =>
      loading ? (
        <PageLoading />
      ) : (
        <SharedContext.Provider value={{}}>{children}</SharedContext.Provider>
      ),
    [loading, children],
  )
}
