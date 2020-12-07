import { useLazyQuery } from '@apollo/client'
import { DrawerContent, Drawer, DrawerOverlay, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import logger from 'lib/logger'
import { KeyResultSingleOwner } from 'src/components/KeyResult/Single'
import queries from 'src/components/KeyResult/queries.gql'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import { keyResultOpenDrawer } from 'src/state/recoil/key-result/drawer'

import KeyResultDrawerHeader from './Header'

const KeyResultDrawer = () => {
  const [keyResultID, setKeyResultID] = useRecoilState(keyResultOpenDrawer)
  const [keyResult, setKeyResult] = useRecoilState(keyResultAtomFamily(keyResultID))
  const [getKeyResult, { loading, data, called, variables }] = useLazyQuery(
    queries.GET_KEY_RESULT_WITH_ID,
    {
      variables: {
        id: keyResultID,
      },
    },
  )

  // eslint-disable-next-line unicorn/no-useless-undefined
  const handleClose = () => setKeyResultID(undefined)
  const isOpen = Boolean(keyResultID)

  logger.debug('Rerendered key result drawer contents. Take a look at our new data:', {
    component,
    data: {
      data,
      loading,
      keyResult,
    },
  })

  useEffect(() => {
    if (!loading && data) setKeyResult(data.keyResult)
  }, [loading, data, setKeyResult])

  useEffect(() => {
    if (!called && keyResultID) getKeyResult()
    if (called && variables?.id !== keyResultID) getKeyResult()
  }, [called, keyResultID, getKeyResult, variables])

  return (
    <Drawer isOpen={isOpen} size="sm" autoFocus={false} onClose={handleClose}>
      <DrawerOverlay>
        <DrawerContent>
          <KeyResultDrawerHeader keyResultID={keyResultID} />
          <Flex gridGap={4} pt={8} px={6}>
            <KeyResultSingleOwner keyResultID={keyResultID} />
          </Flex>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

const component = KeyResultDrawer.name

export default KeyResultDrawer
