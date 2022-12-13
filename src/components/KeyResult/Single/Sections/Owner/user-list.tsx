import { useMutation } from '@apollo/client'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import GET_KEY_RESULTS_HIGHLIGHTS from 'src/components/Page/Team/Highlights/hooks/getKeyRusultsHighlights/get-key-results-highlights.gql'
import GET_NO_RELATED_MEMBERS from 'src/components/Page/Team/Highlights/hooks/getNoRelatedMembers/get-no-related-members.gql'
import { selectedTeamIdHighlight } from 'src/state/recoil/team/highlight/selected-team-id-highlight'

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
  const teamId = useRecoilValue(selectedTeamIdHighlight)

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
      refetchQueries: [
        {
          query: GET_NO_RELATED_MEMBERS,
          variables: { teamId },
        },
        {
          query: GET_KEY_RESULTS_HIGHLIGHTS,
          variables: { teamId },
        },
      ],
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
