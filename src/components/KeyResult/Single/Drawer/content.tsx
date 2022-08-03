import { useQuery } from '@apollo/client'
import { DrawerContent, Flex } from '@chakra-ui/react'
import React from 'react'
import { useSetRecoilState } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { Scope } from 'src/components/types'
import selectKeyResult from 'src/state/recoil/key-result/key-result'

import KeyResultDrawerBody from './Body'
import KeyResultDrawerFooter from './Footer'
import queries from './queries.gql'

export interface KeyResultDrawerContentProperties {
  keyResultID: KeyResult['id']
  isKeyResultPage?: boolean
}

export interface GetKeyResultWithIDQuery {
  keyResult: KeyResult
}

const KeyResultDrawerContent = ({
  keyResultID,
  isKeyResultPage,
}: KeyResultDrawerContentProperties) => {
  const setKeyResult = useSetRecoilState(selectKeyResult(keyResultID))

  const handleQueryData = (data: GetKeyResultWithIDQuery) => {
    setKeyResult(data.keyResult)
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

  console.log('Rerendered key result drawers contents. Take a look at our new data:', {
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
        <KeyResultDrawerBody
          keyResultID={keyResultID}
          isLoading={loading}
          isKeyResultPage={isKeyResultPage}
        />
        <KeyResultDrawerFooter keyResultID={keyResultID} />
      </Flex>
    </DrawerContent>
  )
}

const component = KeyResultDrawerContent.name

KeyResultDrawerContent.defaultProps = {
  scope: Scope.ANY,
}

export default KeyResultDrawerContent
