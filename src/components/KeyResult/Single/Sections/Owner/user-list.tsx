import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { User } from 'src/components/User/types'
import { GraphQLConnection } from 'src/components/types'
import { useConnectionEdges } from 'src/state/hooks/useConnectionEdges/hook'
import { useRecoilFamilyLoader } from 'src/state/recoil/hooks'
import { userAtomFamily } from 'src/state/recoil/user'

import { keyResultAtomFamily } from '../../../../../state/recoil/key-result'
import { SelectUserFromList } from '../../../../User/SelectFromList/wrapper'
import { KeyResult } from '../../../types'

import queries from './queries.gql'

interface KeyResultAvailableOwnersProperties {
  keyResultID?: string
  isOpen?: boolean
  onSelect?: (userID: string) => void
}

interface GetUserListQueryResult {
  users: GraphQLConnection<User>
}

interface UpdateKeyResultOwnerMutationResult {
  updateKeyResult: KeyResult
}

export const KeyResultAvailableOwners = ({
  keyResultID,
  isOpen,
  onSelect,
}: KeyResultAvailableOwnersProperties) => {
  const [users, setUserEdges] = useConnectionEdges<User>()
  const [keyResult, setKeyResult] = useRecoilState(keyResultAtomFamily(keyResultID))
  const loadUsers = useRecoilFamilyLoader(userAtomFamily)
  const [fetchUsers, { data }] = useLazyQuery<GetUserListQueryResult>(queries.GET_USER_LIST)
  const [updateKeyResult] = useMutation<UpdateKeyResultOwnerMutationResult>(
    queries.UPDATE_KEY_RESULT_OWNER,
    {
      variables: {
        keyResultID,
      },
      onCompleted: (data) => {
        setKeyResult({
          ...keyResult,
          ...data.updateKeyResult,
        })
      },
    },
  )

  const handleUserSelect = async (userID: string) => {
    if (onSelect) onSelect(userID)
    await updateKeyResult({
      variables: {
        userID,
      },
    })
  }

  const handleSearch = (searchValue: string) => {
    if (!data) return

    if (!searchValue || searchValue === '') setUserEdges(data.users.edges)

    const filteredUserEdges = data.users.edges.filter((edge) =>
      edge.node.fullName.toUpperCase().includes(searchValue.toUpperCase()),
    )
    setUserEdges(filteredUserEdges)
  }

  useEffect(() => {
    if (isOpen) fetchUsers()
  }, [isOpen, fetchUsers])

  useEffect(() => {
    if (data) setUserEdges(data.users.edges)
  }, [data, setUserEdges])

  useEffect(() => {
    if (users) loadUsers(users)
  }, [users, loadUsers])

  return (
    <SelectUserFromList
      users={users}
      isLoading={!data}
      onSearch={handleSearch}
      onSelect={handleUserSelect}
    />
  )
}
