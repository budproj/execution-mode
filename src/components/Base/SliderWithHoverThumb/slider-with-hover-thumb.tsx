import {
  Slider,
  SliderFilledTrack,
  SliderProps,
  SliderThumb,
  SliderTrack,
  SliderTrackProps,
  TooltipProps,
} from '@chakra-ui/react'
import React, { forwardRef, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import TooltipWithDelay from 'src/components/Base/TooltipWithDelay'

import messages from './messages'

export interface SliderWithHoverThumbProperties extends SliderProps {
  trackColor?: SliderTrackProps['bg']
  trackThickness?: SliderTrackProps['h']
  dataAction?: string
  thumbTooltipLabel?: TooltipProps['label']
  isReversed?: boolean
}

const marshalReversedValue = (value?: number, min?: number, isReversed?: boolean): number => {
  value ??= 0
  min ??= isReversed ? 0 : 100
  if (!isReversed) return value

  return min - value
}

const unmarshalReversedValue = (value?: number, min?: number, isReversed?: boolean): number => {
  value ??= 0
  min ??= isReversed ? 0 : 100
  if (!isReversed) return value

  return Math.abs(value - min)
}

const SliderWithHoverThumb = forwardRef<HTMLDivElement, SliderWithHoverThumbProperties>(
  (
    {
      trackColor,
      trackThickness,
      dataAction,
      thumbTooltipLabel,
      value,
      min,
      max,
      isReversed,
      onChange,
      onChangeEnd,
      ...rest
    }: SliderWithHoverThumbProperties,
    forwardedReference,
  ) => {
    const intl = useIntl()
    const [controlledValue, setControlledValue] = useState(
      marshalReversedValue(value, min, isReversed),
    )

    const handleChange = (newValue: number) => {
      const unmarshaledValue = unmarshalReversedValue(newValue, min, isReversed)

      if (onChange) onChange(unmarshaledValue)
      setControlledValue(newValue)
    }

    const handleChangeEnd = (newValue: number) => {
      if (onChangeEnd) {
        const unmarshaledValue = unmarshalReversedValue(newValue, min, isReversed)
        onChangeEnd(unmarshaledValue)
      }
    }

    useEffect(() => {
      const marshaledValue = marshalReversedValue(value, min, isReversed)
      if (value && marshaledValue !== controlledValue) {
        setControlledValue(marshaledValue)
      }
    }, [value, min, isReversed, controlledValue, setControlledValue])

    return (
      <Slider
        role="group"
        _disabled={{ opacity: 1, pointerEvents: 'none', cursor: 'default' }}
        value={controlledValue}
        min={isReversed ? max : min}
        max={isReversed ? min : max}
        onChange={handleChange}
        onChangeEnd={handleChangeEnd}
        {...rest}
      >
        <SliderTrack
          ref={forwardedReference}
          h={trackThickness}
          bg="black.200"
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
  isReversed: false,
}

export default SliderWithHoverThumb
