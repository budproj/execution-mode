import { Drawer } from '@chakra-ui/react'
import { useRouter } from 'next/router'
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
import {
  draftCheckMarksAtom,
  isCheckListCollapseOpenAtom,
} from 'src/state/recoil/key-result/checklist'
import { keyResultReadDrawerOpenedKeyResultID } from 'src/state/recoil/key-result/drawers/read/opened-key-result-id'
import { isKeyResultListOpenAtom } from 'src/state/recoil/key-result/key-result-list'
import { createdByCheckInNotificationAtom } from 'src/state/recoil/notifications'

import { EventType } from '../../../../state/hooks/useEvent/event-type'
import { useEvent } from '../../../../state/hooks/useEvent/hook'

import KeyResultDrawerContent from './content'

const timelineSelector = buildPartialSelector<KeyResult['timeline']>('timeline')
const objectiveSelector = buildPartialSelector<KeyResult['objective']>('objective')

const KeyResultDrawer = () => {
  const {
    pathname,
    query: { id },
  } = useRouter()

  const keyResultID = useRecoilValue(keyResultReadDrawerOpenedKeyResultID)
  const latestKeyResultCheckIn = useRecoilValue(keyResultLatestCheckIn(keyResultID))
  const setDraftValue = useSetRecoilState(keyResultCheckInProgressDraft(keyResultID))
  const resetOpenDrawer = useResetRecoilState(keyResultReadDrawerOpenedKeyResultID)
  const resetTimeline = useResetRecoilState(timelineSelector(keyResultID))
  const resetCommentEnabled = useResetRecoilState(keyResultCheckInCommentEnabled(keyResultID))
  const resetCheckmarkDrafts = useResetRecoilState(draftCheckMarksAtom(keyResultID))
  const { dispatch } = useEvent(EventType.OPENED_KEY_RESULT_DRAWER)
  const setIsCheckInModalOpen = useSetRecoilState(isCheckInModalOpenAtom)
  const setCreatedByNotification = useSetRecoilState(createdByCheckInNotificationAtom)
  const setIsChecklistOpen = useSetRecoilState(isCheckListCollapseOpenAtom)
  const setHiddingModal = useSetRecoilState(isKeyResultListOpenAtom)

  const objective = useRecoilValue(objectiveSelector(keyResultID))

  const handleClose = () => {
    resetOpenDrawer()
    resetTimeline()
    resetCommentEnabled()
    resetCheckmarkDrafts()
    setDraftValue(latestKeyResultCheckIn?.value)
    setIsCheckInModalOpen(false)
    setIsChecklistOpen(false)
    setCreatedByNotification(false)
    setHiddingModal(false)
  }

  const isOpen = Boolean(keyResultID)

  const isKeyResultPage = () => {
    if ((!objective?.teamId && pathname === '/my-things') || id === objective?.teamId) return true
    return false
  }

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
          <KeyResultDrawerContent keyResultID={keyResultID} isKeyResultPage={isKeyResultPage()} />
        )}
      </ColorizedOverlay>
    </Drawer>
  )
}

export default KeyResultDrawer
