import {
  Slider,
  SliderFilledTrack,
  SliderProps,
  SliderThumb,
  SliderTrack,
  SliderTrackProps,
  TooltipProps,
} from '@chakra-ui/react'
import React, { forwardRef } from 'react'
import { useIntl } from 'react-intl'

import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'

import messages from './messages'

export interface SliderWithHoverThumbProperties extends SliderProps {
  trackColor?: SliderTrackProps['bg']
  trackThickness?: SliderTrackProps['h']
  dataAction?: string
  thumbTooltipLabel?: TooltipProps['label']
}

const SliderWithHoverThumb = forwardRef<HTMLDivElement, SliderWithHoverThumbProperties>(
  (
    {
      trackColor,
      trackThickness,
      dataAction,
      thumbTooltipLabel,
      ...rest
    }: SliderWithHoverThumbProperties,
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

        <TooltipWithDelay
          label={thumbTooltipLabel ?? intl.formatMessage(messages.updateLabel)}
          placement="top"
        >
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
        </TooltipWithDelay>
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
