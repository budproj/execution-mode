import { useQuery } from '@apollo/client'
import { DrawerContent } from '@chakra-ui/react'
import deepmerge from 'deepmerge'
import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import logger from 'lib/logger'
import { KeyResult } from 'src/components/KeyResult/types'
import authzPoliciesKeyResult, {
  AuthzPoliciesKeyResult,
} from 'src/state/recoil/authz/policies/key-result'
import { AuthzPolicies } from 'src/state/recoil/authz/policies/types'
import { selectKeyResult } from 'src/state/recoil/key-result/selectors'
import { keyResultTimelineFetched } from 'src/state/recoil/key-result/timeline'

import KeyResultDrawerBody from './Body'
import KeyResultDrawerHeader from './Header'
import queries from './queries.gql'

export interface KeyResultDrawerContentProperties {
  keyResultID: KeyResult['id']
}

export interface GetKeyResultWithIDQuery {
  keyResult: Partial<KeyResult>
}

const KeyResultDrawerContent = ({ keyResultID }: KeyResultDrawerContentProperties) => {
  const [keyResult, setKeyResult] = useRecoilState(selectKeyResult(keyResultID))
  const setTimelineFetched = useSetRecoilState(keyResultTimelineFetched(keyResultID))
  const [keyResultPolicies, setKeyResultPolicies] = useRecoilState(
    authzPoliciesKeyResult(keyResultID),
  )

  const buildKeyResultPolicies = (keyResultCheckInPolicies?: AuthzPolicies) => {
    if (!keyResultCheckInPolicies) return keyResultPolicies

    const newPolicies: Partial<AuthzPoliciesKeyResult> = {
      childEntities: {
        keyResultCheckIn: keyResultCheckInPolicies,
      },
    }
    const newKeyResultPolicies = deepmerge(keyResultPolicies, newPolicies)

    return newKeyResultPolicies
  }

  const handleQueryData = (data: GetKeyResultWithIDQuery) => {
    const { policies, ...rest } = data.keyResult
    const keyResultPolicies = buildKeyResultPolicies(policies)

    setKeyResultPolicies(keyResultPolicies)
    setKeyResult(rest)
    setTimelineFetched(true)
  }

  const { loading, called, data } = useQuery<GetKeyResultWithIDQuery>(
    queries.GET_KEY_RESULT_WITH_ID,
    {
      fetchPolicy: 'network-only',
      variables: { id: keyResultID },
      onCompleted: handleQueryData,
    },
  )

  logger.debug('Rerendered key result drawer contents. Take a look at our new data:', {
    component,
    data: {
      data,
      keyResult,
      called,
      loading,
    },
  })

  return (
    <DrawerContent overflowY="auto">
      <KeyResultDrawerHeader keyResultID={keyResultID} />
      <KeyResultDrawerBody keyResultID={keyResultID} />
    </DrawerContent>
  )
}

const component = KeyResultDrawerContent.name

export default KeyResultDrawerContent
