import { Drawer, DrawerOverlay } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  keyResultCheckInCommentEnabled,
  keyResultCheckInProgressDraft,
} from 'src/state/recoil/key-result/check-in'
import { keyResultOpenDrawer } from 'src/state/recoil/key-result/drawer'
import { selectCurrentProgress } from 'src/state/recoil/key-result/selectors'

import KeyResultDrawerContent from './content'

const KeyResultDrawer = () => {
  const [keyResultID, setKeyResultID] = useRecoilState(keyResultOpenDrawer)

  const currentProgress = useRecoilValue(selectCurrentProgress(keyResultID))
  const setCommentEnabled = useSetRecoilState(keyResultCheckInCommentEnabled(keyResultID))
  const [progressDraft, setProgressDraft] = useRecoilState(
    keyResultCheckInProgressDraft(keyResultID),
  )

  const handleClose = () => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    setKeyResultID(undefined)
    setCommentEnabled(false)
    if (progressDraft !== currentProgress) setProgressDraft(currentProgress)
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
