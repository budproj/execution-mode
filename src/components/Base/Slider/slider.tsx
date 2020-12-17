import {
  Slider as ChakraSlider,
  SliderFilledTrack,
  SliderProps,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from '@chakra-ui/react'
import React, { forwardRef } from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

export interface SliderProperties extends SliderProps {
  trackColor?: string
  trackThickness?: string
}

const Slider = forwardRef<HTMLDivElement, SliderProperties>(
  ({ trackColor, trackThickness, ...rest }: SliderProperties, forwardedReference) => {
    const intl = useIntl()

    return (
      <ChakraSlider
        role="group"
        _disabled={{ opacity: 1, pointerEvents: 'none', cursor: 'default' }}
        {...rest}
      >
        <SliderTrack
          ref={forwardedReference}
          h={trackThickness}
          bg="gray.100"
          borderRadius="full"
          _disabled={{ bg: 'gray.100' }}
        >
          <SliderFilledTrack bg={trackColor} borderRadius="full" />
        </SliderTrack>

        <Tooltip label={intl.formatMessage(messages.updateLabel)} placement="top">
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
        </Tooltip>
      </ChakraSlider>
    )
  },
)

Slider.defaultProps = {
  value: 0,
  trackColor: 'brand.400',
  trackThickness: '8px',
}

export default Slider
