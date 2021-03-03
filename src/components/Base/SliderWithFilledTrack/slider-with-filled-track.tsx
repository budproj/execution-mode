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
  trackBg: SliderTrackProps['bg']
  trackColor?: SliderTrackProps['bg']
  trackThickness?: SliderTrackProps['h']
  trackTopRadius?: BorderProps['borderTopRadius']
  filledTrackRadius?: BorderProps['borderRadius']
}

const SliderWithFilledTrack = ({
  trackColor,
  trackThickness,
  trackRadius,
  trackTopRadius,
  trackBg,
  filledTrackRadius,
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
      bg={trackBg}
      borderRadius={trackRadius}
      borderTopRadius={trackTopRadius ?? trackRadius}
      _disabled={{ bg: trackBg }}
    >
      <SliderFilledTrack
        bg={trackColor}
        borderRadius={filledTrackRadius ?? trackRadius}
        borderTopLeftRadius={trackTopRadius ?? trackRadius}
      />
    </SliderTrack>
  </Slider>
)

SliderWithFilledTrack.defaultProps = {
  value: 0,
  trackColor: 'brand.500',
  trackBg: 'gray.50',
  trackThickness: '8px',
  trackRadius: 'full',
  isDisabled: true,
}

export default SliderWithFilledTrack
