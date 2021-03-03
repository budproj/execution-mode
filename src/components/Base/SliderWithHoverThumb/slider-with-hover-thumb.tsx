import {
  Slider,
  SliderFilledTrack,
  SliderProps,
  SliderThumb,
  SliderTrack,
  SliderTrackProps,
  Tooltip,
} from '@chakra-ui/react'
import React, { forwardRef } from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

export interface SliderWithHoverThumbProperties extends SliderProps {
  trackColor?: SliderTrackProps['bg']
  trackThickness?: SliderTrackProps['h']
  dataAction?: string
}

const SliderWithHoverThumb = forwardRef<HTMLDivElement, SliderWithHoverThumbProperties>(
  (
    { trackColor, trackThickness, dataAction, ...rest }: SliderWithHoverThumbProperties,
    forwardedReference,
  ) => {
    const intl = useIntl()

    return (
      <Slider
        role="group"
        _disabled={{ opacity: 1, pointerEvents: 'none', cursor: 'default' }}
        {...rest}
      >
        <SliderTrack
          ref={forwardedReference}
          h={trackThickness}
          bg="gray.50"
          borderRadius="full"
          _disabled={{ bg: 'gray.50' }}
          data-action={dataAction}
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
            data-action={dataAction}
          />
        </Tooltip>
      </Slider>
    )
  },
)

SliderWithHoverThumb.defaultProps = {
  value: 0,
  trackColor: 'brand.500',
  trackThickness: 2,
}

export default SliderWithHoverThumb
