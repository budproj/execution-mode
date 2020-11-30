import {
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'
import { keyResultProgressUpdatePopoverSlider } from 'src/state/recoil/key-result/progress-update'

import SliderContainer from './slider-container'

export interface ProgressSliderProperties {
  id?: KeyResult['id']
}

const ProgressSlider = ({ id }: ProgressSliderProperties) => {
  const openedPopover = useRecoilValue(keyResultProgressUpdatePopoverSlider)
  const resetOpenedPopover = useResetRecoilState(keyResultProgressUpdatePopoverSlider)
  const isPopoverOpened = openedPopover === id && typeof openedPopover !== 'undefined'

  const handleClose = () => resetOpenedPopover()

  return (
    <Popover isOpen={isPopoverOpened} placement="bottom-start" onClose={handleClose}>
      <PopoverTrigger>
        <SliderContainer keyResultID={id} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Atualize seu KR</PopoverHeader>
        <PopoverCloseButton />
        Teste
      </PopoverContent>
    </Popover>
  )
}

export default ProgressSlider
