import { Drawer } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'

import { ColorizedOverlay } from 'src/components/Base/ColorizedOverlay/wrapper'
import { KeyResult } from 'src/components/KeyResult/types'
import buildPartialSelector from 'src/state/recoil/key-result/build-partial-selector'
import {
  keyResultCheckInCommentEnabled,
  keyResultCheckInProgressDraft,
  keyResultLatestCheckIn,
} from 'src/state/recoil/key-result/check-in'
import isCheckInModalOpenAtom from 'src/state/recoil/key-result/check-in/is-check-in-modal-open'
import { draftCheckMarksAtom } from 'src/state/recoil/key-result/checklist'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'

import { EventType } from '../../../../state/hooks/useEvent/event-type'
import { useEvent } from '../../../../state/hooks/useEvent/hook'

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
  const { dispatch } = useEvent(EventType.OPENED_KEY_RESULT_DRAWER)
  const setIsCheckInModalOpen = useSetRecoilState(isCheckInModalOpenAtom)

  const handleClose = () => {
    resetOpenDrawer()
    resetTimeline()
    resetCommentEnabled()
    resetCheckmarkDrafts()
    setDraftValue(latestKeyResultCheckIn?.value)
    setIsCheckInModalOpen(false)
  }

  const isOpen = Boolean(keyResultID)

  useEffect(() => {
    if (keyResultID) {
      dispatch({ keyResultID })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyResultID])

  return (
    <Drawer isOpen={isOpen} size="xl" autoFocus={false} onClose={handleClose}>
      <ColorizedOverlay>
        {isOpen && typeof keyResultID !== 'undefined' && (
          <KeyResultDrawerContent keyResultID={keyResultID} />
        )}
      </ColorizedOverlay>
    </Drawer>
  )
}

export default KeyResultDrawer
