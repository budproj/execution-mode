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
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'

import KeyResultDrawerContent from './content'

const timelineSelector = buildPartialSelector<KeyResult['timeline']>('timeline')

const KeyResultDrawer = () => {
  const keyResultID = useRecoilValue(keyResultReadDrawerOpenedKeyResultID)
  const latestKeyResultCheckIn = useRecoilValue(keyResultLatestCheckIn(keyResultID))
  const setDraftValue = useSetRecoilState(keyResultCheckInProgressDraft(keyResultID))
  const resetOpenDrawer = useResetRecoilState(keyResultReadDrawerOpenedKeyResultID)
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
    <Drawer isOpen={isOpen} size="xl" autoFocus={false} onClose={handleClose}>
      <DrawerOverlay>
        {isOpen && typeof keyResultID !== 'undefined' && (
          <KeyResultDrawerContent keyResultID={keyResultID} />
        )}
      </DrawerOverlay>
    </Drawer>
  )
}

export default KeyResultDrawer
