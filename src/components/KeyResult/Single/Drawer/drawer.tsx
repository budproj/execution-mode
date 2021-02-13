import { Drawer, DrawerOverlay } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'
import { keyResultCheckInProgressDraft } from 'src/state/recoil/key-result/check-in'
import selectCurrentProgress from 'src/state/recoil/key-result/current-progress'
import { keyResultDrawerOpen } from 'src/state/recoil/key-result/drawer'

import KeyResultDrawerContent from './content'

const timelineSelector = buildPartialSelector<KeyResult['timeline']>('timeline')

const KeyResultDrawer = () => {
  const keyResultID = useRecoilValue(keyResultDrawerOpen)
  const resetOpenDrawer = useResetRecoilState(keyResultDrawerOpen)
  const currentProgress = useRecoilValue(selectCurrentProgress(keyResultID))
  const setDraftValue = useSetRecoilState(keyResultCheckInProgressDraft(keyResultID))
  const resetTimeline = useResetRecoilState(timelineSelector(keyResultID))

  const handleClose = () => {
    resetOpenDrawer()
    resetTimeline()
    setDraftValue(currentProgress)
  }

  const isOpen = Boolean(keyResultID)

  return (
    <Drawer isOpen={isOpen} size="sm" autoFocus={false} onClose={handleClose}>
      <DrawerOverlay>
        {isOpen && typeof keyResultID !== 'undefined' && (
          <KeyResultDrawerContent keyResultID={keyResultID} />
        )}
      </DrawerOverlay>
    </Drawer>
  )
}

export default KeyResultDrawer
