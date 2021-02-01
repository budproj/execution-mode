import { Popover as PopoverWrapper, PopoverTrigger } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import {
  keyResultCheckInPopoverOpen,
  keyResultCheckInProgressDraft,
} from 'src/state/recoil/key-result/check-in'
import { selectCurrentProgress } from 'src/state/recoil/key-result/selectors'

import Popover from './popover'
import ProgressSliderSlider from './slider'

export interface ProgressSliderWrapperProperties {
  id?: KeyResult['id']
  canChange?: boolean
}

const ProgressSliderWrapper = ({ id, canChange }: ProgressSliderWrapperProperties) => {
  const [isPopoverOpen, setPopoverOpen] = useRecoilState<boolean>(keyResultCheckInPopoverOpen(id))
  const currentProgress = useRecoilValue(selectCurrentProgress(id))
  const setDraftValue = useSetRecoilState(keyResultCheckInProgressDraft(id))

  const handleClose = () => {
    setPopoverOpen(false)
    setDraftValue(currentProgress)
  }

  return (
    <PopoverWrapper isOpen={isPopoverOpen} placement="bottom-start" onClose={handleClose}>
      <PopoverTrigger>
        <ProgressSliderSlider keyResultID={id} canChange={canChange} />
      </PopoverTrigger>
      <Popover keyResultID={id} onClose={handleClose} />
    </PopoverWrapper>
  )
}

export default ProgressSliderWrapper
