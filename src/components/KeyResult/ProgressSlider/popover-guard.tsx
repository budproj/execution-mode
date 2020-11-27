import {
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'
import React, { ComponentType, useState } from 'react'

import { SliderProperties } from 'components/Base/Slider/slider'

export interface PopoverGuardProperties extends SliderProperties {
  Slider: ComponentType<SliderProperties>
}

const PopoverGuard = ({ Slider, onChangeEnd, value, ...rest }: PopoverGuardProperties) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSliderUpdateEnd = (newValue: number) => {
    console.log(value, newValue)
    if (!isOpen) setIsOpen(true)
    if (onChangeEnd) onChangeEnd(newValue)
  }

  const handleClose = () => setIsOpen(false)

  return (
    <Popover isOpen={isOpen} onClose={handleClose}>
      <PopoverTrigger>
        <Slider onChangeEnd={handleSliderUpdateEnd} value={value} {...rest} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Atualize seu progresso</PopoverHeader>
        <PopoverCloseButton />
        Teste
      </PopoverContent>
    </Popover>
  )
}

export default PopoverGuard
