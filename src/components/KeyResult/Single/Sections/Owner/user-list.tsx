import { useMutation } from '@apollo/client'
import React from 'react'
import { useRecoilState } from 'recoil'

import { keyResultAtomFamily } from '../../../../../state/recoil/key-result'
import { AllReachableUsers } from '../../../../User/AllReachableUsers/wrapper'
import { KeyResult } from '../../../types'

import queries from './queries.gql'

interface KeyResultAvailableOwnersProperties {
  keyResultID?: string
  onSelect?: (userID: string) => void
}

interface UpdateKeyResultOwnerMutationResult {
  updateKeyResult: KeyResult
}

export const KeyResultAvailableOwners = ({
  keyResultID,
  onSelect,
}: KeyResultAvailableOwnersProperties) => {
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

  const handleUserSelect = async (userID: string) => {
    if (onSelect) onSelect(userID)
    await updateKeyResult({
      variables: {
        userID,
      },
    })
  }

  return <AllReachableUsers onSelect={handleUserSelect} />
}
