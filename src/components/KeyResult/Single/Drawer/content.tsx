import { useQuery } from '@apollo/client'
import { DrawerContent, Flex } from '@chakra-ui/react'
import deepmerge from 'deepmerge'
import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import logger from 'lib/logger'
import { KeyResult } from 'src/components/KeyResult/types'
import authzPoliciesKeyResult, {
  AuthzPoliciesKeyResult,
} from 'src/state/recoil/authz/policies/key-result'
import { AuthzPolicies } from 'src/state/recoil/authz/policies/types'
import selectKeyResult from 'src/state/recoil/key-result/key-result'

import KeyResultDrawerBody from './Body'
import KeyResultDrawerFooter from './Footer'
import KeyResultDrawerHeader from './Header'
import queries from './queries.gql'

export interface KeyResultDrawerContentProperties {
  keyResultID: KeyResult['id']
}

export interface GetKeyResultWithIDQuery {
  keyResult: Partial<KeyResult>
}

const KeyResultDrawerContent = ({ keyResultID }: KeyResultDrawerContentProperties) => {
  const setKeyResult = useSetRecoilState(selectKeyResult(keyResultID))
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
    const { policies, ...newKeyResult } = data.keyResult
    const keyResultPolicies = buildKeyResultPolicies(policies)

    setKeyResultPolicies(keyResultPolicies)
    setKeyResult(newKeyResult)
  }

  const { loading, called, data } = useQuery<GetKeyResultWithIDQuery>(
    queries.GET_KEY_RESULT_WITH_ID,
    {
      variables: {
        id: keyResultID,
      },
      onCompleted: handleQueryData,
      fetchPolicy: 'network-only',
    },
  )

  logger.debug('Rerendered key result drawer contents. Take a look at our new data:', {
    component,
    data: {
      data,
      called,
      loading,
    },
  })

  return (
    <DrawerContent>
      <Flex direction="column" minH="100%" maxH="100%">
        <KeyResultDrawerHeader keyResultID={keyResultID} />
        <KeyResultDrawerBody keyResultID={keyResultID} />
        <KeyResultDrawerFooter keyResultID={keyResultID} />
      </Flex>
    </DrawerContent>
  )
}

const component = KeyResultDrawerContent.name

export default KeyResultDrawerContent
