import { Drawer, DrawerOverlay } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState } from 'recoil'

import { keyResultOpenDrawer } from 'src/state/recoil/key-result/drawer'

import KeyResultDrawerContent from './content'

const KeyResultDrawer = () => {
  const [keyResultID, setKeyResultID] = useRecoilState(keyResultOpenDrawer)

  // eslint-disable-next-line unicorn/no-useless-undefined
  const handleClose = () => setKeyResultID(undefined)
  const isOpen = Boolean(keyResultID)

  return (
    <Drawer isOpen={isOpen} size="md" autoFocus={false} onClose={handleClose}>
      <DrawerOverlay>
        {isOpen && typeof keyResultID !== 'undefined' && (
          <KeyResultDrawerContent keyResultID={keyResultID} />
        )}
      </DrawerOverlay>
    </Drawer>
  )
}

export default KeyResultDrawer
