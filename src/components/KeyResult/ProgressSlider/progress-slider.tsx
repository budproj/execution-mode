import {
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'
import React from 'react'
import { useRecoilState } from 'recoil'

import { KeyResult } from 'components/KeyResult/types'
import { keyResultProgressUpdatePopoverAtom } from 'state/recoil/key-result/progress-update'

import SliderContainer from './slider-container'

export interface ProgressSliderProperties {
  id?: KeyResult['id']
}

const ProgressSlider = ({ id }: ProgressSliderProperties) => {
  const [openedPopover, setOpenedPopover] = useRecoilState(keyResultProgressUpdatePopoverAtom)
  const isPopoverOpened = openedPopover === id

  const handleClose = () => setOpenedPopover()

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
