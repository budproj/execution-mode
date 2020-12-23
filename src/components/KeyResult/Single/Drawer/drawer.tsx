import { useLazyQuery } from '@apollo/client'
import { DrawerContent, Drawer, DrawerOverlay, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import logger from 'lib/logger'
import {
  KeyResultSingleOwner,
  KeyResultSingleOKR,
  KeyResultSingleDescription,
  KeyResultSingleCheckIn,
} from 'src/components/KeyResult/Single'
import KeyResultSingleCycle from 'src/components/KeyResult/Single/Cycle'
import { keyResultOpenDrawer } from 'src/state/recoil/key-result/drawer'
import { selectKeyResult } from 'src/state/recoil/key-result/selectors'

import { KeyResult } from '../../types'

import KeyResultDrawerHeader from './Header'
import queries from './queries.gql'

export interface GetKeyResultWithIDQuery {
  keyResult: Partial<KeyResult>
}

const KeyResultDrawer = () => {
  const [keyResultID, setKeyResultID] = useRecoilState(keyResultOpenDrawer)
  const [keyResult, setKeyResult] = useRecoilState(selectKeyResult(keyResultID))
  const [getKeyResult, { loading, data }] = useLazyQuery<GetKeyResultWithIDQuery>(
    queries.GET_KEY_RESULT_WITH_ID,
    { fetchPolicy: 'network-only' },
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
    if (keyResultID) getKeyResult({ variables: { id: keyResultID } })
  }, [keyResultID, getKeyResult])

  return (
    <Drawer isOpen={isOpen} size="md" autoFocus={false} onClose={handleClose}>
      <DrawerOverlay>
        <DrawerContent overflowY="auto">
          <KeyResultDrawerHeader keyResultID={keyResultID} />
          <Flex gridGap={8} py={8} px={6} direction="column">
            <KeyResultSingleOwner keyResultID={keyResultID} />
            <KeyResultSingleOKR keyResultID={keyResultID} />
            <KeyResultSingleDescription keyResultID={keyResultID} />
            <KeyResultSingleCycle keyResultID={keyResultID} />
            <KeyResultSingleCheckIn keyResultID={keyResultID} />
          </Flex>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

const component = KeyResultDrawer.name

export default KeyResultDrawer
