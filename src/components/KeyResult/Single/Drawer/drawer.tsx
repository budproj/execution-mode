import { Drawer, DrawerOverlay, useToken } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'
import {
  keyResultCheckInCommentEnabled,
  keyResultCheckInProgressDraft,
  keyResultLatestCheckIn,
} from 'src/state/recoil/key-result/check-in'
import { draftCheckMarksAtom } from 'src/state/recoil/key-result/checklist'
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
  const resetCheckmarkDrafts = useResetRecoilState(draftCheckMarksAtom(keyResultID))

  const handleClose = () => {
    resetOpenDrawer()
    resetTimeline()
    resetCommentEnabled()
    resetCheckmarkDrafts()
    setDraftValue(latestKeyResultCheckIn?.value)
  }

  const isOpen = Boolean(keyResultID)

  const [newGray800]: string[] = useToken('colors', ['new-gray.800'])

  // This is a hack to possible use transparency in our color palette
  // 80 is the alfa channel for 50% transparency
  // TODO: modify our color palette to use transparencies
  const newGray800WithTransparency = `${newGray800}80`

  return (
    <Drawer isOpen={isOpen} size="xl" autoFocus={false} onClose={handleClose}>
      <DrawerOverlay backgroundColor={newGray800WithTransparency}>
        {isOpen && typeof keyResultID !== 'undefined' && (
          <KeyResultDrawerContent keyResultID={keyResultID} />
        )}
      </DrawerOverlay>
    </Drawer>
  )
}

export default KeyResultDrawer
