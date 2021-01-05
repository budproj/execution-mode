import { Popover as PopoverWrapper, PopoverTrigger } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import {
  keyResultProgressUpdatePopoverOpen,
  keyResultProgressUpdateDraftValue as draftValueAtom,
} from 'src/state/recoil/key-result/progress-update'
import selectCurrentProgress from 'src/state/recoil/key-result/selectors/current-progress'

import Popover from './popover'
import Slider from './slider'

export interface ProgressSliderWrapperProperties {
  id?: KeyResult['id']
  canChange?: boolean
}

const ProgressSliderWrapper = ({ id, canChange }: ProgressSliderWrapperProperties) => {
  const currentProgress = useRecoilValue(selectCurrentProgress(id))
  const [draftValue, setDraftValue] = useRecoilState(draftValueAtom(id))
  const [isPopoverOpen, setPopoverOpen] = useRecoilState<boolean>(
    keyResultProgressUpdatePopoverOpen(id),
  )

  const handleClose = () => {
    if (draftValue !== currentProgress) setDraftValue(currentProgress)
    setPopoverOpen(false)
  }

  return (
    <PopoverWrapper isOpen={isPopoverOpen} placement="bottom-start" onClose={handleClose}>
      <PopoverTrigger>
        <Slider keyResultID={id} canChange={canChange} />
      </PopoverTrigger>
      <Popover keyResultID={id} onClose={handleClose} />
    </PopoverWrapper>
  )
}

export default ProgressSliderWrapper
