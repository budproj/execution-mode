import { useQuery } from '@apollo/client'
import { DrawerContent } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import logger from 'lib/logger'
import { KeyResult } from 'src/components/KeyResult/types'
import { selectKeyResult } from 'src/state/recoil/key-result/selectors'

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
  const [isLoading, setIsLoading] = useState(true)
  const [keyResult, setKeyResult] = useRecoilState(selectKeyResult(keyResultID))
  const { loading, called, data } = useQuery<GetKeyResultWithIDQuery>(
    queries.GET_KEY_RESULT_WITH_ID,
    {
      fetchPolicy: 'network-only',
      variables: { id: keyResultID },
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

  useEffect(() => {
    if (called && data) {
      setKeyResult(data.keyResult)
      setIsLoading(false)
    }
  }, [called, data, setKeyResult])

  return (
    <DrawerContent overflowY="auto">
      <KeyResultDrawerHeader keyResultID={keyResultID} />
      <KeyResultDrawerBody keyResultID={keyResultID} isLoading={isLoading} />
    </DrawerContent>
  )
}

const component = KeyResultDrawerContent.name

export default KeyResultDrawerContent
