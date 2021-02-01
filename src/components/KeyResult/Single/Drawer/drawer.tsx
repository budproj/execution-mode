import { Drawer, DrawerOverlay } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import { keyResultDrawerLoaded, keyResultDrawerOpen } from 'src/state/recoil/key-result/drawer'

import KeyResultDrawerContent from './content'

const KeyResultDrawer = () => {
  const keyResultID = useRecoilValue(keyResultDrawerOpen)
  const resetOpenDrawer = useResetRecoilState(keyResultDrawerOpen)
  const resetLoadedDrawer = useResetRecoilState(keyResultDrawerLoaded)

  const handleClose = () => {
    resetOpenDrawer()
    resetLoadedDrawer()
  }

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
