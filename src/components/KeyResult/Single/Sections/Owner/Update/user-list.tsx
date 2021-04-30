import { useMutation } from '@apollo/client'
import { Stack, Text } from '@chakra-ui/layout'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { NamedAvatar } from 'src/components/User'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'

import { KeyResultSingleSectionOwnerUpdateUserListProperties } from './interface'
import messages from './messages'
import queries from './queries.gql'

interface UpdateKeyResultOwnerMutationResult {
  updateKeyResult: KeyResult
}

export const KeyResultSingleSectionOwnerUpdateUserList = ({
  users,
  keyResultID,
  onSubmit,
}: KeyResultSingleSectionOwnerUpdateUserListProperties) => {
  const [keyResult, setKeyResult] = useRecoilState(keyResultAtomFamily(keyResultID))
  const intl = useIntl()
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

  const handleUserClick = (userID: string) => async () => {
    if (onSubmit) onSubmit(userID)
    await updateKeyResult({
      variables: {
        userID,
      },
    })
  }

  return (
    <Stack spacing={4} maxH={80} overflowY="auto">
      {users.length > 0 ? (
        users.map((user) => (
          <NamedAvatar
            key={user.id}
            canHover
            userID={user.id}
            subtitleType="team"
            onClick={handleUserClick(user.id)}
          />
        ))
      ) : (
        <Text color="black.600">{intl.formatMessage(messages.emptyState)}</Text>
      )}
    </Stack>
  )
}
