import { BorderProps, Slider, SliderFilledTrack, SliderProps, SliderTrack } from '@chakra-ui/react'
import React from 'react'

export interface SliderWithFilledTrackProperties extends SliderProps {
  trackColor?: string
  trackThickness?: string
  trackRadius?: BorderProps['borderRadius']
}

const SliderWithFilledTrack = ({
  trackColor,
  trackThickness,
  trackRadius,
  isDisabled,
  ...rest
}: SliderWithFilledTrackProperties) => (
  <Slider
    role="group"
    isDisabled={isDisabled}
    _disabled={{ opacity: 1, pointerEvents: 'none', cursor: 'default' }}
    {...rest}
  >
    <SliderTrack
      h={trackThickness}
      bg="gray.100"
      borderRadius={trackRadius}
      _disabled={{ bg: 'gray.100' }}
    >
      <SliderFilledTrack bg={trackColor} borderRadius={trackRadius} />
    </SliderTrack>
  </Slider>
)

SliderWithFilledTrack.defaultProps = {
  value: 0,
  trackColor: 'brand.400',
  trackThickness: '8px',
  trackRadius: 'full',
  isDisabled: true,
}

export default SliderWithFilledTrack
