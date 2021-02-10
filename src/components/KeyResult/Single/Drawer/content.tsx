import { useQuery } from '@apollo/client'
import { DrawerContent, Flex } from '@chakra-ui/react'
import deepmerge from 'deepmerge'
import React, { useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import logger from 'lib/logger'
import { KeyResult } from 'src/components/KeyResult/types'
import authzPoliciesKeyResult, {
  AuthzPoliciesKeyResult,
} from 'src/state/recoil/authz/policies/key-result'
import { AuthzPolicies } from 'src/state/recoil/authz/policies/types'
import { keyResultDrawerIsScrolling } from 'src/state/recoil/key-result/drawer'
import selectKeyResult from 'src/state/recoil/key-result/key-result'
import { keyResultTimelineFetched } from 'src/state/recoil/key-result/timeline'

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
  const [keyResult, setKeyResult] = useRecoilState(selectKeyResult(keyResultID))

  const [limit] = useState(10)
  const [offset, setOffset] = useState(keyResult?.timeline ? keyResult.timeline.length : 0)
  const [canRefetch, setCanRefetch] = useState(false)

  const setTimelineFetched = useSetRecoilState(keyResultTimelineFetched(keyResultID))
  const [keyResultPolicies, setKeyResultPolicies] = useRecoilState(
    authzPoliciesKeyResult(keyResultID),
  )
  const isScrolling = useRecoilValue(keyResultDrawerIsScrolling(keyResultID))

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
    const { policies, ...newData } = data.keyResult
    const keyResultPolicies = buildKeyResultPolicies(policies)

    const previousTimeline = keyResult?.timeline ?? []
    const newTimeline = newData?.timeline ?? []
    const timeline = [...previousTimeline, ...newTimeline]

    const newKeyResult = {
      ...newData,
      timeline,
    }

    setKeyResultPolicies(keyResultPolicies)
    setKeyResult(newKeyResult)
    setTimelineFetched(true)
    setOffset(offset + limit)

    const hasMoreData = newData?.timeline && newData.timeline.length >= limit
    setCanRefetch(Boolean(hasMoreData))
  }

  const { loading, called, data, fetchMore } = useQuery<GetKeyResultWithIDQuery>(
    queries.GET_KEY_RESULT_WITH_ID,
    {
      variables: {
        limit,
        id: keyResultID,
      },
      onCompleted: handleQueryData,
      notifyOnNetworkStatusChange: true,
    },
  )

  const handleInfiniteScroll = async () => {
    const shouldFetchMore = canRefetch && isScrolling

    if (shouldFetchMore) {
      setCanRefetch(false)

      const { data } = await fetchMore({
        query: queries.GET_MORE_KEY_RESULT_TIMELINE_WITH_ID,
        variables: {
          limit,
          offset,
          id: keyResultID,
        },
      })
      handleQueryData(data)
    }
  }

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
    <DrawerContent>
      <Flex direction="column" minH="100%">
        <KeyResultDrawerHeader keyResultID={keyResultID} />
        <KeyResultDrawerBody
          keyResultID={keyResultID}
          isLoading={loading}
          onYReachEnd={handleInfiniteScroll}
        />
        <KeyResultDrawerFooter keyResultID={keyResultID} />
      </Flex>
    </DrawerContent>
  )
}

const component = KeyResultDrawerContent.name

export default KeyResultDrawerContent
