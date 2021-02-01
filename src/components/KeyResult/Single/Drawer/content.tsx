import { useQuery } from '@apollo/client'
import { DrawerContent } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import logger from 'lib/logger'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultDrawerLoaded } from 'src/state/recoil/key-result/drawer'
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
  const [keyResult, setKeyResult] = useRecoilState(selectKeyResult(keyResultID))
  const setDrawerLoaded = useSetRecoilState(keyResultDrawerLoaded)
  const { loading, called, data } = useQuery<GetKeyResultWithIDQuery>(
    queries.GET_KEY_RESULT_WITH_ID,
    {
      fetchPolicy: 'network-only',
      variables: { id: keyResultID },
    },
  )

  useEffect(() => {
    if (called && data) {
      setKeyResult(data.keyResult)
      setDrawerLoaded(true)
    }
  }, [called, data, setKeyResult, setDrawerLoaded])

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
