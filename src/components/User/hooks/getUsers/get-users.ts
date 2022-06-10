import { useQuery } from '@apollo/client'
import { useEffect } from 'react'

import GET_USER_LIST from 'src/components/User/AllReachableUsers/queries.gql'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { userAtomFamily } from 'src/state/recoil/user'

import { User } from '../../types'

interface GetUserListProperties {
  data: User[]
  loading: boolean
  called: boolean
}

export const useGetUsers = (): GetUserListProperties => {
  const [loadUsers] = useRecoilFamilyLoader<User>(userAtomFamily)
  const [users, setUsers] = useConnectionEdges<User>()

  const { loading, called } = useQuery(GET_USER_LIST, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      const companies = data.users.edges ?? []

      setUsers(companies)
    },
  })

  useEffect(() => {
    loadUsers(users)
  }, [users, loadUsers])

  return { data: users, loading, called }
}
