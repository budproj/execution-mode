import { DrawerContent, Flex } from '@chakra-ui/react'
import React from 'react'

import { KeyResult } from 'src/components/KeyResult/types'
import { Scope } from 'src/components/types'

import KeyResultDrawerBody from './Body'
import KeyResultDrawerFooter from './Footer'
import useGetKeyResultWithId from './hooks/get-key-result-with-id'

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
  const { called, data, loading } = useGetKeyResultWithId(keyResultID)

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
