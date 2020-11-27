import {
  Slider as ChakraSlider,
  SliderFilledTrack,
  SliderProps,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react'
import React, { ReactElement } from 'react'

export interface SliderProperties extends SliderProps {
  trackColor?: string
}

const Slider = ({ trackColor, ...rest }: SliderProperties): ReactElement => (
  <ChakraSlider role="group" focusThumbOnChange={false} {...rest}>
    <SliderTrack h="8px" bg="gray.100" borderRadius="full">
      <SliderFilledTrack bg={trackColor} borderRadius="full" />
    </SliderTrack>

    <SliderThumb
      bg={trackColor}
      borderColor="white"
      borderWidth={2}
      w="22px"
      h="22px"
      transition="0.2s opacity ease-in-out"
      opacity={0}
      _groupHover={{ opacity: 1 }}
    />
  </ChakraSlider>
)

export default Slider
