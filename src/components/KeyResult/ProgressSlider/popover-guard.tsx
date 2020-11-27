import { Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import React, { ComponentType, useState } from 'react'

import { SliderProperties } from 'components/Base/Slider/slider'

export interface PopoverGuardProperties extends SliderProperties {
  Slider: ComponentType<SliderProperties>
}

const PopoverGuard = ({ Slider, onChangeEnd, ...rest }: PopoverGuardProperties) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSliderUpdateEnd = (newValue: number) => {
    console.log('tag', 'end', newValue, rest.value)
    if (!isOpen) setIsOpen(true)
    if (onChangeEnd) onChangeEnd(newValue)
  }

  return (
    <Popover isOpen={isOpen}>
      <PopoverTrigger>
        <Slider onChangeEnd={handleSliderUpdateEnd} {...rest} />
      </PopoverTrigger>
      <PopoverContent>Teste</PopoverContent>
    </Popover>
  )
}

export default PopoverGuard
