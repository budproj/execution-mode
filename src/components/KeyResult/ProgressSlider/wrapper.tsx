import { Popover as PopoverWrapper, PopoverTrigger } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultAtomFamily } from 'src/state/recoil/key-result'
import {
  keyResultCheckInPopoverOpen,
  keyResultCheckInProgressDraft,
  keyResultLatestCheckIn,
} from 'src/state/recoil/key-result/check-in'

import Popover from './popover'
import ProgressSliderSlider from './slider'

export interface ProgressSliderWrapperProperties {
  isActive: boolean
  id?: KeyResult['id']
  isDisabled?: boolean
}

const ProgressSliderWrapper = ({ id, isDisabled, isActive }: ProgressSliderWrapperProperties) => {
  const [isPopoverOpen, setPopoverOpen] = useRecoilState<boolean>(keyResultCheckInPopoverOpen(id))
  const latestKeyResultCheckIn = useRecoilValue(keyResultLatestCheckIn(id))
  const setDraftValue = useSetRecoilState(keyResultCheckInProgressDraft(id))
  const keyResult = useRecoilValue(keyResultAtomFamily(id))

  const handleClose = () => {
    setPopoverOpen(false)
    setDraftValue(latestKeyResultCheckIn?.value ?? keyResult?.initialValue)
  }

  return (
    <PopoverWrapper isOpen={isPopoverOpen} placement="bottom-start" onClose={handleClose}>
      <PopoverTrigger>
        <ProgressSliderSlider keyResultID={id} isDisabled={isDisabled} isActive={isActive} />
      </PopoverTrigger>
      <Popover keyResultID={id} onClose={handleClose} />
    </PopoverWrapper>
  )
}

ProgressSliderWrapper.defaultProps = {
  isActive: true,
}

export default ProgressSliderWrapper
