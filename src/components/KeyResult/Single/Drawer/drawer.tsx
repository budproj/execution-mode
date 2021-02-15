import { Drawer, DrawerOverlay } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'
import {
  keyResultCheckInCommentEnabled,
  keyResultCheckInProgressDraft,
  keyResultLatestCheckIn,
} from 'src/state/recoil/key-result/check-in'
import { keyResultDrawerOpen } from 'src/state/recoil/key-result/drawer'

import KeyResultDrawerContent from './content'

const timelineSelector = buildPartialSelector<KeyResult['timeline']>('timeline')

const KeyResultDrawer = () => {
  const keyResultID = useRecoilValue(keyResultDrawerOpen)
  const latestKeyResultCheckIn = useRecoilValue(keyResultLatestCheckIn(keyResultID))
  const setDraftValue = useSetRecoilState(keyResultCheckInProgressDraft(keyResultID))
  const resetOpenDrawer = useResetRecoilState(keyResultDrawerOpen)
  const resetTimeline = useResetRecoilState(timelineSelector(keyResultID))
  const resetCommentEnabled = useResetRecoilState(keyResultCheckInCommentEnabled(keyResultID))

  const handleClose = () => {
    resetOpenDrawer()
    resetTimeline()
    resetCommentEnabled()
    setDraftValue(latestKeyResultCheckIn?.value)
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
