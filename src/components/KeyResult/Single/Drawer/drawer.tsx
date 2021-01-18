import { useLazyQuery } from '@apollo/client'
import { DrawerContent, Drawer, DrawerOverlay, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import logger from 'lib/logger'
import {
  KeyResultSectionOwner,
  KeyResultSectionObjective,
  KeyResultSectionDescription,
  KeyResultSectionCheckIn,
  KeyResultSectionCycle,
  KeyResultSectionComments,
} from 'src/components/KeyResult/Single/Sections'
import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultOpenDrawer } from 'src/state/recoil/key-result/drawer'
import { selectKeyResult } from 'src/state/recoil/key-result/selectors'

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
    if (!loading && data && data.keyResult.id === keyResultID) setKeyResult(data.keyResult)
  }, [loading, data, keyResultID, setKeyResult])

  useEffect(() => {
    if (keyResultID) getKeyResult({ variables: { id: keyResultID } })
  }, [keyResultID, getKeyResult])

  return (
    <Drawer isOpen={isOpen} size="md" autoFocus={false} onClose={handleClose}>
      <DrawerOverlay>
        <DrawerContent overflowY="auto">
          <KeyResultDrawerHeader keyResultID={keyResultID} />
          <Flex gridGap={8} py={8} px={6} direction="column">
            <KeyResultSectionOwner keyResultID={keyResultID} />
            <KeyResultSectionObjective keyResultID={keyResultID} />
            <KeyResultSectionDescription keyResultID={keyResultID} />
            <KeyResultSectionCycle keyResultID={keyResultID} />
            <KeyResultSectionCheckIn keyResultID={keyResultID} />
            <KeyResultSectionComments keyResultID={keyResultID} />
          </Flex>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

const component = KeyResultDrawer.name

export default KeyResultDrawer
