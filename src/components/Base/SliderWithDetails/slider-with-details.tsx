import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderProps,
  SliderThumb,
  SliderThumbProps,
  SliderTrack,
  SliderTrackProps,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import messages from './messages'

export interface SliderWithDetailsProperties extends SliderProps {
  trackThickness: SliderTrackProps['h']
  trackColor: SliderTrackProps['color']
  thumbHeight: SliderThumbProps['h']
}

const SliderWithDetails = ({
  trackColor,
  trackThickness,
  thumbHeight,
  value,
  isDisabled,
  ...rest
}: SliderWithDetailsProperties) => {
  const intl = useIntl()
  const isAlmostAtTheBeginningOfTheTrack = value === 0 || (value && value < 5)
  const isAlmostAtTheEndOfTheTrack = value && value > 93

  return (
    <Slider
      role="group"
      isDisabled={isDisabled}
      value={value}
      _disabled={{ opacity: 1, pointerEvents: 'none', cursor: 'default' }}
      {...rest}
    >
      <SliderTrack
        h={trackThickness}
        bg="gray.50"
        borderRadius="full"
        _disabled={{ bg: 'gray.50' }}
      >
        <SliderFilledTrack bg={trackColor} borderRadius="full" borderRightRadius="0" />
      </SliderTrack>

      <SliderThumb
        bg={trackColor}
        w="4px"
        h={thumbHeight}
        _disabled={{ opacity: 1 }}
        _focus={{ boxShadow: 'none', outline: 'none' }}
      >
        <Box
          position="absolute"
          top={thumbHeight}
          left={isAlmostAtTheEndOfTheTrack ? '-80px' : '5px'}
          textAlign={isAlmostAtTheEndOfTheTrack ? 'right' : 'left'}
        >
          <Text color={trackColor} fontWeight={700}>
            {Math.round(value ?? 0)}%
          </Text>

          <Text fontSize="xs" color="gray.400" fontWeight={400} width="max-content">
            {intl.formatMessage(messages.progress)}
          </Text>
        </Box>
      </SliderThumb>

      <Text
        color="gray.500"
        fontWeight={700}
        position="absolute"
        top={thumbHeight}
        visibility={isAlmostAtTheBeginningOfTheTrack ? 'hidden' : 'visible'}
      >
        0%
      </Text>

      <Text
        color="gray.500"
        fontWeight={700}
        position="absolute"
        top={thumbHeight}
        right={0}
        visibility={isAlmostAtTheEndOfTheTrack ? 'hidden' : 'visible'}
      >
        100%
      </Text>
    </Slider>
  )
}

SliderWithDetails.defaultProps = {
  value: 0,
  trackColor: 'brand.400',
  trackThickness: 2,
  thumbHeight: '14px',
  isDisabled: true,
}

export default SliderWithDetails
