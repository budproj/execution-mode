import { useMutation } from '@apollo/client'
import React from 'react'
import { useRecoilState } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import { UserList } from '../../../../../User/List/wrapper'

import { KeyResultSingleSectionOwnerUpdateUserListProperties } from './interface'
import queries from './queries.gql'

interface UpdateKeyResultOwnerMutationResult {
  updateKeyResult: KeyResult
}

export const KeyResultSingleSectionOwnerUpdateUserList = ({
  users,
  keyResultID,
  onSubmit,
  isLoading,
}: KeyResultSingleSectionOwnerUpdateUserListProperties) => {
  const [keyResult, setKeyResult] = useRecoilState(keyResultAtomFamily(keyResultID))
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

  const handleUserClick = async (userID: string) => {
    if (onSubmit) onSubmit(userID)
    await updateKeyResult({
      variables: {
        userID,
      },
    })
  }

  return <UserList users={users} isLoading={isLoading} onUserClick={handleUserClick} />
}
