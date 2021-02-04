import { useQuery } from '@apollo/client'
import { DrawerContent } from '@chakra-ui/react'
import deepmerge from 'deepmerge'
import React, { useState } from 'react'
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
import { MINIMUM_SCROLL_TOP_DIFFERENCE } from './constants'

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
  const [previousScrollTop, setPreviousScrollTop] = useState(0)
  const [isScrollingUp, setIsScrollingUp] = useState(true)

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

  const handleScroll = (data: React.UIEvent<HTMLElement, UIEvent>) => {
    const currentScrollTop = data.currentTarget.scrollTop
    const scrollDifference = previousScrollTop - currentScrollTop
    const absScrollDifference = Math.abs(scrollDifference)

    const isInTheExpectedDirection = isScrollingUp ? scrollDifference >= 0 : scrollDifference < 0
    const shouldUpdateState = absScrollDifference > MINIMUM_SCROLL_TOP_DIFFERENCE

    if (shouldUpdateState) setPreviousScrollTop(currentScrollTop)
    if (shouldUpdateState && !isInTheExpectedDirection) setIsScrollingUp(!isScrollingUp)
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
    <DrawerContent overflowY="auto" onScroll={handleScroll}>
      <KeyResultDrawerHeader keyResultID={keyResultID} showCheckInButton={isScrollingUp} />
      <KeyResultDrawerBody keyResultID={keyResultID} />
    </DrawerContent>
  )
}

const component = KeyResultDrawerContent.name

export default KeyResultDrawerContent
