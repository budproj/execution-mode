import {
  BorderProps,
  Slider,
  SliderFilledTrack,
  SliderProps,
  SliderTrack,
  SliderTrackProps,
} from '@chakra-ui/react'
import React from 'react'

export interface SliderWithFilledTrackProperties extends SliderProps {
  trackRadius: BorderProps['borderRadius']
  trackColor?: SliderTrackProps['bg']
  trackThickness?: SliderTrackProps['h']
  trackTopRadius?: BorderProps['borderTopRadius']
}

const SliderWithFilledTrack = ({
  trackColor,
  trackThickness,
  trackRadius,
  trackTopRadius,
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
      borderTopRadius={trackTopRadius ?? trackRadius}
      _disabled={{ bg: 'gray.100' }}
    >
      <SliderFilledTrack
        bg={trackColor}
        borderRadius={trackRadius}
        borderTopLeftRadius={trackTopRadius ?? trackRadius}
      />
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
