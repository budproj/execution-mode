import {
  Slider as ChakraSlider,
  SliderFilledTrack,
  SliderProps,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react'
import React, { ReactElement, useState } from 'react'

export interface SliderProperties extends SliderProps {
  trackColor?: string
}

const Slider = ({ trackColor, ...rest }: SliderProperties): ReactElement => {
  const [isHovering, setIsHovering] = useState(false)

  const handleEnter = () => setIsHovering(true)
  const handleLeave = () => setIsHovering(false)

  return (
    <ChakraSlider onMouseEnter={handleEnter} onMouseLeave={handleLeave} {...rest}>
      <SliderTrack h="8px" bg="gray.200" borderRadius="full">
        <SliderFilledTrack bg={trackColor} borderRadius="full" />
      </SliderTrack>

      <SliderThumb
        bg={trackColor}
        borderColor="white"
        borderWidth={2}
        w="22px"
        h="22px"
        transform={isHovering ? 'scale(1)' : 'scale(0)'}
        mt="-10px"
        ml="-10px"
      />
    </ChakraSlider>
  )
}

export default Slider
