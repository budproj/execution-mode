import { Drawer, DrawerOverlay } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'

import { keyResultCheckInProgressDraft } from 'src/state/recoil/key-result/check-in'
import { keyResultDrawerLoaded, keyResultDrawerOpen } from 'src/state/recoil/key-result/drawer'
import { selectCurrentProgress } from 'src/state/recoil/key-result/selectors'

import KeyResultDrawerContent from './content'

const KeyResultDrawer = () => {
  const keyResultID = useRecoilValue(keyResultDrawerOpen)
  const resetOpenDrawer = useResetRecoilState(keyResultDrawerOpen)
  const resetLoadedDrawer = useResetRecoilState(keyResultDrawerLoaded)
  const currentProgress = useRecoilValue(selectCurrentProgress(keyResultID))
  const setDraftValue = useSetRecoilState(keyResultCheckInProgressDraft(keyResultID))

  const handleClose = () => {
    resetOpenDrawer()
    resetLoadedDrawer()
    setDraftValue(currentProgress)
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
